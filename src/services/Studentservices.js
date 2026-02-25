import axios from 'axios';
import { getAuthHeader } from "./TokenService";


export function getAllStudents(){
    return axios.get("http://localhost:8080/student/data", getAuthHeader());
}

// Get one student by ID (optional)
export const getStudentById = async (studentId) => {
  return await axios.get(`http://localhost:8080/student/data/${studentId}`, getAuthHeader());
};

// Update student by ID
export const updateStudentById = async (studentId, studentData) => {
  return await axios.put(`http://localhost:8080/student/data/${studentId}`, studentData, getAuthHeader());
};

// Delete student by ID
export const deleteStudentById = async (studentId) => {
  return await axios.delete(`http://localhost:8080/student/data/${studentId}`,getAuthHeader());
};