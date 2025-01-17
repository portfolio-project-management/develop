//package com.portfolio.entity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToOne;
//import lombok.Getter;
//import lombok.Setter;
//import lombok.ToString;
//
//@Getter
//@Setter
//@ToString
//@Entity
//public class Img {
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private int id;
//	
//	@Column(nullable = false)
//	private String path;
//	
//	@Column(nullable = false)
//	private String title;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	private User user;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	private PortfolioBoard portfolioBoard;
//}
//
