import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import { RiDeleteBinLine } from 'react-icons/ri';
import Button from '@mui/material/Button';
import { FiEdit3 } from 'react-icons/fi';
import ModalDialog from './ModalDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import { BsFillCheckCircleFill } from 'react-icons/bs';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';







import { FaBeer} from 'react-icons/fa';

import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';


import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
};


export function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState({ data: null });

  const [operation, setOperation] = React.useState({})
  const [openBar, setOpenBar] = React.useState(false);

  const handleBarClick = () => {
    setOpenBar(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenBar(false);
  };
  const handleCallback = (childData) =>{
    setOperation(childData);
    console.log(childData)
    setOpenBar(true);


  }

  const handleClose = () => {
    setOpen(false)
    axios.get(backEndUrl + 'users')
    .then(res => {
      setRows(res.data)
      console.log("rows", rows)
    })
  };
  const [rows, setRows] = React.useState([])
  const backEndUrl = "http://localhost:3300/";
  const axios = require('axios').default;
  React.useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    axios.get(backEndUrl + 'users')
    .then(res => {
      setRows(res.data)
      console.log("rows", rows)
    })
  }, []);

  const handleOpenEdit = (row) => {
    setOpen(true);
    setModal({ data: "editUser", rowData: row })
  };
  const handleOpenDelete = (row) => {
    setOpen(true);
    setModal({ data: "deleteUser", rowData: row })
  };



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer style={{ width: '80%' }} component={Paper}>
      <Table  aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell style={{color: '#00008C'}}>Nom</TableCell>
            <TableCell  style={{color: '#00008C'}}>Prénom</TableCell>
            <TableCell  style={{color: '#00008C'}}>Email</TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: 160, color: '#666D92' }} component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell style={{ width: 160, color: '#666D92' }}>
                {row.lastName}
              </TableCell>
              <TableCell style={{ width: 160, color: '#666D92' }} >
                {row.email}
              </TableCell>
              <TableCell style={{ width: 20 }} align="right">
                <IconButton style={{color: '#00008C'}} onClick={() => handleOpenEdit(row)} > <FiEdit3 /></IconButton>
                
              </TableCell>
              <TableCell style={{ width: '5%'}} >

              <IconButton style={{color: '#00008C'}} onClick={() => handleOpenDelete(row)}><RiDeleteBinLine /></IconButton>

              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          

        </TableBody>
        
        <TableFooter>

          <TableRow>
            <TablePagination
            style={{color: '#00008C'}}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              
            />
            
          </TableRow>
        </TableFooter>
      </Table>
      {(modal.data == "editUser" && modal.data != null) ? <ModalDialog tableCallback={handleCallback} open={open} handleClose={handleClose} data="editUser" rowData={modal.rowData}/> : (modal.data != null) ? <ModalDialog tableCallback={handleCallback} open={open} handleClose={handleClose} data="deleteUser" rowData={modal.rowData}/> : null}
      <Snackbar autoHideDuration={3000} ContentProps={{sx: {background: "white"}}} open={openBar}  onClose={handleCloseBar} 
      message={
        <div >
          {(operation.status == '200' || operation.status == '201') ?
          <div style={{
            color: '#00008C', display: 'flex', fontSize: '16px',
            fontWeight: '600'
          }}>
            <BsFillCheckCircleFill size={45} style={{ color: 'green', height: '20px' }} />
            Succès
          </div> : 
          <div style={{
            color: '#00008C', display: 'flex', fontSize: '16px',
            fontWeight: '600'
          }}>
            <MdCancel size={45} style={{ color: 'red', height: '20px' }} />
            Echec
          </div>

          }

          {(operation.operation == 'editUser' && (operation.status == '200' || operation.status == '201')) ? 
           <div style={{
            color: 'grey', marginLeft: '20px', marginTop: '5px', fontFamily: 'Barlow',
            fontWeight: '400',
            fontSize: '14px'
          }}>
            L'utilisateur a été modifié avec succès

          </div> : (operation.operation == 'editUser' && operation.status != '200') ?
           <div style={{
            color: 'grey', marginLeft: '20px', marginTop: '5px', fontFamily: 'Barlow',
            fontWeight: '400',
            fontSize: '14px'
          }}>
            La modification de l'utilisateur a échoué

          </div> : (operation.operation == 'deleteUser' && operation.status == '200') ?
          <div style={{
            color: 'grey', marginLeft: '20px', marginTop: '5px', fontFamily: 'Barlow',
            fontWeight: '400',
            fontSize: '14px'
          }}>
            L'utilisateur a été supprimé avec succès
          </div> :
           <div style={{
            color: 'grey', marginLeft: '20px', marginTop: '5px', fontFamily: 'Barlow',
            fontWeight: '400',
            fontSize: '14px'
          }}>
            La suppression de l'utilisateur a échoué
          </div>
           
          }

         
        </div>
  
      }>

      
      </Snackbar>
    </TableContainer>
  );
}
