import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Container, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useMutation, useQuery } from '@apollo/react-hooks';
import GqlStatement from 'nfgraphql';
import AddModal from 'apps/company/components/add-company-modal.js';
import EditModal from 'apps/company/components/edit-company-modal.js';
import DeleteModal from 'apps/company/components/delete-company-modal.js';

const Company = () => {
  let [ companies, setCompanies ] = useState([]); 
  let [ addModalShow, setAddModalShow ] = useState(false); 

  let [ editModalShow, setEditModalShow ] = useState(false); 
  let [ editData, setEditData ] = useState({}); 

  let [ deleteModalShow, setDeleteModalShow ] = useState(false); 
  let [ deleteData, setDeleteData ] = useState({}); 

  let [ toastShow, setToastShow ] = useState(false); 
  let [ toastTitle, setToastTitle ] = useState(''); 
  let [ toastMsg, setToastMsg ] = useState(''); 

  const [ createCompany ] = useMutation(GqlStatement.Company.CREATE_COMPANY);
  const [ updateCompany ] = useMutation(GqlStatement.Company.UPDATE_COMPANY);
  const [ deleteCompany ] = useMutation(GqlStatement.Company.DELETE_COMPANY);
  const queryCompaniesResult = useQuery(GqlStatement.Company.QUERY_COMPANIES,
    {
      onCompleted(data) {
        setCompanies(data.companies);
      }
    }
  );

  const handleAddModalCloseParent = () => setAddModalShow(false);
  const handleEditModalCloseParent = () => setEditModalShow(false);
  const handleDeleteModalCloseParent = () => setDeleteModalShow(false);

  const createCompanyParent = ({ name, address, description }) => {
    return createCompany({
      variables: {
        name,
        address,
        description
      }
    })
    .then((res) => {
      queryCompaniesResult.refetch()
      .then((res) => {
        setCompanies(res.data.companies);
      });
      setToastTitle('Successful');
      setToastMsg(`Added company ${res.data.createCompany.company.name}!`);
      setToastShow(true);
      setAddModalShow(false);
    })
  }

  const editCompanyParent = ({ id, name, address, description }) => {
    return updateCompany({
      variables: {
        id,
        name,
        address,
        description
      }
    })
    .then((res) => {
      queryCompaniesResult.refetch()
      .then((res) => {
        setCompanies(res.data.companies);
      });

      setToastShow(true);
      setToastTitle('Successful');
      setToastMsg(`Edited company ${res.data.updateCompany.company.name}!`);
      setEditModalShow(false);
    })
  }

  const deleteCompanyParent = ({ id }) => {
    return deleteCompany({
      variables: {
        id: parseInt(id)
      }
    })
    .then((res) => {
      queryCompaniesResult.refetch()
      .then((res) => {
        setCompanies(res.data.companies);
      });

      setToastShow(true);
      setToastTitle('Successful');
      setToastMsg(`Deleted company ${res.data.deleteCompany.company.name}!`);
      setDeleteModalShow(false);
    })
  }

  let display;
  if (queryCompaniesResult.loading) {
    display = <tbody>
        <tr className='d-flex'>
          <th className='col-12'>
            <p>Loading...</p>
          </th>
        </tr>
      </tbody>
  } else if (queryCompaniesResult.error) {
    display = <tbody>
        <tr className='d-flex'>
          <th className='col-12'>
            <p>Oops. An error occurred</p>
          </th>
        </tr>
      </tbody>
  } else if ( queryCompaniesResult.data.companies.length === 0) {
    display = <tbody>
        <tr className='d-flex'>
          <th className='col-12'>
            <p>None</p>
          </th>
        </tr>
      </tbody>
  } else {
    display = <tbody className='d-block' style={{height: '60rem'}}>
        {companies.map(({ id, name, address, description}) => (
          <tr className='d-flex' key={ id }>
            <th className='col-1'>{ id }</th>
            <th className='col-2'><Link to={`/company/${id}`}>{ name }</Link></th>
            <th className='col-3'>{ address }</th>
            <th className='col-5'>{ description || 'None' }</th>
            <th className='col-1'>
              <Button className='ml-1 mr-1' variant='warning' onClick={ e => {
                setEditData({
                  id,
                  name,
                  address,
                  description
                });
                setEditModalShow(true);
              }}>
                <FontAwesomeIcon icon='edit'/>
              </Button>

              <Button className='ml-1 mr-1' variant='danger' onClick={ e => {
                setDeleteData({
                  id,
                  name,
                  address,
                  description
                });
                setDeleteModalShow(true);
              }}>
                <FontAwesomeIcon icon='trash'/>
              </Button>
            </th>
          </tr>
        ))}
        </tbody>
  }

  return (
    <>
      <Container>
        <h2>Welcome to NF Company Management System</h2>
        <Button className='m-5' onClick={ e => {
          setAddModalShow(true);
        }}>
          <FontAwesomeIcon className='mr-2 ml-2' icon='plus-square'/>
          <span>
            Add Company 
          </span>
        </Button>
        <Table striped responsive bordered>
          <thead>
            <tr className='d-flex'>
              <th className='col-1'>ID</th>
              <th className='col-2'>Name</th>
              <th className='col-3'>Address</th>
              <th className='col-5'>Description</th>
              <th className='col-1'>Actions</th>
            </tr>
          </thead>
          { display }
        </Table>
        <AddModal
          modalShow={ addModalShow }
          createCompany={ createCompanyParent }
          handleAddModalClose={ handleAddModalCloseParent } 
        />
        <EditModal
          modalShow={ editModalShow }
          editCompany={ editCompanyParent }
          handleEditModalClose={ handleEditModalCloseParent } 
          data={ editData }
        />
        <DeleteModal
          modalShow={ deleteModalShow }
          deleteCompany={ deleteCompanyParent }
          handleDeleteModalClose={ handleDeleteModalCloseParent } 
          data={ deleteData }
        />
      </Container>
      <Toast onClose={() => setToastShow(false)} show={ toastShow } delay={3000} className="mb-5 ml-5 w-50 bg-success float-right fixed-bottom" autohide>
        <Toast.Header>
          <strong className="mr-auto">{ toastTitle }</strong>
        </Toast.Header>
        <Toast.Body><strong>{ toastMsg }</strong></Toast.Body>
      </Toast>
    </>
  );
}
const  mapStateToProps = state => {
  return {
    companies: state.company.companies
  }
};

export default Company;
