package com.portfolio.config;

import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")  // 클라이언트가 연결할 엔드포인트
                .setAllowedOrigins("http://localhost:3000");  // React 앱의 URL
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");  // 메시지를 받을 destination을 설정
        registry.setApplicationDestinationPrefixes("/app");  // 클라이언트가 메시지를 보낼 destination prefix
    }
}
