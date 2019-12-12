import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import './App.css';

import apps from './apps';
import Main from './layout';
import CompanyRouter from './apps/company';
import EmployeeRouter from './apps/employee';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'

library.add(
  faTrash,
  faEdit,
  faUserPlus
)

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={ Main }/>
        <Route exact path="/" component={ apps.services.home }/>
        { CompanyRouter() }
        { EmployeeRouter() }
      </Router>
    </div>
  );
}

export default App;
