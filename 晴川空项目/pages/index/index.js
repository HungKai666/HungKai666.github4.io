
//导入请求开始(第一步导入封装好的请求)
import {
  getBaseUrl,
  requestUtil
} from '../../utils/requestUtil.js';
//导入请求结束


Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],//（第二步在数据里定义数据）
    baseUrl: '',
    bigTypeList:[],
    bigTypeList_row1:[],
    HotProductList:[],
    msgList:[
      { title: '欢迎光临晴川手机商城！' },
      { title: '如有任何问题可以在线联系客服！' },
      { title: '本店支持7天无条件退款，2年保修' }
],
  },

  //生命周期函数，监听页面加载开始
  onLoad: function (options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })//获取更新后url的根路径
    /*   发送异步请求，获取后端数据
     wx.request({
       url: 'http://localhost:8080/product/findSwiper',
       method:"GET",
       success:(result)=>{
         console.log(result)
         this.setData({
           swiperList:result.data.message
         })
         wx.request({
           url: 'url',
         })
       }
     })*/ 
    this.getSwiperList();//(第四步获取数据)
    this.getBigTypeList();
    this.getHotProductList();
  },

  //大类点击事件跳转开始
  handleTypeJump(e){
    console.log(e)
    const {index}=e.currentTarget.dataset;
    console.log("index="+index)

    const app=getApp();
    app.globalData.index=index;

    wx.switchTab({
      url:'/pages/category/index'
    } )
  },
  //大类点击时间跳转结束

//生命周期函数，监听页面加载结束

//轮播图回调请求开始
  async getSwiperList() {
    // requestUtil({url: '/product/findSwiper',method:"GET"})
    //   .then(result=>{
    //     const baseUrl=getBaseUrl();
    //     this.setData({
    //        swiperList:result.message,
    //        baseUrl
    //     })
    //   })

    const result = await requestUtil({
      url: '/product/findSwiper',
      method: "GET"
    });
    this.setData({
      swiperList: result.message
    })
  },
//轮播图回调请求结束

//热门商品分类回调请求开始（第三步回调请求）
  async getBigTypeList(){
    const result = await requestUtil({
      url: '/bigType/findAll',//url为后端controller中定义的url
      method: "GET"
    });
    console.log(result)
    const bigTypeList=result.message;
    const bigTypeList_row1=bigTypeList.filter((item,index)=>{
      return index<6;
    })
    
    this.setData({
      bigTypeList,
      bigTypeList_row1,
    })
  },
 //热门商品分类回调请求结束 

 //商品推荐回调请求开始
  async getHotProductList(){ const result = await requestUtil({ 
    url: '/product/findHot', 
    method: "GET" }); 
    this.setData({ hotProductList: result.message }) },
//商品推荐回调请求结束

})