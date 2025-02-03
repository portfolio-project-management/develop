package com.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.entity.Calendar;
import com.portfolio.entity.CalendarMember;
import com.portfolio.entity.User;

public interface CalendarMemberRepository extends JpaRepository<CalendarMember, Integer>{

	public CalendarMember findByCalendarAndUser(Calendar calendar, User user);
}
