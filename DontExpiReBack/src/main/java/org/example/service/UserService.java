package org.example.service;

import lombok.AllArgsConstructor;
import org.example.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user){

        user.setUserPassword(bCryptPasswordEncoder.encode(user.getUserPassword()));
        return userRepository.save(user);
    }

    public void removeUser(User user){
        userRepository.delete(user);
    }
}
