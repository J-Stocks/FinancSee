import Papa from 'papaparse';
import dayjs from "dayjs";

export default class AlphaVantage {
    static apiKey = process.env.VUE_APP_ALPHA_VANTAGE_KEY;

    static baseUrl = "https://www.alphavantage.co/query?";

    static companiesPromise;

    static currenciesPromise;

    static getAllCompanies() {
        if (this.companiesPromise === undefined) {
            this.companiesPromise = fetch(`${this.baseUrl}function=LISTING_STATUS&apikey=${this.apiKey}`)
                .then(response => response.text())
                .then(csv => {
                    let companies = Papa.parse(csv, {header: true, skipEmptyLines: true}).data;
                    companies.forEach((company, index) => company.id = index);
                    return companies;
                })
                .catch(error => console.log('Error', error))
            ;
        }
        return this.companiesPromise;
    }

    static getAllCurrencies() {
        if (this.currenciesPromise === undefined) {
            this.currenciesPromise = fetch('https://www.alphavantage.co/physical_currency_list/')
                .then(response => response.text())
                .then(csv => {
                    let currencies = Papa.parse(csv, {header: true, skipEmptyLines: true}).data;
                    currencies.forEach((company, index) => company.id = index);
                    return currencies;
                })
                .catch(error => console.log('Error', error))
            ;
        }
        return this.currenciesPromise;
    }

    static getCompanyBySymbol(symbol) {
        return fetch(`${this.baseUrl}function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`)
            .then(response => response.json())
            .catch(error => console.log('Error', error))
        ;
    }

    static getCompanyName(symbol) {
        return this.getAllCompanies().then(companies => companies.find(company => company.symbol = symbol).name);
    }

    static getCurrencyTimeSeries(fromCode, toCode) {
        return fetch(
            this.baseUrl +
            `function=FX_DAILY` +
            `&from_symbol=${fromCode}` +
            `&to_symbol=${toCode}` +
            `&outputsize=full` +
            `&apikey=${this.apiKey}`
            ).then(response => response.json())
            .then(json => {
                let timeSeries = []
                for (const key of Object.keys(json["Time Series FX (Daily)"])) {
                    timeSeries[key] = Number.parseFloat(json["Time Series FX (Daily)"][key]["4. close"]);
                }
                return timeSeries;
            })
            .catch(error => console.log('Error', error))
        ;
    }

    static getStockTimeSeries(symbol){
        return fetch(
            this.baseUrl +
            `function=TIME_SERIES_DAILY_ADJUSTED` +
            `&symbol=${symbol}` +
            `&outputsize=full` +
            `&apikey=${this.apiKey}`
            ).then(response => response.json())
            .then(json => {
                let timeSeries = []
                for (const key of Object.keys(json["Time Series (Daily)"])) {
                    timeSeries[key] = Number.parseFloat(json["Time Series (Daily)"][key]["5. adjusted close"]);
                }
                return timeSeries;
            })
            .catch(error => console.log('Error', error))
        ;
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