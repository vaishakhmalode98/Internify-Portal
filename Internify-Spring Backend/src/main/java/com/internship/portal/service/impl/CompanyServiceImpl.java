package com.internship.portal.service.impl;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Company;
import com.internship.portal.exception.ResourceNotFoundException;
import com.internship.portal.repository.CompanyRepository;
import com.internship.portal.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Company c : companies) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("company_id", c.getCompanyId());
            map.put("name", c.getName());
            map.put("email", c.getEmail());
            map.put("tech_domain", c.getTechDomain());
            result.add(map);
        }
        return result;
    }

    @Override
    public MessageResponseDTO addCompany(Map<String, Object> data) {
        Company company = Company.builder()
                .name((String) data.get("name"))
                .email((String) data.get("email"))
                .password((String) data.get("password"))
                .techDomain((String) data.get("tech_domain"))
                .build();

        companyRepository.save(company);
        return new MessageResponseDTO("Company registered successfully");
    }

    @Override
    public MessageResponseDTO updateCompany(Long id, Map<String, Object> data) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        if (data.containsKey("name")) {
            company.setName((String) data.get("name"));
        }
        if (data.containsKey("email")) {
            company.setEmail((String) data.get("email"));
        }
        if (data.containsKey("tech_domain")) {
            company.setTechDomain((String) data.get("tech_domain"));
        }

        companyRepository.save(company);
        return new MessageResponseDTO("Company Updated");
    }

    @Override
    public MessageResponseDTO deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Company not found");
        }
        companyRepository.deleteById(id);
        return new MessageResponseDTO("Company Deleted");
    }
}