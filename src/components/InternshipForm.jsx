import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postInternship } from "../services/Internshipservices"; // adjust path as needed

export function PostInternship() {
    const [formData, setFormData] = useState({
        company_id: "",
        title: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response= await postInternship(formData);
            console.log(response);
            alert("Internship posted successfully!");
            setFormData({
                company_id: "",
                title: "",
            });
            navigate("/company-dashboard"); // optional redirect
        } catch (error) {
            console.error("Error posting internship:", error);
            alert("Failed to post internship.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
                <h3 className="text-center mb-4 text-primary">Post Internship</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCompanyId" className="mb-3">
                        <Form.Label>Company ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="company_id"
                            placeholder="Enter Company ID"
                            value={formData.company_id}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formInternshipTitle" className="mb-4">
                        <Form.Label>Internship Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Internship Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
