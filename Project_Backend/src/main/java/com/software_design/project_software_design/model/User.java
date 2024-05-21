package com.software_design.project_software_design.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userId", unique = true, nullable = false)
    private Long userId;

    @Column(name="firstName", nullable = false)
    private String firstName;

    @Column(name="lastName", nullable = false)
    private String lastName;

    @Column(name="gender", nullable = false)
    private String gender;

    @Column(name="birthDate", nullable = false)
    private LocalDate birthDate;

    @Column(name="email", unique = true, nullable = false)
    private String email;

    @Column(name="phoneNumber", unique = true, nullable = false)
    private String phoneNumber;

    @Column(name="address", nullable = false)
    private String address;

    @Column(name="username", unique = true, nullable = false)
    private String username;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="userRole", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role userRole;

    @Column(name="logged", nullable = false)
    private boolean logged = false;

}
