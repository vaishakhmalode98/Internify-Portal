package com.internship.portal.controller;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.service.HashPasswordService;
import com.internship.portal.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;           // Interface injection
    private final HashPasswordService hashPasswordService; // Interface injection

    @GetMapping("/student/data")
    public ResponseEntity<List<Map<String, Object>>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PostMapping("/student/data")
    public ResponseEntity<MessageResponseDTO> addStudent(@RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(studentService.addStudent(data));
    }

    @PutMapping("/student/data/{id}")
    public ResponseEntity<MessageResponseDTO> updateStudent(
            @PathVariable Long id,
            @RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(studentService.updateStudent(id, data));
    }

    @DeleteMapping("/student/data/{id}")
    public ResponseEntity<MessageResponseDTO> deleteStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.deleteStudent(id));
    }

    @GetMapping("/student/{supervisorId}")
    public ResponseEntity<List<Map<String, Object>>> getStudentsBySupervisor(
            @PathVariable Long supervisorId) {
        return ResponseEntity.ok(studentService.getStudentsBySupervisorId(supervisorId));
    }

    @PostMapping("/student/hash-passwords")
    public ResponseEntity<MessageResponseDTO> hashPasswords() {
        return ResponseEntity.ok(hashPasswordService.hashStudentPasswords());
    }
}