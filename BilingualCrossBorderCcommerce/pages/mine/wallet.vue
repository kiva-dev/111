<template>
	<view class="wallet-page">

		<view class="commission-head">
			<image src="/static/images/new/left.png" class="commission-head-left" @click="onReturn()"></image>
			<view>{{$t('top.wdqb')}}</view>
			<image src="/static/images/new/yhk.png" class="commission-head-right" @click="onQuery()"></image>
		</view>

		<view class="wallet-head">
			<view class="head-card">
				<view class="t">{{$t('new.zhye')}}（RM）</view>
				<view class="money">{{money}}</view>
				<view class="cont">
					<view class="cont-t">{{$t('new.ktxye')}}：</view>
					<view class="cont-money">{{tocash_money}}</view>
				</view>
				<view class="head-card-price">
					<view class="head-card-zsje">{{$t('new.zsje')}}：<br/><span>1000.00</span></view>
					<view class="head-card-fyje">{{$t('new.fyje')}}：<br/><span>342.00</span></view>
				</view>
			</view>
			<view class="head-ul">
				<view class="li" @click="navClick('recharge')" style="border-right: 2rpx solid rgba(44, 44, 44, 0.1);">
					<!-- <view class="icon">
						<image class="img" src="../../static/images/wallet1.png"></image>
					</view> -->
					<text style="color: rgb(8, 195, 84);">{{$t('user.wallet.chongzhi')}}</text>
				</view>
				<view class="li" @click="navClick('Withdrawal')">
					<!-- <view class="icon">
						<image class="img" src="../../static/images/wallet2.png"></image>
					</view> -->
					<text style="color: rgb(0, 169, 255);">{{$t('user.wallet.tixian')}}</text>
				</view>
			</view>
		</view>

		<view class="wallet-box">
			<view class="wallet-box-shouzhi">{{$t('new.shouzhi')}}</view>
			<view class="wallet-ul" v-if="navId===1">
				<view class="commission-item" v-for="(item,i) in MoneyList">
					<image src="/static/images/new/chentixin.png"></image>
					<image src="/static/images/new/lutixin.png" v-show="false"></image>
					<view class="commission-item-info">
						<view class="commission-item-info-tit">{{item.memo}}</view>
						<view class="commission-item-info-time">{{$filter.to_date_time(item.addtime)}}</view>
					</view>
					<view class="commission-item-price" :style="(item.money*1)<0?'color: rgb(255, 78, 47);':''">
						{{item.money}}
					</view>
				</view>

				<!-- <view class="li" v-for="item in MoneyList" :key="item.id">
					<view class="li-fl">
						<view class="t">{{item.memo}}</view>
						<view class="c">{{$filter.to_date_time(item.addtime)}}</view>
					</view>
					<view class="num"><text class="f-34">{{item.money}}</text></view>
				</view> -->
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
				page: 1, // 页码
				pagenum: 6, // 每页显示商品数目
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
		background: rgb(248, 248, 248);

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
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			.commission-head-right {
				position: absolute;
				right: 30rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				color: rgb(255, 78, 47);
				text-align: center;
			}

		}

		.wallet-head {
			background: #f9f9f9;
			border-radius: 25rpx;
			margin: 36rpx 30rpx;
			overflow: hidden;
			box-shadow: 0px 4rpx 5rpx rgba(44, 44, 44, 0.1);

			.head-card {
				position: relative;
				background: linear-gradient(135.00deg, rgba(255, 56, 56, 1.00), rgba(255, 134, 58, 1.00) 100%);
				height: 320rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				color: #fff;
				text-align: center;
				flex-direction: column;

				.cont {
					position: absolute;
					top: 20rpx;
					right: 0rpx;
					height: 58rpx;
					padding: 0 10rpx;
					display: flex;
					align-items: center;
					color: rgb(255, 78, 47);
					text-align: center;
					background: #fff;
					border-radius: 34rpx 0 0 34rpx;

					.cont-t {
						font-size: 24rpx;
					}

					.cont-money {
						font-size: 26rpx;
						margin-top: 0;
						// margin-left: 20rpx;
					}
				}

				.head-card-price{
					position: absolute;
					bottom: 20rpx;
					width: 100%;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					display: flex;
					align-items: center;
					
					view{
						width: 50%;
						text-align: center;
					}
					
					span{
						font-size: 32rpx;
					}
					
				}

				.t {
					position: absolute;
					top: 30rpx;
					left: 40rpx;
					font-size: 32rpx;
				}

				.money {
					font-size: 76rpx;
					font-weight: 600;
					margin-top: 30rpx;
				}
			}

			.head-ul {
				padding: 24rpx 30rpx;
				display: flex;
				background: #fff;
				

				.li {
					text-align: center;
					display: flex;
					width: 50%;
					align-items: center;
					justify-content: center;
					font-size: 40rpx;
					// font-weight: 550;

					.icon {
						width: 44rpx;
						height: 44rpx;
						min-width: 44rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		//wallet-head E
		.wallet-box {
			margin: 40rpx 30rpx;

			.wallet-box-shouzhi {
				font-size: 32rpx;
				color: rgb(255, 78, 47);
			}

			.wallet-t {
				margin: 0 130rpx;
				font-size: 28rpx;
				// font-weight: 550;
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
				margin-top: 30rpx;

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
			position: relative;
			width: 686rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 12rpx;
			box-shadow: 0px 4rpx 10rpx rgba(44, 44, 44, 0.1);
			margin: 0 auto 20rpx auto;

			image {
				display: block;
				width: 60rpx;
				height: 60rpx;
				margin: 0 30rpx;
			}

			.commission-item-info {

				.commission-item-info-tit {
					font-size: 24rpx;
					color: rgb(44, 44, 44);
				}

				.commission-item-info-time {
					font-size: 20rpx;
					color: rgb(190, 190, 190);
					margin-top: 10rpx;
				}

			}

			.commission-item-price {
				position: absolute;
				right: 30rpx;
				font-size: 32rpx;
				color: rgb(44, 44, 44);
			}

		}

	}
</style>