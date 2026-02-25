import { useState, useEffect } from "react";
import { Button, Container, Form, Card, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/SignInservices";
import { getAllSupervisors } from "../services/Supervisorservices"; // 🔹 Supervisor API

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    resume_url: "",
    education: "",
    tech_domain: "",
    supervisor_id: "",
  });

  const [supervisors, setSupervisors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch supervisors on mount
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await getAllSupervisors();
        if (response.status === 200) {
          setSupervisors(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch supervisors:", error);
      }
    };
    fetchSupervisors();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 6 characters and include at least 1 letter and 1 number."
      );
    } else {
      setPasswordError("");
    }
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      alert("Please enter a valid password before submitting.");
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Sign Up</h3>

        <Form onSubmit={handleSubmit}>
          {/* Role Selector */}
          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="company">Company</option>
              <option value="supervisor">Supervisor</option>
            </Form.Select>
          </Form.Group>

          {/* Common Fields */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
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

          {/* Student Fields */}
          {formData.role === "student" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resume URL</Form.Label>
                <Form.Control
                  type="text"
                  name="resume_url"
                  placeholder="Enter Resume URL"
                  value={formData.resume_url}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Education</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  placeholder="Enter Education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Supervisor Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label>Select Supervisor</Form.Label>
                <Form.Select
                  name="supervisor_id"
                  value={formData.supervisor_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Supervisor</option>
                  {supervisors.length > 0 ? (
                    supervisors.map((sup) => (
                      <option key={sup.id} value={sup.id}>
                        {sup.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading supervisors...</option>
                  )}
                </Form.Select>
              </Form.Group>
            </>
          )}

          {/* Supervisor Fields */}
          {formData.role === "supervisor" && (
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          {/* Company Fields */}
          {formData.role === "company" && (
            <Form.Group className="mb-3">
              <Form.Label>Tech Domain</Form.Label>
              <Form.Control
                type="text"
                name="tech_domain"
                placeholder="Enter Tech Domain"
                value={formData.tech_domain}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {/* Password Field with Validation & Toggle */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
            </InputGroup>

            {passwordError && (
              <small className="text-danger">{passwordError}</small>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={!!passwordError || !formData.password}
          >
            Sign Up
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 text-decoration-none"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </p>
      </Card>
    </Container>
  );
}
