import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut, setUser} from '../actions/userActions';
import { useEffect } from 'react';
import {Button} from 'reactstrap'
import {cat} from '../media/cat-typing.gif'


function Nav(props) {
    let history = useHistory();

    const signOut = () => {
        localStorage.removeItem('bearer-token')
        localStorage.removeItem('username')
        localStorage.removeItem('user-id')
        localStorage.setItem('isLoggedIn', false)
        props.logOut()
        history.push('/')
    }

    const hideGreeting = () => {
      if (document.getElementById('welcome-message')) {
        let greeting = document.getElementById('welcome-message');
        greeting.classList.add('hidden')
      }
      
    }

    const showAddCanForm = () => {
      if (document.getElementById('add-can-form')) {
        let form = document.getElementById('add-can-form');
        form.classList.remove('hidden')
      }
    }

    useEffect(() => {
      setTimeout(hideGreeting, 3000)
    })
    

  return (<>

    {props.userOnProps.isLoggedIn ? (

        <div className='nav-bar'>
          <div className='greeting' id='welcome-message'>
            <div><h1>Welcome {props.userOnProps.user.username}</h1></div>
            <img className='cat-gif' alt='cat typing' src={require('../media/cat-typing.gif').default} />
          </div>
          
          <div className='nav-controls'>
            <Button outline color='success' onClick={() => showAddCanForm()} >Add Can</Button>
            <div><h2>Express Cans</h2></div>
            <Button outline color='secondary' className='sign-out' onClick={() => signOut()}>sign out</Button>
          </div>
          
        </div>

      ) : (
      
        <h1 className='nav-header'>Welcome to Express Cans!</h1>
          
      )}

  </>);
}

const mapStateToProps = state => {
  return {
      userOnProps: state.userReducer
  }
}

export default connect(
  mapStateToProps,
  {logOut, setUser}
)(Nav)

