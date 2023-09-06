<template>
	<view class="withdrawal_detail">
		<view class="head">
			<image src="/static/images/mine/left.png" @click="toBack()"></image>
			<view>{{$t('withdrawal.tit')}}</view>
		</view>

		<view class="setp">
			<view class="setp_num">
				<image src="/static/images/mine/withdrawal_xz.png"></image>
				<view class="setp_des setp_success">{{$t('withdrawal.ytj')}}</view>
			</view>

			<view class="setp_line success_line"></view>

			<view class="setp_num">
				<image src="/static/images/mine/withdrawal_xz.png" v-if="info.status != 0" ></image>
				<image src="/static/images/mine/withdrawal_wxz.png" v-else></image>
				<view class="setp_des">{{$t('withdrawal.scz')}}</view>
			</view>

			<view class="setp_line success_line" v-if="info.status == 1"></view>
			<view class="setp_line err_line" v-else-if="info.status == -1"></view>
			<view class="setp_line" v-else></view>

			<view class="setp_num">
				<image src="/static/images/mine/withdrawal_xz.png" v-if="info.status == 1"></image>
				<image src="/static/images/mine/withdrawal_err.png" v-else-if="info.status == -1"></image>
				<image src="/static/images/mine/withdrawal_wxz.png" v-else="info.status == 0"></image>

				<view class="setp_des setp_success" v-if="info.status == 1">{{$t('withdrawal.success')}}</view>
				<view class="setp_des setp_err" v-else-if="info.status == -1">{{$t('withdrawal.failed')}}</view>
				<view class="setp_des" v-else="info.status == 0">{{$t('withdrawal.result')}}</view>
			</view>
		</view>

		<u-line color="rgb(204, 204, 204)" style="width: 686rpx;margin: 0 auto;"></u-line>

		<view class="des">
			<view class="info">
				<view class="info_key">{{$t('withdrawal.order_num')}}</view>
				<view class="info_value">{{info.withdraw_no}}</view>
			</view>

			<view class="info">
				<view class="info_key">{{$t('withdrawal.time')}}</view>
				<view class="info_value">{{$u.timeFormat(info.addtime, 'yyyy/mm/dd hh:MM:ss')}}</view>
			</view>

			<view class="info">
				<view class="info_key">{{$t('withdrawal.price')}}</view>
				<view class="info_value">RM {{info.real_money}}</view>
			</view>

			<view class="info">
				<view class="info_key">{{$t('withdrawal.free')}}</view>
				<view class="info_value">RM {{info.rate_money}}</view>
			</view>

			<view class="info">
				<view class="info_key">{{$t('withdrawal.card')}}</view>
				<view class="info_value" style="text-align: right;">{{info.account}}<br />
					({{info.bank_name}})</view>
			</view>
		</view>

		<u-line color="rgb(204, 204, 204)" style="width: 686rpx;margin: 0 auto;"></u-line>

		<view class="voucher" v-if="info.status==1">
			<view class="tit">{{$t('withdrawal.voucher')}}</view>
			<view class="imgs">
				<img :src="info.images"></img>
			</view>
		</view>

		<view class="voucher" v-else-if="info.status==-1">
			<view class="tit">{{$t('withdrawal.err_msg')}}</view>
			<view class="voucher_des">
				{{info.reason}}
			</view>
			<view class="vocher_err">({{$t('withdrawal.yth')}})</view>
		</view>


		<view class="tip">
			{{$t('withdrawal.tip')}}
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(e) {
			this.getInfo(e.id)
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			getInfo(recharge_tocash_id) {
				this.$http.post(this.$apiObj.WithdrawalInfo, {
					recharge_tocash_id
				}).then(res => {
					if (res.code == 1) {
						this.info = res.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.u-text {
		width: 120rpx;
		text-align: center;
		margin: 0 0 0 -16rpx;
	}

	/deep/.u-steps-item__wrapper--row {
		width: 100rpx;
		height: 50rpx;
	}

	.withdrawal_detail {
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
			// box-sizing: border-box;
			border-bottom: 2rpx solid rgb(204, 204, 204);

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

		.setp {
			width: 750rpx;
			padding: 64rpx 0;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			background: #fff;

			.setp_num {
				width: 120rpx;
				text-align: center;

				image {
					width: 48rpx;
					height: 48rpx;
				}

				.setp_des {
					font-size: 24rpx;
					color: rgb(153, 153, 153);
					margin-top: 24rpx;
				}

				.setp_success {
					color: rgb(10, 198, 142);
				}

				.setp_err {
					color: rgb(255, 57, 57);
				}

			}

			.setp_line {
				width: 120rpx;
				height: 4rpx;
				background: rgb(204, 204, 204);
				border-radius: 4rpx;
				margin-top: 20rpx;
			}

			.err_line {
				background: rgb(255, 57, 57);
			}

			.success_line {
				background: rgb(10, 198, 142);
			}

		}

		.des {
			width: 750rpx;
			padding: 40rpx 0 32rpx 0;
			background: #fff;

			.info {
				position: relative;
				width: 100%;
				display: flex;
				align-items: flex-start;
				margin-bottom: 40rpx;

				.info_key {
					font-size: 28rpx;
					color: rgb(102, 102, 102);
					margin-left: 32rpx;
				}

				.info_value {
					position: absolute;
					right: 32rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
				}
			}
		}

		.voucher {
			width: 750rpx;
			padding: 32rpx 0;
			background: #fff;

			.tit {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
				margin-left: 32rpx;
			}

			.imgs {
				position: relative;
				width: 218rpx;
				height: 218rpx;
				box-sizing: border-box;
				border: 2rpx solid rgb(204, 204, 204);
				border-radius: 24rpx;
				margin: 32rpx 0 0 32rpx;

				img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					object-fit: contain;
					width: 90%;
					height: 90%;
				}
			}

			.voucher_des {
				width: 686rpx;
				font-size: 24rpx;
				color: rgb(255, 57, 57);
				margin: 32rpx auto 24rpx auto;
			}

			.vocher_err {
				width: 686rpx;
				font-size: 24rpx;
				color: rgb(102, 102, 102);
				margin: 0 auto;
			}
		}

		.tip {
			width: 686rpx;
			font-size: 24rpx;
			color: rgb(102, 102, 102);
			margin: 32rpx 0 0 32rpx;
		}

	}
</style>