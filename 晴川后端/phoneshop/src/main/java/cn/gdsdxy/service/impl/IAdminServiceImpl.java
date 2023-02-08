package cn.gdsdxy.service.impl;

import cn.gdsdxy.entity.Admin;
import cn.gdsdxy.mapper.AdminMapper;
import cn.gdsdxy.service.IAdminService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 管理员Service实现类
 */
@Service("adminService")
public class IAdminServiceImpl extends ServiceImpl<AdminMapper, Admin> implements IAdminService {

    @Autowired
    private AdminMapper adminMapper;
}
