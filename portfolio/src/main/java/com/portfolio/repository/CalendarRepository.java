package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.entity.Calendar;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
	
	public List<Calendar> findDistinctByCalendarMembersUserUserId(String userId);
	
	public Calendar findByInvitationCode(String invitationCode);
	
	
}
