import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ( { data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length 
        ? <Line 
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets:[{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: '#red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],
            }}
        /> : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options = {{
                    legend: { display: false },
                    title: { display: true, text: `Country state in ${country}`},
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {/* {country ? barChart : lineChart } */}

            {barChart}

            <div className={styles.cpselect}>
             <h3 className={styles.cpHeading}>Global Covid-19 Infected, Deaths growth rates</h3>
             <p className={styles.cpHeadingText}>The figures below are based on data from the https://covid19.mathdro.id/api. These numbers are updated daily but may differ from other sources
             due to differences in reporting times.  </p>
           
        </div>

    <div className={styles.container}>
        
        
        {lineChart}</div>
            
        </div>
       

    )
}

export default Chart;