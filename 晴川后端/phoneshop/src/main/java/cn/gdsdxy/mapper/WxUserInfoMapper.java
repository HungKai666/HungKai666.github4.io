package cn.gdsdxy.mapper;


import cn.gdsdxy.entity.WxUserInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * 微信用户信息Mapper接口
 */
public interface WxUserInfoMapper extends BaseMapper<WxUserInfo> {

    public WxUserInfo findByOpenId(String openId);
}
