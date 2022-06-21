import React, {useState}from 'react'
import './Registration.css'

const Consultation = () => {
  const [show, setShow] = useState(false)
    return (
        <body>
            <div className="container">
    <div className="title">Consultation</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Phone/Patient No. or Surname</span>
            <input type="text" placeholder="Enter appropriate detail" onClick={()=>setShow(!show)} required />
          </div>
          </div>

          {show ?
          <div className="user-details">
          <div className="input-box">
            <span className="details">Diagnosis</span>
            <input type="text" placeholder="Enter Patient Diagnosis" required/>
          </div>

          <div className="input-box">
            <span className="details">Prescription</span>
            <input type="text" placeholder="Enter Patient Prescription" required />
          </div>

          <div className="input-box">
            <span className="details">Treatment</span>
            <input type="text" placeholder="Enter Patient Treatment" required />
          </div>

          <div className="input-box">
            <span className="details">Further Investigation</span>
            <select type="text" placeholder="Make Selection" required>
              <option>Make Selection</option>
              <option>List Item</option>
              <option>List Item</option>
              <option>None</option>   
            </select>
          </div>

          <div className="input-box">
            <span className="details">Procedures</span>
            <select type="text" placeholder="Make Selection" required>
              <option>Select Procedure</option>
              <option>List Item</option>
              <option>List Item</option>
              <option>List Item</option>   
            </select>
          </div>

          <div className="input-box">
            <span className="details">Notes</span>
            <input type="text" placeholder="" required />
          </div>    
        </div>
        : null
        }
        
        <div className="button">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  </div>
</body>
    )
}

export default Consultation
