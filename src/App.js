import UserContent from './Contexts/user'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <UserContent>
      <BrowserRouter>
      <ToastContainer autoClose={ 3000 }/>
        <Router />
      </BrowserRouter>
    </UserContent>
  );
}

export default App;
