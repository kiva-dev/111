<template>
  <view class="message-page">
    <!--message-li start-->
    <view class="message-li" @click="navClick('systemM')">
      <view class="li-fl">
        <view class="li-img">
          <image class="img" src="../../static/images/mine/mesage1.png"></image>
        </view>
        <view class="li-txt">
          <view class="t">{{$t('top.xtxx')}}</view>
          <view class="c oneblock" v-if="isShopCont">{{SysmsgList.e_content}}</view>
          <view class="c oneblock" v-else>{{SysmsgList.content}}</view>
        </view>
      </view>
      <view class="li-date" v-if="SysmsgList.addtime">{{$filter.to_date_timees(SysmsgList.addtime)}}</view>
      <view class="li-date" v-else> </view>
      <view class="dian"></view>
    </view>
    <!--message-li end-->
    <!--message-li start-->
    <!-- <view class="message-li" @click="onkefyu">
      <view class="li-fl">
        <view class="li-img">
          <image class="img" src="../../static/images/index/banner.png"></image>
          <view class="num">10</view>
        </view>
        <view class="li-txt">
          <view class="t">系统消息</view>
          <view class="c">您有新的指派订单</view>
        </view>
      </view>
      <view class="li-date">19:41</view>
    </view> -->
    <!--message-li end-->
    <!--联系客服弹出 start-->
    <uni-popup ref="popup3" type="center">
      <view class="email-cont">
        <image class="query" @click="onQuery" src="../../static/images/close1.png"></image>
        <view class="title">{{$t('kefu.title')}}</view>
        <view class="cont">
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>cs-reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>info@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>support@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>help@kolibrimall.com
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data () {
    return {
      no_read: 0,// 是否已读
      isShopCont: false,// 商品详情显示中文还是英文
      SysmsgList: []
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.$http.post(this.$apiObj.MineSysmsgList, { page: 1, pagenum: 1 }).then(res => {
      if (res.code == 1) {
        this.no_read = res.data.no_read
        this.SysmsgList = res.data.list.data[0]
      }
    })
  },
  methods: {
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    onkefyu () {
      this.$refs.popup3.open()
      // uni.navigateTo({
      //   url: 'custom?uuid=1&avatar=' + uni.getStorageSync('userCont').avatar
      // })
    },
    onQuery () {
      this.$refs.popup3.close()
    },
  }
}
</script>
<style lang="less" scoped>
.message-page {
  .message-li {
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    .dian {
      position: absolute;
      width: 20rpx;
      height: 20rpx;
      background: red;
      border-radius: 50%;
      top: 40rpx;
      right: 18rpx;
    }
    .li-fl {
      display: flex;
      .li-img {
        width: 88rpx;
        height: 88rpx;
        min-width: 88rpx;
        max-width: 88rpx;
        margin-right: 30rpx;
        position: relative;
      }
      .li-img .img {
        overflow: hidden;
        border-radius: 100%;
      }
      .num {
        position: absolute;
        right: -6rpx;
        top: -6rpx;
        height: 34rpx;
        min-width: 34rpx;
        background: #fc0609;
        border-radius: 100%;
        line-height: 34rpx;
        text-align: center;
        font-size: 20rpx;
        color: #fff;
      }
      .li-txt {
        .t {
          font-size: 28rpx;
        }
        .c {
          width: 430rpx;
          font-size: 26rpx;
          color: #999;
        }
      }
    }
    .li-date {
      font-size: 24rpx;
      color: #bbbbbb;
    }
  }
}
</style>