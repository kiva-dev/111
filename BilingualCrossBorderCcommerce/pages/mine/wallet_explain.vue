<template>
	<view class="wallet-explain">
		<view class="explain-head">
			<image src="/static/images/kbrick/kleft.png" @click="onReturn"></image>
			<view>{{$t('new.wdzcsm')}}</view>
		</view>

		<view class="explain-info">
			<view class="info-tit">{{$t('new.qbjj')}}</view>
			<view class="info-des">{{$t('new.qbjjsm')}}</view>

			<view class="info-tit">{{$t('new.qbye')}}</view>
			<view class="info-des">{{$t('new.qbyesm')}}</view>

			<view class="info-tit">{{$t('new.kdiamonds')}}</view>
			<view class="info-des" style="margin-bottom: 0;">{{$t('new.kdiamondssm')}}</view>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onReturn() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="less" scoped>
	.wallet-explain {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.explain-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-bottom: 1rpx solid rgb(204, 204, 204);

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 10;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}
		}
		
		.explain-info{
			width: 100%;
			padding: 32rpx 0;
			background: #fff;
			
			.info-tit{
				width: 686rpx;
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin-left: 32rpx;
			}
			
			.info-des{
				width: 686rpx;
				font-size: 24rpx;
				color: rgb(102, 102, 102);
				word-break: break-all;
				margin-left: 32rpx;
				margin-bottom: 40rpx;
			}
		}
		
	}
</style>