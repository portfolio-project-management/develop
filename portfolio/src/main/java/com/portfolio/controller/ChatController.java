package com.portfolio.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.RoomDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.entity.Room;
import com.portfolio.entity.User;
import com.portfolio.service.ChatService;
import com.portfolio.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class ChatController {
	 	
	    UserService userService;
	    ChatService chatService;
	    
	    public ChatController( UserService userService, ChatService chatService) {

	        this.userService = userService;
	        this.chatService = chatService;
	    }
	    
	    
	    // 채팅방에 대한 사용자 정보 조회
	    @GetMapping("/chat/user")
	    public ResponseEntity<UserDTO> getUserInfoForChat(@RequestParam("userId") String userId) {
	        UserDTO userDTO = chatService.getUserInfoForChat(userId);

	        // 사용자가 존재하지 않으면 404 반환
	        if (userDTO == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	        
	        System.out.println(userDTO);
	        // 사용자 정보가 있으면 200 OK와 함께 반환
	        return ResponseEntity.ok(userDTO);
	    }
	    
	    // 사용자가 속한 채팅방 조회
	    @GetMapping("/chat/user/{userId}/rooms")
	    public ResponseEntity<List<RoomDTO>> getUserRooms(@PathVariable("userId") String userId) {
	        List<RoomDTO> rooms = chatService.getRoomsByUserId(userId);
	        return ResponseEntity.ok(rooms);
	    }
	    
	    // 클라이언트에서 /app/chat 요청이 오면 처리
	    @MessageMapping("/sendMessage")
	    @SendTo("/topic/messages")  // 모든 클라이언트에게 메시지 전송
	    public String sendMessage(String message) {
	        return message;  // 메시지를 모든 구독자에게 보냄
	    }
	   
	    
	    // info?t=timestamp 형태의 쿼리 파라미터를 처리
	    @GetMapping("/chat/info")
	    public String getChatInfo(@RequestParam("t") String timestamp) {
	        // timestamp 값을 받아서 로직을 처리
	        System.out.println("Received timestamp: " + timestamp);

	        // 타임스탬프에 맞는 처리 예시
	        String responseMessage = processTimestamp(timestamp);

	        return responseMessage;  // 처리된 결과 반환
	    }
	    
	    private String processTimestamp(String timestamp) {
	        // 예시로 타임스탬프를 처리하는 로직을 추가
	        // 예: 타임스탬프를 기준으로 특정 데이터를 조회하거나 처리
	        return "Processed info for timestamp: " + timestamp;
	    }
	}