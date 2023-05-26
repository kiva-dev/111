<template>
  <view class="set-page">
    <view class="set-box">
      <view class="li" @click="onpwd">
        <view class="label">{{$t('user.xitong.zhifupassword')}}</view>
        <view class="li-r">
          <text v-if="set_paypwd==1">
            <block v-if="isShopCont">Set</block>
            <block v-else>已设置</block>
          </text>
          <text v-else class="color-999">
            <block v-if="isShopCont">Not set</block>
            <block v-else>未设置</block>
          </text>
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
      <view class="li" @click="navClick('language')">
        <view class="label">{{$t('user.xitong.yuyan')}}</view>
        <view class="li-r">
          <text>
            <block v-if="isShopCont">english</block>
            <block v-else>中文</block>
          </text>
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
      <view class="li" @click="navClick('agreement')">
        <view class="label">{{$t('user.xitong.yonghuxyi')}}</view>
        <view class="li-r">
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
      <view class="li" @click="navClick('ysxy')">
        <view class="label">{{$t('user.xitong.Privacyagreement')}}</view>
        <view class="li-r">
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
      <!-- #ifdef APP-PLUS -->
      <view class="li" @click="toggle('center')">
        <view class="label">{{$t('user.xitong.Clearcache')}}</view>
        <view class="li-r">
          <text>{{cacheSize}}</text>
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
      <!-- #endif -->
      <view class="li">
        <view class="label">{{$t('user.xitong.Versionupdate')}}</view>
        <view class="li-r">
          <text>{{version}}</text>
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
      <view class="li" @click="toggle1('center')">
        <view class="label">{{$t('user.xitong.Cancelaccount')}}</view>
        <view class="li-r">
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="set-bot" @click="onQuery">{{$t('user.xitong.Logout')}}</view>

    <!--清除缓存弹出 start-->
    <uni-popup ref="popup1" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.xitong.tishi')}}</view>
          <view class="pop-c">{{$t('user.xitong.huancun')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click="toggleClose">{{$t('user.xitong.query')}}</button>
            <button class="pop-btn red" style="background: #FF4E2F;" @click="clearCache">{{$t('user.xitong.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--清除缓存弹出 start-->

    <!--注销账号弹出 start-->
    <uni-popup ref="popup2">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.xitong.tishi')}}</view>
          <view class="pop-c">{{$t('user.xitong.zhuxiao')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click="toggle1Close">{{$t('user.xitong.query')}}</button>
            <button class="pop-btn red" style="background: #FF4E2F;" @click.stop="$noMultipleClicks(onMineCancelAccount)">{{$t('user.xitong.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--注销账号弹出 start-->

    <!--退出账号弹出 start-->
    <uni-popup ref="popup3" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.xitong.tishi')}}</view>
          <view class="pop-c">{{$t('user.xitong.onQuery')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click="onQueryshow">{{$t('user.xitong.query')}}</button>
            <button class="pop-btn red" style="background: #FF4E2F;" @click.stop="$noMultipleClicks(onMineLoginOut)">{{$t('user.xitong.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--退出账号弹出 start-->

  </view>
</template>

<script>
export default {
  data () {
    return {
      isShopCont: false,// 中文还是英文
      noClick: true, // 防止重复点击 
      version: '',
      set_paypwd: '',
      cacheSize: '0KB',// 手机缓存
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    // #ifdef APP-PLUS
    this.onPlus()
    // #endif
    // 隐私协议等
    this.$http.post(this.$apiObj.IndexSetting).then(res => {
      if (res.code == 1) {
        this.version = res.data.version
      }
    })
    // 判断是否设置支付密码
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        this.set_paypwd = res.data.set_paypwd
      }
    })
  },
  methods: {
    // 获取手机缓存
    onPlus () {
      var self = this;
      plus.cache.calculate(function (size) { //size是多少个字节单位是b 
        //做下⾯相应的处理
        if (size < 1024) {
          self.cacheSize = size + 'KB';
        } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
          self.cacheSize = Math.floor(size / 1024 * 100) / 100 + 'KB';
        } else if (size / 1024 / 1024 >= 1) {
          self.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M';
        }
        console.log(self.cacheSize)
        this.cacheSize = self.cacheSize
      });
    },
    // 清理缓存
    clearCache () {
      // #ifdef APP-PLUS
      var self = this;
      //使⽤plus.cache.clear 清除应⽤中的缓存数据
      plus.cache.clear(function () {
        uni.showToast({
          title: this.isShopCont ? 'Clearing succeeded!' : '清除成功!',
          icon: 'none',
          success () {
            self.onPlus()
          }
        })
      });
      self.$refs.popup1.close()
      // #endif
    },
    onpwd () {
      if (this.set_paypwd == 1) {
        uni.navigateTo({
          url: './newpwd'
        })
      } else {
        uni.navigateTo({
          url: './setPassword'
        })
      }
    },
    // 点击退出
    onQuery () {
      this.$refs.popup3.open()
    },
    // 点击退出取消
    onQueryshow () {
      this.$refs.popup3.close()
    },
    // 注销账号
    onMineCancelAccount () {
      this.$http.post(this.$apiObj.MineCancelAccount).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.isShopCont ? 'Logout succeeded' : '注销成功', icon: 'none' })
          uni.removeStorageSync('token');
          uni.navigateTo({
            url: '../public/login'
          })
          this.$refs.popup2.close()
        }
      })
    },
    // 退出登录
    onMineLoginOut () {
      this.$http.post(this.$apiObj.MineLoginOut).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.isShopCont ? 'Exit succeeded' : '退出成功', icon: 'none' })
          uni.removeStorageSync('token');
          uni.navigateTo({
            url: '../public/login'
          })
          this.$refs.popup3.close()
        }
      })
    },
    toggle () {
      this.$refs.popup1.open()
    },
    toggleClose () {
      this.$refs.popup1.close()
    },
    toggle1 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup2.open(type)
    },
    toggle1Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup2.close(type)
    },
    toggle2 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup1.open(type)
    },
    toggle2Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup3.close(type)
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
<style>
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.set-page {
  .set-box {
    padding: 0 30rpx;
    background: #fff;
    .li {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      justify-content: space-between;
      padding: 36rpx 0;
      font-size: 28rpx;
      .label {
        font-size: 28rpx;
      }
      .li-r {
        display: flex;
        align-items: center;
        .more {
          width: 12rpx;
          height: 25rpx;
          margin-left: 20rpx;
        }
      }
    }
    .li:nth-last-child(1) {
      border: none;
    }
  }
  .set-line {
    height: 20rpx;
    background: #f9f9f9;
  }
  .set-bot {
    margin-top: 20rpx;
    background: #fff;
    padding: 30rpx 0;
    text-align: center;
    font-size: 28rpx;
  }
}
</style>