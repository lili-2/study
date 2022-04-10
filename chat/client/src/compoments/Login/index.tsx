import React,{ReactElement, useRef,FC} from "react"
import { Button, Container ,Form} from "react-bootstrap"

interface LoginProps{
    onIdSubmit: Function
}
const Login:FC<LoginProps> = ({
    onIdSubmit
}):ReactElement => {

    const idRef = useRef<HTMLInputElement>(null)
    
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        onIdSubmit(idRef.current?.value)
    }

    return (
        <Container className="align-items-center d-flex" style={{height:'100vh',width:"100vh"}}>
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>请输入你的id</Form.Label>
                    <Form.Control type="text" ref={idRef} required/>
                </Form.Group>
            </Form>
        </Container>
    )
}
export default Login