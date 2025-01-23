package com.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.service.GoodService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/good")
public class GoodController {
	
	@Autowired
	GoodService goodService;
	
	@GetMapping("/check")
	public boolean isCheckGood (@RequestParam("userId") String userId, @RequestParam("portfolioBoardId") int portfolioBoardId) {
		return goodService.isCheckGood(userId,portfolioBoardId);
	}
	
	@GetMapping("/add")
	public void addGood(@RequestParam("userId") String userId, @RequestParam("portfolioBoardId") int portfolioBoardId) {
		goodService.addGood(userId,portfolioBoardId);
	}
	
	@GetMapping("/cancle")
	public void cancleGood(@RequestParam("userId") String userId, @RequestParam("portfolioBoardId") int portfolioBoardId) {
		goodService.cancleGood(userId,portfolioBoardId);
	}
}
