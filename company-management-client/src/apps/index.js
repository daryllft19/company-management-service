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

class Test extends Component {
  render(){
    return (
      <Container>
        { process.env.REACT_APP_GRAPHQL_ENDPOINT }
        <h1>Test</h1>
        <h3>Sample</h3>
      </Container>
    );
  }
}

export default {
  services: {
    home: Home,
    company: Company 
  }
}
