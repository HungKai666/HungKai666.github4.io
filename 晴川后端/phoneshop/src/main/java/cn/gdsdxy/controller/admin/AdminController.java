package cn.gdsdxy.controller.admin;

import cn.gdsdxy.constant.SystemConstant;
import cn.gdsdxy.entity.Admin;
import cn.gdsdxy.entity.R;
import cn.gdsdxy.service.IAdminService;
import cn.gdsdxy.util.JwtUtils;
import cn.gdsdxy.util.StringUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 管理员Controller

 */
@RestController
public class AdminController {

    @Autowired
    private IAdminService adminService;

    /**
     * 管理员登录
     * @param admin
     * @return
     */
    @PostMapping("/adminLogin")
    public R adminLogin(@RequestBody Admin admin){
        if(admin==null){
            return R.error();
        }
        if(StringUtil.isEmpty(admin.getUserName())){
            return R.error("用户名不能为空！");
        }
        if(StringUtil.isEmpty(admin.getPassword())){
            return R.error("密码不能为空！");
        }
        Admin resultAdmin = adminService.getOne(new QueryWrapper<Admin>().eq("userName", admin.getUserName()));
        if(resultAdmin==null){
            return R.error("用户名不存在");
        }
        if(!resultAdmin.getPassword().trim().equals(admin.getPassword())){
            return R.error("用户名或者密码错误！");
        }
        String token = JwtUtils.createJWT("-1", "admin", SystemConstant.JWT_TTL);
        Map<String,Object> resultMap=new HashMap<>();
        resultMap.put("token",token);
        return R.ok(resultMap);
    }

    /**
     * 修改密码
     * @param admin
     * @return
     */
    @PostMapping("/admin/modifyPassword")
    public R modifyPassword(@RequestBody Admin admin){
        if(StringUtil.isEmpty(admin.getUserName())){
            return R.error("用户名不能为空");
        }
        if(StringUtil.isEmpty(admin.getPassword())){
            return R.error("新密码不能为空");
        }
        adminService.update(new UpdateWrapper<Admin>().set("password",admin.getNewPassword()).eq("userName",admin.getUserName()));
        return R.ok();
    }
}
