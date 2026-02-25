package com.internship.portal.service;

import com.internship.portal.dto.response.MessageResponseDTO;

import java.util.List;
import java.util.Map;

public interface SupervisorService {
    
    List<Map<String, Object>> getAllSupervisors();
    
    MessageResponseDTO addSupervisor(Map<String, Object> data);
    
    MessageResponseDTO updateSupervisor(Long id, Map<String, Object> data);
    
    MessageResponseDTO deleteSupervisor(Long id);
}