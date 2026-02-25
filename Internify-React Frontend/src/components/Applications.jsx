import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getAllApplications } from "../services/Applicationservices";
import { getRole } from "../services/RoleService";
import { getUser } from "../services/UserService";
import "../styles/tablestyle.css";

export function ApplicationsList() {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [filters, setFilters] = useState({
        studentId: "",
        companyId: "",
        status: "",
    });

    const role = getRole();
    const user = getUser(); // e.g. { student_id, company_id, supervisor_id }

    const fetchApplications = async () => {
        try {
            const response = await getAllApplications();
            let allApps = response.data;

            // 🔒 Role-based auto-filtering
            if (role === "student" && user?.student_id) {
                allApps = allApps.filter(app => app.student_id === user.student_id);
            } 
            else if (role === "company" && user?.company_id) {
                allApps = allApps.filter(app => app.company_id === user.company_id);
            } 
            else if (role === "supervisor") {
                // Supervisors see everything — no filtering
                allApps = allApps;
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

    // 🔍 Manual filters
    const handleApplyFilters = () => {
        let result = applications;

        if (filters.studentId.trim() !== "") {
            result = result.filter((a) =>
                a.student_id?.toString().includes(filters.studentId.trim())
            );
        }

        if (filters.companyId.trim() !== "") {
            result = result.filter((a) =>
                a.company_id?.toString().includes(filters.companyId.trim())
            );
        }

        if (filters.status.trim() !== "") {
            result = result.filter((a) =>
                a.application_status
                    ?.toLowerCase()
                    .includes(filters.status.toLowerCase())
            );
        }

        setFilteredApplications(result);
    };

    const handleClearFilters = () => {
        setFilters({ studentId: "", companyId: "", status: "" });
        setFilteredApplications(applications);
    };

    return (
        <Container className="mt-3 mb-5">
            <Row className="align-items-center mb-3">
                <Col>
                    <h4 className="fw-bold text-primary mb-0">Applications List</h4>
                </Col>
            </Row>
            

            {/* 🔎 Filter Inputs */}
            <Row className="g-2 mb-3">
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Filter by Student ID"
                        value={filters.studentId}
                        onChange={(e) =>
                            setFilters({ ...filters, studentId: e.target.value })
                        }
                        disabled={role === "student"} // prevent student from changing
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Filter by Company ID"
                        value={filters.companyId}
                        onChange={(e) =>
                            setFilters({ ...filters, companyId: e.target.value })
                        }
                        disabled={role === "company"} // prevent company from changing
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Filter by Status"
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
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

            {/* 🧾 Applications Table */}
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
