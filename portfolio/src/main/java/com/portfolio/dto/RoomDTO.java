package com.portfolio.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoomDTO {
	private int id;
	private String name;
	private String invitationCode;
	private String createUserId;
	private List<MessageDTO> messages;
	private List<PlanDTO> plans;
	private List<MemberDTO> members;
	
	public RoomDTO() {
		super();
	}

	//메인에 방 리스트 띄울 때
	public RoomDTO(int id, String name, String invitationCode, String createUserId) {
		super();
		this.id = id;
		this.name = name;
		this.invitationCode = invitationCode;
		this.createUserId = createUserId;
	}

	//채팅 ( 캘린더와 생성자가 곂치는 판정 때문에 name이랑 id 위치를 바꿈 )
	public RoomDTO(String name, int id, String invitationCode, String createUserId, List<MessageDTO> messages,
			List<MemberDTO> members) {
		super();
		this.id = id;
		this.name = name;
		this.invitationCode = invitationCode;
		this.createUserId = createUserId;
		this.messages = messages;
		this.members = members;
	}

	//캘린더
	public RoomDTO(int id, String name, String invitationCode, String createUserId, List<PlanDTO> plans,
			List<MemberDTO> members) {
		super();
		this.id = id;
		this.name = name;
		this.invitationCode = invitationCode;
		this.createUserId = createUserId;
		this.plans = plans;
		this.members = members;
	}

}

