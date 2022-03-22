//Router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
//Layout
import Navbar from './components/layout/Navbar'
//Pages
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
//CSS
import './App.css';




function App() {

  // state with the userdata when the user is logged in

  // useEffect that handles local storage if the user navigates away from the page/refreshes

  // logout handler function that deletes a token from localstorage
  
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>

          <Route 
          path='/'
          element={<Welcome />}
          />

          <Route 
          path='/login'
          element={<Login />}
          />
          
          <Route 
          path='/profile'
          element={<Profile />}
          />

          <Route 
          path='/register'
          element={<Register />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
