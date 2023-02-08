// 导入request请求工具类
import {
  getBaseUrl,
  requestUtil
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
    productObj:{},
    activeIndex:0
  },
  productInfo:{

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
    this.getProductDetail(options.id)
  },

  // tab点击事件开始
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    console.log(index)
    this.setData({
      activeIndex:index
    })
  },
  // tab点击事件结束
  /**
   * 获取商品详情
   */
  async getProductDetail(id) {
    const result = await requestUtil({
      url: '/product/detail',
      data:{id},
      method: "GET"
    });
    this. productInfo=result.message; 
    this.setData({
      productObj: result.message
    })
  },
  //点击事件，商品加入购物车
  handleCartAdd(){
    this.setCartadd();

    wx.showToast({
      title: '加入成功',
      icon:'success',
      mark:true
    })
  }, 
  //点击购买
  handleBuy(){
    this.setCartadd();
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  //加入购物车
  setCartadd(){
    let cart=wx.getStorageSync('cart')||[];
    console.log("cart="+cart)
    let index=cart.findIndex(v=>v.id==this.productInfo.id);
    if(index===-1){//购物车不存在当前商品
      this.productInfo.num=1;
      this.productInfo.checked=true;
      cart.push(this.productInfo);
    }else{//存在
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);//把购物车添加到缓存中
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})