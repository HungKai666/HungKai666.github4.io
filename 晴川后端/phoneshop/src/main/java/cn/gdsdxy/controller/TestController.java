package cn.gdsdxy.controller;

import cn.gdsdxy.entity.R;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 测试

 */
@RestController
@RequestMapping("/gdsdxy")
public class TestController {

    /**
     * 测试
     */
    @GetMapping("/test")
    public R test(){
        return R.ok("广东水利电力职业技术学院");
    }
}
