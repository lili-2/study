import React, { useContext, FC } from 'react';
import useLocalStorage from '../compoments/hooks/useLocalStorage';

const ContactsContext = React.createContext<any>([]);

export function useContacts() {
  return useContext(ContactsContext)
}

export const ContactsProvider: FC<unknown> = ({
  children
}) => {

  const [contacts, setContacts] = useLocalStorage('contacts', [])
  
  function createContact(id: string, name: string) {
    setContacts((prevContacts: any) => {
      return [...prevContacts, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts , createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
