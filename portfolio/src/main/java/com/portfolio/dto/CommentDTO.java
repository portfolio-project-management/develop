package com.portfolio.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentDTO {
	private int id;
	private String userId;
	private int portfolioBoardId;
	private String content;
	private LocalDateTime createTime;
	
	public CommentDTO(int id, String userId, String content, LocalDateTime createTime) {
		super();
		this.id = id;
		this.userId = userId;
		this.content = content;
		this.createTime = createTime;
	}
	
	public CommentDTO() {
		super();
	}
	
}
