package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.portfolio.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Integer>{

	public Room findByInvitationCode(String invitationCode);

//	
//	@Query("select r from Room r join r.members m where m.user.userId = ?1")
//	public List<Room> findByMemberUserId(String userId);
	
	public List<Room> findDistinctByRoomMembersUserUserId(String userId);

}
