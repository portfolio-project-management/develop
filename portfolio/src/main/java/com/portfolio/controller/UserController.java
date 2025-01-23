package com.portfolio.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.UserDTO;
import com.portfolio.service.UserService;
import com.portfolio.session.SessionManager;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	SessionManager sessionManager;
	
	// 로그인
	@PostMapping("/signin")
	public String userLogin(@RequestBody UserDTO userDTO, HttpServletResponse response) {
		String result = userService.userLogin(userDTO);
		
		if(result.equals("로그인")) {
			sessionManager.createSession(userDTO.getUserId(), response);
		}
		
		return userService.userLogin(userDTO);	
	}
	
	// 쿠키 / 세션 확인
	@PostMapping("/checkcookie")
	public String checkCookie(HttpServletRequest request) {
		return sessionManager.findCookie(request.getCookies());
	}

	// 카카오 로그인 ( 요청 받은 후 리다이렉션 )
	@GetMapping("/redirect/kakao")
	public void kakaoSignin(HttpServletResponse response) throws IOException {
	    // 카카오 인증 페이지로 리디렉션
	    String clientId = "4aebca07e15941a5c84240dae043ddea"; // 카카오 REST API 키
	    String redirectUri = "http://localhost:8080/user/signin/kakao"; // 리디렉션 URI	
	    String kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8);
	    
	    // 카카오 인증 페이지로 리디렉션
	    response.sendRedirect(kakaoAuthUrl);
	}
	
	// 카카오 로그인
	@RequestMapping("/signin/kakao")
	public void kakaoSignin(@RequestParam("code") String code,HttpServletResponse response) throws IOException {
		response.sendRedirect("http://localhost:3000/signup/hash="+userService.sendRequest(code));
	}
	
	// 카카오 로그인 정상확인
	@GetMapping("/checkemail")
	public String checkEmail(@RequestParam("hash") String hash, HttpServletResponse response) {
		return userService.checkEmail(hash, response);
	}
	
	// 로그아웃
	@PostMapping("/logout")
	public void logout(HttpServletRequest request) {
		sessionManager.deleteCookie(request.getCookies());
	}
	
	// 회원가입
	@PostMapping("/signup")
	public String userSignup(@RequestBody UserDTO userDTO) {
		return userService.userSignup(userDTO);
	}
	
	// OTP 받기
	@GetMapping("/sendotp")
	public String sendOTP() {
		return userService.sendOTP();
	}
}
