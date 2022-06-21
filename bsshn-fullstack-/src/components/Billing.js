import React, { useState } from 'react';
import './Registration.css';

const services = [
  {
    name: 'registration',
    code: 101,
    amount: 1000,
  },
  {
    name: 'consultation',
    code: 201,
    amount: 2000,
  },
  {
    name: 'admission',
    code: 301,
    amount: 7000,
  },
  {
    name: 'in_patient_service',
    code: 401,
    amount: 3000,
  },
  {
    name: 'medication',
    code: 501,
    amount: 3000,
  },
  {
    name: 'diagnostics',
    code: 601,
    amount: 2500,
  },
  {
    name: 'Laboratory',
    code: 701,
    amount: 4000
  },
  {
    name: 'Emergency',
    code: 801,
    amount: 3200
  },
  {
    name: 'Radiology',
    code: '111',
    amount: 2400
  },
  {
    name: 'Walk-In',
    code: '411',
    amount: 2100
  },
  {
    name: 'Vital-Signs',
    code: '511',
    amount: 2100
  },
];

function Billing() {

  const [billingInfo, setBillingInfo] = useState({});
  const [response, setResponse] = useState(null);
  const handleBillInfo = ({ target }) => {
    setBillingInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const [amount, setAmount] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const handleService = ({ target }) => {
    target.checked
      ? setSelectedServices(
          (prev) => [ ...prev, target.value ],
          setAmount((prev) => parseInt(prev) + parseInt(target.dataset.amount))
        )
      : setSelectedServices(
        (prev) => ([ ...prev.filter((service) => service !== target.value) ]),
          setAmount((prev) => prev - target.dataset.amount)
        );
  };

  // confirm patientId
  const [patientFound, setPatientFound] = useState(true);
  const handleCheckPatieint = ({ target }) => {
    target.value.length === 8 &&
    // `${process.env.REACT_APP_API_CHECK_PATIENT}`
    //  "http://localhost:5000/checkpatient"
      fetch("http://localhost:5000/checkpatient", {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ patientId: parseInt(target.value) }),
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
          data.status ? setPatientFound(false) : setPatientFound(true);
        })
        .catch((err) => {
          console.log(`Error during checking: ${err}`);
        });
    // console.log(target.value)
  };

  // submit
  const handleSubmitBill = (evt) => {
    evt.preventDefault();

    const _data = { ...billingInfo, selectedServices, amount };
    //`${process.env.REACT_APP_API_BILLING}`
    // 'http://localhost:5000/billing'
    fetch('/billing', {
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
        setResponse(data.message);
        setBillingInfo({});
      })
      .catch((err) => {
        console.log(`Error during billing: ${err}`);
      });

    // console.log(_data);
  };

  return (
    <div>
      <div className='container'>
        <div className='title'>Billing</div>
        <div className='content'></div>
        <form onSubmit={handleSubmitBill}>
          <div>
            <label>Patient ID</label>
            <input
              type='text'
              autoComplete='off'
              name='patientId'
              value={billingInfo.patientId || ''}
              onChange={(evt) => {
                handleCheckPatieint(evt);
                handleBillInfo(evt);
              }}
              className='input-box'
            />
          </div>

          {services.map((service, ikey) => (
            <div key={ikey}>
              <label>{service.name}</label>
              <input
                type='checkbox'
                name={service.name}
                data-amount={service.amount}
                data-status={0}
                value={service.code}
                onChange={handleService}
                disabled={patientFound}
              />
            </div>
          ))}

          <div>
            <textarea
              rows='5'
              columns='10'
              name='notes'
              onChange={handleBillInfo}
              disabled={patientFound}
            />
          </div>

          <div>
            <label>Amount</label>
            <input
              type='text'
              name='amount'
              value={`N ${amount}`}
              disabled={true}
            />
          </div>
          <div className='button'>
            <h5 style={{color:"green"}}>{response || ""}</h5>
            <button type='submit'>Bill</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Billing;
