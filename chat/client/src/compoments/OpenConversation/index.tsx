import React, { FormEvent, useState , useCallback} from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useConversations } from '../../contexts/ConversationsProvider';

export default function OpenConversation() {

    const [text, setText] = useState("")
    // const lastMessageRef = useRef<HTMLDivElement | null>(null)
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({behavior: "smooth"})
        }
    },[])
    const { sendMessage, selectedConversation } = useConversations()

    // useEffect(() => {
    //     if(lastMessageRef.current){
    //         // lastMessageRef.current.scrollIntoView({behavior: "smooth"})
    //         // lastMessageRef.current.scrollIntoView({smooth: true})
    //         lastMessageRef.current.scrollIntoView()
    //     }
    // },[lastMessageRef.current])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        sendMessage(
            selectedConversation.recipients.map((r: { id: string; }) => r.id),
            text
        )
        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1' style={{ margin: '20px' }}>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
            
                    {selectedConversation.messages?.map((message: { text: string; fromMe: boolean; senderName: string }, index: number) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                // ref={lastMessage ? lastMessageRef : null} setRef
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className= {`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end':''}`}
                            >
                                <div 
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white': 'border'}`
                                }>{message.text}</div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right': ''}
                                }`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: "none" }}
                        />
                        <Button type="submit">Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}
