// 导入request请求工具类
import {
  getBaseUrl,
  requestUtil,
  getWxLogin,
  getUserProfile,
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapName:"",
    phone:"",
    name:"",
    baseUrl: '',
    cart:[],
    totalPrice:0,
    totalNum:0
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
//处理订单支付
  async handleOrderPay(){
    // wx.login({
    //   timeout: 500,
    //   success:(res)=>{
    //     console.log(res.code)
    //   }
    // })
    //已经封装到reques中

    // let res=await getWxLogin();
    // console.log(res.code)


    // wx.getUserProfile({
    //   desc: '获取用户信息',
    //   success:(res)=>{
    //     console.log(res.userInfo.nickName,res.userInfo.avatarUrl)
    //   }
    // })
    //已经封装到reques中

    // let res2=await getUserProfile();
    // console.log(res2.userInfo.nickName,res2.userInfo.avatarUrl)

    const token=wx.getStorageSync('token');
    if(!token){
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
      })
    }else{
      console.log("token存在:"+token);
      console.log("支付继续进行，创建订单");
      this.createOrder();
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
    //存储token到缓存
    wx.setStorageSync('token', token);
    //创建订单
    console.log("继续支付，创建订单");
    this.createOrder();
  }
},

/**
 * 创建订单
 * 
 */
async createOrder(){
  try{
    const totalPrice=this.data.totalPrice;
  // const address=this.data.address.provinceName+this.data.address.cityName+this.data.address.countyName+this.data.address.detailInfo;
  // const consignee=this.data.address.userName;
  const consignee=this.data.name;
   const telNumber=this.data.phone;
    const mapName=this.data.mapName;
  let goods=[];
  this.data.cart.forEach(v=>goods.push({
    goodsId:v.id,
    goodsNumder:v.num,
    goodsPrice:v.price,
    goodsName:v.name,
    goodsPic:v.proPic
  }))
  const orderParam={
    totalPrice,
    // address,
    mapName,
    consignee,
    telNumber,
    goods
  }
  const res=await requestUtil({url:"/my/order/create",method:"POST",data:orderParam});
  console.log("orderNo="+res.orderNo);
  //  删除缓存中，已经支付的商品
  let newCart=wx.getStorageSync('cart');
  newCart=newCart.filter(v=>!v.checked);

  wx.setStorageSync('cart', newCart);

  wx.showToast({
    title: '支付成功',
    icon:'success',
    mark:true
  })
  console.log('支付成功')
  wx.navigateTo({
    url: '/pages/order/index?type=0',
  })
  }catch(error){
    console.log(error);
    wx.showToast({
      title: '支付失败，请重试',
      icon:'none'
    })
    console.log('支付失败')
  }
},
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show")
    // const address=wx.getStorageSync('address');
    const info1= JSON.parse(wx.getStorageSync('info1'));
    this.setData({
      name:info1.name,
      phone:info1.phone,
      mapName:info1.mapName
    })
    const mapName=wx.getStorageSync('mapName');
    let cart=wx.getStorageSync('cart')||[];
    cart=cart.filter(v=>v.checked);
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      totalPrice+=v.price*v.num;
      totalNum+=v.num;
    })
    
    this.setData({
      cart,
      totalNum,
      // address     
      totalPrice
    })
  },

})