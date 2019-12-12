import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

import GqlStatement from 'nfgraphql';

const DeleteModal = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const deleteModalRef = useRef(null);

  const handleModalClose = () => props.handleDeleteModalClose();

  const handleDelete = () => {
    const deleteMe = deleteModalRef.current.value;

    if (deleteMe === 'delete me') {
      props.deleteEmployee({ id: props.data.id })
    }
  }

  useEffect(() => {
    setModalShow(props.modalShow);
  }, [ props ])

  return (
    <>
      <Modal show={ modalShow } onHide={ handleModalClose } animation={ false } backdrop={ 'static' } centered>
        <Modal.Header closeButton>
          <Modal.Title>Deleting employee <strong>{ `${props.data.first_name} ${props.data.last_name}` }</strong></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul className="list-group list-group-flush mb-5">
            <label>First Name</label><li className="list-group-item">{ props.data.first_name }</li>
            <label>Last Name</label><li className="list-group-item">{ props.data.last_name }</li>
            <label>Position</label><li className="list-group-item">{ props.data.position }</li>
          </ul>

          <p>
            Are you sure you want to delete <strong>{ `${props.data.first_name} ${props.data.last_name}` }</strong>? Type <code>delete me</code>
          </p>
          <InputGroup className="mb-3">
            <FormControl ref={ deleteModalRef } placeholder="delete me"/>
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ handleDelete } variant="danger">Delete</Button>
          <Button onClick={ handleModalClose } variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal;
