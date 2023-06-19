<template>
	<view class="mine-layout">
		<view class="ml-top">
			<view class="ml-top-operate">
				<view class="operate-box" @click="navClick('set')">
					<image src="@/static/images/mine/mine_set.png" mode="widthFix"></image>
				</view>
				<view class="operate-box">
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
								<view class="box-data-join">Sign in or Join Free</view>
							</template>
							<template v-else>
								<view class="box-data-detail">
									<view class="detail-container" @click="navClick('new/collect_products')">
										<span>12</span>
										<p>Collected</p>
									</view>
									<view class="detail-dot"></view>
									<view class="detail-container" @click="navClick('new/subscribe')">
										<span>0</span>
										<p>Subscribed</p>
									</view>
								</view>
							</template>
						</view>
					</view>
				</view>
				<view class="info-right" v-if="!isLogin">
					<view class="info-right-btn" @click="toLogin">LOGEN / SIGNUP</view>
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
						<view class="ct-left-name">My Wallet</view>
					</view>
					<view class="ct-right">
						<view class="ct-right-name">View More</view>
						<view class="ct-right-icon">
							<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="container-content">
					<view class="cc-box">
						<view class="cc-box-num">
							<span>0</span>
							.
							<span>00</span>
						</view>
						<view class="cc-box-amount">
							<p>RM</p>
							<p>Account Amount</p>
						</view>
					</view>
					<view class="cc-border"></view>
					<view class="cc-box">
						<view class="cc-box-rebate">
							<view><span>0</span>.<span>00</span></view>
							<p>Rebate Amount</p>
						</view>
						<view class="cc-box-rebate">
							<view><span>0</span>.<span>00</span></view>
							<p>Withdrawable</p>
						</view>
					</view>
				</view>
				<view class="container-btn">
					<view class="container-btn-withdrawal">Withdrawal</view>
					<view class="container-btn-recharge">Recharge</view>
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
				<view class="top-name">My Auction</view>
				<view class="top-more">
					<p>View All</p>
					<view class="top-more-icon">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="ml-auction-content">
				<view class="content-box">
					<image src="@/static/images/mine/mine_icon_ongoing.png" mode="widthFix"></image>
					<p>Ongoing</p>
				</view>
				<view class="content-box">
					<image src="@/static/images/mine/mine_icon_oder.png" mode="widthFix"></image>
					<p>Oder</p>
				</view>
				<view class="content-box">
					<image src="@/static/images/mine/mine_icon_winning.png" mode="widthFix"></image>
					<p>Winning</p>
				</view>
				<view class="content-box">
					<image src="@/static/images/mine/mine_icon_records.png" mode="widthFix"></image>
					<p>Records</p>
				</view>
			</view>
		</view>
		<view class="ml-auction">
			<view class="ml-auction-top">
				<view class="top-name">my Oder</view>
				<view class="top-more">
					<p>View All</p>
					<view class="top-more-icon">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="ml-auction-content">
				<scroll-view class="content-scroll" scroll-x="true" @scrolltoupper="isBottoming = false"
					@scrolltolower="isBottoming = true">
					<view class="content-scroll-box">
						<image src="@/static/images/mine/mine_icon_ongoing.png" mode="widthFix"></image>
						<p>Ongoing</p>
					</view>
					<view class="content-scroll-box">
						<image src="@/static/images/mine/mine_icon_oder.png" mode="widthFix"></image>
						<p>Oder</p>
					</view>
					<view class="content-scroll-box">
						<image src="@/static/images/mine/mine_icon_winning.png" mode="widthFix"></image>
						<p>Winning</p>
					</view>
					<view class="content-scroll-box">
						<image src="@/static/images/mine/mine_icon_records.png" mode="widthFix"></image>
						<p>Records</p>
					</view>
					<view class="content-scroll-box">
						<image src="@/static/images/mine/mine_icon_records.png" mode="widthFix"></image>
						<p>Records</p>
					</view>
				</scroll-view>
			</view>
			<view class="ml-auction-line">
				<view class="line-bg" :style="{ left: isBottoming ? '14rpx':'0'}"></view>
			</view>
		</view>
		<view class="ml-operate">
			<view class="ml-operate-title">My Service</view>
			<view class="ml-operate-ul">
				<view class="ul-li">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_address.png" mode="widthFix"></image>
						</view>
						<view class="l-name">Address</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_contact.png" mode="widthFix"></image>
						</view>
						<view class="l-name">Contact Us</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_merchants.png" mode="widthFix"></image>
						</view>
						<view class="l-name">Merchants</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_feedback.png" mode="widthFix"></image>
						</view>
						<view class="l-name">Feedback</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="ul-li">
					<view class="ul-li-l">
						<view class="l-icon">
							<image src="@/static/images/mine/mine_icon_about.png" mode="widthFix"></image>
						</view>
						<view class="l-name">About Us</view>
					</view>
					<view class="ul-li-r">
						<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

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
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false;
			if (uni.getStorageSync('token')) {
				this.isLogin = true;
				this.getMineInfo();
				this.getMineAuth();
				this.getMineWinAuction();
				this.getMineSysmsgList();
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
				uni.navigateTo({
					url: '/pages/mine/auctionM?num=' + num
				})
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
								color: rgb(51, 51, 51);
								font-size: 40rpx;
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
					margin-top: 32rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.cc-box {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.cc-box-num {

							span {
								color: rgb(51, 51, 51);
								font-size: 32rpx;
								font-weight: bold;

								&:last-child {
									font-size: 24rpx;
								}
							}
						}

						.cc-box-amount {
							margin-top: 20rpx;
							text-align: center;

							p {
								color: rgb(102, 102, 102);
								font-size: 20rpx;
								font-weight: 400;
							}
						}

						.cc-box-rebate {
							text-align: center;

							&:last-child {
								margin-top: 20rpx;
							}

							view {
								text-align: center;

								span {
									color: rgb(51, 51, 51);
									font-size: 32rpx;
									font-weight: bold;

									&:last-child {
										font-size: 24rpx;
									}
								}
							}
						}
					}

					.cc-border {
						width: 1rpx;
						height: 160rpx;
						margin: 0 80rpx;
						background: rgb(204, 204, 204);
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

				.line-left {
					left: 0;
					transition: all 1s;
				}

				.line-right {
					right: 0;
					transition: all 1s;
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
	}
</style>