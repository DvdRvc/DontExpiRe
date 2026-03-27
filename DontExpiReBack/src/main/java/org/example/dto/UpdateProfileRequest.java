package org.example.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateProfileRequest {

    private String userName;
    private String userGender;
}
