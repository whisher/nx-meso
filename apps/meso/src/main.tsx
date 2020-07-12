// Core
import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { ConnectedRouter } from 'connected-react-router';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// Store
import { authLogout } from './app/store/auth';
import store, { history, persistor } from './app/store/store';
import setupAxiosInterceptors from './axios-interceptor';

// App
import App from './app/App';

const { dispatch } = store;
setupAxiosInterceptors(() => {
  dispatch(authLogout());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
