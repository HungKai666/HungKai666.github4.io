package cn.gdsdxy.service;

import cn.gdsdxy.entity.Product;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;


/**
 * 商品Service接口
 */
public interface IProductService extends IService<Product> {
    List<Product> list(Map<String,Object> map);

    Long getTotal(Map<String,Object> map);

    void add(Product product);

    void update(Product product);

    Product findById(Integer id);
}
