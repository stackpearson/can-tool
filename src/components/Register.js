import {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from '../actions/userActions';

const Register = (props) => {

    let history = useHistory();

    const [loginCreds, setLoginCreds] = useState({
        username: '',
        password: ''
    });

    const [isRegistering, setRegister] = useState(false);

    const handleChanges = (e) => {
        e.persist();
        const currentCreds = {
            ...loginCreds,
            [e.target.name]: e.target.value
        }
        setLoginCreds(currentCreds)
    }

    const registerUser = (e) => {
        setRegister(true);
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
            props.setUser(res.data)
            setRegister(false)
            history.push('/dashboard')
        })
    }

    return (<> 

        {isRegistering ? (

            <div className='spinner-container'>
                <div className="spinner-border" role='status' >
                    <span className='visually-hidden'>Loading...</span>
                </div>
                <div>Initial registration can take up to a minute, please bear with us :)</div>
            </div>

        ) : (

            <div className='landing'>
            <h1>Let's create your account!</h1>
                <div>
                    <Form className='auth-form' onSubmit={registerUser}>
                    <FormGroup>
                        <Label for="username"></Label>
                        <Input type="username" name="username" placeholder="Username" onChange={handleChanges} value={loginCreds.username} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password"></Label>
                        <Input type="password" name="password" placeholder="Password" onChange={handleChanges} value={loginCreds.password} />
                    </FormGroup>
    
                
                    <Button type="submit">Register</Button>
                    <p>Already a member? <Link to='/'>Sign in</Link></p>
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
  )(Register)