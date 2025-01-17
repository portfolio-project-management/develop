package com.portfolio.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.RoomDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.entity.Room;
import com.portfolio.entity.User;
import com.portfolio.repository.RoomRepository;
import com.portfolio.repository.UserRepository;

@Service
public class ChatService {
	
	 @Autowired
	 RoomRepository roomRepository;
	 UserRepository userRepository;
	
	public ChatService(RoomRepository roomRepository, UserRepository userRepository) {
		this.roomRepository = roomRepository;
		this.userRepository = userRepository;
	}
	
	// 모든 채팅방 목록 출력
	public List<RoomDTO> getAllRooms() {
		List<Room> rooms = roomRepository.findAll();
		return rooms.stream().map(room -> new RoomDTO(
				room.getId(),
				room.getRoomName(),
				room.getParticipants().stream()
				.map(user -> new UserDTO(user.getUserId(), user.getName()))
				.collect(Collectors.toList())
				))
				.collect(Collectors.toList());
	}
	
	// 채팅방 생성 및 참가자 추가
	public Room createChatRoom(String roomName, List<UserDTO> userDTOs) {
		// 채팅방 생성
		Room room = new Room();
		room.setRoomName(roomName);
		
        Set<User> users = userDTOs.stream()
                .map(userDTO -> userRepository.findById(userDTO.getUserId())
                		.orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다.")))
                .collect(Collectors.toSet());
		
        room.setParticipants(users);
        users.forEach(user -> user.getRooms().add(room));
		
		// DB 저장
		return roomRepository.save(room);
	}
}
