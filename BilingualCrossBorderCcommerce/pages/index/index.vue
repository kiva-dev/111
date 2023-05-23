<template>
  <view class="template-index tn-safe-area-inset-bottom">
    <view class="tit-box">
      <view class="tit-img">
        <image class="tit-image" src="../../static/images/index/logo-text.png" mode=""></image>
      </view>
      <view class="tit-text">{{$t('home.max-title')}}</view>
    </view>

    <!-- 搜素加背景 -->
    <view class="head-bg">
      <view class="search">
        <view class="left">
          <view class="sao-img">
            <image class="sao" src="../../static/images/search1.png" mode=""></image>
          </view>
          <view class="input" @click.stop="navigateTos('/pages/index/search')">
            <text>{{$t('home.iPhone')}}</text>
            <!-- <input type="text" disabled value="" placeholder="iPhone 12特价"/> -->
          </view>
        </view>
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="banner-box">
      <swiper class="card-swiper" @click="tn('/homePages/navigation')" :circular="true" :autoplay="true" duration="500" interval="8000" @change="cardSwiper">
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <navigator v-if="item.goods_type==1" :url="'pages/class/Gdetail?id=' + item.good_id" hover-class="none" class="swiper-item image-banner">
            <image :src="item.image" mode="aspectFill"></image>
          </navigator>
          <navigator v-else-if="item.goods_type==2" :url="'/pages/index/detail?id=' + item.good_id" hover-class="none" class="swiper-item image-banner">
            <image :src="item.image" mode="aspectFill"></image>
          </navigator>
          <view v-else class="swiper-item image-banner">
            <image :src="item.image" mode="aspectFill"></image>
          </view>
          <view class="swiper-item-text">
            <view class="tn-text-bold tn-color-white" style="font-size: 90rpx;">{{item.title}}</view>
            <view class="tn-color-white tn-padding-top" style="font-size: 30rpx;">{{item.name}}</view>
            <view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">{{item.text}}</view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图小圆点 -->
    <view class="indication">
      <block v-for="(item,index) in swiperList" :key="index">
        <view class="spot" :class="cardCur==index?'active':''"></view>
      </block>
    </view>
    <!-- 分类模块 -->
    <view class="up-box"></view>
    <view class="classify-box">
      <view class="classify">
        <view class="item" v-for="(em, i) in FirstList" :key="i" @click="goCLass(i)">
          <view class="icon-img">
            <image class="icon" :src="em.image" mode=""></image>
          </view>
          <view class="name">{{ em.name }}</view>
        </view>
      </view>
    </view>
    <!-- 分享 -->
    <view class="img-box">
      <navigator url="/pages/invite/invite" hover-class="none" class="img-img">
        <image v-if="isShopCont" class="img-image" mode="widthFix" src="../../static/yaoqing.png"></image>
        <image v-else class="img-image" mode="widthFix" src="../../static/images/mine/mine7.png"></image>
      </navigator>
    </view>

    <view class="lf-box">
      <view class="lf-list">
        <navigator url="./bargain" hover-class="none" class="lf-item">
          <image v-if="isShopCont" class="lf-image" src="../../static/images/index/imgs-yw.png" mode=""></image>
          <image v-else class="lf-image" src="../../static/images/index/imgs.png" mode=""></image>
        </navigator>
        <navigator url="./password" hover-class="none" class="lf-item" @click="goAuction">
          <image v-if="isShopCont" class="lf-image" src="../../static/images/index/imgs-r-yw.png" mode=""></image>
          <image v-else class="lf-image" src="../../static/images/index/imgs-r.png" mode=""></image>
        </navigator>
      </view>
    </view>

    <view class="ts-box">
      <view class="ts-list">
        <view class="ts-img">
          <image class="ts-image" src="../../static/images/index/left-image.png" mode=""></image>
        </view>
        <view class="ts-text">{{$t('home.title')}}</view>
        <view class="ts-img">
          <image class="ts-image" src="../../static/images/index/right-image.png" mode=""></image>
        </view>
      </view>
    </view>

    <scroll-view id="tab-bar" scroll-with-animation class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false">
      <view v-for="(tab, index) in tabBars" :key="index" class="tui-tab-item" :id="tab.id" :data-current="tab.id" @click="tabClick(tab.id)">
        <view class="tui-tab-item-title" :class="{ 'tui-tab-item-title-active': tabIndex == tab.id }">{{ tab.name }}</view>
        <view class="tui-tab-line" v-if="tabIndex == tab.id"></view>
      </view>
    </scroll-view>

    <view class="nodata-block"></view>

    <view class="data-box">
      <view class="data-head">
        <view class="head-item" :class="sort==1?'active':''" @click="onZonghe">
          <view class="head-texts">{{$t('home.zxin')}}</view>
          <view class="head-imgbox">
            <view class="head-img">
              <!-- <image class="head-image" src="../../static/images/icon3.png"></image> -->
            </view>
            <view class="head-img" v-if="sort==1">
              <image class="head-image" src="../../static/images/icon1.png"></image>
            </view>
            <view class="head-img" v-else>
              <image class="head-image" src="../../static/images/icon2.png"></image>
            </view>
          </view>
        </view>
        <view class="head-item" :class="sort==2?'active':sort==3?'active':''" @click="onXiaoliang">
          <view class="head-text">{{$t('home.xiaoliang')}}</view>
          <view class="head-imgbox">
            <block v-if="sort==2">
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon3.png"></image>
              </view>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon1.png"></image>
              </view>
            </block>
            <block v-else-if="sort==3">
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon17.png"></image>
              </view>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon2.png"></image>
              </view>
            </block>
            <block v-else>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon3.png"></image>
              </view>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon2.png"></image>
              </view>
            </block>
          </view>
        </view>
        <view class="head-item" :class="sort==4?'active':sort==5?'active':''" @click="onMouth">
          <view class="head-text">{{$t('home.jiage')}}</view>
          <view class="head-imgbox">
            <block v-if="sort==4">
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon3.png"></image>
              </view>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon1.png"></image>
              </view>
            </block>
            <block v-else-if="sort==5">
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon17.png"></image>
              </view>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon2.png"></image>
              </view>
            </block>
            <block v-else>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon3.png"></image>
              </view>
              <view class="head-img">
                <image class="head-image" src="../../static/images/icon2.png"></image>
              </view>
            </block>
          </view>
        </view>
      </view>
      <!-- 详细数据 -->
      <view class="data-list">
        <!-- 页面内容 -->
        <view class="tn-padding-sm" v-if="GoodsList.length">
          <navigator :url="'../class/Gdetail?id='+item.goods_id" hover-class="none" v-for="item in GoodsList" :key="item.id" class="product__item">
            <view class="box">
              <view class="item_image" style="height:335rpx;">
                <image class="img" style="border-radius: 20rpx;" :src="item.image" mode=""></image>
              </view>
              <view class="item__data">
                <view class="item__title-container" style=" height: 70rpx;">
                  <text class="item__title">{{ item.goods_name }}</text>
                </view>
                <view class="price-sales">
                  <view class="item__price-container color-red">
                    <text class="item__price--unit">RM</text>
                    <text class="item__price--integer">{{ item.goods_price }}</text>
                  </view>
                  <view class="sales-num">{{$t('home.xiaoliang')}}{{item.sales_actual}}</view>
                </view>
                <view class="sname-box flex-center" @click.stop="onshopCont(item)">
                  <view class="sname-icon">
                    <image class="sname-image" src="../../static/images/index/dianpu.png" mode=""></image>
                  </view>
                  <view class="sname-text">{{item.shop_name}}</view>
                  <view class="more-img">
                    <image class="more-image" src="../../static/images/index/more.png" mode=""></image>
                  </view>
                </view>
              </view>
            </view>
          </navigator>
        </view>
        <view v-else class="zanwusju">
          <image src="/static/images/zanwusju.png" />
          <view class="title">~{{$t('home.zanwushuju')}}~</view>
        </view>
      </view>
    </view>

    <view class='tn-tabbar-height'></view>
    <!--优惠券弹出 start-->
    <view class="ticket-pop" v-show="show1">
      <view class="ticket-box">
        <view class="ticket-bg">
          <image class="img" src="../../static/images/ticket1.png"></image>
        </view>
        <view class="ticket-con">
          <view class="ticket-t">{{$t('home.gxxsyhq')}}</view>
          <!--ticket-ul start-->
          <view class="ticket-ul">
            <view v-for="item in CouponList" :key="item.id" class="ticket-li">
              <view class="li-bg">
                <image class="img" src="../../static/images/ticket2.png"></image>
              </view>
              <view class="li-fl">
                <view class="li-t">
                  <view class="price">
                    RM<text class="f-40">{{$filter.formatValue(item.money, 'split')[0]}}</text>.{{$filter.formatValue(item.money, 'split')[1] ? $filter.formatValue(item.money, 'split')[1] : '00'}}
                  </view>
                </view>
                <view class="li-c">
                  <view class="c">{{$t('home.man')}}{{item.use_limit}}{{$t('home.keyong')}}</view>
                </view>
              </view>
              <view class="li-fr">
                <view class="li-t">
                  <view class="t">{{$t('home.yhq')}}</view>
                </view>
                <view class="li-line"></view>
                <view class="li-c">
                  <view class="date">{{$t('home.yxq')}}{{item.days}}{{$t('home.day')}}</view>
                </view>
              </view>
            </view>
          </view>
          <!--ticket-ul end-->
          <view class="ticket-bot" @click="onOrderGetCoupon">{{$t('home.lingqu')}}</view>
        </view>
        <view class="ticket-close" @click="hide1">
          <image class="img" src="../../static/images/close3.png"></image>
        </view>
      </view>
    </view>
    <!--优惠券弹出 end-->

  </view>
</template>

<script>
import md5 from 'js-md5';
import axios from 'axios';
export default {
  name: 'Index',
  data () {
    return {
      show1: false,
      cardCur: 0,
      isAndroid: true,
      swiperList: [],// 轮播图
      cardCur2: 0,
      tabIndex: 0, // 默认
      tabBars: [{ name: this.$t('home.quanbu'), id: '' }],
      // loadStatus: 'loadmore',
      list: [],
      GoodsList: [],// 商品列表
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      c_id: '',// 一级分类id
      sort: 1,// 1最新，2销量高到低，3销量低到高，4价格高到低，5价格低到高
      keyword: '',// 搜索关键词
      recom: 1,// 1推荐商品，0未推荐商品，空字符串全部商品
      goods_type: 1,// 1普通商品，2团购商品，除团购模块都传1
      FirstList: [],// 分类
      CouponList: [],// 优惠券列表
      isShopCont: false,// 中文还是英文
    }
  },
  onLoad () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    // 轮播图
    this.$http.post(this.$apiObj.bannerList).then(res => {
      if (res.code == 1) {
        this.swiperList = res.data
      }
    })
    // 一级分类
    this.$http.post(this.$apiObj.IndexFirstCate).then(res => {
      if (res.code == 1) {
        if (this.isShopCont) {
          res.data.map(item => {
            item.name = this.getCaption(item.name, 1) ? this.getCaption(item.name, 1) : item.name
          })
        } else {
          res.data.map(item => {
            item.name = this.getCaption(item.name, 0) ? this.getCaption(item.name, 0) : item.name
          })
        }
        this.FirstList = res.data
        this.tabBars = [...this.tabBars, ...res.data]
      }
    })
  },
  onShow () {
    this.page = 1
    this.sort = 1
    this.GoodsList = []
    // 商品列表
    this.onIndexGoodsList()
    // 优惠券列表
    if (uni.getStorageSync('token')) {
      this.$http.post(this.$apiObj.OrderNotgetCouponList).then(res => {
        if (res.code == 1) {
          let arr = []
          for (let i in res.data) {
            let addTime = this.addDate(this.$filter.to_date_time(res.data[i].addtime), res.data[i].days);//当前时间加到期天数 
            // 获取当前时间
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            let hours = date.getHours();//取小时
            let minutes = date.getMinutes();//取分钟
            let seconds = date.getSeconds();//取秒 
            let currentdate = year + "-" + month + "-" + strDate + " " + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
            // 比较时间大小
            let isShow = this.compareDate(addTime, currentdate)
            if (isShow) {
              arr.push(res.data[i])
            }
          }
          this.CouponList = arr
          if (this.CouponList.length > 0) {
            this.show1 = true
          }
        }
      })
    }
  },
  created () {
    // const systemInfo = uni.getSystemInfoSync()
    // if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
    //   this.isAndroid = false
    // } else {
    //   this.isAndroid = true
    // }
  },
  mounted () {
    // this.getRandomData()
  },
  methods: {
    // 比较日期大小，可以直接进行比较
    compareDate (date1, date2) {
      var date1 = new Date(date1);
      var date2 = new Date(date2);
      if (date1.getTime() > date2.getTime()) {
        return true;
      } else {
        return false;
      }
    },
    // 日期加天数
    addDate (date, days) {
      if (days == undefined || days == '') {
        days = 1;
      }
      var date = new Date(date);
      date.setDate(date.getDate() + days);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      let seconds = date.getSeconds();//取秒 
      var time = date.getFullYear() + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day) + " " + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
      return time;
    },
    // 点击综合
    onZonghe () {
      this.page = 1
      this.sort = 1
      this.GoodsList = []
      this.onIndexGoodsList()
    },
    // 点击销量
    onXiaoliang () {
      this.page = 1
      this.sort = this.sort == 2 ? 3 : 2
      this.GoodsList = []
      this.onIndexGoodsList()
    },
    // 点击价格
    onMouth () {
      this.page = 1
      this.sort = this.sort == 4 ? 5 : 4
      this.GoodsList = []
      this.onIndexGoodsList()
    },
    goCLass (i) {
      uni.setStorageSync('isNum', i)
      uni.switchTab({
        url: '/pages/class/class'
      })
    },
    // 商品列表
    onIndexGoodsList () {
      this.$http.post(this.$apiObj.IndexGoodsList, { page: this.page, pagenum: this.pagenum, c_id: this.c_id, sort: this.sort, keyword: this.keyword, recom: this.recom, goods_type: this.goods_type }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
            })
          } else {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 0) : item.goods_name
            })
          }
          this.totalPageNum = res.data.total
          this.GoodsList = this.page == 1 ? res.data.data : [...this.GoodsList, ...res.data.data]
        }
      })
    },
    getCaption (str, state) {
      if (state == 1) {
        if (str == undefined) {
          str = str
        } else {
          var indexs = str.indexOf("|")
          str = str.substring(indexs + 1, str.length);
        }
      } else {
        var index = str.indexOf("|")
        str = str.substring(0, index);
      }
      return str;
    },
    onshopCont (item) {
      uni.setStorageSync('shop_id', item.admin_id)
      uni.navigateTo({
        url: '/pages/class/shop/shop'
      });
    },
    hide1 () { this.show1 = !this.show1; },
    goAuction () {
      uni.switchTab({
        url: '../auction/auction'
      })
    },
    // 轮播图
    cardSwiper (e) {
      this.cardCur = e.detail.current
    },
    // 跳转
    tn (e) {
      uni.navigateTo({
        url: e,
      });
    },
    navigateTos (url) {
      uni.navigateTo({
        url: url
      })
    },
    // 点击推荐商品分类切换
    tabClick (e) {
      this.tabIndex = e
      this.c_id = e
      this.page = 1
      this.GoodsList = []
      this.onIndexGoodsList()
    },
    // 领取优惠券
    onOrderGetCoupon () {
      let coupon_ids = []
      for (let i in this.CouponList) {
        coupon_ids.push(this.CouponList[i].id)
      }
      this.$http.post(this.$apiObj.OrderGetCoupon, { coupon_ids: coupon_ids.toString() }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('home.lingqucg'), icon: 'none' })
          this.show1 = false
        }
      })
    }
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onIndexGoodsList()
  }
}
</script>

<style lang="scss" scoped>
.template-index {
  max-height: 100vh;
}
.tn-tabbar-height {
  min-height: 100rpx;
  height: calc(120rpx + env(safe-area-inset-bottom) / 2);
}

/* 轮播视觉差 start */
.card-swiper {
  height: 250rpx !important;
  border-radius: 10rpx !important;
}

.card-swiper swiper-item {
  width: 690rpx !important;
  left: 0rpx;
  box-sizing: border-box;
  border-radius: 10rpx !important;
  // padding: 0rpx 30rpx 90rpx 30rpx;
  overflow: initial;
}

.card-swiper swiper-item .swiper-item {
  width: 100%;
  border-radius: 10rpx;
  display: block;
  height: 100%;
  transform: scale(1);
  transition: all 0.2s ease-in 0s;
  overflow: hidden;
}

.card-swiper swiper-item.cur .swiper-item {
  border-radius: 10rpx;
  transform: none;
  transition: all 0.2s ease-in 0s;
}

.card-swiper swiper-item .swiper-item-text {
  border-radius: 10rpx;
  margin-top: -260rpx;
  text-align: center;
  width: 100%;
  display: block;
  height: 50%;
  border-radius: 10rpx;
  transform: translate(100rpx, -60rpx) scale(0.9, 0.9);
  transition: all 0.6s ease 0s;
  overflow: hidden;
}

.card-swiper swiper-item.cur .swiper-item-text {
  border-radius: 10rpx;
  margin-top: -320rpx;
  width: 100%;
  transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
  transition: all 0.6s ease 0s;
}

.image-banner {
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-banner image {
  border-radius: 10rpx;
  width: 100%;
  height: 100%;
}

/* 轮播指示点 start*/
.indication {
  z-index: 9999;
  width: 100%;
  height: 36rpx;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.spot {
  background-color: #ffffff;
  opacity: 0.6;
  width: 10rpx;
  height: 10rpx;
  border-radius: 20rpx;
  top: -180rpx;
  margin: 0 8rpx !important;
  position: relative;
}

.spot.active {
  opacity: 1;
  width: 30rpx;
  background-color: #ffffff;
}

/* 简历推荐 start */
.card-swiper2 {
  height: 420rpx !important;
  overflow: hidden;
}

.card-swiper2 swiper-item {
  width: 680rpx !important;
  left: 30rpx;
  box-sizing: border-box;
  overflow: initial;
  padding: 0 0rpx 40rpx 0;
}

.card-swiper2 swiper-item .swiper-item1 {
  width: 100%;
  display: block;
  height: 100%;
  transform: scale(0.97);
  transition: all 0.2s ease-in 0s;
  background-color: #e7fafe;
}

.card-swiper2 swiper-item.cur .swiper-item1 {
  transform: none;
  transition: all 0.2s ease-in 0s;
}

.card-swiper2 swiper-item .swiper-item2 {
  margin-top: -120rpx;
  width: 100%;
  display: block;
  height: 50%;
  border-radius: 50%;
  transform: translate(480rpx, -150rpx) scale(0.9, 0.9);
  transition: all 0.3s ease 0s;
}

.card-swiper2 swiper-item.cur .swiper-item2 {
  margin-top: -180rpx;
  width: 100%;
  transform: translate(510rpx, -150rpx) scale(0.9, 0.9);
  transition: all 0.3s ease 0s;
}

.card-swiper2 swiper-item .swiper-item-text {
  margin-top: -210rpx;
  width: 100%;
  display: block;
  height: 100%;
  border-radius: 10rpx;
  transform: translate(30rpx, -80rpx) scale(0.8, 0.8);
  transition: all 0.6s ease 0s;
  overflow: hidden;
}

.card-swiper2 swiper-item.cur .swiper-item-text {
  margin-top: -270rpx;
  width: 100%;
  transform: translate(20rpx, 0rpx) scale(0.9, 0.9);
  transition: all 0.6s ease 0s;
}

/* 底部tabbar假阴影 start*/
.bg-tabbar-shadow {
  background-image: repeating-linear-gradient(
    to top,
    rgba(0, 0, 0, 0.1) 10rpx,
    #ffffff,
    #ffffff
  );
  position: fixed;
  bottom: 0;
  height: 450rpx;
  width: 100vw;
  z-index: -1;
}

/* 图标容器12 start */
.tn-three {
  position: absolute;
  top: 50%;
  right: 50%;
  bottom: 50%;
  left: 50%;
  transform: translate(-38rpx, -20rpx) rotateX(20deg) rotateY(10deg)
    rotateZ(-20deg);
  text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0,
    -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
}
.item_image img {
  border-radius: 10rpx;
}
.icon12 {
  &__item {
    width: 30%;
    background-color: #ffffff;
    border-radius: 10rpx;
    padding: 30rpx;
    margin: 20rpx 10rpx;
    transform: scale(1);
    transition: transform 0.3s linear;
    transform-origin: center center;

    &--icon {
      width: 100rpx;
      height: 100rpx;
      font-size: 60rpx;
      border-radius: 50%;
      margin-bottom: 18rpx;
      position: relative;
      z-index: 1;

      &::after {
        content: " ";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 1;
        transform: scale(1, 1);
        background-size: 100% 100%;
        background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg6.png);
      }
    }
  }
}

/* 自定义导航栏内容 start */
.custom-nav {
  height: 100%;

  &__back {
    margin: auto 5rpx;
    font-size: 40rpx;
    margin-right: 10rpx;
    margin-left: 30rpx;
    flex-basis: 5%;
  }

  &__search {
    flex-basis: 60%;
    width: 100%;
    height: 100%;

    &__box {
      width: 100%;
      height: 70%;
      padding: 10rpx 0;
      margin: 0 30rpx;
      border-radius: 60rpx 60rpx 0 60rpx;
      font-size: 24rpx;
    }

    &__icon {
      padding-right: 10rpx;
      margin-left: 20rpx;
      font-size: 30rpx;
    }

    &__text {
      // color: #AAAAAA;
    }
  }
}
.logo-image {
  width: 65rpx;
  height: 65rpx;
  position: relative;
}
.logo-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 50%;
}
/* 自定义导航栏内容 end */

/* 热门图片 start*/
.image-tuniao1 {
  padding: 164rpx 0rpx;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}
.image-tuniao2 {
  padding: 75rpx 0rpx;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}
.image-tuniao3 {
  padding: 90rpx 0rpx;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}
.image-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 10rpx;
}
/* 胶囊banner*/
.image-capsule {
  padding: 100rpx 0rpx;
  font-size: 40rpx;
  font-weight: 300;
  position: relative;
}
.image-piccapsule {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 20rpx 20rpx 0 0;
}

/* 标题 start */
.nav_title {
  -webkit-background-clip: text;
  color: transparent;

  &--wrap {
    position: relative;
    display: flex;
    height: 120rpx;
    font-size: 46rpx;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-image: url(https://tnuiimage.tnkjapp.com/title_bg/title00.png);
    background-size: cover;
  }
}
/* 标题 end */

/* 业务展示 start */
.tn-info {
  &__container {
    margin-top: 10rpx;
    margin-bottom: 50rpx;
  }

  &__item {
    width: 47.7%;
    margin: 15rpx 0rpx 30rpx 0rpx;
    padding: 40rpx 30rpx;
    border-radius: 10rpx;

    position: relative;
    z-index: 1;

    &::after {
      content: " ";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      border-radius: inherit;
      opacity: 1;
      transform: scale(1, 1);
      background-size: 100% 100%;
      background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/2.png);
    }

    &__left {
      &--icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        font-size: 40rpx;
        margin-right: 20rpx;
        position: relative;
        z-index: 1;

        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg5.png);
        }
      }

      &__content {
        font-size: 25rpx;

        &--data {
          color: rgba(255, 255, 255, 0.5);
          margin-top: 5rpx;
          // font-weight: bold;
        }
      }
    }

    &__right {
      &--icon {
        position: absolute;
        right: 0rpx;
        top: 50rpx;
        font-size: 100rpx;
        width: 108rpx;
        height: 108rpx;
        text-align: center;
        line-height: 60rpx;
        opacity: 0.15;
      }
    }
    &__bottom {
      box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.12);
      border-radius: 0 0 10rpx 10rpx;
      position: absolute;
      width: 85%;
      line-height: 15rpx;
      left: 50%;
      bottom: -15rpx;
      transform: translateX(-50%);
      z-index: -1;
      text-align: center;
    }
  }
}
/* 业务展示 end */

/* 底部tabbar start*/
.footerfixed {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
  background-color: #ffffff;
  box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
}

.tabbar {
  display: flex;
  align-items: center;
  min-height: 110rpx;
  justify-content: space-between;
  padding: 0;
  height: calc(110rpx + env(safe-area-inset-bottom) / 2);
  padding-bottom: calc(env(safe-area-inset-bottom) / 2);
}

.tabbar .action {
  font-size: 22rpx;
  position: relative;
  flex: 1;
  text-align: center;
  padding: 0;
  display: block;
  height: auto;
  line-height: 1;
  margin: 0;
  overflow: initial;
}

.bar-center {
  animation: suspension 3s ease-in-out infinite;
}

@keyframes suspension {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.8rem);
  }
}

.tabbar .action .bar-icon {
  width: 100rpx;
  position: relative;
  display: block;
  height: auto;
  margin: 0 auto 10rpx;
  text-align: center;
  font-size: 42rpx;
  // line-height: 50rpx;
}

.tabbar .action .bar-icon image {
  width: 50rpx;
  height: 50rpx;
  display: inline-block;
}

.tabbar .action .bar-circle {
  position: relative;
  display: block;
  margin: 0rpx auto 0rpx;
  text-align: center;
  font-size: 52rpx;
  line-height: 90rpx;
  // background-color: #01BEFF;
  width: 100rpx !important;
  height: 100rpx !important;
  overflow: hidden;
  // border-radius: 50%;
  // box-shadow: 0px 10px 30px rgba(70,23,129, 0.12),
  //   0px -8px 40px rgba(255, 255, 255, 1),
  //   inset 0px -10px 10px rgba(70,23,129, 0.05),
  //   inset 0px 10px 20px rgba(255, 255, 255, 1);
  // box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(1, 190, 255, 0.5);
}

.tabbar .action .bar-circle image {
  width: 100rpx;
  height: 100rpx;
  display: inline-block;
  margin: 0rpx auto 0rpx;
}

/* 流星+悬浮 */
.nav-index-button {
  animation: suspension 3s ease-in-out infinite;
  z-index: 999999;

  &__content {
    position: absolute;
    width: 100rpx;
    height: 100rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &--icon {
      width: 100rpx;
      height: 100rpx;
      font-size: 60rpx;
      border-radius: 50%;
      margin-bottom: 18rpx;
      position: relative;
      z-index: 1;
      transform: scale(0.85);

      &::after {
        content: " ";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 1;
        transform: scale(1, 1);
        background-size: 100% 100%;
        // background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg6.png);
      }
    }
  }

  &__meteor {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100rpx;
    height: 100rpx;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%) rotateY(75deg) rotateZ(10deg);

    &__wrapper {
      width: 100rpx;
      height: 100rpx;
      transform-style: preserve-3d;
      animation: spin 20s linear infinite;
    }

    &__item {
      position: absolute;
      width: 100rpx;
      height: 100rpx;
      border-radius: 1000rpx;
      left: 0;
      top: 0;

      &--pic {
        display: block;
        width: 100%;
        height: 100%;
        background: url(https://tnuiimage.tnkjapp.com/cool_bg_image/arc1.png)
          no-repeat center center;
        background-size: 100% 100%;
        animation: arc 4s linear infinite;
      }
    }
  }
}

@keyframes suspension {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.6rem);
  }
}

@keyframes spin {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(-360deg);
  }
}

@keyframes arc {
  to {
    transform: rotate(360deg);
  }
}

.banner-box {
  position: relative;
  top: -130rpx;
  left: 0rpx;
  right: 0rpx;
  margin: 0 auto;
  width: 690rpx;
  // height: 250rpx;
  background: #000000;
  border-radius: 10rpx;
}
// 背景加搜索
.head-bg {
  width: 750rpx;
  height: 400rpx;
  background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
  border-radius: 0rpx 0rpx 30rpx 30rpx;
  .search {
    position: relative;
    top: 152rpx;
    // left: 30rpx;
    // width: 510rpx;
    // height: 64rpx;
    background: #ffffff;
    border-radius: 32rpx;

    margin: 0 auto;
    width: 690rpx;
    height: 70rpx;
    background: #ffffff;
    border-radius: 35rpx;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      margin-left: 20rpx;
      display: flex;
      align-items: center;
      .sao-img {
        display: flex;
        align-items: center;
        .sao {
          width: 36rpx;
          height: 36rpx;
        }
      }
      .input {
        margin-left: 20rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .photo-img {
        margin-right: 20rpx;
        display: flex;
        align-items: center;
        .photo {
          width: 36rpx;
          height: 36rpx;
        }
      }
      .btn {
        text-align: center;
        line-height: 60rpx;
        width: 120rpx;
        height: 60rpx;
        background: #fe871d;
        border-radius: 30rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}

// 分类模块s
// .up-box {
// 	position: relative;
// 	bottom: 100rpx;
// 	width: 100%;
// 	height: 20rpx;
// 	background-color: #f5f5f5;
// }
.classify-box {
  position: relative;
  bottom: 100rpx;
}
.classify {
  padding: 0rpx 10rpx 40rpx 10rpx;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 20%;
    // display: flex;
    // align-items: center;
    .icon-img {
      margin: 40rpx 0 10rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 86rpx;
        height: 96rpx;
      }
    }
    .name {
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }
}

.tit-box {
  position: absolute;
  top: 90rpx;
  left: 0;
  right: 0;
  z-index: 9;
  padding: 0rpx 30rpx;
  display: flex;
  align-items: center;
  .tit-img {
    display: flex;
    align-items: center;
    .tit-image {
      width: 144rpx;
      height: 24rpx;
    }
  }
  .tit-text {
    margin-left: 20rpx;
    font-size: 26rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }
}

.img-box {
  position: relative;
  bottom: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .img-img {
    display: flex;
    align-items: center;
    .img-image {
      width: 690rpx;
      height: 200rpx;
      background: #aea8e7;
      border-radius: 20rpx;
    }
  }
}

.lf-box {
  padding: 0 30rpx;
  .lf-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .lf-item {
      .lf-image {
        width: 335rpx;
        height: 190rpx;
        // background: linear-gradient(135deg, rgba(89,72,155,0.1000) 0%, rgba(255,255,255,0.1000) 100%);
        border-radius: 10rpx;
      }
    }
  }
}

.ts-box {
  padding: 30rpx 0rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .ts-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ts-img {
      display: flex;
      align-items: center;
      .ts-image {
        width: 30rpx;
        height: 14rpx;
      }
    }
    .ts-text {
      margin: 0 30rpx;
      font-size: 30rpx;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #000000;
    }
  }
}

.tui-scroll-h {
  width: 100%;
  // height: 80rpx;
  // background: #01C55E;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  /* #ifndef APP-PLUS */

  /* #endif */
  /* #ifdef H5 */
  // position: fixed;
  // top: 44px;
  // left: 0;
  // z-index:999;
  /* #endif */
  background: #ffffff;
  // position: fixed;
  // top: 86rpx;
  // left: 0;
  // z-index:999;
}

.tui-line-h {
  /* #ifdef APP-PLUS */
  height: 1rpx;
  background-color: #cccccc;
  /* #endif */
  position: relative;
}

/* #ifndef APP-PLUS*/
.tui-line-h::after {
  content: "";
  position: absolute;
  border-bottom: 1rpx solid #cccccc;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  bottom: 0;
  right: 0;
  left: 0;
}

/* #endif */

.tui-tab-item {
  padding: 10rpx 0rpx 0rpx 0rpx;
  /* #ifndef APP-PLUS */
  // display: inline-block;
  /* #endif */
  display: inline-block;
  flex-wrap: nowrap;
  padding-left: 34rpx;
  padding-right: 34rpx;
}

.tui-tab-item-title {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #666666;
  // height: 80rpx;
  // line-height: 80rpx;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

.tui-tab-item-title-active {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #fc0609;
  text-align: center;
  // border-bottom: 4rpx solid #fff;
  // border-bottom-width: 4rpx;
}

.tui-swiper-box {
  flex: 1 !important;
  /* #ifdef H5 */
  // margin-top: 80rpx;
  /* #endif */
}

.tui-swiper-item {
  flex: 1 !important;
  flex-direction: row;
}

.tui-scroll-v {
  flex: 1;
  /* #ifndef MP-ALIPAY */
  flex-direction: column;
  /* #endif */
  width: 750rpx;
}

.tui-tab-line {
  margin: 0 auto;
  margin-top: 14rpx;
  text-align: center;
  width: 32rpx;
  height: 4rpx;
  background: #fc0609;
  border-radius: 2rpx;
}

.tui-refresh-icon {
  width: 20px;
  height: 20px;
  transition-duration: 0.25s;
  transition-property: transform;
  transform: rotate(0deg);
  transform-origin: 10px 10px;
}

.ui-scroll-h {
  width: 100%;
  // height: 80rpx;
  // background: #01C55E;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  /* #ifndef APP-PLUS */

  /* #endif */
  /* #ifdef H5 */
  // position: fixed;
  // top: 44px;
  // left: 0;
  // z-index:999;
  /* #endif */
  background: #ffffff;
  position: fixed;
  top: 140rpx;
  left: 0;
  z-index: 999;
}

.ui-line-h {
  /* #ifdef APP-PLUS */
  height: 1rpx;
  background-color: #cccccc;
  /* #endif */
  position: relative;
}

/* #ifndef APP-PLUS*/
.ui-line-h::after {
  content: "";
  position: absolute;
  border-bottom: 1rpx solid #cccccc;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  bottom: 0;
  right: 0;
  left: 0;
}

/* #endif */

.ui-tab-item {
  padding: 10rpx 0rpx 10rpx 0rpx;
  /* #ifndef APP-PLUS */
  // display: inline-block;
  /* #endif */
  display: inline-block;
  flex-wrap: nowrap;
  padding-left: 34rpx;
  padding-right: 34rpx;
}

.ui-tab-item-title {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #666666;
  // height: 80rpx;
  // line-height: 80rpx;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

.ui-tab-item-title-active {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #be976b;
  text-align: center;
  // border-bottom: 4rpx solid #fff;
  // border-bottom-width: 4rpx;
}

.ui-swiper-box {
  flex: 1 !important;
  /* #ifdef H5 */
  // margin-top: 80rpx;
  /* #endif */
}

.ui-swiper-item {
  flex: 1 !important;
  flex-direction: row;
}

.ui-scroll-v {
  flex: 1;
  /* #ifndef MP-ALIPAY */
  flex-direction: column;
  /* #endif */
  width: 750rpx;
}

.ui-refresh-icon {
  width: 20px;
  height: 20px;
  transition-duration: 0.25s;
  transition-property: transform;
  transform: rotate(0deg);
  transform-origin: 10px 10px;
}

.size-24 {
  font-size: 24rpx;
}
.size-36 {
  font-size: 36rpx;
}
.size-22 {
  font-size: 22rpx;
}
.size-18 {
  font-size: 18rpx;
}

.nodata-block {
  width: 100%;
  height: 20rpx;
  background-color: #f5f5f5;
}

.data-box {
  .data-head {
    padding-bottom: 30rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-item {
      display: flex;
      align-items: center;
      .head-text {
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #000000;
      }
      .red-text {
        color: #fc0609;
      }
      .head-imgbox {
        margin-left: 10rpx;
        height: 22rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .head-img {
        display: flex;
        align-items: center;
        .head-image {
          width: 16rpx;
          height: 10rpx;
        }
      }
    }
  }
}

/* 瀑布流商品*/
.product__item {
  width: 50%;
  background-color: #ffffff;
  border-radius: 15rpx;
  overflow: hidden;
  // margin: 0 15rpx 30rpx 15rpx;
  // margin: 0rpx 0rpx 30rpx 0rpx;
  // box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  .box {
    margin: 10rpx;
  }
  .item {
    /* 图片 start */

    &__image {
      width: 100%;
      height: auto;
      background-color: #ffffff;
    }
    /* 图片 end */

    /* 内容 start */
    &__data {
      padding: 20rpx 10rpx;
    }

    /* 标题 start */
    &__title-container {
      text-align: justify;
      line-height: 35rpx;
      vertical-align: middle;
      font-size: 26rpx;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &__store-type {
      height: 28rpx;
      font-size: 20rpx;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 4rpx;
      border-radius: 6rpx;
      white-space: nowrap;
      text-align: center;
      top: -2rpx;
      margin-right: 6rpx;
    }
    &__title {
    }
    /* 标题 end */

    /* 标签 start */
    &__tags-container {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
    }
    &__tag {
      margin: 10rpx;
      color: #ff7043;
      border: 2rpx solid #ff7043;
      padding: 0 6rpx;
      border-radius: 10rpx;
      font-size: 20rpx;

      &:first-child {
        margin-left: 0rpx !important;
      }
    }
    /* 标签 end */

    /* 价格 start */
    &__price-container {
      padding: 10rpx 0;
      font-size: 24rpx;
      font-weight: bold;
    }
    &__price {
      &--unit {
      }
      &--integer {
        font-size: 38rpx;
      }
      &--decimal {
      }
    }
    /* 价格 end */
    /* 内容 end */
  }
}

/* 商家商品 start*/
.tn-blogger-content {
  &__wrap {
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
    border-radius: 20rpx;
    margin: 15rpx;
  }

  &__info {
    &__btn {
      margin-right: -12rpx;
      opacity: 0.5;
    }
  }

  &__label {
    &__item {
      line-height: 45rpx;
      padding: 0 10rpx;
      margin: 5rpx 18rpx 0 0;

      &--prefix {
        color: #e83a30;
        padding-right: 10rpx;
      }
    }

    &__desc {
      line-height: 35rpx;
    }
  }

  &__main-image {
    border-radius: 16rpx 16rpx 0 0;

    &--1 {
      max-width: 690rpx;
      min-width: 690rpx;
      max-height: 400rpx;
      min-height: 400rpx;
    }

    &--2 {
      max-width: 260rpx;
      max-height: 260rpx;
    }

    &--3 {
      height: 212rpx;
      width: 100%;
    }
  }

  &__count-icon {
    font-size: 24rpx;
    padding-right: 5rpx;
  }
}

.image-book {
  padding: 150rpx 0rpx;
  font-size: 16rpx;
  font-weight: 300;
  position: relative;
}
.image-picbook {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border-radius: 15rpx 15rpx 0 0;
}

/* 商家头像 start */
.logo-image {
  width: 40rpx;
  height: 40rpx;
  position: relative;
}

.logo-pic {
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment:fixed;
  background-position: top;
  border: 2rpx solid rgba(255, 255, 255, 0.05);
  box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  overflow: hidden;
  // background-color: #FFFFFF;
}

/* 商家商品 end*/

.tn-padding-sm {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 18rpx 0rpx;
}

.sname-box {
  .sname-icon {
    display: flex;
    align-items: center;
    .sname-image {
      width: 26rpx;
      height: 26rpx;
    }
  }
  .sname-text {
    margin: 0 11rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #000000;
  }
  .more-img {
    display: flex;
    align-items: center;
    .more-image {
      width: 10rpx;
      height: 18rpx;
    }
  }
}

.price-sales {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sales-num {
    font-size: 20rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
}

//优惠券弹出 S
.ticket-pop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  .ticket-box {
    position: relative;
    width: 683rpx;
    height: 736rpx;
    .ticket-close {
      position: absolute;
      width: 60rpx;
      height: 60rpx;
      left: 50%;
      bottom: -90rpx;
      margin-left: -30rpx;
      z-index: 66;
    }
    .ticket-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .ticket-con {
      position: relative;
      z-index: 11;
      padding: 100rpx 80rpx;
      .ticket-t {
        font-size: 24rpx;
        color: #fff;
        text-align: center;
        padding: 60rpx 0 20rpx 0;
      }
      .ticket-ul {
        background: #e91d00;
        padding: 10rpx 20rpx;
        overflow-y: auto;
        height: 360rpx;
        .ticket-li {
          position: relative;
          margin: 10rpx 0;
          padding: 20rpx;
          line-height: 50rpx;
          display: flex;
          align-items: center;
          height: 130rpx;
          justify-content: space-between;
          .li-line {
            height: 1px;
            background: #e4e4e4;
          }
          .li-bg {
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .li-fl {
            position: relative;
            z-index: 22;
            width: 30%;
            text-align: center;
          }
          .li-fr {
            position: relative;
            z-index: 22;
            width: 55%;
          }
          .li-t {
            font-weight: 550;
            .price {
              font-size: 26rpx;
              color: #fc0609;
            }
            .t {
              font-size: 32rpx;
            }
          }
          .li-c {
            .c {
              font-size: 24rpx;
              color: #fc0609;
            }
            .date {
              color: #666;
              font-size: 22rpx;
            }
          }
        }
      }
      .ticket-bot {
        height: 80rpx;
        background: linear-gradient(135deg, #ecc988 0%, #f9e2b7 100%);
        border-radius: 40rpx;
        width: 402rpx;
        margin: 30rpx auto;
        line-height: 80rpx;
        text-align: center;
        font-size: 28rpx;
        color: #e91d00;
        font-weight: 550;
      }
    }
  }
}
//优惠券弹出 E
</style>