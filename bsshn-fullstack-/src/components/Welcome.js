import React from 'react';

function Welcome() {
  return (
    <div>
      <div className='container welcome' style={{ textAlign: 'center' }}>
        <p>In the past 28 days, you have attended to:</p>

        <ol style={{ listStyleType: 'circle' }}>
          <li>15 patients in service 1</li>
          <li>25 patients in service 2</li>
        </ol>
      </div>
    </div>
  );
}

export default Welcome;
