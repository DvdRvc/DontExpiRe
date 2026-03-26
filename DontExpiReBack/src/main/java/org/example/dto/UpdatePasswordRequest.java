package org.example.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {

    private String token;
    private String oldPassword;
    private String newPassword;
    private String newPasswordAgain;
}
