package com.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.UserResumeDTO;
import com.portfolio.entity.UserResume;
import com.portfolio.service.UserResumeService;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class UserResumeController {
	
	@Autowired
    private UserResumeService userResumeService;

    @GetMapping("/get")
    public UserResumeDTO userResume(@RequestParam("userId") String userId) {
        return userResumeService.getResume(userId);
    }
    
    @PostMapping("/edit")
	public String resumeAdd(@RequestBody UserResumeDTO userResumeDTO) {
    	System.out.println(userResumeDTO);
		return userResumeService.resumeAdd(userResumeDTO);
    }
    
	@PostMapping("/delete")
	public void deleteResume(@RequestBody UserResumeDTO userResumeDTO) {
		 userResumeService.deleteResume(userResumeDTO);
	}
    
}
