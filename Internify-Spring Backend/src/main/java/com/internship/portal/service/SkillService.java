package com.internship.portal.service;

import com.internship.portal.dto.response.MessageResponseDTO;

import java.util.List;
import java.util.Map;

public interface SkillService {
    
    List<Map<String, Object>> getAllSkills();
    
    List<Map<String, Object>> getSkillsByStudentId(Long studentId);
    
    MessageResponseDTO addSkill(Map<String, Object> data);
    
    MessageResponseDTO updateSkill(Long id, Map<String, Object> data);
    
    MessageResponseDTO deleteSkill(Long id);
}