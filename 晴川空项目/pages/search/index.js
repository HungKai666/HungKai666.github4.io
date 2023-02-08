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
         productList:[], // 商品数组
         inputValue:"", // 输入框的值
         isFocus:false, // 取消 按钮 是否显示
         historyList:[] //存放搜索记录
       },

  TimeoutId:-1,

//光标事件，点击光标显示搜索记录
  handleFocus(e){
    wx.getStorage({
      key:"searchHistory",
      success: (res)=> {
        this.setData({
          historyList:res.data
        })
      }
    })
  },
  // 处理input事件，当输入值时返回查找结果
  handleInput(e){
    const {value}=e.detail;
    if(!value.trim()){
      this.setData({
        productList:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true,
    })
    clearTimeout(this.TimeoutId);
    this.TimeoutId=setTimeout(()=>{
      this.search(value)
    },1000)
  },
  //光标事件，当回车时候以数组形式获取搜索值，去重，
  handleConfirm(ev){
    console.log(ev.detail.value);
    let cloneHistoryList= [...this.data.historyList];
    cloneHistoryList.unshift(ev.detail.value);
    wx.setStorage({
      key:"searchHistory",
      data:[...new Set(cloneHistoryList)]
    })
  },
  //清除记录事件
  handleHistoryDelete(){
    wx.clearStorage({
      key:'searchHistory',
      success:(res)=>{
        this.setData({
          historyList:[]
        })

      }
    })
  },

  //点击取消按钮
  handleCancel(){
    this.setData({
      productList:[], // 商品数组
      inputValue:"", // 输入框的值
      isFocus:false // 取消 按钮 是否显示
    })
  },
    /**

   * 获取商品详情
     */
       async search(q) {
         const result = await requestUtil({
     url: '/product/search',
     data:{q}
         });
         this.setData({
     productList: result.message
         })
       },


  /**

   * 生命周期函数--监听页面加载
     */
       onLoad: function (options) {

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