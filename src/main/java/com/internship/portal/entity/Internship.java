package com.internship.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "internship")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "internship_id")
    private Long internshipId;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(nullable = false)
    private String title;

    @Column(name = "post_date")
    private LocalDate postDate;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'open'")
    private String status;

    @PrePersist
    protected void onCreate() {
        if (this.postDate == null) {
            this.postDate = LocalDate.now();
        }
        if (this.status == null) {
            this.status = "open";
        }
    }
}