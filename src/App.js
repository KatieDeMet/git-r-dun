import './App.css';
import router from './Router';
import {UserProvider} from './UserContext';

function App() {
  return (
      <UserProvider>
      {router}
      </UserProvider>
  );
}

export default App;
