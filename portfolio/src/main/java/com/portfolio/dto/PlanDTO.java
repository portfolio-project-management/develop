package com.portfolio.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString

public class PlanDTO {
	private int id;
	private String name;
	private String color;
	private LocalDateTime time;
	private int roomId;
}
