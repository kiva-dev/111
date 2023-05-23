<template>
  <view class="phone-page">
    <view class="phone-box">
      <view class="li">
        <view class="li-left">{{$t('user.Vemail.email')}}</view>
        <view class="li-right">
          <input class="input" placeholder-class="color-999" v-model="email" :placeholder="$t('user.Vemail.newemail')" />
        </view>
      </view>
      <view class="li">
        <view class="li-left">{{$t('user.Vemail.yzm')}}</view>
        <view class="li-right">
          <input class="input" placeholder-class="color-999" v-model="code" :placeholder="$t('user.Vemail.qsryzm')" />
        </view>
        <button class="ver-btn" v-if="codeTxt==$t('user.Vemail.hqyzm')" @click.stop="$noMultipleClicks(onLoginSendEmailCode)">{{$t('user.Vemail.hqyzm')}}</button>
        <button class="ver-btn" v-else>{{codeTxt}}</button>
      </view>
    </view>
    <view class="phone-bot">
      <button class="public-btn" @click.stop="$noMultipleClicks(onMineBindEmail)">{{$t('user.Vemail.qrxg')}}</button>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      email: '',// 电子邮箱，比如 example@qq.com
      code: '',// 
      second: 60,
      codeTxt: this.$t('user.Vemail.hqyzm'),
      isShopCont: false,// 中文还是英文
    }
  },
  onLoad (options) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
  },
  methods: {
    // 获取验证码
    onLoginSendEmailCode () {
      if (!this.email) return uni.showToast({ title: this.$t('user.Vemail.qsremail'), icon: 'none' })
      if (this.email) {
        var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        if (!reg_tel.test(this.email)) return uni.showToast({ title: this.$t('user.Vemail.qsrzqyx'), icon: 'none' })
      }
      this.$http.post(this.$apiObj.LoginSendEmailCode, { type: this.isShopCont ? 2 : 1, email: this.email }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.Vemail.fscg'), icon: 'none' })
          this.timeDown()
        }
      })
    },
    timeDown () {
      this.result = setInterval(() => {
        --this.second
        this.codeTxt = this.second + 'S'
        if (this.second < 0) {
          clearInterval(this.result)
          this.second = 60
          this.codeTxt = this.$t('user.Vemail.hqyzm')
        }
      }, 1000)
    },
    // 邮箱注册
    onMineBindEmail () {
      if (!this.email) return uni.showToast({ title: this.$t('user.Vemail.qsremail'), icon: 'none' })
      if (this.email) {
        var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        if (!reg_tel.test(this.email)) return uni.showToast({ title: this.$t('user.Vemail.qsrzqyx'), icon: 'none' })
      }
      if (!this.code) return uni.showToast({ title: this.$t('user.Vemail.qsryzm'), icon: 'none' })
      this.$http.post(this.$apiObj.MineBindEmail, {
        code: this.code,//  验证码
        email: this.email,// 
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.Vemail.xgcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
page {
  background: #f9f9f9;
}
.phone-page {
  .phone-box {
    background: #fff;
    padding: 0 30rpx;
    .li {
      padding: 30rpx 0;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      position: relative;
      .ver-btn {
        position: absolute;
        right: 30rpx;
        top: 50%;
        margin-top: -20rpx;
        line-height: 40rpx;
        font-size: 24rpx;
        color: #fc0609;
        padding: 0;
      }
      .li-right {
        flex: 1;
      }
      .input {
        height: 50rpx;
        width: 100%;
        font-size: 26rpx;
      }
      .down-icon {
        width: 10rpx;
        height: 7rpx;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -3.5rpx;
      }
      .li-left {
        position: relative;
        width: 135rpx;
        display: flex;
        justify-content: flex-end;
        margin-right: 24rpx;
      }
    }
  }
  .phone-bot {
    margin: 50rpx 30rpx;
  }
}
/deep/ .uni-select {
  border: none;
  font-size: 28rpx;
  padding-right: 30rpx;
  text-align: right;
}
</style>