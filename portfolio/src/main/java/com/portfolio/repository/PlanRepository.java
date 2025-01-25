package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.entity.Plan;

public interface PlanRepository extends JpaRepository<Plan, String> {
	
	public List<Plan> findByCalendarId(int calendarId);
}
