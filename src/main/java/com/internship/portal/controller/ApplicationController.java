package com.internship.portal.controller;

import com.internship.portal.dto.response.ApplicationResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Application;
import com.internship.portal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService; // Interface injection

    @GetMapping("/application/data")
    public ResponseEntity<List<ApplicationResponseDTO>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/application/data/{studentId}")
    public ResponseEntity<List<ApplicationResponseDTO>> getApplicationsByStudent(
            @PathVariable Long studentId) {
        return ResponseEntity.ok(applicationService.getApplicationsByStudent(studentId));
    }

    @PostMapping("/application/create")
    public ResponseEntity<MessageResponseDTO> createApplication(
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(applicationService.createApplication(data));
    }

    @PutMapping("/application/data/{applicationId}")
    public ResponseEntity<MessageResponseDTO> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody Map<String, Object> data) {
        // Check if only status is being updated
        if (data.containsKey("status") && data.size() == 1) {
            return ResponseEntity.ok(
                    applicationService.updateApplicationStatus(
                            applicationId, (String) data.get("status")));
        }
        return ResponseEntity.ok(
                applicationService.updateApplication(applicationId, data));
    }

    @DeleteMapping("/application/data/{id}")
    public ResponseEntity<MessageResponseDTO> deleteApplication(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.deleteApplication(id));
    }

    @GetMapping("/application/{companyId}")
    public ResponseEntity<List<Application>> getApplicationsByCompany(
            @PathVariable Long companyId) {
        return ResponseEntity.ok(applicationService.getApplicationsByCompanyId(companyId));
    }
}