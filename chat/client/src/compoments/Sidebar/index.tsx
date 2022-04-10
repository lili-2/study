import React, { FC, ReactElement, useState } from 'react';
import { Tab ,Nav, Button ,Modal} from 'react-bootstrap';
import Contacts from '../Contacts';
import Conversations from '../Conversations'
import NewContactModal from '../NewContactModal';
import NewConversationModal from '../NewConversationModal';
interface DashboardType {
    id: string
}

const Sidebar: FC<DashboardType> = (
    { id }
):ReactElement => {

    const [activeKey,setActiveKey] = useState('conversations')
    const conversationsOpen = activeKey === "conversations"

    const [modalOpen,setmodalOpen] = useState(false)

    function closeModal(){
        setmodalOpen(false)
    }

    const setActive = (value: any  ) => {
        setActiveKey(value)
    }
    return (
        <div style={{width: '250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActive}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey="conversations">对话</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="contacts">联系人</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className='border overflow-auto flex-grow-1'>
                    <Tab.Pane eventKey= "conversations">
                        <Conversations /> 
                    </Tab.Pane>
                    <Tab.Pane eventKey="contacts">
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className='p-2 border small'>
                    Your Id:<span className='text-muted'>{id}</span>
                </div>
                <Button className='rounded-0' onClick={() => setmodalOpen(true)}>
                    创建 {conversationsOpen ? '对话': '联系人'}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {conversationsOpen ?
                <NewConversationModal closeModal={closeModal} /> :
                <NewContactModal closeModal={closeModal}/>}
            </Modal>
        </div>
    )
}
export default Sidebar