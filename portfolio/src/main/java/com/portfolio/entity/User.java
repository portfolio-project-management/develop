package com.portfolio.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	private List<PortfolioBoard> portfolioBoards;
	
}
