import { useState, useEffect } from "react";
// import { useLocation } from "react-router";
import Biodata from "./Biodata";
import ResultUploadView from "./ResultUpload";
import { Icon } from '@iconify/react';

import Programs from "./Programs";

 
const Dashboard = ( {Header, auth, startBar, stopBar}) => {

    const [showBiodata, setShowBiodata]  = useState(false)
    const [showProgram, setShowProgram] = useState(false)
    const [showprofile, setShowProfile] = useState(true)
    const [showResult, setShowUploadResult] = useState(false)
    const [showTitle, setShowTitle] = useState("Profile")
    const [paymentSuccess, setPaymentSuccess ] = useState(false)
    const [uploadedResult, setUploadedResult] = useState(false)
    const [uploadedBio, setUploadedBio] = useState(false)
    const [user, setUser] = useState('')

    const [menuState, setMenuState] = useState(false)
    const [menuClassList, setMenuClassList] = useState("menu")

    // menu
    const handleOpenMenu = ()=>{
      setMenuState(true)
    }

    const handleCloseMenu = ()=>{
        setMenuState(false)
    }

      // handle payment
    const handlePaymentComp = ( data ) =>{
             auth(data.data)

            window.location.reload()
            
    }

    const handleResultUpload = ( data ) => {
             auth(data.data)
            
            window.location.reload()
    }

    const handleBioUpload = ( data ) => {
         auth(data.data)

        window.location.reload()
    }

    const handlePrint = () => {

       const pdf_detail = {
            email : user.email
        }
        console.log(pdf_detail)
         startBar()
        // http://localhost:5000/generatepdf
        // REACT_APP_API_GENERATE_PDF
          fetch('http://localhost:5000/generatepdf' , {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(pdf_detail),
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json, charset=UTF-8',
        },
      })
        .then((res) => 
          res.blob()
        )
        .then((blob) => {
          console.log(blob)
          const url = window.URL.createObjectURL(new Blob([blob],  {
            type: 'application/pdf'
        }),
          );

          const link = document.createElement('a');
          link.href = url

          // link.setAttribute(
          //   'download',
          //   'userdetails.pdf',
          // );
          link.target ='_blank';

          // document.body.appendChild(link);

          link.click()
           stopBar()

          // link.parentNode.removeChild(link);
         
        }
        )
        .catch((err) => {
           stopBar()
          console.log(`Error generating pdf: ${err}`);
        });
    }

    // const toggleMenu = () =>{
    //     setShowMenu(!showMenu)
    // }

    const resetState = ()=>{
        setShowBiodata(false)
        setShowProgram(false)
        setShowProfile(false)
        setShowUploadResult(false)
    }

    useEffect(()=>{

      if (user) {
          if (user.payment){
            if (user.payment.status === "success"){
              setPaymentSuccess(true)
            }
              
          }else{
              setPaymentSuccess(false)
          }

          if (user.olevel_result){
            setUploadedResult(true)
          }

          if (user.biodata){
              setUploadedBio(true)
          }

          if (menuState){
            setMenuClassList("menu open-nav")
        }else{
            setMenuClassList("menu")
        }
      }else {
        const activeUser = localStorage.getItem('schoolUser')
        activeUser && JSON.parse(activeUser)
      ? setUser(JSON.parse(activeUser))
      : setUser(null);
      }

    }, [user, menuState])

    // disabled style
    const disabledStyle = {pointerEvents: 'none', opacity: '0.6'}

    return(
        <div className="dashboard">
          
            
            <div className="dash-container">
           
                <div className="nav-div">
                    <nav className={menuClassList}>  

                    <Icon className="close-icon"icon="codicon:chrome-close" onClick={handleCloseMenu} /> 
                   
                        <br />
                        <div>
                        <p className="user-welcome">{user && `${user.firstname} ${user.surname}`}</p>
                        </div>
                        
                        
                        <ul>
                        
                            <li 
                            className={showprofile ? 'active-tab': ''}
                            onClick={() => {
                                    resetState();
                                    setShowProfile(true);
                                    setShowTitle('Profile')
                                  }}
                                  >
                               <p>Profile</p>
                              
                            </li>

                      
                          <li
                          className={showProgram ? 'active-tab': ''}
                          style = { paymentSuccess === true ? disabledStyle : {} }
                            onClick={() => {
                                
                                resetState();
                                setShowProgram(true);
                                setShowTitle('Program')
                              }}>
                                <p>Program</p>
                            </li>
                        
                      

                    { 
                        paymentSuccess 
                        ?<>
                            <li
                            className={showBiodata ? 'active-tab': ''}
                            style = { uploadedBio ? disabledStyle : {} }
                            onClick={() => {
                                resetState();
                                setShowBiodata(true);
                                setShowTitle('Biodata')
                              }}>
                                <p>Biodata</p>
                            </li>
                        {
                            uploadedResult ?
                            null
                            : <>
                                 <li
                                 className={showResult ? 'active-tab': ''}
            
                                 style={uploadedResult? disabledStyle : {}}
                            
                            onClick={() => {
                                resetState();
                                setShowUploadResult(true);
                                setShowTitle('Upload Result')
                              }}>
                                <p>Upload Result</p>
                            </li>
                            </>
                        }
                           
                            </>

                        : null
                    }
                            
                        </ul>

                    </nav>
                    <div className='backdrop' style={menuState ? {display:'block'} : {display:'none'}} onClick={handleCloseMenu}></div>

                    </div>

                

                <div className="views">
                {Header}


                    <div className="icon-div" >
                        {/* <FaBars className='menu-icon'  size={27} onClick={handleOpenMenu}/> */}
                        <Icon className="menu-icon" icon="eva:menu-outline" onClick={handleOpenMenu}/>
                        
                    </div>
                    <p>Dashboard / <span>{showTitle}</span></p>
                    <hr />

                   {
                    showTitle === "Profile" ? 
                       <div>
                       <h3>
                           Welcome to your Dashboard
                       </h3>
                       { uploadedBio && uploadedResult
                       ?
                          <div> 
                              <button className="print result-btn" onClick={handlePrint} >Print Details</button>
                          </div>
                      
                         : null
                       }
                        <div>
                            <p>Name: {user && `${user.firstname}`}</p>
                            <p>Surname: {user && `${user.surname}`}</p>
                            <p>Email: {user && `${user.email}`}</p>
                            <p>Phone: {user && `${user.phone}`}</p>
                       </div>
                       
                       
                    </div>
                    : 
                        showTitle === "Program" ?
                        <Programs user={user} payment={handlePaymentComp} startBar={ startBar} stopBar={ stopBar}  />
                            : showTitle === "Upload Result" 
                            ? <ResultUploadView user={user} result={handleResultUpload} startBar={ startBar} stopBar={ stopBar}/>
                             :  showTitle ==='Biodata'?
                                <Biodata user={user} startBar={ startBar} stopBar={ stopBar} bio={handleBioUpload} />
                                : null
                   }
                    

                </div>
            </div>
        </div>
       
    )
};

export default Dashboard;