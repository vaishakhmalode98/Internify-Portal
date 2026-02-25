import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Card, ListGroup } from "react-bootstrap";
import { getAllCompanies } from "../services/Companyservices";
import "../styles/tablestyle.css";

export function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Helper to get image path
  const getImagePath = (name) => {
    const fileName = name.toLowerCase().replace(/\s+/g, "") + ".jpg";
    return `../../public/${fileName}`;
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4 text-center fw-bold">🌐 Companies Overview</h4>

      {companies.length === 0 ? (
        <Alert variant="warning">No Company information found</Alert>
      ) : (
        <Row className="gx-5 gy-4 justify-content-center">
          {companies.map((company) => (
            <Col key={company.company_id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <Card style={{ width: '25rem' }} className="shadow-sm h-100 company-card">
                <Card.Img
                  variant="top"
                  src={getImagePath(company.name)}
                  alt={`${company.name} logo`}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title className="text-center">{company.name}</Card.Title>
                  <Card.Text>
                    A leading company in {company.tech_domain}.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item><strong>ID:</strong> {company.company_id}</ListGroup.Item>
                  <ListGroup.Item><strong>Email:</strong> <a href={`mailto:${company.email}`}>{company.email}</a></ListGroup.Item>
                  <ListGroup.Item><strong>Domain:</strong> {company.tech_domain}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>

      )}
    </Container>
  );
}
