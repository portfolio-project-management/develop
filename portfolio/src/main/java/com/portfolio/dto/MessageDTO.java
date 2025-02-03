package com.portfolio.dto;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageDTO {
	//  시간이 역직렬화가 안돼서 String으로 변환
	private int id;
	private int roomId;
	private String userId;
	private String content;
	private Timestamp sendTime;
	
	public MessageDTO() {
		super();
	}
	
	// 메시지 출력
	public MessageDTO(String userId, String content, Timestamp sendTime) {
		super();
		this.userId = userId;
		this.content = content;
		this.sendTime = sendTime;
	}
	
}
