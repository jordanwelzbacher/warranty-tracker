import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import WarrantyService from '../services/WarrantyService';
import IssuerTypeService from '../services/IssuerTypeService';
import moment from 'moment';

import DateAdapter from '@mui/lab/AdapterMoment';
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';


const WarrantyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [issuer, setIssuer] = useState('');
  const [issuerType, setIssuerType] = useState("");
  const [popUrl, setPopUrl] = useState('');

  const [issuerTypes, setIssuerTypes] = useState([]);

  useEffect(() => {
    fetchTypes()
    if (id) fetchWarranty(id)
  }, [])

  function fetchTypes() {
    IssuerTypeService.getTypes().then((response) => {
      if (response.status === 200) {
        console.log(response.data.issuerTypes)
        setIssuerTypes(response.data.issuerTypes)
      }
    })
  }

  function fetchWarranty(warrantyId) {
    WarrantyService.getById(warrantyId).then((response) => {
      if (response.status === 200) {
        const warranty = response.data.warranty
        setProduct(warranty.product)
        setPurchaseDate(warranty.purchaseDate)
        setExpirationDate(warranty.expirationDate)
        setIssuer(warranty.issuer)
        setIssuerType(warranty.issuerTypeDescription)
        setPopUrl(warranty.popUrl)
      }
    })
  }

  function handleSubmit() {
    if (id) {
      WarrantyService.updateById(id, formAsJson())
        .then((response) => {
          if (response.status === 200) {
            navigate(`/warranty/${response.data.warranty.id}`)
          }
          console.log(response)
        })
    } else {
      WarrantyService.add(formAsJson())
        .then((response) => {
          if (response.status === 201) {
            navigate(`/warranty/${response.data.id}`)
          }
          console.log(response)
        })
    }
  }

  function getIssuerTypeIdByDescription(desc) {
    return issuerTypes.find((type) => type.description == desc).id
  }

  function formAsJson() {
    return {
      "userId": 1,
      "product": product,
      "purchaseDate": purchaseDate,
      "expirationDate": expirationDate,
      "issuer": issuer,
      "issuerTypeId": getIssuerTypeIdByDescription(issuerType),
      "popUrl": popUrl
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <h2>{id ? 'Update' : 'Add'} Warranty</h2>
      <FormControl style={{ minWidth: 120 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField style={{ minWidth: 210 }} length="200px" label="Product" variant="filled" value={product} onChange={(e) => setProduct(e.target.value)} />
          </Grid>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Grid item xs={12}>
              <MobileDatePicker
                style={{ minWidth: 210 }}
                label="Purchase Date"
                inputFormat="MM/DD/yyyy"
                value={purchaseDate}
                onChange={(newValue) => setPurchaseDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <MobileDatePicker
                style={{ minWidth: 210 }}
                label="Warranty Expiration Date"
                inputFormat="MM/DD/yyyy"
                value={expirationDate}
                onChange={(newValue) => setExpirationDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField style={{ minWidth: 210 }} label="Issuer" variant="filled" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                style={{ minWidth: 210 }}
                value={issuerType}
                label="Issuer Type"
                onChange={(e) => { setIssuerType(e.target.value) }}
              >
                {issuerTypes ? issuerTypes.map((type) => {
                  return <MenuItem key={type.id} value={type.description}>{type.description}</MenuItem>
                }) : <></>}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField style={{ minWidth: 210 }} label="Proof of Purchase URL" variant="filled" value={popUrl} onChange={(e) => setPopUrl(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Grid>
            <Grid item xs={12}>
              Proof of Purchase:<br />
              <img height="500px" src={popUrl} />
            </Grid>
          </LocalizationProvider>
        </Grid>
      </FormControl >
    </Box >
  )
}

export default WarrantyForm
