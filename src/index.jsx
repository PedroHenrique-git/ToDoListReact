import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './style/index.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <StrictMode>
    <ToastContainer />
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
