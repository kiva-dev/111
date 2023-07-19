<template>
	<view class="width-page">
		<view class="header">
			<view class="header-top">
				<image src="/static/images/luck/balance.png"></image>
				<view>{{$t('user.recharge.dqje')}}：RM <text>{{money * 1}}</text></view>
			</view>
			<view class="header-tit">{{$t('user.recharge.czje')}}</view>
			<view class="header-input">
				<view class="tip">RM</view>
				<view class="myinput">
					<input type="number" v-model="rechargeNum" placeholder-style="font-size:28rpx;color:rgb(153, 153, 153);" :placeholder="$t('user.recharge.qsrczje')" />
				</view>
			</view>
		</view>
		
		<view class="paymethod">
			
			<view class="paytit">{{$t('order.zhifufangshi')}}</view>
			
			<!--支付方式-->
			<view class="pay" v-for="item in payList.slice(0,2)" :key="item.id">
				<view class="pay-info">
					<image :src="item.url" class="logo"></image>
					<view class="pay-info-name">{{item.name}}</view>
					<image src="/static/images/new-index/wxz.png" class="select" v-show="!item.select"
						@click="changPay(item)">
					</image>
					<image src="/static/images/new-index/xz.png" class="select" v-show="item.select"
						@click="changPay(item)">
					</image>
				</view>
				<view class="pay-info-des" v-show="item.select">{{item.title}}</view>
			</view>
			
			<view class="info-ts-sm">{{$t('pay.pay_not')}}</view>
			
			<!--暂不支持的支付方式-->
			<view class="pay" style="opacity: 0.5;" v-for="item in payList.slice(2,6)" :key="item.id">
				<view class="pay-info">
					<image :src="item.url" class="logo"></image>
					<view class="pay-info-name">{{item.name}}</view>
					<!--<text v-if="item.id==1">({{$t('new.need_real_name')}})</text> -->
					<image src="/static/images/new-index/wxz.png" class="select" v-show="!item.select">
					</image>
				</view>
			</view>
		</view>
		
		<view class="info-ts-sm">{{$t('new.sxfsm')}}</view>
		
		<view class="protocol">
			<image src="/static/images/new-index/wxz.png" v-show="!selectProtocol" @click="switchProtocol(true)">
			</image>
			<image src="/static/images/new-index/xz.png" v-show="selectProtocol" @click="switchProtocol(false)">
			</image>
			<view>{{$t('auction.detail.brywqydbty')}} <text>《用户充值协议》</text></view>
		</view>
		
		<view class="topay" v-show="!showPay">{{$t('new.payment')}}</view>
		<view class="topay" style="background: rgb(10, 198, 142);" v-show="showPay" @click="rechargeBalance()">
			{{$t('new.payment')}}
		</view>
		
		
	</view>
</template>

<script>
	import $ from '../../common/jquery-3.6.1.min.js'
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				money: '',
				rechargeNum: '',
				showPay:false,//是否显示充值按钮
				selectProtocol:false,//协议勾选
				infoData:[],//实名信息
				payList: [{
						id: 2,
						url: '/static/images/kbrick/paypal.png',
						select: true,
						name: 'Paypal',
						title: this.$t('pay.paypal_ts')
					},
					{
						id: 1,
						url: '/static/images/new-index/pe.png',
						select: false,
						name: 'PayEssence',
						title: this.$t('pay.pay_essence')
					},
					{
						id: 3,
						url: '/static/images/new-index/apple.png',
						select: false,
						name: 'Apple pay',
						title: ''
					},
					{
						id: 4,
						url: '/static/images/luck/visa.png',
						select: false,
						name: 'Visa',
						title: ''
					},
					{
						id: 5,
						url: '/static/images/luck/MasterCard.png',
						select: false,
						name: 'MasterCard',
						title: ''
					},
					{
						id: 6,
						url: '/static/images/luck/Cryptocurrency.png',
						select: false,
						name: 'Cryptocurrency',
						title: ''
					},
					{
						id: 7,
						url: '/static/images/luck/debit_card.png',
						select: false,
						name: 'Debit Card',
						title: ''
					}
				],
			}
		},
		onShow() {
			// 获取个人信息
			this.onMineInfo()
			
			this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
				this.infoData = res.data
			})
		},
		methods: {
			// 获取个人信息
			onMineInfo() {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.money = res.data.recharge_money_balance
					}
				})
			},
			switchProtocol(val) {
				this.selectProtocol = val
				if (this.selectProtocol) {
					this.payList.forEach(item => {
						if (item.select) this.showPay = true
					})
				}
			},
			changPay(item) {
				item.select = !item.select
				this.payList.forEach(data => {
					if (item.id != data.id) data.select = false
					if (item.select) this.showPay = true
					else this.showPay = false
				})
			},
			
			//充值余额
			rechargeBalance() {
				if (!this.rechargeNum || this.rechargeNum * 1 < 10) {
					uni.showToast({
						title: this.$t('new.czjejx'),
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (!this.selectProtocol) {
					uni.showToast({
						title: this.$t('login.qydxybty'),
						icon: 'none',
						duration: 2000
					})
					return
				}
			
				//计算支付方式
				let isNum = 0
				this.payList.forEach(item => {
					if (item.select) isNum = item.id
				})
			
			
				if (this.infoData.length < 1 && isNum == 1) {
					uni.showToast({
						title: this.$t('smrz'),
						icon: 'none',
						duration: 3000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/mine/Vid'
						})
					}, 3000)
					return
				}
			
				if (isNum == 1) {
					this.payEssenceRecharge()
				} else if (isNum == 2) {
					this.paypalRecharge()
				}
			
			},
			//第三方支付
			payEssenceRecharge() {
				uni.showLoading({
					title: this.$t('new.czz'),
					mask: true
				})
				this.$http.post(this.$apiObj.RechargeAddMoney, {
					money: this.rechargeNum
				}).then(res => {
					uni.hideLoading()
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
						uni.redirectTo({
							url: '/pages/mine/webview?url=' + formStr
						});
						//  #endif
					}
				})
			},
			
			//paypal支付
			paypalRecharge() {
				uni.showLoading({
					title: this.$t('new.czz'),
					mask: true
				})
				let type = ''
				// #ifdef H5
				type = 'web'
				// #endif
			
				// #ifdef APP
				type = 'app'
				// #endif
				let arr = getCurrentPages()
				let listData = []
				arr.forEach(item => {
					listData.push(item.route)
				})
				this.$http.post(this.$apiObj.PaypalRecharge, {
					money: this.rechargeNum,
					recharge_type: 1,
					referrer: type,
					front_extra: listData.toString()
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						// #ifdef H5
						window.location.href = res.data.href_url
						uni.setStorageSync('window_href', true)
						// window.open(res.data.href_url)
						// #endif
						// #ifdef APP-PLUS
						plus.runtime.openURL(
							res.data.href_url,
							function(err) {
								console.log(err)
							}
						)
						//  #endif
						setTimeout(() => {
							uni.showModal({
								title: this.$t('mine.tip'),
								content: this.$t('new.isczcg'),
								cancelText: this.$t('home.search.query'),
								confirmText: this.$t('new.wycz'),
								success: (data) => {
									if (data.confirm) {
										this.getPayOrderInfo(res.data.out_trade_no, res.data
											.payment_order_no)
									}
								},
							})
						}, 1000)
			
					}
			
			
				})
			},
			//查询订单状态
			getPayOrderInfo(out_trade_no, third_platform_order_no) {
				this.$http.post(this.$apiObj.GetOrderStatus, {
					out_trade_no,
					third_platform_order_no
				}).then(res => {
					if (res.data.status == 1) {
						this.selectProtocol = false
						this.onMineInfo()
					} else if (res.data.status == -1) {
						uni.showToast({
							title: this.$t('new.nyqxzf'),
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: this.$t('new.wcdddzfzt'),
							icon: 'none',
							duration: 2000
						})
			
					}
			
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.width-page {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);
		
		.header{
			width: 750rpx;
			padding: 40rpx 0;
			background: #fff;
			
			.header-top{
				width: 100%;
				display: flex;
				align-items: center;
				
				image{
					width: 40rpx;
					height: 40rpx;
					margin-left: 32rpx;
				}
				
				view{
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					margin-left: 16rpx;
					
					text{
						font-size: 32rpx;
						font-weight: bold;
					}
				}
				
			}
			
			.header-tit{
				font-size: 32rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				margin: 64rpx 0 32rpx 32rpx;
			}
			
			.header-input{
				width: 686rpx;
				height: 96rpx;
				display: flex;
				align-items: center;
				background: rgb(249, 249, 249);
				border-radius: 12rpx;
				margin: 0 auto;
				
				.tip{
					font-size: 28rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
					margin: 0 40rpx 0 32rpx;
				}
				
				.myinput{
					width: 534rpx;
					font-size: 28rpx;
				}
				
			}
			
		}
		
		.paymethod{
			width: 750rpx;
			padding: 32rpx 0;
			background: #fff;
			margin: 20rpx 0;
			
			.paytit{
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				margin: 0 0 32rpx 32rpx;
			}
			
		}
		
		.pay{
			position: relative;
			width: 686rpx;
			margin: 0 auto 40rpx auto;
		}
		
		.pay-info-des{
			width: 558rpx;
			font-size: 20rpx;
			color: rgb(153, 153, 153);
			margin: 0 auto;
		}
		
		.pay-info {
			position: relative;
			width: 686rpx;
			display: flex;
			align-items: center;
		
			.logo {
				width: 48rpx;
				height: 48rpx;
			}
		
			.pay-info-name {
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin-left: 20rpx;
		
				text {
					color: red;
					margin-left: 4rpx;
				}
			}
			
			
		
			.select {
				position: absolute;
				right: 0;
				width: 40rpx;
				height: 40rpx;
			}
		
		}
		
		.info-ts-sm {
			width: 686rpx;
			font-size: 22rpx;
			color: rgb(102, 102, 102);
			word-break: break-all;
			margin: 20rpx auto 40rpx auto;
		}
		
		.protocol {
			width: 686rpx;
			font-size: 24rpx;
			color: rgb(102, 102, 102);
			display: flex;
			margin: 40rpx auto 0 auto;
		
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 16rpx;
			}
		
			view {
				width: 640rpx;
			}
		
			text {
				color: rgb(51, 51, 51);
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
			margin: 12rpx auto 0 auto;
		}
		
	}
</style>