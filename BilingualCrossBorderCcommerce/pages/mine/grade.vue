<template>
  <view class="grade-page">
    <!--grade-head start-->
    <view class="grade-head">
      <view class="head-img">
        <image class="img" v-if="userCont.avatar" :src="userCont.avatar"></image>
        <image class="img" v-else src="/static/userimg.png"></image>
      </view>
      <view class="head-name">
        <text>{{userCont.nickname?userCont.nickname: $t('user.grade.nicheng') }}</text>
        <view class="name-rank">LV{{userCont.level}}</view>
      </view>
    </view>
    <!--grade-head end-->
    <!--grade-box start-->
    <view class="grade-box">
      <view class="grade-tit">{{$t('user.grade.czrw')}}</view>
      <view class="grade-li">
        <view class="li-fl">
          <view class="li-img">
            <image class="img" src="../../static/images/mine/grade1.png"></image>
          </view>
          <view class="li-txt">
            <view class="t">{{$t('user.grade.sctx')}}</view>
            <view class="c">
              <view class="icon">
                <image class="img" src="../../static/images/mine/grade7.png"></image>
              </view>
              <text>{{$t('user.grade.syj')}}</text>
            </view>
          </view>
        </view>
        <button v-if="userCont.avatar!=='https://h5.kolibrimall.com/uploads/20220928/bca80f7416403d53a78c17ef6e0fd30c.png'" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
        <button v-else class="grade-btn" @click="navClick('profile')">{{$t('user.grade.qwc')}}</button>
      </view>
      <view class="grade-li">
        <view class="li-fl">
          <view class="li-img">
            <image class="img" src="../../static/images/mine/grade2.png"></image>
          </view>
          <view class="li-txt">
            <view class="t">{{$t('user.grade.smrz')}}</view>
            <view class="c">
              <view class="icon">
                <image class="img" src="../../static/images/mine/grade7.png"></image>
              </view>
              <text>{{$t('user.grade.syj')}}</text>
            </view>
          </view>
        </view>
        <button v-if="MineCont.status==1" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
        <button v-else class="grade-btn" @click="navClick('Vid')">{{$t('user.grade.qwc')}}</button>
      </view>
      <!-- <view class="grade-li">
        <view class="li-fl">
          <view class="li-img">
            <image class="img" src="../../static/images/mine/grade3.png"></image>
          </view>
          <view class="li-txt">
            <view class="t">{{$t('user.grade.phone')}}</view>
            <view class="c">
              <view class="icon">
                <image class="img" src="../../static/images/mine/grade7.png"></image>
              </view>
              <text>{{$t('user.grade.syj')}}</text>
            </view>
          </view>
        </view>
        <button v-if="userCont.mobile" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
        <button v-else class="grade-btn" @click="navClick('upgrade')">{{$t('user.grade.qwc')}}</button>
      </view> -->
      <view class="grade-li">
        <view class="li-fl">
          <view class="li-img">
            <image class="img" src="../../static/images/mine/grade4.png"></image>
          </view>
          <view class="li-txt">
            <view class="t">{{$t('user.grade.email')}}</view>
            <view class="c">
              <view class="icon">
                <image class="img" src="../../static/images/mine/grade7.png"></image>
              </view>
              <text>{{$t('user.grade.syj')}}</text>
            </view>
          </view>
        </view>
        <button v-if="userCont.email" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
        <button v-else class="grade-btn" @click="navClick('Vemail')">{{$t('user.grade.qwc')}}</button>
      </view>
      <!-- <view class="grade-li">
        <view class="li-fl">
          <view class="li-img">
            <image class="img" src="../../static/images/mine/grade5.png"></image>
          </view>
          <view class="li-txt">
            <view class="t">绑定支付方式</view>
            <view class="c">
              <view class="icon">
                <image class="img" src="../../static/images/mine/grade7.png"></image>
              </view>
              <text>升一级</text>
            </view>
          </view>
        </view>
        <button class="grade-btn">去完成</button>
      </view> -->
      <view class="grade-li">
        <view class="li-fl">
          <view class="li-img">
            <image class="img" src="../../static/images/mine/grade6.png"></image>
          </view>
          <view class="li-txt">
            <view class="t">{{$t('user.grade.month')}}</view>
            <view class="c">
              <view class="icon">
                <image class="img" src="../../static/images/mine/grade7.png"></image>
              </view>
              <text>{{$t('user.grade.syj')}}</text>
            </view>
          </view>
        </view>
        <button v-if="userCont.is_recharge==1" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
        <button v-else class="grade-btn" @click="navClick('recharge')">{{$t('user.grade.qwc')}}</button>
      </view>
    </view>
    <!--grade-box end-->
  </view>
</template>

<script>
export default {
  data () {
    return {
      userCont: '',// 个人信息
      MineCont: '',// 实名认证
    }
  },
  onShow () {
    // 获取个人信息
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        this.userCont = res.data
      }
    })
    // 实名认证
    this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
      if (res.code == 1) {
        this.MineCont = res.data
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
  }
}
</script>

<style lang="less" scoped>
.grade-page {
  .grade-head {
    padding: 60rpx 30rpx;
    .head-img {
      width: 148rpx;
      height: 148rpx;
      border-radius: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
    .head-name {
      font-size: 32rpx;
      display: flex;
      margin-top: 30rpx;
      align-items: center;
      justify-content: center;
    }
    .name-rank {
      height: 30rpx;
      background: #000000;
      border-radius: 6rpx;
      padding: 0 10rpx;
      line-height: 30rpx;
      font-size: 20rpx;
      color: #ffc263;
      margin-left: 10rpx;
    }
  }
  .grade-box {
    padding: 30rpx;
    .grade-tit {
      font-size: 32rpx;
      margin-bottom: 30rpx;
    }
    .grade-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f5f5f5;
      padding: 30rpx 0;
      .grade-btn {
        width: 150rpx;
        height: 55rpx;
        background: rgb(255, 78, 47);
        border-radius: 28rpx;
        line-height: 55rpx;
        text-align: center;
        font-size: 24rpx;
        color: #fff;
        margin: 0;
      }
      .grade-btn.gray {
        background: #dfdfdf;
      }
      .li-fl {
        display: flex;
        align-items: center;
        .li-img {
          width: 68rpx;
          height: 68rpx;
          margin-right: 15rpx;
        }
        .li-txt {
          .t {
            font-size: 28rpx;
          }
          .c {
            margin-top: 6rpx;
            display: flex;
            font-size: 22rpx;
            color: rgba(0, 0, 0, 0.7);
            .icon {
              width: 24rpx;
              height: 25rpx;
              margin-right: 10rpx;
            }
          }
        }
      }
    }
  }
}
</style>