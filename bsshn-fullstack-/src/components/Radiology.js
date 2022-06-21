import React, { useState } from 'react';

const Radiology = () => {
  const [show, setShow] = useState(false);

  const [radiologyInfo, setRadiologyInfo] = useState({});

  const handleRadiologyInfo = ({ target }) => {
    setRadiologyInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const [message, setMessage] = useState('');
  // const handleCheck = ({ target }) => {
  //   target.value.length === 8 &&
  //     fetch(`http://localhost:5000/verify`, {
  //       method: 'POST',
  //       credentials: 'same-origin',
  //       body: JSON.stringify({ invoice: target.value }),
  //       mode: 'cors',
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Credentials': true,
  //         'Access-Control-Allow-Methods': 'GET, POST',
  //         'Content-Type': 'application/json, charset=UTF-8',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log(data);
  //         if (data.status) {
  //           setShow(true);
  //           setMessage(false);
  //           // console.log(data.data);
  //         } else {
  //           setShow(false);
  //           setMessage(data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(`Error getting invoice: ${err}`);
  //       });
  // };

  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      fetch('http://localhost:5000/verify', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          patientId: parseInt(target.value),
          userId: parseInt('132'),
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


  const [success, setSuccess] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const _data = { ...radiologyInfo, userId: 132, service_id: 111 };
    // `${process.env.REACT_APP_API_radiology}`
    fetch(`http://localhost:5000/radiology`, {
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
        console.log(`Error updating radiology: ${err}`);
      });

    // console.log(_data);
  };

  return (
    <div>
      <div className='container'>
        <div className='title'>Radiology</div>
        <div className='content'>
          <form onSubmit={handleSubmit} method='POST'>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Patient Number</span>
                <input
                  type='text'
                  placeholder='Enter Patient Number'
                  onChange={(evt) => {
                    handleCheck(evt);
                    handleRadiologyInfo(evt);
                  }}
                  name='patientId'
                  value={radiologyInfo.patientId || ''}
                  required
                />
              </div>
              {message && <small>{message}</small>}
            </div>

            {show ? (
              <div className='user-details'>
                <div className='input-box'>
                  <span className='details'>Invoice Number
                  </span>
                  <input
                    type='text'
                    placeholder='Enter Invoice Number'
                    name='invoice'
                    onChange={handleRadiologyInfo}
                    value={radiologyInfo.invoice || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Notes</span>
                  <textarea
                    rows='5'
                    columns='10'
                    placeholder='Enter notes'
                    name='notes'
                    onChange={handleRadiologyInfo}
                    value={radiologyInfo.notes || ''}
                    required
                  />
                </div>
              </div>
            ) : null}
            {success && <small>{success}</small>}
            <div className='button'>
              <input type='submit' value='Submit Report' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Radiology;
