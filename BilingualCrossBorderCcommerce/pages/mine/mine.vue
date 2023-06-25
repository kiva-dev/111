<template>
	<view class="mine-layout">
		<view class="ml-top">
			<view class="ml-top-operate">
				<view class="operate-box" @click="navClick('set')">
					<image src="@/static/images/mine/mine_set.png" mode="widthFix"></image>
				</view>
				<view class="operate-box" @click="navClick('/pages/mine/message')">
					<image src="@/static/images/mine/mine_msg.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="ml-top-info">
				<view class="info-left">
					<view class="info-left-avatar" @click="navClick('profile')">
						<image :src="userCont.avatar || require('@/static/images/mine/mine_defalt_avatar.png')"
							mode="aspectFill"></image>
					</view>
					<view class="info-left-box">
						<view class="box-name">
							<view class="box-name-text">{{userCont.nickname || 'Hi,Guest'}}</view>
							<view class="box-name-level" v-if="userCont.level > 0">
								<view class="level-icon">
									<image src="@/static/images/mine/mine_icon_vip.png" mode="widthFix"></image>
								</view>
								<view class="level-num">Lv.{{userCont.level}}</view>
							</view>
						</view>
						<view class="box-data">
							<template v-if="!isLogin">
								<view class="box-data-join">{{$t('mine.welcome')}}</view>
							</template>
							<template v-else>
								<view class="box-data-detail">
									<!-- @click="navClick('new/collect_products')" -->
									<view class="detail-container">
										<span>{{collectGoodsTotal || 0}}</span>
										<p>{{$t('mine.collected')}}</p>
									</view>
									<view class="detail-dot"></view>
									<!-- @click="navClick('new/subscribe')" -->
									<view class="detail-container">
										<span>{{collectStoreTotal || 0}}</span>
										<p>{{$t('mine.subscribed')}}</p>
									</view>
									<view class="detail-dot"></view>
									<!--@click="navClick('/pages/mine/points-detail')"-->
									<view class="detail-container" >
										<span>{{0 || 0}}</span>
										<p>{{$t('new.jf')}}</p>
									</view>
								</view>
							</template>
						</view>
					</view>
				</view>
				<view class="info-right" v-if="!isLogin">
					<view class="info-right-btn" @click="toLogin">{{$t('mine.loginBtn')}}</view>
				</view>
			</view>
		</view>
		<view class="ml-wallet">
			<view class="ml-wallet-container">
				<view class="container-tit">
					<view class="ct-left">
						<view class="ct-left-icon">
							<image src="@/static/images/mine/mine_icon_wallet.png" mode="widthFix"></image>
						</view>
						<view class="ct-left-name">{{$t('top.wdqb')}}</view>
					</view>
					<view class="ct-right" @click="navClick('wallet')">
						<view class="ct-right-name">{{$t('home.detail.more')}}</view>
						<view class="ct-right-icon">
							<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="container-content">
					<view class="cc-box">
						<view class="cc-box-num">
							<span>{{userCont.money || 0.00}}</span>
						</view>
						<view class="cc-box-amount">
							<p>(RM)</p>
							<p>{{$t('user.wallet.zhje')}}</p>
						</view>
					</view>
					<view class="cc-border"></view>
					<view class="cc-box">
						<view class="cc-box-rebate">
							<view><span>{{userCont.tocash_money || 0.00}}</span></view>
							<p>{{$t('mine.Deposits')}}</p>
						</view>
						<view class="cc-box-rebate">
							<view><span>{{userCont.rebate_money_total || 0.00}}</span></view>
							<p>{{$t('mine.Bonus')}}</p>
						</view>
					</view>
				</view>
				<view class="container-btn">
					<view class="container-btn-withdrawal" @click="navClick('Withdrawal')">{{$t('user.wallet.tixian')}}
					</view>
					<view class="container-btn-recharge" @click="navClick('recharge')">{{$t('top.cz')}}</view>
				</view>
			</view>
		</view>
		<view class="ml-commission">
			<view class="ml-commission-box" @click="navClick('/pages/mine/new/commission')">
				<p>{{$t('new.yqfy')}}</p>
			</view>
		</view>
		<view class="ml-auction">
			<view class="ml-auction-top">
				<view class="top-name">{{$t('top.wdjp')}}</view>
				<view class="top-more" @click="toAuction(1)">
					<p>{{$t('user.myCont.ckqb')}}</p>
					<view class="top-more-icon">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="ml-auction-content">
				<view class="content-box" @click="toAuction(1)">
					<image src="@/static/images/mine/mine_icon_ongoing.png" mode="widthFix"></image>
					<p>{{$t('user.auctionM.jpz')}}</p>
				</view>
				<view class="content-box" @click="toAuction(5)">
					<image src="@/static/images/mine/mine_icon_oder.png" mode="widthFix"></image>
					<p>{{$t('user.auctionM.jpdd')}}</p>
				</view>
				<view class="content-box" @click="toAuction(3)">
					<image src="@/static/images/mine/mine_icon_winning.png" mode="widthFix"></image>
					<p>{{$t('user.auctionM.zpjl')}}</p>
				</view>
				<view class="content-box" @click="toAuction(4)">
					<image src="@/static/images/mine/mine_icon_records.png" mode="widthFix"></image>
					<p>{{$t('user.auctionM.jpjl')}}</p>
				</view>
			</view>
		</view>
		<view class="ml-auction">
			<view class="ml-auction-top">
				<view class="top-name">{{$t('user.myCont.order')}}</view>
				<view class="top-more" @click="navClick('/pages/mine/order/order')">
					<p>{{$t('user.myCont.ckqb')}}</p>
					<view class="top-more-icon">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="ml-auction-content">
				<scroll-view class="content-scroll" scroll-x="true" @scrolltoupper="isBottoming = false"
					@scrolltolower="isBottoming = true">
					<view class="content-scroll-box" @click="navClick('/pages/mine/order/order?Inv=2&type=2')">
						<image src="@/static/images/mine/mine_icon_ongoing.png" mode="widthFix"></image>
						<p>{{$t('user.myCont.dfh')}}</p>
					</view>
					<view class="content-scroll-box" @click="navClick('/pages/mine/order/order?Inv=2&type=3')">
						<image src="@/static/images/mine/mine_icon_oder.png" mode="widthFix"></image>
						<p>{{$t('user.myCont.dsh')}}</p>
					</view>
					<view class="content-scroll-box" @click="navClick('/pages/mine/order/order?Inv=2&type=4')">
						<image src="@/static/images/mine/mine_icon_winning.png" mode="widthFix"></image>
						<p>{{$t('zhongpai.daiqueren')}}</p>
					</view>
					<view class="content-scroll-box" @click="navClick('/pages/mine/order/order?Inv=2&type=5')">
						<image src="@/static/images/mine/mine_icon_records.png" mode="widthFix"></image>
						<p>{{$t('zhongpai.yiqueren')}}</p>
					</view>
					<view class="content-scroll-box" @click="navClick('/pages/mine/order/order?Inv=2&type=6')">
						<image src="@/static/images/mine/mine_icon_records.png" mode="widthFix"></image>
						<p>{{$t('zhongpai.yiwancheng')}}</p>
					</view>
				</scroll-view>
			</view>
			<view class="ml-auction-line">
				<view class="line-bg" :style="{ left: isBottoming ? '14rpx':'0'}"></view>
			</view>
		</view>
		<view class="ml-operate">
			<view class="ml-operate-title">{{$t('new.wdfw')}}</view>
			<view class="ml-operate-ul">
				<view class="ul-li" @click="navClick('/pages/address/address')">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_address.png" mode="widthFix"></image>
						</view>
						<view class="l-name">{{$t('new.dz')}}</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li" @click="showContact = true">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_contact.png" mode="widthFix"></image>
						</view>
						<view class="l-name">{{$t('user.myCont.ptkf')}}</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li" @click="navClick('upgrade')">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_merchants.png" mode="widthFix"></image>
						</view>
						<view class="l-name">{{$t('new.sh')}}</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li" @click="navClick('/pages/mine/Feedback')">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_feedback.png" mode="widthFix"></image>
						</view>
						<view class="l-name">{{$t('top.yjfk')}}</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li" @click="navClick('/pages/mine/about')">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_about.png" mode="widthFix"></image>
						</view>
						<view class="l-name">{{$t('top.about')}}</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 联系我们 -->
		<u-popup :show="showContact" mode="center" bgColor="transparent">
			<view class="contact">
				<image src="../../static/images/new/tck-xy.png" class="contact-head"></image>
				<image src="../../static/images/new/close.png" class="contact-info-close" @click="showContact = false">
				</image>
				<view class="contact-info">
					<view class="contact-info-tit">{{$t('user.myCont.ptkf')}}</view>
					<!--fb://profile/100089663415703-->
					<a href="fb://page/119896577745123" target="_blank" v-if="isFacebookApp && device=='android'">
						<view class="contact-info-des">
							<image src="../../static/images/new/face book.png"></image>
							<view>Face book</view>
						</view>
					</a>
					<a href="fb://page?id=119896577745123" target="_blank" v-else-if="isFacebookApp && device=='ios'">
						<view class="contact-info-des">
							<image src="../../static/images/new/face book.png"></image>
							<view>Face book</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/new/face book.png"></image>
						<view>Face book</view>
					</view>
					<a href="twitter://user?screen_name=Kolibrimall2023" target="_blank" v-if="isTwitterApp">
						<view class="contact-info-des" id="twitter">
							<image src="../../static/images/share21.png"></image>
							<view>Twitter</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/share21.png"></image>
						<view>Twitter</view>
					</view>
					<a href="tg://resolve?domain=Kolibrimall" target="_blank" v-if="isTelegramApp">
						<view class="contact-info-des">
							<image src="../../static/images/new/Telegram.png"></image>
							<view>Telegram</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/new/Telegram.png"></image>
						<view>Telegram</view>
					</view>
					<a href="whatsapp://send?phone=+60 11-14338082" target="_blank" v-if="isWhatsApp">
						<view class="contact-info-des">
							<image src="../../static/images/new/WhatsAPP.png"></image>
							<view>WhatsAPP</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/new/WhatsAPP.png"></image>
						<view>WhatsAPP</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showConfirm" mode="center" bgColor="transparent">
			<view class="showConfirm">
				<view class="showConfirm-txt">{{$t('new.wazyy')}}</view>
				<view class="showConfirm-btn">
					<view class="showConfirm-btn-cancel" @click="showConfirm=false">{{$t('home.search.query')}}</view>
					<view class="showConfirm-btn-ok" @click="checkApp()">{{$t('auction.detail.btnsub')}}</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script src="https://cdn.ronghub.com/RongIMLib-5.5.5.prod.js"></script>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="./jssocials-1.4.0/jssocials.min.js"></script>
<script>
	export default {
		data() {
			return {
				no_select: 0,
				noSelect: 0,
				isShopCont: false, // 商品详情显示中文还是英文
				userCont: '', // 个人信息
				MineCont: [],
				showContact: false,
				showConfirm: false,
				isTwitterApp: false,
				isFacebookApp: false,
				isWhatsApp: false,
				isTelegramApp: false,
				device: '',
				isLogin: false,
				isBottoming: false,
				collectGoodsTotal: 0,
				collectStoreTotal: 0,
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.isTwitterApp = plus.runtime.isApplicationExist({
				pname: 'com.twitter.android'
			})
			this.isFacebookApp = plus.runtime.isApplicationExist({
				pname: 'com.facebook.katana'
			})
			this.isWhatsApp = plus.runtime.isApplicationExist({
				pname: 'com.whatsapp'
			})
			this.isTelegramApp = plus.runtime.isApplicationExist({
				pname: 'org.telegram.messenger'
			})
			this.device = uni.getSystemInfoSync().platform;
			// #endif
		},
		onShow() {
			uni.removeStorageSync('productInfo')
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false;
			if (uni.getStorageSync('token')) {
				this.isLogin = true;
				this.getMineInfo();
				this.getMineAuth();
				this.getMineWinAuction();
				this.getMineSysmsgList();
				this.getCollectGoods();
				this.getCollectStore();
			}
		},
		onHide() {
			this.showContact = false
			this.showConfirm = false
		},
		methods: {
			checkApp() {
				plus.runtime.launchApplication({
					//打开app
					pname: "com.android.vending",
				})
			},
			toAuction(num) {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/mine/auctionM?num=' + num
					})
				} else {
					uni.showModal({
						title: this.$t('mine.tip'),
						content: this.$t('mine.prompt'),
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/public/login'
								})
							}
						},
					})
				}
			},
			onkefyu() {
				uni.navigateTo({
					url: './kefu'
				})
			},
			onQuery() {
				this.$refs.popup2.close()
			},
			onPingtaiClick() {
				var c = document.createElement("script"),
					s = document.getElementsByTagName("script")[0];
				c.src = "https://kefu3.cckefucloud.com/vclient/?webid=1784027&wc=5513c6cf";
				s.parentNode.insertBefore(c, s);
			},
			navClick(url) {
				if (this.isLogin) {
					uni.navigateTo({
						url
					})
				} else {
					uni.showModal({
						title: this.$t('mine.tip'),
						content: this.$t('mine.prompt'),
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/public/login'
								})
							}
						},
					})
				}
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			getMineInfo() {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						uni.setStorageSync('userCont', res.data);
						this.userCont = res.data;
					}
				})
			},
			getMineAuth() {
				this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
					if (res.code == 1) {
						this.MineCont = res.data;
					}
				})
			},
			getMineWinAuction() {
				this.$http.post(this.$apiObj.MineWinAuction, {
					page: '1',
					pagenum: '1'
				}).then(res => {
					if (res.code == 1) {
						this.no_select = res.data.no_select;
					}
				})
			},
			getMineSysmsgList() {
				this.$http.post(this.$apiObj.MineSysmsgList, {
					page: 1,
					pagenum: 1
				}).then(res => {
					if (res.code == 1) {
						this.noSelect = res.data.no_read;
					}
				})
			},
			getCollectGoods() {
				this.$http.post(this.$apiObj.MineFocusList, {
					page: 1,
					pagenum: 10,
					type: 1
				}).then(res => {
					if (res.code == 1) {
						this.collectGoodsTotal = res.data.total;
					}
				})
			},
			getCollectStore() {
				this.$http.post(this.$apiObj.MineFocusSubscribe, {
					page: 1,
					pagenum: 10
				}).then(res => {
					if (res.code == 1) {
						this.collectStoreTotal = res.data.total;
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.mine-layout {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
		padding-bottom: 24rpx;
		box-sizing: border-box;

		.ml-top {
			width: 100%;
			height: 408rpx;
			background: linear-gradient(270.00deg, rgba(212.32, 253.86, 212.32, 1.00), rgba(217.91, 253.72, 255, 1.00) 99.237%);
			padding-top: 88rpx;
			box-sizing: border-box;

			.ml-top-operate {
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;

				.operate-box {
					width: 48rpx;
					height: 48rpx;
					margin-left: 32rpx;

					image {
						width: 100%;
					}
				}
			}

			.ml-top-info {
				width: 100%;
				margin-top: 32rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.info-left {
					display: flex;
					align-items: center;

					.info-left-avatar {
						width: 120rpx;
						height: 120rpx;

						image {
							width: 120rpx;
							height: 120rpx;
							border-radius: 50%;
						}
					}

					.info-left-box {
						margin-left: 32rpx;

						.box-name {
							display: flex;
							align-items: center;

							.box-name-text {
								width: 424rpx;
								color: rgb(51, 51, 51);
								font-size: 40rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.box-name-level {
								width: 100rpx;
								height: 40rpx;
								margin-left: 20rpx;
								background: rgb(253, 240, 226);
								border-radius: 100rpx;
								display: flex;

								.level-icon {
									width: 40rpx;
									height: 40rpx;

									image {
										width: 100%;
									}
								}

								.level-num {
									margin-left: 8rpx;
									color: rgb(219, 132, 37);
									font-size: 20rpx;
									line-height: 40rpx;
								}
							}
						}

						.box-data {
							margin-top: 16rpx;
							display: flex;
							align-items: center;

							.box-data-join {
								color: rgb(153, 153, 153);
								font-size: 24rpx;
							}

							.box-data-detail {
								display: flex;
								align-items: center;

								.detail-container {
									display: flex;
									align-items: center;

									span {
										color: rgb(51, 51, 51);
										font-size: 24rpx;
									}

									p {
										margin-left: 8rpx;
										color: rgb(153, 153, 153);
										font-size: 24rpx;
									}
								}

								.detail-dot {
									width: 8rpx;
									height: 8rpx;
									margin: 0 16rpx;
									border-radius: 50%;
									background: rgb(204, 204, 204);
								}
							}
						}
					}
				}

				.info-right {
					display: flex;

					.info-right-btn {
						width: 222rpx;
						height: 56rpx;
						background: linear-gradient(180.00deg, rgba(51, 222, 114, 1.00), rgba(5, 195, 146, 1.00) 98.871%);
						border-radius: 100rpx;
						text-align: center;
						line-height: 56rpx;
						color: rgb(255, 255, 255);
						font-size: 24rpx;
					}
				}
			}
		}

		.ml-wallet {
			width: 100%;
			margin-top: -85rpx;
			padding: 0 32rpx;
			box-sizing: border-box;

			.ml-wallet-container {
				width: 100%;
				background: rgb(255, 255, 255);
				border-radius: 20rpx;
				padding: 24rpx 32rpx 20rpx;
				box-sizing: border-box;

				.container-tit {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.ct-left {
						display: flex;
						align-items: center;

						.ct-left-icon {
							width: 44rpx;
							height: 44rpx;

							image {
								width: 100%;
							}
						}

						.ct-left-name {
							margin-left: 20rpx;
							color: rgb(51, 51, 51);
							font-size: 32rpx;
							font-weight: bold;
						}
					}

					.ct-right {
						display: flex;
						align-items: center;

						.ct-right-name {
							margin-right: 8rpx;
							color: rgb(102, 102, 102);
							font-size: 22rpx;
						}

						.ct-right-icon {
							width: 24rpx;
							height: 24rpx;

							image {
								width: 100%;
							}
						}
					}
				}

				.container-content {
					width: 100%;
					margin-top: 18rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					.cc-box {
						width: 50%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.cc-box-num {
							height: 80rpx;
							display: flex;
							align-items: flex-end;

							span {
								color: rgb(51, 51, 51);
								font-size: 32rpx;
								font-weight: bold;
							}
						}

						.cc-box-amount {
							height: 80rpx;
							margin-top: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							align-items: center;

							p {
								color: rgb(102, 102, 102);
								font-size: 20rpx;
								font-weight: 400;
							}
						}

						.cc-box-rebate {
							height: 80rpx;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							align-items: center;

							&:last-child {
								margin-top: 20rpx;
							}

							view {
								text-align: center;

								span {
									color: rgb(51, 51, 51);
									font-size: 32rpx;
									font-weight: bold;
								}
							}

							p {
								color: rgb(102, 102, 102);
								font-size: 20rpx;
								font-weight: 400;
							}
						}
					}

					.cc-border {
						width: 1rpx;
						height: 160rpx;
						background: rgb(204, 204, 204);
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.container-btn {
					margin-top: 32rpx;
					display: flex;
					justify-content: center;

					.container-btn-withdrawal {
						margin: 0 16rpx;
						width: 150rpx;
						height: 55rpx;
						background: rgb(255, 255, 255);
						border: 1rpx solid rgb(10, 198, 142);
						box-shadow: 4rpx 4rpx 12rpx rgba(124, 215, 188, 0.36);
						border-radius: 100rpx;
						text-align: center;
						line-height: 55rpx;
						color: rgb(10, 198, 142);
						font-size: 20rpx;
					}

					.container-btn-recharge {
						margin: 0 16rpx;
						width: 150rpx;
						height: 55rpx;
						background: rgb(10, 198, 142);
						border: 1rpx solid rgb(10, 198, 142);
						box-shadow: 4rpx 4rpx 12rpx rgba(71, 179, 147, 0.37);
						border-radius: 100rpx;
						text-align: center;
						line-height: 55rpx;
						color: rgb(255, 255, 255);
						font-size: 20rpx;
					}
				}
			}
		}

		.ml-commission {
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;

			.ml-commission-box {
				width: 100%;
				height: 140rpx;
				background: url('/static/images/new/yqfy.png') no-repeat;
				background-size: 100% 100%;
				margin-top: 24rpx;
				padding-top: 14rpx;
				box-sizing: border-box;
				text-align: center;
				line-height: 140rpx;
				text-indent: 100rpx;

				p {
					font-size: 32rpx;
					font-weight: bold;
					color: rgb(255, 78, 47);
				}
			}
		}

		.ml-auction {
			width: 100%;
			margin-top: 24rpx;
			background: rgb(255, 255, 255);
			padding: 24rpx 32rpx;
			box-sizing: border-box;

			.ml-auction-top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.top-name {
					color: rgb(51, 51, 51);
					font-size: 28rpx;
					font-weight: bold;
				}

				.top-more {
					display: flex;
					align-items: center;

					p {
						margin-right: 8rpx;
						color: rgb(102, 102, 102);
						font-size: 22rpx;
					}

					.top-more-icon {
						width: 24rpx;
						height: 24rpx;

						image {
							width: 100%;
						}
					}
				}
			}

			.ml-auction-content {
				width: 100%;
				margin-top: 32rpx;
				display: flex;

				.content-box {
					width: 25%;
					text-align: center;

					image {
						width: 56rpx;
					}

					p {
						margin-top: 12rpx;
						color: rgb(102, 102, 102);
						font-size: 24rpx;
					}
				}

				.content-scroll {
					width: 100%;
					white-space: nowrap;

					.content-scroll-box {
						width: 22.5%;
						display: inline-block;
						text-align: center;

						image {
							width: 56rpx;
						}

						p {
							margin-top: 12rpx;
							color: rgb(102, 102, 102);
							font-size: 24rpx;
						}
					}
				}
			}

			.ml-auction-line {
				margin: 20rpx auto 0;
				width: 36rpx;
				height: 6rpx;
				background: #E8E8E8;
				position: relative;
				border-radius: 40rpx;

				.line-bg {
					width: 22rpx;
					height: 6rpx;
					background: rgb(10, 198, 142);
					border-radius: 40rpx;
					position: absolute;
					left: 0;
					top: 0;
					transition: left .5s;
				}
			}
		}

		.ml-operate {
			width: 100%;
			margin-top: 24rpx;
			background: rgb(255, 255, 255);
			padding: 24rpx 32rpx 20rpx;
			box-sizing: border-box;

			.ml-operate-title {
				margin-bottom: 10rpx;
				color: rgb(51, 51, 51);
				font-size: 28rpx;
				font-weight: bold;
			}

			.ml-operate-ul {

				.ul-li {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 8rpx;
					box-sizing: border-box;

					.ul-li-l {
						display: flex;
						align-items: center;

						.l-icon {
							width: 56rpx;
							height: 56rpx;

							image {
								width: 100%;
							}
						}

						.l-name {
							margin-left: 32rpx;
							color: rgb(51, 51, 51);
							font-size: 28rpx;
						}
					}

					.ul-li-r {
						width: 36rpx;
						height: 36rpx;

						image {
							width: 100%;
						}
					}
				}
			}
		}

		// 联系我们
		.contact {
			position: relative;
			width: 686rpx;

			.contact-head {
				display: block;
				width: 686rpx;
				height: 426rpx;
				margin-bottom: -56rpx;
				z-index: 9;
			}

			.contact-info-close {
				position: absolute;
				top: 390rpx;
				right: 20rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			.contact-info {
				padding: 46rpx 0;
				border: 4rpx solid rgb(255, 78, 47);
				background: #fff;
				border-radius: 16rpx;

				.contact-info-tit {
					width: 100%;
					font-size: 40rpx;
					font-weight: 700;
					text-align: center;
				}

				a {
					text-decoration: none;
				}

				.contact-info-des {
					width: 434rpx;
					height: 100rpx;
					font-size: 32rpx;
					color: rgb(44, 44, 44);
					display: flex;
					align-items: center;
					border-radius: 50rpx;
					box-shadow: 0rpx 0rpx 8rpx rgba(255, 78, 47, 0.3);
					margin: 40rpx auto 0 auto;

					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}

					view {
						margin-left: 40rpx;
					}
				}
			}
		}

		// 确认弹框
		.showConfirm {
			width: 686rpx;
			padding: 40rpx;
			background: #FFF;
			box-sizing: border-box;
			border-radius: 16rpx;
			border: 2rpx solid rgb(10, 198, 142);

			.showConfirm-txt {
				width: 80%;
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(44, 44, 44);
				text-align: center;
				margin: 0 auto;
			}

			.showConfirm-btn {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 40rpx;

				view {
					width: 240rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 32rpx;
					text-align: center;
					box-sizing: border-box;
					border-radius: 16rpx;
					margin: 0 20rpx;
				}

				.showConfirm-btn-cancel {
					color: rgb(44, 44, 44);
					border: 2rpx solid rgb(10, 198, 142);
				}

				.showConfirm-btn-ok {
					color: #fff;
					background: rgb(10, 198, 142);
				}

			}

		}
	}
</style>