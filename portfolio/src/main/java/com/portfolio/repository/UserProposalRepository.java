package com.portfolio.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portfolio.entity.UserProposal;

public interface UserProposalRepository extends JpaRepository<UserProposal, Long> {
	
//	public List<UserProposal> findByUserId(String userId);
	@Query("SELECT p FROM UserProposal p WHERE p.user.userId = ?1 ORDER BY p.id DESC")
    public Page<UserProposal> findByUserId(String userId, Pageable pageable);

    // 전체 제안서를 페이징하여 가져오는 메서드
    @Query("SELECT p FROM UserProposal p ORDER BY p.id DESC")
    public Page<UserProposal> findBySomePageOrderById(Pageable pageable);
    
}
