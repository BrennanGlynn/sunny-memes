import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import GlobalContainer from './containers/home/GlobalContainer'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles';
import './App.css';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

const theme = createMuiTheme({
  palette: {
      primary: {
        main: '#43a047',
      },
      secondary: {
        main: '#fff',
        contrastText: '#43a047',
      },
    },
});

const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <GlobalContainer/>
    </MuiThemeProvider>
  </Router>
);

export default withTheme()(App);
