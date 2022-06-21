// import React, {useState} from 'react';
import '../index.css';
import '../Dashboard/Dashboard.css';
import '../components/Registration.css';
import UserRegistration from '../components/UserRegistration';
import bshn from '../Images/bshn.png';
import Logout from '../components/Logout';

const UserRegistrationPage = () => {
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
              <UserRegistration />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
