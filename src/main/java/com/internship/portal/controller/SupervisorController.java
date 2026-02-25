package com.internship.portal.controller;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.service.HashPasswordService;
import com.internship.portal.service.SupervisorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorService supervisorService;     // Interface injection
    private final HashPasswordService hashPasswordService; // Interface injection

    @GetMapping("/supervisor/data")
    public ResponseEntity<List<Map<String, Object>>> getAllSupervisors() {
        return ResponseEntity.ok(supervisorService.getAllSupervisors());
    }

    @PostMapping("/supervisor/data")
    public ResponseEntity<MessageResponseDTO> addSupervisor(
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(supervisorService.addSupervisor(data));
    }

    @PutMapping("/supervisor/data/{id}")
    public ResponseEntity<MessageResponseDTO> updateSupervisor(
            @PathVariable Long id,
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(supervisorService.updateSupervisor(id, data));
    }

    @DeleteMapping("/supervisor/data/{id}")
    public ResponseEntity<MessageResponseDTO> deleteSupervisor(@PathVariable Long id) {
        return ResponseEntity.ok(supervisorService.deleteSupervisor(id));
    }

    @PostMapping("/supervisor/hash-passwords")
    public ResponseEntity<MessageResponseDTO> hashPasswords() {
        return ResponseEntity.ok(hashPasswordService.hashSupervisorPasswords());
    }
}