package com.internship.portal.service.impl;

import com.internship.portal.dto.response.MessageResponseDTO;
import com.internship.portal.entity.Skill;
import com.internship.portal.exception.ResourceNotFoundException;
import com.internship.portal.repository.SkillRepository;
import com.internship.portal.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllSkills() {
        List<Skill> skills = skillRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Skill s : skills) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("skill_id", s.getSkillId());
            map.put("skill_name", s.getSkillName());
            result.add(map);
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getSkillsByStudentId(Long studentId) {
        List<Object[]> rows = skillRepository.findSkillsByStudentId(studentId);

        if (rows.isEmpty()) {
            throw new ResourceNotFoundException("No skills found for this student");
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("skill_id", row[0]);
            map.put("skill_name", row[1]);
            result.add(map);
        }
        return result;
    }

    @Override
    public MessageResponseDTO addSkill(Map<String, Object> data) {
        String name = (String) data.getOrDefault("name",
                data.getOrDefault("skill_name",
                        data.get("skillName")));

        Skill skill = Skill.builder()
                .skillName(name)
                .build();

        skillRepository.save(skill);
        return new MessageResponseDTO("Skills Added");
    }

    @Override
    public MessageResponseDTO updateSkill(Long id, Map<String, Object> data) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

        String name = (String) data.getOrDefault("name",
                data.getOrDefault("skill_name",
                        data.get("skillName")));

        if (name != null) {
            skill.setSkillName(name);
        }

        skillRepository.save(skill);
        return new MessageResponseDTO("Skills Updated");
    }

    @Override
    public MessageResponseDTO deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found");
        }
        skillRepository.deleteById(id);
        return new MessageResponseDTO("Skill Deleted");
    }
}