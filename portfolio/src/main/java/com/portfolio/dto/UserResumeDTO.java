package com.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResumeDTO {

	private Long id;
	private String userId;
	private String technology;
	private String career;
	private String qualifications;
	private String activities;
	private String jobSelectionReason;
	private String growProcess;
	private String personalityProsCons;
	private String jobRelatedExperience;
	private String email;
	private String phone;
	private String address;
	private String name;
	
	public UserResumeDTO() {
	
	}

	public UserResumeDTO(Long id, String technology, String career, String qualifications,
			String activities, String jobSelectionReason, String growProcess, String personalityProsCons,
			String jobRelatedExperience, String userId, String email, String phone, String address, String name) {
		this.id = id;
		this.technology = technology;
		this.career = career;
		this.qualifications = qualifications;
		this.activities = activities;
		this.jobSelectionReason = jobSelectionReason;
		this.growProcess = growProcess;
		this.personalityProsCons = personalityProsCons;
		this.jobRelatedExperience = jobRelatedExperience;
		this.userId = userId;
		this.email=email;
		this.phone = phone;
		this.address = address;
		this.name = name;
	}

	public UserResumeDTO(String userId, String email, String phone, String address, String name) {
		this.userId = userId;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.name = name;
	}

	
}
