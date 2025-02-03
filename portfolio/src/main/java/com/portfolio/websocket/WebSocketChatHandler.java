package com.portfolio.websocket;

import java.io.IOException;
import java.net.URI;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.dto.MessageDTO;
import com.portfolio.service.MessageService;

@Component
public class WebSocketChatHandler extends TextWebSocketHandler {
	
	@Autowired
	MessageService messageService;
	
	//연결을 저장할 변수 ( Map과 다르게 동시성 ) ( 룸아이디, 연결된 세션들 )
    private static final ConcurrentHashMap<String, CopyOnWriteArraySet<WebSocketSession>> CLIENTS = new ConcurrentHashMap<String, CopyOnWriteArraySet<WebSocketSession>>();
    
    //연결되어 있는 방( 세션아이디, 룸아이디 )
    private static final ConcurrentHashMap<String, String> ROOM = new ConcurrentHashMap<String, String>();

    //웹 소켓 연결 
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    	//연결 쿼리 확인
    	URI uri = session.getUri();
    	String query = uri.getQuery(); 
    	
    	
    	if (query != null && query.contains("roomId=")) {
	    	//쿼리에서 roomId파싱
	    	String roomId = query.split("=")[1];
	    	
	        CLIENTS.putIfAbsent(roomId,new CopyOnWriteArraySet());
	        
	        CLIENTS.get(roomId).add(session);
	        
	        ROOM.put(session.getId(), roomId);
    	}else {
    		System.out.println("채팅소켓에서 잘못된 접근이 들어왔습니다.");
    	}
    }

    //웹 소켓 해제
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	String roomId = ROOM.get(session.getId());
    	
    	// 연결 해제 및 데이터 삭제
        CLIENTS.get(roomId).remove(session);
        ROOM.remove(session.getId());
    }

    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    	// 전송한 세션이 속한 룸 아이디 가져오기
    	String roomId = ROOM.get(session.getId());
    	
    	// 메세지의 본문 (JSON)
    	String messageDTOjson = message.getPayload();
    	
    	MessageDTO messageDTO = new MessageDTO();
    	// 본문을 객체로 역직렬화
    	try {
			//String으로 들어온 JSON 데이터를 객체로 역 직렬화
    		messageDTO = new ObjectMapper().readValue(messageDTOjson, MessageDTO.class);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	//시간 적용
    	messageDTO.setSendTime(Timestamp.valueOf(LocalDateTime.now()));
    	
	    	// 데이터베이스 저장
    	if(messageService.saveMessage(messageDTO)) {
	    	
	    	// 이제 messageDTO를 JSON으로 직렬화
	    	String updatedMessageJson = "";
	    	try {
	    	    updatedMessageJson = new ObjectMapper().writeValueAsString(messageDTO);
	    	} catch (JsonProcessingException e) {
	    	    e.printStackTrace();
	    	}
	    	
	    	// 메시지를 TextMessage로 변환
	    	TextMessage updatedMessage = new TextMessage(updatedMessageJson);

	    	// 다른 세션에 메시지 전송
	    	for(WebSocketSession client : CLIENTS.get(roomId)) {
				try {
					client.sendMessage(updatedMessage);
				}catch (IOException e) {
					e.printStackTrace();
				}
	    	}
	    	
    	}else { //저장에 실패
    		String failureMessageJson = "{\"status\":\"failure\", \"message\":\"Failed to save message.\"}";
    		TextMessage responseMessage = new TextMessage(failureMessageJson);
    		
    		 // 실패한 클라이언트에게만 메시지 전송
    	    try {
    	        session.sendMessage(responseMessage); // 여기서 session은 실패한 클라이언트
    	    } catch (IOException e) {
    	        e.printStackTrace();
    	    }
    	}
    	
    }
}