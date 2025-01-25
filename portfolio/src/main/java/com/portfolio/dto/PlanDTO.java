package com.portfolio.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class PlanDTO {
	private String id;
	private String name;
	private String content;
	private String color;
	private Timestamp startTime;
	private Timestamp endTime;
	private int calendarId;
	private String doing;
	
	public PlanDTO(String id, String name,String content, String color, Timestamp startTime, Timestamp endTime, int calendarId) {
		super();
		this.id = id;
		this.name = name;
		this.content = content;
		this.color = color;
		this.startTime = startTime;
		this.endTime = endTime;
		this.calendarId = calendarId;
	}
	
	public PlanDTO() {
		super();
	}
	
	
}
