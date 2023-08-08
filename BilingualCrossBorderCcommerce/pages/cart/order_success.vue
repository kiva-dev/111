<template>
	<view class="order-success">
		<view class="success-head-info">
			<view class="success-head">
				<image src="/static/images/auth/left.png" @click="toBack()"></image>
				<view>{{$t('top.zhifucg')}}</view>
			</view>
			<view class="content">
				<view class="content-des">
					<image src="/static/images/service/order_success.png"></image>
					<view class="content-info">
						<view>{{$t('top.zhifucg')}}</view>
						<view style="font-size: 24rpx;">{{$t('new.thankbuy')}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="info">
			<view class="info-price">RM<text>{{price}}</text></view>
			<view class="info-des">
				<view class="info-key">{{$t('new.order_no')}}</view>
				<view class="info-value">
					<view>{{order_no}}</view>
					<image src="/static/images/mine/mine_btn_copy.png" @click="copyVal(order_no)"></image>
				</view>
			</view>

			<view class="info-des">
				<view class="info-key">{{$t('new.order_time')}}</view>
				<view class="info-value">
					<view>{{$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss')}}</view>
				</view>
			</view>
		</view>

		<view class="success-view" @click="toOrder()">{{$t('new.view_order')}}</view>
		<view class="success-index" @click="toIndex()">{{$t('new.toindex')}}</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_no: '',
				price: 0,
				time: ''
			}
		},
		onLoad(e) {
			if (e.order_no) this.order_no = e.order_no
			if (e.order_price) this.price = e.order_price
			if (e.time) this.time = e.time
		},
		mounted() {
			// this.getOrderInfo()
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			toOrder() {
				uni.redirectTo({
					url: '/pages/mine/order/order?tabIndex=10'
				})
			},
			toIndex() {
				uni.switchTab({
					url: '/pages/auction/new_index'
				})
			},
			getOrderInfo() {
				this.$http.post(this.$apiObj.OrderDetailOrder, {
					order_no: this.order_no
				}).then(res => {

				})
			},
			copyVal(val) {
				uni.setClipboardData({
					data: val,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.order-success {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.success-head-info {
			width: 100%;
			background: rgb(10, 198, 142);
		}

		.success-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 60rpx;
			display: flex;
			align-items: center;

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}

		}

		.content {
			width: 750rpx;
			height: 256rpx;
			padding-top: 64rpx;

			.content-des {
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 130rpx;
					height: 140rpx;
				}

				.content-info {
					font-size: 32rpx;
					color: rgb(255, 255, 255);
					margin-left: 32rpx;
				}
			}


		}

		.info {
			width: 686rpx;
			height: 248rpx;
			padding-top: 72rpx;
			background: url('/static/images/service/order_info.png') no-repeat;
			background-size: 686rpx 320rpx;
			margin: -72rpx auto 0 auto;

			.info-price {
				width: 100%;
				font-size: 24rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				text-align: center;
				margin-bottom: 32rpx;

				text {
					font-size: 52rpx;
				}
			}

			.info-des {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 32rpx;

				.info-key {
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					margin-left: 48rpx;
				}

				.info-value {
					position: absolute;
					right: 46rpx;
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}

		}

		.success-view {
			position: fixed;
			left: 32rpx;
			bottom: 152rpx;
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(10, 198, 142);
			border-radius: 88rpx;
		}

		.success-index {
			position: fixed;
			left: 32rpx;
			bottom: 32rpx;
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: rgb(10, 198, 142);
			text-align: center;
			background: #fff;
			box-sizing: border-box;
			border: 1rpx solid rgb(10, 198, 142);
			border-radius: 88rpx;
		}

	}
</style>