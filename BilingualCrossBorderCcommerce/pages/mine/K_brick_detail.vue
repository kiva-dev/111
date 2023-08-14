<template>
	<view class="kbrick">
		<scroll-view style="height: 100vh;" scroll-y @scroll="PageScroll">
			<view class="kbrick-head">
				<image src="/static/images/kbrick/kleft.png" @click="onReturn()"></image>
				<view class="tit">{{$t('new.wdkz')}}</view>
				<view class="head-detail" @click="toDetail()">{{$t('new.ckmx')}}</view>
			</view>

			<view class="kbrick-info">
				<view class="info-name">{{$t('new.wdkz')}}</view>
				<view class="info-num">{{(balance*1).toFixed(2)}}</view>
				<image src="/static/images/kbrick/diamond.png"></image>
			</view>

			<view class="info-ts">
				<image src="/static/images/kbrick/kbx.png"></image>
				<view v-html="kdiamondxy">{{$t('new.scfl')}}</view>
			</view>



			<view class="title">{{$t('new.kzcz')}}</view>

			<view class="list">
				<view class="item"
					:style="select==(i+1)?'height:216rpx;background: rgb(224, 242, 255);box-sizing: border-box;border: 4rpx solid rgb(27, 161, 255);':''"
					v-for="(item,i) in list" :key="i" @click="switchCzNum(i+1)">
					<view class="item-tags" v-show="item.activity_money">
						<image src="/static/images/kbrick/white_bx.png"></image>
						Free RM {{item.activity_money*1}}
					</view>
					<view class="item-num">
						<image src="/static/images/kbrick/diamond.png"></image>
						<view>{{item.k_diamond}}</view>
					</view>
					<view class="item-price">RM {{item.k_diamond}}</view>
				</view>
			</view>

			<!--自定义充值-->
			<view class="customize" :class="selectPayNum?'select_customize':''">
				<image src="/static/images/kbrick/diamond.png" class="logo"></image>
				<view class="customize-input">
					<input type="text" v-model="payNum" @focus="selectPayNum=true;select=0"
						:placeholder="$t('new.qtczje')" style="font-size: 24rpx;color: rgb(102, 102, 102);" />
				</view>
				<view class="customize-right" v-show="false">
					<image src="/static/images/kbrick/white_bx.png"></image>
					<view>Gift RM 88</view>
				</view>
			</view>

			<!-- <view class="info-ts-sm">{{$t('new.sxfsm')}}</view> -->
			<view class="info-ts-sm">{{$t('new.kzsm')}}</view>


			<view class="title">{{$t('top.zffs')}}</view>

			<!--支付方式-->
			<view class="pay" v-for="item in payList.slice(0,2)" :key="item.id">
				<view class="pay-info">
					<image :src="item.icon" class="logo"></image>
					<view class="pay-info-name">{{item.name}}</view>
					<!--<text v-if="item.id==1">({{$t('new.need_real_name')}})</text> -->
					<image src="/static/images/new-index/wxz.png" class="select" v-show="!item.select"
						@click="changPay(item)">
					</image>
					<image src="/static/images/new-index/xz.png" class="select" v-show="item.select"
						@click="changPay(item)">
					</image>
				</view>
				<view class="pay-info-des" v-show="item.select">{{isShopCont ? item.desc_en : item.desc}}</view>
			</view>

			<view class="info-ts-sm">{{$t('pay.pay_not')}}</view>
			<!--暂不支持的支付方式-->
			<view class="pay" style="opacity: 0.5;" v-for="item in payList.slice(2,6)" :key="item.id">
				<view class="pay-info">
					<image :src="item.icon" class="logo"></image>
					<view class="pay-info-name">{{item.name}}</view>
					<!--<text v-if="item.id==1">({{$t('new.need_real_name')}})</text> -->
					<image src="/static/images/new-index/wxz.png" class="select" v-show="!item.select">
					</image>
				</view>
			</view>

			<view class="protocol">
				<image src="/static/images/new-index/wxz.png" v-show="!selectProtocol" @click="switchProtocol(true)">
				</image>
				<image src="/static/images/new-index/xz.png" v-show="selectProtocol" @click="switchProtocol(false)">
				</image>
				<view>{{$t('auction.detail.brywqydbty')}} <text
						@click="navCilck('/pages/mine/kzxy')">《{{$t('new.kzczxy')}}》</text></view>
			</view>

			<view class="topay" v-show="!showPay">{{$t('new.payment')}}</view>
			<view class="topay" style="background: rgb(10, 198, 142);" v-show="showPay" @click="addDiamond()">
				{{$t('new.payment')}}
			</view>
			<view style="height: 240rpx;"></view>

			<customerService ref="customerService" :isDownloadVisibility='false' :isContactVisibility='false'
				:isGroupVisibility='false' :isOnlyServer="true" leftOrRight="right"
				style="position: fixed;top: 460rpx;" />

		</scroll-view>
	</view>
</template>

<script>
	import customerService from '@/components/customerService/index.vue'
	import {
		hex
	} from 'js-md5'
	export default {
		components: {
			customerService
		},
		data() {
			return {
				balance: 0,
				select: 1,
				payNum: '',
				selectPayNum: false,
				selectProtocol: false,
				list: [1, 1, 1, 1, 1, 1],
				showPay: false,
				payList: [],
				kdiamondxy: '',
				infoData: [],
				isShopCont: false,
				phone: ''
			}
		},
		onShow() {
			this.getPayType()
		},
		onLoad() {
			let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.isShopCont = isShopCont

			this.$http.post(this.$apiObj.MineInfo).then(res => {
				this.balance = res.data.k_diamond_wallet
				this.phone = res.data.mobile
			})

			this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
				this.infoData = res.data
			})

			this.$http.post(this.$apiObj.IndexSetting, {
				fields: 'en_k_diamond_recharge_activity_desc,zh_k_diamond_recharge_activity_desc'
			}).then(res => {
				this.kdiamondxy = isShopCont ? res.data.en_k_diamond_recharge_activity_desc : res.data
					.zh_k_diamond_recharge_activity_desc
			})

			this.getKdiamondList()
		},
		onPullDownRefresh() {
			this.select = 1
			this.showPay = false
			this.payList.forEach(item => {
				item.select = false
			})
			this.getKdiamondList()
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				this.balance = res.data.k_diamond_wallet
				this.phone = res.data.mobile
			})
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			getPayType() {
				this.$http.post(this.$apiObj.GetPayType).then(res => {
					this.payList = res.data
					this.payList.forEach(item => {
						this.$set(item, 'select', false)
					})
				})
			},
			// 页面滚动
			PageScroll() {
				this.$refs.customerService.handleScroll();
			},
			switchProtocol(val) {
				this.selectProtocol = val
				if (this.selectProtocol) {
					this.payList.forEach(item => {
						if (item.select) this.showPay = true
					})
				}
			},
			navCilck(url) {
				uni.navigateTo({
					url
				})
			},
			getKdiamondList() {
				this.$http.post(this.$apiObj.RechargeKdiamond).then(res => {
					this.list = res.data
				})
			},
			onReturn() {
				// #ifdef H5
				if (uni.getStorageSync('window_href')) {
					window.history.go(-1)
				} else {
					uni.navigateBack()
				}
				// #endif
				// #ifdef APP-PLUS
				uni.navigateBack()
				// #endif

			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/mine/K_brick_detail_info'
				})
			},
			switchCzNum(id) {
				this.select = id
				this.selectPayNum = false
				this.payNum = ''
			},
			changPay(item) {
				item.select = !item.select
				this.payList.forEach(data => {
					if (item.pay_type != data.pay_type) data.select = false
					if (item.select) this.showPay = true
					else this.showPay = false
				})
			},
			//充值k钻
			addDiamond() {
				if (this.payNum && this.payNum * 1 < 15) {
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
					if (item.select) isNum = item.pay_type
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

				if (isNum == 2) {
					this.payEssenceRecharge()
				} else if (isNum == 3) {
					this.paypalRecharge()
				}

			},
			//第三方支付
			payEssenceRecharge() {
				uni.showLoading({
					title: this.$t('new.czz'),
					mask: true
				})
				this.$http.post(this.$apiObj.addDiamond, {
					money: this.payNum ? this.payNum : this.list[this.select - 1].k_diamond
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
						uni.redirectTo({
							url: '/pages/mine/webview?url=' + formStr
						});
						//  #endif
						uni.hideLoading()
					} else {
						if (!this.infoData || this.infoData.length < 1) {
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/mine/Vid'
								})
							}, 2000)
						} 
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
					if (item.route != 'pages/mine/K_brick_detail') {
						listData.push(item.route)
					}
				})
				this.$http.post(this.$apiObj.PaypalRecharge, {
					money: this.payNum ? this.payNum : this.list[this.select - 1].k_diamond,
					recharge_type: 2,
					referrer: type,
					front_extra: listData.toString()
				}).then(res => {

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
						}, 3000)
						//  #endif
						uni.hideLoading()
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
						this.select = 2
						this.selectProtocol = false
						this.switchCzNum(1)
						this.getKdiamondList()
						this.$http.post(this.$apiObj.MineInfo).then(res => {
							this.balance = res.data.k_diamond_wallet
						})
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
	.kbrick {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: rgb(248, 248, 248);

		.kbrick-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 60rpx;
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
			font-weight: bold;
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
				background: rgb(255, 255, 255);
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
					min-width: 182rpx;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 20rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgb(27, 161, 255);
					border-radius: 18rpx 0 24rpx 0;

					image {
						width: 20rpx;
						height: 20rpx;
						margin-right: 4rpx;
					}
				}

			}

		}

		.customize {
			position: relative;
			width: 686rpx;
			height: 88rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);
			border-radius: 16rpx;
			margin: 0 auto 24rpx auto;

			.logo {
				display: block;
				width: 48rpx;
				height: 48rpx;
				margin: 0 32rpx;
			}

			.customize-input {
				width: 300rpx;
			}

			.customize-right {
				position: absolute;
				right: 32rpx;
				// width: 154rpx;
				height: 36rpx;
				padding: 0 16rpx;
				display: flex;
				align-items: center;
				background: rgb(27, 161, 255);
				border-radius: 24rpx;

				image {
					display: block;
					width: 20rpx;
					height: 20rpx;
					margin: 0 8rpx 0 0;
				}

				view {
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 255, 255);
				}
			}

		}

		.select_customize {
			background: rgb(224, 242, 255);
			box-sizing: border-box;
			border: 4rpx solid rgb(27, 161, 255);
		}

		.info-ts {
			width: 686rpx;
			height: 64rpx;
			font-size: 20rpx;
			color: rgb(27, 161, 255);
			display: flex;
			align-items: center;
			word-break: break-all;
			background: rgb(226, 239, 249);
			border-radius: 64rpx;
			margin: 0 auto 24rpx auto;

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

		.pay {
			position: relative;
			width: 686rpx;
			margin: 0 auto 40rpx auto;
		}

		.pay-info-des {
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

		.protocol {
			width: 686rpx;
			font-size: 24rpx;
			color: rgb(102, 102, 102);
			display: flex;
			margin: 80rpx auto 0 auto;

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

		.selectPay {
			background: rgb(224, 242, 255);
			border: 4rpx solid rgb(27, 161, 255);
		}

	}
</style>