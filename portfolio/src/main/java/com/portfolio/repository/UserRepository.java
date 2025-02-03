package com.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.portfolio.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,String>{
	
	@Query("select count(u)> 0 from User u where u.userId = ?1 AND u.passWord = ?2")
	public boolean findByUserInfo(String userId, String passWord);
	
	public User findByEmail(String email);
	
	public User findByUserId(String userId);
}
