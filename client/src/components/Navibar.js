import React,{useContext} from 'react'
import {Navbar, Nav,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

function Navibar() {

   const {state,dispatch} = useContext(UserContext);

  const renderList=()=>{
    if(state){
      return [
        <Nav.Link ><Link to="/profile">Profile</Link></Nav.Link>,
        <Nav.Link ><Link to="/createpost">CreatePost</Link></Nav.Link>,
        <Nav.Link 
        onClick={()=>{
          localStorage.clear();
          dispatch({type:"LOGOUT"})
          // localStorage.removeItem('jwt')
          // localStorage.removeItem('user')
        }}
        
        
        
        ><Link to="/signin">Logout</Link></Nav.Link>
      ]
    }else{
      return [
      <Nav.Link ><Link to="/signup">Signup</Link> </Nav.Link>,
      <Nav.Link ><Link to="/signin">Signin</Link></Nav.Link>
      ]
    }
  }
 
  return (
    <>

  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand> <Link to={state?'/':'/signin'}>Instagram</Link> </Navbar.Brand>
    <Nav className="me-auto">
     {renderList()}
    </Nav>
    </Container>
  </Navbar>
</>
  )
}

export default Navibar