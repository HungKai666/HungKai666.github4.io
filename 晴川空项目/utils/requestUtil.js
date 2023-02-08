//定义请求根路径baseUrl开始 
const baseUrl="http://localhost:8080";

let ajxaTimes=0;//同时并发请求的次数
//定义请求根路径baseUrl结束

 //返回请求根路径baseUrl开始
export const getBaseUrl=()=>{
  return baseUrl;
}
 //返回请求根路径baseUrl结束

//以上都是封装url

//wx login封装开始
export const getWxLogin=()=>{
 return new Promise((resolve,reject)=>{
  wx.login({
    timeout: 500,
    success:(res)=>{
      resolve(res)
    },
    fail:(err)=>{
      reject(err)
    }
  })
 });
}
 //wx login封装结束

 //getUserProfile封装开始
export const getUserProfile=()=>{
  return new Promise((resolve,reject)=>{
   wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
 }
  //getUserProfile封装结束

/** 
  后端请求工具类开始
  @param {*} params 
 */
export const requestUtil=(params)=>{

  //判断url是否带有/my/请求的是私有的路径 带上header token
  let header={...params.header};
  if(params.url.includes("/my/")){
    //拼接header 带上token
    header["token"]=wx.getStorageSync('token')
  }

// 模拟网络延迟开始
 var start=new Date().getTime();
 console.log(start)
 ajxaTimes++;
 wx.showLoading({
   title: '加载中...',
 })
 while (true) {
   if(new Date().getTime()-start>3*10)break;
 }
// 模拟网络延迟结束


  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header,
      url:baseUrl+params.url,
      success:(result)=>{
       resolve(result.data)
      },
      fail:(err)=>{
        reject(err)
       },
       complete:()=>{
         ajxaTimes--;
         if(ajxaTimes==0)
        wx.hideLoading();//关闭加载图标
       }
    })
  });
}
//后端请求工具类结束