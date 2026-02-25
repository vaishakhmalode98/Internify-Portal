package com.internship.portal.repository;

import com.internship.portal.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    @Query(value = "SELECT s.skill_id, s.skill_name FROM student_skills ss " +
                   "JOIN skills s ON ss.skill_id = s.skill_id " +
                   "WHERE ss.student_id = :studentId", nativeQuery = true)
    List<Object[]> findSkillsByStudentId(@Param("studentId") Long studentId);
}