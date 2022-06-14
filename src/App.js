import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {CustomPaginationActionsTable} from './table.js';
import { StyledEngineProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { IoIosAdd} from 'react-icons/io';
import { MdOutlineLogout} from 'react-icons/md';
import { MdOutlineLogin} from 'react-icons/md';
import docaposteImage from './docaposteImage.png';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';


import { BsFillCheckCircleFill } from 'react-icons/bs';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Form from './Form.js'
import ModalDialog from './ModalDialog';
import LoginForm from './LoginForm';
import {UserService} from './userService'
import axios from 'axios';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";







import {BasicTable} from './test.js'
import {CustomizedTables} from './test2.js'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {

  const [openBar, setOpenBar] = React.useState(false);
  const [operation, setOperation] = React.useState({});
  //const [modal, setModal] = React.useState({ data: null });

  const handleCallback = (childData) =>{
    setOperation(childData);
    setOpenBar(true);
    console.log(childData)
  }
  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenBar(false);
  };
  let navigate = useNavigate();
  let location = useLocation();
  const backEndUrl = "http://localhost:3300/";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    console.log('CLOSEOK')
    setOpen(false)
  };
  const disconnectUser = () => {
    localStorage.removeItem('jwt_token');
    navigate("/" + location.search);
  }
  const openLoginForm = () => {
    navigate("/login" + location.search);

  }

  return (
    <div className="App">
      <header className="App-header">

      {(localStorage.getItem('jwt_token')) ?
      <div style={{width: '91%', marginBottom: 50,display: 'flex'}}>
          <img src={docaposteImage} style={{width: 150, marginRight: '80%'}} />

  <Button variant="text"  style={{color: '#00008C',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '115%',
  textTransform: 'lowercase',

}} startIcon={<MdOutlineLogout />}  onClick={disconnectUser}>
 <span> Déconnexion </span>
  </Button>
      </div>
     :   <Button uppercase="false" sx={ { borderRadius: 28 } } style={{backgroundColor: '#0000FF',
     display: 'flex',
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
padding: '12px 24px 12px 20px',
gap: '8px',
marginRight: '72%',
marginBottom: '-55px',
textTransform: 'lowercase',
}} variant="contained" startIcon={<MdOutlineLogin size={30}/>}  onClick={openLoginForm}>
        <span>Se connecter</span>
      </Button> }

      <Button  sx={ { borderRadius: 28 } } style={{backgroundColor: '#0000FF',
      display: 'flex',
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
padding: '12px 24px 12px 20px',
gap: '8px',
marginLeft: '67%',
textTransform: 'lowercase',
 }} variant="contained" startIcon={<IoIosAdd size={30} />}  onClick={handleOpen}>
       <span> Ajouter un utilisateur </span>
      </Button>
      <ModalDialog open={open} handleClose={handleClose} appCallback={handleCallback} data={"addUser"}/>
      


      <CustomPaginationActionsTable style={{width: '80%'}}/>

      <Snackbar autoHideDuration={3000} ContentProps={{sx: {background: "white"}}} open={openBar}  onClose={handleCloseBar} 
      message={
        <div >
          {(operation.status == '201' || operation.status == '201') ?
          <><div style={{
              color: '#00008C', display: 'flex', fontSize: '16px',
              fontWeight: '600'
            }}>
              <BsFillCheckCircleFill size={45} style={{ color: 'green', height: '20px' }} />
              Succès
            </div><div style={{
              color: 'grey', marginLeft: '20px', marginTop: '5px', fontFamily: 'Barlow',
              fontWeight: '400',
              fontSize: '14px'
            }}>
                L'utilisateur a été ajouté avec succès

              </div></>
           : 
          <><div style={{
              color: '#00008C', display: 'flex', fontSize: '16px',
              fontWeight: '600'
            }}>
              <MdCancel size={45} style={{ color: 'red', height: '20px' }} />
              Echec
            </div><div style={{
              color: 'grey', marginLeft: '20px', marginTop: '5px', fontFamily: 'Barlow',
              fontWeight: '400',
              fontSize: '14px'
            }}>
                L'ajout de l'utilisateur a échoué

              </div></>

          }

         
        </div>
  
      }>

      
      </Snackbar>
      
        
      </header>
    </div>
  );
}

export default App;
