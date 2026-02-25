package com.internship.portal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponseDTO {
    private Long applicationId;
    private Long studentId;
    private String studentName;
    private String education;
    private String studentEmail;
    private String studentPhone;
    private Long companyId;
    private String companyName;
    private String techDomain;
    private Long internshipId;
    private String internshipTitle;
    private String internshipStatus;
    private String applicationStatus;
    private LocalDateTime appliedAt;
}