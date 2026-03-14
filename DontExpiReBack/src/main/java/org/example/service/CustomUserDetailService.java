package org.example.service;

import org.example.configuration.UserPrincipal;
import lombok.AllArgsConstructor;
import org.example.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.example.repository.UserRepository;

@AllArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    //with this we can fetch users from the repo

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUserEMail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("This user doesn't exist!"));

        return new UserPrincipal(user);
    }
    //It uses E-mail bcs of JWT implementation


}
