package com.internship.portal.controller;

import com.internship.portal.dto.request.LoginRequestDTO;
import com.internship.portal.dto.request.SignUpRequestDTO;
import com.internship.portal.dto.response.LoginResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;  // Interface injection

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponseDTO> signUp(@Valid @RequestBody SignUpRequestDTO request) {
        MessageResponseDTO response = authService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}