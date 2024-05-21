package com.software_design.project_software_design.mapper;

import com.software_design.project_software_design.dto.UserDTO;
import com.software_design.project_software_design.model.Role;
import com.software_design.project_software_design.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class UserMapper {
public UserDTO userEntityToDto(User user) {
    return UserDTO.builder()
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .gender(user.getGender())
            .birthDate(user.getBirthDate())
            .email(user.getEmail())
            .phoneNumber(user.getPhoneNumber())
            .address(user.getAddress())
            .role((user.getUserRole()))
            .build();
}
    public List<UserDTO> userListEntityToDto(List<User> users) {
        return users.stream()
                .map(this::userEntityToDto)
                .toList();
    }
}
