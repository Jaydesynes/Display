// import React, {useState} from 'react';
import '../index.css';
import '../Dashboard/Dashboard.css';
import '../components/Registration.css'
import VitalSigns from '../components/VitalSigns';
import bshn from '../Images/bshn.png';
import Logout from '../components/Logout';

const VitalSignsPage = () => {

    return (
        <div>
        <div className='bssh-logo-pages'>
            <div className='brand'>
           
            <span>
                <i className='icon'>
                <img src={bshn} alt='logo' className='brandimage' />
                </i>
            </span>
            
            </div>
                <h2>BSSHN</h2>
                <Logout />
        </div>  

        

        <div className='card-head'>
        <div>
        <div id='body'>
            <div className='page-wrapper'>
                <VitalSigns />
            </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default VitalSignsPage;