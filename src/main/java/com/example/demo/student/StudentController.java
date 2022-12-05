package com.example.demo.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        return List.of(
                new Student(1L, "ayoub", "ayoub@gmail.com", Gender.Male),
        new Student(2L, "hafidi", "ayoub@gmail.com", Gender.Male),
        new Student(3L, "alaoui", "ayoub@gmail.com", Gender.Male)
        );
    }
}
