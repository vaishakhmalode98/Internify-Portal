package com.internship.portal.service;

import com.internship.portal.dto.request.LoginRequestDTO;
import com.internship.portal.dto.request.SignUpRequestDTO;
import com.internship.portal.dto.response.LoginResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;

public interface AuthService {
    
    LoginResponseDTO login(LoginRequestDTO request);
    
    MessageResponseDTO signUp(SignUpRequestDTO request);
}