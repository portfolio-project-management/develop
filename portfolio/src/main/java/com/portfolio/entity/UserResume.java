package com.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class UserResume {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column
	private String technology;
	
	@Column
	private String career;
	
	@Column
	private String qualifications;
	
	@Column
	private String activities;
	
	@Column
	private String jobSelectionReason;
	
	@Column
	private String growProcess;
	
	@Column
	private String personalityProsCons;
	
	@Column
	private String jobRelatedExperience;
	

    @OneToOne(fetch = FetchType.LAZY)
    private User user;
}
