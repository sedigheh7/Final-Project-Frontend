import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand>Bloggy</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/posts">Posts</Nav.Link>
            <Nav.Link as={NavLink} to="/create">Create</Nav.Link>
            <Nav.Link as={NavLink} to="/setting">Setting</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;