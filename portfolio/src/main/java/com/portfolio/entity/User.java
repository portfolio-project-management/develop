package com.portfolio.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class User {

    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String passWord; 

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;
    
    // 채팅방 참가 관계 설정
    @ManyToMany(mappedBy = "participants")
    private Set<Room> rooms = new HashSet<>();
}



