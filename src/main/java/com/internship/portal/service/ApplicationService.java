package com.internship.portal.service;

import com.internship.portal.dto.response.ApplicationResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Application;

import java.util.List;
import java.util.Map;

public interface ApplicationService {
    
    List<ApplicationResponseDTO> getAllApplications();
    
    List<ApplicationResponseDTO> getApplicationsByStudent(Long studentId);
    
    List<Application> getApplicationsByCompanyId(Long companyId);
    
    MessageResponseDTO createApplication(Map<String, Object> data);
    
    MessageResponseDTO updateApplicationStatus(Long applicationId, String status);
    
    MessageResponseDTO updateApplication(Long id, Map<String, Object> data);
    
    MessageResponseDTO deleteApplication(Long id);
}