import {useEffect, useState} from 'react';
import axios from "axios"
import moment from "moment"
import Header from './components/Header';
import WarrantyList from './components/WarrantyList';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <WarrantyList />
    </div>
  );
}

export default App;
