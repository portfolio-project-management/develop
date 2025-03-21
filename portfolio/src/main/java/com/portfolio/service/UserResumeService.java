package com.portfolio.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.UserResumeDTO;
import com.portfolio.entity.User;
import com.portfolio.entity.UserResume;
import com.portfolio.repository.UserRepository;
import com.portfolio.repository.UserResumeRepository;

@Service
public class UserResumeService {

	@Autowired
	private UserResumeRepository userResumeRepository;
	
	@Autowired
	UserRepository userRepository;
	
	//이력서 보기
	public UserResumeDTO getResume(String userId) {
		
		User user = userRepository.findByUserId(userId);
		
		List<UserResume> userResumes = userResumeRepository.findByUserId(user.getId());
		
		//이력서가 1개라도 존재하면
		if(userResumes.size() > 0) {
			
			UserResume userResume = userResumes.get(0);
			
			return new UserResumeDTO(
				userResume.getId(),
				userResume.getTechnology(),
				userResume.getCareer(),
				userResume.getQualifications(),
				userResume.getActivities(),
				userResume.getJobSelectionReason(),
				userResume.getGrowProcess(),
				userResume.getPersonalityProsCons(),
				userResume.getJobRelatedExperience(),
				user.getUserId(),
				user.getEmail(),
				user.getPhone(),
				user.getAddress(),
				user.getName()
			);
		}
		
		return new UserResumeDTO(
					user.getUserId(),
					user.getEmail(),
					user.getPhone(),
					user.getAddress(),
					user.getName()
				);
    }
	
	//이력서가 없으면 추가하기
	public String resumeAdd(UserResumeDTO userResumeDTO) {
	    	
			User user = userRepository.findByUserId(userResumeDTO.getUserId());
			user.setName(userResumeDTO.getName());
			user.setAddress(userResumeDTO.getAddress());
			user.setEmail(userResumeDTO.getEmail());
			user.setPhone(userResumeDTO.getPhone());
			
	    	UserResume userResume = new UserResume();
	    	userResume.setUser(user);
	    	
	    	if(userResumeDTO.getId() != null) {
	    		userResume.setId(userResumeDTO.getId());
	    	}
	    	
	    	userResume.setActivities(userResumeDTO.getActivities());
	    	userResume.setCareer(userResumeDTO.getCareer());
	    	userResume.setGrowProcess(userResumeDTO.getGrowProcess());
	    	userResume.setJobRelatedExperience(userResumeDTO.getJobRelatedExperience());
	    	userResume.setJobSelectionReason(userResumeDTO.getJobSelectionReason());
	    	userResume.setPersonalityProsCons(userResumeDTO.getPersonalityProsCons());
	    	userResume.setQualifications(userResumeDTO.getQualifications());
	    	userResume.setTechnology(userResumeDTO.getTechnology());
	    	
	    	
	    	userRepository.save(user);
	    	
	    	return userResumeRepository.save(userResume) == null? "실패" : "성공";
	    }
	
	public void deleteResume(UserResumeDTO userResumeDTO) {
	           userResumeRepository.deleteById(userResumeDTO.getId()); 
	}
}
