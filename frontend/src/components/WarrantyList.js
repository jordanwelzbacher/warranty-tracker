import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import WarrantyService from '../services/WarrantyService';
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const WarrantyList = () => {
  const [warrantyList, setWarrantyList] = useState([]);

  //Modal handlers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [popImageUrl, setPopImageUrl] = useState('');
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: window.innerHeight,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate();

  const fetchWarranties = async () => {
    const data = await WarrantyService.getAll(1);
    const { warranties } = data.data;
    setWarrantyList(warranties);
    console.log(warranties);
  }

  useEffect(() => {
    fetchWarranties();
  }, [])

  function handleRowClick(id) {
    console.log(id);
    navigate(`/warranty/${id}`);
  }

  function handlePOPClick(e, id) {
    e.stopPropagation();
    setPopImageUrl(warrantyList.find(warranty => {return warranty.id == id}).popUrl)
    handleOpen();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Proof of Purchase
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
            <img src={popImageUrl} maxHeight="window.innerHeight" />
          {/* </Typography> */}
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Purchase Date</TableCell>
              <TableCell align="center">Expiration Date</TableCell>
              <TableCell align="center">Issuer</TableCell>
              <TableCell align="center">Issuer Type</TableCell>
              <TableCell align="center">Proof of Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warrantyList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                hover
                onClick={() => handleRowClick(row.id)}
              >
                <TableCell component="th" scope="row">{row.product}</TableCell>
                <TableCell align="center">{moment(row.purchaseDate).format('MMM D, YYYY')}</TableCell>
                <TableCell align="center">{moment(row.expirationDate).format('MMM D, YYYY')}</TableCell>
                <TableCell align="center">{row.issuer}</TableCell>
                <TableCell align="center">{row.issuerTypeDescription}</TableCell>
                <TableCell align="center">
                  <ReceiptLongIcon onClick={(e) => handlePOPClick(e, row.id)} sx={[{ '&:hover': { color: 'red', }, cursor: 'zoom-in' }]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default WarrantyList
