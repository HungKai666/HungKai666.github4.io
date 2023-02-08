// 导入request请求工具类
import {
  getBaseUrl,
  getWxLogin,
  getUserProfile,
  requestPay,
  requestUtil
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    msgList:[
      { title: '小米永远相信美好的事情即将发生！' },
      { title: '2000万柔光双摄,照亮你的美' },
      { title: '迄今为止最惊人的一代 出色的iPhone，如今更出色！' }
],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token=wx.getStorageSync('token');
    if(!token){
      wx.showModal({
        title:'友情提示',
        content:'微信授权登录后，才可进入个人中心',
        success:(res)=>{
          Promise.all([getWxLogin(),getUserProfile()]).then((res)=>{
            console.log(res[0].code);
            console.log(res[1].userInfo.nickName,res[1].userInfo.avatarUrl)
            let loginParam={
              code:res[0].code,
              nickName:res[1].userInfo.nickName,
              avatarUrl:res[1].userInfo.avatarUrl
            }
            console.log(loginParam)
            wx.setStorageSync('userInfo', res[1].userInfo);
            this.wxlogin(loginParam);
            this.setData({
              userInfo:res[1].userInfo
            })
          })
        }
      })
    }else{
      console.log("token存在："+token);
      const userInfo=wx.getStorageSync('userInfo')
      this.setData({
        userInfo
      })
    }
  },

  /**
   * 请求后端获取用户token
   * @param {*} loginParam 
   */
  async wxlogin(loginParam){
    const result=await requestUtil({url:"/user/wxlogin",data:loginParam,method:"post"});
    console.log(result);
    const token=result.token;
    if(result.code===0){
      // 存储token到缓存
      wx.setStorageSync('token', token);
      // 支付继续走，创建订单
      console.log("支付继续走，创建订单");
      
    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示（滚动字幕）
   */
  onShow: function () {
    

  },
  handleChooseAddress(){
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        wx.setStorageSync('address', result)
      },
    })
  },
//滚动函数开始
 
  //滚动函数结束


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