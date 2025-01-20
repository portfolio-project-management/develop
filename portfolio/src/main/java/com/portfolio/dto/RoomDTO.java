package com.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoomDTO {
	private long roomId;
	private String roomName;
	
	public RoomDTO(long roomId, String roomName) {
		this.roomId = roomId;
		this.roomName = roomName;
	}
	
	public RoomDTO() {
		super();
	}
}
