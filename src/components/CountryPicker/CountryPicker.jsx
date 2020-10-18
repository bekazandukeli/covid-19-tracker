import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const hash = decodeURI(window.location.hash.substring(1));

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        if (hash) handleCountryChange(hash);

        fetchAPI();
    }, [setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue={""} onChange={(ev) => handleCountryChange(ev.target.value)}>
                <option value="">{hash || 'Global'}</option>
                {fetchedCountries.map((countryName, i) => <option key={i} value={countryName}>{countryName}</option> )}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
