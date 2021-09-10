import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import HeaderMenu from './Structure/HeaderMenu';
import {AuthProvider} from './helpers/auth.context'
import RouterManager from './helpers/routerManager'
import { Provider } from 'react-redux';
import {configureStore} from './Store/store'


const store = configureStore();

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <header className="App-header">
              <HeaderMenu></HeaderMenu>
          </header>
          <div className="App">
          <RouterManager></RouterManager>
          </div>
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;


