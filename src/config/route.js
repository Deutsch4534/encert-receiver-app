import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  
} from 'react-router-dom';
import history from './history';
import App from '../App'
import Home from '../mainPage'
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import { Certificate } from 'crypto';
import SingleCertificate from '../SingleCertificate';

const BasicRouting = () => {

  return ( 

  <Router  history={history}>
    <div>
            <Route exact path="/" component={Login} />
            {/* <Route exact path="/" component={App} /> */}
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Certificate" component={SingleCertificate} />
    </div>
   </Router>
  )
}

export default (BasicRouting);