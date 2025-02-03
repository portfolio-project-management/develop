package com.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoomMemberDTO {
	private int id;
	private String userId;
	public RoomMemberDTO() {
		super();
	}
	public RoomMemberDTO(String userId) {
		super();
		this.userId = userId;
	}
	
	
	
}
