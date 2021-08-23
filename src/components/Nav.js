import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut, setUser} from '../actions/userActions';


function Nav(props) {
    let history = useHistory();

    const signOut = () => {
        localStorage.removeItem('bearer-token')
        localStorage.removeItem('username')
        props.logOut()
        history.push('/')
        console.log('checking local storage for token', localStorage.getItem('bearer-token'))
    }

  return (
<div className='nav-bar'>
    <p> this will be the nav</p>
    <button onClick={() => signOut()}>sign out</button>
</div>
  );
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