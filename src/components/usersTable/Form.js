import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from 'formik';
import {UserServices} from '../../services/userService'
import * as yup from 'yup';


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
    .string('Veuillez saisir votre nom')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .required('Veuillez remplir ce champ'),
  lastName: yup
    .string('Veuillez saisir votre prénom')
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .required('Veuillez remplir ce champ'),
  email: yup
    .string('Veuillez saisir votre adresse mail')
    .email('Veuillez saisir une adresse mail valide')
    .required('Veuillez remplir ce champ'),
});


const Form = ({ handleClose, data, rowData, parentCallback }) => {

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: 'Input',
      lastName: 'Input',
      email: 'input.input@mail.fr',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (data == "editUser") {
        UserServices.updateUser(rowData.id, values.firstName, values.lastName, values.email).then(res=>parentCallback({ operation: data, status: res.status }));
      }
      else if (data == "addUser") {
        UserServices.addUser(values.firstName, values.lastName, values.email).then(res=>parentCallback({ operation: data, status: res.status }));
      }
      handleClose();
    },  
  });

  React.useEffect(() => {
    if (data == "editUser"){
      UserServices.getUserById(rowData.id).then(res=>{
        formik.setFieldValue('firstName', res.data.firstName)
        formik.setFieldValue('lastName', res.data.lastName)
        formik.setFieldValue('email', res.data.email)
      });
    }
  }, []);

  const handleSubmit = () => {
    UserServices.deleteUser(rowData.id).then(res=>parentCallback({ operation: data, status: res.status }));
    handleClose();
  };


  return (

    <form className={classes.root} onSubmit={formik.handleSubmit} >
      {(data != "deleteUser") ? <div>
        <div style={{ display: 'flex' }}>
          <InputLabel id="label" style={{ color: '#00008C', marginTop: -15 }}>Nom</InputLabel>
          <TextField
            style={{ marginLeft: -20 }}
            className="fieldInput"
            id="firstName"
            name="firstName"
            size="small"
            inputProps={{ className: classes.input }}
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <InputLabel id="label" style={{ color: '#00008C', marginTop: -15, marginLeft: 15 }}>Prénom</InputLabel>
          <TextField
            style={{ marginLeft: -40 }}
            className="fieldInput"
            size="small"
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
          <InputLabel id="label" style={{ color: '#00008C' }}>Email</InputLabel>
          <TextField
            className="fieldInput"
            style={{ width: 417 }}
            id="email"
            name="email"
            variant="outlined"
            size="small"
            inputProps={{ className: classes.input }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
      </div> : <div style={{
        color: '#00008C',
        fontFamily: 'Barlow',
        fontWeight: '400',
        fontSize: '16px'
      }}>Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?</div>}

      <div style={{ marginTop: '5%', marginLeft: '43%' }}>
        <Button variant="text" style={{ color: '#0000FF', textTransform: 'lowercase' }} onClick={handleClose}  >
          <span>Annuler</span>
        </Button>
        {(data == "addUser") ? <Button type="submit" id="submitButton" variant="contained" style={{ backgroundColor: '#0000FF', color: 'white', borderRadius: '24px', height: '40px', textTransform: 'lowercase' }}>
          <span>Ajouter</span>
        </Button> : (data == "editUser") ?
          <Button type="submit" variant="contained" id="submitButton" style={{ backgroundColor: '#0000FF', color: 'white', borderRadius: '24px', height: '40px', textTransform: 'lowercase' }} >
            <span>Modifier</span>
          </Button> : <Button onClick={handleSubmit} style={{ backgroundColor: '#D82A2A', color: 'white', borderRadius: '24px', height: '40px', textTransform: 'lowercase' }} variant="contained" >
            <span>Supprimer</span>
          </Button>}


      </div>

    </form>
    
  );
};

export default Form;