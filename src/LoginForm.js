import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {TextField, InputAdornment} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IoIosAdd} from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';

import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  input: {
    color: "#666D92"
  }
}));

const LoginForm = ({ handleClose, data }) => {
  let navigate = useNavigate();
  let location = useLocation();
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [operation, setOperation] = useState('');
  const formik = useFormik({
    initialValues: {
      email: 'Email',
      password: '********',
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      localStorage.setItem('jwt_token', values.email + values.password)
      navigate("/" + location.search);
    },
  });

  const handleClickShowPassword = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword)

  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(firstName, lastName, email);
    console.log("DATA", data)
    localStorage.setItem('jwt_token', email + password)
    navigate("/" + location.search);
  };
  const redirectToMainPage = () =>{
    navigate("/" + location.search);
  }

  return (

   
    <form style={{position: 'center', margin:'5%'
     }} className={classes.root} onSubmit={formik.handleSubmit}>
    <div style={{
fontWeight: '600',
fontSize: '32px',
color: '#666D92',
marginRight: '10.5%'
}}>Accédez à </div>
    <div style={{
fontWeight: '600',
fontSize: '32px',
color: '#0000FF',
marginRight: '10%'
}}>Tuto-React</div>
    <div style={{marginTop: '2%'}}>
    <InputLabel id="label" >Email</InputLabel>
      <TextField
            className="fieldInput"
            size ="small"

            inputProps={{ className: classes.input }}      

        id="email"
        name="email"
        variant="outlined"

        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <InputLabel id="label" >Mot de passe</InputLabel>

      <TextField
            className="fieldInput"

            size ="small"

            InputProps={{ className: classes.input, 
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {formik.values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) }}      

        id="password"
        name="password"
        type={formik.values.showPassword ? 'text' : 'password'}
        variant="outlined"

       
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
    </div>
    
      <div style={{ color: '#00008C',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '120%',
    marginRight: '11%',
     }}>
        <Checkbox defaultChecked style={{ color: '#00008C', marginRight: '0%'}} />
        Se souvenir de moi
      </div>
      <Button  style={{backgroundColor: '#0000FF', color: 'white', borderRadius: '24px', display: 'flex', width: '320px', height: '44px', textTransform: 'lowercase'}}  variant="contained"  type="submit">
        <span>Connexion</span>
      </Button>
      <Button  style={{backgroundColor: '#0000FF', color: 'white', borderRadius: '24px', display: 'flex', width: '320px', height: '44px', textTransform: 'lowercase'}}  variant="contained"  onClick={redirectToMainPage}>
        <span>Continuer sans se connecter</span>
      </Button>
    </form>

    /*
    <form className={classes.root} onSubmit={handleSubmit}>
      <div>Accédez à Tuto React</div>

      <div>
        <InputLabel id="label">Email</InputLabel>

        <TextField
          label="input.input@mail.fr"

          variant="filled"
          type="email"

          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <InputLabel id="label">Mot de passe</InputLabel>

        <TextField
          label="Password"

          variant="filled"
          type="password"

          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Checkbox defaultChecked />
        Se souvenir de moi
      </div>
  
    
    
    
    
   
      <div>
         <Button type="submit" variant="contained" color="primary" sx={ { borderRadius: 28 } }>
          Connexion
        </Button>
  
   
      </div>
    </form>*/
  )
};

export default LoginForm;