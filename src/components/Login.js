import {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from '../actions/userActions';

const Login = (props) => {

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

    const signIn = (e) => {
        e.preventDefault();
        e.persist();

        axios
        .post('https://cans-be.herokuapp.com/api/auth/login', loginCreds)
        .then((res) => {
            console.log(res)
            localStorage.setItem('bearer-token', res.data.token)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('user-id', res.data.id)
            localStorage.setItem('isLoggedIn', true)
            props.setUser(res.data)
            history.push('/dashboard')
        })
    }

    return (<> 
        <div className='landing'>
            <h2>Sign In</h2>
            <div className='sign-in'>
                <Form className='auth-form' onSubmit={signIn}>
                <FormGroup>
                    <Label for="username"></Label>
                    <Input type="username" name="username" placeholder="Username" onChange={handleChanges} value={loginCreds.username} />
                </FormGroup>
                <FormGroup>
                    <Label for="password"></Label>
                    <Input type="password" name="password" placeholder="Password" onChange={handleChanges} value={loginCreds.password} />
                </FormGroup>

            
                <Button type="submit">Login</Button>
                <p className='link'>New? <Link to='/register'>Register</Link></p>
                </Form>
            </div>
        </div>
    </>)
}

const mapStateToProps = state => {
    return {
        userOnProps: state.userReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {setUser}
  )(Login)