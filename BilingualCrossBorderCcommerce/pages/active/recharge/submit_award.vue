<template>
	<view class="submit_award">
		<view class="head">
			<image src="/static/images/kbrick/kleft.png" @click="toBack()"></image>
			<view>{{$t('recharge.send_award')}}</view>
		</view>

		<!--sub-head start-->
		<view class="sub-head" @click="navClick('/pages/address/address')">
			<view class="head-fl" v-if="addCont">
				<view class="icon">
					<image class="img" src="@/static/images/new-index/address.png"></image>
				</view>
				<view class="txt">
					<view class="b">
						<text class="name">{{addCont.name}}</text>
						<text class="phone">{{addCont.mobile.slice(0, 3)}}****{{addCont.mobile.substr(-4)}}</text>
					</view>
					<view class="t">{{addCont.detail}}</view>
				</view>
			</view>

			<view class="head-fl" v-else>
				<view class="icon">
					<image class="img" src="@/static/images/new-index/address.png"></image>
				</view>
				<view class="txt">
					<view class="t">{{$t('order.addContXuanze')}}</view>
				</view>
			</view>
			<view class="more">
				<image class="img" src="/static/images/more2.png"></image>
			</view>
		</view>
		<!--sub-head end-->

		<view class="product">
			<view class="product_head" :style="isShopCount ? '' : 'width: 200rpx;'">
				<image src="/static/images/mine/rule/gift_red.png"></image>
				<view>{{$t('recharge.czhdhl')}}</view>
			</view>
			<view class="info">
				<image :src="info.prize_image" class="left"></image>
				<view class="right">
					<view class="name">{{info.prize_name}}</view>
					<view class="price">
						<view class="price-tit">{{$t('recharge.product_value')}}:</view>
						<view class="money">RM <text>{{info.prize_price}}</text></view>
					</view>
				</view>
			</view>

			<u-line style="width: 638rpx;margin: 32rpx auto;"></u-line>

			<view class="product-tit">{{$t('user.order.detail.dingdanxx')}}</view>

			<view class="data">
				<view class="data-key">{{$t('recharge.winning_date')}}: </view>
				<view class="data-value">{{$u.timeFormat(info.create_time, 'yyyy.mm.dd hh:MM:ss')}}</view>
			</view>

			<view class="data">
				<view class="data-key">{{$t('recharge.task')}}:</view>
				<view class="data-value">{{$u.timeFormat(info.expire_time, 'yyyy.mm.dd hh:MM:ss')}}</view>
			</view>

		</view>

		<view class="btn" @click.stop="AwardKdiamond()">{{$t('order_info.submit')}}</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				address_id: '', // 地址id
				addCont: '', // 收货地址
				isShopCount: uni.getStorageSync('locale') == 'en' ? true : false,
				info: {},
				flag:true
			}
		},
		onShow() {
			this.onAddressList()
		},
		onLoad(e) {
			if (e.data) {
				this.info = JSON.parse(e.data)
				console.log(this.info)
			}
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 收货地址
			onAddressList() {
				this.addCont = ''
				this.address_id = 0
				this.$http.post(this.$apiObj.AddressList, {
					page: 1,
					pagenum: 1000
				}).then(res => {
					if (res.code == 1) {
						for (let i in res.data.data) {
							if (res.data.data[i].is_default == 1) {
								this.addCont = res.data.data[i]
								this.address_id = res.data.data[i].id
							}
						}
					}
				})
			},
			AwardKdiamond() {
				if(!this.address_id){
					uni.showToast({
						title: this.$t('user.address.qtxshdz'),
						icon: 'none',
						duration: 2500
					})
					return
				}
				if(!this.flag) return
				this.flag = false
				this.$http.post(this.$apiObj.AwardKdiamond, {
					h5_user_id: this.info.h5_user_id,
					user_lucky_lottery_prize_id: this.info.user_lucky_lottery_prize_id,
					user_lucky_lottery_record_id: this.info.user_lucky_lottery_record_id,
					address_id: this.address_id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('home.lingqucg'),
							icon: 'none',
							duration: 2500
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/mine/order/order?tabIndex=10'
							})
							this.flag = true
						}, 1500)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.submit_award {
		width: 750rpx;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.head {
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
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}
		}

		.sub-head {
			width: 650rpx;
			height: 100rpx;
			background: #fff;
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 24rpx auto 0 auto;
			border-radius: 16rpx;

			.head-fl {
				display: flex;
				align-items: center;

				.icon {
					width: 73rpx;
					height: 73rpx;
					min-width: 73rpx;
					margin-right: 35rpx;
				}

				.txt {
					.t {
						width: 520rpx;
						font-size: 26rpx;
						word-break: break-all;
						margin-top: 20rpx;
					}

					.c {
						font-size: 28rpx;
						margin: 10rpx 0;
					}

					.b {
						display: flex;
						white-space: nowrap;

						.name {
							font-size: 32rpx;
							color: rgb(51, 51, 51);
							margin-right: 20rpx;
						}

						.phone {
							font-size: 26rpx;
							color: #999;
						}
					}
				}
			}

			.more {
				width: 16rpx;
				height: 32rpx;
				min-width: 16rpx;
				margin-left: 20rpx;
			}
		}

		.product {
			width: 686rpx;
			padding: 24rpx 0 40rpx 0;
			background: #fff;
			border-radius: 20rpx;
			margin: 24rpx auto;

			.product_head {
				max-width: 300rpx;
				height: 36rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border: 2rpx solid rgb(255, 57, 57);
				border-radius: 36rpx;
				margin-left: 24rpx;

				image {
					width: 36rpx;
					height: 36rpx;
				}

				view {
					font-size: 20rpx;
					color: rgb(255, 57, 57);
					margin-left: 8rpx;
				}
			}

			.info {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 24rpx;

				.left {
					display: block;
					width: 178rpx;
					height: 170rpx;
					border-radius: 16rpx;
					margin: 0 24rpx;
				}

				.right {
					.name {
						width: 400rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.price {
						margin-top: 36rpx;

						.price-tit {
							font-size: 20rpx;
							color: rgb(102, 102, 102);
						}

						.money {
							font-size: 20rpx;
							font-weight: 700;
							color: rgb(51, 51, 51);

							text {
								font-size: 32rpx;
							}
						}
					}
				}
			}

			.product-tit {
				font-size: 28rpx;
				font-weight: 700;
				color: rgb(51, 51, 51);
				margin-left: 24rpx;
			}

			.data {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 34rpx;

				.data-key {
					font-size: 28rpx;
					color: rgb(102, 102, 102);
					margin-left: 24rpx;
				}

				.data-value {
					position: absolute;
					right: 24rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
				}
			}

		}

		.btn {
			position: fixed;
			left: 32rpx;
			bottom: 40rpx;
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(10, 198, 142);
			border-radius: 88rpx;
		}

	}
</style>