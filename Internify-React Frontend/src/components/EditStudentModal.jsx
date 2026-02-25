import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateStudentById } from "../services/Studentservices";
import { toast, Bounce } from "react-toastify";

export function EditStudentModal({ show, handleClose, student, refreshList }) {
  const [formData, setFormData] = useState({
    student_id: "",
    name: "",
    education: "",
    email: "",
    phone: "",
    resume_url: "",
  });

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateStudentById(formData.student_id, formData);
      toast.success("Student updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });
      handleClose();
      refreshList();
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Degree</Form.Label>
            <Form.Control
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resume URL</Form.Label>
            <Form.Control
              type="text"
              name="resume_url"
              value={formData.resume_url}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
