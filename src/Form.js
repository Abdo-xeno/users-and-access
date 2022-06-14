import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { red } from '@mui/material/colors';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '190px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  input: {
    color: "#666D92"
  }
}));

const validationSchema = yup.object({
  firstName: yup
  .string('Enter your password')
  .min(8, 'Password should be of minimum 8 characters length')
  .required('Password is required'),
  lastName: yup
  .string('Enter your password')
  .min(8, 'Password should be of minimum 8 characters length')
  .required('Password is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});


const Form = ({ handleClose, data, rowData, parentCallback }) => {
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [operation, setOperation] = useState('');
  const [open, setOpen] = React.useState(false);
  const [res, setRes] = React.useState('')



  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
 


  const backEndUrl = "http://localhost:3300/";
  const formik = useFormik({
    initialValues: {
      firstName: 'Input',
      lastName: 'Input',
      email: 'input.input@mail.fr',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (data == "editUser"){
        axios.put(backEndUrl + 'users/' + rowData.id, {firstName: values.firstName, lastName: values.lastName, email: values.email})
        .then(res => {

          parentCallback(res.status);
          console.log('parent')




          })
      } 
      else if (data == "addUser") {
        axios.post(backEndUrl + 'users', {firstName: values.firstName, lastName: values.lastName, email: values.email})
        
          .then(res => {
            console.log('res',res)
            parentCallback(res.status);


          }).catch(err => {
            parentCallback(err.message)
            })
          
      }
      handleClose();
      console.log('afterclosed')



    },
    
  });
  React.useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    if (data == "editUser"){
      axios.get(backEndUrl + 'users/' + rowData.id)
      .then(res => {
        console.log(res)
        formik.setFieldValue('firstName', res.data.firstName)
        formik.setFieldValue('lastName', res.data.lastName)
        formik.setFieldValue('email', res.data.email);
      })
  
    }
  }, []);

  

  const handleSubmit = () => {

      console.log(rowData)
      axios.delete(backEndUrl + 'users/' + rowData.id)
        .then(res => {
          console.log('res',res)

          parentCallback(res.status);
          handleClose();


        })
    


  };


  return (

    <form className={classes.root} style={{
  }} onSubmit={formik.handleSubmit} >
      {(data != "deleteUser") ?  <div>
        
        <div style={{display: 'flex'}}>
        <InputLabel id="label" style={{color: '#00008C', marginTop: -15}}>Nom</InputLabel>
      <TextField
      style ={{marginLeft: -20}}
      className="fieldInput"
      id="firstName"
      name="firstName"
      size ="small"
      inputProps={{ className: classes.input }}      
        variant="outlined"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      

          <InputLabel id="label" style={{color: '#00008C', marginTop: -15, marginLeft: 15}}>Prénom</InputLabel>

      <TextField
      style ={{marginLeft: -40}}
            className="fieldInput"
            size ="small"

      id="lastName"
      name="lastName"
        variant="outlined"
        inputProps={{ className: classes.input }}      

        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
        </div>

    
   
      <div>
      <InputLabel id="label" style={{color: '#00008C'}}>Email</InputLabel>

<TextField
      className="fieldInput"
  style ={{width: 417}}
  id="email"
  name="email"
  variant="outlined"
  size ="small"

  inputProps={{ className: classes.input }}      


  value={formik.values.email}
  onChange={formik.handleChange}
  error={formik.touched.email && Boolean(formik.errors.email)}
  helperText={formik.touched.email && formik.errors.email}
/>
      </div>

   </div> : <div style={{color: '#00008C',
    fontFamily: 'Barlow',
    fontWeight: '400',
fontSize: '16px'}}>Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?</div>}

    

   <div style={{marginTop: '5%', marginLeft: '43%'}}>
        <Button variant="text"  style={{color: '#0000FF', textTransform: 'lowercase'}} onClick={handleClose}  >
          <span>Annuler</span>
        </Button>
        {(data == "addUser") ?  <Button type="submit" id="submitButton" variant="contained" style={{backgroundColor: '#0000FF', color: 'white', borderRadius: '24px', height: '40px', textTransform: 'lowercase'}}>
          <span>Ajouter</span>
        </Button> : (data == "editUser") ?      
        <Button type="submit" variant="contained" id="submitButton" style={{backgroundColor: '#0000FF', color: 'white', borderRadius: '24px',height: '40px', textTransform: 'lowercase'}} >
          <span>Modifier</span>
        </Button> :      <Button onClick={handleSubmit} style={{backgroundColor: '#D82A2A', color: 'white' , borderRadius: '24px', height: '40px', textTransform: 'lowercase'}} variant="contained" >
          <span>Supprimer</span>
        </Button>}
  
   
      </div>

    </form>
    
    /*
    <form className={classes.root} onSubmit={handleSubmit}>
        {(data != "deleteUser") ?  <div>
   <InputLabel id="label">Nom</InputLabel>
      <TextField
        label="Input"
        variant="filled"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
          <InputLabel id="label">Prénom</InputLabel>

      <TextField
              label="Input"

        variant="filled"
        
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
          <InputLabel id="label">Email</InputLabel>

      <TextField
        label="input.input@mail.fr"

        variant="filled"
        type="email"
        
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
   </div> : <div>Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?</div>}
  
    
    
    
    
   
      <div>
        <Button variant="contained" onClick={handleClose} sx={ { borderRadius: 28 } }>
          Annuler
        </Button>
        {(data == "addUser") ?  <Button type="submit" variant="contained" color="primary" sx={ { borderRadius: 28 } }>
          Ajouter
        </Button> : (data == "editUser") ?      
        <Button type="submit" variant="contained" color="primary" sx={ { borderRadius: 28 } }>
          Modifier
        </Button> :      <Button type="submit" variant="contained" style={{background: "red", color:"white"}} sx={ { borderRadius: 28 } }>
          Supprimer
        </Button>}
  
   
      </div>
    </form>*/
  );
};

export default Form;