import data from '@/assets/data/listing_status.json';

export class AlphaVantage {
    static getAllCompanies() {
        return data.companies;
    }
}