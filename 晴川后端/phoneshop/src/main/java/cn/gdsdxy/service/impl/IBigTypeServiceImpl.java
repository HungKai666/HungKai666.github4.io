package cn.gdsdxy.service.impl;

import cn.gdsdxy.entity.BigType;
import cn.gdsdxy.mapper.BigTypeMapper;
import cn.gdsdxy.service.IBigTypeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service("bigTypeService")
public class IBigTypeServiceImpl extends ServiceImpl<BigTypeMapper, BigType> implements IBigTypeService {

    @Autowired
    private BigTypeMapper bigTypeMapper;
}
