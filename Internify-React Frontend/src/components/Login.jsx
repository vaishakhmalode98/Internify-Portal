import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../services/TokenService";
import { storeRole } from "../services/RoleService";
import { SignInUser } from "../services/SignInservices";

export function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await SignInUser(formData);

            if (response.status === 200) {
                const { token, user } = response.data;

                // ✅ Store token and user details in localStorage
                storeToken(token);
                localStorage.setItem("user", JSON.stringify(user));
                // storeRole(JSON.stringify(user.role));
                storeRole(user.role)

                alert("Login successful!");

                // ✅ Navigate based on user role window.location.href
                if (user.role === "student") window.location.href="/dashboard";
                else if (user.role === "company") window.location.href="/dashboard";
                else if (user.role === "supervisor") window.location.href="/dashboard";
                else window.location.href="/";

                // if (user.role === "student") navigate("/dashboard");
                // else if (user.role === "company") navigate("/dashboard");
                // else if (user.role === "supervisor") navigate("/dashboard");
                // else navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert(error.response?.data?.message || "Invalid credentials. Please try again.");
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
                <h3 className="text-center mb-4 text-primary">Sign In</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formRole" className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="company">Company</option>
                            <option value="supervisor">Supervisor</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={loading}
                    >
                        {/* {"Sign In"} */}
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                    {"Student: amit.sharma@student.in. amitpwd"}
                </Form>

                <p className="text-center mt-3">
                    Don’t have an account?{" "}
                    <Button
                        variant="link"
                        className="p-0 text-decoration-none"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </p>
            </Card>
        </Container>
    );
}
