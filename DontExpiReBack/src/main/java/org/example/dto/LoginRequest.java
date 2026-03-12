package org.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String userEMail;
    private String userPassword;

}
