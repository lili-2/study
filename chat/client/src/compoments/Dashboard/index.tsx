import React, { FC, ReactElement } from 'react';
import { useConversations } from '../../contexts/ConversationsProvider';
import OpenConversation from '../OpenConversation';
import Sidebar from '../Sidebar';

interface DashboardType {
    id: string
}
const Dashboard: FC<DashboardType> = (
    { id }
):ReactElement => {

    const {selectedConversation} = useConversations()

    return (
        <div className='d-flex' style={{height: '100vh'}}>
            <Sidebar id={id}/>
            {selectedConversation && <OpenConversation />}
        </div>
    )
}
export default Dashboard