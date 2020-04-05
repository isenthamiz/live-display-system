import React from 'react';
import ReactDOM from 'react-dom';
import App from './lib/App';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/index.css'

const app = (
  <div>
      <App />
  </div>
)

ReactDOM.render(app, document.getElementById('root'));


