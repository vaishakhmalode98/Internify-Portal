import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table, Form, Button } from "react-bootstrap";
import { getAllStudents } from "../services/Studentservices";
import "../styles/tablestyle.css";

export function StudentsList() {
  const [students, setStudents] = useState([]);
  
  const [filters, setFilters] = useState({
    studentId: "",
    name: "",
    supervisorId: "",
  });
  
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      console.log(response.data);
      setStudents(response.data);
      setFilteredStudents(response.data); // show all by default
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  
  // Apply filter manually
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

  // Clear filters and show all
  const handleClearFilters = () => {
    setFilters({ studentId: "", name: "", supervisorId: "" });
    setFilteredStudents(students);
  };

  return (
    <Container className="mt-3 mb-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="fw-bold text-primary mb-0">Student List</h4>
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
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Filter by Supervisor ID"
            value={filters.supervisorId}
            onChange={(e) =>
              setFilters({ ...filters, supervisorId: e.target.value })
            }
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
        <Alert variant="warning">No student information found</Alert>
      ) : (
        <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Degree</th>
              <th>Email</th>
              <th>Phone</th>
              {/* <th>Supervisor ID</th> */}
              <th>Resume URL</th>
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
                {/* <td>{student.supervisor_id || "-"}</td> */}
                <td>
                  <a href={student.resume_url} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
