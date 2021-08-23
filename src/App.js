import TileContainer from './components/TileContainer';
import Login from './components/Login';
import './App.css';
import Nav from './components/Nav';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import {Route, Switch, useHistory} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (<>
    {localStorage.getItem('bearer-token') ? (
      <></>
    ) : (
      <></>
    )}
    <Nav/>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </Switch>
  </>);
}

export default App;
