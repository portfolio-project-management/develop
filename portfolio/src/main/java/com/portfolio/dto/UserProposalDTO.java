package com.portfolio.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserProposalDTO {

	private Long id;
	private String userId;
	private String title;
	private int expectedTeamMembers;
	private String expectedTechnologyStack;
	private String plan;
	private String content;
	private LocalDateTime createdTime;
	private LocalDateTime expiredTime;
	
	public UserProposalDTO() {

	}

	public UserProposalDTO(Long id, String userId, String title, int expectedTeamMembers,
			String expectedTechnologyStack, String plan, String content, LocalDateTime createdTime,
			LocalDateTime expiredTime) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.expectedTeamMembers = expectedTeamMembers;
		this.expectedTechnologyStack = expectedTechnologyStack;
		this.plan = plan;
		this.content = content;
		this.createdTime = createdTime;
		this.expiredTime = expiredTime;
	}

}
