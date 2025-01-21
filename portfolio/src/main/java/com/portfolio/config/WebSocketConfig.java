package com.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 클라이언트가 접속할 STOMP 엔드포인트 등록
        registry.addEndpoint("/chat/room/{roomId}")
                .setAllowedOrigins("*");  // CORS 허용
    }
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메시지 브로커 설정 (메시지를 전달할 경로)
        registry.setApplicationDestinationPrefixes("/app");  // 클라이언트에서 서버로 보내는 메시지의 prefix
        registry.enableSimpleBroker("/topic");  // 서버에서 클라이언트로 메시지를 보낼 topic 설정
    }
}
