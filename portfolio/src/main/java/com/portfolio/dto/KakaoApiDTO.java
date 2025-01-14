package com.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoApiDTO {
	private String client_id;
	private String redirect_uri;
	private String response_type;
	private String scope;
}
