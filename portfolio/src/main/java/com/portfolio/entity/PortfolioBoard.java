package com.portfolio.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class PortfolioBoard {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(nullable = false)
	private String title;
	
	//이미지 경로 모음
	private String path;
	
	private int view;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="portfolioBoard")
	private List<Good> goods;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="portfolioBoard")
	private List<Comment> comments;
}
