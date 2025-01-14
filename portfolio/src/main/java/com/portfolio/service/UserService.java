package com.portfolio.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.dto.UserDTO;
import com.portfolio.entity.User;
import com.portfolio.repository.UserRepository;

@Service
public class UserService {
	
	HashMap<String,String> login = new HashMap();
	
	@Autowired
	UserRepository userRepository; 
	
	public String userLogin(UserDTO userDTO) {
		User user = new User();
		user.setUserId(userDTO.getUserId());
		user.setPassWord(userDTO.getPassWord());
		
		return userRepository.findByUserInfo(user.getUserId(), user.getPassWord())? "로그인" : "로그인실패"; 
	}
	
	public String sendRequest(String code) {
		RestTemplate restTemplate = new RestTemplate();
		
		String url = "https://kauth.kakao.com/oauth/token";
		
     // MultiValueMap을 이용한 URL 인코딩된 본문 데이터 생성
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "authorization_code");
        map.add("client_id", "4aebca07e15941a5c84240dae043ddea");
        map.add("code", code);
        
        
     // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);
        
        // 요청 본문과 헤더를 포함한 HttpEntity 객체 생성
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        // POST 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(
            url, 
            HttpMethod.POST, 
            entity, 
            String.class
        );
        
     // 응답 출력
        System.out.println("Response: " + response.getBody());
        return getUserInfo(extractAccessToken(response.getBody())); // 회원 email or 비회원 여부
	}
	
	// 응답에서 access_token 추출하는 메서드
	private String extractAccessToken(String responseBody) {
	    // JSON 응답에서 access_token 추출 (예시로 Jackson 사용)
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(responseBody);
	        return jsonNode.get("access_token").asText();
	    } catch (IOException e) {
	        e.printStackTrace();
	        return null;
	    }
	}

	
	// 카카오 사용자 정보 요청
    private String getUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        // 카카오 사용자 정보 API URL
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);  // access_token을 Authorization 헤더에 설정

        // 헤더를 포함한 HttpEntity 객체 생성
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            // 사용자 정보 요청
            ResponseEntity<String> response = restTemplate.exchange(
                userInfoUrl, 
                HttpMethod.GET, 
                entity, 
                String.class
            );

            
            String userEmail = extractEmailFromUserInfo(response.getBody());
            //회원 유무 확인
            List<User> users = userRepository.findByEmail(userEmail);
            
            UUID uuid = UUID.randomUUID(); // 랜덤 인증값 생성
            
            if(users.size() != 0) {// 회원이면
            	login.put(uuid.toString(),users.get(0).getEmail());
            	return uuid.toString();
            }else { //비회원
            	login.put(uuid.toString(),"비회원");
            	return uuid.toString();
            }
            

        } catch (HttpClientErrorException e) {
            // 오류 처리
            System.out.println("Error response: " + e.getResponseBodyAsString());
        }
        
        return "오류";
    }
    
    // 사용자 정보에서 이메일 추출
    private static String extractEmailFromUserInfo(String userInfoResponse) {
        try {
            // Jackson ObjectMapper로 JSON을 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(userInfoResponse);

            // "kakao_account" 필드에서 "email" 값을 추출
            JsonNode kakaoAccountNode = jsonNode.get("kakao_account");
            if (kakaoAccountNode != null && kakaoAccountNode.has("email")) {
                return kakaoAccountNode.get("email").asText();
            } else {
                // 이메일이 없을 경우 처리
                return "No email found";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
