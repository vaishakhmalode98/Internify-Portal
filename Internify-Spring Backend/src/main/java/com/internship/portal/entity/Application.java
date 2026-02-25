package com.internship.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "application")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long applicationId;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "internship_id", nullable = false)
    private Long internshipId;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'pending'")
    private String status;

    @Column(name = "applied_at")
    private LocalDateTime appliedAt;

    @PrePersist
    protected void onCreate() {
        if (this.appliedAt == null) {
            this.appliedAt = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = "pending";
        }
    }
}