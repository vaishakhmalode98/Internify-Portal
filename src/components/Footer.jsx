
import { Container, Row, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function Footercomponent() {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">
      <Container>
        <Row className="gy-4">
          {/* Brand Section */}
          <Col md={4}>
            <h4 className="fw-bold text-uppercase">Internify</h4>
            <p className="text-secondary">
              Connecting talent with opportunity through the Internship Portal.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Quick Links</h5>
            <Nav className="flex-column">
              <LinkContainer to="/">
                <Nav.Link className="text-light p-0 mb-1">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/aboutus">
                <Nav.Link className="text-light p-0 mb-1">About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link className="text-light p-0 mb-1">Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link className="text-light p-0 mb-1"></Nav.Link>
              </LinkContainer>
            </Nav>
          </Col>

          {/* Legal Links */}
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Legal</h5>
            <Nav className="flex-column">
              <LinkContainer to="/privacy-policy">
                <Nav.Link className="text-light p-0 mb-1">Privacy Policy</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/terms-of-service">
                <Nav.Link className="text-light p-0 mb-1">Terms of Service</Nav.Link>
              </LinkContainer>
            </Nav>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center text-secondary">
            © {new Date().getFullYear()} <strong>Internify</strong>. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
