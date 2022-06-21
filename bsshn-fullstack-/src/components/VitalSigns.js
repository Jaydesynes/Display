import React, { useState } from 'react';
import './Registration.css';

const VitalSigns = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);

  const [vitalsInfo, setVitalsInfo] = useState({});
  const handleVitalsInfo = ({ target }) => {
    setVitalsInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      fetch('http://localhost:5000/verify', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          patientId: parseInt(target.value),
          userId: parseInt('186'),
        }),
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET, POST',
          'Content-Type': 'application/json, charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.status) {
            setShow(true);
            setMessage(false);
            console.log(data.data);
          } else {
            setShow(false);
            setMessage(data.message);
          }
        })
        .catch((err) => {
          console.log(`Error getting invoice: ${err}`);
        });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const _data = vitalsInfo;
//`${process.env.REACT_APP_API_VITALS}`
    fetch('http://localhost:5000/vitals', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ ..._data, userId: 101 }),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setMessage(data.message);
      })
      .catch((err) => {
        console.log(`Error adding Vitals: ${err}`);
      });

    // console.log(_data)
  };

  return (
    <div>
      <div className='container'>
        <div className='title'>Vital Signs</div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Patient ID</span>
                <input
                  type='text'
                  placeholder='Enter appropriate detail'
                  name='patientId'
                  onChange={(evt) => {
                    handleCheck(evt);
                    handleVitalsInfo(evt);
                  }}
                  required
                />
                {message && <small>{message}</small>}
              </div>
            </div>

            {show ? (
              <div className='user-details'>
                <div className='input-box'>
                  <span className='details'>Height</span>
                  <input
                    type='text'
                    placeholder='Enter Patient Height'
                    name='height'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Weight</span>
                  <input
                    type='text'
                    placeholder='Enter Patient Weight'
                    name='weight'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>BMI</span>
                  <input
                    type='text'
                    placeholder='Enter Patient BMI'
                    name='bmi'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Respiration </span>
                  <input
                    type='text'
                    placeholder='Enter Patient Respiration'
                    name='respiration'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Blood Pressure</span>
                  <input
                    type='text'
                    placeholder='Enter Blood Pressure'
                    name='bp'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Temperature</span>
                  <input
                    type='text'
                    placeholder='Enter Patient Temperature'
                    name='temperature'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Pulse</span>
                  <input
                    type='text'
                    placeholder='Enter Patient Pulse'
                    name='pulse'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>
                <div className='input-box'>
                  <span className='details'>Invoice</span>
                  <input
                    type='text'
                    placeholder='invoice'
                    name='invoice'
                    onChange={handleVitalsInfo}
                    required
                  />
                </div>
              </div>
            ) : null}
            <div className='button'>
              <input type='submit' value='Enter Vital Signs' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VitalSigns;
