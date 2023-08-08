<template>
	<view class="coupon">
		<view class="coupon-head">
			<image src="/static/images/mine/left.png"></image>
			<view>Coupon</view>
		</view>

		<view class="switch">
			<view class="switch-info" :class="select == 1 ? 'switch-select':''" @click="select=1">
				<view>To be used</view>
				<text v-show="select==1"></text>
			</view>
			<view class="switch-info" :class="select == 2 ? 'switch-select':''" @click="select=2">
				<view>Used</view>
				<text v-show="select==2"></text>
			</view>
			<view class="switch-info" :class="select == 3 ? 'switch-select':''" @click="select=3">
				<view>Expired</view>
				<text v-show="select==3"></text>
			</view>
		</view>

		<view class="list">
			<template v-if="select == 1">
				<view class="item">
					<view class="item-left">
						<view class="item-left-info">
							<image src="/static/images/kbrick/diamond.png"></image>
							<view>50</view>
						</view>
						<view class="item-price">RM10</view>
					</view>
					<view class="item-right">
						<view class="item-name">No threshold voucher</view>
						<view class="item-time">Validity period：
							<view>
								<u-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" autoStart millisecond
									@change="onChange">
									<view class="time">
										<view class="time__custom">
											<text
												class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
										</view>
										<text class="time__doc">:</text>
										<view class="time__custom">
											<text class="time__custom__item">{{ timeData.minutes }}</text>
										</view>
										<text class="time__doc">:</text>
										<view class="time__custom">
											<text class="time__custom__item">{{ timeData.seconds }}</text>
										</view>
									</view>
								</u-count-down>
							</view>
						</view>
					</view>
					<view class="item-btn">To Use</view>
				</view>
			</template>
			<template v-else-if="select == 2">
				<view class="item">
					<view class="item-left"
						style="background: url('/static/images/coupon/coupon_not.png') no-repeat;background-size: 188rpx 168rpx;">
						<view class="item-left-info" style="color: #fff;">
							<image src="/static/images/kbrick/diamond.png"></image>
							<view>50</view>
						</view>
						<view class="item-price" style="color: #fff;">RM10</view>
					</view>
					<view class="item-right">
						<view class="item-name" style="color: rgb(153, 153, 153);">No threshold voucher</view>
						<view class="item-time" style="color: rgb(204, 204, 204);">Validity period:7Days
						</view>
					</view>

					<image src="/static/images/coupon/used.png" class="item-image"></image>
				</view>
			</template>
			<template v-else-if="select == 3">
				<view class="item">
					<view class="item-left"
						style="background: url('/static/images/coupon/coupon_not.png') no-repeat;background-size: 188rpx 168rpx;">
						<view class="item-left-info" style="color: #fff;">
							<image src="/static/images/kbrick/diamond.png"></image>
							<view>50</view>
						</view>
						<view class="item-price" style="color: #fff;">RM10</view>
					</view>
					<view class="item-right">
						<view class="item-name" style="color: rgb(153, 153, 153);">No threshold voucher</view>
						<view class="item-time" style="color: rgb(204, 204, 204);">Validity period:7Days
						</view>
					</view>
				
					<image src="/static/images/coupon/expired.png" class="item-image"></image>
				</view>
			</template>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				select: 1,
				timeData: {}
			}
		},
		methods: {
			onChange(e) {
				this.timeData = e
			}
		}
	}
</script>

<style lang="less" scoped>
	.coupon {
		width: 750rpx;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: rgb(248, 248, 248);

		.coupon-head {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #fff;

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
				text-align: center;
			}
		}

		.switch {
			width: 750rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			background: #fff;

			.switch-info {
				position: relative;
				width: 33.33%;
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				text-align: center;

				text {
					position: absolute;
					left: 50%;
					bottom: -4rpx;
					transform: translate(-50%, 0);
					width: 64rpx;
					height: 8rpx;
					background: rgba(10, 198, 142, 0.3);
					border-radius: 8rpx;
				}
			}

			.switch-select {
				font-weight: bold;
				color: rgb(10, 198, 142);
			}

		}

		.list {
			width: 750rpx;
			margin-top: 24rpx;

			.item {
				position: relative;
				width: 676rpx;
				height: 168rpx;
				display: flex;
				align-items: center;
				background: rgb(255, 255, 255);
				border-radius: 0 32rpx 32rpx 0;
				margin: 0 auto 20rpx auto;

				.item-left {
					position: relative;
					width: 188rpx;
					height: 168rpx;
					background: url('/static/images/coupon/coupon.png') no-repeat;
					background-size: 188rpx 168rpx;
					margin-left: -10rpx;

					.item-left-info {
						position: absolute;
						top: 28rpx;
						left: 50%;
						transform: translate(-50%, 0);
						font-size: 64rpx;
						font-weight: bold;
						color: rgb(255, 57, 57);
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 8rpx;
						}
					}

					.item-price {
						position: absolute;
						bottom: 28rpx;
						width: 100%;
						font-size: 24rpx;
						color: rgb(153, 153, 153);
						text-align: center;
					}
				}

				.item-right {
					width: 300rpx;
					margin-left: 26rpx;

					.item-name {
						width: 100%;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						// word-break: break-all;
					}

					.item-time {
						font-size: 20rpx;
						color: rgb(153, 153, 153);
						display: flex;
						align-items: center;
						margin-top: 26rpx;
					}

				}

				.item-image {
					position: absolute;
					right: 32rpx;
					width: 116rpx;
					height: 116rpx;
				}

				.item-btn {
					position: absolute;
					right: 32rpx;
					width: 116rpx;
					height: 48rpx;
					line-height: 48rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);
					text-align: center;
					box-sizing: border-box;
					border: 2rpx solid rgb(255, 57, 57);
					border-radius: 48rpx;

				}

			}

		}

	}
</style>

<style lang="scss">
	.time {
		@include flex;
		align-items: center;

		&__custom {
			margin-top: 4px;
			width: 32rpx;
			height: 32rpx;
			background-color: rgb(255, 57, 57);
			border-radius: 8rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #fff;
				font-size: 20rpx;
				text-align: center;
			}
		}

		&__doc {
			color: $u-primary;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 20rpx;
			margin-right: 4px;
		}
	}
</style>