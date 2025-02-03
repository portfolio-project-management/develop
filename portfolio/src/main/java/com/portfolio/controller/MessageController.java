package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.MessageDTO;
import com.portfolio.service.MessageService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/message")
public class MessageController {

	@Autowired
	MessageService messageService;
	
	@GetMapping("/get")
	public List<MessageDTO> getMessages(@RequestParam("roomId") int roomId){
		return messageService.getMessages(roomId);
	}
}
