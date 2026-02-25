import axios from 'axios';
import { getAuthHeader } from "./TokenService";

export function getAllSupervisors(){
    return axios.get("http://localhost:8080/supervisor/data", getAuthHeader());
}
