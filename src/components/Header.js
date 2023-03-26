import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles.css"

function Header() {
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand className="logo" href="/">Giphy App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;