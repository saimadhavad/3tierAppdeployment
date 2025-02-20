import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation'

function Dashboard() {

    let userDetails = useSelector( (store)=>{
        return store.userDetails;
    })

  return (
    <div className='App dashboardDiv'>
        <TopNavigation/>
        <h1>Dashboard</h1>
        <h2>Welcome, {userDetails.firstName}🍃</h2>
        <img className='dashboardPPPreview' src={`1/${userDetails.profilePic}`} alt={`${userDetails.lastName}'s Image`}></img>
    </div>
  )
}

export default Dashboard
