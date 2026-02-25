package com.internship.portal.service;

import com.internship.portal.dto.response.InternshipResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Internship;

import java.util.List;
import java.util.Map;

public interface InternshipService {
    
    List<InternshipResponseDTO> getAllInternships();
    
    List<Internship> getInternshipsByCompanyId(Long companyId);
    
    MessageResponseDTO addInternship(Map<String, Object> data);
    
    MessageResponseDTO updateInternship(Long id, Map<String, Object> data);
    
    MessageResponseDTO updateInternshipStatus(Long internshipId, String status);
    
    MessageResponseDTO deleteInternship(Long id);
}