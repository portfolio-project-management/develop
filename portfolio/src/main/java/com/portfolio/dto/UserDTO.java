package com.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
	
	private String id;
	private String name;
	private String email;
	private String userId;
	private String passWord;
	private String phone;
	private String address;
	
	
	public UserDTO(String userId, String passWord) {
		this.userId = userId;
		this.passWord = passWord;
	}

	
	

	public UserDTO() {
		super();
	}



	
	// 마이페이지에서 가져가는 정보
	public UserDTO(String userId, String name, String email,  String phone) {
		super();
		this.name = name;
		this.email = email;
		this.userId = userId;
		this.phone = phone;
	}
	
	
	
}