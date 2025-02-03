package com.portfolio;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.portfolio.entity.User;
import com.portfolio.entity.UserProposal;

import com.portfolio.repository.UserProposalRepository;
import com.portfolio.repository.UserRepository;

@SpringBootTest
public class test {

	@Autowired
	UserProposalRepository userProposalRepository;
	
	@Autowired
	UserRepository userRepository;
	
//	@Test
//	public void add() {
//		UserProposal userProposal = new UserProposal();
//		userProposal.setContent("내용3입니다.");
//	
//		User user = userRepository.getReferenceById("0ae9dc37-cf48-42e6-9dc0-8e9e27e4ce03");
//		
//		userProposal.setUser(user);
//		
//		// 현재 시간을 등록시간으로 설정
//		userProposal.setCreatedTime(LocalDateTime.now());
//		
//		userProposalRepository.save(userProposal);
//	}
	
}
