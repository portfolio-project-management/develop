package com.portfolio.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.UserProposalDTO;
import com.portfolio.entity.User;
import com.portfolio.entity.UserProposal;
import com.portfolio.repository.UserProposalRepository;
import com.portfolio.repository.UserRepository;

@Service
public class UserProposalService {
	
	@Autowired
	private UserProposalRepository userProposalRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public UserProposalDTO getProposal(String proposalId) {
		
		// 이미 있는 제안서일때 ( 정보 불러오기 )
		if(!proposalId.equals("없음")) {
			UserProposal userProposal = userProposalRepository.getReferenceById(Long.parseLong(proposalId));
					
			return new UserProposalDTO(
				userProposal.getId(),
				userProposal.getUser().getUserId(),
				userProposal.getTitle(),
				userProposal.getExpectedTeamMembers(),
				userProposal.getExpectedTechnologyStack(),
				userProposal.getPlan(),
				userProposal.getContent(),
				userProposal.getCreatedTime(),
				userProposal.getExpiredTime()
			);
		}
			
		// 새 제안서 작성 시
		return new UserProposalDTO();
			
	}
	
	 public String createProposal(UserProposalDTO userProposalDTO) {
		 
			UserProposal userProposal = new UserProposal();
			
			User user = userRepository.findByUserId(userProposalDTO.getUserId()).get(0);
			
			userProposal.setTitle(userProposalDTO.getTitle());
			userProposal.setExpectedTeamMembers(userProposalDTO.getExpectedTeamMembers());
			userProposal.setExpectedTechnologyStack(userProposalDTO.getExpectedTechnologyStack());
			userProposal.setPlan(userProposalDTO.getPlan());
			userProposal.setContent(userProposalDTO.getContent());
			userProposal.setExpiredTime(userProposalDTO.getExpiredTime());
			userProposal.setUser(user);
			
			// 새로 생성된 제안서가 아니면 기존 데이터에 덮어쓰기
			if(userProposalDTO.getId() != null ) {
				userProposal.setId(userProposalDTO.getId());
				userProposal.setCreatedTime(userProposalDTO.getCreatedTime());
			}else {
				// 현재 시간을 등록시간으로 설정
				userProposal.setCreatedTime(LocalDateTime.now());
			}
			
			// 제안서 저장
			userRepository.save(user);
	    	
	    	return userProposalRepository.save(userProposal) == null? "실패" : "성공";
			
	 }
	 
	 public void deleteProposal(UserProposalDTO userProposalDTO) {
         userProposalRepository.deleteById(userProposalDTO.getId()); 
	 }

	 public List<UserProposalDTO> getAllProposalsByUserId(String userId) {
		 	
		 	// 특정 유저의 제안서
		 	if(!userId.equals("없음")) {
			    User user = userRepository.findByUserId(userId).get(0); // 유저 정보 조회
	
			    List<UserProposal> userProposals = userProposalRepository.findByUserId(user.getId()); // 유저의 모든 제안서 조회
	
			    // 유저가 제안서를 하나라도 가지고 있으면 DTO 리스트로 변환해서 반환
			    if (userProposals.size() > 0) {
			        return userProposals.stream()
			                .map(userProposal -> new UserProposalDTO(
			                        userProposal.getId(),
			                        user.getUserId(),
			                        userProposal.getTitle(),
			                        userProposal.getExpectedTeamMembers(),
			                        userProposal.getExpectedTechnologyStack(),
			                        userProposal.getPlan(),
			                        userProposal.getContent(),
			                        userProposal.getCreatedTime(),
			                        userProposal.getExpiredTime()
			                ))
			                .collect(Collectors.toList());
			    }
			//전체 유저의 제안서
		 	}else {
		 		return userProposalRepository.findAll().stream()
		                .map(userProposal -> new UserProposalDTO(
		                        userProposal.getId(),
		                        userProposal.getUser().getUserId(),
		                        userProposal.getTitle(),
		                        userProposal.getExpectedTeamMembers(),
		                        userProposal.getExpectedTechnologyStack(),
		                        userProposal.getPlan(),
		                        userProposal.getContent(),
		                        userProposal.getCreatedTime(),
		                        userProposal.getExpiredTime()
		                ))
		                .collect(Collectors.toList());
		 		
		 	}
		    
		    // 제안서가 없으면 빈 리스트 반환
		    return new ArrayList<>();
		}
}
