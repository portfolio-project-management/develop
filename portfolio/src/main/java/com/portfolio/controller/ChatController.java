package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.RoomDTO;
import com.portfolio.entity.Room;
import com.portfolio.service.ChatService;

@RestController
@RequestMapping("/pub/rooms")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class ChatController {
	@Autowired
	ChatService chatService;
	
	public ChatController(ChatService chatService) {
		this.chatService = chatService;
	}
	
	// 채팅방 목록 출력
	@GetMapping("/")
	public List<RoomDTO> getRooms() {
		return chatService.getAllRooms();
	}
	
	// 채팅방 생성 및 사용자 추가
	@PostMapping("/create")
	public Room createRoom(@RequestBody RoomDTO roomDTO) {
		return chatService.createChatRoom(roomDTO.getRoomName(), roomDTO.getParticipants());
	}
}
