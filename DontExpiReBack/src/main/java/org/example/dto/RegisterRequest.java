package org.example.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.enums.UserGender;
import org.example.enums.UserType;

@Getter
@Setter
public class RegisterRequest {

    private String userName;
    private String userEMail;
    private String userPassword;
    private UserType userType;
}
