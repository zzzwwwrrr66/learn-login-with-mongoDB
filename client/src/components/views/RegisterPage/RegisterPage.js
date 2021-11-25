import React, {useState, memo} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import { signUpUser } from '../../../_actions'


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const emailOnChange = (e) => {
    setEmail(e.target.value.trim())
  }
  const passwordOnChange = (e) => {
    setPassword(e.target.value.trim())
  }
  const nameOnChange = (e) => {
    setName(e.target.value.trim())
  }
  const validation =()=> { 
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]/; 
    return check.test(name); 
  }
  const addSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const data = {
      name,
      email,
      password
    }

    dispatch(signUpUser(data))
    .then(res => {
      console.log(res)
      if(res.payload.success) {
        navigate('/LoginPage');
      }
    });

  }

  return ((
    <>
      <h2>RegisterPage</h2>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 'auto' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={addSubmit}
    >
      <TextField
          id="outlined-multiline-flexible"
          label="Email"
          multiline
          value={email}
          // maxRows={4}
          // value={}
          onChange={emailOnChange}
        />
      <TextField
          id="outlined-multiline-flexible"
          label="Name"
          multiline
          value={name}
          onChange={nameOnChange}
          error={validation()}
          helperText={validation() ? '한글, 특수기호금지!' : ''}
        />
      <TextField
          id="outlined-multiline-flexible"
          label="Password"
          multiline
          type="number"
          value={password}
          onChange={passwordOnChange}
        />
      <Button type="submit" variant="contained" >Submit</Button>
    </Box>
    </>
  )) 
}

export default memo(RegisterPage)