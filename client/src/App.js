import React from 'react';
import './App.css'
import Navbar from './components/header/Navbar';
import Add from './components/body/Add';
import Csv from './components/body/Csv';
import Show from './components/body/Show';
import Contact from './components/body/Contact';
import { Route } from 'react-router-dom';

const App = () => {

  return (

    <div className="App">
      <Navbar />

      <Route exact path="/">
        <Add />
      </Route>
      <Route path="/csv">
        <Csv />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/show">
        <Show />
      </Route>
    </div >
  );
}

export default App;
