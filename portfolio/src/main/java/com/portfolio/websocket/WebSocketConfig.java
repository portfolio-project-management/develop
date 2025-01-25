package com.portfolio.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    WebSocketChatHandler webSocketChatHandler;
    
    @Autowired
    WebSocketPlanHandler webSocketPlanHandler;
    
    

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    	
    	// 채팅 관련 처리
        registry.addHandler(webSocketChatHandler, "/chat").setAllowedOrigins("*");
        
        
        // 캘린더 관련 처리
        registry.addHandler(webSocketPlanHandler, "/calendar").setAllowedOrigins("*");
    }
}