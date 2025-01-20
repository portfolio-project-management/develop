package com.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.entity.Good;
import com.portfolio.entity.PortfolioBoard;
import com.portfolio.repository.GoodRepository;
import com.portfolio.repository.PortfolioBoardRepository;
import com.portfolio.repository.UserRepository;

@Service
public class GoodService {

	@Autowired
	GoodRepository goodRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PortfolioBoardRepository portfolioBoardRepository;
	
	// 해당 유저가 좋아요를 눌렀는지 안눌렀는지 체크
	public boolean isCheckGood(String userId, int portfolioBoardId) {
		return (goodRepository.findByPortfolioBoardIdUserId(userId, portfolioBoardId) > 0);
	}
	
	// 좋아요 추가
	public void addGood(String userId, int portfolioBoardId) {
		//좋아요 추가 ( 만약 이미 눌린 사람이 버그로 두 번 눌리면 두 번 추가됨 - 수정 필요 )
		Good good = new Good();
		good.setUser(userRepository.findByUserId(userId).get(0));
		good.setPortfolioBoard(portfolioBoardRepository.getReferenceById(portfolioBoardId));
		goodRepository.save(good);
	}
	
	// 좋아요 삭제
	public void cancleGood(String userId, int portfolioBoardId) {
		goodRepository.deleteByPortfolioBoardIdUserId(userId, portfolioBoardId);
	}
}
