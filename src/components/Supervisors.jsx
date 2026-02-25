import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { getAllSupervisors } from "../services/Supervisorservices";
import "../styles/tablestyle.css";



export function SupervisorsList() {

    const [supervisors, setSupervisors] = useState([]);

    const fetchSupervisors = async () => {
        try {
            const response = await getAllSupervisors();
            console.log(response.data);
            setSupervisors(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSupervisors();
    }, []);


    return (
        <Container className="mt-3">
            <Row>
                <Col lg={8}>
                    <div variant="primary">Supervisor List</div>
                </Col>
            </Row>
            {
                supervisors.length === 0 ? <Alert variant="warning">No Supervisor information found</Alert> : 
                <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
                    <thead>
                        <tr>
                            <th>Supervisor Id</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supervisors.map((supervisor) => {
                                return (
                                    <tr>
                                        <td>{supervisor.supervisor_id}</td>
                                        <td>{supervisor.name}</td>
                                        <td>{supervisor.email}</td>
                                        <td>{supervisor.phone}</td>
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
