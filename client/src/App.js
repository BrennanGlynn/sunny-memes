import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home'

import './App.css';

const App = () => (
    <Router>
        <Home/>
    </Router>
);

export default App;
