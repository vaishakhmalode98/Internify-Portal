package com.internship.portal.controller;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService; // Interface injection

    @GetMapping("/skill/data")
    public ResponseEntity<List<Map<String, Object>>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/skills/{studentId}")
    public ResponseEntity<List<Map<String, Object>>> getSkillsByStudent(
            @PathVariable Long studentId) {
        return ResponseEntity.ok(skillService.getSkillsByStudentId(studentId));
    }

    @PostMapping("/skill/data")
    public ResponseEntity<MessageResponseDTO> addSkill(
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(skillService.addSkill(data));
    }

    @PutMapping("/skill/data/{id}")
    public ResponseEntity<MessageResponseDTO> updateSkill(
            @PathVariable Long id,
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(skillService.updateSkill(id, data));
    }

    @DeleteMapping("/skill/data/{id}")
    public ResponseEntity<MessageResponseDTO> deleteSkill(@PathVariable Long id) {
        return ResponseEntity.ok(skillService.deleteSkill(id));
    }
}