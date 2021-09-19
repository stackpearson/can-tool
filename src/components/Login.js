import {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Button, Label, Input, Spinner } from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from '../actions/userActions';

const Login = (props) => {

    let history = useHistory();

    const [loginCreds, setLoginCreds] = useState({
        username: '',
        password: ''
    });

    const [loggingIn, setLogin] = useState(false);

    const handleChanges = (e) => {
        e.persist();
        const currentCreds = {
            ...loginCreds,
            [e.target.name]: e.target.value
        }
        setLoginCreds(currentCreds)
    }

    const signIn = (e) => {
        setLogin(true)
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
            setLogin(false)
            history.push('/dashboard')
        })
        .catch(err => {
            alert('invalid login credentials, please try again')
            setLogin(false)
        })
    }

    return (<>

        {loggingIn ? (

            <div className='spinner-container'>
                <div className="spinner-border" role='status' >
                    <span className='visually-hidden'>Loading...</span>
                </div>
                <div>Initial login can take up to a minute, please bear with us :)</div>
            </div>

        ) : (

        
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
        )}
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