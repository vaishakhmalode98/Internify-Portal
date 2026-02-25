import { useState } from "react";
import { Container, Row, Col, Form, Button, Toast, Modal } from "react-bootstrap";

export function Contact() {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ email: "" });

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    // Clear errors
    setErrors({ email: "" });

    // Simulate form submission (you can replace this with an API call)
    console.log("Message sent:", formData);

    // Show toast and modal
    setShowToast(true);
    setShowModal(true);

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4 text-primary">Contact Us</h2>
      <Row className="bg-light p-4 rounded shadow">
        {/* Left side - Contact Info */}
        <Col md={6} className="mb-4">
          <h4 className="text-primary mb-3">Get in Touch</h4>
          <p>
            Feel free to reach out to us for any queries or feedback.
            We’ll get back to you as soon as possible.
          </p>
          <p><strong>Email:</strong> internshiptracker@gmail.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> Pune, India</p>
        </Col>

        {/* Right side - Contact Form */}
        <Col md={6}>
          <h4 className="text-primary mb-3">Send Us a Message</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>

      {/* ✅ Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg="success"
        className="position-fixed bottom-0 end-0 m-3 text-white"
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>✅ Your message has been sent successfully!</Toast.Body>
      </Toast>

      {/* ✅ Modal (Popup Dialog) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Message Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for reaching out! We’ll get back to you shortly.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
