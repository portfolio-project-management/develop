package com.portfolio.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.PlanDTO;
import com.portfolio.entity.Calendar;
import com.portfolio.entity.Plan;
import com.portfolio.repository.CalendarRepository;
import com.portfolio.repository.PlanRepository;

@Service
public class PlanService {

	@Autowired
	PlanRepository planRepository;
	
	@Autowired
	CalendarRepository calendarRepository;
	
	// 해당 캘린더에서 모든 계획 가져오기
	public List<PlanDTO> getPlans(int calendarId){
		return planRepository.findByCalendarId(calendarId)
				.stream()
				.map((plan) -> new PlanDTO(
						plan.getId(),
						plan.getName(),
						plan.getContent(),
						plan.getColor(),
						plan.getStartTime(),
						plan.getEndTime(),
						plan.getCalendar().getId()
					))
				.collect(Collectors.toList());
	}
	
	// 캘린더 생성 / 수정
	public boolean changePlan(PlanDTO planDTO){
		
		Plan plan = new Plan(); 
		Optional<Plan> checkPlan = planRepository.findById(planDTO.getId());
		
		if( checkPlan.isEmpty() ) { //생성이라면
			// 캘린더가 존재하는지 확인
	        Optional<Calendar> calendarOptional = calendarRepository.findById(planDTO.getCalendarId());
	        
	        if (calendarOptional.isEmpty()) {
	            // 캘린더가 존재하지 않으면 false 반환
	            return false;
	        }
	        
	        plan.setCalendar(calendarOptional.get());
	        plan.setId(planDTO.getId());
		}else {
			plan = checkPlan.get();
		}
		
		plan.setColor(planDTO.getColor());
		plan.setContent(planDTO.getContent());
		plan.setStartTime(planDTO.getStartTime());
		plan.setEndTime(planDTO.getEndTime());
		plan.setName(planDTO.getName());
		

		try {
			planRepository.save(plan);
		}catch (Exception e) { // 삭제 실패
			e.printStackTrace();
			return false;
		}
		
		return true;

	}
	
	// 캘린더 삭제
	public boolean deletePlan(PlanDTO planDTO){
		try {
			planRepository.deleteById(planDTO.getId());
		}catch (Exception e) { // 삭제 실패
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
}

