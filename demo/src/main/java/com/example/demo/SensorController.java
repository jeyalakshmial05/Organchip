package com.example.demo;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "http://localhost:3000")
public class SensorController {
  @Autowired
    private  final SensorRepository repository;
    public SensorController(SensorRepository repository){
        this.repository=repository;
    }
    @GetMapping("/latest")
    public SensorData getLatest(){
        return repository.findTopByOrderByTimestampDesc();
    }
    @GetMapping("/all")
    public List<SensorData> getAllData() {
        // Kadeisiya save aana data-va Dashboard-ku anuppum
        return repository.findAllByOrderByIdDesc(); 
    }
    @GetMapping("/test")
    public String test(){
        return "backend ok";
    }
}
