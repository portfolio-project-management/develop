package com.portfolio.dto;

import java.util.HashSet;
import java.util.Set;

import com.portfolio.entity.Room;

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
    private Set<Room> rooms = new HashSet<>();

    public UserDTO(String userId, String passWord) {
        this.userId = userId;
        this.passWord = passWord;
    }


    public UserDTO() {
        super();
    }
}