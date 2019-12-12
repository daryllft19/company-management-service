import React, { useState, useEffect, useRef } from 'react';
import { Spinner, Alert, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

const AddModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const [alertShow, setAlertShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const addModalNameRef = useRef(null);
  const addModalAddressRef = useRef(null);
  const addModalDescriptionRef = useRef(null);

  const handleModalClose = () => props.handleAddModalClose();

  const handleAlertOpen = () => setAlertShow(true);
  const handleAlertClose = () => setAlertShow(false);

  const handleSave = () => {
    const name = addModalNameRef.current.value;
    const address = addModalAddressRef.current.value;
    const description = addModalDescriptionRef.current.value;
    
    if ( name && address) {
      handleAlertClose();
      setBusy(true);
      props.createCompany({ name, address, description })
        .catch((err) => {
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
          <Modal.Title>Add a Company</Modal.Title>
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
            <FormControl required ref={ addModalNameRef } placeholder="Company Name"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Address</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl required ref={ addModalAddressRef } placeholder="Company Address"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl ref={ addModalDescriptionRef } placeholder="Company Description" as="textarea" rows="3"/>
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

export default AddModal;
