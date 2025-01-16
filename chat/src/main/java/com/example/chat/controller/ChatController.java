package com.example.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.example.chat.entity.Message;
import com.example.chat.service.MessageService;

@RestController
public class ChatController {
	
	@Autowired
	private MessageService messageService;
	
	@MessageMapping("/sendMessage")
	@SendTo("/sub/messages")
	public Message sendMessage(Message message) {
		messageService.saveMessage(message);
		return message;
	}
}
