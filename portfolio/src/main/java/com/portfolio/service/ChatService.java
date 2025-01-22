package com.portfolio.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.RoomDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.entity.Room;
import com.portfolio.repository.RoomRepository;

@Service
public class ChatService {
	 	@Autowired
	    private UserService userService;
	 	@Autowired
	 	private RoomRepository roomRepository;

	    // 사용자 정보 조회
	    public UserDTO getUserInfoForChat(String userId) {
	        // 사용자 정보가 없으면 null 반환
	        UserDTO userDTO = userService.getUserInfoByUserId(userId);
	        return userDTO; // 이 데이터를 기반으로 채팅 관련 처리 가능
	    }
	    
	    public List<RoomDTO> getRoomsByUserId(String userId) {
	    	List<Room> rooms = roomRepository.findRoomsByUserId(userId);
	        return rooms.stream()
                    .map(room -> new RoomDTO(room.getRoomId(), room.getRoomName()))
                    .collect(Collectors.toList());
	    }
	    
}
