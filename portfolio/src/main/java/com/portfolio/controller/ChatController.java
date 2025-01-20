package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.RoomDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.service.ChatService;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ChatController {
	 @Autowired
	    private ChatService chatService;

	    // 채팅방에 대한 사용자 정보 조회
	    @GetMapping("/user")
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
	    @GetMapping("/user/{userId}/rooms")
	    public ResponseEntity<List<RoomDTO>> getUserRooms(@PathVariable("userId") String userId) {
	        List<RoomDTO> rooms = chatService.getRoomsByUserId(userId);
	        return ResponseEntity.ok(rooms);
	    }
}
