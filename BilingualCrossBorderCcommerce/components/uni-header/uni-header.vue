<template>
	<view class="header-layout">
		<view class="hl-header">
			<view class="hl-header-back" @click="onBack">
				<image src="@/static/images/mine/header_btn_back.png" mode="widthFix"></image>
			</view>
			<view class="hl-header-title">{{title || ''}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			onBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less" scoped>
	.header-layout {
		width: 100%;
		background: rgb(255, 255, 255);
		padding-top: 60rpx;
		box-sizing: border-box;
		
		.hl-header {
			width: 100%;
			height: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 1rpx solid rgb(204, 204, 204);
			box-sizing: border-box;
			position: relative;
			
			.hl-header-back {
				width: 40rpx;
				display: flex;
				position: absolute;
				top: 50%;
				left: 32rpx;
				transform: translateY(-50%);
				
				image {
					width: 100%;
				}
			}
			
			.hl-header-title {
				color: rgb(51, 51, 51);
				font-size: 40rpx;
				font-weight: 600;
			}
		}
	}
</style>