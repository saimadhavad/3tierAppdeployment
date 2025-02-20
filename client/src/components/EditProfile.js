import React, { useEffect, useRef, useState } from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';

function EditProfile() {
  let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNumberInputRef = useRef();
    let profilePicInputRef = useRef();

    let[profilePic, setProfilePic] = useState("./images/no-pic.png");

    let userDetails = useSelector( (store)=>{
      return store.userDetails;
    });

    useEffect( ()=>{
      firstNameInputRef.current.value = userDetails.firstName;
      lastNameInputRef.current.value = userDetails.lastName;
      ageInputRef.current.value = userDetails.age;
      emailInputRef.current.value = userDetails.email;
      mobileNumberInputRef.current.value = userDetails.mobileNumber;
      setProfilePic(`ePic}`);
    },[]);

    //FORMDATA - UPDATE & DELETE
    let onUpdateProfile = async ()=>{
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

        let reqOptions = {
            method: "PATCH",
            body:dataToSend,
        }

        let JSONData =  await fetch("/updateProfile",reqOptions);
        // (JSON=>JSO)
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.message);
    }
    let deleteProfile =  async ()=>{

      let dataToSend = new FormData();
      dataToSend.append("email",userDetails.email);

      let reqOptions = {
        method:"DELETE",
        body:dataToSend,
      };
      let JSONData = await fetch("/deleteProfile", reqOptions);
      let JSOData = await JSONData.json();
      alert(JSOData.message);

    }

  return (
    <div className='App editProfileDiv'>
      <TopNavigation/>
                <form>
        <h1 className='editProffileHOne'>Edit Profile</h1>

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
                <input ref={emailInputRef} type='email' placeholder='Enter your email' readOnly></input>
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
            <button type='button' onClick={ ()=>{onUpdateProfile();} }>
              Update Profile</button>
              <button type='button' onClick={ ()=>{deleteProfile();} }>
              Delete Profile</button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
