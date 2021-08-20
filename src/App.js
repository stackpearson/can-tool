import TileContainer from './components/TileContainer';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';
import {Route} from 'react-router-dom'

function App() {
  return (<>
    {localStorage.getItem('bearer-token') ? (
      <p>test</p>
    ) : (
      <p>blank</p>
    )}

   
  </>);
}

export default App;
