import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Test} from './components/Greet' //to import specific variables
import Greet from './components/Greet'

function App() {
  return (
    <div className="App">
      <Test/>
      <Greet/>
    </div>
  );
}

export default App;
