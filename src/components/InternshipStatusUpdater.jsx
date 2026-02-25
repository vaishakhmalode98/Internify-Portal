import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { getAllInternships, updateInternshipStatus } from "../services/Internshipservices";
import "../styles/tablestyle.css";
import { getUser } from "../services/UserService";

export function InternshipStatusUpdate() {
    const [internships, setInternships] = useState([]);
    const [filteredInternships, setFilteredInternships] = useState([]);
    const [filters, setFilters] = useState({
        internshipId: "",
        companyId: "",
        status: "",
    });

    
    const [updatedStatuses, setUpdatedStatuses] = useState({});

    const fetchInternships = async () => {
  try {
    const response = await getAllInternships();
    const loggedInCompanyId = getUser()?.company_id;

    let allInternships = response.data;

    // ✅ Filter only internships belonging to the logged-in company
    if (loggedInCompanyId) {
      allInternships = allInternships.filter(
        (app) => app.company_id === loggedInCompanyId
      );
    }

    // ✅ Use the filtered list, not the original response
    setInternships(allInternships);
    setFilteredInternships(allInternships);
  } catch (error) {
    console.error("Error fetching internships:", error);
  }
};


    useEffect(() => {
        fetchInternships();
    }, []);

    const handleApplyFilters = () => {
        let result = internships;

        if (filters.internshipId.trim() !== "") {
            result = result.filter((i) =>
                i.internship_id.toString().includes(filters.internshipId.trim())
            );
        }

        if (filters.status.trim() !== "") {
            result = result.filter((i) =>
                i.status.toLowerCase().includes(filters.status.toLowerCase())
            );
        }

        setFilteredInternships(result);
    };

    const handleClearFilters = () => {
        setFilters({ internshipId: "", companyId: "", status: "" });
        setFilteredInternships(internships);
    };

    const handleStatusChange = (internshipId, newStatus) => {
        setUpdatedStatuses((prev) => ({
            ...prev,
            [internshipId]: newStatus,
        }));
    };

    const handleSaveStatus = async (internshipId) => {
        const newStatus = updatedStatuses[internshipId];
        if (!newStatus) return;

        try {
            const response = await updateInternshipStatus(internshipId, newStatus);
            if (response.status === 200) {
                fetchInternships();
                toast.success(`Status updated for Internship ID: ${internshipId}`, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Error updating internship status:", error);
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    return (
        <Container className="mt-3 mb-5">
            <Row className="align-items-center mb-3">
                <Col>
                    <h4 className="fw-bold text-primary mb-0">Internship Status Manager</h4>
                </Col>
            </Row>

            <Row className="g-2 mb-3">
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Filter by Internship ID"
                        value={filters.internshipId}
                        onChange={(e) =>
                            setFilters({ ...filters, internshipId: e.target.value })
                        }
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

            {filteredInternships.length === 0 ? (
                <Alert variant="warning">No internship records found.</Alert>
            ) : (
                <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
                    <thead>
                        <tr>
                            <th>Internship ID</th>
                            <th>Company ID</th>
                            <th>Company Name</th>
                            <th>Title</th>
                            <th>Post Date</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInternships.map((i) => (
                            <tr key={i.internship_id}>
                                <td>{i.internship_id}</td>
                                <td>{i.company_id}</td>
                                <td>{i.company_name}</td>
                                <td>{i.title}</td>
                                <td>{i.post_date}</td>
                                <td>{i.status}</td>
                                <td className="d-flex align-items-center gap-2">
                                    <Form.Select
                                        size="sm"
                                        value={updatedStatuses[i.internship_id] || ""}
                                        onChange={(e) =>
                                            handleStatusChange(i.internship_id, e.target.value)
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="Open">Open</option>
                                        <option value="Closed">Closed</option>
                                    </Form.Select>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => handleSaveStatus(i.internship_id)}
                                    >
                                        Save
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
