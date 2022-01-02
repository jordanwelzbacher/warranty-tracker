import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './components/HomePage';
import WarrantyList from './components/WarrantyList';
import WarrantyForm from './components/WarrantyForm';
import Warranty from './components/Warranty';

import Nav from './components/Nav';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function App() {

  return (
    <div className="App">
      <CssBaseline />

      <Router>
        <Nav />
        <Container sx={{mt: 5}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/warranties' element={<WarrantyList />} />
            <Route path='/warranty/:id' element={<Warranty />} />
            <Route path="/edit/:id" element={<WarrantyForm />} />
            <Route path="/edit" element={<WarrantyForm />} />
          </Routes>
        </Container>
      </Router>

    </div >
  );
}

export default App;
