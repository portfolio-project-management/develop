package com.portfolio.dto;

import java.util.List;

import com.portfolio.entity.Good;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PortfolioBoardDTO {
	private int id;
	private String title;
	private int view;
	private String userId;
	private List<String> path;
	private int goods;
	
	public PortfolioBoardDTO(int id, String title, int view, String userId, List<String> path, int goods) {
		super();
		this.id = id;
		this.title = title;
		this.view = view;
		this.userId = userId;
		this.path = path;
		this.goods = goods;
	}
	
	public PortfolioBoardDTO() {
		super();
	}
	
	
}
