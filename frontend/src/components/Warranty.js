import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WarrantyService from '../services/WarrantyService';
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


const Warranty = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [warranty, setWarranty] = useState([]);
  const [content, setContent] = useState(<></>);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverid = open ? 'simple-popover' : undefined;

  const handleDeleteConfirmClick = () => {
    WarrantyService.deleteById(id).then(() => {
      navigate('/warranties/', { deleted: warranty.product});
    }).error(() => {
      console.log("error deleting")
    })
  }

  const fetchWarranty = async () => {
    const warrantyData = await WarrantyService.getById(id);
    const { warranty } = warrantyData.data;
    setWarranty(warranty);

    setContent(
      <Paper sx={{ p: 2 }}>
        <h1 >Warranty Information</h1>
        <Table size="small" >
          <TableBody>
            <TableRow>
              <TableCell>
                <h3>Product:</h3>
              </TableCell>
              <TableCell>
                {warranty.product}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <h3>Purchase Date:</h3>
              </TableCell>
              <TableCell>
                {moment(warranty.purchaseDate).format('MMM D, YYYY')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <h3>Expiration Date:</h3>
              </TableCell>
              <TableCell>
                {moment(warranty.expirationDate).format('MMM D, YYYY')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <h3>Issuer:</h3>
              </TableCell>
              <TableCell>
                {warranty.issuer}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <h3>Issuer Type:</h3>
              </TableCell>
              <TableCell>
                {warranty.issuerTypeDescription}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div sx={{ m: 4 }}>
          <Button sx={{ mt: 3, mx: 2 }} variant="outlined" >Update</Button>
          <Button sx={{ mt: 3, mx: 2 }} variant="outlined" color="error" onClick={handleDeleteClick}>Delete</Button>

        </div>
        <br />
        Proof of Purchase:<br />
        <img src={warranty.popUrl} />
      </Paper>
    )
  }

  useEffect(() => {
    fetchWarranty()
  }, [])

  return (
    <div>
      {content}
      <Popover
        popoverid={popoverid}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure?</Typography>
        <Button sx={{ mb: 3, mx: 2 }} color="error" variant="contained" onClick={handleDeleteConfirmClick}>Confirm Delete</Button>
      </Popover>
    </div>
  )
}

export default Warranty
