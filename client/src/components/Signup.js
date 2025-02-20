import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNumberInputRef = useRef();
    let profilePicInputRef = useRef();

    let[profilePic, setProfilePic] = useState("./images/no-pic.png");

    useEffect( ()=>{
        axios.defaults.baseURL ="";
    },[] );

    // JSON (JSO=>JSON)
    let onSignupUsingJSON = async () =>{
        let dataToSendJSO = {
            firstName:firstNameInputRef.current.value,
            lastName:lastNameInputRef.current.value,
            age:ageInputRef.current.value,
            email:emailInputRef.current.value,
            password:passwordInputRef.current.value,
            mobileNumber:mobileNumberInputRef.current.value,
            profilePic:profilePicInputRef.current.value,
        };
        let dataToSendJSON = JSON.stringify(dataToSendJSO);
        console.log("--- JSO ---");
        console.log(dataToSendJSO);
        console.log("--- JSON ---");
        console.log(dataToSendJSON);

        let myHeaders = new Headers();
        myHeaders.append("content-type", "application/json");

        let reqOptions = {
            method: "POST",
            body: dataToSendJSON,
            headers: myHeaders,
        };

        let JSONData =  await fetch("1/signup",reqOptions);
        console.log(JSONData);
    }
    // URL ENCODED
    let onSignupUsingURLE =  async () =>{
        let dataToSend = new URLSearchParams();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobileNumber",mobileNumberInputRef.current.value);
        
        let myHeaders = new Headers();
        myHeaders.append("content-type","application/x-www-form-urlencoded");
        
        let reqOptions = {
            method:"POST",
            body:dataToSend,
            headers:myHeaders,
        };

        let JSONData =  await fetch("/signup",reqOptions);
        // (JSON=>JSO)
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.message);
    }
    //FORMDATA
    let onSignupUsingFormData = async()=>{
        let dataToSend =  new FormData();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobileNumber",mobileNumberInputRef.current.value);
        
        for(let i=0; i<profilePicInputRef.current.files.length; i++){
            dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
        }

        // let reqOptions = {
        //     method: "POST",
        //     body:dataToSend,
        // }

        let response =  await axios.post("/signup",dataToSend);
        // (JSON=>JSO)
        // let JSOData = await JSONData.json();
        console.log(response.data);
        alert(response.data.message);
    }


  return (
    <div className='App signupDiv'>
      <form>
        <h1 className='signupHOne'>Signup</h1>

        {/* FIRSTNAME DIV */}
        <div className='formGroup'>
            <label>First Name</label>
            <span>:</span>
            <div className='inputRight'>
                <input ref={firstNameInputRef} placeholder='Enter your first name'></input>
            </div>
        </div>
                {/* LASTNAME DIV */}
                <div className='formGroup'>
            <label>Last Name</label>
            <span>:</span>
            <div className='inputRight'>
                <input ref={lastNameInputRef} placeholder='Enter your last name'></input>
            </div>
        </div>

        {/* AGE DIV */}
        <div className='formGroup'>
            <label>Age</label>
            <span>:</span>
            <div className='inputRight'>
                <input ref={ageInputRef} type='number' placeholder='Enter your age'></input>
            </div>
        </div>

        {/* EMAIL DIV */}
        <div className='formGroup'>
            <label>Email</label>
            <span>:</span>
            <div className='inputRight'>
                <input ref={emailInputRef} type='email' placeholder='Enter your email'></input>
            </div>
        </div>

        {/* PASSWORD DIV */}
        <div className='formGroup'>
            <label>Password</label>
            <span>:</span>
            <div className='inputRight'>
                <input ref={passwordInputRef} type='password' placeholder='Enter your password'></input>
            </div>
        </div>

        {/* MOBILENUMBER DIV */}
        <div className='formGroup'>
            <label>Mobile Number</label>
            <span>:</span>
            <div className='inputRight'>
                <input ref={mobileNumberInputRef} type='number' placeholder='Enter your mobile number'></input>
            </div>
        </div>
        {/* PROFILEPIC DIV */}
        <div className='formGroup'>
            <label>Profile Pic</label>
            <span>:</span>
            <div className='inputRight'>
                <input ref={profilePicInputRef} type='file'
                 onChange={(event)=>{
                        let selectedPicPath = URL.createObjectURL(event.target.files[0]);
                        setProfilePic(selectedPicPath);
                    }
                }></input>
            </div>
        </div>
        {/* PROFILEPIC PREVIEW DIV */}       
        <div className='inputRight'>
                <img className='profilePicPreview' src={profilePic}></img>
            </div>

        {/* BUTTON DIV */}
        <div className='buttonDiv'>
            <button type='button' onClick={()=>
                {onSignupUsingJSON();}
            }>Signup [JSON]</button>   
            <button type='button' onClick={()=>
            {onSignupUsingURLE();}                
            }>Signup [URL ENCODED]</button>   
            <button type='button' onClick={()=>
            {onSignupUsingFormData();}                
            }>Signup [FORM DATA MULTER]</button>    
            <Link to="/" className='signinLinkBTN'>Signin</Link> 
        </div>
      </form>
    </div>
  )
}

export default Signup
