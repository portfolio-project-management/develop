package com.portfolio.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.CalendarDTO;
import com.portfolio.entity.Calendar;
import com.portfolio.entity.CalendarMember;
import com.portfolio.entity.Room;
import com.portfolio.entity.RoomMember;
import com.portfolio.entity.User;
import com.portfolio.repository.CalendarMemberRepository;
import com.portfolio.repository.CalendarRepository;
import com.portfolio.repository.UserRepository;

@Service
public class CalendarService {
	
	@Autowired
	CalendarRepository calendarRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	CalendarMemberRepository calendarMemberRepository; 
	
	// 캘린더 리스트
	public List<CalendarDTO> getCalendarList(String userId){
		return calendarRepository.findDistinctByCalendarMembersUserUserId(userId)
				.stream()
				.map((calendar) -> new CalendarDTO(
						calendar.getId(),
						calendar.getName(),
						calendar.getUser().getUserId()
					))
				.collect(Collectors.toList());
	}
	
	
	//캘린더 추가
	public String createCalendar(String userId, String calendarName) {
		User user = userRepository.findByUserId(userId);
		
		if(user != null) {
			Calendar calendar = new Calendar();
			
			
			calendar.setName(calendarName);
			calendar.setUser(user);
			calendar.setInvitationCode(UUID.randomUUID().toString());
			
			CalendarMember member = new CalendarMember();
			
			member.setCalendar(calendar);
			member.setUser(user);
			
			try {
				
				calendarRepository.save(calendar);
				calendarMemberRepository.save(member);
				
			}catch(Exception e) {
				
				return "생성오류";
				
			}
				
			
			return "생성완료";
		}else {
			return "유저정보오류";
		}
	}
	
	//캘린더 입장
	public String joinCalendar (String userId, String calendarCode) {
		Calendar calendar = calendarRepository.findByInvitationCode(calendarCode);
		
		//해당 초대코드에 맞는 캘린더가 있는지 확인
		if(calendar != null ) {
			
			//유저 정보 가져오기
			User user = userRepository.findByUserId(userId);
			
			//정상적인 유저라면
			if(user != null) {
				
				CalendarMember alreadyMember = calendarMemberRepository.findByCalendarAndUser(calendar, user);
				
				// 이미 들어가있는 유저인지 확인
				if(alreadyMember == null) { 
					CalendarMember member = new CalendarMember();
					member.setCalendar(calendar);
					member.setUser(user);
					
					calendarMemberRepository.save(member);
					
					return "입장완료";
				}else {
					return "이미입장된방";
				}
			}
			
			return "유저정보오류";
		}else { //맞는 초대 코드가 아닐 때
			return "초대코드오류";
		}
	}
}
