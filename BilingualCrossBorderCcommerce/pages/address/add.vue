<template>
  <view class="add-page">
    <view class="add-box">
      <view class="add-li">
        <view class="label">{{$t('user.address.shr')}}</view>
        <view class="li-fr">
          <view class="li-input">
            <input class="input" placeholder-class="color-9999" v-model="name" :placeholder="$t('user.address.qtxxm')" />
          </view>
        </view>
      </view>
      <view class="add-li">
        <view class="label">{{$t('user.address.sjhm')}}</view>
        <view class="li-fr active">
          <view class="label" @click="navClick">
            <text>{{mobile_area_code}}</text>
            <view class="icon">
              <image class="img" src="../../static/images/icon5.png"></image>
            </view>
          </view>
          <view class="li-input">
            <input class="input" type="number" placeholder-class="color-9999" v-model="mobile" :placeholder="$t('user.address.qtxsjhm')" />
          </view>
        </view>
      </view>
      <view class="add-li">
        <view class="label">{{$t('user.address.shdz')}}</view>
        <view class="li-fr">
          <view class="li-input">
            <textarea class="text" auto-height placeholder-class="color-999" v-model="detail" :placeholder="$t('user.address.qtxshdz')"></textarea>
          </view>
        </view>
      </view>
      <view class="add-li">
        <view class="li-fl">{{$t('user.address.swmrshdz')}}</view>
        <view class="switch">
          <switch :checked="is_default?true:false" color="rgb(255, 78, 47)" style="transform:scale(0.7);" @change="switchChange" />
        </view>
      </view>
      <!--add-bot start-->
      <view class="add-bot">
        <button class="public-btn" style="background: rgb(255, 78, 47);" @click.stop="$noMultipleClicks(onAddClick)">{{$t('user.address.baocun')}}</button>
      </view>
      <!--add-bot end-->
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      mobile_area_code: '',// 手机号区域编码
      mobile: '',// 手机号码
      detail: '',// 收货地址
      is_default: false,// 1默认，0不默认
      name: '',// 收货人
    }
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
    switchChange () {
      this.is_default = !this.is_default
    },
    //导航点击的跳转处理函数
    navClick () {
      uni.navigateTo({
        url: '../public/ownership'
      })
    },
    // 添加收货地址
    onAddClick () {
      if (!this.name) return uni.showToast({ title: this.$t('user.address.qsrshrxm'), icon: 'none' })
      if (!this.mobile) return uni.showToast({ title: this.$t('user.address.qsrsjhm'), icon: 'none' })
      if (this.mobile_area_code == 86) {
        if (this.mobile) {
          var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
          if (!reg_tel.test(this.mobile)) return uni.showToast({ title: this.$t('user.address.qsrzqsjh'), icon: 'none' })
        }
      }
      if (!this.detail) return uni.showToast({ title: this.$t('user.address.qsrshdz'), icon: 'none' })
      this.$http.post(this.$apiObj.AddressAdd, {
        mobile_area_code: this.mobile_area_code.slice(1),// 手机号区域编码
        mobile: this.mobile,// 手机号码
        detail: this.detail,// 收货地址
        is_default: this.is_default == true ? 1 : 0,// 1默认，0不默认
        name: this.name,// 收货人
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.address.tjcg'), icon: 'none' })
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
.add-page {
  .add-box {
    padding: 30rpx;
    .add-bot {
      margin: 50rpx 0;
    }
    .add-li {
      margin: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .li-fl {
        font-size: 28rpx;
      }
      .li-fr {
        flex: 1;
        &.active {
          display: flex;
          align-items: center;
          .label {
            width: 100rpx;
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
            width: 360rpx;
          }
        }
        .li-input {
          background: #f5f5f5;
          border-radius: 30rpx;
          padding: 10rpx 30rpx;
          .input {
            height: 70rpx;
            font-size: 28rpx;
            width: 100%;
          }
          .text {
            padding: 10rpx 0;
            font-size: 28rpx;
            width: 100%;
            min-height: 200rpx;
          }
          .pick {
            height: 70rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .pick-input {
              font-size: 28rpx;
            }
            .more {
              width: 10rpx;
              height: 19rpx;
              min-width: 10rpx;
            }
          }
        }
      }
      .label {
        font-size: 28rpx;
        font-weight: 550;
        white-space: nowrap;
        width: 160rpx;
      }
    }
  }
}
</style>