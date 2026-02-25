package com.internship.portal.service.impl;

import com.internship.portal.dto.response.ApplicationResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Application;
import com.internship.portal.entity.Company;
import com.internship.portal.entity.Internship;
import com.internship.portal.entity.Student;
import com.internship.portal.exception.ResourceNotFoundException;
import com.internship.portal.repository.ApplicationRepository;
import com.internship.portal.repository.CompanyRepository;
import com.internship.portal.repository.InternshipRepository;
import com.internship.portal.repository.StudentRepository;
import com.internship.portal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final InternshipRepository internshipRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getAllApplications() {
        List<Application> applications = applicationRepository.findAllByOrderByAppliedAtDesc();
        return mapToResponseDTOs(applications);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDTO> getApplicationsByStudent(Long studentId) {
        List<Application> applications =
                applicationRepository.findByStudentIdOrderByAppliedAtDesc(studentId);
        return mapToResponseDTOs(applications);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Application> getApplicationsByCompanyId(Long companyId) {
        return applicationRepository.findByCompanyId(companyId);
    }

    @Override
    public MessageResponseDTO createApplication(Map<String, Object> data) {
        Long studentId = data.get("student_id") != null ?
                Long.valueOf(data.get("student_id").toString()) : null;
        Long internshipId = data.get("internship_id") != null ?
                Long.valueOf(data.get("internship_id").toString()) : null;
        Long companyId = data.get("company_id") != null ?
                Long.valueOf(data.get("company_id").toString()) : null;

        Application application = Application.builder()
                .studentId(studentId)
                .internshipId(internshipId)
                .companyId(companyId)
                .build();

        applicationRepository.save(application);
        return new MessageResponseDTO("Application submitted");
    }

    @Override
    public MessageResponseDTO updateApplicationStatus(Long applicationId, String status) {
        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Status is required");
        }

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        application.setStatus(status);
        applicationRepository.save(application);
        return new MessageResponseDTO("Status updated successfully");
    }

    @Override
    public MessageResponseDTO updateApplication(Long id, Map<String, Object> data) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        boolean updated = false;

        if (data.containsKey("status")) {
            application.setStatus((String) data.get("status"));
            updated = true;
        }
        if (data.containsKey("internship_id")) {
            application.setInternshipId(Long.valueOf(data.get("internship_id").toString()));
            updated = true;
        }
        if (data.containsKey("company_id")) {
            application.setCompanyId(Long.valueOf(data.get("company_id").toString()));
            updated = true;
        }

        if (!updated) {
            throw new IllegalArgumentException("No fields to update.");
        }

        applicationRepository.save(application);
        return new MessageResponseDTO("Application updated successfully.");
    }

    @Override
    public MessageResponseDTO deleteApplication(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Application not found");
        }
        applicationRepository.deleteById(id);
        return new MessageResponseDTO("Application deleted successfully");
    }

    private List<ApplicationResponseDTO> mapToResponseDTOs(List<Application> applications) {
        List<ApplicationResponseDTO> result = new ArrayList<>();

        for (Application a : applications) {
            Student student = studentRepository.findById(a.getStudentId()).orElse(null);
            Company company = companyRepository.findById(a.getCompanyId()).orElse(null);
            Internship internship = internshipRepository.findById(a.getInternshipId()).orElse(null);

            result.add(ApplicationResponseDTO.builder()
                    .applicationId(a.getApplicationId())
                    .studentId(a.getStudentId())
                    .studentName(student != null ? student.getName() : null)
                    .education(student != null ? student.getEducation() : null)
                    .studentEmail(student != null ? student.getEmail() : null)
                    .studentPhone(student != null ? student.getPhone() : null)
                    .companyId(a.getCompanyId())
                    .companyName(company != null ? company.getName() : null)
                    .techDomain(company != null ? company.getTechDomain() : null)
                    .internshipId(a.getInternshipId())
                    .internshipTitle(internship != null ? internship.getTitle() : null)
                    .internshipStatus(internship != null ? internship.getStatus() : null)
                    .applicationStatus(a.getStatus())
                    .appliedAt(a.getAppliedAt())
                    .build());
        }
        return result;
    }
}