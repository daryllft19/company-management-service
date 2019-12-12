import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Spinner, Alert, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

import GqlStatement from 'nfgraphql';

const EditModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const [alertShow, setAlertShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const editModalNameRef = useRef(null);
  const editModalAddressRef = useRef(null);
  const editModalDescriptionRef = useRef(null);

  const handleModalClose = () => props.handleEditModalClose();

  const handleAlertOpen = () => setAlertShow(true);
  const handleAlertClose = () => setAlertShow(false);

  const handleSave = () => {
    const name = editModalNameRef.current.value;
    const address = editModalAddressRef.current.value;
    const description = editModalDescriptionRef.current.value;
    
    if ( name && address) {
      handleAlertClose();
      setBusy(true);
      props.editCompany({ id: props.data.id, name, address, description })
        .catch(() => {
          setAlertMsg('Incorrect input!');
          handleAlertOpen();
        })
        .finally(() => {
          setBusy(false);
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
          <Modal.Title>Editing { props.data.name }</Modal.Title>
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
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl required ref={ editModalNameRef } placeholder="Company Name"defaultValue={ props.data.name }/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Address</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl required ref={ editModalAddressRef } placeholder="Company Address" defaultValue={ props.data.address }/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl ref={ editModalDescriptionRef } placeholder="Company Description" as="textarea" rows="3" defaultValue={ props.data.description }/>
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ handleSave } variant="primary" disabled={ busy }>
            <Spinner
              hidden={ !busy }
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Save changes
          </Button>
          <Button onClick={ handleModalClose } variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditModal;
