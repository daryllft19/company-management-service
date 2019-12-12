import React, { useState, useEffect, useRef } from 'react';
import { Spinner, Alert, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

const EditModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const [alertShow, setAlertShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const editModalFirstNameRef = useRef(null);
  const editModalLastNameRef = useRef(null);
  const editModalPositionRef = useRef(null);

  const handleModalClose = () => props.handleEditModalClose();

  const handleAlertOpen = () => setAlertShow(true);
  const handleAlertClose = () => setAlertShow(false);

  const handleSave = () => {
    const first_name = editModalFirstNameRef.current.value;
    const last_name = editModalLastNameRef.current.value;
    const position = editModalPositionRef.current.value;
    
    if ( first_name && last_name && position) {
      handleAlertClose();
      setBusy(true);
      props.editEmployee({ id: props.data.id, first_name, last_name, position })
        .catch(() => {
          setAlertMsg('Incorrect input!');
          handleAlertOpen();
        })
        .finally(() => {
          setBusy(false);
        });
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
          <Modal.Title>Editing { props.data.first_name }</Modal.Title>
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
            <FormControl required ref={ editModalFirstNameRef } placeholder="Employee First Name"defaultValue={ props.data.first_name }/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Last Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl required ref={ editModalLastNameRef } placeholder="Employee Last Name" defaultValue={ props.data.last_name }/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Position</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl ref={ editModalPositionRef } placeholder="Employee Position" defaultValue={ props.data.position }/>
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
