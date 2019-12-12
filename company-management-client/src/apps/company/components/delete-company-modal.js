import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Spinner, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

import GqlStatement from 'nfgraphql';

const DeleteModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const deleteModalRef = useRef(null);

  const handleModalClose = () => props.handleDeleteModalClose();

  const handleDelete = () => {
    const deleteMe = deleteModalRef.current.value;

    if (deleteMe === 'delete me') {
      setBusy(true);
      props.deleteCompany({ id: props.data.id })
      .finally(() => {
        setBusy(false);
      })
    }
  }

  useEffect(() => {
    setModalShow(props.modalShow);
  }, [ props ])

  return (
    <>
      <Modal show={ modalShow } onHide={ handleModalClose } animation={ false } backdrop={ 'static' } centered>
        <Modal.Header closeButton>
          <Modal.Title>Deleting <strong>{ props.data.name }</strong></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul className="list-group list-group-flush mb-5">
            <label>Company Name</label><li className="list-group-item">{ props.data.name }</li>
            <label>Address</label><li className="list-group-item">{ props.data.address }</li>
            <label>Description</label><li className="list-group-item">{ props.data.description || 'None' }</li>
          </ul>

          <p>
            Are you sure you want to delete <strong>{ props.data.name }</strong>? Type <code>delete me</code>
          </p>
          <InputGroup className="mb-3">
            <FormControl ref={ deleteModalRef } placeholder="delete me"/>
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ handleDelete } variant="danger" disabled={ busy }>
            <Spinner
              hidden={ !busy }
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Delete
          </Button>
          <Button onClick={ handleModalClose } variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal;
