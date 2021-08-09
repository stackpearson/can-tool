import {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Button, Label, Input, FormText } from 'reactstrap';

const Register = () => {

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

    const registerUser = (e) => {
        e.preventDefault();
        e.persist();

        axios
        .post('https://cans-be.herokuapp.com/api/auth/register', loginCreds)
        .then((res) => {
            console.log(res)
            localStorage.setItem('bearer-token', res.data.token)
        })
    }

    return (<> 
        <div className='landing'>
            <div>
                <Form onSubmit={registerUser}>
                <FormGroup>
                    <Label for="username"></Label>
                    <Input type="username" name="username" placeholder="Username" onChange={handleChanges} value={loginCreds.username} />
                </FormGroup>
                <FormGroup>
                    <Label for="password"></Label>
                    <Input type="password" name="password" placeholder="Password" onChange={handleChanges} value={loginCreds.password} />
                </FormGroup>

            
                <Button type="submit">Register</Button>
                </Form>
            </div>
        </div>
    </>)
}

export default Register;