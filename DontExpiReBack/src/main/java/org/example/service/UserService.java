package org.example.service;

import lombok.AllArgsConstructor;
import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.dto.RegisterRequest;
import org.example.enums.UserType;
import org.example.error.*;
import org.example.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final PasswordEncoder passwordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public void register(RegisterRequest request) {

        if(userRepository.existsByUserEMail(request.getUserEMail())){
            throw new UserExistsException("User exists with this E-mail!");
        }

        if(request.getUserName().length() <= 5){
            throw new InvalidUserNameLength("Name must have at least 5 characters!");
        }

        if(!request.getUserEMail().contains("@gmail") || !request.getUserEMail().contains("@")){
            throw new InvadlidEmailForm("The E-mail form is not valid.");
        }

        if(request.getUserPassword().length() < 8){
            throw new InvalidPasswordLength("Password must have at least 8 characters!");
        }

        User user = new User();

        user.setUserName(request.getUserName());
        user.setUserEMail(request.getUserEMail());
        user.setUserType(UserType.USER);


        user.setUserPassword(
                bCryptPasswordEncoder.encode(request.getUserPassword())
        );

        userRepository.save(user);
    }

    public void login(LoginRequest request){
        String userEmail = request.getUserEMail();
        User user;

        user = userRepository.findByUserEMail(userEmail).orElseThrow(()-> new InvalidCredentialsException("Wrong E-mail or password"));
        //lambda function tells us that exception are only made when necessary

        if (!passwordEncoder.matches(request.getUserPassword(), user.getUserPassword())) {
            throw new InvalidCredentialsException("Wrong E-mail or password");
        }

    }

    /*public String verify(LoginRequest loginRequest){

        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUserEMail(),loginRequest.getUserPassword()));

        if(!authentication.isAuthenticated()){
            throw new InvalidAuthenticationJWT("Authentication failed!");
        }

        return jwtService.generateToken(loginRequest.getUserEMail());
    }

     */

    public LoginResponse verify(LoginRequest loginRequest) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUserEMail(),
                                loginRequest.getUserPassword()
                        )
                );

        if (!authentication.isAuthenticated()) {
            throw new InvalidAuthenticationJWT("Authentication failed!");
        }

        User user = userRepository.findByUserEMail(loginRequest.getUserEMail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(
                user.getUserEMail(),
                user.getUserType().name()
        );

        return new LoginResponse(token, user.getUserType().name());
    }


    public void removeUser(User user){
        userRepository.delete(user);
    }
}
