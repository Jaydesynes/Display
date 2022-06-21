import React, { useState, useEffect } from 'react';

const InPatientServices = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);
  const [inServiceInfo, setInServiceInfo] = useState({});
  const [services, setServices] = useState([]);

  const handleInServiceInfo = ({ target }) => {
    setInServiceInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const [selectedServices, setSelectedServices] = useState([]);
  const handleService = ({ target }) => {
    target.checked
      ? setSelectedServices((prev) => [...prev, target.value])
      : setSelectedServices((prev) => [
          ...prev.filter((service) => service !== target.value),
        ]);
  };

  // get in services `${process.env.REACT_APP_API_IN_PATIENT_SERVICE_LIST}`
  useEffect(() => {
    show &&
      fetch('http://localhost:5000/in-patient-service-list', {
        method: 'GET',
        credentials: 'same-origin',
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
          data && setServices(data);
        })
        .catch((err) => {
          console.log(`Error getting in-patient-services: ${err}`);
        });
  }, [show]);

  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      fetch(`${process.env.REACT_APP_API_VERIFY}`, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          patientId: parseInt(target.value),
          userId: parseInt('111'),
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const _data = { ...inServiceInfo, in_patient_services: selectedServices };
    //   `${process.env.REACT_APP_API_IN-PATIENT-SERVICES}`;
    fetch('http://localhost:5000/in-patient-services', {
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
      })
      .catch((err) => {
        console.log(`Error updating in patient services: ${err}`);
      });

    console.log(_data);
  };
  return (
    <div>
      {console.log(selectedServices)}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone/Patient No. or Surname</label>
          <input
            type='text'
            name='patientId'
            onChange={(evt) => {
              handleCheck(evt);
              handleInServiceInfo(evt);
            }}
            value={inServiceInfo.patientId || ''}
          />
        </div>
        {message && <small>{message}</small>}

        {show &&
          services.map((service, ikey) => (
            <div key={ikey}>
              <label>{service.name}</label>{' '}
              <input
                type='checkbox'
                name={service.name}
                data-amount={service.amount}
                value={service.code}
                onChange={handleService}
              />
            </div>
          ))}
        <div>
          <button type='submit'>Add to Patient Record</button>
        </div>
      </form>
    </div>
  );
};

export default InPatientServices;
