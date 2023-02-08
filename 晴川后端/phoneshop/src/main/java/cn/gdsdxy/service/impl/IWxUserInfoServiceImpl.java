package cn.gdsdxy.service.impl;

import cn.gdsdxy.entity.WxUserInfo;
import cn.gdsdxy.mapper.WxUserInfoMapper;
import cn.gdsdxy.service.IWxUserInfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 微信用户信息Service实现类
 */
@Service("wxUserInfoService")
public class IWxUserInfoServiceImpl extends ServiceImpl<WxUserInfoMapper, WxUserInfo> implements IWxUserInfoService {

    @Autowired
    private WxUserInfoMapper wxUserInfoMapper;
}
