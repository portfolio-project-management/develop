package com.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
// 포트폴리오 리스트 출력할것
public class PortfolioBoardListDTO {
	private int id;
	private String title;
	private String userId;
	private String mainFile;
	
	public PortfolioBoardListDTO(int id,String title, String userId, String mainFile) {
		super();
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.mainFile = mainFile;
	}

	public PortfolioBoardListDTO() {
		super();
	}
	
}
