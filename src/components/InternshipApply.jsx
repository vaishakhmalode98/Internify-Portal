import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table, Button } from "react-bootstrap";
import { getAllInternships } from "../services/Internshipservices";
import { applyToInternship } from "../services/Internshipservices";
import "../styles/tablestyle.css";

export function ApplyInternship() {
    const [internships, setInternships] = useState([]);
    const studentId = 1; // Replace with actual logged-in student ID

    const fetchInternships = async () => {
        try {
            const response = await getAllInternships();
            setInternships(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleApply = async (internship) => {
        const applicationData = {
            student_id: studentId,
            internship_id: internship.internship_id,
            company_id: internship.company_id
        };

        try {
            const response = await applyToInternship(applicationData);
            if (response.status === 200) {
                alert("Application submitted successfully!");
            } else {
                alert("Failed to apply.");
            }
        } catch (error) {
            console.error("Application error:", error);
            alert("Something went wrong.");
        }
    };

    useEffect(() => {
        fetchInternships();
    }, []);

    return (
        <Container className="mt-3">
            <Row>
                <Col lg={8}>
                    <div variant="primary">Internship List</div>
                </Col>
            </Row>
            {internships.length === 0 ? (
                <Alert variant="warning">No Internship information found</Alert>
            ) : (
                <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
                    <thead>
                        <tr>
                            <th>Internship Id</th>
                            <th>Company Id</th>
                            <th>Company Name</th>
                            <th>Title</th>
                            <th>Post Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {internships.map((internship) => (
                            <tr key={internship.internship_id}>
                                <td>{internship.internship_id}</td>
                                <td>{internship.company_id}</td>
                                <td>{internship.company_name}</td>
                                <td>{internship.title}</td>
                                <td>{internship.post_date}</td>
                                <td>{internship.status}</td>
                                <td>
                                    <Button
                                        variant={internship.status.toLowerCase() === "closed" ? "secondary" : "success"}
                                        size="sm"
                                        onClick={() => handleApply(internship)}
                                        disabled={internship.status.toLowerCase() === "closed"}
                                    >
                                        {internship.status.toLowerCase() === "closed" ? "Closed" : "Apply"}
                                        {/* Apply */}
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
