package org.example.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.enums.UserGender;

@Getter
@Setter
public class RegisterRequest {

    private String userName;
    private String userEMail;
    private String userPassword;
}
