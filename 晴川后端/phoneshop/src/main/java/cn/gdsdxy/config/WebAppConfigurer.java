package cn.gdsdxy.config;

import cn.gdsdxy.interceptor.SysInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(true)
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE","OPTIONS")
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("image/swiper/**").addResourceLocations("file:G:\\qingchuanImages\\lunbotu\\");
        //映射轮播图
        registry.addResourceHandler("image/bigType/**").addResourceLocations("file:G:\\qingchuanImages\\bigTypeImgs\\");
        //映射商品大类图
        registry.addResourceHandler("image/product/**").addResourceLocations("file:G:\\qingchuanImages\\productImgs\\");
        //映射热门商品图
        registry.addResourceHandler("image/productSwiperImgs/**").addResourceLocations("file:G:\\qingchuanImages\\productSwiperImgs\\");
        //映射详情页轮播图
        registry.addResourceHandler("image/productIntroImgs/**").addResourceLocations("file:G:\\qingchuanImages\\productIntroImgs\\");
        //商品介绍图片
        registry.addResourceHandler("image/productParaImgs/**").addResourceLocations("file:G:\\qingchuanImages\\productParaImgs\\");
        //商品规格参数图片
    }

    @Bean
    public SysInterceptor sysInterceptor(){
        return new SysInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] patterns=new String[]{"/adminLogin","/product/**","/bigType/**","/user/wxlogin","/weixinpay/**"};//把不需要进行拦截的排除
        registry.addInterceptor(sysInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
    }
}

