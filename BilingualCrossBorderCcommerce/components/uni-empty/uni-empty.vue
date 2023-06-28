<template>
  <view class="empty-layout">
    <image :src="image ? image: require('@/static/images/zanwusju.png')" mode="widthFix"></image>
    <p>{{message || '请稍候...'}}</p>
  </view>
</template>

<script>
	export default {
		props: ['message', 'image'],
		data() {
			return {}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.empty-layout {
	  width: 100%;
	  text-align: center;
	  margin-top: 160rpx;
	
	  > image {
	    width: 400rpx;
	    margin-bottom: 40rpx;
	  }
	
	  > p {
	    color: #908F94;
	    font-size: 28rpx;
	  }
	}
</style>