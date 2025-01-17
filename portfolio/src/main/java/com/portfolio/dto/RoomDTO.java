package com.portfolio.dto;

import java.util.List;

import com.portfolio.entity.User;

public class RoomDTO {
	private Long id;
	private String roomName;
	private List<UserDTO> participants;
	
	public RoomDTO(Long id, String roomName, List<UserDTO> participants) {
		this.id = id;
		this.roomName = roomName;
		this.participants = participants;
	}
	
	public Long getID() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public List<UserDTO> getParticipants() {
		return participants;
	}

	public void setParticipants(List<UserDTO> participants) {
		this.participants = participants;
	}
}
