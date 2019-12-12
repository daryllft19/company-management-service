import React, { useState } from 'react';
import { Button, Table, Container, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useMutation, useQuery } from '@apollo/react-hooks';
import GqlStatement from 'nfgraphql';
import AddModal from 'apps/company/components/add-employee-modal.js';
import EditModal from 'apps/company/components/edit-employee-modal.js';
import DeleteModal from 'apps/company/components/delete-employee-modal.js';

const Company = (props) => {
  let [ company, setCompany ] = useState({employees:[]}); 
  let [ addModalShow, setAddModalShow ] = useState(false); 

  let [ editModalShow, setEditModalShow ] = useState(false); 
  let [ editData, setEditData ] = useState({}); 

  let [ deleteModalShow, setDeleteModalShow ] = useState(false); 
  let [ deleteData, setDeleteData ] = useState({}); 

  let [ toastShow, setToastShow ] = useState(false); 
  let [ toastTitle, setToastTitle ] = useState(''); 
  let [ toastMsg, setToastMsg ] = useState(''); 

  const handleAddModalCloseParent = () => setAddModalShow(false);
  const handleEditModalCloseParent = () => setEditModalShow(false);
  const handleDeleteModalCloseParent = () => setDeleteModalShow(false);

  const [ createEmployee ] = useMutation(GqlStatement.Employee.CREATE_EMPLOYEE);
  const [ updateEmployee ] = useMutation(GqlStatement.Employee.UPDATE_EMPLOYEE);
  const [ deleteEmployee ] = useMutation(GqlStatement.Employee.DELETE_EMPLOYEE);

  const queryEmployeesResult = useQuery(GqlStatement.Company.QUERY_COMPANY,
    {
      variables: {
        id: parseInt(props.match.params.id)
      },
      onCompleted(data) {
        setCompany(data.company);
      }
    }
  );

  const createEmployeeParent = ({ companyId, first_name, last_name, position }) => {
    return createEmployee({
      variables: {
        first_name,
        last_name,
        position,
        companyId
      }
    })
    .then((res) => {
      queryEmployeesResult.refetch()
      .then((res) => {
        setCompany(res.data.company);
      });

      setToastTitle('Successful');
      setToastMsg(`Added employee ${res.data.createEmployee.employee.first_name} ${res.data.createEmployee.employee.last_name}!`);
      setToastShow(true);
      setAddModalShow(false);
    })
  }

  const editEmployeeParent = ({ id, first_name, last_name, position }) => {
    console.log({ id, first_name, last_name, position});
    return updateEmployee({
      variables: {
        id,
        first_name,
        last_name,
        position 
      }
    })
    .then((res) => {
      queryEmployeesResult.refetch()
      .then((res) => {
        setCompany(res.data.company);
      });

      setToastShow(true);
      setToastTitle('Successful');
      setToastMsg(`Edited employee ${res.data.updateEmployee.employee.first_name} ${res.data.updateEmployee.employee.last_name}!`);
      setEditModalShow(false);
    })
  }

  const deleteEmployeeParent = ({ id }) => {
    return deleteEmployee({
      variables: {
        id: parseInt(id)
      }
    })
    .then((res) => {
      queryEmployeesResult.refetch()
      .then((res) => {
        setCompany(res.data.company);
      });

      setToastShow(true);
      setToastTitle('Successful');
      setToastMsg(`Deleted employee ${res.data.deleteEmployee.employee.first_name} ${res.data.deleteEmployee.employee.last_name}!`);
      setDeleteModalShow(false);
    })
  }

  let display;
  if (queryEmployeesResult.loading) {
    display = <tbody>
        <tr className='d-flex'>
          <th className='col-12'>
            <p>Loading...</p>
          </th>
        </tr>
      </tbody>
  } else if (queryEmployeesResult.error) {
    display = <tbody>
        <tr className='d-flex'>
          <th className='col-12'>
            <p>Oops. An error occurred</p>
          </th>
        </tr>
      </tbody>
  } else if ( queryEmployeesResult.data.company.employees.length === 0) {
    display = <tbody>
        <tr className='d-flex'>
          <th className='col-12'>
            <p>No employees for { company.name }</p>
          </th>
        </tr>
      </tbody>
  } else {
    display = <tbody className='d-block' style={{height: '60rem'}}>
        {company.employees.map(({ id, first_name, last_name, position}) => (
          <tr className='d-flex' key={ id }>
            <th className='col-1'>{ id }</th>
            <th className='col-3'>{ first_name }</th>
            <th className='col-3'>{ last_name }</th>
            <th className='col-4'>{ position }</th>
            <th className='col-1'>
              <Button className='ml-1 mr-1' variant='warning' onClick={ e => {
                setEditData({
                  id,
                  first_name,
                  last_name,
                  position 
                });
                setEditModalShow(true);
              }}>
                <FontAwesomeIcon icon='edit'/>
              </Button>

              <Button className='ml-1 mr-1' variant='danger' onClick={ e => {
                setDeleteData({
                  id,
                  first_name,
                  last_name,
                  position 
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
        <h1>{ company.name }</h1>
        <h3>Welcome to NF Company Management System</h3>
        <Button className='m-5' onClick={ e => {
          setAddModalShow(true);
        }}>
          <FontAwesomeIcon className='mr-2 ml-2' icon='plus-square'/>
          <span>
            Add Employee 
          </span>
        </Button>
        <Table striped responsive bordered>
          <thead>
            <tr className='d-flex'>
              <th className='col-1'>ID</th>
              <th className='col-3'>First Name</th>
              <th className='col-3'>Last Name</th>
              <th className='col-4'>Position</th>
              <th className='col-1'>Actions</th>
            </tr>
          </thead>
          { display }
        </Table>
        <AddModal
          modalShow={ addModalShow }
          createEmployee={ createEmployeeParent }
          company={ company }
          handleAddModalClose={ handleAddModalCloseParent } 
        />
        <EditModal
          modalShow={ editModalShow }
          editEmployee={ editEmployeeParent }
          handleEditModalClose={ handleEditModalCloseParent } 
          data={ editData }
        />
        <DeleteModal
          modalShow={ deleteModalShow }
          deleteEmployee={ deleteEmployeeParent }
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


export default Company 
