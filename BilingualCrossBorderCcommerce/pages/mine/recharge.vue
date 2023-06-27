<template>
	<view class="width-page">
		<!-- <view v-html="formData"></view> -->
		<!--width-head start-->
		<view class="width-head">
			<view class="label">{{$t('user.recharge.dqje')}}</view>
			<view class="num">
				RM
				<text class="f-36">{{mouth}}</text>
			</view>
		</view>
		<!--width-head end-->
		<view class="line"></view>
		<!--width-box start-->
		<view class="width-box">
			<view class="width-t">{{$t('user.recharge.czje')}}</view>
			<!--width-hd start-->
			<view class="width-hd">
				<view class="t">RM</view>
				<input class="input" type="number" placeholder-class="color-999" v-model="money"
					:placeholder="$t('user.recharge.qsrczje')" />
			</view>
			<!--width-hd end-->
			<!-- <view class="width-t">提现方式</view> -->
			<!--width-li start-->
			<!-- <view class="width-li">
				<view class="label">银联支付（5855****545）</view>
				<view class="li-r">
					<text class="color-red">更换银行卡</text>
					<radio value="r1" checked="true" style="transform:scale(0.8);" />
				</view>
			</view> -->
			<!--width-li end-->
			<!--width-li start-->
			<!-- <view class="width-li">
				<view class="label">PayPal支付（3656***7444）</view>
				<view class="li-r">
					<radio value="r2" style="transform:scale(0.8);" />
				</view>
			</view> -->
			<!--width-li end-->
			<!--width-bot start-->
			<view class="width-bot">
				<button class="public-btn" style="background: rgb(10, 198, 142);"
					@click.stop="$noMultipleClicks(onRechargeAddMoney)">{{$t('user.recharge.ljcz')}}</button>
			</view>
			<!--width-bot end-->
		</view>
		<!--width-box end-->
	</view>
</template>

<script>
	import $ from '../../common/jquery-3.6.1.min.js'
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				money: '',
				mouth: '',
				// formData: ""
			}
		},
		onShow() {
			// 获取个人信息
			this.onMineInfo()
		},
		methods: {
			// 获取个人信息
			onMineInfo() {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.mouth = res.data.money
					}
				})
			},
			onRechargeAddMoney() {
				if (!this.money) return uni.showToast({
					title: this.$t('user.recharge.ljcz'),
					icon: 'none'
				})
				if (+this.money < 10) return uni.showToast({
					title: this.$t('monthNum'),
					icon: 'none'
				})
				if (Number.isInteger(+this.money) === false) return uni.showToast({
					title: this.$t('monthNums'),
					icon: 'none'
				})
				this.$http.post(this.$apiObj.RechargeAddMoney, {
					money: this.money
				}).then(res => {
					if (res.code == 1) {
						const formStr = `<form action="${res.data.action_url}" method="POST" >
                        <input name="MerchantCode" value="${res.data.MerchantCode}">
                        <input name="TransNum" value="${res.data.TransNum}">
                        <input name="Currency" value="${res.data.Currency}">
                        <input name="Amount" value="${res.data.Amount}">
                        <input name="PaymentDesc" value="${res.data.PaymentDesc}">
                        <input name="FirstName" value="${res.data.FirstName}">
                        <input name="LastName" value="${res.data.LastName}">
                        <input name="EmailAddress" value="${res.data.EmailAddress}">
                        <input name="PhoneNum" value="${res.data.PhoneNum}">
                        <input name="Address" value="${res.data.Address}">
                        <input name="City" value="${res.data.City}">
                        <input name="State" value="${res.data.State}">
                        <input name="Country" value="${res.data.Country}">
                        <input name="Postcode" value="${res.data.Postcode}">
                        <input name="MerchantRemark" value="${res.data.MerchantRemark}">
                        <input name="Signature" value="${res.data.Signature}">
                      </form>`
						// #ifdef H5
						const div = document.createElement('div')
						div.innerHTML = formStr
						div.setAttribute('style', 'position: absolute; width: 0; height: 0; overflow: hidden;')
						const form = div.querySelector('form')
						document.body.appendChild(div)
						form.submit()
						document.body.removeChild(div)
						//  #endif
						// #ifdef APP-PLUS  
						uni.navigateTo({
							url: '/pages/mine/webview?url=' + formStr
						});
						//  #endif
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
						background: #fc0609 !important;
						border-color: #fc0609 !important;
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