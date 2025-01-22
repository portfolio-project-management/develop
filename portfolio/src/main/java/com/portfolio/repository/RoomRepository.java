package com.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.portfolio.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
    @Query("SELECT r FROM Room r WHERE r.user.userId = :userId")
    public List<Room> findRoomsByUserId(@Param("userId") String userId);
    
}
