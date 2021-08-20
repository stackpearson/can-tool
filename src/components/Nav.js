import {Route, Switch, useHistory} from 'react-router-dom'


function Nav() {
    let history = useHistory();

    const signOut = () => {
        localStorage.removeItem('bearer-token')
        localStorage.removeItem('username')
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

export default Nav;