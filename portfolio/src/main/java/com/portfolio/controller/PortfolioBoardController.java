package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.dto.PortfolioBoardDTO;
import com.portfolio.dto.PortfolioBoardListDTO;
import com.portfolio.service.PortfolioBoardService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/portfolioboard")
public class PortfolioBoardController {

	@Autowired
	PortfolioBoardService portfolioBoardService;
	
//	// 전체 포트폴리오 가져오기 ( 제목, 사진(메인), 유저 - 리스트로 보여줄 것들 )
//	@GetMapping("/get")
//	public List<PortfolioBoardListDTO> getPortfolios(){
//		return portfolioBoardService.getPortfolios();
//	}
	
	// 전체 포트폴리오 가져오기 (일정 페이지) ( 제목, 사진(메인), 유저 - 리스트로 보여줄 것들 )
	@GetMapping("/get")
	public List<PortfolioBoardListDTO> getPortfolios(@RequestParam("page") int page){
		return portfolioBoardService.getPortfolios(page);
	}
	
	@GetMapping("/countpage")
	public long getCountPage() {
		return portfolioBoardService.getCountPage();
	}
		
	// 작성했던 포트폴리오 가져오기 ( 해당 유저 )
	@GetMapping("/getone")
	public PortfolioBoardDTO getPortfolio(@RequestParam("userId") String userId) {
		return portfolioBoardService.getPortfolio(userId);
	}
	
	// 조회수 카운터 증가
	@GetMapping("/addview")
	public void addView(@RequestParam("userId") String userId) {
		portfolioBoardService.addView(userId);
	} 
	
//	// 작성했던 포트폴리오 파일(사진) 가져오기 ( 해당 유저 ) - 포폴 가져오기에 통합됨
//	@GetMapping("/getfiles")
//	public ResponseEntity<List<String>> getFiles (@RequestParam("userId") String userId){
//		return ResponseEntity.ok(portfolioBoardService.getFiles(userId));
//	}
	
	// 작성/수정 사항 저장
	@PostMapping("/add")
	public String addPortfolio(@RequestParam("portfolio") String portfolioBoardDTOJson,@RequestParam("files") List<MultipartFile> files) {
		PortfolioBoardDTO portfolioBoardDTO = new PortfolioBoardDTO();
		
		// 종속성 추가 필수
		// implementation 'com.fasterxml.jackson.core:jackson-databind:2.13.0'
		try {
			//String으로 들어온 JSON 데이터를 객체로 역 직렬화
			portfolioBoardDTO = new ObjectMapper().readValue(portfolioBoardDTOJson, PortfolioBoardDTO.class);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//System.out.println(portfolioBoardDTO);
		
		return portfolioBoardService.addPortfolio(portfolioBoardDTO, files);
	}
}