import React from 'react';
import { Cards, Charts, CountryPicker } from './components';
import { fetchData } from './api';
import { Typography, Link } from '@material-ui/core';

import styles from './App.module.css';

import image from './images/image.png';

class App extends React.Component {
    
    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({
            data: fetchedData
        });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        
        this.setState({
            data: fetchedData,
            country: country 
        });
    };
    
    render() {
        const {
            data,
            country 
        } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country} />
                <Typography style={{marginTop: '20px'}}>Data has been fetched from <Link href="https://covid19.mathdro.id/api" target="_blank">this API</Link></Typography> 
            </div>
        );
    }
}

export default App;