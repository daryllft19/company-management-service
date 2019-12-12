import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Gql from 'nfgraphql';

class Company extends Component {
  constructor(props) {
    super(props);
    console.log(Gql);
  }
  render(){
    return (
      <Query query={GET_COMPANY} variables={{ id: parseInt(this.props.match.params.id) }}>
        {result => {
          if (result.data)
            return (
              <Container>
                <h1>{ result.data.company.name }</h1>
                <h3>Welcome to NF Company Management System</h3>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Position</th>
                      <th>Actions</th>
                    </tr>
                    {
                      result.data.company.employees.map(({ id, first_name, last_name, position }) => (
                        <tr key={ id }>
                          <td>{ id }</td>
                          <td>{ first_name }</td>
                          <td>{ last_name }</td>
                          <td>{ position }</td>
                          <td>
                            <a href='#' onClick={ e => this.handleEditCompany(e, id) }><FontAwesomeIcon icon='edit'/></a>
                            <a href='#' onClick={ e => this.handleDeleteCompany(e, id) }><FontAwesomeIcon icon='trash'/></a>
                          </td>
                        </tr>
                      ))
                    }
                    <tr>
                      <td colSpan={5}>
                        <a href='#'>
                          <FontAwesomeIcon icon='user-plus'/>
                          <span>
                            Add Employee
                          </span>
                        </a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </Container>
            )
          return null;
        }}
      </Query>
    );
  }
}

export default Company 
