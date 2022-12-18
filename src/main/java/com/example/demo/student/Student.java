package com.example.demo.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
public class Student {

    @jakarta.persistence.Id
    @SequenceGenerator(name = "student_sequence", sequenceName = "student_sequence", allocationSize = 1)
    @GeneratedValue(
            generator = "student_sequence",
            strategy = GenerationType.IDENTITY
    )
    private Long Id;

    @NotBlank
    @Column(nullable = false)
    private String name;
    @Email
    @Column(unique = true, nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private Gender gender;

    public Student(String name, String email, Gender gender) {
        this.name = name;
        this.email = email;
        this.gender = gender;
    }
}
