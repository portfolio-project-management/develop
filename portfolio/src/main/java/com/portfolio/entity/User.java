package com.portfolio.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	
	@Column(nullable = false, unique=true)
	private String email;
	
	@Column(nullable = false, unique=true)
	private String userId;
	
	@Column(nullable = false)
	private String passWord; 
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false)
	private String address;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<Good> goods;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<Comment> comments;
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy="user")
    private PortfolioBoard profileBoard;
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy="user")
	private UserResume userResume;
	
	//----------- 웹 소켓 ( 채팅 )
	
	@OneToMany(mappedBy="user")
	private List<Room> rooms;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<Message> messages;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<RoomMember> roomMembers;
	
	
	//------------ 웹 소켓 ( 캘린더 )
	
	@OneToMany(mappedBy="user")
	private List<Calendar> calendars;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<CalendarMember> calendarMembers;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<Plan> plans;
}
