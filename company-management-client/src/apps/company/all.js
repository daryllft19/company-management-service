import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fetchCompanies } from "redux/actions/company";
import { getCompanies } from "redux/selectors/company";

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import GqlStatement from 'nfgraphql';
import AddModal from 'apps/company/components/add-modal.js';

// class Company extends Component {
const Company = () => {
  let [ companies, setCompanies ] = useState([]); 
  let [ addModalShow, setAddModalShow ] = useState(false); 

  const [ createCompany ] = useMutation(GqlStatement.Company.CREATE_COMPANY);
  const [ deleteCompany ] = useMutation(GqlStatement.Company.DELETE_COMPANY);
  const queryCompaniesResult = useQuery(GqlStatement.Company.QUERY_COMPANIES,
    {
      onCompleted(data) {
        setCompanies(data.companies);
      }
    }
  );

  const createCompanyParent = ({ name, address, description }) => {
    return createCompany({
      variables: {
        name,
        address,
        description
      },
      update: store => {
        const data = store.readQuery({
          query: GqlStatement.Company.QUERY_COMPANIES
        })

        queryCompaniesResult.refetch()
        .then((res) => {
          setCompanies(res.data.companies);
        });
      }
    })
    .then((res) => {
      setAddModalShow(false);
    })
  }

  let display;
  if (queryCompaniesResult.loading) {
    display = <tbody>
        <tr>
          <td colSpan={5}>
            <p>Loading...</p>
          </td>
        </tr>
      </tbody>
  } else if (queryCompaniesResult.error) {
    display = <tbody>
        <tr>
          <td colSpan={5}>
            <p>Oops. An error occurred</p>
          </td>
        </tr>
      </tbody>
  } else if ( queryCompaniesResult.data.companies.length === 0) {
    display = <tbody>
        <tr>
          <td colSpan={5}>
            <p>None</p>
          </td>
        </tr>
      </tbody>
  } else {
    display = <tbody>
        {companies.map(({ id, name, address, description}) => (
          <tr key={ id }>
            <td>{ id }</td>
            <td><Link to={`/company/${id}`}>{ name }</Link></td>
            <td>{ address }</td>
            <td>{ description || 'None' }</td>
            <td>
              <a href='#' onClick={ e => {
              }}>
                <FontAwesomeIcon icon='edit'/>
              </a>
              <a href='#' onClick={ e => {
                deleteCompany({
                  variables: { id: parseInt(id) },
                })
                .then(() => {
                  queryCompaniesResult.refetch()
                  .then((res) => {
                    setCompanies(res.data.companies);
                  });
                })
              }}><FontAwesomeIcon icon='trash'/></a>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={5}>
            <a href='#' onClick={ e => {
              setAddModalShow(true);
            }}>
              <FontAwesomeIcon icon='plus-square'/>
              <span>
                Add Company 
              </span>
            </a>
          </td>
        </tr>
        </tbody>
  }

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
        { display }
      </Table>
      <AddModal modalShow={ addModalShow } createCompany={ createCompanyParent }/>
    </Container>
  );
}
const  mapStateToProps = state => {
  return {
    companies: state.company.companies
  }
};

// export default Company
export default Company;
