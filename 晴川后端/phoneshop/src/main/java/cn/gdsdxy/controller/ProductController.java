package cn.gdsdxy.controller;

import cn.gdsdxy.entity.Product;
import cn.gdsdxy.entity.ProductSwiperImage;
import cn.gdsdxy.entity.R;
import cn.gdsdxy.service.IProductService;
import cn.gdsdxy.service.IProductSwiperImageService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 商品
 */
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private IProductService productService;
    @Autowired
    private IProductSwiperImageService productSwiperImageService;

    /**
     * 查询轮播商品
     * @return
     */
    @GetMapping("/findSwiper")
    public R findSwiper(){
        List<Product> swiperProductList = productService.list(new QueryWrapper<Product>().eq("isSwiper", true).orderByAsc("swiperSort"));
        Map<String,Object> map=new HashMap<>();
        map.put("message",swiperProductList);
        return R.ok(map);
    }

    /**
     * 查询热门推荐商品
     * @return
     */
    @RequestMapping("/findHot")
    public R findHot(){
        Page<Product> page=new Page<>(0,8);
        Page<Product> pageProduct=productService.page(page,new QueryWrapper<Product>().eq("isHot",true));
        List<Product> hotProductList=pageProduct.getRecords();
        Map<String,Object> map=new HashMap<>();
        map.put("message",hotProductList);
        return R.ok(map);
    }


    /**
     * 根据id查询商品信息（详细信息）
     * param:id
     * @return
     */
    @RequestMapping("/detail")
    public R detail(Integer id){
        Product product=productService.getById(id);
        List<ProductSwiperImage> productSwiperImageList = productSwiperImageService.list(new QueryWrapper<ProductSwiperImage>().eq("productId", product.getId()).orderByAsc("sort"));
        product.setProductSwiperImageList(productSwiperImageList);
        Map<String,Object> map=new HashMap<>();
        map.put("message",product);
        return R.ok(map);
    }


    /**
     * 商品搜索
  00000000   */
    @RequestMapping("/search")
    public R search(String q){
        List<Product> productList=productService.list(new QueryWrapper<Product>().like("name",q));
        Map<String,Object> map=new HashMap<>();
        map.put("message",productList);
        return R.ok(map);
    }
}
