package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.RegisterRequest;
import org.example.model.User;
import org.springframework.web.bind.annotation.*;
import org.example.service.UserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user-controller")
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
    public String register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return "User registered successfully";
    }







}
