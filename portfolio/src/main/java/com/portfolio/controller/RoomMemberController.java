package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.RoomMemberDTO;
import com.portfolio.service.RoomMemberService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/room/member")
public class RoomMemberController {

	@Autowired
	RoomMemberService roomMemberService;
	
    @GetMapping("/leave")
    public void leaveRoom(@RequestParam("roomId") int roomId, @RequestParam("userId") String userId) {
    	roomMemberService.leaveRoom(roomId, userId);
    }
    
    // 채팅방에 참가 중인 사용자 목록 반환
    @GetMapping("/get")
    public List<RoomMemberDTO> getUsersInRoom(@RequestParam("roomId") int roomId) {
        return roomMemberService.getUsersByRoomId(roomId);
    }
}
