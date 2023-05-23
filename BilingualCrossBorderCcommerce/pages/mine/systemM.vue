<template>
  <view class="sys-page">
    <view class="sys-box">
      <view class="sys-li" v-for="item,k in SysmsgList" :key="k" @click="navClick(item)">
        <view class="hd">
          <!-- "type": 1, //消息类型：1提现 recharge_tocash ，2充值 recharge，3订单（data_id是订单id，order_no是订单号，跳转订单详情），4售后（data_id是售后订单id），5竞拍（data_id是竞拍商品id），6优惠券（data_id为0时跳转优惠券列表，data_id>0s时跳转商品列表） -->
          <view class="t" v-if="item.type==1">
            <block v-if="isShopCont">Withdrawal notice</block>
            <block v-else>提现通知</block>
          </view>
          <view class="t" v-if="item.type==2">
            <block v-if="isShopCont">Recharge notification</block>
            <block v-else>充值通知</block>
          </view>
          <view class="t" v-if="item.type==3">
            <block v-if="isShopCont">Order Notice</block>
            <block v-else>订单通知</block>
          </view>
          <view class="t" v-if="item.type==4">
            <block v-if="isShopCont">After sales notification</block>
            <block v-else>售后通知</block>
          </view>
          <view class="t" v-if="item.type==5">
            <block v-if="isShopCont">Notice of Auction</block>
            <block v-else>竞拍通知</block>
          </view>
          <view class="t" v-if="item.type==6">
            <block v-if="isShopCont">Coupon Notice</block>
            <block v-else>优惠券通知</block>
          </view>
          <view class="time">{{$filter.to_date_time(item.addtime)}}</view>
          <view class="dian" v-if="item.read_status=='0'"></view>
        </view>
        <view class="bd">
          <view class="c" v-if="isShopCont">{{item.e_content}}</view>
          <view class="c" v-else>{{item.content}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      isShopCont: false,// 商品详情显示中文还是英文
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      totalPageNum: 0,// 总条数
      SysmsgList: []
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.page = 1
    this.SysmsgList = []
    this.onMineSysmsgList()
    console.log(this.isShopCont);
  },
  methods: {
    // 列表
    onMineSysmsgList () {
      this.$http.post(this.$apiObj.MineSysmsgList, { page: this.page, pagenum: this.pagenum }).then(res => {
        if (res.code == 1) {
          this.totalPageNum = res.data.list.total
          this.SysmsgList = this.page == 1 ? res.data.list.data : [...this.SysmsgList, ...res.data.list.data]
        }
      })
    },
    //导航点击的跳转处理函数
    navClick (item) {
      //  "type": 1, //消息类型：1提现 recharge_tocash ，2充值 recharge，3订单（data_id是订单id，order_no是订单号，跳转订单详情），4售后（data_id是售后订单id），5竞拍（data_id是竞拍商品id），6优惠券（data_id为0时跳转优惠券列表，data_id>0s时跳转商品列表）
      this.$http.post(this.$apiObj.readSysmsg, { msg_id: item.id }).then(res => {
        if (res.code == 1) {
          this.page = 1
          this.SysmsgList = []
          this.onMineSysmsgList()
        }
      })
      if (item.type == 1) {
        uni.navigateTo({
          url: './wallet'
        })
      } else if (item.type == 2) {
        uni.navigateTo({
          url: './wallet'
        })
      } else if (item.type == 3) {
        uni.navigateTo({
          url: './order/detail?order_no=' + item.order_no
        })
      } else if (item.type == 4) {
        uni.navigateTo({
          url: './refund/detail?id=' + item.data_id
        })
      } else if (item.type == 5) {
        return
        // uni.navigateTo({
        //   url: "/pages/auction/detail?id=" + item.data_id
        // })
      } else if (item.type == 6) {
        if (item.data_id == 0) {
          uni.navigateTo({
            url: "./coupon"
          })
        } else {
          uni.navigateTo({
            url: '/pages/class/search'
          });
        }
      }
    },
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onMineSysmsgList()
  }
}
</script>
<style >
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.sys-page {
  .sys-box {
    margin: 30rpx;
    .sys-li {
      margin: 20rpx 0;
      background: #ffffff;
      border-radius: 20rpx;
      .hd {
        padding: 30rpx;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .t {
          font-size: 28rpx;
          font-weight: 550;
        }
        .time {
          font-size: 26rpx;
          color: #999;
        }
        .dian {
          position: absolute;
          width: 20rpx;
          height: 20rpx;
          background: red;
          border-radius: 50%;
          top: 18rpx;
          right: 18rpx;
        }
      }
      .bd {
        padding: 30rpx;
        font-size: 28rpx;
        line-height: 1.8;
      }
    }
  }
}
</style>