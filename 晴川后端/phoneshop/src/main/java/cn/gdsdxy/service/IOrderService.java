package cn.gdsdxy.service;

import cn.gdsdxy.entity.Order;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;


/**
 * 订单Service接口
 */
public interface IOrderService extends IService<Order> {
    /**
     * 根据条件分页查询订单数据
     * @param map
     * @return
     */
    List<Order> list(Map<String,Object> map);

    /**
     * 根据条件查询订单总记录数
     * @param map
     * @return
     */
    Long getTotal(Map<String,Object> map);
}
