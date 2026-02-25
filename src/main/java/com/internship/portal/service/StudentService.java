package com.internship.portal.service;

import com.internship.portal.dto.response.MessageResponseDTO;

import java.util.List;
import java.util.Map;

public interface StudentService {
    
    List<Map<String, Object>> getAllStudents();
    
    MessageResponseDTO addStudent(Map<String, Object> data);
    
    MessageResponseDTO updateStudent(Long id, Map<String, Object> data);
    
    MessageResponseDTO deleteStudent(Long id);
    
    List<Map<String, Object>> getStudentsBySupervisorId(Long supervisorId);
}