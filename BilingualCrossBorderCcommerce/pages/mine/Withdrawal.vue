<template>
	<view class="width-page">
		<!--width-head start-->
		<view class="width-head">
			<view class="label">{{$t('user.drawal.ktxye')}}</view>
			<view class="num">
				RM
				<text class="f-36">{{money}}</text>
			</view>
		</view>
		<!--width-head end-->
		<view class="line"></view>
		<!--width-box start-->
		<view class="width-box">
			<view class="width-t">{{$t('user.drawal.txye')}}</view>
			<!--width-hd start-->
			<view class="width-hd" style="margin-bottom:0;">
				<view class="t">RM</view>
				<input class="input" placeholder-class="color-999" v-model="moneys"
					:placeholder="$t('user.drawal.qsrtxye')" />
				<button class="hd-btn" @click="onQuanbu">{{$t('user.drawal.qbtx')}}</button>
			</view>
			<view style="margin-bottom:40rpx;color:#FF4E2F;margin-left:80rpx">{{$t('tixiansxf')}}{{user_tocash_rate}}%
			</view>
			<!--width-hd end-->
			<view class="width-t">{{$t('user.drawal.txfs')}}</view>
			<!--width-li start-->
			<view class="width-li">
				<view class="label">{{$t('user.drawal.ylzf')}}
					<block v-if="CardCont">（{{CardCont.account.substr(0,4)}}****{{CardCont.account.substr(-3)}}）</block>
				</view>
				<view class="li-r">
					<text class="color-red" style="color: #FF4E2F;" v-if="CardCont"
						@click="navClick('bank')">{{$t('user.drawal.qhyhk')}}</text>
					<text class="color-red" style="color: #FF4E2F;" v-else
						@click="navClick('bank')">{{$t('user.drawal.yhklb')}}</text>
					<image class="img" src="../../static/images/more3.png"></image>
				</view>
			</view>
			<!--width-li end-->
			<!--width-li start-->
			<!-- <view class="width-li">
        <view class="label">PayPal支付（3656***7444）</view>
        <view class="li-r">
          <text class="color-red" @click="navClick('bindingP')">绑定账号</text>
          <radio value="r2" style="transform:scale(0.8);" />
        </view>
      </view> -->
			<!--width-li end-->
			<!--width-bot start-->
			<view class="width-bot">
				<button class="public-btn" style="background: #FF4E2F;"
					@click.stop="$noMultipleClicks(onRechargeTocash)">{{$t('user.drawal.ljtx')}}</button>
			</view>
			<!--width-bot end-->
		</view>
		<!--width-box end-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				money: 0, // 账户余额
				moneys: '', // 提现金额
				CardCont: '', // 银行卡
				user_tocash_rate: 0
			}
		},
		onShow() {
			if (uni.getStorageSync('yhkList')) {
				this.CardCont = uni.getStorageSync('yhkList')
			} else {
				this.$http.post(this.$apiObj.MineBankCardList).then(res => {
					if (res.code == 1) {
						this.CardCont = res.data[0]
					}
				})
			}
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					this.money = res.data.tocash_money
				}
			})
			this.$http.post(this.$apiObj.IndexSetting).then(res => {
				if (res.code == 1) {
					this.user_tocash_rate = res.data.user_tocash_rate
				}
			})
		},
		methods: {
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			onQuanbu() {
				this.moneys = this.money
			},
			// 立即提现
			onRechargeTocash() {
				// console.log(this.moneys, Number(this.money));
				if (!this.moneys) return uni.showToast({
					title: this.$t('user.drawal.qsrtxye'),
					icon: 'none'
				})
				if (this.moneys > Number(this.money)) return uni.showToast({
					title: this.$t('user.drawal.txjebndyktxje'),
					icon: 'none'
				})
				this.$http.post(this.$apiObj.RechargeTocash, {
					money: this.moneys,
					bank_id: this.CardCont.id
				}).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: './Wsuccess'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.width-page {
		.width-head {
			padding: 40rpx 30rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;

			.label {
				color: #666;
				margin-right: 20rpx;
			}
		}

		.line {
			height: 20rpx;
			background: #f9f9f9;
		}

		.width-box {
			padding: 40rpx 30rpx;

			.width-t {
				font-size: 28rpx;
				font-weight: 550;
			}

			.width-hd {
				padding: 30rpx 0;
				margin-bottom: 35rpx;
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;

				.t {
					font-size: 42rpx;
					font-weight: 550;
				}

				.input {
					font-size: 28rpx;
					flex: 1;
					margin: 0 20rpx;
				}

				.hd-btn {
					font-size: 28rpx;
					white-space: nowrap;
				}
			}

			.width-li {
				padding: 30rpx 0;
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;

				.li-r {
					display: flex;
					align-items: center;

					/deep/ uni-radio {
						margin-left: 20rpx;
					}

					/deep/ uni-radio .uni-radio-input.uni-radio-input-checked {
						background: rgb(255, 78, 47) !important;
						border-color: rgb(255, 78, 47) !important;
					}

					.img {
						width: 20rpx;
						height: 36rpx;
						margin-left: 10rpx;
					}
				}
			}

			.width-li:nth-last-of-type(1) {
				border: none;
			}

			.width-bot {
				margin: 50rpx 0;
			}
		}
	}
</style>