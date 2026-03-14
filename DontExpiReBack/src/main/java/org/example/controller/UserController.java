package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.LoginRequest;
import org.example.dto.RegisterRequest;
import org.example.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.service.UserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user-controller")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private UserService userService;

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/remove-user")
    public void removeUser(User user){
        userService.removeUser(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        //userService.login(request);
        String token = userService.verify(request);
        return ResponseEntity.ok(token);
    }







}
