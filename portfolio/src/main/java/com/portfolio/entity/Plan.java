package com.portfolio.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Plan {
	
	@Id
	private String id;
	
	private String name;
	
	private String content;
	
	private String color;
	
	private Timestamp startTime;
	
	private Timestamp endTime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Calendar calendar;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
}
