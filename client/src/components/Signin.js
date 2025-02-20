import React, { useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch }  from 'react-redux';
import axios from 'axios';

function Signin() {

   
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect( ()=>{
        axios.defaults.baseURL ="";
        if(localStorage.getItem("token")){
            // onValidateToken();
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
        }
    },[] );
    
    let onValidateToken = async ()=>{

        let dataToSend = new FormData();
        dataToSend.append("token", localStorage.getItem("token"));
        
        let reqOptions = {
            method: "POST",
            body:dataToSend,
        }

        let JSONData =  await fetch("/validateToken",reqOptions);
        // (JSON=>JSO)
        let JSOData = await JSONData.json();
        console.log(JSOData);
        // alert(JSOData.message);

        if(JSOData.status === "SUCCESS"){
            dispatch({ type:"signin", data:JSOData.data });
            navigate("/dashboard")
        }
    };
  
    //FORMDATA
    // let onSignin = async()=>{
    //     let dataToSend =  new FormData();
    //     dataToSend.append("email",emailInputRef.current.value);
    //     dataToSend.append("password",passwordInputRef.current.value);
    //     let reqOptions = {
    //         method: "POST",
    //         body:dataToSend,
    //     }
    //     let JSONData =  await fetch("/signin",reqOptions);
    //     // (JSON=>JSO)
    //     let JSOData = await JSONData.json();
    //     console.log(JSOData);
    //     // alert(JSOData.message);

    //     if(JSOData.status === "SUCCESS"){
    //         localStorage.setItem("token",JSOData.data.token);
    //         dispatch({ type:"signin", data:JSOData.data });
    //         navigate("/dashboard");
    //     }
    // }

    // AXIOS
    let onSignin = async()=>{
        let dataToSend =  new FormData();
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);

        let response = await axios.post("/signin",dataToSend);
        console.log(response);

        if(response.data.status === "SUCCESS"){
            localStorage.setItem("token",response.data.data.token);
            dispatch({ type:"signin", data:response.data.data });
            navigate("/dashboard");
        }
    }


  return (
    <div className='App signinDiv'>
      <form>
        <h1 className='signinHOne'>Signin</h1>

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

        {/* BUTTON DIV */}
        <div>
            <button type='button' onClick={()=>
                {onSignin();}
            }>Signin</button> 
            <Link to="/signup" className='signupLinkBTN'>Signup</Link>     
        </div>
      </form>
    </div>
  )
}

export default Signin
