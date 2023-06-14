import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link,useNavigate} from 'react-router-dom'
import { logout } from '../../actions/userActions';
import { useDispatch} from 'react-redux';

const Header = ({setSearch}) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler =()=>{
        dispatch(logout());
        Navigate('/');
  }
    return (
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
             IdeaVault
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav className='me-auto'>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            </Form>
            </Nav>
          <Nav>
            <Nav.Link  href="/myideas">
                 Ideas
            </Nav.Link>
            <NavDropdown title="Paras" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
              <NavDropdown.Item
              onClick={logoutHandler}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
         </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      )
}


export default Header