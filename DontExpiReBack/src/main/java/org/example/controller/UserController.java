package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.*;
import org.example.error.InvadlidEmailForm;
import org.example.error.InvalidPasswordLength;
import org.example.error.InvalidUserNameLength;
import org.example.error.UserExistsException;
import org.example.model.User;
import org.springframework.http.HttpStatus;
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
        try {
            userService.register(request);
            return ResponseEntity.ok("Registration successful");

        } catch (UserExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        } catch (InvadlidEmailForm e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (InvalidPasswordLength e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (InvalidUserNameLength e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /*

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        //userService.login(request);
        String token = userService.verify(request);
        System.out.println("JWT TOKEN:" + token);
        return ResponseEntity.ok(token);
    }

     */

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = userService.verify(request);
        System.out.println("JWT TOKEN: " + response.getToken());
        return ResponseEntity.ok(response);
    }


    @PostMapping("/change-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest){
        userService.updatePassword(updatePasswordRequest);
        return ResponseEntity.ok("Password changed");
    }

    @PostMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateProfileRequest updateProfileRequest,  @RequestHeader("Authorization") String authHeader){
        userService.updateProfile(updateProfileRequest,authHeader);
        return ResponseEntity.ok("Profile information changed");
    }







}
