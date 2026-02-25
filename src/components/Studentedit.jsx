import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table, Form, Button } from "react-bootstrap";
import { getAllStudents, deleteStudentById } from "../services/Studentservices"; // ✅ make sure this service exists
import { getUser } from "../services/UserService";
import { EditStudentModal } from "./EditStudentModal";

import "../styles/tablestyle.css";

export function StudentsListEdit() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    studentId: "",
    name: "",
    supervisorId: "",
  });
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);


  // ✅ Get supervisor ID from localStorage
  const supervisorId = getUser()?.supervisor_id;
  console.log(supervisorId);

  // 🔹 Fetch all students from API
  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      let allStudents = response.data;
      console.log(allStudents);

      // 🔹 Filter by supervisorId (only students assigned to current supervisor)
      if (supervisorId) {
        allStudents = allStudents.filter(
          (s) => s.supervisor_id === supervisorId
        );
      }

      setStudents(allStudents);
      setFilteredStudents(allStudents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 Filter students manually
  const handleApplyFilters = () => {
    let result = students;

    if (filters.studentId.trim() !== "") {
      result = result.filter((s) =>
        s.student_id.toString().includes(filters.studentId.trim())
      );
    }

    if (filters.name.trim() !== "") {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(filters.name.toLowerCase().trim())
      );
    }

    if (filters.supervisorId.trim() !== "") {
      result = result.filter(
        (s) =>
          s.supervisor_id &&
          s.supervisor_id.toString().includes(filters.supervisorId.trim())
      );
    }

    setFilteredStudents(result);
  };

  const handleClearFilters = () => {
    setFilters({ studentId: "", name: "", supervisorId: "" });
    setFilteredStudents(students);
  };

  // 🔹 Handle Delete Student
  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudentById(studentId); // call your API service
      alert("Student deleted successfully!");
      fetchStudents(); // refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete student. Please try again.");
    }
  };

  // 🔹 Handle Edit (you can navigate to edit page or open modal)
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  return (
    <Container className="mt-3 mb-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="fw-bold text-primary mb-0">Students List</h4>
        </Col>
      </Row>

      {/* Filter Inputs */}
      <Row className="g-2 mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Filter by Student ID"
            value={filters.studentId}
            onChange={(e) =>
              setFilters({ ...filters, studentId: e.target.value })
            }
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Filter by Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </Col>
        <Col md={3} className="d-flex gap-2">
          <Button variant="primary" onClick={handleApplyFilters}>
            Apply
          </Button>
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear
          </Button>
        </Col>
      </Row>

      {/* Table Display */}
      {filteredStudents.length === 0 ? (
        <Alert variant="warning">No student information found</Alert>) : (
        <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Degree</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Resume</th>
              <th>Actions</th> {/* ✅ New column for Edit/Delete */}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.education}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <a href={student.resume_url} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(student.student_id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <EditStudentModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        student={selectedStudent}
        refreshList={fetchStudents}
      />

    </Container>

  );
}
