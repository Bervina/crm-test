import React from 'react';
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import RootNavigation from './navigation/root-navigation';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
