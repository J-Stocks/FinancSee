import Papa from 'papaparse';

export default class AlphaVantage {
    static apiKey = process.env.VUE_APP_ALPHA_VANTAGE_KEY;

    static baseUrl = "https://www.alphavantage.co/query?";

    static companiesPromise;

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

    static getCompanyBySymbol(symbol) {
        return fetch(`${this.baseUrl}function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`)
            .then(response => response.json())
            .catch(error => console.log('Error', error))
        ;
    }

    static getCompanyName(symbol) {
        return this.getAllCompanies().then(companies => companies.find(company => company.symbol = symbol).name);
    }

    static getTimeSeries(symbol){
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
}