package com.example.demo;
import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
@Component
public class SensorSimulator {
@Autowired
    private SensorRepository repository;
    private final Random random = new Random();
@Scheduled(fixedRate = 3000)
    public void generateData() {
     SensorData data = new SensorData();
        data.setTemperature(36.5 + random.nextDouble() * 1.5);
        data.setPh(7.0 + random.nextDouble() * 0.8);
        data.setOxygenLevel(90 + (random.nextInt(10)));
        data.setTimestamp(LocalDateTime.now());
        data.setStatus("NORMAL");
   repository.save(data);
    System.out.println("Data saved: Temp=" + data.getTemperature() + ", pH=" + data.getPh() + "  " + data.getTimestamp());
    }
  }
