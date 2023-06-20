<template>
	<view class="collect-layout">
		<view class="cl-header">
			<view class="cl-header-container">
				<p>收藏 · 订阅</p>
				<image src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="cl-switch">
			<view @click="collectType = 'goods'" :class="collectType === 'goods' ? 'active':''">收藏商品</view>
			<view @click="collectType = 'store'" :class="collectType === 'store' ? 'active':''">订阅店铺</view>
			<view class="cl-switch-line" :style="{ left: collectType === 'goods' ? '20.5%':'71%'}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectType: 'goods', //goods store
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.collect-layout {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
		
		.cl-header {
			width: 100%;
			background: rgb(255, 255, 255);
			padding-top: 88rpx;
			box-sizing: border-box;
			
			.cl-header-container {
				width: 100%;
				height: 88rpx;
				text-align: center;
				line-height: 88rpx;
				position: relative;
				
				p {
					color: rgb(51, 51, 51);
					font-size: 40rpx;
				}
				
				image {
					width: 40rpx;
					position: absolute;
					top: 50%;
					left: 32rpx;
					transform: translateY(-50%);
				}
			}
		}
		
		.cl-switch {
			width: 100%;
			height: 80rpx;
			background: rgb(255, 255, 255);
			display: flex;
			position: relative;
			color: rgb(51, 51, 51);
			font-size: 28rpx;
			text-align: center;
			line-height: 80rpx;
			
			view {
			  flex: 1;
			  transition: color .2s;
					
			  &.active {
			    position: relative;
			    color: rgb(10, 198, 142);
			  }
			}
			
			.cl-switch-line {
			  position: absolute;
			  background: rgba(10, 198, 142, 0.3);
			  width: 64rpx;
			  height: 8rpx;
			  border-radius: 100rpx;
			  bottom: 12rpx;
			  left: 0;
			  transition: left .5s;
			}
		}
	}
</style>