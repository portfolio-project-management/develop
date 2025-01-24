package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.portfolio.entity.Member;
import com.portfolio.entity.Room;
import com.portfolio.entity.User;

public interface MemberRepository extends JpaRepository<Member, Integer>{

	public Member findByRoomAndUser(Room room, User user);
	
	@Query("select m from Member m where m.user.userId = ?1")
	public List<Member> findByUserId(String userId);
}
