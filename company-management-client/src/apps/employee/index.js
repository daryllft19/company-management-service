import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';

// Routes
import AllEmployee from './all.js';

function EmployeeRouter() {
  return (
    <Router>
      <Route path="/employee" component={ AllEmployee }/>
    </Router>
  );
}

export default EmployeeRouter
