import React, { useState } from 'react';
import '../index.css';
import '../Dashboard/Dashboard.css';
import '../components/Registration.css';
import Booking from '../components/Booking';
import bshn from '../Images/bshn.png';
import Logout from '../components/Logout';

const BookingPage = () => {
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
        <div>
          <Logout />
        </div>
      </div>

      <div className='card-head'>
        <div>
          <div id='body'>
            <div className='page-wrapper'>
              <Booking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
