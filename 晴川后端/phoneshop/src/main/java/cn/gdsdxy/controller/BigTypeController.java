package cn.gdsdxy.controller;

import cn.gdsdxy.entity.BigType;
import cn.gdsdxy.entity.Product;
import cn.gdsdxy.entity.R;
import cn.gdsdxy.entity.SmallType;
import cn.gdsdxy.service.IBigTypeService;
import cn.gdsdxy.service.IProductService;
import cn.gdsdxy.service.ISmallTypeService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 商品controller
 */
@RestController
@RequestMapping("/bigType")
public class BigTypeController {

    @Autowired
    private IBigTypeService bigTypeService;
    @Autowired
    private ISmallTypeService smallTypeService;
    @Autowired
    private IProductService productService;


    /**
     * 查询所有商品大类(大分类)
     * @return
     */
    @GetMapping("/findAll")
    public R findSwiper(){
        List<BigType> bigTypeList = bigTypeService.list();
        Map<String,Object> map=new HashMap<>();
        map.put("message",bigTypeList);
        return R.ok(map);
    }

    /**
     * 获取所有商品分类信息
     * @return
     */
    @GetMapping("/findCategories")
    public R findCategories(){
        List<BigType> bigTypeList=bigTypeService.list();
        for (BigType bigType:bigTypeList){
            List<SmallType> smallTypeList=smallTypeService.list(new QueryWrapper<SmallType>().eq("bigTypeId",bigType.getId()));
            bigType.setSmallTypeList(smallTypeList);
            for(SmallType smallType:smallTypeList){
                List<Product> productList = productService.list(new QueryWrapper<Product>().eq("typeId", smallType.getId()));
                smallType.setProductList(productList);
            }
        }
        Map<String,Object> map=new HashMap<>();
        map.put("message",bigTypeList);
        return R.ok(map);
    }

}
