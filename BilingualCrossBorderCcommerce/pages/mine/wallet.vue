<template>
	<view class="wallet-page">
		<view class="commission-head">
			<image src="@/static/images/mine/collect_icon_back.png" class="commission-head-left" @click="onReturn()"></image>
			<view>{{$t('top.wdqb')}}</view>
			<image src="@/static/images/mine/wallet_btn_card.png" class="commission-head-right" @click="onQuery()"></image>
		</view>
		<view class="wallet-head">
			<view class="head-card">
				<view class="t">{{$t('new.zhye')}}（RM）</view>
				<view class="money">{{money || 0.0000}}</view>
				<view class="head-card-price">
					<view class="head-card-fyje">{{$t('new.fyje')}}<br /><span>{{rebate_money_total}}</span></view>
					<view>{{$t('new.ktxye')}}<br /><span>{{tocash_money || 0.0000}}</span></view>
				</view>
				<view class="card-btns">
					<view class="card-btns-withdrawal" @click="navClick('Withdrawal')">{{$t('user.wallet.tixian')}}</view>
					<view class="card-btns-Recharge" @click="navClick('recharge')">{{$t('user.wallet.chongzhi')}}</view>
				</view>
			</view>
		</view>
		<view class="wallet-box">
			<view class="wallet-box-shouzhi">{{$t('new.shouzhi')}}</view>
			<view class="wallet-ul" v-if="navId===1">
				<view class="commission-item" v-for="(item,i) in MoneyList">
					<view class="ci-left">
						<view class="ci-left-icon">
							<!-- <image src="/static/images/new/chonzhi.png" v-if="item.type==20"></image>
							<image src="/static/images/new/tx-mx.png" v-else-if="item.type==12"></image>
							<image src="/static/images/new/liupai.png" v-else-if="item.type==6 || item.type==16"></image>
							<image src="/static/images/new/xiaofei.png" v-else-if="item.type==21"></image>
							<image src="/static/images/new/cz-mx.png" v-else-if="item.type==5"></image>
							<image src="/static/images/new/gouwu.png" v-else></image> -->
							<image v-if="(item.money*1) > 0" src="@/static/images/mine/wallet_icon_income.png" mode="widthFix"></image>
							<image v-else src="@/static/images/mine/wallet_icon_expenditure.png" mode="widthFix"></image>
						</view>
						<view class="ci-left-info">
							<view class="info-tit">{{item.memo}}</view>
							<view class="info-time">{{$filter.to_date_time(item.addtime)}}</view>
						</view>
					</view>
					<view class="ci-right" :style="(item.money*1) > 0?'color: rgb(255, 57, 57);':''">
						{{(item.money*1) > 0 ? '+' + item.money : item.money}}
					</view>
				</view>
			</view>
			<view class="wallet-ul" v-if="navId===2">
				<view class="li active" v-for="item in MoneyList" :key="item.id">
					<view class="head">
						<view class="li-fl">
							<view class="t">{{item.memo}}
								<view v-if="item.status==0" class="lis js">{{$t('jsz')}}</view>
								<view v-if="item.status==1" class="lis yjs">{{$t('yijs')}}</view>
								<view v-if="item.status=='-1'" class="lis yjj">{{$t('yijj')}}</view>
							</view>
							<view class="c">{{$filter.to_date_time(item.addtime)}}</view>
						</view>
						<view class="num"><text class="f-34">{{item.money}}</text></view>
					</view>
					<view class="shhjg">{{$t('shhjg')}}：{{item.reason}}</view>
					<view class="imgs">
						<image v-for="items,i in item.images" :key="i" class="img" :src="items" mode="scaleToFill" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import $ from '@/common/jquery-3.6.1.min.js'
	import Headers from '@/components/navHeaders'
	export default {
		components: {
			Headers
		},
		data() {
			return {
				money: 0, // 账户余额
				tocash_money: 0, // 可提现金额
				rebate_money_total: 0, //返佣金额
				page: 1, // 页码
				pagenum: 10, // 每页显示商品数目
				totalPageNum: 0, // 总条数
				MoneyList: [],
				navId: 1,
			}
		},
		onShow() {
			this.page = 1
			this.MoneyList = []
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					this.money = res.data.money
					this.tocash_money = res.data.tocash_money
					this.rebate_money_total = res.data.rebate_money_total
				}
			})
			this.onMineMoneyList()
		},
		methods: {
			onReturn() {
				uni.navigateBack()
			},
			onNavClick(e) {
				this.page = 1
				this.MoneyList = []
				this.navId = e
				if (e === 1) {
					this.onMineMoneyList()
				} else {
					this.onRechargeTocashList()
				}
			},
			onMineMoneyList() {
				let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false // 中文还是英文

				this.$http.post(this.$apiObj.MineMoneyList, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						res.data.data.map(item => {
							let zhStr = item.memo
							let appid = '20220914001342711'
							let userkey = 'QzytrtrDkXeAeaEp_yW3'
							let salt = (new Date).getTime()
							const str = `${appid}${zhStr}${salt}${userkey}`;
							const sign = md5(str); /* md5加密，生成签名 */
							const params = {
								q: zhStr,
								from: 'zh',
								to: 'en',
								appid: appid,
								sign,
								salt: salt
							}

							//#ifdef H5
							// console.log($, "======uni-app的H5模式引入JQuery=====");
							if (isShopCont) {
								$.ajax({
									url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
									type: 'get',
									dataType: 'jsonp',
									data: params,
									success: function(data) {
										item.memo = data.trans_result[0].dst
									}
								});
							}
							//#endif
							// #ifdef APP-PLUS
							if (isShopCont) {
								uni.request({
									url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', //仅为示例，并非真实接口地址。
									data: params,
									header: {
										'custom-header': 'hello' //自定义请求头信息
									},
									success: (res) => {
										item.memo = res.data.trans_result[0].dst
									}
								});
							}
							// #endif
						})
						this.totalPageNum = res.data.total
						this.MoneyList = this.page == 1 ? res.data.data : [...this.MoneyList, ...res.data.data]
					}
				})
			},
			onRechargeTocashList() {
				let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false // 中文还是英文

				this.$http.post(this.$apiObj.RechargeTocashList, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						res.data.data.map(item => {
							let zhStr = item.memo
							let appid = '20220914001342711'
							let userkey = 'QzytrtrDkXeAeaEp_yW3'
							let salt = (new Date).getTime()
							const str = `${appid}${zhStr}${salt}${userkey}`;
							const sign = md5(str); /* md5加密，生成签名 */
							const params = {
								q: zhStr,
								from: 'zh',
								to: 'en',
								appid: appid,
								sign,
								salt: salt
							}

							//#ifdef H5
							// console.log($, "======uni-app的H5模式引入JQuery=====");
							if (isShopCont) {
								$.ajax({
									url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
									type: 'get',
									dataType: 'jsonp',
									data: params,
									success: function(data) {
										item.memo = data.trans_result[0].dst
									}
								});
							}
							//#endif
							// #ifdef APP-PLUS
							if (isShopCont) {
								uni.request({
									url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', //仅为示例，并非真实接口地址。
									data: params,
									header: {
										'custom-header': 'hello' //自定义请求头信息
									},
									success: (res) => {
										item.memo = res.data.trans_result[0].dst
									}
								});
							}
							// #endif
						})
						this.totalPageNum = res.data.total
						this.MoneyList = this.page == 1 ? res.data.data : [...this.MoneyList, ...res.data.data]
					}
				})
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			onQuery() {
				uni.navigateTo({
					url: './bank'
				})
			}
		},
		// 点击银行卡列表
		onNavigationBarButtonTap: function() {
			uni.navigateTo({
				url: './bank'
			})
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			if (this.totalPageNum <= this.page * this.pagenum) return
			this.page++
			this.onMineMoneyList()
		}
	}
</script>

<style lang="less" scoped>
	.wallet-page {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;

		.commission-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);

			.commission-head-left {
				position: absolute;
				left: 20rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 10;
			}

			.commission-head-right {
				position: absolute;
				right: 30rpx;
				width: 50rpx;
				height: 50rpx;
				z-index: 10;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				color: rgb(51, 51, 51);
				text-align: center;
			}

		}

		.wallet-head {
			width: 100%;
			padding: 24rpx 32rpx;
			box-sizing: border-box;

			.head-card {
				width: 100%;
				background: url('/static/images/new/card.png') no-repeat;
				background-size: 100% 100%;
				padding: 24rpx 40rpx 34rpx;
				box-sizing: border-box;

				.head-card-price {
					width: 100%;
					margin-top: 24rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					display: flex;
					align-items: center;

					view {
						width: 50%;
						text-align: center;
					}

					span {
						display: block;
						font-size: 32rpx;
					}

				}

				.t {
					color: rgb(255, 255, 255);
					font-size: 28rpx;
				}

				.money {
					margin-top: 32rpx;
					text-align: center;
					font-weight: 600;
					color: rgb(255, 255, 255);
					font-size: 64rpx;
				}
				
				.card-btns {
					margin-top: 32rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.card-btns-withdrawal {
						width: 160rpx;
						height: 56rpx;
						margin: 0 20rpx;
						border: 2rpx solid rgb(255, 255, 255);
						box-sizing: border-box;
						border-radius: 100rpx;
						text-align: center;
						line-height: 56rpx;
						color: rgb(255, 255, 255);
						font-size: 20rpx;
					}
					
					.card-btns-Recharge {
						width: 160rpx;
						height: 56rpx;
						margin: 0 20rpx;
						background: rgb(255, 255, 255);
						border-radius: 100rpx;
						text-align: center;
						line-height: 56rpx;
						color: rgb(255, 57, 57);
						font-size: 20rpx;
					}
				}
			}
		}

		//wallet-head E
		.wallet-box {
			width: 100%;
			background: rgb(255, 255, 255);
			border-radius: 24rpx 24rpx 0px 0px;
			padding: 32rpx;
			box-sizing: border-box;

			.wallet-box-shouzhi {
				color: rgb(51, 51, 51);
				font-size: 28rpx;
			}

			.wallet-t {
				margin: 0 130rpx;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;

				.list {
					color: #999;

					.xian {
						width: 112rpx;
						height: 2rpx;
						background: #fff;
						margin-top: 10rpx;
					}

					&.active {
						color: #000;

						.xian {
							background: #000;
						}
					}
				}
			}

			.wallet-ul {
				width: 100%;
				margin-top: 32rpx;

				.li {
					background: #ffffff;
					box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
					border-radius: 20rpx;
					margin: 20rpx 0;
					padding: 35rpx 36rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					&.active {
						display: block;

						.head {
							display: flex;
							justify-content: space-between;

							.li-fl {
								.t {
									display: flex;
									align-items: center;

									.lis {
										// width: 78rpx;
										height: 40rpx;
										line-height: 40rpx;
										border-radius: 6rpx;
										padding: 0 10rpx;
										font-size: 22rpx;
										color: #fff;
										margin-left: 10rpx;

										&.js {
											background: #ffa115;
										}

										&.yjs {
											background: #25cd21;
										}

										&.yjj {
											background: #fc0609;
										}
									}
								}

								.c {}
							}
						}

						.shhjg {
							margin-top: 25rpx;
							font-size: 24rpx;
							color: #808080;
						}

						.imgs {
							margin-top: 20rpx;
							display: flex;
							flex-wrap: wrap;

							.img {
								width: 144rpx;
								height: 144rpx;
							}
						}
					}

					.t {
						font-size: 28rpx;
					}

					.c {
						color: #999;
						margin-top: 20rpx;
					}

					.num {
						font-size: 28rpx;
						color: rgb(255, 78, 47);
						font-weight: 600;
					}
				}
			}
		}

		.commission-item {
			width: 100%;
			margin-bottom: 32rpx;
			padding-bottom: 32rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgb(204, 204, 204);
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.ci-left {
				display: flex;
				align-items: center;
				
				.ci-left-icon {
					width: 80rpx;
					height: 80rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.ci-left-info {
					margin-left: 32rpx;
					
					.info-tit {
						max-width: 420rpx;
						margin: 9rpx 0;
						color: rgb(51, 51, 51);
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					
					.info-time {
						margin: 9rpx 0;
						color: rgb(153, 153, 153);
						font-size: 24rpx;
					}
				}
			}

			.ci-right {
				font-size: 32rpx;
				color: rgb(153, 153, 153);
			}

		}

	}
</style>