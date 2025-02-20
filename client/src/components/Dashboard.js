import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation'
import axios from 'axios'
function Dashboard() {

    let userDetails = useSelector( (store)=>{
        return store.userDetails;
    })
    useEffect( ()=>{
            axios.defaults.baseURL ="";
        },[] );

  return (
    <div className='App dashboardDiv'>
        <TopNavigation/>
        <h1>Dashboard</h1>
        <h2>Welcome, {userDetails.firstName}🍃</h2>
        <img className='dashboardPPPreview' src={`/${userDetails.profilePic}`} alt={`${userDetails.lastName}'s Image`}></img>
    </div>
  )
}

export default Dashboard
