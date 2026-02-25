package com.internship.portal.service;

import com.internship.portal.dto.response.MessageResponseDTO;

public interface HashPasswordService {
    
    MessageResponseDTO hashStudentPasswords();
    
    MessageResponseDTO hashSupervisorPasswords();
    
    MessageResponseDTO hashCompanyPasswords();
}