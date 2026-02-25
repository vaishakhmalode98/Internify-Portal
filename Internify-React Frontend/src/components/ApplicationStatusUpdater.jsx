import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { getAllApplications, updateApplicationStatus } from "../services/Applicationservices";
import "../styles/tablestyle.css";
import { getUser } from "../services/UserService";

export function ApplicationsStatusUpdate() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filters, setFilters] = useState({
    studentId: "",
    companyId: "",
    status: "",
  });
  const [updatedStatuses, setUpdatedStatuses] = useState({});
  const loggedInCompanyId = getUser()?.company_id;

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      let allApps = response.data;

      if (loggedInCompanyId) {
        allApps = allApps.filter((app) => app.company_id === loggedInCompanyId);
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

  // Apply filters manually
  const handleApplyFilters = () => {
    let result = applications;

    if (filters.studentId.trim() !== "") {
      result = result.filter((a) =>
        a.student_id.toString().includes(filters.studentId.trim())
      );
    }

    if (filters.status.trim() !== "") {
      result = result.filter((a) =>
        a.status.toLowerCase().includes(filters.status.toLowerCase())
      );
    }

    setFilteredApplications(result);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({ studentId: "", companyId: "", status: "" });
    setFilteredApplications(applications);
  };

  // Handle dropdown value change
  const handleStatusChange = (appId, newStatus) => {
    setUpdatedStatuses((prev) => ({
      ...prev,
      [appId]: newStatus,
    }));
  };

  // Save updated status to backend
  const handleSaveStatus = async (appId) => {
    const newStatus = updatedStatuses[appId];
    if (!newStatus) return;

    try {
      const response = await updateApplicationStatus(appId, newStatus);
      if (response.status === 200) {
        fetchApplications();
        toast.success(`Status updated for Application ID: ${appId}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <Container className="mt-3 mb-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="fw-bold text-primary mb-0">Applications List</h4>
        </Col>
      </Row>

      {/* Filters */}
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
            placeholder="Filter by Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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

      {/* Table */}
      {filteredApplications.length === 0 ? (
        <Alert variant="warning">No application records found.</Alert>
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
              <th>Update Status</th>
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
                  <div className="d-flex align-items-center gap-2">
                    <Form.Select
                      size="sm"
                      value={updatedStatuses[app.application_id] || ""}
                      onChange={(e) =>
                        handleStatusChange(app.application_id, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Applied">Applied</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="started_internship">
                        Started Internship
                      </option>
                      <option value="completed_internship">
                        Completed Internship
                      </option>
                    </Form.Select>

                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleSaveStatus(app.application_id)}
                    >
                      Save
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
