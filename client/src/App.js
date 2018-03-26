import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import GlobalContainer from './containers/home/GlobalContainer'
import {createMuiTheme, MuiThemeProvider, withTheme} from 'material-ui/styles';
import './App.css';

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
