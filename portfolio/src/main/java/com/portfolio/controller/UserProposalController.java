package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.UserProposalDTO;
import com.portfolio.service.UserProposalService;

@RestController
@RequestMapping("/proposal")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class UserProposalController {

	@Autowired
    private UserProposalService userProposalService;

    @GetMapping("/get")
    public UserProposalDTO userProposal(@RequestParam("proposalId") String proposalId) {
        return userProposalService.getProposal(proposalId);
    }
    
    @PostMapping("/edit")
	public String createProposal(@RequestBody UserProposalDTO userProposalDTO) {
		return userProposalService.createProposal(userProposalDTO);
    }
    
    @PostMapping("/delete")
	public void deleteProposal(@RequestBody UserProposalDTO userProposalDTO) {
		 userProposalService.deleteProposal(userProposalDTO);
	}
    
    @GetMapping("/list") 
    public ResponseEntity<List<UserProposalDTO>> getAllProposalsByUserId(@RequestParam("userId") String userId) {
        // 유저의 제안서 목록을 가져옴
        List<UserProposalDTO> proposals = userProposalService.getAllProposalsByUserId(userId);
        
        // 제안서가 하나도 없으면 204 No Content 응답
        if (proposals.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        // 제안서 목록이 있으면 200 OK 응답과 함께 반환
        return ResponseEntity.ok(proposals);
    }
}
