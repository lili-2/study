import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../../contexts/ContactsProvider';

export default function Contacts() {

  const {contacts} = useContacts();

  return (
    <ListGroup variant='flush'>
      {
        contacts.map((contact: { id: React.Key | null | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
          <ListGroup.Item key={contact.id}>
             {contact.name}
           </ListGroup.Item>
         ))
      }
    </ListGroup>
  );
}
