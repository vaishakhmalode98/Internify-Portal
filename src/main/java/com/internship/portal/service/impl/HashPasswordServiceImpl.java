package com.internship.portal.service.impl;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Company;
import com.internship.portal.entity.Student;
import com.internship.portal.entity.Supervisor;
import com.internship.portal.repository.CompanyRepository;
import com.internship.portal.repository.StudentRepository;
import com.internship.portal.repository.SupervisorRepository;
import com.internship.portal.service.HashPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HashPasswordServiceImpl implements HashPasswordService {

    private final StudentRepository studentRepository;
    private final SupervisorRepository supervisorRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public MessageResponseDTO hashStudentPasswords() {
        List<Student> students = studentRepository.findAll();
        for (Student student : students) {
            String password = student.getPassword();
            if (password != null && !password.startsWith("$2")) {
                student.setPassword(passwordEncoder.encode(password));
                studentRepository.save(student);
            }
        }
        return new MessageResponseDTO("Passwords hashed successfully!");
    }

    @Override
    public MessageResponseDTO hashSupervisorPasswords() {
        List<Supervisor> supervisors = supervisorRepository.findAll();
        for (Supervisor supervisor : supervisors) {
            String password = supervisor.getPassword();
            if (password != null && !password.startsWith("$2")) {
                supervisor.setPassword(passwordEncoder.encode(password));
                supervisorRepository.save(supervisor);
            }
        }
        return new MessageResponseDTO("Supervisor passwords hashed successfully!");
    }

    @Override
    public MessageResponseDTO hashCompanyPasswords() {
        List<Company> companies = companyRepository.findAll();
        for (Company company : companies) {
            String password = company.getPassword();
            if (password != null && !password.startsWith("$2")) {
                company.setPassword(passwordEncoder.encode(password));
                companyRepository.save(company);
            }
        }
        return new MessageResponseDTO("Company passwords hashed successfully!");
    }
}