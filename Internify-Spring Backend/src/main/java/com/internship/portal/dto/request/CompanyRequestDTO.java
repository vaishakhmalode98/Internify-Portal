package com.internship.portal.dto.request;

import lombok.Data;

@Data
public class CompanyRequestDTO {
    private String name;
    private String email;
    private String password;
    private String techDomain;
    private String tech_domain;
}