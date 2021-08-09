import {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Button, Label, Input, FormText } from 'reactstrap';

const Login = () => {

    const [loginCreds, setLoginCreds] = useState({
        username: '',
        password: ''
    });

    const handleChanges = (e) => {
        e.persist();
        const currentCreds = {
            ...loginCreds,
            [e.target.name]: e.target.value
        }
        setLoginCreds(currentCreds)
    }

    const signIn = (e) => {
        e.preventDefault();
        e.persist();

        axios
        .post('https://cans-be.herokuapp.com/api/auth/login', loginCreds)
        .then((res) => {
            console.log(res)
            localStorage.setItem('bearer-token', res.data.token)
        })
    }

    return (<> 
        <div className='landing'>
            <h1>Welcome To Express Cans!</h1>
            <div>
                <Form onSubmit={signIn}>
                <FormGroup>
                    <Label for="username"></Label>
                    <Input type="username" name="username" placeholder="Username" onChange={handleChanges} value={loginCreds.username} />
                </FormGroup>
                <FormGroup>
                    <Label for="password"></Label>
                    <Input type="password" name="password" placeholder="Password" onChange={handleChanges} value={loginCreds.password} />
                </FormGroup>

            
                <Button type="submit">Login</Button>
                </Form>
            </div>
        </div>
    </>)
}

export default Login;