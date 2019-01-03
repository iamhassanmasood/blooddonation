import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CustomeRoutes from './Components/Routes';
ReactDOM.render(<CustomeRoutes/>, document.getElementById('root'));


serviceWorker.unregister();
