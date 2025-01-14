package com.portfolio.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.UserDTO;
import com.portfolio.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/signin")
	public String userLogin(@RequestBody UserDTO userDTO) {
		return userService.userLogin(userDTO);
	}
	
	@RequestMapping("/signin/kakao")
	public void kakaoSignin(@RequestParam("code") String code,HttpServletResponse response) throws IOException {
		response.sendRedirect("http://localhost:3000?Check="+userService.sendRequest(code));
	}
}
