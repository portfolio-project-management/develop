package com.portfolio.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String content;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private PortfolioBoard portfolioBoard;
	
}
