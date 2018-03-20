import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import GlobalContainer from './containers/home/GlobalContainer'

import './App.css';

const App = () => (
  <Router>
    <GlobalContainer/>
  </Router>
);

export default App;
