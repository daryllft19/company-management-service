import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(props.show);
  }, [ props.show ])

  return (
    <Modal show={ show } onHide={ handleClose } animation={ false }>
      <Modal.Header closeButton>
        <Modal.Title>Add a Company</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddModal;
