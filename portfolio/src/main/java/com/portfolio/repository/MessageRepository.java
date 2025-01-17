package com.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

}
