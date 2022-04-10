import React, { FC, ReactElement } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../../contexts/ConversationsProvider';

const Conversations: FC = (

): ReactElement => {

  const { conversations , selectConversation} = useConversations()

  return (
    <ListGroup variant='flush'>
      {
        conversations?.map((conversation: { recipients: any[],selected: boolean }, index: number) => (
          <ListGroup.Item
            key={index}
            action
            onClick = {() => selectConversation(index)}
            active = {conversation.selected}
          >
            {conversation.recipients?.map(r => r.name).join(', ')}
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}
export default Conversations