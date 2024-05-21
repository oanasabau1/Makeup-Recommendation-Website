package com.software_design.project_software_design.controller;

import com.software_design.project_software_design.dto.LoginDTO;
import com.software_design.project_software_design.dto.UserDTO;
import com.software_design.project_software_design.model.User;
import com.software_design.project_software_design.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.Collections;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
        if (userService.validateUserCredentials(username, password)) {
            if (!userService.findActive()) {
                userService.setActiveUser(userService.getUserByUsername(username));
                return ResponseEntity.ok("User is logged in successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You cannot log in!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String username) {
        try {
            User user = userService.getUserByUsername(username);
            if (user != null && user.isLogged()) {
                user.setLogged(false);
                userService.saveUser(user);
                return ResponseEntity.ok("User logged out successfully!");
            } else {
                return ResponseEntity.badRequest().body("User is not logged in.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during logout.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/profile/{userId}")
    public ResponseEntity<User> findUserProfileById(@PathVariable Long userId) {
        if (userService.isCurrentUserLogged(userId)) {
            User user = userService.getUserById(userId);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/currentLoggedUser")
    public ResponseEntity<User> getCurrentLoggedUser() {
        User loggedUser = userService.findLoggedUser();
        if (loggedUser != null) {
            return ResponseEntity.ok(loggedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findActive")
    public boolean findActive() {
        return userService.findActive();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<User> findUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping("/admin")
    public ResponseEntity<User> getAdmin() {
        if(userService.isAdminLogged()) {
            return ResponseEntity.ok(userService.findLoggedUser());
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/saveUsers")
    public void saveUsersToFile(HttpServletRequest request, HttpServletResponse response, @RequestParam String format) throws IOException {
        if(userService.isAdminLogged()) {
            userService.saveUsersDTOToFile(format);
            String EXTERNAL_FILE_PATH = "users." + format;
            File file = new File(EXTERNAL_FILE_PATH);
            if (file.exists()) {
                String mimeType = request.getServletContext().getMimeType(file.getAbsolutePath());
                if (mimeType == null) {
                    mimeType = "application/octet-stream";
                }
                response.setContentType(mimeType);
                response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
                response.setContentLength((int) file.length());

                try (InputStream inputStream = new BufferedInputStream(new FileInputStream(file))) {
                    FileCopyUtils.copy(inputStream, response.getOutputStream());
                } catch (IOException ex) {
                    throw new IOException("Error occurred while copying file to response output stream.", ex);
                }
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found");
            }
        }
    }

    @PutMapping("/user/update/{userId}")
    public ResponseEntity<String> updateUserDetails(@PathVariable Long userId, @RequestBody User updatedUser) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        if (userService.isCurrentUserLogged(userId)) {
            User savedUser = userService.updateUserDetails(updatedUser);
            if (savedUser != null) {
                return ResponseEntity.ok("User details updated successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this user's details.");
        }
    }
}
