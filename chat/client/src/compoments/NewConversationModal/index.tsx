import React, { FC, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContacts } from "../../contexts/ContactsProvider"
import { useConversations  } from "../../contexts/ConversationsProvider"

interface NewCoverType {
  closeModal: Function
}
const NewConversationModal: FC<NewCoverType> = ({
  closeModal
}) => {

  const [selectedContactIds,setselectedContactIds] = useState<any[]>([])
  const { contacts } = useContacts()
  const {createConversation} = useConversations()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    createConversation(selectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(contactId : string){
    setselectedContactIds(prevSelectedContactIds => {
      if(prevSelectedContactIds.includes(contactId)){
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      }else {
        return [...prevSelectedContactIds,contactId]
      }
    })
  }
  return (
    <>
      <Modal.Header closeButton>创建对话</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {
            contacts?.map((contact: any) => (
              <Form.Group controlId= {contact.id} key={contact.id}>
                <Form.Check 
                  type="checkbox"
                  value={selectedContactIds.includes(contact.id) ? 1: 0}
                  label={contact.name}
                  onChange={() => handleCheckboxChange(contact.id)}
                /> 
              </Form.Group>
            ))
          }
          <Button type='submit'> Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
export default NewConversationModal
