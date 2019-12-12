import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fetchCompanies } from "redux/actions/company";
import { getCompanies } from "redux/selectors/company";

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    }
  }
  handleEditCompany = (e, id) => {
    e.preventDefault()
    console.log('edit', id);
  }
  handleDeleteCompany = (e, id) => {
    e.preventDefault()
    console.log('delete', id);
  }
  render(){
    const GET_COMPANIES = gql`
      {
        companies {
          id
          name
          address
          description
        }
      }
    `;

    return (
      <Container>
        <h1>Company</h1>
        <h3>Welcome to NF Company Management System</h3>
        <Table striped responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <Query query={GET_COMPANIES}>
            {result => {
              if (result.loading) return (
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <p>Loading...</p>
                    </td>
                  </tr>
                </tbody>
              );
              if (result.error) return (
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <p>Oops. An error occurred</p>
                    </td>
                  </tr>
                </tbody>
              );
              if (result.data.companies.length === 0) return (
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <p>None</p>
                    </td>
                  </tr>
                </tbody>
              )
              return (
                <tbody>
                {result.data.companies.map(({ id, name, address, description}) => (
                  <tr key={ id }>
                    <td>{ id }</td>
                    <td><Link to={`/company/${id}`}>{ name }</Link></td>
                    <td>{ address }</td>
                    <td>{ description || 'None' }</td>
                    <td>
                      <a href='#' onClick={ e => this.handleEditCompany(e, id) }><FontAwesomeIcon icon='edit'/></a>
                      <a href='#' onClick={ e => this.handleDeleteCompany(e, id) }><FontAwesomeIcon icon='trash'/></a>
                    </td>
                  </tr>
                ))}
                </tbody>
              )
            }}
          </Query>
        </Table>
      </Container>
    );
  }
}
const  mapStateToProps = state => {
  return {
    companies: state.company.companies
  }
};

// export default Company
export default Company;
