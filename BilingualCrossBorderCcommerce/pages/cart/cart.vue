<template>
	<view class="cart">
		<view class="head">
			<image src="/static/images/new-index/return.png" class="return" @click="toBack()"></image>
			<view class="txt">My Cart</view>
			<view class="right">
				<image src="/static/images/new-index/edit.png"></image>
				<view>Edit</view>
			</view>
		</view>

		<!--购物车商品列表-->
		<view class="list">
			<view class="head_info">
				<image src="../../static/images/new-index/wxz.png" class="head_logo"></image>
				<view class="head_txt">Best Household</view>
				<image src="../../static/images/products/right.png" class="head_more"></image>
			</view>

			<view class="item">
				<image src="/static/images/new-index/wxz.png" class="logo"></image>
				<image src="../../static/fxtu.png" class="img"></image>
				<view class="info">
					<view class="name">Xiaomi 33W Power Bank 10000mA Pock EditiPock3 Power Bank</view>
					<view class="guige">
						<view>256GB,10000mAh,Pro</view>
						<image src="/static/images/new-index/btm.png"></image>
					</view>
					<view class="tags">
						<view>xiaomi</view>
					</view>
					<view class="price">RM1990.00</view>
					<view class="btn">
						<u-number-box v-model="num" @change="valChange"></u-number-box>
					</view>
				</view>
			</view>
		</view>

		<view class="btm">
			<image src="../../static/images/new-index/wxz.png"></image>
			<view class="btm-all">All</view>
			<view class="btm-price">Total:<span>RM</span><span style="font-size: 36rpx;">13069.00</span></view>
			<view class="btm-btn">Check Out(4)</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 1
			}
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.head {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: rgb(10, 198, 142);

			.return {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			.txt {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.right {
				position: absolute;
				right: 32rpx;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				display: flex;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
		}

		.btm {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 96rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);

			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 32rpx;
			}

			.btm-all {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
				margin-left: 24rpx;
			}

			.btm-price {
				position: absolute;
				right: 248rpx;
				font-size: 28rpx;
				color: rgb(51, 51, 51);

				span {
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);
				}
			}

			.btm-btn {
				position: absolute;
				right: 32rpx;
				width: 200rpx;
				height: 72rpx;
				line-height: 72rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 72rpx;
			}

		}

		.list {
			width: 100%;
			padding-top: 32rpx;
			background: #fff;

			.head_info {
				width: 100%;
				display: flex;
				align-items: center;

				.head_logo {
					width: 40rpx;
					height: 40rpx;
					margin-left: 32rpx;
				}

				.head_txt {
					font-size: 36rpx;
					color: rgb(51, 51, 51);
					margin-left: 24rpx;
				}

				.head_more {
					width: 28rpx;
					height: 28rpx;
					margin-left: 8rpx;
				}
			}
		
			.item{
				width: 100%;
				display: flex;
				align-items: center;
				
				.logo{
					width: 40rpx;
					height: 40rpx;
					margin: 0 24rpx 0 32rpx;
				}
				
				.img{
					width: 172rpx;
					height: 172rpx;
					border-radius: 16rpx;
					margin-right: 24rpx;
				}
				
				.info{
					width: 416rpx;
					
					.name{
						width: 100%;
						font-size: 24rpx;
						line-height: 36rpx;
						color: rgb(51, 51, 51);
						word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					
					.guige{
						font-size: 24rpx;
						color: rgb(153, 153, 153);
						padding: 8rpx 8rpx;
						display: flex;
						align-items: center;
						background: rgb(242, 242, 242);
						border-radius: 40rpx;
						margin-top: 16rpx;

						image{
							width: 16rpx;
							height: 16rpx;
							margin-left: 8rpx;
						}
					}
					
				}
				
			}
			
		}

	}
</style>