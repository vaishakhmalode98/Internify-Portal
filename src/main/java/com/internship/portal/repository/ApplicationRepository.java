package com.internship.portal.repository;

import com.internship.portal.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentIdOrderByAppliedAtDesc(Long studentId);
    List<Application> findByCompanyId(Long companyId);
    List<Application> findAllByOrderByAppliedAtDesc();
}