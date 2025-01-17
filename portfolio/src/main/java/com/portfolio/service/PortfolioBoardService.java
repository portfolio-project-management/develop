package com.portfolio.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.dto.PortfolioBoardDTO;
import com.portfolio.entity.PortfolioBoard;
import com.portfolio.repository.PortfolioBoardRepository;
import com.portfolio.repository.UserRepository;

@Service
public class PortfolioBoardService {
	
	@Autowired
	PortfolioBoardRepository portfolioBoardRepostiory;
	
	@Autowired
	UserRepository userRepository;
	
	public List<PortfolioBoardDTO> getPortfolios(){
		return portfolioBoardRepostiory.findAll()
					.stream()
					.map((portfolioBoard) -> (new PortfolioBoardDTO(
						portfolioBoard.getId(),portfolioBoard.getTitle(),
						portfolioBoard.getView(),portfolioBoard.getUser().getUserId(),
						Arrays.asList(portfolioBoard.getPath().split("\\|")),
						portfolioBoard.getGoods().size())
					))
					.collect(Collectors.toList());
	}
	
	public String addPortfolio(PortfolioBoardDTO portfolioBoardDTO, List<MultipartFile> files) {
		
		PortfolioBoard portfolioBoard = new PortfolioBoard();
		
		// 이미 추가한 적이 있는 사용자인지 확인
		List<PortfolioBoard> checkPortfolioBoard = portfolioBoardRepostiory.findByUserId(portfolioBoardDTO.getUserId());
		
		try {
			portfolioBoard.setPath(saveFiles(files, portfolioBoardDTO.getUserId()));
		} catch (IOException e) {
			// 파일 저장 중 에러 발생시 에러 출력
			e.printStackTrace();
			return "저장실패";
		}
		
		portfolioBoard.setTitle(portfolioBoardDTO.getTitle());
		
		if(checkPortfolioBoard.size() > 0) { // 수정일때
			portfolioBoard.setId(checkPortfolioBoard.get(0).getId());
		}else { // 생성일 때
			portfolioBoard.setUser(userRepository.findByUserId(portfolioBoardDTO.getUserId()).get(0));
		}
		
		return "저장성공";
		
	}
	
	// 파일 저장
	private String saveFiles (List<MultipartFile> files, String userId) throws IOException {
		
		String uploadDir = "/uploads/images/" + userId; // 사진 업로드 경로 하드코딩으로 진행함
		Path path = Paths.get(uploadDir);
		
		// 경로가 존재하면 해당 디렉토리 내 모든 파일 삭제
	    if (Files.exists(path.getParent())) {
	        try (Stream<Path> oldFiles = Files.walk(path.getParent())) {
	        	oldFiles.filter(Files::isRegularFile)
	                 .forEach(filePath -> {
	                     try {
	                         Files.delete(filePath); // 기존 파일 삭제
	                     } catch (IOException e) {
	                         e.printStackTrace();
	                     }
	                 });
	        }
	    } else {
	        // 경로가 없으면 디렉토리 생성
	        Files.createDirectories(path.getParent());
	    }
	    
	    
	    
		// 받아온 파일 서버에 저장
		String result = "";
		
		for(MultipartFile file : files) {
			String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
			
			path = Paths.get(uploadDir,fileName);
			
			Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			
			result += path.toString() + "\\|";
		}
		
	   return result;
	    
	}
}
