import dayjs from "dayjs";
import Papa from 'papaparse';

export default class AlphaVantage {
    static apiKey = process.env.VUE_APP_ALPHA_VANTAGE_KEY;

    static apiAttempts = 5;

    static apiTimeout = 5000;

    static baseUrl = "https://www.alphavantage.co/query?";

    static companiesPromise;

    static currenciesPromise;

    //Currently the API call in this function takes approximately 12 seconds to reply.
    //App performance could be improved by importing this data from a local file on the webserver, but then the data
    //would not be kept up to date. Ideally some backend server would poll the API intermittently, cache the result and
    //then serve it more quickly, but backend programming is beyond the scope of this assignment, so the call has been
    //left as is.
    static getAllCompanies() {
        if (this.companiesPromise === undefined) {
            this.companiesPromise = this.retryFetch(
                `${this.baseUrl}function=LISTING_STATUS&apikey=${this.apiKey}`,
                false
            ).then(csv => {
                let companies = Papa.parse(csv, {header: true, skipEmptyLines: true}).data;
                companies.forEach((company, index) => company.id = index);
                return companies;
            }).catch(error => console.log('Error', error));
        }
        return this.companiesPromise;
    }

    static getAllCurrencies() {
        if (this.currenciesPromise === undefined) {
            this.currenciesPromise = this.retryFetch(
                'https://www.alphavantage.co/physical_currency_list/',
                false
            ).then(csv => {
                return Papa.parse(csv, {header: true, skipEmptyLines: true}).data;
            }).catch(error => console.log('Error', error));
        }
        return this.currenciesPromise;
    }

    static getCompanyBySymbol(symbol) {
        return this.retryFetch(`${this.baseUrl}function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`)
            .catch(error => console.log('Error', error));
    }

    static getCompanyName(symbol) {
        return this.getAllCompanies().then(companies => companies.find(company => company.symbol === symbol).name);
    }

    static getCurrencyTimeSeries(fromCode, toCode) {
        return this.retryFetch(
            this.baseUrl +
            `function=FX_DAILY` +
            `&from_symbol=${fromCode}` +
            `&to_symbol=${toCode}` +
            `&outputsize=full` +
            `&apikey=${this.apiKey}`
        ).then(json => {
            let timeSeries = []
            for (const key of Object.keys(json["Time Series FX (Daily)"])) {
                timeSeries[key] = Number.parseFloat(json["Time Series FX (Daily)"][key]["4. close"]);
            }
            return timeSeries;
        }).catch(error => console.log('Error', error));
    }

    static getStockTimeSeries(symbol){
        return this.retryFetch(
            this.baseUrl +
            `function=TIME_SERIES_DAILY_ADJUSTED` +
            `&symbol=${symbol}` +
            `&outputsize=full` +
            `&apikey=${this.apiKey}`
        ).then(json => {
            let output = {
                close: [],
                volume: []
            };
            for (const key of Object.keys(json["Time Series (Daily)"])) {
                output.close[key] = Number.parseFloat(json["Time Series (Daily)"][key]["5. adjusted close"]);
                output.volume[key] = Number.parseFloat(json["Time Series (Daily)"][key]["6. volume"]);
            }
            return output;
        }).catch(error => console.log('Error', error));
    }

    static retryFetch(
        url,
        getJson = true,
        retryAttempts = this.apiAttempts,
        timeout = this.apiTimeout
    ) {
        return fetch(url).then(response => {
            if (response.ok) {
                if (getJson) {
                    return response.json();
                } else {
                    return response.text();
                }
            } else if (retryAttempts > 0) {
                console.log(`Warning: request failed with code ${response.status},` +
                    `retrying in ${timeout / 1000} seconds. ${retryAttempts} attempts remaining`
                );
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(this.retryFetch(url, getJson, retryAttempts - 1, timeout))
                    }, timeout);
                });
            } else {
                throw new Error(response);
            }
        }).then(content => {
            //The Alpha Vantage API does not actually return an error when exceeding the call frequency limit.
            //Instead json data is returned matching the following data:
            const failMessage = "{\n    \"Note\": \"Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.\"\n}"
            if ((getJson && content['Note'] === undefined) || (!getJson && content !== failMessage)) {
                return content;
            } else if (retryAttempts > 0) {
                console.log(`Warning: API request frequency too high, retrying in ${timeout / 1000} seconds.` +
                    ` ${retryAttempts} attempts remaining`
                );
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(this.retryFetch(url, getJson, retryAttempts - 1, timeout))
                    }, timeout);
                });
            } else {
                throw new Error(content['Note']);
            }
        }).catch(error => console.log(error));
    }

    static sliceTimeSeries(fullTimeSeries, fromDate, toDate) {
        if (dayjs(fromDate).isBefore(dayjs().subtract(20, 'years'))) {
            fromDate = dayjs().subtract(20, 'years');
        }
        let output = {
            labels: [],
            data: []
        };
        let lastData = null;
        let tempDate = dayjs(fromDate);
        while (tempDate.isBefore(dayjs(toDate)) && tempDate.isBefore(dayjs())) {
            output.labels.push(tempDate.format('YYYY-MM-DD'));
            if (fullTimeSeries[tempDate.format('YYYY-MM-DD')]) {
                output.data.push(fullTimeSeries[tempDate.format('YYYY-MM-DD')]);
                lastData = fullTimeSeries[tempDate.format('YYYY-MM-DD')];
            } else {
                output.data.push(lastData);
            }
            tempDate = tempDate.add(1, 'day');
        }
        return output;
    }
}