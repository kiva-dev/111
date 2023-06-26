<template>
	<view class="registration-layout">
		<view class="rl-sunlight">
			<image src="@/static/images/active/active_icon_sunlight.png" mode="widthFix"></image>
		</view>
		<view class="rl-coconut">
			<image src="@/static/images/active/active_icon_coconut.png" mode="widthFix"></image>
		</view>
		<view class="rl-header">
			<view class="rl-header-back" @click="onBack">
				<image src="@/static/images/active/active_btn_back.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="rl-title">
			<p :style="{'fontSize': isEnglish ? '64rpx' : '88rpx'}">{{$t('active.title1')}}</p>
			<p :style="{'fontSize': isEnglish ? '54rpx' : '68rpx'}">{{$t('active.title2')}}</p>
		</view>
		<view class="rl-title2" :style="{'letter-spacing': isEnglish ? '0' : '16rpx'}">
			<text>{{$t('active.title3')}}</text>
		</view>
		<view class="rl-gift">
			<image src="@/static/images/active/active_icon_box.png" mode="widthFix"></image>
		</view>
		<view class="rl-address">
			<view class="rl-address-content">
				<view class="content-code">
					<image :src="qrcodeImg" mode="widthFix"></image>
				</view>
				<view class="content-info">
					<a href="https://h5.kolibrimall.com" target="_blank">https://h5.kolibrimall.com</a>
					<p>{{$t('active.illustrate')}}</p>
				</view>
			</view>
			<view class="rl-address-chain">
				<image src="@/static/images/active/active_icon_chain.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="rl-step">
			<view class="rl-step-title">
				<span>{{$t('active.stepTit')}}</span>
			</view>
			<view class="rl-step-content">
				<view class="content-item">
					<view class="ci-icon">
						<image src="@/static/images/active/active_icon_step1.png" mode="widthFix"></image>
					</view>
					<view class="ci-text">{{$t('active.step1')}}</view>
				</view>
				<view class="content-item">
					<view class="ci-icon">
						<image src="@/static/images/active/active_icon_step2.png" mode="widthFix"></image>
					</view>
					<view class="ci-text">{{$t('active.step2')}}</view>
				</view>
				<view class="content-item">
					<view class="ci-icon">
						<image src="@/static/images/active/active_icon_step3.png" mode="widthFix"></image>
					</view>
					<view class="ci-text">{{$t('active.step3')}}</view>
				</view>
			</view>
		</view>
		<view class="rl-text">{{$t('active.text')}}</view>
		<view class="rl-grass">
			<image src="@/static/images/active/active_icon_grass.png" mode="widthFix"></image>
		</view>
		<view class="commission-canvas">
			<canvas class="f__canvas" style="width:140px;height:140px;" canvas-id="qrcode" id="qrcode"></canvas>
		</view>
	</view>
</template>

<script>
	import {saveImg, qrcodeCanvas } from '@/uni_modules/fan-canvas/plugins/utils';
	
	export default {
		data() {
			return {
				code: '',
				qrUrl: '',
				qrcodeImg: '',
				userCont: '',
				isEnglish: true,
			}
		},
		onLoad() {
			this.isEnglish = uni.getStorageSync('locale') == 'en' ? true : false;
			setTimeout(() => {
				this.createQrcode();
			},1000)
		},
		methods: {
			onBack() {
				uni.navigateBack();
			},
			createQrcode() {
				var that = this
				qrcodeCanvas('qrcode', this.$baseUrl, 280, 280);
				const ctx = uni.createCanvasContext('qrcode');
				ctx.fillStyle = "#fff"
				ctx.draw(true, function() {
					uni.canvasToTempFilePath({
						width: 280,
						height: 280,
						canvasId: 'qrcode',
						success(res) {
							that.qrcodeImg = res.tempFilePath
						}
					}, that)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.registration-layout {
		width: 100%;
		min-height: 100vh;
		background: url('@/static/images/active/active_bg_registration.png') no-repeat;
		background-size: 100% 100%;
		padding-top: 88rpx;
		box-sizing: border-box;
		position: relative;
		
		.rl-sunlight {
			width: 800rpx;
			position: absolute;
			top: -138rpx;
			left: -350rpx;
			
			image {
				width: 100%;
			}
		}
		
		.rl-coconut {
			width: 236rpx;
			position: absolute;
			top: 0;
			right: 0;
			
			image {
				width: 100%;
			}
		}
		
		.rl-header {
			width: 100%;
			height: 88rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			
			.rl-header-back {
				width: 40rpx;
				height: 40rpx;
				
				image {
					width: 100%;
				}
			}
		}
		
		.rl-title {
			width: 100%;
			text-align: center;
			position: relative;
			z-index: 10;
			
			p {
				margin: 6rpx;
				color: rgb(255, 255, 255);
				font-weight: bold;
			}
		}
		
		.rl-title2 {
			margin: 34rpx auto 0;
			width: 560rpx;
			height: 66rpx;
			background: url('@/static/images/active/active_bg_btn.png') no-repeat;
			background-size: 100% 100%;
			text-align: center;
			line-height: 66rpx;
			
			text {
				color: rgb(255, 255, 255);
				font-size: 32rpx;
			}
		}
		
		.rl-gift {
			width: 100%;
			margin-top: 20rpx;
			
			image {
				width: 100%;
			}
		}
		
		.rl-address {
			margin: 0 40rpx;
			background: rgb(138, 213, 255);
			border-radius: 28rpx;
			padding: 6rpx;
			box-sizing: border-box;
			position: relative;
			
			.rl-address-content {
				width: 100%;
				background: rgb(255, 255, 255);
				border-radius: 24rpx;
				padding: 32rpx 44rpx 60rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				
				.content-code {
					width: 136rpx;
					height: 136rpx;
					border-radius: 8rpx;
					border: 1rpx solid rgb(138, 213, 255);
					box-sizing: border-box;
					
					image {
						width: 100%;
					}
				}
				
				.content-info {
					flex: 1;
					height: 136rpx;
					margin-left: 40rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					
					a {
						color: rgb(58, 113, 236);
						font-size: 32rpx;
					}
					
					p {
						color: rgb(51, 51, 51);
						font-size: 28rpx;
					}
				}
			}
			
			.rl-address-chain {
				width: 570rpx;
				height: 106rpx;
				position: absolute;
				bottom: -68rpx;
				left: 50%;
				transform: translateX(-50%);
				z-index: 999;
				
				image {
					width: 100%;
				}
			}
		}
		
		.rl-step {
			margin: 40rpx;
			background: rgb(138, 213, 255);
			border-radius: 28rpx;
			padding: 6rpx;
			box-sizing: border-box;
			position: relative;
			
			.rl-step-title {
				width: 280rpx;
				height: 76rpx;
				background: linear-gradient(180.00deg, rgb(89, 194, 255),rgb(78, 175, 255) 100%);
				border-radius: 0 0 24rpx 24rpx;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
				line-height: 76rpx;
				
				span {
					color: rgb(255, 255, 255);
					font-size: 40rpx;
					font-weight: 700;
				}
			}
			
			.rl-step-content {
				width: 100%;
				background: rgb(255, 255, 255);
				border-radius: 24rpx;
				padding: 100rpx 24rpx 32rpx;
				box-sizing: border-box;
				
				.content-item {
					width: 100%;
					margin-bottom: 24rpx;
					background: rgb(234, 242, 255);
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					padding: 24rpx;
					box-sizing: border-box;
					
					.ci-icon {
						width: 128rpx;
						height: 128rpx;
						
						image {
							width: 100%;
						}
					}
					
					.ci-text {
						flex: 1;
						margin-left: 32rpx;
						color: rgb(51, 51, 51);
						font-size: 24rpx;
						line-height: 36rpx;
					}
				}
			}
		}
		
		.rl-text {
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			color: rgb(255, 255, 255);
			font-size: 24rpx;
		}
		
		.rl-grass {
			width: 100%;
			margin-top: 46rpx;
			
			image {
				width: calc(100% + 146rpx);
				transform: translateX(-80rpx);
			}
		}
		
		.commission-canvas {
			position: fixed;
			top: -1000000rpx;
		}
	}
</style>