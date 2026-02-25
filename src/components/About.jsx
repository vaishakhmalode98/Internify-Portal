import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';

export function AboutUs() {
    const teamIntro = `Our development team — Harshal, Rachana, and Vaishakh — began the project by collaboratively designing the database schema, finalizing the API structure, and planning the overall layout and components required for the application. Together, we ensured a smooth workflow from backend setup to frontend integration, maintaining consistency in design and functionality throughout the development process.`;

    const people = [
        {
            name: 'Harshal Tarmale',
            image: '../../public/Harshal.jpeg', 
            description:
                'Harshal developed the Student APIs and their associated display components. He also implemented the Application-related APIs and UI, as well as the Sign In and Sign Up functionalities, including both frontend components and backend integration. He also created Home page and did  inital implementation of JWT tokenization for authentication.',
            github: 'https://github.com/Harshal504',
        },
        
        {
            name: 'Rachana Khadse',
            image: '../../public/rachana.jpeg', 
            description:
                'Rachana worked on the Supervisor APIs and built the corresponding listing component to display supervisors efficiently. She also developed the Dashboard module, which displays key information about the currently logged-in user. She also created Contact Us page.',
            github: 'https://github.com/rachanakhadse',
        },

        {
            name: 'Vaishakh Malode',
            image: '../../public/vaishakh.jpeg', 
            description:
                'Vaishakh worked on the Company-related modules, developing the APIs and components required to fetch and display company and internship data. He also created APIs and components for internship applications and displaying applied internships. Additionally, he developed the About Us page, ensuring a clean and informative presentation of developers work.',            
            github: 'https://github.com/Zenmox',
        },
        
    ];

    const finalNote =
        'At the final stage, all three developers collaborated to set up component routing, JWT tokenization and authorization, ensuring secure and efficient navigation across the application.';

    return (
        <Container className="my-5">
            <h2
                className="text-center mb-4 fw-bold"
                style={{ color: '#007bff', fontFamily: 'Poppins, sans-serif' }}
            >
                About the Developers
            </h2>

            <p
                className="text-center mx-auto mb-5"
                style={{
                    maxWidth: '850px',
                    fontSize: '1.05rem',
                    color: '#4a4a4a',
                    lineHeight: '1.7',
                }}
            >
                {teamIntro}
            </p>

            {people.map((person, index) => (
                <Card
                    key={index}
                    className="shadow-sm border-0 mb-4"
                    style={{
                        borderRadius: '15px',
                        background: 'linear-gradient(180deg, #f9fbff 0%, #ffffff 100%)',
                    }}
                >
                    <Row className="align-items-center p-3">
                        <Col md={4} className="text-center mb-3 mb-md-0">
                            <Image
                                src={person.image}
                                alt={person.name}
                                roundedCircle
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    border: '4px solid #007bff',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Col>
                        <Col md={8}>
                            <h4
                                className="fw-bold"
                                style={{
                                    color: '#0056b3',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                {person.name}
                            </h4>
                            <p
                                style={{
                                    color: '#555',
                                    fontSize: '1rem',
                                    lineHeight: '1.6',
                                }}
                            >
                                {person.description}
                            </p>
                            <Button
                                variant="outline-primary"
                                href={person.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fw-semibold"
                            >
                                Visit GitHub
                            </Button>
                        </Col>
                    </Row>
                </Card>
            ))}

            <p
                className="text-center mt-4 fw-semibold"
                style={{
                    fontSize: '1.05rem',
                    color: '#0d6efd',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {finalNote}
            </p>
        </Container>
    );
}
