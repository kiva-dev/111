<template>
	<view class="points-detail">
		<view class="points-detail-content">
			<view class="points-detail-head">
				<image src="/static/images/auth/left.png" @click="toReturn()"></image>
				<view>积分明细</view>
			</view>
			
			<view class="points-detail-info">
				<view class="points-detail-info-num">127</view>
				<view class="points-detail-info-txt">我的积分</view>
			</view>
			
			<view class="points-detail-tit">
				<view class="points-detail-tit-line"></view>
				<view class="points-detail-tit-des">积分明细</view>
			</view>
			
			<view class="points-detail-item" v-for="(item) in [1,1,1]">
				<image src="../../static/images/auth/qdz.png"></image>
				<view class="points-detail-item-info">
					<view class="points-detail-item-info-txt">XX竞拍订单交易成功</view>
					<view class="points-detail-item-info-time">2023/06/05 14:58</view>
				</view>
				<view class="points-detail-item-price">+58.00</view>
			</view>
			
		</view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			toReturn(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.points-detail {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);
		
		.points-detail-content{
			width: 100%;
			height:800rpx;
			background: linear-gradient(180.00deg, rgba(255,117,46,1.00),rgba(255,211,132,0.70) 53.435%,rgba(255,255,255,0.00) 100%);
		}

		.points-detail-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			image{
				position: absolute;
				left: 20rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}
			
			view{
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
			}
			
		}
		
		.points-detail-info{
			width: 686rpx;
			height: 192rpx;
			text-indent: 60rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background: url('/static/images/auth/xk-qdz.png') no-repeat;
			background-size: 686rpx 192rpx;
			margin: 70rpx auto 0 auto;
			
			.points-detail-info-num{
				font-size: 72rpx;
				color: rgb(44, 44, 44);
			}
			
			.points-detail-info-txt{
				font-size: 28rpx;
				color: rgb(149, 149, 149);
				margin-top: 10rpx;
			}
			
		}
		
		.points-detail-tit{
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 50rpx;
			margin-bottom: 32rpx;
			
			.points-detail-tit-line{
				width: 8rpx;
				height: 40rpx;
				background: rgb(255, 179, 0);
				border-radius: 4rpx;
				margin: 0 12rpx 0 42rpx;
			}
			
			.points-detail-tit-des{
				font-size: 32rpx;
				color: rgb(44, 44, 44);
			}
			
		}
		
		.points-detail-item{
			position: relative;
			width: 686rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);
			border-radius: 16rpx;
			box-shadow: 0px 2rpx 5rpx rgba(44, 44, 44, 0.1);
			margin: 0 auto 20rpx auto;
			
			image{
				width: 60rpx;
				height: 60rpx;
				margin-left: 32rpx;
			}
			
			.points-detail-item-info{
				max-width: 420rpx;
				margin-left: 30rpx;
				
				.points-detail-item-info-txt{
					width: 100%;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
				.points-detail-item-info-time{
					font-size: 20rpx;
					color: rgb(190, 190, 190);
					margin-top: 12rpx;
				}
				
			}
			
			.points-detail-item-price{
				position: absolute;
				right: 28rpx;
				font-size: 28rpx;
				color: rgb(44, 44, 44);
			}
			
		}
		
	}
</style>