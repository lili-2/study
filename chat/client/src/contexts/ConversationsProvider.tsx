import React, { useContext, FC, useState, useEffect ,useCallback} from 'react';
import useLocalStorage from '../compoments/hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext<any>([]);

export function useConversations() {
  return useContext(ConversationsContext)
}

export const ConversationsProvider: FC<any> = ({
  children,
  id
}) => {

  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectConversationIndex, setselectConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket: any = useSocket()

  //创建新对话 
  function createConversation(recipients: any) {
    setConversations((prevConversations: any) => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }: { recipients: any, text: any, sender: any }) => {
    setConversations((prevConversations: any) => {
      //令其为假 若没有对话 在结尾添加新的对话
      let madeChange = false
      const newMessage = { sender, text }

      const newConversations = prevConversations.map(
        (conversation: any) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            {
              madeChange = true
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage]
              }
            }
          }
          return conversation
        }
      )

      if (madeChange) {
        return newConversations
      } else {
        return [...prevConversations, {
          recipients, message: [newMessage]
        }]
      }

    })
  },[setConversations])

  useEffect(() => {
    if(socket == null) return;

    socket.on('receive-message',addMessageToConversation)

    return () => socket.off('receive-message')
  },[socket,addMessageToConversation])

  function sendMessage(recipients: any, text: any) {

    socket?.emit('send-message',{recipients,text})

    addMessageToConversation({ recipients, text, sender: id })
  }

  //格式化对话 使其方便使用
  const formattedConversations = conversations?.map((conversation: { recipients: any[], messages: any[] }, index: number) => {

    const recipients = conversation.recipients?.map(recipient => {

      //找到我们的联系人

      const contact = contacts.find((contact: { id: string; }) => {
        return contact.id === recipient
      })

      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages?.map(message => {
      const contact = contacts.find((contact: { id: string; }) => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      // console.log(contact,name)
      const fromMe = id === message.sender
      //添加一个称为发件人的新属性
      return {...message,senderName:name,fromMe}
    })
    const selected = index === selectConversationIndex

    return { ...conversation, recipients, selected ,messages}
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectConversationIndex],
    sendMessage,
    selectConversation: setselectConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a: any[], b: any[]) {
  if (a.length !== b.length) return false
  a.sort()
  b.sort()
  return a.every((element, index) => {
    return element === b[index]
  })
}