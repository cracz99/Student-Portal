import React  from 'react';
import Signup from './Signup';
import Login from './Login';
//import Navbar from './Navbar';
//import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../contexts/AuthContext';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
//import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import Forgot from './Forgot'
import Dashboard from './Dashboard';
import User from './User'


function App() {


  return (
    <AuthProvider>

        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route exact path='/dashboard' element={<PrivateRoute component={<Dashboard/>}/> }/>
              <Route path='/forgot' element={<Forgot/>}/>
              <Route exact path='/user' element={<PrivateRoute component={<User/>}/>}/>
              <Route path="*"element={<Navigate to="" />}/>
            </Routes>
          </AuthProvider>
        </Router>

    </AuthProvider>
 

  );
}

export default App;
