import React, { useState } from 'react';
import '../index.css';
import '../Dashboard/Dashboard.css';
import bshn from '../Images/bshn.png';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { css } from '@emotion/react';
import { MoonLoader } from 'react-spinners';

const UserLogin = ({ auth }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: green;
  `;
  const [loginDetails, setLoginDetails] = useState({});
  const [pswrdSee, setPswrdSee] = useState(false);
  const [err, setErr] = useState('');
  let [loading, setLoading] = useState(false);

  const handleDetails = ({ target }) => {
    setLoginDetails((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    setErr('');
    fetch('/user/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        userId: parseInt(loginDetails.userId),
        password: loginDetails.password,
      }),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          // console.log(data.data);

          auth(data.data);
          setLoading(false);
        } else {
          setErr(data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(`Error during login: ${err}`);
        setLoading(true);
      });
  };

  return (
    <div>
      <div className='card-head'>
        <div>
          <div id='body'>
            <div className='page-wrapper'>
              <div className='container loginMargin'>
                <div className='title'>Login</div>
                <div className='content'>
                  <form method='POST' onSubmit={handleSubmit}>
                    <div className='login-details'>
                      <div className='input-box'>
                        <span className='details'>User ID</span>
                        <input
                          type='text'
                          placeholder='Enter your user ID'
                          name='userId'
                          value={loginDetails.userId || ''}
                          onChange={handleDetails}
                          autoComplete='off'
                          required
                        />
                      </div>
                      <div className='input-box'>
                        <span className='details'>Password</span>
                        <input
                          type={pswrdSee ? 'text' : 'password'}
                          placeholder='Enter your password'
                          name='password'
                          value={loginDetails.password || ''}
                          onChange={handleDetails}
                          required
                        />
                        <span
                          className='details fs-6 text-muted'
                          style={{ cursor: 'pointer' }}
                          onClick={() => setPswrdSee(!pswrdSee)}
                        >
                          Show Password {!pswrdSee ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>

                      <div className='button'>
                        <input type='submit' value='Login' />
                      </div>
                      <MoonLoader
                        // color='#ffffff'
                        loading={loading}
                        css={override}
                        size={22}
                      />
                      {err && (
                        <div className='text-center text-danger fs-6'>
                          <small>{err}</small>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
