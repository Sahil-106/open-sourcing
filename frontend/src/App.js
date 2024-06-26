import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './Pages/Landingpage/Landingpage';
import Datapage from './Pages/Datapage/Datapage';
import Notfound from './Pages/Notfound/Notfound';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landingpage/>} />
        <Route path='/data' element={<Datapage/>} />
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </Router>
  );
}

export default App;