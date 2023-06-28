<template>
	<view class="wallet-page">
		<view class="commission-head">
			<image src="@/static/images/mine/collect_icon_back.png" class="commission-head-left" @click="onReturn()">
			</image>
			<view class="title">{{$t('new.wdzc')}}</view>
			<view class="commission-head-right" @click="onQuery()">
				<image src="@/static/images/mine/wallet_btn_card.png"></image>
				<view>{{$t('new.yhk')}}</view>
			</view>

		</view>
		<view class="wallet-head">
			<view class="head-card">
				<view class="head-card-info">
					<view class="head-card-left">
						<view class="t">
							<view>{{$t('new.zhye')}}</br>(RM)</view>
							<image src="/static/images/kbrick/balance_info.png"
								@click="navClick('/pages/mine/wallet_explain')"></image>
						</view>
						<view class="money">{{money || 0.00}}</view>
					</view>
					<view class="head-card-right">
						<view class="balance" style="margin-bottom: 36rpx;">
							{{$t('mine.Deposits')}}<br /><span>{{tocash_money || 0.00}}</span>
						</view>
						<view class="balance">
							{{$t('mine.Bonus')}}<br /><span>{{rebate_money_total || 0.0000}}</span>
						</view>
					</view>
				</view>

				<view class="card-btns">
					<view class="card-btns-withdrawal" @click="navClick('Withdrawal')">{{$t('user.wallet.tixian')}}
					</view>
					<view class="card-btns-Recharge" @click="navClick('recharge')">{{$t('user.wallet.chongzhi')}}</view>
				</view>
			</view>
		</view>

		<view class="wallet-center">
			<view class="info" @click="navClick('/pages/mine/K_brick_detail')">
				<view class="info-tit">
					<view>{{$t('new.wdkz')}}</view>
					<image src="/static/images/products/right.png"></image>
				</view>
				<view class="info-price">{{kdiamond || 0}}</view>
			</view>
			<view class="info" @click="navClick('/pages/mine/points-detail')"
				style="background: url('/static/images/new-index/wallet_jf.png') no-repeat;background-size: 332rpx 168rpx;">
				<view class="info-tit">
					<view>{{$t('new.wdjf')}}</view>
					<image src="/static/images/products/right.png"></image>
				</view>
				<view class="info-price">{{totalJf || 0}}</view>
			</view>
		</view>

		<view class="wallet-box">
			<view class="wallet-box-shouzhi">{{$t('new.shouzhi')}}</view>
			<view class="wallet-ul" v-if="navId===1">
				<view class="commission-item" v-for="(item,i) in MoneyList">
					<view class="ci-left">
						<view class="ci-left-icon">
							<image v-if="(item.money*1) > 0" src="@/static/images/mine/wallet_icon_income.png"
								mode="widthFix"></image>
							<image v-else src="@/static/images/mine/wallet_icon_expenditure.png" mode="widthFix">
							</image>
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
				totalJf: 0,
				kdiamond: 0
			}
		},
		onShow() {
			this.page = 1
			this.MoneyList = []
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					this.kdiamond = res.data.k_diamond_wallet
					this.money = res.data.money
					this.tocash_money = res.data.recharge_money_balance
					this.rebate_money_total = res.data.invite_money_balance
					this.getAllPoints(res.data.u_id)
				}
			})
			this.onMineMoneyList()
		},
		methods: {
			onReturn() {
				uni.navigateBack()
			},
			getAllPoints(id) {
				this.$http.post(this.$apiObj.GetPoints, {
					h5_user_id: id
				}).then(res => {
					this.totalJf = res.data.total_points
				})
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
				display: flex;
				align-items: center;
				z-index: 10;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				view {
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					margin-left: 8rpx;
				}
			}

			.title {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

		}

		.wallet-head {

			.head-card {
				width: 686rpx;
				height: 316rpx;
				padding-top: 64rpx;
				background: url('/static/images/new-index/wallet_head.png') no-repeat;
				background-size: 686rpx 380rpx;
				margin: 24rpx auto;

				.head-card-info {
					width: 100%;
					color: rgb(255, 255, 255);
					display: flex;

					.head-card-left {
						width: 50%;

						.t {
							font-size: 28rpx;
							display: flex;
							align-items: flex-start;
							justify-content: center;

							image {
								display: block;
								width: 32rpx;
								height: 32rpx;
								margin-top: 6rpx;
								margin-left: 8rpx;
							}
						}

						.money {
							text-align: center;
							font-size: 50rpx;
							margin-top: 32rpx;
						}

					}

					.head-card-right {
						width: 50%;
						text-align: center;

						.balance {
							font-size: 28rpx;

							span {
								font-weight: bold;
								margin-top: 8rpx;
							}
						}

					}

				}

				.card-btns {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 40rpx;

					view {
						width: 160rpx;
						height: 56rpx;
						line-height: 56rpx;
						font-size: 20rpx;
						text-align: center;
						border-radius: 56rpx;
						margin: 0 20rpx;
					}

					.card-btns-withdrawal {
						color: rgb(255, 255, 255);
						box-sizing: border-box;
						border: 2rpx solid #fff;
					}

					.card-btns-Recharge {
						color: rgb(10, 198, 142);
						background: #fff;
						box-sizing: border-box;
						border: 1rpx solid rgb(10, 198, 142);
					}

				}

			}
		}

		.wallet-center {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.info {
				width: 332rpx;
				height: 126rpx;
				padding-top: 42rpx;
				background: url('/static/images/new-index/kz.png') no-repeat;
				background-size: 332rpx 168rpx;
				margin: 0 6rpx 32rpx 6rpx;

				.info-tit {
					width: 100%;
					display: flex;
					align-items: center;

					view {
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						margin: 0 8rpx 0 24rpx;
					}

					image {
						width: 20rpx;
						height: 20rpx;
					}
				}

				.info-price {
					font-size: 28rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
					margin: 24rpx 0 0 24rpx;
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