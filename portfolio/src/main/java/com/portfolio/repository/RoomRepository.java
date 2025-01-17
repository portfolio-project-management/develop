package com.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{

}
