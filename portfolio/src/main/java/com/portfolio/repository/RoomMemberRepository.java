package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.portfolio.entity.Room;
import com.portfolio.entity.RoomMember;
import com.portfolio.entity.User;

public interface RoomMemberRepository extends JpaRepository<RoomMember, Integer>{

	public RoomMember findByRoomAndUser(Room room, User user);
	
	@Query("select m from RoomMember m where m.user.userId = ?1")
	public List<RoomMember> findByUserId(String userId);
	
	@Modifying
	@Query("DELETE FROM RoomMember m WHERE m.room.id = ?1 AND m.user.userId = ?2")
	public void deleteByUser(int roomId, String userId);
	
	public List<RoomMember> findByRoomId(int roomId);
}
