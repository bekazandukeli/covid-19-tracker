import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line } from 'react-chartjs-2';

import styles from './Chart.module.css';


const Charts = ({ data, country }) => {  
    const [ dailyData, setDailyData ] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        } 
        
        fetchAPI();
    }, []);
    
    
    const lineChart = (
        dailyData.length 
            ? (
                <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(170, 0, 0, 1)',
                        backgroundColor: 'rgba(255 , 0, 0, .5)',
                        fill: true,
                    }]
                }}
            />
            ) : null
    );

    const countryLineChart = (
        data.length
        ? (
            <Line 
                data={{
                    labels: data.map(({ date }) => date.split('T')[0]),
                    datasets: [{
                        data: data.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: data.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(170, 0, 0, 1)',
                        backgroundColor: 'rgba(255, 0, 0, .5)',
                        fill: true,
                    }, {
                        data: data.map(({ active }) => active),
                        label: 'Active',
                        borderColor: 'rgba(170, 170, 0, 1)',
                        backgroundColor: 'rgba(255, 255, 0, .5)',
                        fill: true,
                    }, {
                        data: data.map(({ recovered }) => recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 255, 0, .5)',
                        fill: true,
                    }
                
                ]
                }}
            />
        ) : null
    );

    return (
        
        <div className={styles.container}>
            {country? countryLineChart : lineChart}
        </div>
    );
};

export default Charts;