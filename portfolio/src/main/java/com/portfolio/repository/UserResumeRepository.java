package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.entity.UserResume;

public interface UserResumeRepository extends JpaRepository<UserResume, Long> {

	public List<UserResume> findByUserId(String userId);
}
