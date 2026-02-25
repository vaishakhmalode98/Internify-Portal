package com.internship.portal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternshipResponseDTO {
    private Long internshipId;
    private Long companyId;
    private String title;
    private String postDate;
    private String status;
    private String companyName;
}