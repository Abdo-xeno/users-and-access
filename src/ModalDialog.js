import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Form from './Form';
import LoginForm from './LoginForm';

import { FiUserPlus, FiUserMinus} from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { AiOutlineClose } from 'react-icons/ai';
import IconButton from '@material-ui/core/IconButton';





const ModalDialog = ({ open, handleClose, data, rowData, appCallback ,tableCallback}) => {
  const [operation, setOperation] = useState({}, () => setOperation({operation: data}));
  const handleCallback = (childData) =>{
    console.log(data, childData)
    setOperation({operation: data, status: childData});
    console.log(data)
      console.log(operation);
      setTimeout(() => {
        if (data == "addUser"){
          appCallback(operation)
        }
        else {
          tableCallback(operation)
        }
        
      }, 2000);
      
   
    
  }
  React.useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
      //setOperation({operation: data});

     
  }, []);
  //parentCallback({})
  //passDataToParent('test')

  return (

      <Dialog style={{
        minWidth: '800px'
      }} open={open} onClose={handleClose}>
      
        {data == "addUser" ? <div className="modalText"><FiUserPlus style={{ marginRight: 10 }} /> Ajouter un utilisateur</div> : (data == "editUser") ? <div className="modalText"><FiEdit3 style={{ marginRight: 10 }} /> Modifier un utilisateur</div> : <div className="modalText"><FiUserMinus style={{ marginRight: 10 }} /> Confirmer la suppression</div>}
        <Form handleClose={handleClose} data={data} rowData={rowData} parentCallback={handleCallback} />
      </Dialog>
    
  );
};

export default ModalDialog;