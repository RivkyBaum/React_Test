import logo from './logo.svg';
import './App.css';
import { Home } from './Components/home';
import { Provider } from 'react-redux';
import { myStore } from './redux/store';

function App() {
  
  return (
    <div className="App">
      <Provider store={myStore}>
        <Home></Home>    
      </Provider>
    </div>
  );
}

export default App;
