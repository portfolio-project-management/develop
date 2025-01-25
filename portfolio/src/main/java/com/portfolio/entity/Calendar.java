package com.portfolio.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class Calendar {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	private String invitationCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="calendar")
	private List<CalendarMember> calendarMembers;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="calendar")
	private List<Plan> plans;
	
}
