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
          Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`
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
        <h1>{ this.props.match.params.id }</h1>
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
