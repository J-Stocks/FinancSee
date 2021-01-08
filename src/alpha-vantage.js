import data from '@/assets/data/listing_status.json';

export default class AlphaVantage {
    static apiKey = process.env.VUE_APP_ALPHA_VANTAGE_KEY;

    static baseUrl = "https://www.alphavantage.co/query?";

    static getAllCompanies() {
        return data.companies;
    }

    static getCompanyBySymbol(symbol) {
        return fetch(`${this.baseUrl}function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`)
    }

    static getCompanyName(symbol) {
        return data.companies.find(company => company.symbol = symbol).name;
    }

    static getTimeSeries(symbol){
        return fetch(
            this.baseUrl +
            `function=TIME_SERIES_DAILY_ADJUSTED` +
            `&symbol=${symbol}` +
            `&outputsize=full` +
            `&apikey=${this.apiKey}`
        );
    }
}