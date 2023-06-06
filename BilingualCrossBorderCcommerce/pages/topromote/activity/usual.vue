<template>
	<view class="share">
		<view class="share-head">
			<image src="/static/images/mine/index.png" class="share-head-index" @click="toindex"></image>
			<image src="/static/images/mine/share.png" class="share-head-share" @click="open"></image>
			<image src="/static/images/mine/but.png" class="share-head-btn" @click="toregister"></image>
		</view>

		<view class="share-content">
			<!-- <view style="height: 120rpx;"></view> -->
			<image class="share-content-head" src="/static/images/mine/share/title.png"></image>

			<view class="share-buzou">
				<view class="share-buzou-left">setp 01</view>
				<view class="share-buzou-right">Registration, login,<br /> and real-name authentication</view>
			</view>

			<image class="share-img" src="/static/images/mine/share/content1.png"></image>

			<view class="share-buzou">
				<view class="share-buzou-left">setp 02</view>
				<view class="share-buzou-right">Recharge</view>
			</view>
			
			<image class="share-img2" src="/static/images/mine/share/content2.png"></image>
			
			<view class="share-buzou">
				<view class="share-buzou-left">setp 03</view>
				<view class="share-buzou-right">Place an order to participate <br/>in the auction</view>
			</view>
			
			<image class="share-img3" src="/static/images/mine/share/content3.png"></image>
			
			<view class="share-buzou">
				<view class="share-buzou-left">setp 04</view>
				<view class="share-buzou-right">Receveid Reward</view>
			</view>
			
			<image class="share-img4" src="/static/images/mine/share/content4.png"></image>
			
			<view class="share-buzou">
				<view class="share-buzou-left">setp 05</view>
				<view class="share-buzou-right">Cash withdrawal</view>
			</view>
			
			<view class="share-content-bottom">
				In the "Me" menu, select "My wallet" - "Withdrawal", enter the amount you want to withdraw, select your bank card account, and submit. After receiving your withdrawal application, the platform will process it for you as soon as possible.
			</view>
			
		</view>
		
		<uni-popup ref="share" type="bottom">
			<view class="mine-share">
				<view class="mine-share-tit">Share To</view>
				
				<view class="mine-share-list">
					<view class="mine-share-item">
						<image src="/static/images/share21.png"></image>
						<view class="mine-share-name">Twitter</view>
					</view>
					
					<view class="mine-share-item mine-share-center">
						<image src="/static/images/share23.png"></image>
						<view class="mine-share-name">Facebook</view>
					</view>
					
					<view class="mine-share-item">
						<image src="/static/images/share25.png"></image>
						<view class="mine-share-name">Copy Link</view>
					</view>
				</view>
				
				<view class="mine-share-line"></view>
				
				<view class="mine-share-close" @click="closeShare">Cancel</view>
				
			</view>
		</uni-popup>
		
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			toindex(){
				uni.switchTab({
					url:'/pages/auction/auction'
				})
			},
			toregister(){
				uni.navigateTo({
					url:'/pages/public/register'
				})
			},
			open(){
				this.$refs.share.open()
			},
			closeShare(){
				this.$refs.share.close()
			}
		}
	}
</script>

<style lang="less">
	.share {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(225.00deg, rgba(169, 20, 19, 1.00) 0%, rgba(225, 46, 0, 1.00) 26.712%, rgba(242, 105, 75, 1.00) 71.679%, rgba(255, 134, 114, 1.00) 100%);

		.share-head {
			position: relative;
			width: 750rpx;
			height: 684rpx;
			background: url('/static/images/mine/banner.png') no-repeat;
			background-size: 750rpx 684rpx;

			.share-head-index {
				position: absolute;
				top: 40rpx;
				left: 40rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			.share-head-share {
				position: absolute;
				top: 40rpx;
				right: 40rpx;
				width: 60rpx;
				height: 60rpx;
			}

			.share-head-btn {
				position: absolute;
				top: 272rpx;
				right: 56rpx;
				width: 260rpx;
				height: 70rpx;
			}
		}

		.share-content {
			position: relative;
			width: 710rpx;
			background: #FFF;
			box-shadow: 0rpx 6rpx 8rpx rgba(0, 0, 0, 0.3);
			border-radius: 40rpx;
			padding: 120rpx 0 60rpx 0;
			margin: -230rpx auto 0rpx auto;

			.share-content-head {
				position: absolute;
				top: -20rpx;
				left: 106rpx;
				display: block;
				width: 498rpx;
				height: 120rpx;

			}

			.share-buzou {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 42rpx;

				.share-buzou-left {
					width: 200rpx;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 40rpx;
					font-weight: 700;
					color: #FFFFFF;
					text-indent: 16rpx;
					background: linear-gradient(180.00deg, rgba(255, 134, 114, 1.00), rgba(255, 169.27, 121.7, 1.00) 100%);
					opacity: 0.7;
					border-radius: 0rpx 40rpx 40rpx 0rpx;
				}

				.share-buzou-right {
					// width: 446rpx;
					font-size: 32rpx;
					color: #E33307;
					margin-left: 30rpx;
				}

			}

			.share-img {
				display: block;
				width: 640rpx;
				height: 2212rpx;
				margin: 64rpx auto 0 auto;
			}
			
			.share-img2 {
				display: block;
				width: 640rpx;
				height: 2514rpx;
				margin: 64rpx auto 0 auto;
			}
			
			.share-img3 {
				display: block;
				width: 640rpx;
				height: 4314rpx;
				margin: 64rpx auto 0 auto;
			}
			
			.share-img4 {
				display: block;
				width: 640rpx;
				height: 2104rpx;
				margin: 64rpx auto 0 auto;
			}
			
			.share-content-bottom{
				width: 660rpx;
				line-height: 38rpx;
				font-size: 32rpx;
				color: #E33307;
				word-break: break-all;
				text-indent: 50rpx;
				margin: 60rpx auto 0 auto;
			}
			
		}
		
		.mine-share{
			width: 100%;
			height: 524rpx;
			padding-top: 30rpx;
			background: #FFF;
			border-radius: 16rpx 16rpx 0 0;
			
			.mine-share-tit{
				width: 100%;
				font-size: 32rpx;
				font-weight: 700;
				color: #FF4E2F;
				text-align: center;
			}
			
			.mine-share-list{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 60rpx;
				
				.mine-share-center{
					margin: 0 100rpx;
				}
				
				.mine-share-item{
					text-align: center;
					
					image{
						width: 100rpx;
						height: 100rpx;
					}
					
					.mine-share-name{
						font-size: 24rpx;
						color: #2C2C2C;
						margin-top: 20rpx;
					}
				}
			}
		
			.mine-share-line{
				width: 100%;
				border-bottom: 1rpx solid #BEBEBE;
				margin: 20rpx 0 60rpx 0;
			}
			
			.mine-share-close{
				width: 100%;
				font-size: 32rpx;
				font-weight: 700;
				color: #BEBEBE;
				text-align: center;
			}
			
		}
		
	}
</style>