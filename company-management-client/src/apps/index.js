import React, { Component } from 'react';

import Employee from './employee';
import Company from './company';

import { Container } from 'react-bootstrap';

class Home extends Component {
  render(){
    return (
      <Container>
        <h1>Home</h1>
        <h3>Welcome to NF Company Management System</h3>
      </Container>
    );
  }
}

export default {
  services: {
    home: Home,
    employee: Employee,
    company: Company 
  }
}
