import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function TopNavigation() {
  let navigate = useNavigate();
  let userDetails = useSelector((store)=>{
    return store.userDetails;
  });
  useEffect( ()=>{
    if(userDetails && userDetails.email){
    }
    else{
      navigate("/");
    }
  },[])
  return (
    <nav>
        <Link className='navLink' to="/dashboard">Dashboard</Link>
        <Link className='navLink' to="/tasks">Tasks</Link>
        <Link className='navLink' to="/leaves">Leaves</Link>
        <Link className='navLink' to="/editProfile">Edit Profile</Link>
        <Link className='navLink' to="/" onClick={()=>{
          localStorage.clear();
        }}>Signout</Link>
    </nav>
  )
}

export default TopNavigation
