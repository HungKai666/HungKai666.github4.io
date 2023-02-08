package cn.gdsdxy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("cn.gdsdxy.mapper")
public class PhoneshopApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhoneshopApplication.class, args);
    }

}
