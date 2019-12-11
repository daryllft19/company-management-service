import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';

// Routes
import AllEmployee from './all.js';
import OneEmployee from './one.js';

function EmployeeRouter() {
  return (
    <Router>
      <Route path="/employee" component={ AllEmployee }/>
      <Route path="/employee/:id" component={ OneEmployee }/>
    </Router>
  );
}

export default EmployeeRouter
