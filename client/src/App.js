import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Navibar from './components/Navibar';
import CreatePost from './components/CreatePost';

function App() {
  return (
    
      
     <BrowserRouter>
     <Navibar/>
      <Routes>
     <Route path="/" exact 
    element={ <Home/>}>
    </Route>
    <Route path="/signin"
     element={<Signin/>}>

    </Route>
    <Route path="/signup"
    element={<Signup/>}>
    </Route>
    <Route path="/profile"
    element={<Profile/>}>
    </Route>
    <Route path="/createpost"
    element={<CreatePost/>}>
    </Route>
    </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
