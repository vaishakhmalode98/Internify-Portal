import axios from "axios";

import { getAuthHeader } from './TokenService';

export function getAllInternships() {
    return axios.get("http://localhost:8080/internship/data", getAuthHeader());
}

export function postInternship(data) {
    return axios.post(`http://localhost:8080/internship/data`, data, getAuthHeader());
}

export function applyToInternship(data) {
    return axios.post(`http://localhost:8080/application/create`, data, getAuthHeader());
}

export const updateInternshipStatus = async (internshipId, newStatus) => {
  return axios.put(`http://localhost:8080/internship/${internshipId}`, {status: newStatus}, getAuthHeader());
};
