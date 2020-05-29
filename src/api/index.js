import axios from 'axios';

const url1 = 'https://covid19.mathdro.id/api';
const url2 = 'https://api.covid19api.com';

export const fetchData = async () => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url1);     
        
        return  { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        return(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url1}/daily`);
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.totalConfirmed,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));

        return modifiedData;
    } catch (error) {
        return error;
    }
};

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url2}/countries`);
    
        return data.map((item) => item.Country).sort();
    } catch (error) {
        return(error);        
    }  
};

export const fetchCountryHistory = async (country) => {
    try {
        const { data } = await axios.get(`${url2}/total/dayone/country/${country}`);
        
        const mappedData = data.map((item) => ({
            confirmed: item.Confirmed,
            recovered: item.Recovered,
            deaths: item.Deaths,
            active: item.Active,
            date: item.Date
        }));

        return mappedData;
    } catch (error) {
        return error;
    }
};
