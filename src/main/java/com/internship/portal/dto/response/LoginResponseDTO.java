package com.internship.portal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    private String message;
    private String token;
    private Map<String, Object> user;
}