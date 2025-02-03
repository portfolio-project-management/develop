package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.RoomDTO;
import com.portfolio.service.RoomService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/room")
public class RoomController {
	
	@Autowired
	RoomService roomService;
	
	//방 생성
	@GetMapping("/create")
	public String createRoom(@RequestParam("userId") String userId, @RequestParam("roomName") String roomName) {
		return roomService.createRoom(userId, roomName);
	}
	
	//방 입장 요청
	@GetMapping("/join")
	public String joinRoom(@RequestParam("userId") String userId, @RequestParam("invitationCode") String invitationCode) {
		return roomService.joinRoom(userId, invitationCode);
	}
	
	//입장된 방 조회
	@GetMapping("/get")
	public List<RoomDTO> getRooms(@RequestParam("userId") String userId){
		return roomService.getRooms(userId);
	}
}
