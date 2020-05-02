/******/


import { Cards, Chart, CountryPicker } from 'components';
import styles from './App.module.css';
import { fetchData } from '../api';

/*******/
import React,{useState, useEffect} from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';


import axios from 'axios';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

import gatsby_astronaut from 'assets/images/gatsby-astronaut.jpg';

const LOCATION = {
  lat: 0,
  lng: 0
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;





const IndexPage = () => {

  

  
  const [data2,updateData] = useState([]);
  const [country2,updateCountry] = useState([]);
    useEffect(()=>{
   
      const any = async () => {
        const fetchedData=  await fetchData();
      
       // console.log(fetchedData);
        updateData(fetchedData);
       }
      
      
  
    
    any();
    


     
     
      console.log("usereffect is running");
      
    },[]);
  
   // console.log(data2);
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    let response;
//https://corona.lmao.ninja/v2/countries
    try {
      response = await axios.get('https://corona.lmao.ninja/v2/countries');
     
    } catch(e) {
      console.log('Failed to fetch contries: ${e.message}',e);
      return; 
    }
    const { data = [] } = response;
    const hasData = Array.isArray(data) & data.length > 0;
    if(!hasData) return;

    const geoJson = {
      type: 'FeatureCollection',
      features: data.map((country = {}) => {
        const {countryInfo = {}} = country;
        const {lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
            ...country,
          },
          geometry: {
            type:'Point',
            coordinates: [lng, lat]
          }
        }

      })
    }
    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const {properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const {
          country,
          updated,
          cases,
          deaths,
          recovered
        } = properties

        casesString = `${cases}`;

        if( cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`
        }
        if ( updated ) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
        <span class="icon-marker">
          <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <ul>
              <li><strong>Confirmed:</strong> ${cases}</li>
              <li><strong>Deaths:</strong> ${deaths}</li>
              <li><strong>Recovered:</strong> ${recovered}</li>
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            </ul>
          </span>
          ${ casesString }
        </span>
      `;

        return L.marker(latlng,{
          icon: L.divIcon({
            className: 'icon',
            html
          }),
          riseOnHover: true

        });
      }
    });
    geoJsonLayers.addTo(map)
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };


  const handleCountryChange = async (country2) =>{
  
  
  
    const fetchedData = await fetchData(country2);
  
    updateData(fetchedData);
    updateCountry(country2);
   
  
  
}


  


  return (


    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}/>
       
      <Cards data={data2}/>
      <CountryPicker  handleCountryChange={handleCountryChange}/>
           <Chart data={data2} country={country2} />
      <Container type="content" className="text-center home-start">
      

        <p className="note">Note: Gatsby CLI required globally for the above command</p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
