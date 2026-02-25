package com.internship.portal.service;

import com.internship.portal.dto.response.MessageResponseDTO;

import java.util.List;
import java.util.Map;

public interface CompanyService {
    
    List<Map<String, Object>> getAllCompanies();
    
    MessageResponseDTO addCompany(Map<String, Object> data);
    
    MessageResponseDTO updateCompany(Long id, Map<String, Object> data);
    
    MessageResponseDTO deleteCompany(Long id);
}