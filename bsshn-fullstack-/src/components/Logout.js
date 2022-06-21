import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:5000/user/logout', {
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
        localStorage.removeItem('user');
        console.log(data.message)
        setTimeout(() => {
          window.location.reload()
        }, 1);
      });
  };

  return (
    <div>
      <div className='logout logout-div' title='logout'>
        <input type='submit' value='Logout' onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Logout;
