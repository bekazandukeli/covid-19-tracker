import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);     
        
        return  { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        return(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        
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
        const { data } = await axios.get(`https://api.covid19api.com/countries`);
    
        return data.map((item) => item.Country).sort();
    } catch (error) {
        return(error);        
    }  
};

export const fetchCountryHistory = async (country) => {
    try {
        const { data } = await axios.get(`https://api.covid19api.com/total/dayone/country/${country}`);
        
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
