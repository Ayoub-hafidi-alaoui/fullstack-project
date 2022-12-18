package com.example.demo.student;

import com.example.demo.student.exceptions.BadRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> get_all_students() {
        return studentRepository.findAll();
    }

    public void addStudent(@Valid Student student) {
        boolean emailIsTaken = studentRepository.findAll().stream().findAny().isPresent();
        if (emailIsTaken) {
            throw new BadRequest("email is taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        if (studentRepository.findById(id).isPresent()) {
            studentRepository.deleteById(id);
            return;
        }
        throw new BadRequest("Student does not exist");
    }
}
