package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.CommentDTO;
import com.portfolio.service.CommentService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/comment")
public class CommentController {

	@Autowired
	CommentService commentService;

	@GetMapping("/get")
	public List<CommentDTO> getComments(@RequestParam("portfolio") int id) {
		return commentService.getComments(id);
	}
	
	@PostMapping("/add")
	public String addComment(@RequestBody CommentDTO commentDTO) {
		return commentService.addComment(commentDTO);
	}
	
	@GetMapping("/delete")
	public String deleteComment(@RequestParam("commentid") int id) {
		return commentService.deleteComment(id);
	}
}


	