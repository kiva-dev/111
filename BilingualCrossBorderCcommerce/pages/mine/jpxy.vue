<template>
  <view class="about-page">
    <view class="about-box">
      <view class="about-article" v-if="isShopCont" v-html="e_auction_agree"></view>
      <view class="about-article" v-else v-html="auction_agree"></view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      isShopCont: false,// 商品详情显示中文还是英文
      auction_agree: '',
      e_auction_agree: '',
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.$http.post(this.$apiObj.IndexSetting).then(res => {
      if (res.code == 1) {
        res.data.auction_agree = this.onHtmlcont(res.data.auction_agree)
        res.data.e_auction_agree = this.onHtmlcont(res.data.e_auction_agree)
        this.auction_agree = res.data.auction_agree
        this.e_auction_agree = res.data.e_auction_agree
      }
    })
  },
  methods: {
    onHtmlcont (html) {
      let richtext = html
      const regex = new RegExp('<img', 'gi');
      richtext = richtext.replace(regex, '<img style="max-width: 100%;"');
      const regex1 = new RegExp('data-fail="0" style="', 'gi');
      richtext = richtext.replace(regex1, 'data-fail="0" style="max-width: 100%;');
      return richtext
    },
  }
}
</script>

<style lang="less" scoped>
.about-page {
  .about-box {
    padding: 30rpx;
    .about-logo {
      width: 36%;
      padding: 30rpx 0;
      margin: 0 auto;
    }
    .about-article {
      font-size: 28rpx;
      line-height: 1.6;
    }
  }
}
</style>