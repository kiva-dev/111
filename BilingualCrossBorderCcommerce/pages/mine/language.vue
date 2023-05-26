<template>
  <view class="lan-page">
    <!-- <view class="lan-box">
			<view class="li active">
				<view class="label">中文</view>
				<view class="icon">
					<image class="img default" src="../../static/images/mine/radio1.png"></image>
					<image class="img selected" src="../../static/images/mine/radio2.png"></image>
				</view>
			</view>
			<view class="li">
				<view class="label">English</view>
				<view class="icon">
					<image class="img default" src="../../static/images/mine/radio1.png"></image>
					<image class="img selected" src="../../static/images/mine/radio2.png"></image>
				</view>
			</view>
		</view> -->
    <view class="lan-box">
      <view class="li" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
        <text class="text">{{item.text}}</text>
        <view class="default-icon" v-if="item.code != applicationLocale">
          <image class="img" src="../../static/images/mine/radio1.png"></image>
        </view>
        <view class="select-icon" v-if="item.code == applicationLocale">
          <image class="img" src="../../static/images/new/select.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      systemLocale: '',
      applicationLocale: ''
    }
  },
  computed: {
    locales () {
      return [{
        text: this.$t('locale.en'),
        code: 'en'
      },
      {
        text: this.$t('locale.zh-hans'),
        code: 'zh-Hans'
      }

      ]
    }
  },
  onLoad () {
    let systemInfo = uni.getSystemInfoSync();
    this.systemLocale = systemInfo.language;
    this.applicationLocale = uni.getLocale();
    this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
    uni.onLocaleChange((e) => {
      this.applicationLocale = e.locale;
    })
  },
  methods: {
    onLocaleChange (e) {
      // #ifdef H5
      uni.setStorageSync('UNI_LOCALE', e.code)
      uni.setStorageSync('locale', e.code)
      this.$i18n.locale = e.code;
      // #endif
      // #ifdef APP-PLUS
      if (this.isAndroid) {
        uni.showModal({
          content: this.$t('index.language-change-confirm'),
          success: (res) => {
            if (res.confirm) {
              uni.setLocale(e.code);
            }
          }
        })
      } else {
        uni.setLocale(e.code);
        this.$i18n.locale = e.code;
      }
      // #endif
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.lan-page {
  .lan-box {
    padding: 0 30rpx;
    .li {
      padding: 36rpx 0;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      position: relative;
      .icon {
        width: 34rpx;
        height: 34rpx;
        .default {
        }
      }
    }
    .select-icon {
      position: absolute;
      top: 50%;
      margin-top: -17rpx;
      right: 0;
      width: 40rpx;
      height: 40rpx;
    }
    .default-icon {
      position: absolute;
      top: 50%;
      margin-top: -17rpx;
      right: 0;
      width: 34rpx;
      height: 34rpx;
    }
    .active {
      .icon {
        .default {
          display: none;
        }
        .selected {
          display: block;
        }
      }
    }
  }
}
</style>