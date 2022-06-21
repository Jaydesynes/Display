import React, { useState, useEffect } from 'react';
import './Registration.css';

const Admission = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);
  const [response, setResponse] = useState(null);
  


  const [admissionInfo, setAdmissionInfo] = useState({});
  const handleAdmissionInfo = ({ target }) => {
    setAdmissionInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const [discharged, setDischarged] = useState('');
  const handleDischarged = ({ target }) => {
    target.checked ? setDischarged('yes') : setDischarged('no');
  };

  const [localUser, setLocalUser] = useState(null);
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setLocalUser(loggedUser);
    console.log(loggedUser);
  }, [])
  


  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      setAdmissionInfo({patientId: target.value});
      fetch('http://localhost:5000/verify', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          patientId: parseInt(target.value),
          userId: localUser._id,
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
    const _addData = { ...admissionInfo, discharged };
    _addData.userId = localUser._id;
    console.log(_addData)
    // console.log(_addData);
    // {REACT_APP_API_ADMISSION}
    fetch('http://localhost:5000/admission', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(_addData),
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
        setResponse(data.message);
        setAdmissionInfo({})
      })
      .catch((err) => {
        console.log(`Error during adding: ${err}`);
      });
  };

  return (
    <div>
      <div className='container'>
        <div className='title'>Admission</div>
        <div className='content'>
          <form onSubmit={handleSubmit} method='POST'>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Patient No.</span>
                <input
                  type='text'
                  placeholder='Enter appropriate detail'
                  name='patientId'
                  onChange={(evt) => {
                    handleCheck(evt);
                    handleAdmissionInfo(evt);
                  }}
                  required
                />
              </div>
            </div>

            {show ? (
              <div className='user-details'>
                <div className='input-box'>
                  <span className='details'>Invoice</span>
                  <input
                    type='text'
                    placeholder='Invoice Number'
                    name='invoice'
                    onChange={handleAdmissionInfo}
                    value={admissionInfo.invoice || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Assign Ward</span>
                  <input
                    type='text'
                    placeholder='Enter Ward Number'
                    name='wardNumber'
                    onChange={handleAdmissionInfo}
                    value={admissionInfo.wardNumber || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Assign Bed</span>
                  <input
                    type='text'
                    placeholder='Enter Bed Number'
                    name='bedNumber'
                    onChange={handleAdmissionInfo}
                    value={admissionInfo.bedNumber || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Discharged</span>
                  <input
                    type='checkbox'
                    onChange={handleDischarged}
                    value={discharged}
                    name="discharged"
                  />
                </div>

                {/* <div className=''>
                  <label htmlFor='disch-yes'>Yes</label>
                  <input
                    type='radio'
                    id='disch-yes'
                    name='discharged'
                    value='yes'
                  />{' '}
                  <label htmlFor='disch-no'>No</label>
                  <input
                    type='radio'
                    id='disch-no'
                    name='discharged'
                    value='no'
                  />
                </div> */}

                <div>
                  <label>Remark</label>
                  <textarea
                    rows={7}
                    column={10}
                    name='remark'
                    onChange={handleAdmissionInfo}
                    value={admissionInfo.remark || ''}
                    required
                  />
                </div>
              </div>
            ) : null}
            <h5 style={{color:"green"}}>{response || ""}</h5>
            <div className='button'>
              <input type='submit' value='Enter' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;
