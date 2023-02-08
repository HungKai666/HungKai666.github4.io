package cn.gdsdxy.service.impl;

import cn.gdsdxy.entity.ProductSwiperImage;
import cn.gdsdxy.mapper.ProductSwiperImageMapper;
import cn.gdsdxy.service.IProductSwiperImageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 产品轮播图片Service实现类
 */
@Service("productSwiperImageService")
public class IProductSwiperImageImpl extends ServiceImpl<ProductSwiperImageMapper, ProductSwiperImage> implements IProductSwiperImageService {

    @Autowired
    private ProductSwiperImageMapper productSwiperImageMapper;
}
