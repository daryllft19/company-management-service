import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Alert, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

import GqlStatement from 'nfgraphql';

const AddModal = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const [alertShow, setAlertShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const addModalFirstNameRef = useRef(null);
  const addModalLastNameRef = useRef(null);
  const addModalPositionRef = useRef(null);

  const handleModalClose = () => props.handleAddModalClose();

  const handleAlertOpen = () => setAlertShow(true);
  const handleAlertClose = () => setAlertShow(false);

  const handleSave = () => {
    const first_name = addModalFirstNameRef.current.value;
    const last_name = addModalLastNameRef.current.value;
    const position = addModalPositionRef.current.value;

    
    if ( first_name && last_name && position) {
      handleAlertClose();
      props.createEmployee({ companyId: props.company.id, first_name, last_name, position })
        .catch((err) => {
          setAlertMsg('Incorrect input!');
          handleAlertOpen();
        })
    } else {
      setAlertMsg('Missing details!');
      handleAlertOpen();
    };
  }

  useEffect(() => {
    setModalShow(props.modalShow);
  }, [ props ])

  return (
    <>
      <Modal show={ modalShow } onHide={ handleModalClose } animation={ false } backdrop={ 'static' } centered>
        <Modal.Header closeButton>
          <Modal.Title>Add an Employee</Modal.Title>
        </Modal.Header>

        <Alert show={ alertShow } variant="danger" onClose={ handleAlertClose } dismissible transition={ null }>
          <Alert.Heading>Submission Error</Alert.Heading>
          <p>
            { alertMsg }
          </p>
        </Alert>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>First Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl required ref={ addModalFirstNameRef } placeholder="Employee First Name"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Last Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl required ref={ addModalLastNameRef } placeholder="Employee Last Name"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Position</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl required ref={ addModalPositionRef } placeholder="Employee Position"/>
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ handleSave } variant="primary">Save changes</Button>
          <Button onClick={ handleModalClose } variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddModal;
