package cn.gdsdxy.mapper;

import cn.gdsdxy.entity.BigType;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
/**
 * 商品大类Mapper接口
 */
public interface BigTypeMapper extends BaseMapper<BigType> {

    public BigType findById(Integer id);
}
