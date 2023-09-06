<template>
	<view class="my_prize">
		<view class="top">
			<view class="head">
				<image src="/static/images/auth/left.png" @click="toBack()"></image>
				<view class="tit">{{$t('recharge.my_prize')}}</view>
			</view>
		</view>

		<view class="list">
			<view class="tit" v-if="countdown > 0 && list.length>0">
				<view class="tit_name">{{$t('recharge.countdown')}}: </view>
				<view>
					<u-count-down :time="countdown" format="HH:mm:ss" autoStart millisecond @change="onChange">
						<view class="time">
							<view class="time__custom"
								style="width: 40rpx;height: 40rpx;background-color: rgb(255, 57, 57);">
								<text
									class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
							</view>
							<text class="time__doc" style="color: rgb(255, 57, 57);">:</text>
							<view class="time__custom"
								style="width: 40rpx;height: 40rpx;background-color: rgb(255, 57, 57);">
								<text class="time__custom__item">{{ timeData.minutes }}</text>
							</view>
							<text class="time__doc" style="color: rgb(255, 57, 57);">:</text>
							<view class="time__custom"
								style="width: 40rpx;height: 40rpx;background-color: rgb(255, 57, 57);">
								<text class="time__custom__item">{{ timeData.seconds }}</text>
							</view>
						</view>
					</u-count-down>
				</view>
			</view>

			<view class="item" v-for="(item,i) in list" :key="i">
				<view class="info">
					<view class="left">
						<image :src="item.prize_image" v-if="item.raffle_item_type==1"></image>
						<image src="/static/images/kbrick/diamond.png" v-else></image>
					</view>
					<view class="right">
						<view class="right_tit">
							{{item.prize_name}}
							<block v-if="item.raffle_item_type == 2 && item.reward_type == 2">
								({{isShopCont ? 'Extra gift' : '加赠'}}:{{item.prize_price}})
							</block>
						</view>
						<view class="price">{{$t('recharge.amount')}}:<image src="/static/images/kbrick/diamond.png">
							</image>
							<text style="margin-right: 4rpx;">{{item.recharge_k_diamond_after_lottery * 1}}</text>
							<block>{{$t('recharge.above')}}</block>
						</view>
						<view class="value" v-if="item.raffle_item_type == 1">
							<view class="value_name">{{$t('recharge.product_value')}}:</view>
							<view class="value_num">RM <text>{{item.prize_price * 1}}</text></view>
						</view>
					</view>
				</view>

				<view class="time">{{$t('recharge.winning_date')}}:
					<text>{{$u.timeFormat(item.create_time, 'yyyy.mm.dd hh:MM:ss')}}</text>
				</view>

				<view class="time" v-if="item.award_time">{{$t('recharge.task')}}:
					<text>{{$u.timeFormat(item.award_time, 'yyyy.mm.dd hh:MM:ss')}}</text>
				</view>

				<view class="time" @click="navClick('/pages/mine/order/orderDetail?id='+item.order_no)"
					v-if="item.winning_status == 1">
					{{$t('user.order.detail.number')}}:
					<text>{{item.order_no}}</text>
					<image src="/static/images/mine/wallet_right.png"></image>
				</view>

				<view class="btn" v-show="item.is_sure_award == 0"
					@click="navClick('/pages/mine/K_brick_detail?data='+JSON.stringify(item))">
					{{$t('recharge.qcz')}}
				</view>
				<view class="btn1"
					v-show="item.is_sure_award == 1 && item.raffle_item_type == 1 && item.winning_status == 0"
					@click="navClick('/pages/active/recharge/submit_award?data='+JSON.stringify(item))">
					{{$t('recharge.award')}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeData: {},
				list: [],
				countdown: 0,
				isShopCont: uni.getStorageSync('locale') == 'en' ? true : false
			}
		},
		onShow() {
			this.getPrizeList()
		},
		methods: {
			onChange(e) {
				this.timeData = e
			},
			toBack() {
				uni.redirectTo({
					url: '/pages/active/recharge/recharge'
				})
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			getPrizeList() {
				this.$http.post(this.$apiObj.MyPrize).then(res => {
					if (res.code == 1) {
						this.list = res.data
						if (res.data[0].is_sure_award == 0) {
							this.calculate(res.data[0].expire_time)
						}
					}
				})
			},
			calculate(endTime) {
				let time = new Date().getTime()
				let down = parseInt(endTime * 1000 - time)
				this.countdown = down > 0 ? down : 0
			},

			AwardKdiamond(h5_user_id, user_lucky_lottery_prize_id, user_lucky_lottery_record_id) {
				this.$http.post(this.$apiObj.AwardKdiamond, {
					h5_user_id,
					user_lucky_lottery_prize_id,
					user_lucky_lottery_record_id,
					address_id: ''
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('home.lingqucg'),
							icon: 'none',
							duration: 2500
						})
						this.getPrizeList()
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.my_prize {
		width: 750rpx;
		min-height: 100vh;

		.top {
			width: 750rpx;
			height: 240rpx;
			background: url('/static/images/active/prize_head.png') no-repeat;
			background-size: 750rpx 240rpx;

			.head {
				position: relative;
				width: 750rpx;
				height: 88rpx;
				padding-top: 88rpx;
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
					font-weight: bold;
					color: #fff;
					text-align: center;
				}
			}
		}

		.list {
			position: relative;
			width: 750rpx;
			min-height: 1000rpx;
			padding: 40rpx 0;
			background: rgb(248, 248, 248);
			border-radius: 32rpx 32rpx 0 0;
			margin-top: -50rpx;
			z-index: 10;

			.tit {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 40rpx;

				.tit_name {
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					margin-right: 8rpx;
				}
			}

			.item {
				position: relative;
				width: 686rpx;
				padding: 24rpx 0;
				background: #fff;
				border-radius: 16rpx;
				margin: 0 auto 20rpx auto;

				.info {
					width: 100%;
					display: flex;
					align-items: center;

					.left {
						position: relative;
						width: 160rpx;
						height: 160rpx;
						background: rgb(255, 255, 255);
						border: 2rpx solid rgb(243, 243, 243);
						border-radius: 16rpx;
						margin: 0 32rpx 0 24rpx;

						image {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							width: 128rpx;
							height: 128rpx;
						}
					}

					.right {

						.right_tit {
							font-size: 28rpx;
							font-weight: bold;
							color: rgb(51, 51, 51);
						}

						.price {
							font-size: 20rpx;
							color: rgb(102, 102, 102);
							margin: 24rpx 0;

							image {
								width: 32rpx;
								height: 32rpx;
								margin-left: 8rpx;
							}

							text {
								font-size: 32rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);
								text-align: center;
								margin-left: 8rpx;
							}
						}

						.value {
							display: flex;
							align-items: center;

							.value_name {
								font-size: 20rpx;
								color: rgb(102, 102, 102);
							}

							.value_num {
								font-size: 16rpx;
								color: rgb(51, 51, 51);
								margin-left: 8rpx;

								text {
									font-size: 26rpx;
									font-weight: bold;
								}
							}
						}
					}

				}

				.time {
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					display: flex;
					align-items: center;
					margin: 20rpx 0 0 24rpx;

					text {
						color: rgb(51, 51, 51);
						margin-left: 4rpx;
					}

					image {
						width: 24rpx;
						height: 24rpx;
						margin-left: 4rpx;
					}
				}

				.btn {
					position: absolute;
					right: 18rpx;
					bottom: 24rpx;
					width: 164rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: linear-gradient(90.00deg, rgb(249, 118, 48), rgb(244, 67, 66) 98.871%);
					border-radius: 60rpx;
				}

				.btn1 {
					position: absolute;
					right: 18rpx;
					bottom: 24rpx;
					width: 164rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					color: rgb(249, 118, 48);
					text-align: center;
					background: #fff;
					box-sizing: border-box;
					border: 2rpx solid rgb(249, 118, 48);
					border-radius: 60rpx;
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
			width: 22px;
			height: 22px;
			background-color: $u-primary;
			border-radius: 4px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #fff;
				font-size: 12px;
				text-align: center;
			}
		}

		&__doc {
			color: $u-primary;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}
</style>