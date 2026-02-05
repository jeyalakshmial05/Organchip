package com.example.demo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface SensorRepository extends JpaRepository<SensorData, Long> {
    List<SensorData>findAllByOrderByIdDesc();
    SensorData findTopByOrderByTimestampDesc();
}
