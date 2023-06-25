<template>
	<view class="invite-layout">
		<view class="il-top">
			<view class="il-header">
				<view class="il-header-back" @click="onBack">
					<image src="@/static/images/active/active_btn_back.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="il-title">
				<p>{{$t('active.invite')}}</p>
				<p>{{$t('active.enjoy')}}</p>
			</view>
			<view class="il-tab">
				<span>{{$t('active.share')}}</span>
			</view>
		</view>
		<view class="il-rebate">
			<view class="il-rebate-title">{{$t('active.rebateTit')}}</view>
			<view class="il-rebate-flow">
				<div class="flow-arrow">
					<image src="@/static/images/active/active_icon_arrow.png" mode="widthFix"></image>
				</div>
				<image src="@/static/images/active/active_icon_rebate1.png" mode="widthFix"></image>
				<p>{{$t('active.rebate1')}}</p>
			</view>
			<view class="il-rebate-flow">
				<div class="flow-arrow">
					<image src="@/static/images/active/active_icon_arrow.png" mode="widthFix"></image>
				</div>
				<image src="@/static/images/active/active_icon_rebate2.png" mode="widthFix"></image>
				<p>{{$t('active.rebate2')}}</p>
			</view>
			<view class="il-rebate-flow">
				<image src="@/static/images/active/active_icon_rebate3.png" mode="widthFix"></image>
				<p>{{$t('active.rebate3')}}</p>
			</view>
		</view>
		<view class="il-text">{{$t('active.invitetxt')}}</view>
		<view style="height: 1rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			onBack() {
				uni.navigateBack();
			},
		}
	}
</script>

<style lang="less" scoped>
	.invite-layout {
		width: 100%;
		min-height: 100vh;
		background: url("@/static/images/active/active_bg_invite.png") no-repeat;
		background-size: 100% 100%;
		position: relative;
		
		.il-top {
			width: 100%;
			height: 950rpx;
			background: url("@/static/images/active/active_bg_top.png") no-repeat;
			background-size: 100% 100%;
			padding-top: 88rpx;
			box-sizing: border-box;
			
			.il-header {
				width: 100%;
				height: 88rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				
				.il-header-back {
					width: 40rpx;
					height: 40rpx;
					
					image {
						width: 100%;
					}
				}
			}
			
			.il-title {
				width: 100%;
				margin-top: -60rpx;
				text-align: center;
				
				p {
					margin: 6rpx;
					color: rgb(255, 255, 255);
					font-size: 40rpx;
					font-weight: bold;
					
					&:first-child {
						font-size: 88rpx;
					}
				}
			}
			
			.il-tab {
				width: 400rpx;
				height: 60rpx;
				margin: 40rpx auto 0;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 200rpx;
				text-align: center;
				line-height: 60rpx;
				
				span {
					color: rgb(255, 81, 57);
					font-size: 32rpx;
					font-weight: 600;
				}
			}
		}
		
		.il-rebate {
			margin: 0 32rpx;
			background: rgb(255, 255, 255);
			border-radius: 24rpx;
			padding: 88rpx 50rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			position: relative;
			
			.il-rebate-title {
				width: 312rpx;
				height: 62rpx;
				background: url("@/static/images/active/active_bg_title.png") no-repeat;
				background-size: 100% 100%;
				text-align: center;
				line-height: 62rpx;
				color: rgb(255, 255, 255);
				font-size: 26rpx;
				position: absolute;
				top: -16rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			
			.il-rebate-flow {
				width: 33.33%;
				text-align: center;
				position: relative;
				
				.flow-arrow {
					width: 48rpx;
					position: absolute;
					top: 48rpx;
					right: -18rpx;
					transform: translateY(-50%);
					
					image {
						width: 100%;
					}
				}
				
				image {
					width: 96rpx;
				}
				
				p {
					margin-top: 32rpx;
					padding: 0 12rpx;
					box-sizing: border-box;
					color: rgb(102, 102, 102);
					font-size: 24rpx;
				}
			}
		}
		
		.il-text {
			margin: 32rpx;
			background: rgb(255, 255, 255);
			border-radius: 24rpx;
			padding: 24rpx;
			box-sizing: border-box;
			color: rgb(102, 102, 102);
			font-size: 28rpx;
			line-height: 40rpx;
		}
	}
</style>