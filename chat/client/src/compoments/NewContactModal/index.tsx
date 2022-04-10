import React, { FC, FormEvent, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from "../../contexts/ContactsProvider"

interface NewCoverType {
  closeModal: Function
}
const NewContactModal: FC<NewCoverType> = ({
  closeModal
}) => {

  const idRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const { createContact } = useContacts();

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    createContact(idRef.current?.value, nameRef.current?.value)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>创建联系人</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type='text' ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>备注</Form.Label>
            <Form.Control type='text' ref={nameRef} required />
          </Form.Group>
          <Button type='submit'> Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
export default NewContactModal
