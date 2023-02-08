// 导入request请求工具类开始
import {
  getBaseUrl,
  requestUtil
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
//导入request请求工具类结束

Page({
    //页面的初始数据
  data: {
    latitude: 0, //首次加载维度
    longitude: 0, //首次加载的经度
    mapName: "", //选点的位置
    name:"",
    phone:"",
    baseUrl: '',
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  // 自动定位开始
  moveToLocation() {
    let that = this
    wx.chooseLocation({
        success: function (res) {
            console.log(res.name);
            //赋值给data中的mapName
            that.setData({
                mapName: res.name
            })
        },
        //错误信息
        fail: function () {
            console.log(err);
        }
    })
},
//自动定位结束

  handleChooseAddress(){
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        wx.setStorageSync('address', result)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
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
    console.log("show")
    // const address=wx.getStorageSync('address');
    const mapName=wx.getStorageSync('mapName');
    const cart=wx.getStorageSync('cart')||[];
    // this.setData({
    //   // address
    // })
    this.setData(mapName);
    this.setCart(cart);
  },
  input1(e){
    this.setData({
      name:e.detail.value
    })
  },
  input2(e){
    this.setData({
      phone:e.detail.value
    })
  },
  // 商品选中事件处理
  handleItemChange(e){
    const {id}=e.currentTarget.dataset;
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.id===id);
    console.log(index)
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },

  // 商品全选事件处理
  handleItemAllCheck(){
    let {cart,allChecked}=this.data;
    console.log(cart,allChecked)
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },

  // 商品数量的编辑功能
  handleItemNumEdit(e){
    const {id,operation}=e.currentTarget.dataset;
    console.log(id,operation)
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.id===id);
    if(cart[index].num===1 && operation === -1){
      wx.showModal({
        title:'晴川手机商城提示',
        content:'您是否要删除？',
        cancelColor: 'cancelColor',
        success:(res)=>{
          if(res.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }
        }
      })
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }
  },
  //点击结算
  handlePay(){
    const {mapName,totalNum, name, phone}=this.data;
    if(!mapName){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon:'none'
      })
      return;
    }
    if(totalNum===0){
      wx.showToast({
        title: '您还没有选择商品',
        icon:'none'
      })
      return;
  }
  const info1 = {
    "name":name,
    "phone":phone,
    "mapName":mapName
  }
  wx.setStorageSync('info1',JSON.stringify(info1));
  
  wx.navigateTo({
    url: '/pages/pay/index',
  })
  },

  // 设置购物车状态 重新计算 底部工具栏 全选 总价 总数量 重新设置缓存
  setCart(cart){
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.price*v.num;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })

    // cart设置到缓存中
    wx.setStorageSync('cart', cart);
  }


})