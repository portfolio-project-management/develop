package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.entity.UserProposal;

public interface UserProposalRepository extends JpaRepository<UserProposal, Long> {
	
	public List<UserProposal> findByUserId(String userId);
}
