package com.internship.portal.dto.request;

import lombok.Data;

@Data
public class SupervisorRequestDTO {
    private String name;
    private String phone;
    private String email;
    private String password;
}