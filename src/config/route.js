import React from 'react';
import {
  BrowserRouter as Router,
  Route,  
} from 'react-router-dom';
import history from './history';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import SingleCertificate from '../SingleCertificate';

const BasicRouting = () => {

  return ( 
  <Router  history={history}>
    <div>
            <Route exact path="/" component={Login} />         
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/certificate" component={SingleCertificate} />
    </div>
   </Router>
  );
}

export default (BasicRouting);