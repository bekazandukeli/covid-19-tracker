import React from 'react';
import { Cards, Charts, CountryPicker } from './components';
import { fetchData, fetchCountryHistory } from './api';
import { Typography, Link } from '@material-ui/core';

import styles from './App.module.css';

import image from './images/image.png';

class App extends React.Component {
    
    state = {
        data: {},
        country: '',
        countryData: {}
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({
            data: fetchedData
        });
    }

    handleCountryChange = async (country) => {
        const countryHistory = await fetchCountryHistory(country);    

        this.setState({
            countryData: countryHistory,
            country: country 
        });
    };
    
    render() {
        const {
            data,
            country,
            countryData 
        } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={countryData} country={country} />
                <Typography style={{
                    marginTop: '20px', 
                    fontSize: '12px', 
                    color: 'rgba(0, 0, 0, .5)'
                    }}
                >Global data has been fetched from this <Link href="https://covid19.mathdro.id/api" target="_blank">API</Link>, 
                
                Country data has been fetched from this <Link href="https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest" target="_blank">API</Link>.
                </Typography>
                 
            </div>
        );
    }
}

export default App;