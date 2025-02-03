package com.portfolio.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.portfolio.entity.PortfolioBoard;
import com.portfolio.entity.User;

public interface PortfolioBoardRepository extends JpaRepository<PortfolioBoard,Integer> {
	
	public List<PortfolioBoard> findByUser(User user);
	
	@Query("select p from PortfolioBoard p order by p.id DESC")
	public Page<PortfolioBoard> findBySomePageOrderById(Pageable pageable);
}
