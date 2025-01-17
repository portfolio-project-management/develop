package com.portfolio.entity;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String roomName;
	
	@ManyToMany
	@JoinTable(
		name = "room_user",
		joinColumns = @JoinColumn(name = "room_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private Set<User> participants = new HashSet<>();
	
	// 메시지 리스트
	@OneToMany(mappedBy = "room")
	private List<Message> messages;
}
