package com.portfolio.dto;

import java.util.List;

import com.portfolio.entity.CalendarMember;
import com.portfolio.entity.Plan;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CalendarDTO {
	private int id;
	private String name;
	private String invitationCode;
	private String createUser;
	private List<CalendarMember> members;
	private List<Plan> plans;
	
	public CalendarDTO() {
		super();
	}

	// 캘린더 리스트 띄울때
	public CalendarDTO(int id, String name, String createUser) {
		super();
		this.id = id;
		this.name = name;
		this.createUser = createUser;
	}

	
	// 내부
	public CalendarDTO(int id, String name, String invitationCode, String createUser, List<CalendarMember> members,
			List<Plan> plans) {
		super();
		this.id = id;
		this.name = name;
		this.invitationCode = invitationCode;
		this.createUser = createUser;
		this.members = members;
		this.plans = plans;
	}

}