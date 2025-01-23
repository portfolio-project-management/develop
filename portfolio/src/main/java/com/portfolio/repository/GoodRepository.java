package com.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.portfolio.entity.Good;

import jakarta.transaction.Transactional;

public interface GoodRepository extends JpaRepository<Good, Integer>{
	
	@Query("select count(g) from Good g where g.user.userId = ?1 and g.portfolioBoard.id = ?2 ")
	public int findByPortfolioBoardIdUserId(String userId, int portfolioBoardId);
	
	@Modifying
	@Transactional
	@Query("delete from Good g where g.user.userId = ?1 and g.portfolioBoard.id = ?2 ")
	public void deleteByPortfolioBoardIdUserId(String userId, int portfolioBoardId);
}
