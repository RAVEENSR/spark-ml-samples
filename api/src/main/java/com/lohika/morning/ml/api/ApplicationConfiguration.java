package com.lohika.morning.ml.api;

import com.lohika.morning.ml.spark.driver.SparkContextConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.event.EventListener;

import java.io.IOException;

@Configuration
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
@ComponentScan("com.lohika.morning.ml.api.*")
@Import(SparkContextConfiguration.class)
public class ApplicationConfiguration {

    public static void main(String[] args) {
        SpringApplication.run(ApplicationConfiguration.class, args);
    }

    @EventListener({ApplicationReadyEvent.class})
    public void applicationReadyEvent() {
        System.out.println("Application started ... launching browser now");
        browse("React-App/index.html");
    }

    public static void browse(String url) {
        Runtime runtime = Runtime.getRuntime();
        try {
            System.out.println("Executing command for MAC: " + "start " + url);
            runtime.exec("open " + url);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
