import React, { useState, useEffect } from 'react';

const Laboratory = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);

  const [localUser, setLocalUser] = useState(null);
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setLocalUser(loggedUser);
    console.log(loggedUser);
  }, [])

  const [labInfo, setLabInfo] = useState({});
  const handleLabInfo = ({ target }) => {
    setLabInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      fetch("http://localhost:5000/verify", {
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
          console.log(data);
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const _data = labInfo;
    //   `${process.env.REACT_APP_API_LABORATORY}`;
    //    'http://localhost:5000/laboratory'
    fetch('http://localhost:5000/laboratory', {
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
        // console.log(data);
      })
      .catch((err) => {
        console.log(`Error updating laboratory: ${err}`);
      });

    console.log(_data);
  };
  return (
    <div>
      <div className='container'>
        <div className='title'>Laboratory</div>
        <div className='content'></div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Number</label>
          <input
            id='invoice'
            type='text'
            autoComplete='off'
            name='patientId'
            // value={labInfo.patientId || ''}
            onChange={(evt) => {
              handleCheck(evt);
              handleLabInfo(evt);
            }}
          />
          {message && <small>{message}</small>}
        </div>

        {show && (
          <div>
            <div>
              <label>Invoice Number</label>
              <input
                type='text'
                name='invoice_number'
                value={labInfo.invoice_number || ''}
                onChange={handleLabInfo}
              />
            </div>

            <div>
              <label>Service Description</label>
              <textarea
                rows='5'
                columns='10'
                name='service_description'
                value={labInfo.service_description || ''}
                onChange={handleLabInfo}
              />
            </div>

            <div>
              <label>Investigation</label>
              <textarea
                rows='5'
                columns='10'
                name='investigation'
                value={labInfo.investigation || ''}
                onChange={handleLabInfo}
              />
            </div>

            <div>
              <label>Result</label>
              <textarea
                rows='5'
                columns='10'
                name='result'
                value={labInfo.result || ''}
                onChange={handleLabInfo}
              />
            </div>
            <div>
              <label>Remarks</label>
              <textarea
                rows='5'
                columns='10'
                name='remarks'
                value={labInfo.remarks || ''}
                onChange={handleLabInfo}
              />
            </div>
          </div>
        )}
        <div>
          <button type='submit'>Submit Report</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Laboratory;
