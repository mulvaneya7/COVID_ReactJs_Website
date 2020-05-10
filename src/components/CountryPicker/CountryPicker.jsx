import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);

    return (
 
         
         <div className={styles.cpselect}>
             <h3 className={styles.cpHeading}>COVID-19 cases by country</h3>
             <p className={styles.cpHeadingText}>The figures below are based on data from the https://covid19.mathdro.id/api. These numbers are updated daily but may differ from other sources
             due to differences in reporting times.  </p>
             <span> In  </span>
             <select className={styles.formControl} defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                 <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </select> <span> , Number of active confirmed COVID-19 cases, Recovered and deaths </span>
        </div>
    )
}

export default CountryPicker;