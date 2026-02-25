package com.internship.portal.dto.request;

import lombok.Data;

@Data
public class ApplicationUpdateDTO {
    private String status;
    private Long internshipId;
    private Long internship_id;
    private Long companyId;
    private Long company_id;
}