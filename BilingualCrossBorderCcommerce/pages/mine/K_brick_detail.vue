<template>
	<view class="kbrick">
		<view class="kbrick-head">
			<image src="/static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view class="tit">My K Diamonds</view>
			<view class="head-detail">View details</view>
		</view>

		<view class="kbrick-info">
			<view class="info-name">My K Diamonds</view>
			<view class="info-num">120.00</view>
			<image src="/static/images/kbrick/diamond.png"></image>
		</view>

		<view class="title">K Diamonds recharge</view>

		<view class="list">
			<view class="item" v-for="(item,i) in list" :key="i">
				<view class="item-tags">Give 10</view>
				<view class="item-num">
					<image src="/static/images/kbrick/diamond.png"></image>
					<view>{{item}}</view>
				</view>
				<view class="item-price">RM {{item}}</view>
			</view>
		</view>

		<view class="info-ts">
			<image src="/static/images/kbrick/kbx.png"></image>
			<view>Welfare: First recharge bonus!</view>
		</view>
		<view class="info-ts-sm">Explanation: The balance received as a bonus for recharging K Diamondsis called Wallet
			Bonus.</view>

		<view class="title">Payment method</view>

		<view class="pay-info" v-for="item in payList" :key="item.id">
			<image :src="item.url" class="logo"></image>
			<view>{{item.name}}</view>
			<image src="/static/images/new-index/wxz.png" class="select" v-show="!item.select" @click="changPay(item)">
			</image>
			<image src="/static/images/new-index/xz.png" class="select" v-show="item.select" @click="changPay(item)">
			</image>
		</view>

		<view class="topay" v-show="!showPay">Payment</view>
		<view class="topay" style="background: rgb(10, 198, 142);" v-show="showPay">Payment</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [10, 30, 98, 198, 598, 998],
				showPay:false,
				payList: [{
						id: 1,
						url: '/static/images/kbrick/paypal.png',
						select: false,
						name: 'PayPal'
					},
					{
						id: 2,
						url: '/static/images/new-index/apple.png',
						select: false,
						name: 'Apple Pay'
					}
				]
			}
		},
		methods: {
			onReturn() {
				uni.navigateBack()
			},
			changPay(item) {
				item.select = !item.select
				this.payList.forEach(data=>{
					if(item.id != data.id) data.select=false
					if(item.select) this.showPay=true
					else this.showPay=false
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.kbrick {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: rgb(248, 248, 248);

		.kbrick-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #FFF;

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 10;
			}

			.tit {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

			.head-detail {
				position: absolute;
				right: 32rpx;
				font-size: 24rpx;
				color: rgb(51, 51, 51);
				z-index: 10;
			}

		}

		.kbrick-info {
			position: relative;
			width: 686rpx;
			height: 172rpx;
			color: #FFF;
			padding-top: 48rpx;
			background: url('/static/images/kbrick/kbrick_bj.png')no-repeat;
			background-size: 686rpx 220rpx;
			margin: 24rpx auto 40rpx auto;

			.info-name {
				font-size: 28rpx;
				color: rgb(255, 255, 255);
				margin-left: 48rpx;
			}

			.info-num {
				font-size: 56rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				margin-left: 48rpx;
				margin-top: 14rpx;
			}

			image {
				position: absolute;
				top: 30rpx;
				right: 48rpx;
				width: 160rpx;
				height: 160rpx;
			}

		}

		.title {
			font-size: 28rpx;
			color: rgb(51, 51, 51);
			margin: 0 0 24rpx 32rpx;
		}

		.list {
			width: 686rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			margin: 0 auto;

			.item {
				position: relative;
				width: 216rpx;
				height: 160rpx;
				padding-top: 56rpx;
				background: #FFF;
				border-radius: 24rpx;
				margin-bottom: 20rpx;

				.item-num {
					width: 100%;
					font-size: 40rpx;
					color: rgb(51, 51, 51);
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 48rpx;
						height: 48rpx;
					}
				}

				.item-price {
					width: 100%;
					font-size: 28rpx;
					color: rgb(102, 102, 102);
					text-align: center;
					margin-top: 32rpx;
				}

				.item-tags {
					position: absolute;
					top: 0;
					left: 0;
					width: 112rpx;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 20rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgb(27, 161, 255);
					border-radius: 24rpx 0 24rpx 0;
				}

			}

		}

		.info-ts {
			width: 686rpx;
			height: 64rpx;
			font-size: 20rpx;
			color: rgb(27, 161, 255);
			display: flex;
			align-items: center;
			background: rgb(226, 239, 249);
			border-radius: 64rpx;
			margin: 0 auto;

			image {
				width: 32rpx;
				height: 32rpx;
				margin: 0 12rpx 0 32rpx;
			}
		}

		.info-ts-sm {
			width: 686rpx;
			font-size: 22rpx;
			color: rgb(102, 102, 102);
			word-break: break-all;
			margin: 20rpx auto 40rpx auto;
		}

		.pay-info {
			position: relative;
			width: 686rpx;
			display: flex;
			align-items: center;
			margin: 0 auto 40rpx auto;

			.logo {
				width: 48rpx;
				height: 48rpx;
			}

			view {
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin-left: 20rpx;
			}

			.select {
				position: absolute;
				right: 0;
				width: 40rpx;
				height: 40rpx;
			}

		}

		.topay {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: #FFF;
			text-align: center;
			background: rgba(10, 198, 142, 0.5);
			border-radius: 88rpx;
			margin: 22rpx auto 0 auto;
		}

	}
</style>