import React, { useState } from 'react';
import './Registration.css';

const Consultation = () => {
  const [show, setShow] = useState(false);

  const [consultationInfo, setConsultationInfo] = useState({});

  const handleConsultationInfo = ({ target }) => {
    setConsultationInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const [message, setMessage] = useState('');
  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      fetch('http://localhost:5000/verify', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          patientId: parseInt(target.value),
          userId: parseInt('101'),
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
            // console.log(data.data);
          } else {
            setShow(false);
            setMessage(data.message);
          }
        })
        .catch((err) => {
          console.log(`Error getting invoice: ${err}`);
        });
  };

  const [success, setSuccess] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const _data = { ...consultationInfo, userId: 111 };
    // `${process.env.REACT_APP_API_CONSULTATION}`
    fetch(`http://localhost:5000/consultation`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(_data),
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
        console.log(data);
        if (data.status) {
          setSuccess(data.message);
        } else {
          setSuccess(data.message);
        }
      })
      .catch((err) => {
        console.log(`Error updating consultation: ${err}`);
      });

    // console.log(_data);
  };

  return (
    <div>
      <div className='container'>
        <div className='title'>Consultation</div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Phone/Patient No. or Surname</span>
                <input
                  type='text'
                  placeholder='Enter patient id'
                  onChange={(evt) => {
                    handleCheck(evt);
                    handleConsultationInfo(evt);
                  }}
                  name='patientId'
                  value={consultationInfo.patientId || ''}
                  required
                />
              </div>
              {message && <small>{message}</small>}
            </div>

            {show ? (
              <div className='user-details'>
                <div className='input-box'>
                  <span className='details'>Diagnosis</span>
                  <input
                    type='text'
                    placeholder='Enter Patient Diagnosis'
                    name='observation'
                    onChange={handleConsultationInfo}
                    value={consultationInfo.observation || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Prescription</span>
                  <input
                    type='text'
                    placeholder='Enter Patient Prescription'
                    name='prescription'
                    onChange={handleConsultationInfo}
                    value={consultationInfo.prescription || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Treatment</span>
                  <input
                    type='text'
                    placeholder='Enter Patient Treatment'
                    name='treatment'
                    onChange={handleConsultationInfo}
                    value={consultationInfo.treatment || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Notes</span>
                  <input
                    type='text'
                    placeholder=''
                    name='notes'
                    onChange={handleConsultationInfo}
                    value={consultationInfo.notes || ''}
                    required
                  />
                </div>
              </div>
            ) : null}
            {success && <small>{success}</small>}
            <div className='button'>
              <input type='submit' value='Submit' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
