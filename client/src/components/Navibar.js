import React from 'react'
import {Navbar, Nav,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Navibar() {
  return (
    <>

  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand> <Link to="/">Instagram</Link> </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link ><Link to="/signup">Signup</Link> </Nav.Link>
      <Nav.Link ><Link to="/signin">Signin</Link></Nav.Link>
      <Nav.Link ><Link to="/profile">Profile</Link></Nav.Link>
      <Nav.Link ><Link to="/createpost">CreatePost</Link></Nav.Link>
    </Nav>
    </Container>
  </Navbar>
</>
  )
}

export default Navibar