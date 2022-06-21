import React, { useState } from 'react';
import './Registration.css';

const DispenseDrugs = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);

  const [pharmacyInfo, setPharmacyInfo] = useState({})
  const handlePharmacyInfo = ({ target }) => {
    setPharmacyInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      fetch("http://localhost:5000/verify", {
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

  const [success, setSuccess] = useState("")
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const _data = {...pharmacyInfo, userId: 111};
    // `${process.env.REACT_APP_API_PHARMACY}`
    fetch("http://localhost:5000/pharmacy", {
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
        console.log(`Error updating pharmacy: ${err}`);
      });

    // console.log(_data);
  };
  return (
    <div>
      <div className='container'>
        <div className='title'>Dispensation of Drugs</div>
        <div className='content'>
          <form method='POST' onSubmit={handleSubmit}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Phone/Patient No. or Surname</span>
                <input
                  type='text'
                  placeholder='Enter appropriate detail'
                  name='patientId'
                  onChange={(evt) => {
                    handleCheck(evt);
                    handlePharmacyInfo(evt);
                  }}
                  value={pharmacyInfo.patientId || ''}
                  required
                />
              </div>
              {message && <small>{message}</small>}
            </div>

            {show && (
              <React.Fragment>
                <div className='user-details'>
                  <div className='input-box'>
                    <span className='details'>Invoice</span>
                    <input
                      type='text'
                      placeholder='Enter Invoice Number'
                      name='invoice'
                      onChange={handlePharmacyInfo}
                      required
                    />
                  </div>
                </div>
                <div className='user-details'>
                  <div className='input-box'>
                    <span className='details'>Medications Given</span>
                    <textarea
                      rows='5'
                      column='10'
                      placeholder='Enter Medications Given'
                      name='medication'
                      onChange={handlePharmacyInfo}
                      value={pharmacyInfo.medication || ''}
                      required
                    />
                  </div>

                  <div className='input-box'>
                    <span className='details'>Dosage</span>
                    <input
                      type='text'
                      placeholder='Enter Dosage'
                      name='dosage'
                      onChange={handlePharmacyInfo}
                      value={pharmacyInfo.dosage || ''}
                      required
                    />
                  </div>

                  <div className='input-box'>
                    <span className='details'>Duration</span>
                    <input
                      type='text'
                      placeholder='Enter Duration'
                      name='duration'
                      onChange={handlePharmacyInfo}
                      value={pharmacyInfo.duration || ''}
                      required
                    />
                  </div>

                  <div className='input-box'>
                    <span className='details'>Remarks </span>
                    <textarea
                      placeholder='Remarks'
                      name='remark'
                      onChange={handlePharmacyInfo}
                      value={pharmacyInfo.remark || ''}
                      required
                    />
                  </div>
                </div>{' '}
              </React.Fragment>
            )}
            {success && <small>{success}</small>}
            <div className='button'>
              <input type='submit' value='Enter' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DispenseDrugs;
