package com.portfolio.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.MessageDTO;
import com.portfolio.entity.Message;
import com.portfolio.repository.MessageRepository;
import com.portfolio.repository.RoomRepository;
import com.portfolio.repository.UserRepository;

@Service
public class MessageService {
	
	@Autowired
	MessageRepository messageRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoomRepository roomRepository;
	
	//메시지 저장
	public boolean saveMessage(MessageDTO messageDTO){
		Message message = new Message();
		message.setRoom(roomRepository.getReferenceById(messageDTO.getRoomId()));
		message.setUser(userRepository.findByUserId(messageDTO.getUserId()));
		message.setContent(messageDTO.getContent());
		message.setSendTime(messageDTO.getSendTime());
		
		try {
			messageRepository.save(message);
			return true;
		}catch (Exception e){
			return false;
		}
		
	}
	
	//메시지 불러오기
	public List<MessageDTO> getMessages(int roomId){
		return messageRepository.findByRoomId(roomId)
				.stream()
				.map((message) -> new MessageDTO(
						message.getUser().getUserId(),
						message.getContent(),
						message.getSendTime()
					))
				.collect(Collectors.toList());
	}
}
