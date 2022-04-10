import { ReactElement, FC } from 'react';
import useLocalStorage from './compoments/hooks/useLocalStorage';
import Login from './compoments/Login';
import Dashboard from './compoments/Dashboard'
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';
const App: FC = (): ReactElement => {

  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    <>
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </>
  );
}

export default App;
