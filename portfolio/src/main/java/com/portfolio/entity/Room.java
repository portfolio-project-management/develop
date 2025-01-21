package com.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import com.portfolio.entity.User;

@Entity
@Getter
@Setter
@ToString
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long roomId;
	
    @Column(nullable = false)
    private String roomName;
    
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;
}
