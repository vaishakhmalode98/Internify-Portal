package com.internship.portal.service.impl;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Supervisor;
import com.internship.portal.exception.ResourceNotFoundException;
import com.internship.portal.repository.SupervisorRepository;
import com.internship.portal.service.SupervisorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class SupervisorServiceImpl implements SupervisorService {

    private final SupervisorRepository supervisorRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllSupervisors() {
        List<Supervisor> supervisors = supervisorRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Supervisor s : supervisors) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("supervisor_id", s.getSupervisorId());
            map.put("name", s.getName());
            map.put("phone", s.getPhone());
            map.put("email", s.getEmail());
            result.add(map);
        }
        return result;
    }

    @Override
    public MessageResponseDTO addSupervisor(Map<String, Object> data) {
        Supervisor supervisor = Supervisor.builder()
                .name((String) data.get("name"))
                .phone((String) data.get("phone"))
                .email((String) data.get("email"))
                .password((String) data.get("password"))
                .build();

        supervisorRepository.save(supervisor);
        return new MessageResponseDTO("Supervisor Registered");
    }

    @Override
    public MessageResponseDTO updateSupervisor(Long id, Map<String, Object> data) {
        Supervisor supervisor = supervisorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found"));

        if (data.containsKey("name")) {
            supervisor.setName((String) data.get("name"));
        }
        if (data.containsKey("phone")) {
            supervisor.setPhone((String) data.get("phone"));
        }
        if (data.containsKey("email")) {
            supervisor.setEmail((String) data.get("email"));
        }

        supervisorRepository.save(supervisor);
        return new MessageResponseDTO("Supervisor Updated");
    }

    @Override
    public MessageResponseDTO deleteSupervisor(Long id) {
        if (!supervisorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Supervisor not found");
        }
        supervisorRepository.deleteById(id);
        return new MessageResponseDTO("Supervisor Deleted");
    }
}