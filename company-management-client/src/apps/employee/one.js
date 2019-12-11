import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.getCompanies = async () => {
      const res = await fetch('http://localhost:1337/companies', {
        headers: {
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTc1OTA5NTM1LCJleHAiOjE1Nzg1MDE1MzV9.C1YynHqlxGLu6vX-krOySyWLOOTUMH7fG8gtmnBgFfw'
        }
      })

      const employees = await res.json();
      this.setState({ employees })
    }
  }
  componentDidMount() {
    this.getCompanies();
  }
  render(){
    return (
      <Container>
        <h1>Company</h1>
        <h3>Welcome to NF Company Management System</h3>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.employees.map(e => {
              return (
                <tr key={ e.id }>
                  <td><Link to={`/company/${e.id}`}>{ e.name }</Link></td>
                  <td>{ e.address }</td>
                  <td>{ e.description || 'None' }</td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Company 
