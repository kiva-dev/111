<template>
  <view class="coupon-page">
    <!--coupon-head start-->
    <view class="coupon-head">
      <view class="li" :class="type==1?'active':''" @click="onNavClick(1)">
        <text>{{$t('user.coupon.daisy')}}</text>
        <view class="icon">
          <image class="img" src="../../static/images/icon16.png"></image>
        </view>
      </view>
      <view class="li" :class="type==2?'active':''" @click="onNavClick(2)">
        <text>{{$t('user.coupon.ysy')}}</text>
        <view class="icon">
          <image class="img" src="../../static/images/icon16.png"></image>
        </view>
      </view>
      <view class="li" :class="type==3?'active':''" @click="onNavClick(3)">
        <text>{{$t('user.coupon.ygq')}}</text>
        <view class="icon">
          <image class="img" src="../../static/images/icon16.png"></image>
        </view>
      </view>
    </view>
    <!--coupon-head end-->
    <!--待使用 coupon-ul start-->
    <view class="coupon-ul" v-if="type==1">
      <!--coupon-li start-->
      <block v-if="MineCouponList.length">
        <view v-for="item in MineCouponList" :key="item.id" class="coupon-li">
          <view class="li-bg">
            <image class="img" src="../../static/images/cou2.png"></image>
          </view>
          <view class="li-con">
            <view class="li-left">
              <view class="t"> RM<text class="f-46">{{$filter.formatValue(item.money, 'split')[0]}}</text>.{{$filter.formatValue(item.money, 'split')[1] ? $filter.formatValue(item.money, 'split')[1] : '00'}}</view>
              <view class="c">{{$t('user.coupon.man')}}{{item.use_limit}}{{$t('user.coupon.keyong')}}</view>
            </view>
            <view class="li-right">
              <view class="t">{{$t('user.coupon.yhq')}}</view>
              <view class="c">{{$t('user.coupon.yxqz')}} {{item.end_time}}</view>
            </view>
          </view>
        </view>
      </block>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
      <!--coupon-li end-->
    </view>
    <!--待使用 coupon-ul end-->
    <!--已使用 coupon-ul start-->
    <view class="coupon-ul" v-if="type==2">
      <!--coupon-li start-->
      <block v-if="MineCouponList.length">
        <view v-for="item in MineCouponList" :key="item.id" class="coupon-li gray">
          <view class="li-bg">
            <image class="img" src="../../static/images/cou1.png"></image>
          </view>
          <view class="li-con">
            <view class="li-left">
              <view class="t">RM<text class="f-46">{{$filter.formatValue(item.money, 'split')[0]}}</text>.{{$filter.formatValue(item.money, 'split')[1] ? $filter.formatValue(item.money, 'split')[1] : '00'}}</view>
              <view class="c">{{$t('user.coupon.man')}}{{item.use_limit}}{{$t('user.coupon.keyong')}}</view>
            </view>
            <view class="li-right">
              <view class="t">{{$t('user.coupon.yhq')}}</view>
              <view class="c">{{item.end_time}} {{$t('user.coupon.ysy')}}</view>
            </view>
          </view>
        </view>
      </block>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
      <!--coupon-li end-->
    </view>
    <!--已使用 coupon-ul end-->
    <!--已过期 coupon-ul start-->
    <view class="coupon-ul" v-if="type==3">
      <!--coupon-li start-->
      <block v-if="MineCouponList.length">
        <view v-for="item in MineCouponList" :key="item.id" class="coupon-li gray">
          <view class="li-bg">
            <image class="img" src="../../static/images/cou1.png"></image>
          </view>
          <view class="li-con">
            <view class="li-left">
              <view class="t">RM<text class="f-46">{{$filter.formatValue(item.money, 'split')[0]}}</text>.{{$filter.formatValue(item.money, 'split')[1] ? $filter.formatValue(item.money, 'split')[1] : '00'}}</view>
              <view class="c">{{$t('user.coupon.man')}}{{item.use_limit}}{{$t('user.coupon.keyong')}}</view>
            </view>
            <view class="li-right">
              <view class="t">{{$t('user.coupon.yhq')}}</view>
              <view class="c">{{item.end_time}} {{$t('user.coupon.ygq')}}</view>
            </view>
          </view>
        </view>
      </block>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
      <!--coupon-li end-->
    </view>
    <!--已过期 coupon-ul end-->
  </view>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      type: 1,
      MineCouponList: [],// 优惠券列表
      totalPageNum: 0,// 总条数
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
    }
  },
  onShow () {
    this.onMineCouponList()
  },
  methods: {
    // 点击头部切换
    onNavClick (e) {
      this.type = e
      this.page = 1
      this.onMineCouponList()
    },
    // 获取列表
    onMineCouponList () {
      this.$http.post(this.$apiObj.MineCouponList, { type: this.type, page: this.page, pagenum: this.pagenum }).then(res => {
        if (res.code == 1) {
          this.totalPageNum = res.data.total
          this.MineCouponList = this.page == 1 ? res.data.data : [...this.MineCouponList, ...res.data.data]
        }
      })
    }
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onMineCouponList()
  }
}
</script>
<style lang="less" scoped>
.coupon-page {
  .coupon-head {
    display: flex;
    justify-content: space-around;
    padding: 40rpx 30rpx;
    .li {
      font-size: 28rpx;
      position: relative;
      .icon {
        width: 41rpx;
        height: 8rpx;
        position: absolute;
        left: 50%;
        bottom: -20rpx;
        margin-left: -20rpx;
        display: none;
      }
    }
    .active {
      color: #f52c1f;
      font-weight: 550;
      .icon {
        display: block;
      }
    }
  }
  .coupon-ul {
    margin: 30rpx;
    .coupon-li {
      margin: 20rpx 0;
      position: relative;
      height: 190rpx;
      box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
      border-radius: 10rpx;
      .li-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .li-con {
        position: relative;
        z-index: 11;
        display: flex;
        align-items: center;
        line-height: 1;
        .li-left {
          height: 190rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 220rpx;
          font-size: 28rpx;
          color: #fc0609;
          margin-right: 20rpx;
          .t {
            padding: 0rpx 0 20rpx 0;
          }
          .c {
            padding-top: 10rpx;
          }
        }
        .li-right {
          width: calc(100% - 260rpx);
          height: 190rpx;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .t {
            font-size: 32rpx;
            border-bottom: 1px solid #f5f5f5;
            padding: 0rpx 0 20rpx 0;
          }
          .c {
            color: #666;
            margin-top: 20rpx;
          }
        }
      }
    }
    .gray {
      color: #999;
      .li-con {
        .li-left {
          color: #999;
        }
        .li-right {
          .c {
            color: #999;
          }
        }
      }
    }
  }
}
</style>