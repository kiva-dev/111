<template>
  <view class="register-page">
    <view class="register-box">
      <!--login-ul start-->
      <view class="login-ul">
        <view class="login-li">
          <view class="label" @click="navClick('ownership')">
            <text>{{mobile_area_code}}</text>
            <view class="icon">
              <image class="img" src="../../static/images/icon5.png"></image>
            </view>
          </view>
          <view class="li-input">
            <input class="input" placeholder-class="color-999" v-model="mobile" :placeholder="$t('login.qsrsjh')" />
          </view>
        </view>
        <view class="login-li">
          <view class="label">{{$t('login.yzm')}}</view>
          <view class="li-input">
            <input class="input act" placeholder-class="color-999" v-model="code" :placeholder="$t('login.qsryzm')" />
            <view class="yzm" v-if="codeTxt1==$t('login.hqyzm')" @click.stop="$noMultipleClicks(onLoginSendMobileCode)">{{$t('login.fsyzm')}}</view>
            <view class="yzm" v-else>{{codeTxt1}}</view>
          </view>
        </view>
      </view>
      <view class="register-bot">
        <button class="public-btn" @click.stop="$noMultipleClicks(onLoginEmailRegister)">{{$t('login.qd')}}</button>
      </view>
    </view>
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
      code: '',// 手机号验证码
      mobile: '',// 手机号码
      mobile_area_code: '',// 手机号区域码
      pwd: '',// 密码
      pwd2: '',// 再次输入的密码
      invite_code: '',// 邀请码
      email: '',// 电子邮箱，比如 example@qq.com
      email_code: '',// 邮箱验证码
      seconds: 60,
      codeTxt1: this.$t('login.hqyzm')
    }
  },
  onLoad (e) {
    this.email = this.fromCode(e.email)
    this.email_code = this.fromCode(e.email_code)
    this.invite_code = this.fromCode(e.invite_code)
    this.pwd = this.fromCode(e.pwd)
    this.pwd2 = this.fromCode(e.pwd2)
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
    // 字符串解密
    fromCode (str) {
      //定义密钥，36个字母和数字
      var key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var len = key.length;  //获取密钥的长度
      var b, b1, b2, b3, d = 0, s;  //定义临时变量
      s = new Array(Math.floor(str.length / 3));  //计算加密字符串包含的字符数，并定义数组
      b = s.length;  //获取数组的长度
      for (var i = 0; i < b; i++) {  //以数组的长度循环次数，遍历加密字符串
        b1 = key.indexOf(str.charAt(d));  //截取周期内第一个字符串，计算在密钥中的下标值
        d++;
        b2 = key.indexOf(str.charAt(d));  //截取周期内第二个字符串，计算在密钥中的下标值
        d++;
        b3 = key.indexOf(str.charAt(d));  //截取周期内第三个字符串，计算在密钥中的下标值
        d++;
        s[i] = b1 * len * len + b2 * len + b3  //利用下标值，反推被加密字符的Unicode编码值
      }
      b = eval("String.fromCharCode(" + s.join(',') + ")");  // 用fromCharCode()算出字符串
      return b;  //返回被解密的字符串
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    // 获取验证码
    onLoginSendMobileCode () {
      if (!this.mobile) return uni.showToast({ title: this.$t('login.qsrsjhm'), icon: 'none' })
      if (this.mobile_area_code == 86) {
        if (this.mobile) {
          var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
          if (!reg_tel.test(this.mobile)) return uni.showToast({ title: this.$t('login.qsrzqsjh'), icon: 'none' })
        }
      }
      this.$http.post(this.$apiObj.LoginSendMobileCode, { mobile: this.mobile, mobile_area_code: this.mobile_area_code.slice(1) }).then(res => {
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
    onLoginEmailRegister () {
      if (!this.mobile) return uni.showToast({ title: this.$t('login.qsrsjhm'), icon: 'none' })
      if (!this.code) return uni.showToast({ title: this.$t('login.qsryzm'), icon: 'none' })
      if (this.mobile_area_code == 86) {
        if (this.mobile) {
          var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
          if (!reg_tel.test(this.mobile)) return uni.showToast({ title: this.$t('login.qsrzqsjh'), icon: 'none' })
        }
      }
      const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
      this.$http.post(this.$apiObj.LoginEmailRegister, {
        code: this.code,// 手机号验证码
        mobile: this.mobile,// 手机号码
        mobile_area_code: this.mobile_area_code.slice(1),// 手机号区域码
        pwd: pwd,// 密码
        pwd2: pwd,// 再次输入的密码
        invite_code: this.invite_code,// 邀请码
        email: this.email,// 邮箱
        email_code: this.email_code,// 邮箱验证码
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('login.zccg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateTo({
              url: './login'
            })
          }, 1000);
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.register-page {
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
            color: #fc0609;
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
</style>