package com.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {

    private String id;
    private String name;
    private String email;
    private String userId;
    private String passWord;
    private String phone;
    private String address;

    public UserDTO(String userId, String passWord) {
        this.userId = userId;
        this.passWord = passWord;
    }


    public UserDTO() {
        super();
    }
}