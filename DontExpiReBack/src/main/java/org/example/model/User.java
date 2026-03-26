package org.example.model;

import jakarta.persistence.*;
import org.example.enums.UserGender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.example.enums.UserType;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    String userName;
    String userPassword;
    String userEMail;
    @Enumerated(EnumType.STRING)
    UserGender userGender;
    @Enumerated(EnumType.STRING)
    private UserType userType;


}
