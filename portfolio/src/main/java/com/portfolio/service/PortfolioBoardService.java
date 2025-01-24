package com.portfolio.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.dto.PortfolioBoardDTO;
import com.portfolio.dto.PortfolioBoardListDTO;
import com.portfolio.entity.PortfolioBoard;
import com.portfolio.entity.User;
import com.portfolio.repository.PortfolioBoardRepository;
import com.portfolio.repository.UserRepository;

@Service
public class PortfolioBoardService {
	
	@Autowired
	PortfolioBoardRepository portfolioBoardRepostiory;
	
	@Autowired
	UserRepository userRepository;
	
	
//	// 모든 포트폴리오 가지고 오기
//	public List<PortfolioBoardListDTO> getPortfolios(){
//		return portfolioBoardRepostiory.findAll()
//					.stream()
//					.map((portfolioBoard) -> (new PortfolioBoardListDTO(
//						portfolioBoard.getId(),
//						portfolioBoard.getTitle(),
//						portfolioBoard.getUser().getUserId(),
//						getFile(portfolioBoard.getUser().getUserId()),
//						portfolioBoard.getGoods().size(),
//						portfolioBoard.getView()
//					)))
//					.collect(Collectors.toList());
//	}
	
	// 페이징 기법을 통한 일정 양의 포폴 가져오기
	public List<PortfolioBoardListDTO> getPortfolios(int page) {
		//항상 20개씩 -- 재수정
        Pageable pageable = PageRequest.of(page, 20);
        Page<PortfolioBoard> boardPage = portfolioBoardRepostiory.findBySomePageOrderById(pageable);	
        return boardPage
				.stream()
				.map((portfolioBoard) -> (new PortfolioBoardListDTO(
					portfolioBoard.getId(),
					portfolioBoard.getTitle(),
					portfolioBoard.getUser().getUserId(),
					getFile(portfolioBoard.getUser().getUserId()),
					portfolioBoard.getGoods().size(),
					portfolioBoard.getView()
				)))
				.collect(Collectors.toList());
	}
	
	//총 데이터 개수 가져오기
	public long getCountPage() {
		return portfolioBoardRepostiory.count();
	}
	
	
	//포트폴리오 한 개 가져오기
	public PortfolioBoardDTO getPortfolio (String userId) {
		
		// 특정 유저의 포폴 가져가기
		User user = userRepository.findByUserId(userId);
		
		//작성된 포트폴리오가 있으면 가지고 가고 아니면 빈 값 가져가기
		List<PortfolioBoard> portfolioBoards = portfolioBoardRepostiory.findByUser(user);
		
		if(portfolioBoards.size() > 0) {
			
			PortfolioBoard portfolioBoard = portfolioBoards.get(0);
			
			// DTO로 변환 후 반환
			return new PortfolioBoardDTO(
					portfolioBoard.getId(),
					portfolioBoard.getTitle(),
					portfolioBoard.getView(),
					portfolioBoard.getUser().getUserId(),
//					Arrays.asList(portfolioBoard.getPath().split("\\|")),
					getFiles(portfolioBoard.getUser().getUserId()),
					portfolioBoard.getGoods().size()	
			);
		}
		
		
		//작성한 포폴이 없을 경우 빈 값 반환
		return new PortfolioBoardDTO();
		
	}
	
	//조회수 증가
	public void addView(String userId) {
		//작성 유저의 포트폴리오 정보 가져오기
		PortfolioBoard portfolioBoard = portfolioBoardRepostiory.findByUser(userRepository.findByUserId(userId)).get(0);
		
		//1 증가 후 저장
		portfolioBoard.setView(portfolioBoard.getView()+1);
		portfolioBoardRepostiory.save(portfolioBoard);
	}
	
	//포트폴리오 저장/수정
	public String addPortfolio(PortfolioBoardDTO portfolioBoardDTO, List<MultipartFile> files) {
		
		
		PortfolioBoard portfolioBoard = new PortfolioBoard();
		
		User user = userRepository.findByUserId(portfolioBoardDTO.getUserId());
		
		// 이미 추가한 적이 있는 사용자인지 확인
		List<PortfolioBoard> checkPortfolioBoard = portfolioBoardRepostiory.findByUser(user);
		
		portfolioBoard.setUser(user);
		
		try {
			portfolioBoard.setPath(saveFiles(files, portfolioBoardDTO.getUserId()));
		} catch (IOException e) {
			// 파일 저장 중 에러 발생시 에러 출력
			e.printStackTrace();
			return "저장실패";
		}
		
		
		// 제목이 존재하지 않으면 유저 ID로 대체
		if(portfolioBoardDTO.getTitle() == null) {
			portfolioBoard.setTitle(portfolioBoardDTO.getUserId());
		}else {
			portfolioBoard.setTitle(portfolioBoardDTO.getTitle());
		}
		
		
		if(checkPortfolioBoard.size() > 0) { // 수정일때 ( 기존 데이터가 존재 시 )
			portfolioBoard.setId(checkPortfolioBoard.get(0).getId());
		}
		
		
		// System.out.println(portfolioBoardDTO);
		
		//System.out.println(portfolioBoard); ( 출력하지 말 것 ( 오버플로우 발생... 이유는 모르겠음 ) )
		
		portfolioBoardRepostiory.save(portfolioBoard);
		
		return "저장성공";
		
	}
	
	// 파일 저장
	private String saveFiles (List<MultipartFile> files, String userId) throws IOException {
		
		String uploadDir = "C:\\uploads\\images\\" + userId; // 사진 업로드 경로 하드코딩으로 진행함
		Path path = Paths.get(uploadDir);

		// 경로가 존재하면 해당 디렉토리 내 모든 파일 삭제
	    if (Files.exists(path)) {
	        try (Stream<Path> oldFiles = Files.walk(path)) {
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
	        Files.createDirectories(path);
	    }
	    
	    
	    
		// 받아온 파일 서버에 저장
		String result = "";
		
		//메인은 별도로 저장
		String uploadMainDir = "C:\\uploads\\images\\main"; // 메인사진 업로드 경로 ( 하드 코딩으로 진행 - 나중에 다른 폴더로 빼기 )
		Path mainPath = Paths.get(uploadMainDir);
		
		//메인 디럭터리가 없으면 생성
		Files.createDirectories(mainPath);
		
		int cnt = 0;
		
		for(MultipartFile file : files) {
			
			String fileName = file.getOriginalFilename();
			
			// 메인에 나올 사진은 초반에 다른 디렉토리에 한번 더 저장
			if(cnt == 0) {
				if (fileName != null && fileName.lastIndexOf('.') != -1) {
				    String mainFileName = userId + "." + fileName.substring(fileName.lastIndexOf('.')+1);
				    
				    Path mainFilePath = Paths.get(uploadMainDir, mainFileName);
					
					Files.copy(file.getInputStream(), mainFilePath, StandardCopyOption.REPLACE_EXISTING);
				}
			}
			
			// 나머지 사진들을 순서대로 저장
			if (fileName != null && fileName.lastIndexOf('.') != -1) {
			    fileName = (cnt++) + "." + fileName.substring(fileName.lastIndexOf('.')+1);
			}
			
			Path filePath = Paths.get(uploadDir,fileName);
			
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
			
			result += filePath.toString() + "\\|";
		}
		
	   return result;
	    
	}
	
	
	// 메인 파일 ( 메인에서 제목이 userId인 파일 가져오기 )
	public String getFile(String userId) {
		String mainDir = "C:\\uploads\\images\\main"; // 메인사진 업로드 경로 ( 하드 코딩으로 진행 - 나중에 다른 폴더로 빼기 )
		String fileName = userId + ".jpg";
		
		Path filePath = Paths.get(mainDir,fileName);
		
		// 파일을 byte[]로 읽어서 Base64로 변환
		try {
			byte[] fileBytes = Files.readAllBytes(filePath);
			String base64Encoded = Base64.getEncoder().encodeToString(fileBytes);

			// 64비트로 변환된 메인 파일 전송
			return base64Encoded;
			
		} catch (IOException e) {
			e.printStackTrace();
		}
        
		// 예외 시 "전송오류" 반환
		return "전송오류";
	}
	
	
	// 파일 전송
	public List<String> getFiles(String userId){
		String downloadDir = "C:\\uploads\\images\\" + userId; // 사진 업로드 경로 하드코딩으로 진행함
		Path path = Paths.get(downloadDir);
		
		List<String> files = new ArrayList();

		// 경로가 존재하면 해당 디렉토리 파일 List에 저장
	    if (Files.exists(path)) {
	        try (Stream<Path> oldFiles = Files.walk(path)) {
	        	
	        	oldFiles.filter(Files::isRegularFile)
	                 .forEach(filePath -> {
	                     try {
	                    	// 파일을 byte[]로 읽어서 Base64로 변환
                             byte[] fileBytes = Files.readAllBytes(filePath);
                             String base64Encoded = Base64.getEncoder().encodeToString(fileBytes);
                             files.add(base64Encoded); // base64 문자열 리스트에 추가
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
	                 });
	        	
	        } catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	    }
	    
		return files;
	}
}
