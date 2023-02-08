package cn.gdsdxy.mapper;

import cn.gdsdxy.entity.SmallType;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;
import java.util.Map;

/**
 * 商品小类Mapper接口
 */
public interface SmallTypeMapper extends BaseMapper<SmallType> {
    List<SmallType> list(Map<String,Object> map);

    Long getTotal(Map<String,Object> map);

    SmallType findById(Integer id);
}
