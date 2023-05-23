<template>
  <view class="register-page">
    <!--register-box start-->
    <view class="register-box">
      <!--login-ul start-->
      <view class="login-ul">
        <view class="login-li">
          <!-- @click="navClick('ownership')" -->
          <view class="label">
            <text>{{$t('login.yxh')}}</text>
            <!-- <view class="icon">
              <image class="img" src="../../static/images/icon5.png"></image>
            </view> -->
          </view>
          <view class="li-input">
            <input class="input" placeholder-class="color-999" v-model="email" :placeholder="$t('login.qsryx')" />
          </view>
        </view>
        <view class="login-li">
          <view class="label">{{$t('login.yzm')}}</view>
          <view class="li-input">
            <input class="input act" placeholder-class="color-999" v-model="email_code" :placeholder="$t('login.qsryzm')" />
            <view class="yzm" v-if="codeTxt1==$t('login.hqyzm')" @click.stop="$noMultipleClicks(onLoginSendMobileCode)">{{$t('login.fsyzm')}}</view>
            <view class="yzm" v-else>{{codeTxt1}}</view>
          </view>
        </view>
        <view class="login-li">
          <view class="label">{{$t('login.yqm')}}</view>
          <view class="li-input">
            <input class="input" placeholder-class="color-999" v-model="invite_code" :placeholder="$t('login.qsryqm')" />
          </view>
        </view>
      </view>
      <!--login-ul end-->
      <!--register-bot start-->
      <view class="register-bot">
        <button class="public-btn" @click.stop="$noMultipleClicks(onLoginMobileRegister)">{{$t('login.ljzc')}}</button>
      </view>
      <!--register-bot end-->
    </view>
    <!--register-box end-->
  </view>
</template>

<script>	
import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
//公钥.
const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      Inv: 1,
      // email_code: '',// 手机号验证码
      // email: '',// 手机号码
      mobile_area_code: '',// 手机号区域码
      pwd: '',// 密码
      pwd2: '',// 再次输入的密码
      invite_code: '',// 邀请码
      email: '',// 电子邮箱，比如 example@qq.com
      email_code: '',// 邮箱验证码
      second: 60,
      codeTxt: this.$t('login.hqyzm'),
      seconds: 60,
      codeTxt1: this.$t('login.hqyzm'),
      type: "",// 1google,2facebook,3twitter
      third_id: '',// 第三方账号唯一标识 
      isShopCont: false,// 中文还是英文
    }
  },
  onLoad (e) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.type = e.type ? e.type : ''
    this.third_id = e.third_id ? e.third_id : ''
    this.invite_code = e.invite_code ? e.invite_code : ''
  },
  onShow () {
    if (uni.getStorageSync('phoneCont')) {
      this.mobile_area_code = JSON.parse(uni.getStorageSync('phoneCont')).code
    } else {
      this.mobile_area_code = '+60'
      let title = { city: this.$t('phone.mlxy'), code: "+60", "sou": "M" }
      uni.setStorageSync('phoneCont', JSON.stringify(title))
    }
  },
  methods: {
    // 点击切换
    changeTab (Inv) {
      console.log(Inv);
      this.Inv = Inv
      this.pwd = ''// 密码
      this.pwd2 = ''// 再次输入的密码
    },
    // 获取手机验证码
    onLoginSendMobileCode () {
      if (!this.email) return uni.showToast({ title: this.$t('login.qsryx'), icon: 'none' })
      if (this.email) {
        var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        if (!reg_tel.test(this.email)) return uni.showToast({ title: this.$t('login.qsrzqyx'), icon: 'none' })
      }
      this.$http.post(this.$apiObj.LoginSendEmailCode, { type: this.isShopCont ? 2 : 1, email: this.email }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('login.fscg'), icon: 'none' })
          this.timeDowns()
        }
      })
    },
    timeDowns () {
      this.results = setInterval(() => {
        --this.seconds
        this.codeTxt1 = this.seconds + 'S'
        if (this.seconds < 0) {
          clearInterval(this.results)
          this.seconds = 60
          this.codeTxt1 = this.$t('login.hqyzm')
        }
      }, 1000)
    },
    // 手机号注册
    onLoginMobileRegister () {
      if (!this.email) return uni.showToast({ title: this.$t('login.qsrsjhm'), icon: 'none' })
      if (!this.email_code) return uni.showToast({ title: this.$t('login.qsryzm'), icon: 'none' })
      this.$http.post(this.$apiObj.LoginThirdPartyRegister, {
        type: this.type,// 1google,2facebook,3twitter
        third_id: this.third_id,// 第三方账号唯一标识    
        email_code: this.email_code,// 手机号验证码
        email: this.email,// 手机号码
        // mobile_area_code: this.mobile_area_code.slice(1),// 手机号区域码 
        invite_code: this.invite_code,// 邀请码
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('login.zccg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    },
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
.register-page {
  .register-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 35rpx 30rpx;
    line-height: 1;
    font-size: 32rpx;
    border-bottom: 1px solid #f5f5f5;
    .li {
      position: relative;
      text-align: center;
    }
    .active {
      color: #fc0609;
    }
    .active::after {
      width: 68rpx;
      height: 5rpx;
      background: #fc0609;
      border-radius: 3rpx;
      position: absolute;
      left: 50%;
      margin-left: -34rpx;
      bottom: -35rpx;
      content: "";
      display: block;
    }
  }
  .register-box {
    padding: 30rpx;
    .register-bot {
      margin: 55rpx 0;
    }
    .login-check {
      display: flex;
      font-size: 24rpx;
      line-height: 32rpx;
      .check {
        margin-right: 0rpx;
      }
      .xy {
        display: flex;
        flex-wrap: wrap;
      }
    }
    .login-ul {
      .login-li {
        border-bottom: 1px solid #f5f5f5;
        padding: 24rpx 0;
        display: flex;
        align-items: center;
        position: relative;
        .login-eye {
          width: 38rpx;
          height: 38rpx;
          position: absolute;
          right: 145rpx;
          top: 50%;
          margin-top: -19rpx;
        }
        .login-pass {
          font-size: 26rpx;
          position: absolute;
          right: 0;
          color: #333;
          top: 50%;
          margin-top: -20rpx;
          line-height: 40rpx;
          display: flex;
          .line {
            width: 2rpx;
            height: 40rpx;
            margin-right: 20rpx;
            background: #eeeeee;
          }
        }
        .label {
          width: 150rpx;
          margin-right: 10rpx;
          font-size: 28rpx;
          display: flex;
          align-items: center;
          line-height: 1;
          .icon {
            width: 11rpx;
            height: 7rpx;
            min-width: 11rpx;
            max-width: 11rpx;
            margin-left: 10rpx;
          }
        }
        .li-input {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .input {
            height: 60rpx;
            width: 100%;
            font-size: 28rpx;
            &.act {
              width: 300rpx;
            }
          }
          .yzm {
            color: #fa1d1d;
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
/deep/ uni-checkbox .uni-checkbox-input {
  border-radius: 100%;
}
/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
  border-color: #d1d1d1;
}
/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
  background: #fc0609;
  color: #fff !important;
  border-color: #fc0609;
}
</style>