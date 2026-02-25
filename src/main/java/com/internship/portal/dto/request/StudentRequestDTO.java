package com.internship.portal.dto.request;

import lombok.Data;

@Data
public class StudentRequestDTO {
    private Long supervisorId;
    private Long supervisor_id;
    private String name;
    private String phone;
    private String email;
    private String password;
    private String education;
    private String resumeUrl;
    private String resume_url;
}