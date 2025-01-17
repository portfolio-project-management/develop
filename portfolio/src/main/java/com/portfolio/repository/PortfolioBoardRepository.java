package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.entity.PortfolioBoard;

public interface PortfolioBoardRepository extends JpaRepository<PortfolioBoard,Integer> {
	
	public List<PortfolioBoard> findByUserId(String userId);
}
