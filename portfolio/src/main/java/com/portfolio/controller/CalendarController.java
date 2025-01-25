package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.CalendarDTO;
import com.portfolio.service.CalendarService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/calendar")
public class CalendarController {

	@Autowired
	CalendarService calendarService;
	
	// 캘린더 리스트
	@GetMapping("/getlist")
	public List<CalendarDTO> getCalendarList(@RequestParam("userId") String userId){
		System.out.println(calendarService.getCalendarList(userId).size() + "adhjaiwdhiawhdoawidhoiawd");
		return calendarService.getCalendarList(userId);
	}
	
	// 캘린더 생성
	@GetMapping("/create")
	public String createCalenedar(@RequestParam("userId") String userId, @RequestParam("calendarName") String calendarName){
		return calendarService.createCalendar(userId, calendarName);
	}
	
	// 캘린더 입장
	@GetMapping("/join")
	public String joinCalendar(@RequestParam("userId") String userId, @RequestParam("calendarCode") String calendarCode) {
		return calendarService.joinCalendar(userId, calendarCode);
	}
}
