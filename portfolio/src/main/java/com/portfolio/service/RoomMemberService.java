package com.portfolio.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.RoomMemberDTO;
import com.portfolio.entity.RoomMember;
import com.portfolio.repository.RoomMemberRepository;

import jakarta.transaction.Transactional;

@Service
public class RoomMemberService {
	
	@Autowired
	RoomMemberRepository roomMemberRepository;
	
	@Transactional
	public void leaveRoom(int roomId, String userId) {

		roomMemberRepository.deleteByUser(roomId, userId);

    }
	
	public List<RoomMemberDTO> getUsersByRoomId(int roomId) {
		return roomMemberRepository.findByRoomId(roomId)
				.stream()
				.map((roomMember) -> new RoomMemberDTO(
						roomMember.getUser().getUserId()
					))
				.collect(Collectors.toList());
	}
	
}
