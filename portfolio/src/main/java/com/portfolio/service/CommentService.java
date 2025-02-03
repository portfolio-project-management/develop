package com.portfolio.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.dto.CommentDTO;
import com.portfolio.entity.Comment;
import com.portfolio.entity.PortfolioBoard;
import com.portfolio.entity.User;
import com.portfolio.repository.CommentRepository;
import com.portfolio.repository.PortfolioBoardRepository;
import com.portfolio.repository.UserRepository;

@Service
public class CommentService {
	
	@Autowired
	CommentRepository commentRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PortfolioBoardRepository portfolioBoardRepository; 
	
	public List<CommentDTO> getComments(int id) {
		return commentRepository
				.findByPortfolioBoardId(id)
				.stream()
				.map((comment) -> (new CommentDTO(
						comment.getId(),
						comment.getUser().getUserId(),
						comment.getContent(),
						comment.getCreateTime()
					)))
				.collect(Collectors.toList());
	}
	
	
	public String addComment(CommentDTO commentDTO) {
		
		System.out.println(commentDTO);
		
		Comment comment = new Comment();
		User user = userRepository.findByUserId(commentDTO.getUserId());
		PortfolioBoard portfolioBoard = portfolioBoardRepository.getReferenceById(commentDTO.getPortfolioBoardId());
		
		comment.setContent(commentDTO.getContent());
		comment.setUser(user);
		comment.setCreateTime(LocalDateTime.now());
		comment.setPortfolioBoard(portfolioBoard);
		
		commentRepository.save(comment);
		
		return "저장성공";
	}
	
	public String deleteComment (int id) {
		commentRepository.deleteById(id);
		
		return "삭제성공";
	}
}
