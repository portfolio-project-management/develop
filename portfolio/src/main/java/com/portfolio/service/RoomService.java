package com.portfolio.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.RoomDTO;
import com.portfolio.entity.RoomMember;
import com.portfolio.entity.Room;
import com.portfolio.entity.User;
import com.portfolio.repository.RoomMemberRepository;
import com.portfolio.repository.RoomRepository;
import com.portfolio.repository.UserRepository;

@Service
public class RoomService {

	@Autowired
	RoomRepository roomRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoomMemberRepository roomMemberRepository;
	
	
	// 방 생성
	public String createRoom(String userId, String roomName) {
		User user = userRepository.findByUserId(userId);
		
		if(user != null) {
			Room room = new Room();
			
			room.setName(roomName);
			room.setUser(user);
			room.setInvitationCode(UUID.randomUUID().toString());
			
			RoomMember member = new RoomMember();
			
			member.setRoom(room);
			member.setUser(user);
			
			try {
				
				roomRepository.save(room);
				roomMemberRepository.save(member);
				
			}catch(Exception e) {
				
				return "생성오류";
				
			}
				
			
			return "생성완료";
		}else {
			return "유저정보오류";
		}
	}
	
	
	// 방 입장
	public String joinRoom(String userId, String invitationCode) {
		Room room = roomRepository.findByInvitationCode(invitationCode);
		
		//해당 초대코드에 맞는 방이 존재
		if(room != null ) {
			// 해당 인원을 맴버에 추가
			User user = userRepository.findByUserId(userId);
			
			//정상적인 유저라면
			if(user != null) {
				
				RoomMember alreadyMember = roomMemberRepository.findByRoomAndUser(room, user);
				
				if(alreadyMember == null) { // 이미 들어가있는 유저가 아닐 때
					RoomMember member = new RoomMember();
					member.setRoom(room);
					member.setUser(user);
					
					roomMemberRepository.save(member);
					
					return "입장완료";
				}else {
					return "이미입장된방";
				}
			}
			
			return "유저정보오류";
		}else { //맞는 초대 코드가 아닐 때
			return "초대코드오류";
		}
	}
	
	
	//입장한 방 정보
	public List<RoomDTO> getRooms(String userId) {
		
		List<Room> rooms = roomRepository.findDistinctByRoomMembersUserUserId(userId);
		
		return rooms
				.stream()
				.map((room) -> new RoomDTO(
						room.getId(),
						room.getName(),
						room.getInvitationCode(),
						room.getUser().getUserId()
					))
				.collect(Collectors.toList());
	
	}
	
}
