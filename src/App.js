import TileContainer from './components/TileContainer';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <div className="app">
      <Login/>
      <Register/>
      {/* <TileContainer/> */}
    </div>
  );
}

export default App;
