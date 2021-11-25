import React, {useState, memo, useCallback} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions'
import { useLocation, useNavigate } from "react-router-dom";


const LoginPage = ({to, ...props}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const emailOnChange = useCallback((e) => {
    setEmail(e.target.value.trim());
  }, [email]);
  const passwordOnChange = (e) => {
    setPassword(e.target.value.trim());
  }
  const loginSubmit = (e) => {
    e.preventDefault();
    setResult('');
    
    let data = {
      email: email,
      password: password,
    }

    dispatch(loginUser(data)) 
    .then(res=> {
      if(res.payload.loginSuccess) {
        navigate('/');
      } else {
        setResult(res.payload.massage);
      }
    })
  }

  return ((
    <>
      <h2>LoginPage</h2>
      <div>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 'auto', flexDirection: 'column' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={loginSubmit}
    >
      <TextField
          id="outlined-multiline-flexible"
          label="Email"
          multiline
          // maxRows={4}
          value={email}
          onChange={emailOnChange}
        />
      <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          multiline
          autoComplete="current-password"
          // maxRows={4}
          value={password}
          onChange={passwordOnChange}
        />
      <Button type="submit" variant="contained">Login</Button>
    </Box>

    {
      result && <div>{result}</div>
    }
      </div>
    </>
  )) 
}

export default memo(LoginPage)