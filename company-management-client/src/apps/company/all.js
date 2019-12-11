import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { connect } from "react-redux";

import { fetchCompanies } from "redux/actions/company";
import { getCompanies } from "redux/selectors/company";

class Company extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.dispatch(fetchCompanies());
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
            this.props.companies.map(e => {
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
const  mapStateToProps = state => {
  return {
    companies: state.company.companies
  }
};

// export default Company
export default connect(mapStateToProps)(Company);
