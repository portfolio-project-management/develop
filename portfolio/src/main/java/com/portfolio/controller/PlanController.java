package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.PlanDTO;
import com.portfolio.service.PlanService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/plan")
public class PlanController {

	
	@Autowired
	PlanService planService;
	
	@GetMapping("/get")
	public List<PlanDTO> getPlans(@RequestParam("calendarId") int calendarId){
		return planService.getPlans(calendarId);
	}
	
}
