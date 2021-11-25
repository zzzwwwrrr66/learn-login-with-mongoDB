import React, { useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';

const LandingPage = (props) => {
 
  useEffect(()=>{
    console.log(document.cookie)
    console.log(props)
  });


  const logOutBtn = () => {
    axios.get('/api/users/logout')
  }

  return ((
    <>
      <p>LandingPage</p>
      <Button variant="contained" onClick={logOutBtn}>Logout</Button>
    </>
  )) 
}

export default LandingPage