import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getStudentSkills,
  getStudentApplications,
  getCompanyInternships,
  getCompanyApplications,
  getStudentsBySupervisor,
} from "../services/Dashboardservices";
import {getAllInternships}  from "../services/Internshipservices"

export function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [openInternshipsCount, setOpenInternshipsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Guest";

  // 🔹 Fetch data based on role
  useEffect(() => {
    if (role === "student") fetchStudentData();
    else if (role === "company") fetchCompanyData();
    else if (role === "supervisor") fetchSupervisorData();
    else setLoading(false);
  }, [role, user]);

  // ====================== FUNCTIONS ======================

  async function fetchStudentData() {
    try {
      if (!user?.student_id) return;

      const [skillsRes, appsRes, internshipsRes] = await Promise.all([
        getStudentSkills(user.student_id),
        getStudentApplications(user.student_id),
        getAllInternships(),
      ]);

      setSkills(skillsRes.data || []);
      setApplicationsCount(appsRes.data?.length || 0);

      const openInternships = internshipsRes.data.filter(
        (internship) => internship.status?.toLowerCase() === "open"
      );
      setOpenInternshipsCount(openInternships.length);
    } catch (err) {
      console.error("Error fetching student data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCompanyData() {
    try {
      if (!user?.company_id) return;

      const [internshipsRes, appsRes] = await Promise.all([
        getCompanyInternships(user.company_id),
        getCompanyApplications(user.company_id),
      ]);

      setOpenInternshipsCount(internshipsRes.data?.length || 0);
      setApplicationsCount(appsRes.data?.length || 0);
    } catch (err) {
      console.error("Error fetching company data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSupervisorData() {
    try {
      if (!user?.supervisor_id) return;

      const studentsRes = await getStudentsBySupervisor(user.supervisor_id);
      setStudentsCount(studentsRes.data?.length || 0);
    } catch (err) {
      console.error("Error fetching supervisor data:", err);
    } finally {
      setLoading(false);
    }
  }

  // ====================== UI ======================

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-start align-items-center pt-5 pb-4">
      {/* Header */}
      <div className="card shadow-lg w-75 text-center border-0 mb-4">
        <div className="card-body py-4">
          <h1 className="fw-bold text-primary display-5">
            Welcome {user?.name ? `${user.name} to Internify` : "to Internify"}!
          </h1>
          <h5 className="text-secondary">
            {role !== "Guest"
              ? `You are logged in as a ${role}.`
              : "Please sign in to access your dashboard."}
          </h5>

          {role !== "Guest" && (
            <div className="mt-3">
              <h5 className="fw-bold text-dark mb-2">Your Details:</h5>
              <p className="mb-1"><strong>Username:</strong> {user.name}</p>
              <p className="mb-1"><strong>Email:</strong> {user.email}</p>
              {/* <p className="mb-1"><strong>Phone:</strong> {user?.phone || "No Phone No."}</p> */}

              {role === "student" && (
                <p className="mb-0">
                  <strong>Skills:</strong>{" "}
                  {loading
                    ? "Loading..."
                    : skills.length > 0
                    ? skills.map((s) => s.skill_name).join(", ")
                    : "Not added yet"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Role-based cards */}
      {role === "student" && (
        <div className="row w-75 g-4 justify-content-center">
          <Card title="Applications" value={applicationsCount} color="primary" loading={loading} />
          <Card title="Open Internships" value={openInternshipsCount} color="success" loading={loading} />
          <Card title="Skills" value={skills.length} color="info" loading={loading} />
        </div>
      )}

      {role === "company" && (
        <div className="row w-75 g-4 justify-content-center">
          <Card title="Internships Created" value={openInternshipsCount} color="success" loading={loading} />
          <Card title="Applications Received" value={applicationsCount} color="primary" loading={loading} />
        </div>
      )}

      {role === "supervisor" && (
        <div className="row w-75 g-4 justify-content-center">
          <Card title="Students Under Supervision" value={studentsCount} color="primary" loading={loading} />
        </div>
      )}

      {role === "Guest" && (
        <h4 className="text-secondary mt-4">Please login to see your dashboard.</h4>
      )}
    </div>
  );
}

/* Reusable Card Component */
function Card({ title, value, color, loading }) {
  return (
    <div className="col-12 col-md-4">
      <div className="card shadow border-0 text-center h-100">
        <div className="card-body d-flex flex-column justify-content-center py-4">
          <h5 className="text-secondary mb-2 fs-5">{title}</h5>
          <h2 className={`fw-bold text-${color} display-6`}>
            {loading ? "..." : value}
          </h2>
        </div>
      </div>
    </div>
  );
}
