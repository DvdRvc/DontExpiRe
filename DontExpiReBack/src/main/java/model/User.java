package model;

import enums.UserGender;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class User {

    int userId;
    String userName;
    String userPassword;
    String userEMail;
    UserGender userGender;


}
