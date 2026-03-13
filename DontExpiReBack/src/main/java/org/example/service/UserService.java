package org.example.service;

import lombok.AllArgsConstructor;
import org.example.dto.LoginRequest;
import org.example.dto.RegisterRequest;
import org.example.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
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
            throw new RuntimeException("User exists!");
        }

        User user = new User();

        user.setUserName(request.getUserName());
        user.setUserEMail(request.getUserEMail());
        user.setUserGender(request.getUserGender());

        user.setUserPassword(
                bCryptPasswordEncoder.encode(request.getUserPassword())
        );

        userRepository.save(user);
    }

    public String login(LoginRequest request){
        String userEmail = request.getUserEMail();
        User user;

        user = userRepository.findByUserEMail(userEmail).orElseThrow(()-> new RuntimeException("User doesn't exist"));
        //lambda function tells us that exception are only made when necessary

        if (!passwordEncoder.matches(request.getUserPassword(), user.getUserPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return "Login sucsessful";
    }


    public void removeUser(User user){
        userRepository.delete(user);
    }
}
