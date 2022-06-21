import React, {useState} from 'react'
import './Registration.css'

const VitalSigns = () => {
  const [show, setShow] = useState(false)

    return (
        <body>
            <div className="container">
    <div className="title">Vital Signs</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Phone/Patient No. or Surname</span>
            <input type="text" placeholder="Enter appropriate detail" onClick={()=> setShow(!show)} required/>
          </div>
          </div>

        {show ?
        <div className="user-details">

          <div className="input-box">
            <span className="details">Height</span>
            <input type="text" placeholder="Enter Patient Height" required/>
          </div>

          <div className="input-box">
            <span className="details">Weight</span>
            <input type="text" placeholder="Enter Patient Weight" required />
          </div>

          <div className="input-box">
            <span className="details">BMI</span>
            <input type="text" placeholder="Enter Patient BMI" required />
          </div>

          <div className="input-box">
            <span className="details">Respiration </span>
            <input type="text" placeholder="Enter Patient Respiration" required />
          </div>

          <div className="input-box">
            <span className="details">Blood Pressure</span>
            <input type="text" placeholder="Enter Blood Pressure" required />
          </div>

          <div className="input-box">
            <span className="details">Temperature</span>
            <input type="text" placeholder="Enter Patient Temperature" required />
          </div>

          <div className="input-box">
            <span className="details">Pulse</span>
            <input type="text" placeholder="Enter Patient Pulse" required />
          </div>
        </div>
        :null }
        <div className="button">
          <input type="submit" value="Enter Vital Signs"/>
        </div>
      </form>
    </div>
  </div>
</body>
    )
}

export default VitalSigns
