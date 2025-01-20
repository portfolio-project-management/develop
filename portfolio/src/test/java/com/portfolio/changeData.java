package com.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.portfolio.repository.GoodRepository;
import com.portfolio.repository.PortfolioBoardRepository;

@SpringBootTest
public class changeData {

	@Autowired
	PortfolioBoardRepository portfolioBoardRepository;
	
	@Autowired
	GoodRepository goodRepository;
	
//	// 포트폴리오 데이터베이스 저장 데이터 삭제 ( 사진은 수동 삭제 필요 )
//	@Test
//	public void delPortfolio() {
//		portfolioBoardRepository.deleteAll();
//	}
	
//	@Test
//	public void delGood() {
//		goodRepository.deleteAll();
//	}
}
