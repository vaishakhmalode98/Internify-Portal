package com.internship.portal.controller;

import com.internship.portal.dto.request.InternshipStatusDTO;
import com.internship.portal.dto.response.InternshipResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Internship;
import com.internship.portal.service.InternshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class InternshipController {

    private final InternshipService internshipService; // Interface injection

    @GetMapping("/internship/data")
    public ResponseEntity<List<InternshipResponseDTO>> getAllInternships() {
        return ResponseEntity.ok(internshipService.getAllInternships());
    }

    @PostMapping("/internship/data")
    public ResponseEntity<MessageResponseDTO> addInternship(
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(internshipService.addInternship(data));
    }

    @PutMapping("/internship/data/{id}")
    public ResponseEntity<MessageResponseDTO> updateInternship(
            @PathVariable Long id,
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(internshipService.updateInternship(id, data));
    }

    @DeleteMapping("/internship/data/{id}")
    public ResponseEntity<MessageResponseDTO> deleteInternship(@PathVariable Long id) {
        return ResponseEntity.ok(internshipService.deleteInternship(id));
    }

    @PutMapping("/internship/{internshipId}")
    public ResponseEntity<MessageResponseDTO> updateInternshipStatus(
            @PathVariable Long internshipId,
            @RequestBody InternshipStatusDTO statusDTO) {
        return ResponseEntity.ok(
                internshipService.updateInternshipStatus(internshipId, statusDTO.getStatus()));
    }

    @GetMapping("/internship/{companyId}")
    public ResponseEntity<List<Internship>> getInternshipsByCompany(
            @PathVariable Long companyId) {
        return ResponseEntity.ok(internshipService.getInternshipsByCompanyId(companyId));
    }
}