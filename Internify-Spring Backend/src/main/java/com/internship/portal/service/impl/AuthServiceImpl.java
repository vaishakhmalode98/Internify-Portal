package com.internship.portal.service.impl;

import com.internship.portal.constants.RoleConstants;
import com.internship.portal.dto.request.LoginRequestDTO;
import com.internship.portal.dto.request.SignUpRequestDTO;
import com.internship.portal.dto.response.LoginResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Company;
import com.internship.portal.entity.Student;
import com.internship.portal.entity.Supervisor;
import com.internship.portal.repository.CompanyRepository;
import com.internship.portal.repository.StudentRepository;
import com.internship.portal.repository.SupervisorRepository;
import com.internship.portal.security.JwtUtil;
import com.internship.portal.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final StudentRepository studentRepository;
    private final SupervisorRepository supervisorRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {
        String role = request.getRole();
        String email = request.getEmail();
        String password = request.getPassword();

        Map<String, Object> userMap = new HashMap<>();
        Long userId;

        switch (role) {
            case RoleConstants.STUDENT -> {
                Student student = studentRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
                if (!passwordEncoder.matches(password, student.getPassword())) {
                    throw new IllegalArgumentException("Invalid email or password");
                }
                userId = student.getStudentId();
                userMap.put("student_id", student.getStudentId());
                userMap.put("name", student.getName());
                userMap.put("email", student.getEmail());
                userMap.put("phone", student.getPhone());
                userMap.put("education", student.getEducation());
                userMap.put("resume_url", student.getResumeUrl());
                userMap.put("supervisor_id", student.getSupervisorId());
                userMap.put("role", role);
            }
            case RoleConstants.SUPERVISOR -> {
                Supervisor supervisor = supervisorRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
                if (!passwordEncoder.matches(password, supervisor.getPassword())) {
                    throw new IllegalArgumentException("Invalid email or password");
                }
                userId = supervisor.getSupervisorId();
                userMap.put("supervisor_id", supervisor.getSupervisorId());
                userMap.put("name", supervisor.getName());
                userMap.put("email", supervisor.getEmail());
                userMap.put("phone", supervisor.getPhone());
                userMap.put("role", role);
            }
            case RoleConstants.COMPANY -> {
                Company company = companyRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
                if (!passwordEncoder.matches(password, company.getPassword())) {
                    throw new IllegalArgumentException("Invalid email or password");
                }
                userId = company.getCompanyId();
                userMap.put("company_id", company.getCompanyId());
                userMap.put("name", company.getName());
                userMap.put("email", company.getEmail());
                userMap.put("tech_domain", company.getTechDomain());
                userMap.put("role", role);
            }
            default -> throw new IllegalArgumentException("Invalid role");
        }

        String token = jwtUtil.generateToken(userId, role);

        return LoginResponseDTO.builder()
                .message("Login successful")
                .token(token)
                .user(userMap)
                .build();
    }

    @Override
    public MessageResponseDTO signUp(SignUpRequestDTO request) {
        String role = request.getRole();
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        switch (role) {
            case RoleConstants.STUDENT -> {
                if (studentRepository.existsByEmail(request.getEmail())) {
                    throw new IllegalArgumentException("Email already exists");
                }
                Student student = Student.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .phone(request.getPhone())
                        .password(hashedPassword)
                        .resumeUrl(request.getResume_url() != null ?
                                request.getResume_url() : request.getResumeUrl())
                        .education(request.getEducation())
                        .build();
                studentRepository.save(student);
            }
            case RoleConstants.SUPERVISOR -> {
                if (supervisorRepository.existsByEmail(request.getEmail())) {
                    throw new IllegalArgumentException("Email already exists");
                }
                Supervisor supervisor = Supervisor.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .phone(request.getPhone())
                        .password(hashedPassword)
                        .build();
                supervisorRepository.save(supervisor);
            }
            case RoleConstants.COMPANY -> {
                if (companyRepository.existsByEmail(request.getEmail())) {
                    throw new IllegalArgumentException("Email already exists");
                }
                Company company = Company.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .password(hashedPassword)
                        .techDomain(request.getTech_domain() != null ?
                                request.getTech_domain() : request.getTechDomain())
                        .build();
                companyRepository.save(company);
            }
            default -> throw new IllegalArgumentException("Invalid role specified");
        }

        return new MessageResponseDTO(role + " registered successfully");
    }
}