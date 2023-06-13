<template>
  <view class="phone-page">
    <view class="phone-box">
      <view class="li">
        <view class="li-left">{{$t('user.pwd.szzfmm')}}</view>
        <view class="li-right">
          <input class="input" maxlength="6" type="password" placeholder-class="color-999" v-model.number="pwd" :placeholder="$t('user.pwd.qsrzfmm')" />
        </view>
      </view>
      <view class="li">
        <view class="li-left">{{$t('user.pwd.qrzfmm')}}</view>
        <view class="li-right">
          <input class="input" maxlength="6" type="password" placeholder-class="color-999" v-model.number="pwd2" :placeholder="$t('user.pwd.qzcqrzfmm')" />
        </view>
      </view>
    </view>
    <view class="phone-bot">
      <button class="public-btn" style="background: rgb(255, 78, 47);" @click="onPwd">{{$t('user.pwd.qrsz')}}</button>
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
      pwd: '',
      pwd2: '',
    }
  },
  methods: {
    onPwd () {
      if (!this.pwd) return uni.showToast({ title: this.$t('user.pwd.qsrmm'), icon: 'none' })
      if (!this.pwd2) return uni.showToast({ title: this.$t('user.pwd.qqrmm'), icon: 'none' })
      if (!/^\d{6}$/.test(this.pwd)) return uni.showToast({ title: this.$t('numshuzi'), icon: 'none' })
      if (this.pwd !== this.pwd2) return uni.showToast({ title: this.$t('user.pwd.mmbyz'), icon: 'none' })
      const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
      this.$http.post(this.$apiObj.MineSetPwd, { pwd: pwd, pwd2: pwd }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.pwd.szcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    },
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
        display: flex;
        justify-content: flex-end;
        margin-right: 24rpx;
        white-space: nowrap;
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