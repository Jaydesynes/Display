import { useEffect, useState, useRef } from "react"
import '../App.css'
import NaijaStates from 'naija-state-local-government'
import ReactHTMLDatalist from "react-html-datalist";
import ImgPlaceholder from '../images/Portrait_Placeholder.png'
import Axios from 'axios'
import axios from "axios";

const Biodata = ({user, startBar, stopBar, bio})=>{
    const [selectedPassport, setSelectedPassport] = useState('')
    const [displayPassport, setDisplayPassport] = useState(false)
    const [userBiodata, setUserBioData] = useState({})
    const [allStates, setAllStates] = useState(false)
    const [naijaState, setNaijaState] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const [uploadMessage, setUploadMessage] = useState(false)
    const [lgas, setLgas] = useState(false)

    const fileInput = useRef(null)
  

    const handleUserBiodata = ({target}) => {
        setUserBioData((prev) => ({ ...prev, [target.name]: target.value }));
    }



    const handleNaijaStatechange = ( {target}) => {
        setNaijaState(NaijaStates.lgas(target.value))
        setUserBioData((prev) => ({ ...prev, [target.name]: target.value }));
    }


    useEffect(() => {
      console.log(userBiodata)

     setAllStates(NaijaStates.all())

      // console.log(allStates)

      if (naijaState){
        
        setLgas(naijaState.lgas)
      }
      
    })

    const handlePassport = (event) => {
        
        const selectedpassport = event.target.files[0]
        setSelectedPassport(selectedpassport)
        setDisplayPassport(URL.createObjectURL(selectedpassport))
    }

    
    const submitImage = () => {
      const passport = new FormData();
        passport.append('file', selectedPassport)
        passport.append('folder', 'school_application')
        // passport.append('public_id', user._id)
        // passport.append("userId", user._id)
        // passport.append('type', selectedPassport.type)
        passport.append('upload_preset', "d3rugkkv")


      startBar()

      Axios.post(
      'https://api.cloudinary.com/v1_1/dulc3sns0/image/upload', 
      passport
      ).then((response) => {
        console.log(response)

        // save response to database

        // process.env.REACT_APP_UPLOAD_PASSPORT
      // http://localhost:5000/uploadpassport
        
        const passport_data = {
          email: user.email,  
          passport_details: response
        }

            Axios.post(
              'http://localhost:5000/uploadpassport',
              passport_data
              )
              .then((res)=> {
                stopBar()
                console.log(res)
              }).catch((error) => {

                stopBar()
                console.log(`Error saving file details: ${error}`)
              })



      }).catch((error) => {
        console.log(error)
      })

      // process.env.REACT_APP_UPLOAD_PASSPORT
      // http://localhost:5000/uploadpassport
  //     fetch(process.env.REACT_APP_API_UPLOAD_PASSPORT, {
  //   method: 'POST',
  //   credentials: 'same-origin',
  //   body: passport,
  //   mode: 'cors',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': true,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
    
  //     stopBar()
  //     if (data.status === true){
  //       console.log(data)
  //       setIsUploaded(true)
        

  //     }else{
  //       setIsUploaded(false)
  //       setUploadMessage('picture failed to upload. Try uploading again')
      
  
  //     }
  //   })
  //   .catch((err) => {
  //     stopBar()
  //     console.log(`error uploading passport: ${err}`);
  //   });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
  
        const bioData = {
            email: user.email,
            biodata: userBiodata
        }

        startBar()  
        // http://localhost:5000/uploadbio
        // REACT_APP_API_UPLOAD_BIO
    fetch(process.env.REACT_APP_API_UPLOAD_BIO, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(bioData),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      
        stopBar()
        if (data.status === true){
         bio(data)
          
        }else{
            // display error message
        }
      })
      .catch((err) => {
        stopBar()
        console.log(`Error saving biodata: ${err}`);
      });
    
    }

    

    return(
        <div>
          <h3 className='centered'>Fill in your Biodata</h3>
          <h4 className='centered'>Please make sure all details are correct before submitting</h4>

            <label htmlFor="passport" >Upload a Passport photograph (.jpeg or .png format )</label>
              <div>
                <img className='biodata-img' src={displayPassport? displayPassport:ImgPlaceholder}></img>
                <br />
                    <input
                    style={{display: 'none'}}
                    ref={fileInput}
                    id="passport"
                    type='file'
                    name="passport"
                    onChange={handlePassport}
                    disabled={isUploaded}
                    />
                </div>

                <button
                onClick={() =>{
                  fileInput.current.click()

                } }
                disabled={isUploaded}
                >Select image</button>

                <button
                onClick={submitImage}
                disabled={selectedPassport? false: true}
                >upload image</button>
                <br />
                <hr />
            <form onSubmit={handleSubmit}>
            
            
            <span>Gender</span>
            <div>
                <input 
                type="radio"
                value="Male" 
                name="gender" 
                onChange={handleUserBiodata}
                /> Male

                <input 
                type="radio" 
                value="Female" 
                name="gender" 
                onChange={handleUserBiodata}
                /> Female
            </div>

            <label htmlFor="date">Date of Birth</label>
            <input 
            type='date'
            id="data"
            name="DOB"
            onChange={handleUserBiodata}

            required
            />

            <br />
            <label htmlFor="state">State of Origin</label>
        <ReactHTMLDatalist 
          name={"state"}
          onChange={handleNaijaStatechange}
          classNames={"classone classtwo"}
          options={(allStates || []).map((option) => {
            return {
              text: option.state,
              value: option.state
            }
          })}
          
          placeholder = "Select State"
        />

            


            <br />
            <label htmlFor="lga">Local Government Area</label>
            <ReactHTMLDatalist 
          name={"lga"}
          onChange={handleNaijaStatechange}
          classNames={"classone classtwo"}
          options={(lgas || []).map((option) => {
            return {
              text: option,
              value: option
            }
          })}
          autoComplete = 'off'
          placeholder = "Select LGA"
        />
             <br />
            <label htmlFor="home-address">Your home address</label>
            <input 
            type='text'
            id='home-address'
            name="home_address"
            onChange={handleUserBiodata}
            
            required
            />

            <br />
            <label htmlFor="parent">Parent/Guardian First Name</label>
            <input 
            type='text'
            id='parent'
            name="parent_first_name"
            onChange={handleUserBiodata}
            
            required
            />
            <br />
            <label htmlFor="parent">Parent/Guardian Last Name</label>
            <input 
            type='text'
            id='parent'
            name="parent_last_name"
            onChange={handleUserBiodata}
            
            required
            />

            <br />
            <label htmlFor="parent-address">Parent/Guardian home address</label>
            <input 
            type='text'
            id='parent-address'
            name="parent_address"
            onChange={handleUserBiodata}
            
            required
            />

            <br />
            <label htmlFor="parent-occupation">Parent/Guardian home Occupation</label>
            <input 
            type='text'
            id='parent-occupation'
            name="parent_occupation"
            onChange={handleUserBiodata}
            
            required
            />
            <br />

            <input 
                type="submit" 
                className="submit biodata-submit"
                value="Submit" 
            
                
                /> 

            </form>
           
        </div>
    )

}
export default Biodata;