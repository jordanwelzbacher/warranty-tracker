import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import WarrantyService from '../services/WarrantyService';
import IssuerTypeService from '../services/IssuerTypeService';
import moment from 'moment';

import DateAdapter from '@mui/lab/AdapterMoment';
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const Warranty = () => {
  const { id } = useParams();

  const [warranty, setWarranty] = useState([]);
  const [issuerTypes, setIssuerTypes] = useState([]);
  const [content, setContent] = useState(<></>);

  const [product, setProduct] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [issuer, setIssuer] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  function handleChange() {
    console.log('hi')
  }

  const fetchWarranty = async () => {
    const warrantyData = await WarrantyService.getById(id);
    const { warranty } = warrantyData.data;
    console.log(warranty)
    setWarranty(warranty);
    console.log(warranty)

    const typesData = await IssuerTypeService.getTypes();
    const { issuerTypes } = typesData.data
    console.log(issuerTypes)
    setIssuerTypes(issuerTypes);
    console.log(issuerTypes)

    setContent(
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="filled-basic" label="Product" variant="filled" value={warranty.product} disabled={isEditing} />
          </Grid>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Grid item xs={12}>
              <MobileDatePicker
                disabled={isEditing}
                label="Purchase Date"
                inputFormat="MM/DD/yyyy"
                value={warranty.purchaseDate}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <MobileDatePicker
                disabled={isEditing}
                label="Warranty Expiration Date"
                inputFormat="MM/DD/yyyy"
                value={warranty.expirationDate}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField disabled={isEditing} id="filled-basic" label="Issuer" variant="filled" value={warranty.issuer} disabled={isEditing} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="issuerType">Issuer Type</InputLabel>
              <Select
                disabled={isEditing}
                labelId="issuerType"
                id="demo-simple-select"
                value=''
                label="Issuer Type"
                onChange={handleChange}
              >
                {issuerTypes.forEach(type => {
                  <MenuItem value={type.description}>{type.description}</MenuItem>
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              Proof of Purchase:<br />
              <img src={warranty.popUrl} />
            </Grid>
          </LocalizationProvider>
        </Grid>
      </div>
    )
  }

  useEffect(() => {
    fetchWarranty()
    console.log(warranty)
    console.log(issuerTypes)

  }, [])

  return (
    <div>
      {content}
    </div>
  )
}

export default Warranty
