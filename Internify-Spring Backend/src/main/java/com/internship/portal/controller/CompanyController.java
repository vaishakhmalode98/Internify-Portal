package com.internship.portal.controller;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.service.CompanyService;
import com.internship.portal.service.HashPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;           // Interface injection
    private final HashPasswordService hashPasswordService; // Interface injection

    @GetMapping("/company/data")
    public ResponseEntity<List<Map<String, Object>>> getAllCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @PostMapping("/company/data")
    public ResponseEntity<MessageResponseDTO> addCompany(
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(companyService.addCompany(data));
    }

    @PutMapping("/company/data/{id}")
    public ResponseEntity<MessageResponseDTO> updateCompany(
            @PathVariable Long id,
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(companyService.updateCompany(id, data));
    }

    @DeleteMapping("/company/data/{id}")
    public ResponseEntity<MessageResponseDTO> deleteCompany(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.deleteCompany(id));
    }

    @PostMapping("/company/hash-passwords")
    public ResponseEntity<MessageResponseDTO> hashPasswords() {
        return ResponseEntity.ok(hashPasswordService.hashCompanyPasswords());
    }
}