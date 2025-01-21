package com.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.portfolio.dto.UserDTO;
import com.portfolio.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,String>{
	
	@Query("select count(u)> 0 from User u where u.userId = ?1 AND u.passWord = ?2")
	public boolean findByUserInfo(String userId, String passWord);
	
	public List<User> findByEmail(String email);
	
	public List<User> findByUserId(String userId);
	
	public User findByName(String name);
}
