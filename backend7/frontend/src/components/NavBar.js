import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

let NavBar=()=>{
    return(
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Apple Finder</Navbar.Brand>
            <Nav className="justify-content-center" activeKey="/">
              <Nav.Item>
                  <Link to="/" className="mx-1">Search-Page</Link>
              </Nav.Item>
              <Nav.Item>
                  <Link to="/favourites" className="mx-1">Favourites</Link>
              </Nav.Item>
            </Nav>
        </Container>
      </Navbar>
    )
}

export default NavBar;