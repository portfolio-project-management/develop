package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.portfolio.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{
	
	@Query("select m from Message m where m.room.id = ?1 ")
	public List<Message> findByRoomId(int roomId);
}
