import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  deepOrange500,
  deepOrange700,
  blueGrey500,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500,
    primary2Color: deepOrange700,
    accent1Color: blueGrey500,
  },
});

const ThemedApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(<ThemedApp />, document.getElementById('root'));
registerServiceWorker();
