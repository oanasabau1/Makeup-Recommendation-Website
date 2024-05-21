package com.software_design.project_software_design.service;

import com.software_design.project_software_design.dto.UserDTO;
import com.software_design.project_software_design.factory.*;
import com.software_design.project_software_design.mapper.UserMapper;
import com.software_design.project_software_design.model.Product;
import com.software_design.project_software_design.model.Role;
import com.software_design.project_software_design.model.User;
import com.software_design.project_software_design.repository.UserRepository;
import com.software_design.project_software_design.util.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    public boolean findActive() {
        return getUsers().stream().anyMatch(User::isLogged);
    }

    public User findLoggedUser() {
        List<User> users = getUsers().stream()
                .filter(User::isLogged)
                .toList();
        return users.isEmpty() ? null : users.get(0); // Assuming only one user can be logged in at a time
    }

    public void setActiveUser(User user) {
        if (!findActive()) {
            user.setLogged(true);
            userRepository.save(user);
        }
    }

    public boolean isAdminLogged() {
        return getUsers().stream()
                .anyMatch(user -> Role.ADMIN.equals(user.getUserRole()) && user.isLogged());
    }

    public boolean isCurrentUserLogged(Long userId) {
        User loggedUser=userRepository.findById(userId).orElse(null);
        return loggedUser!=null && loggedUser.isLogged() && loggedUser.getUserId().equals(userId);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }


    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<UserDTO> getAllUserDto() {
        return userMapper.userListEntityToDto(userRepository.findAll());
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User registerUser(User user) {
        user.setUserRole(Role.CLIENT);
        user.setPassword(Security.encryptPassword(user.getPassword()));
        user.setLogged(true);
        return userRepository.save(user);
    }

    public void saveUsersDTOToFile(String format) {
        List<UserDTO> usersDTO = getAllUserDto();
        DocumentWriter documentWriter;
        DocumentFactory factory = null;
        switch (format) {
            case "csv" -> {
                factory = new CSVFactory();
            }
            case "json" -> {
                factory = new JSONFactory();
            }
            case "xml" -> {
                factory = new XMLFactory();
            }
            default -> {
                System.out.println("Not a valid format");
            }
        }
        if (factory != null) {
            documentWriter = factory.factoryMethod();
            documentWriter.writeUsersFile(usersDTO);
        }
    }

    public User updateUserDetails(User updatedUser) {
        User existingUser = userRepository.findById(updatedUser.getUserId()).orElse(null);
        if (existingUser != null) {
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setGender(updatedUser.getGender());
            existingUser.setBirthDate(updatedUser.getBirthDate());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setAddress(updatedUser.getAddress());
            existingUser.setUsername(updatedUser.getUsername());
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    public boolean validateUserCredentials(String username, String password)  {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            String hashedPassword = Security.encryptPassword(password);
            assert hashedPassword != null;
            return hashedPassword.equals(user.getPassword());
        }
        return false;
    }
}