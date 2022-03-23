import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

function BootstrapNavbar({ handleLogout, currentUser }) {
  //if the user is logged in

  const loggedIn = (
    <>
      <Nav.Link>
        <Link to="/profile">Profile</Link>
      </Nav.Link>

      <Nav.Link>
        <Link to="/">
          <span onClick={handleLogout}>Log-out</span>
        </Link>
      </Nav.Link>
    </>
  );
  //if the user is logged out
  const loggedOut = (
    <>
      <Nav.Link>
        <Link to="/register">Register</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/login">Log-in</Link>
      </Nav.Link>
    </>
  );

  {
    /* <Link to="/">Home</Link>

      {currentUser ? loggedIn : loggedOut} */
  }

  return (
    <>
      <Navbar style={{ textDecoration: 'none' }} bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">Home Page</Link>
            </Nav.Link>
            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default BootstrapNavbar;
