import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import navimage from "../../public/internify.ico";
import { removeToken } from "../services/TokenService";
import { getRole, removeRole } from "../services/RoleService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navigationbar() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    // ✅ load role properly when component mounts or localStorage changes
    useEffect(() => {
        try {
            const storedRole = getRole();
            if (storedRole) {
                // handle cases where you might have stored stringified JSON
                const cleanRole = storedRole.replaceAll('"', '');
                setRole(cleanRole);
            } else {
                setRole(null);
            }
        } catch (err) {
            console.error("Error reading role:", err);
        }
    }, []);

    const handleLogout = () => {
        removeToken();
        removeRole();
        localStorage.removeItem("user");
        setRole(null);
        navigate("/");
    };

    const renderLinks = () => {
        if (!role) {
            // 👤 Guest user (not logged in)
            return (
                <>
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/companies">
                        <Nav.Link>Companies</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/aboutus">
                        <Nav.Link>About Us</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>
                    
                </>
            );
        }

        if (role === "student") {
            return (
                <>
                    <LinkContainer to="/dashboard">
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/applyInternship">
                        <Nav.Link>Apply Internships</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/applicationsEdit">
                        <Nav.Link>Applications Edit</Nav.Link>
                    </LinkContainer>
                </>
            );
        }

        if (role === "supervisor") {
            return (
                <>
                    <LinkContainer to="/dashboard">
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/applications">
                        <Nav.Link>Applications List</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/companies">
                        <Nav.Link>Companies</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/internships">
                        <Nav.Link>Internships</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/students">
                        <Nav.Link>Students</Nav.Link>
                    </LinkContainer>
                </>
            );
        }

        if (role === "company") {
            return (
                <>
                    <LinkContainer to="/dashboard">
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/internshipform">
                        <Nav.Link>Create Internships</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/internshipStatusUpdate">
                        <Nav.Link>Internships Status Updater</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/applicationsStatusUpdate">
                        <Nav.Link>Application Status Updater</Nav.Link>
                    </LinkContainer>
                </>
            );
        }
    };

    return (
        <Navbar
            expand="lg"
            bg="dark"
            sticky="top"
            data-bs-theme="dark"
            className="shadow-sm border-bottom border-secondary"
        >
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={navimage}
                        alt="Internify Logo"
                        width="40"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                    <span className="fw-bold text-light">Internify</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">{renderLinks()}</Nav>

                    {role ? (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : <Button variant="primary"
                            onClick={() => navigate("/signin")}
                            className="fw-semibold px-4">
                            LogIn
                        </Button>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
