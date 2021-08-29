import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut, setUser} from '../actions/userActions';


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

  return (<>

    {props.userOnProps.isLoggedIn ? (

        <div className='nav-bar'>
          <p> this will be the nav</p>
          <button onClick={() => signOut()}>sign out</button>
        </div>

      ) : (
      
        <h1>Welcome to Express Cans!</h1>
          
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