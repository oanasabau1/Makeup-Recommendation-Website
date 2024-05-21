package com.software_design.project_software_design.dto;

import com.software_design.project_software_design.model.Role;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record UserDTO (
        String firstName,
        String lastName,
        String gender,
        LocalDate birthDate,
        String email,
        String phoneNumber,
        String address,
        Role role) {

}

