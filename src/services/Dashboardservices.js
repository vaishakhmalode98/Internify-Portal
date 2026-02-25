// src/services/dashboardServices.js
import axios from "axios";
import { getAuthHeader } from "./TokenService";

// 🔹 Student
export const getStudentSkills = (studentId) =>
  axios.get(`http://localhost:8080/skills/${studentId}`, getAuthHeader());

export const getStudentApplications = (studentId) =>
  axios.get(`http://localhost:8080/application/data/${studentId}`,getAuthHeader());


// 🔹 Company
export const getCompanyInternships = (companyId) =>
  axios.get(`http://localhost:8080/internship/${companyId}`,getAuthHeader());

export const getCompanyApplications = (companyId) =>
  axios.get(`http://localhost:8080/application/${companyId}`,getAuthHeader());

// 🔹 Supervisor
export const getStudentsBySupervisor = (supervisorId) =>
  axios.get(`http://localhost:8080/student/${supervisorId}`,getAuthHeader());
