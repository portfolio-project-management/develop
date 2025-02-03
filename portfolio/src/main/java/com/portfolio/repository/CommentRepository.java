package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment,Integer>{

	public List<Comment> findByPortfolioBoardId(int portfolioBoardId);
}
