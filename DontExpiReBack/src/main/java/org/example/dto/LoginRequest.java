package org.example.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.enums.UserType;

@Getter
@Setter
public class LoginRequest {

    private String userEMail;
    private String userPassword;
    private UserType userType;

}
