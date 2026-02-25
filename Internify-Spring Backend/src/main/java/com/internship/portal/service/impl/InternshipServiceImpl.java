package com.internship.portal.service.impl;

import com.internship.portal.dto.response.InternshipResponseDTO;
import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Company;
import com.internship.portal.entity.Internship;
import com.internship.portal.exception.ResourceNotFoundException;
import com.internship.portal.repository.CompanyRepository;
import com.internship.portal.repository.InternshipRepository;
import com.internship.portal.service.InternshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class InternshipServiceImpl implements InternshipService {

    private final InternshipRepository internshipRepository;
    private final CompanyRepository companyRepository;

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    @Override
    @Transactional(readOnly = true)
    public List<InternshipResponseDTO> getAllInternships() {
        List<Internship> internships = internshipRepository.findAll();
        List<InternshipResponseDTO> result = new ArrayList<>();

        for (Internship i : internships) {
            String companyName = companyRepository.findById(i.getCompanyId())
                    .map(Company::getName)
                    .orElse("Unknown");

            result.add(InternshipResponseDTO.builder()
                    .internshipId(i.getInternshipId())
                    .companyId(i.getCompanyId())
                    .title(i.getTitle())
                    .postDate(i.getPostDate() != null ?
                            i.getPostDate().format(DATE_FORMAT) : null)
                    .status(i.getStatus())
                    .companyName(companyName)
                    .build());
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Internship> getInternshipsByCompanyId(Long companyId) {
        return internshipRepository.findByCompanyId(companyId);
    }

    @Override
    public MessageResponseDTO addInternship(Map<String, Object> data) {
        Long companyId = null;
        if (data.get("company_id") != null) {
            companyId = Long.valueOf(data.get("company_id").toString());
        }

        Internship internship = Internship.builder()
                .companyId(companyId)
                .title((String) data.get("title"))
                .build();

        internshipRepository.save(internship);
        return new MessageResponseDTO("Internship added");
    }

    @Override
    public MessageResponseDTO updateInternship(Long id, Map<String, Object> data) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));

        if (data.containsKey("status")) {
            internship.setStatus((String) data.get("status"));
        }

        internshipRepository.save(internship);
        return new MessageResponseDTO("Internship Updated");
    }

    @Override
    public MessageResponseDTO updateInternshipStatus(Long internshipId, String status) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found"));

        internship.setStatus(status);
        internshipRepository.save(internship);
        return new MessageResponseDTO("Internship status updated");
    }

    @Override
    public MessageResponseDTO deleteInternship(Long id) {
        if (!internshipRepository.existsById(id)) {
            throw new ResourceNotFoundException("Internship not found");
        }
        internshipRepository.deleteById(id);
        return new MessageResponseDTO("Internship Deleted");
    }
}