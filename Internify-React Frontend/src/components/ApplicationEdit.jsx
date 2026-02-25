import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getAllApplications, deleteApplication } from "../services/Applicationservices";
import "../styles/tablestyle.css";
// import { getRole } from "../services/RoleService";
import { getUser } from "../services/UserService";

export function ApplicationsManager() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const loggedInStudentId = getUser()?.student_id;
  // console.log(loggedInStudentId);
  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      let allApps = response.data;

      // If student is logged in, only show their applications
      if (loggedInStudentId) {
        allApps = allApps.filter(
          (app) => app.student_id === loggedInStudentId
        );
      }

      setApplications(allApps);
      setFilteredApplications(allApps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);


  // Delete application
  const handleDelete = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await deleteApplication(appId);
      alert("Application deleted successfully!");
      fetchApplications(); // Refresh table
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application!");
    }
  };

  return (
    <Container className="mt-3 mb-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="fw-bold text-primary mb-0">Manage Applications</h4>
        </Col>
      </Row>


      {/* Applications Table */}
      {filteredApplications.length === 0 ? (
        <Alert variant="warning">No applications found.</Alert>
      ) : (
        <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Student</th>
              <th>Company</th>
              <th>Internship</th>
              <th>Status</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.application_id}>
                <td>{app.application_id}</td>
                <td>{app.student_name}</td>
                <td>{app.company_name}</td>
                <td>{app.internship_title}</td>
                <td>{app.application_status}</td>
                <td>
                  {new Date(app.applied_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(app.application_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
