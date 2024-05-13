import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer: rootReducer }, composeWithDevTools());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
