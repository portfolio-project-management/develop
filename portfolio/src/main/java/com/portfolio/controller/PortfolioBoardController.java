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
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.dto.PortfolioBoardDTO;
import com.portfolio.service.PortfolioBoardService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/portfolioboard")
public class PortfolioBoardController {

	@Autowired
	PortfolioBoardService portfolioBoardService;
	
	@GetMapping("/get")
	public List<PortfolioBoardDTO> getPortfolios(){
		return portfolioBoardService.getPortfolios();
	}
	
	@PostMapping("/add")
	public String addPortfolio(@RequestParam("portfolio") PortfolioBoardDTO portfolioBoardDTO,@RequestParam("files") List<MultipartFile> files) {
		return portfolioBoardService.addPortfolio(portfolioBoardDTO, files);
	}
}
