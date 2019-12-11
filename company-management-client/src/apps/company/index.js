import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';

// Company Routes
import AllCompany from './all.js';
import OneCompany from './one.js';

function CompanyRouter() {
  return (
    <Router>
      <Route exact path="/company/" component={ AllCompany }/>
      <Route path="/company/:id" component={ OneCompany }/>
    </Router>
  )
}

export default CompanyRouter
