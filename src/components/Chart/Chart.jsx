import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

import styles from './Chart.module.css';

const Charts = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);
  const filteredData = data?.filter(
    ({ date, active }) =>
      new Date(date).getTime() >= new Date('2020-08-01').getTime() &&
      active !== 269275
  );

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'rgba(170, 0, 0, 1)',
            backgroundColor: 'rgba(255 , 0, 0, .5)',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const countryLineChart = filteredData.length ? (
    <Line
      data={{
        labels: filteredData.map(({ date }) => date.split('T')[0]),
        datasets: [
          //   {
          //     data: data.map(({ confirmed }) => confirmed),
          //     label: 'Infected',
          //     borderColor: '#3333ff',
          //     fill: true,
          //   },
          {
            data: filteredData.map(({ deaths, date }) => {
              return deaths;
            }),
            label: 'Deaths',
            borderColor: 'rgba(170, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, .5)',
            fill: true,
          },
          {
            data: filteredData.map(({ active, date }) => {
              return active;
            }),
            label: 'Active',
            borderColor: 'rgba(170, 170, 0, 1)',
            backgroundColor: 'rgba(255, 255, 0, .5)',
            fill: true,
          },
          //   {
          //     data: data.map(({ recovered }) => recovered),
          //     label: 'Recovered',
          //     borderColor: 'green',
          //     backgroundColor: 'rgba(0, 255, 0, .5)',
          //     fill: true,
          //   },
        ],
      }}
    />
  ) : (
    <Typography style={{ fontSize: '24px' }}>
      We could not load data for this location, you can pick another one!
    </Typography>
  );

  return (
    <div className={styles.container}>
      {country ? countryLineChart : lineChart}
    </div>
  );
};

export default Charts;
