package com.portfolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/{path:[^\\.]*}")  // 정적 파일이 아닌 모든 경로 처리
    public String forward() {
        return "forward:/index.html";
    }
}