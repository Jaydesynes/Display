// import React, {useState} from 'react';
import '../index.css';
import '../Dashboard/Dashboard.css';
import '../components/Registration.css';
import bshn from '../Images/bshn.png';
import UserLogin from '../components/Login';
import { PageTitle } from '../components/PageTitle';

const UserLoginPage = ({ auth }) => {
  return (
    <div>
      <PageTitle title='Login' />
      <div className='bssh-logo-pages'>
        <div className='brand'>
          <span>
            <i className='icon'>
              <img src={bshn} alt='logo' className='brandimage' />
            </i>
          </span>
        </div>
        <h2>BSSHN</h2>
      </div>

      <div className='card-head'>
        <div>
          <div id='body'>
            <div className='page-wrapper'>
              <UserLogin auth={auth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
