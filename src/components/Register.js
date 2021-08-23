import {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';

const Register = (props) => {

    let history = useHistory();

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
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('user-id', res.data.id)
            localStorage.setItem('isLoggedIn', true)
            history.push('/dashboard')
        })
    }

    return (<> 
        <div className='landing'>
        <h1>Let's create your account!</h1>
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
                <p>Already a member <Link to='/'>Sign in</Link></p>
                </Form>
            </div>
        </div>
    </>)
}

export default Register;