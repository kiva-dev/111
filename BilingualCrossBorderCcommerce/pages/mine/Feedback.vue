<template>
  <view class="feed-page">
    <view class="feed-box">
      <view class="feed-t">{{$t('user.Feedback.wtms')}}</view>
      <view class="feed-text">
        <textarea class="text" v-model="content" placeholder-class="color-999" :placeholder="$t('user.Feedback.qsrnr')"></textarea>
      </view>
      <view class="feed-bot">
        <button class="public-btn" style="background: #FF4E2F;" @click.stop="$noMultipleClicks(onMineFeedback)">{{$t('user.Feedback.ljtj')}}</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      content: '',
    }
  },
  onShow () { },
  methods: {
    onMineFeedback () {
      if (!this.content) return uni.showToast({ title: this.$t('user.Feedback.qsrwtms'), icon: 'none' })
      this.$http.post(this.$apiObj.MineFeedback, { content: this.content }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.Feedback.tjcg'), icon: 'none' })
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
.feed-page {
  padding: 30rpx;
  .feed-t {
    font-size: 28rpx;
    font-weight: 550;
  }
  .feed-text {
    margin-top: 20rpx;
    background: #f9f9f9;
    border-radius: 20rpx;
    padding: 20rpx;
    .text {
      width: 100%;
      font-size: 28rpx;
    }
  }
  .feed-bot {
    margin: 50rpx auto;
  }
}
</style>