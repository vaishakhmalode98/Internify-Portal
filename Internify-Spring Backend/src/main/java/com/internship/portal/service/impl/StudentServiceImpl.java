package com.internship.portal.service.impl;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Student;
import com.internship.portal.exception.ResourceNotFoundException;
import com.internship.portal.repository.StudentRepository;
import com.internship.portal.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Student s : students) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("student_id", s.getStudentId());
            map.put("supervisor_id", s.getSupervisorId());
            map.put("name", s.getName());
            map.put("phone", s.getPhone());
            map.put("email", s.getEmail());
            map.put("resume_url", s.getResumeUrl());
            map.put("education", s.getEducation());
            result.add(map);
        }
        return result;
    }

    @Override
    public MessageResponseDTO addStudent(Map<String, Object> data) {
        Long supervisorId = null;
        if (data.get("supervisor_id") != null) {
            supervisorId = Long.valueOf(data.get("supervisor_id").toString());
        }

        Student student = Student.builder()
                .supervisorId(supervisorId)
                .name((String) data.get("name"))
                .phone((String) data.get("phone"))
                .email((String) data.get("email"))
                .password((String) data.get("password"))
                .education((String) data.get("education"))
                .build();

        studentRepository.save(student);
        return new MessageResponseDTO("Student registered");
    }

    @Override
    public MessageResponseDTO updateStudent(Long id, Map<String, Object> data) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        if (data.containsKey("name")) {
            student.setName((String) data.get("name"));
        }
        if (data.containsKey("phone")) {
            student.setPhone((String) data.get("phone"));
        }
        if (data.containsKey("email")) {
            student.setEmail((String) data.get("email"));
        }
        if (data.containsKey("education")) {
            student.setEducation((String) data.get("education"));
        }

        studentRepository.save(student);
        return new MessageResponseDTO("Student Updated");
    }

    @Override
    public MessageResponseDTO deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found");
        }
        studentRepository.deleteById(id);
        return new MessageResponseDTO("Student Deleted");
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getStudentsBySupervisorId(Long supervisorId) {
        List<Student> students = studentRepository.findBySupervisorId(supervisorId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Student s : students) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("student_id", s.getStudentId());
            map.put("supervisor_id", s.getSupervisorId());
            map.put("name", s.getName());
            map.put("phone", s.getPhone());
            map.put("email", s.getEmail());
            map.put("resume_url", s.getResumeUrl());
            map.put("education", s.getEducation());
            map.put("password", s.getPassword());
            result.add(map);
        }
        return result;
    }
}