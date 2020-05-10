

import React from 'react';
import styles from './DashboardHeader.module.css';
class DashboardHeader extends React.Component {
  


   
  render() {
    return( 
    
    
    <div className={styles.container}>
      <h1 className ={styles.heading}>Tracking Covid-19 Global cases </h1>
      <p className={styles.stand}>Since January, novel coronavirus has spread to nealy every country</p>
      <p className = {styles.byline}> By Alex, Eric, Samanta Lee, Geonhyeong Park</p>
    <p className= {styles.byline}>Last updated: {this.props.currentTime}</p>
      
    </div>
    
    
    
    )
    
   
    
  }
}



export default DashboardHeader;
