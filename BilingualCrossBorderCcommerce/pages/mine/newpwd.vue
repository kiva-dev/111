<template>
  <view class="register-page">
    <!--register-tab start-->
    <!-- <view class="register-tab">
      <view :class="['li',Inv==0?'active':'']" @click="Inv=0">{{$t('login.sjhyz')}}</view>
      <view :class="['li',Inv==1?'active':'']" @click="Inv=1">{{$t('login.yxyz')}}</view>
    </view> -->
    <!--register-tab end-->
    <!--register-box start-->
    <view class="register-box" v-show="Inv == 0">
      <!--login-ul start-->
      <view class="login-ul">
        <view class="login-li">
          <view class="label" @click="navClick('../public/ownership')">
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
            <input class="input" placeholder-class="color-999" v-model="code" :placeholder="$t('login.qsryzm')" />
          </view>
          <view class="ver-btn" v-if="codeTxt1==$t('login.hqyzm')" @click.stop="$noMultipleClicks(onLoginSendMobileCode)">{{$t('login.fsyzm')}}</view>
          <view class="ver-btn" v-else>{{codeTxt1}}</view>
        </view>
        <view class="login-li">
          <view class="label">{{$t('user.pwd.szzfmm')}}</view>
          <view class="li-input">
            <input class="input" maxlength="6" type="password" placeholder-class="color-999" v-model="pwd" :placeholder="$t('user.pwd.qsrzfmm')" />
          </view>
        </view>
        <!-- <view class="login-li">
          <view class="label">确认密码</view>
          <view class="li-input">
            <input class="input" type="password" placeholder-class="color-999" v-model="pwd2" placeholder="请输入确认密码" />
          </view>
        </view> -->
      </view>
      <!--login-ul end-->
      <!--register-bot start-->
      <view class="register-bot">
        <button class="public-btn" @click.stop="$noMultipleClicks(onLoginForgetPwdByMobile)">{{$t('login.qrzh')}}</button>
      </view>
      <!--register-bot end-->
    </view>
    <!--register-box end-->
    <!--register-box start-->
    <view class="register-box" v-show="Inv == 1">
      <!--login-ul start-->
      <view class="login-ul">
        <view class="login-li">
          <view class="label">{{$t('login.yxh')}}</view>
          <view class="li-input">
            <input class="input" placeholder-class="color-999" v-model="email" :placeholder="$t('login.qsryx')" />
          </view>
        </view>
        <view class="login-li">
          <view class="label">{{$t('login.yzm')}}</view>
          <view class="li-input">
            <input class="input" placeholder-class="color-999" v-model="email_code" :placeholder="$t('login.qsryzm')" />
          </view>
          <view class="ver-btn" v-if="codeTxt==$t('login.hqyzm')" @click.stop="$noMultipleClicks(onLoginSendEmailCode)">{{$t('login.fsyzm')}}</view>
          <view class="ver-btn" v-else>{{codeTxt}}</view>
        </view>
        <view class="login-li">
          <view class="label">{{$t('user.pwd.szzfmm')}}</view>
          <view class="li-input">
            <input class="input" maxlength="6" type="password" placeholder-class="color-999" v-model="pwd" :placeholder="$t('user.pwd.qsrzfmm')" />
          </view>
        </view>
        <!-- <view class="login-li">
          <view class="label">确认密码</view>
          <view class="li-input">
            <input class="input" type="password" placeholder-class="color-999" v-model="pwd2" placeholder="请输入确认密码" />
          </view>
        </view> -->
      </view>
      <!--login-ul end-->
      <!--register-bot start-->
      <view class="register-bot">
        <button class="public-btn" @click.stop="$noMultipleClicks(onLoginForgetPwdByEmail)">{{$t('login.qrzh')}}</button>
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
      email: '',// 邮箱号
      pwd: '',// 密码
      pwd2: '',// 再次输入的密码
      email_code: '',// 邮箱验证码
      second: 60,
      codeTxt: this.$t('login.hqyzm'),
      mobile: '',// 手机号
      code: '',// 手机验证码
      mobile_area_code: '',// 区号
      seconds: 60,
      codeTxt1: this.$t('login.hqyzm'),
      isShopCont: false,// 中文还是英文
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
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
      this.navIdx = Inv;
    },
    // 获取验证码
    onLoginSendMobileCode () {
      if (!this.mobile) return uni.showToast({ title: this.$t('login.qsrsjh'), icon: 'none' })
      if (this.mobile_area_code == 86) {
        if (this.mobile) {
          var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
          if (!reg_tel.test(this.mobile)) return uni.showToast({ title: this.$t('login.qsrzqsjh'), icon: 'none' })
        }
      }
      this.$http.post(this.$apiObj.LoginSendMobileCode, { mobile: this.mobile, mobile_area_code: this.mobile_area_code.slice(1) }).then(res => {
        if (res.code == 200) {
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
    // 手机号重置密码
    onLoginForgetPwdByMobile () {
      if (!this.mobile) return uni.showToast({ title: this.$t('login.qsrsjhm'), icon: 'none' })
      if (this.mobile) {
        var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
        if (!reg_tel.test(this.mobile)) return uni.showToast({ title: this.$t('login.qsrzqsjh'), icon: 'none' })
      }
      if (!this.code) return uni.showToast({ title: this.$t('login.qsryzm'), icon: 'none' })
      if (!this.pwd) return uni.showToast({ title: this.$t('login.qsrmm'), icon: 'none' })
      // if (!this.pwd2) return uni.showToast({ title: '请确认密码', icon: 'none' })
      // if (this.pwd !== this.pwd2) return uni.showToast({ title: '2次密码不一致，请重新输入', icon: 'none' })
      const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
      this.$http.post(this.$apiObj.MineSetPaypwdByMobile, {
        mobile: this.mobile,// 邮箱
        code: this.code,// 邮箱验证码 
        mobile_area_code: this.mobile_area_code.slice(1),
        pay_pwd: pwd,// 密码
        // pwd2: pwd,// 再次输入的密码 
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('login.czmmcg'), icon: 'none' })
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
    // 获取验证码
    onLoginSendEmailCode () {
      if (!this.email) return uni.showToast({ title: this.$t('login.qsryx'), icon: 'none' })
      if (this.email) {
        var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        if (!reg_tel.test(this.email)) return uni.showToast({ title: this.$t('login.qsrzqyx'), icon: 'none' })
      }
      this.$http.post(this.$apiObj.LoginSendEmailCode, { type: this.isShopCont ? 2 : 1, email: this.email }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('login.fscg'), icon: 'none' })
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
          this.codeTxt = this.$t('login.hqyzm')
        }
      }, 1000)
    },
    // 邮箱重置密码
    onLoginForgetPwdByEmail () {
      if (!this.email) return uni.showToast({ title: this.$t('login.qsryx'), icon: 'none' })
      if (this.email) {
        var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        if (!reg_tel.test(this.email)) return uni.showToast({ title: this.$t('login.qsrzqyx'), icon: 'none' })
      }
      if (!this.email_code) return uni.showToast({ title: this.$t('login.qsryzm'), icon: 'none' })
      if (!this.pwd) return uni.showToast({ title: this.$t('login.qsrmm'), icon: 'none' })
      if (!/^\d{6}$/.test(this.pwd)) return uni.showToast({ title: this.$t('numshuzi'), icon: 'none' })
      // if (!this.pwd2) return uni.showToast({ title: '请确认密码', icon: 'none' })
      // if (this.pwd !== this.pwd2) return uni.showToast({ title: '2次密码不一致，请重新输入', icon: 'none' })
      const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
      this.$http.post(this.$apiObj.MineSetPaypwdByEmail, {
        email: this.email,// 邮箱
        email_code: this.email_code,// 邮箱验证码 
        pay_pwd: pwd,// 密码
        // pwd2: pwd,// 再次输入的密码 
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('login.czmmcg'), icon: 'none' })
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
    }
    .login-ul {
      .login-li {
        border-bottom: 1px solid #f5f5f5;
        padding: 24rpx 0;
        display: flex;
        align-items: center;
        position: relative;
        .ver-btn {
          position: absolute;
          right: 0;
          top: 50%;
          font-size: 2rpx;
          color: #fc0609;
          font-size: 28rpx;
          line-height: 1;
          padding: 0;
          margin: -14rpx 0 0 0;
        }
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
          .input {
            height: 60rpx;
            width: 100%;
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
</style>