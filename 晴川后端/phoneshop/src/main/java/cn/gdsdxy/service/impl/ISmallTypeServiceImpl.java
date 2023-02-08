package cn.gdsdxy.service.impl;

import cn.gdsdxy.entity.SmallType;
import cn.gdsdxy.mapper.SmallTypeMapper;
import cn.gdsdxy.service.ISmallTypeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 商品小类Service实现类
 */
@Service("smallTypeService")
public class ISmallTypeServiceImpl extends ServiceImpl<SmallTypeMapper, SmallType> implements ISmallTypeService {

    @Autowired
    private SmallTypeMapper smallTypeMapper;

    @Override
    public List<SmallType> list(Map<String, Object> map) {
        return smallTypeMapper.list(map);
    }

    @Override
    public Long getTotal(Map<String, Object> map) {
        return smallTypeMapper.getTotal(map);
    }
}
