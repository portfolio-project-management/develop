package com.portfolio.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class UserProposal {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column
	private String title;
	
	@Column
	private int expectedTeamMembers;
	
	@Column
	private String expectedTechnologyStack;
	
	@Column
	private String plan;
	
	@Column
	private String content;
	
	@Column(updatable = false)
	private LocalDateTime createdTime;
	
	@Column
	private LocalDateTime expiredTime;
	
	@ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
