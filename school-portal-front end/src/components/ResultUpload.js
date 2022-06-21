import { useState, useEffect } from 'react';
import '../App.css'

const ResultUploadView = ({user, result, startBar, stopBar}) => {
    
    const [examRadioValue, setExamRadioValue] = useState(null)
    const [message, setMessage] = useState(false)
    const [waecCount, setWaecCount] = useState(0)
    const [jambCount, setJambCount] = useState(0)
    const [examCount, setExamcount] = useState(0)

    // WAEC/NECO

    const [waec_neco, setWaec_Neco] = useState({})
    
    // JAMB
    const [jamb, setJamb] = useState({})
    

    // const [jambTotal, setJambTotal] = useState(0)
    

    // ATTESTATION
    const [attestation, setAttestation] = useState(false)
    
    const handleWaecScore = ({target}) => {
        
        setWaec_Neco((prev) => ({...prev, [target.name]: target.value }))
    }
    
    const handleJambScore = ({target}) => {

        setJamb((prev) => ({...prev, [target.name]: target.value }))
    }


    const handleExamRadio = (event) =>{
        console.log(event.target.value)
       setExamRadioValue(event.target.value)
       setExamcount(1)
    }

    useEffect(() => {
        
        if (waec_neco){
            console.log(waec_neco)
           const x = Object.keys(waec_neco).length
           setWaecCount(x)
        }
        if (jamb){
            const y = Object.keys(jamb).length
            setJambCount(y)
        }
        if (message){
        setTimeout(() => {
            setMessage(false)
            }, 4000);
        }
    },[waec_neco, jamb, message])

    

    const handleSubmit = (event) =>{
        event.preventDefault();

        const count = waecCount + jambCount + examCount
        console.log(waecCount)
        console.log(jambCount)
        console.log(examCount)
        console.log(count)
        if (count < 27 ){
            setMessage(true)
        }else{
    

        const resultdata = {
            'result' : {

                [`${examRadioValue}`] : {
                    [waec_neco.subject1] : waec_neco.grade1,
                    [waec_neco.subject2] : waec_neco.grade2,
                    [waec_neco.subject3] : waec_neco.grade3,
                    [waec_neco.subject4] : waec_neco.grade4,
                    [waec_neco.subject5] : waec_neco.grade5,
                    [waec_neco.subject6] : waec_neco.grade6,
                    [waec_neco.subject7] : waec_neco.grade7,
                    [waec_neco.subject8] : waec_neco.grade8,
                    [waec_neco.subject9] : waec_neco.grade9
                },

                'jamb' : {
                    [jamb.jamb1] : jamb.score1,
                    [jamb.jamb2] : jamb.score2,
                    [jamb.jamb3] : jamb.score3,
                    [jamb.jamb4] : jamb.score4
                }
            },

        'email': user.email
    }

        startBar()
        // http://localhost:5000/uploadresult
      // process.env.REACT_APP_API_UPLOAD_RESULT
        fetch(process.env.REACT_APP_API_UPLOAD_RESULT , {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(resultdata),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        stopBar()
        if (data.status === true){
          console.log('result uploaded')
            result(data)
        }else{
          console.log("result not uploaded")
        }
      })
      .catch((err) => {
        stopBar()
        console.log(`Error during login: ${err}`);
      });

    }
    }


    const waec_list = [1,2,3,4,5,6,7,8,9]
    const jamb_list = [1,2,3,4]


    return(
        <div className='result-comp'>
            <h3 className='centered'>Upload your O/Level result</h3>
            <h4 className='centered'>Please make sure all details are correct before submitting</h4>
            <form onSubmit={handleSubmit}>

            
            <h3>WAEC/NECO</h3>

            <div>
                <input 
                type="radio"
                value="WAEC" 
                name="exam" 
                onChange={handleExamRadio}
                /> WAEC

                <input 
                type="radio" 
                value="NECO" 
                name="exam" 
                onChange={handleExamRadio}
                /> NECO
            </div>
            
            <div>
                {
                    
                    waec_list.map((v)=> {
                        return (
                <div className='result-item' key={v}>
                <div>
                    <select name={`subject${v}`} onChange={handleWaecScore} className='waec' defaultValue="initial">
                        <option value='initial' disabled>---select subject---</option>
                        <option>Mathematics</option>
                        <option>Biology</option>
                        <option>Physics</option>
                        <option>Geography</option>
                        <option>Civic Education</option>
                        <option>Computer Science</option>
                        <option>Literature</option>
                        <option>Government</option>
                        <option>Further Mathematics</option>

                    </select>
                    
                </div>

                <div className='grade'>
                    
                    <select name='grade1' onChange={handleWaecScore} defaultValue='initial'>
                        <option value='initial'>---select grade---</option>
                        <option>A1</option>
                        <option>B2</option>
                        <option>B3</option>
                        <option>C4</option>
                        <option>C5</option>
                        <option>C6</option>
                        <option>D7</option>
                        <option>F9</option>
                    </select>

                </div>
            </div>

                        )
                    })
                }
            </div>

            <br />

            <div>
                <h3>JAMB/UTME</h3>

                <div className='result-item'>

                {
                    jamb_list.map((v)=> {
                        return(
                    <div key={v}>
                    <div>
                        <select onChange={handleJambScore} name='jamb1' className='waec' defaultValue="initial" >
                            <option value='initial' disabled>---select subject---</option>
                            <option>Mathematics</option>
                            <option>Biology</option>
                            <option>Physics</option>
                            <option>Geography</option>
                            <option>Civic Education</option>
                            <option>Computer Science</option>
                            <option>Literature</option>
                            <option>Government</option>
                            <option>Further Mathematics</option>

                        </select>
                    </div>

                    <div className='grade'>
                            <input
                            onChange={handleJambScore}
                            type='number' 
                            name='score1'
                            />
                    </div>
                </div>
                            
                        )
                    })
                }
                
            </div>  
                

            </div>
            <br></br>
            <div>
            
                <h3>Attestation</h3>
                <input
                id='attestation'
                type='checkbox'
                // onChange={}
                 />
                 <label htmlFor='attestation' >By checking this box, you attest to the accuracy and validity of the result provided above  </label>
            </div>
            <br />

            {
                message?
                <span style={{color: 'red'}}>Please check the form and fill completely</span>
                : null
            }   
                <div>
                    <input
                    className='login-btn result-btn'
                    type='submit'
                    value='Submit results'
                    // disabled={}
                    />
                </div>
            </form>
        </div>
    )
}

export default ResultUploadView;