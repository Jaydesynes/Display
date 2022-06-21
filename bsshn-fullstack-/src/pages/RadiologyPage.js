// import React, {useState} from 'react';
import '../index.css';
import '../Dashboard/Dashboard.css';
import '../components/Registration.css'
import Radiology from '../components/Radiology';
import bshn from '../Images/bshn.png';
import Logout from '../components/Logout';

const RadiologyPage = () => {

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
                <Radiology />
            </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default RadiologyPage;