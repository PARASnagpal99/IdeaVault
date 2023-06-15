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
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
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
          {userInfo ? <Nav>
            <Nav.Link  href="/myideas">
                 Ideas
            </Nav.Link>
            <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item
              onClick={logoutHandler}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
         </Nav> : 
          <Nav>
            {" "}
            <Nav.Link  href="/login">
                 Login
            </Nav.Link>
          </Nav>
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
      )
}


export default Header