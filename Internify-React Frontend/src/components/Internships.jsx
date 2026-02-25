import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { getAllInternships } from "../services/Internshipservices";
import "../styles/tablestyle.css";


export function InternshipsList() {

    const [internships, setInternships] = useState([]);
    const fetchInternships = async () => {
        try {
            const response = await getAllInternships();
            console.log(response.data);
            setInternships(response.data);
        } catch (error) {
            console.log(error);
        }   
    }

    useEffect(() => {
        fetchInternships();
    }, []); 
    return (
        <Container className="mt-3">
            

            <Row className="align-items-center mb-3">
                <Col>
                    <h4 className="fw-bold text-primary mb-0">Internship List</h4>
                </Col>
            </Row>
            {
                internships.length === 0 ? <Alert variant="warning">No Internship information found</Alert> : 
                <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
                    <thead>
                        <tr>
                            <th>Internship Id</th> 
                            <th>Company Id</th>
                            <th>Company Name</th> 
                            <th>Title</th>  
                            <th>Post Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            internships.map((internship) => {
                                return (    
                                    <tr key={internship.internship_id}>
                                        <td>{internship.internship_id}</td>
                                        <td>{internship.company_id}</td>
                                        <td>{internship.company_name}</td>
                                        <td>{internship.title}</td> 
                                        <td>{internship.post_date}</td>
                                        <td>{internship.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
        </Container>
    )
}
