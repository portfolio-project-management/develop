package com.portfolio.session;

import java.util.HashMap;
import java.util.UUID;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SessionManager {
    HashMap<String,String> sessionMap = new HashMap<>();

    public void createSession(String value, HttpServletResponse response) {
        String token = UUID.randomUUID().toString(); // 랜덤 토큰 생성
        sessionMap.put(token,value);
        Cookie cookie = new Cookie("LOGIN_MEMBER", token);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    public String findCookie(Cookie[] cookies) {
        System.out.println(sessionMap);

        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(sessionMap.containsKey(cookie.getValue())) {
                    return sessionMap.get(cookie.getValue());
                }
            }
            return "세션만료";
        }
        return "쿠키만료";
    }

    public boolean deleteCookie(Cookie[] cookies) {
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(sessionMap.remove(cookie.getValue()) != null) {
                    return true;
                }
            }
        }
        return false;
    }

} 
