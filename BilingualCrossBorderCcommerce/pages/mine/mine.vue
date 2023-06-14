<template>
	<view class="mine-page">
		<!--mine-head start-->
		<view class="mine-head">
			<view class="head-set" @click="navClick('set')">
				<image class="img" src="../../static/images/mine/setting.png"></image>
			</view>

			<!-- <image src="../../static/images/mine/kefu.png" class="head_kf"></image>
			
			<image src="../../static/images/mine/comment.png" class="head_msg"></image> -->

			<view class="head-mid" @click="navClick('profile')">
				<view class="mid-fl">
					<view class="mid-img">
						<image class="img" v-if="userCont.avatar" :src="userCont.avatar"></image>
						<image class="img" v-else src="../../static/images/mine/auth_logo.png"></image>
					</view>
					<view class="mid_shiming">LV{{userCont.level}}</view>
					<view class="mid-txt">
						<view class="name">{{userCont.nickname}}</view>
					</view>
					<view class="vip" v-if="MineCont.length<1">{{$t('user.mine.wsm')}}</view>
					<view class="vip" v-else>{{$t('user.mine.ysm')}}</view>
				</view>

			</view>

		</view>
		<!--mine-head end-->

		<!--钱包信息-->
		<view class="mine-wallet">
			<view class="mine-wallet-left" @click="navClick('wallet')">
				<view class="mine-wallet-left-one">
					<image src="../../static/images/new/wallet.png"></image>
					<view>{{$t('user.myCont.myqianbao')}}</view>
				</view>
				<view class="mine-wallet-left-two">
					<view class="mine-wallet-left-two-tit">{{$t('user.wallet.zhje')}}<span>（RM）</span></view>
					<view class="mine-wallet-left-two-num">{{userCont.money}}</view>
				</view>
			</view>
			<view class="mine-wallet-right">
				<view class="mine-wallet-info" @click="navClick('new/collect_products')">
					<image src="../../static/images/new/scj.png"></image>
					<view>{{$t('user.myCont.scsp')}}</view>
				</view>
				<view class="mine-wallet-info" style="margin-top: 12rpx;" @click="navClick('new/subscribe')">
					<image src="../../static/images/new/subject.png"></image>
					<view>{{$t('user.myCont.dysp')}}</view>
				</view>
			</view>
		</view>

		<view class="commission" @click="toAddress('/pages/mine/new/commission')">
			<view style="height: 14rpx;"></view>
			<view>{{$t('new.yqfy')}}</view>
		</view>


		<!--竞拍-->
		<view class="mine-jingpai">
			<view class="mine-jingpai-name">{{$t('user.auctionM.wdjp')}}</view>
			<view class="mine-jingpai-list">
				<view class="mine-jingpai-li" @click="toAuction(1)">
					<image src="../../static/images/mine/jpz.png"></image>
					<view>{{$t('user.auctionM.jpz')}}</view>
				</view>

				<view class="mine-jingpai-li" @click="toAuction(5)">
					<image src="../../static/images/mine/jpdd.png"></image>
					<view>{{$t('user.auctionM.jpdd')}}</view>
				</view>

				<view class="mine-jingpai-li" @click="toAuction(3)">
					<image src="../../static/images/mine/zpjl.png"></image>
					<view>{{$t('user.auctionM.zpjl')}}</view>
				</view>

				<view class="mine-jingpai-li" @click="toAuction(4)">
					<image src="../../static/images/mine/jpjl.png"></image>
					<view>{{$t('user.auctionM.jpjl')}}</view>
				</view>
			</view>
		</view>

		<!--mine-order start-->
		<view class="mine-order">
			<view class="order-hd">
				<view class="t">{{$t('user.myCont.order')}}</view>
				<view class="more" @click="navClick('/pages/mine/order/order')">
					<text>{{$t('user.myCont.ckqb')}}</text>
					<view class="icon">
						<image class="img" src="/static/images/products/new-more.png"></image>
					</view>
				</view>
			</view>

			<view class="order-nav">
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=2')">
					<view class="icon">
						<image class="img" src="/static/images/new/dfh.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.dfh')}}</view>
				</view>
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=3')">
					<view class="icon">
						<image class="img" src="../../static/images/new/dsh.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.dsh')}}</view>
				</view>
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=4')">
					<view class="icon">
						<image class="img" src="../../static/images/new/dqr.png"></image>
					</view>
					<!-- <view class="t">{{$t('user.myCont.dpj')}}</view> -->
					<view class="t">{{$t('zhongpai.daiqueren')}}</view>
				</view>
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=6')">
					<view class="icon">
						<image class="img" src="../../static/images/new/ywc.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.yiwanceng')}}</view>
				</view>
			</view>
		</view>

		<!-- <view class="mine-share" @click="navClick('/pages/invite/invite')">
			<image src="../../static/images/products/mine-tkfx.png"></image>
			<view>{{$t('user.mine.tgfx')}}</view>
		</view> -->
		<view class="service">
			<view class="service-head">
				<view class="service-head-left">{{$t('new.wdfw')}}</view>
				<view class="service-head-right" @click="toAddress('/pages/mine/new/service')">
					<view>{{$t('user.myCont.ckqb')}}</view>
					<image src="/static/images/products/new-more.png"></image>
				</view>
			</view>

			<view class="service-list">
				<view class="service-item" @click="navClick('refund/refund')">
					<image src="../../static/images/products/sales.png"></image>
					<view>{{$t('user.myCont.tkshh')}}</view>
				</view>

				<view class="service-item" @click="toAddress('/pages/address/address')">
					<image src="../../static/images/products/address.png"></image>
					<view>{{$t('new.dz')}}</view>
				</view>

				<view class="service-item" @click="showContact=true">
					<image src="../../static/images/products/yjfk.png"></image>
					<view>{{$t('user.myCont.ptkf')}}</view>
				</view>

				<view class="service-item" @click="navClick('upgrade')">
					<image src="../../static/images/products/mine-sj.png"></image>
					<view>{{$t('new.sh')}}</view>
				</view>
			</view>
		</view>

		<!--联系客服弹出 start-->
		<uni-popup ref="popup2" type="center">
			<view class="email-cont">
				<image class="query" @click="onQuery" src="../../static/images/close1.png"></image>
				<view class="title">{{$t('kefu.title')}}</view>
				<view class="cont">
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>cs-reply@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>info@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>reply@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>support@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>help@kolibrimall.com
					</view>
				</view>
			</view>
		</uni-popup>

		<u-popup :show="showContact" mode="center" bgColor="transparent">
			<view class="contact">
				<image src="../../static/images/new/tck-xy.png" class="contact-head"></image>
				<image src="../../static/images/new/close.png" class="contact-info-close" @click="showContact=false">
				</image>
				<view class="contact-info">
					<view class="contact-info-tit">{{$t('user.myCont.ptkf')}}</view>

					<!--fb://profile/100089663415703-->
					<a href="fb://profile/100089663415703" target="_blank" v-if="isFacebookApp">
						<view class="contact-info-des">
							<image src="../../static/images/new/face book.png"></image>
							<view>Face book</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="checkApp()">
						<image src="../../static/images/new/face book.png"></image>
						<view>Face book</view>
					</view>
					

					<a href="twitter://user?screen_name=Kolibrimall2023" target="_blank" v-if="isTwitterApp">
						<view class="contact-info-des" id="twitter">
							<image src="../../static/images/share21.png"></image>
							<view>Twitter</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="checkApp()">
						<image src="../../static/images/share21.png"></image>
						<view>Twitter</view>
					</view>
					
					<a href="tg://resolve?domain=Kolibrimall" target="_blank" v-if="isTelegramApp">
						<view class="contact-info-des">
							<image src="../../static/images/new/Telegram.png"></image>
							<view>Telegram</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="checkApp()">
						<image src="../../static/images/new/Telegram.png"></image>
						<view>Telegram</view>
					</view>

					<a href="whatsapp://send?phone=+86 13227163010" target="_blank" v-if="isWhatsApp">
						<view class="contact-info-des">
							<image src="../../static/images/new/WhatsAPP.png"></image>
							<view>WhatsAPP</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="checkApp()">
						<image src="../../static/images/new/WhatsAPP.png"></image>
						<view>WhatsAPP</view>
					</view>

				</view>
			</view>
		</u-popup>

	</view>
</template>

<script src="https://cdn.ronghub.com/RongIMLib-5.5.5.prod.js"></script>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="./jssocials-1.4.0/jssocials.min.js"></script>
<script>
	// $("#twitter").jsSocials({
	// 	shares: ["twitter"]
	// });
</script>

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
				isTwitterApp: false,
				isFacebookApp: false,
				isWhatsApp: false,
				isTelegramApp:false
			}
		},
		onLoad() {
			this.isTwitterApp = plus.runtime.isApplicationExist({
				pname: 'com.twitter.android'
			})

			this.isFacebookApp = plus.runtime.isApplicationExist({
				pname: 'org.chromium.webapk.a045f375fc2f55b23_v2'
			})

			this.isWhatsApp = plus.runtime.isApplicationExist({
				pname: 'com.whatsapp'
			})
			
			this.isTelegramApp = plus.runtime.isApplicationExist({
				pname: 'org.telegram.messenger'
			})
			

		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					uni.setStorageSync('userCont', res.data)
					this.userCont = res.data
				}
			})

			// 实名认证
			this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
				if (res.code == 1) {
					this.MineCont = res.data
				}
			})

			this.$http.post(this.$apiObj.MineWinAuction, {
				page: '1',
				pagenum: '1'
			}).then(res => {
				if (res.code == 1) {
					this.no_select = res.data.no_select
				}
			})
			this.$http.post(this.$apiObj.MineSysmsgList, {
				page: 1,
				pagenum: 1
			}).then(res => {
				if (res.code == 1) {
					this.noSelect = res.data.no_read
				}
			})
		},
		methods: {
			checkApp() {
				uni.showToast({
					title: "未安装应用,即将跳转至应用商店",
					icon: "none"
				})
				setTimeout(() => {
					plus.runtime.launchApplication({
						//打开app
						pname: "com.android.vending",
					})
				}, 1000);
			},
			toAuction(num) {
				uni.navigateTo({
					url: '/pages/mine/auctionM?num=' + num
				})
			},
			toAddress(url) {
				uni.navigateTo({
					url
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
				(function() {
					var c = document.createElement("script"),
						s = document.getElementsByTagName("script")[0];
					c.src = "https://kefu3.cckefucloud.com/vclient/?webid=1784027&wc=5513c6cf";
					s.parentNode.insertBefore(c, s);
				})();
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.mine-page {
		min-height: 100vh;
		background: #f8f8f8;
	}

	.mine-share {
		width: 498rpx;
		height: 80rpx;
		font-size: 24rpx;
		color: rgb(44, 44, 44);
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFF;
		border-radius: 16rpx 16rpx 0 0;
		box-shadow: 0px 0px 10rpx rgba(255, 198, 188, 0.3);
		margin: 0 auto;

		image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 18rpx;
		}

	}

	.service {
		width: 686rpx;
		height: 160rpx;
		padding: 20rpx 0;
		background: #FFF;
		border-radius: 16rpx;
		box-shadow: 0px 4rpx 10rpx rgba(255, 198, 188, 0.3);
		margin: 0 auto;

		.service-head {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;

			.service-head-left {
				font-size: 32rpx;
				color: rgb(44, 44, 44);
				font-weight: bold;
				margin-left: 20rpx;
			}

			.service-head-right {
				position: absolute;
				right: 20rpx;
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				display: flex;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 10rpx;
				}

			}

		}

		.service-list {
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 22rpx;

			.service-item {
				width: 25%;
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				text-align: center;

				image {
					width: 60rpx;
					height: 60rpx;
					// margin-bottom: 12rpx;
				}
			}
		}

	}

	/*关于我们*/
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

	/*钱包相关*/
	.mine-wallet {
		width: 686rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		// background: #FFF;
		border-radius: 16rpx;
		margin: 60rpx auto 0 auto;
		// box-shadow: 0px 0px 20rpx 0px rgba(255, 198, 188, 0.3);

		.mine-wallet-left {
			width: 400rpx;
			height: 200rpx;
			text-align: center;
			display: flex;
			align-items: center;
			background: #FFF;
			border-radius: 16rpx;
			box-shadow: 0px 0px 20rpx 0px rgba(255, 198, 188, 0.3);

			image {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 10rpx;
			}

			.mine-wallet-left-one {
				width: 164rpx;
				text-align: center;
			}

			.mine-wallet-left-two {
				width: 236rpx;

				.mine-wallet-left-two-tit {
					margin-bottom: 30rpx;

					span {
						font-size: 16rpx;
					}
				}
			}

			view {
				font-size: 24rpx;
				color: rgb(44, 44, 44);
			}
		}

		.mine-wallet-right {
			width: 260rpx;
			height: 200rpx;
			background: #FFF;
			margin-left: 26rpx;
			border-radius: 16rpx;
			box-shadow: 0px 0px 20rpx 0px rgba(255, 198, 188, 0.3);

			.mine-wallet-info {
				width: 100%;
				height: 100rpx;
				// background: #FFF;
				// border-radius: 16rpx;
				// box-shadow: 0px 0px 20rpx 0px rgba(255, 198, 188, 0.3);
				display: flex;
				align-items: center;
				// justify-content: center;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-left: 32rpx;
				}

				view {
					// width: 180rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					margin-left: 16rpx;
				}
			}
		}

	}

	.commission {
		width: 686rpx;
		height: 140rpx;
		line-height: 140rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: rgb(255, 78, 47);
		text-align: center;
		text-indent: 100rpx;
		background: url('/static/images/new/yqfy.png') no-repeat;
		background-size: 686rpx 140rpx;
		margin: 20rpx auto 0 auto;

	}

	.mine-head {
		width: 750rpx;
		height: 334rpx;
		background: url('../../static/images/mine/tuoyuan.png') no-repeat;
		background-size: 750rpx 334rpx;
		position: relative;

		.head-set {
			position: absolute;
			top: 82rpx;
			right: 50rpx;
			width: 48rpx;
			height: 48rpx;
		}

		.head_kf {
			position: absolute;
			top: 112rpx;
			right: 188rpx;
			width: 48rpx;
			height: 48rpx;
		}

		.head_msg {
			position: absolute;
			top: 112rpx;
			right: 32rpx;
			width: 48rpx;
			height: 48rpx;
		}

		.head-mid {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.mid-fl {
				display: flex;
				align-items: center;
			}

			.vip {
				position: absolute;
				top: 208rpx;
				left: 200rpx;
				font-size: 16rpx;
				color: rgb(255, 255, 255);
				background: #2C2C2C;
				padding: 4rpx 14rpx;
				border-radius: 18rpx;
			}

			.yishiming {
				color: rgb(255, 216, 68);
			}

			.mid-txt {
				position: absolute;
				top: 152rpx;
				left: 202rpx;
				display: flex;
				align-items: center;

				.name {
					// max-width: 200rpx;
					font-size: 40rpx;
					color: #fff;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: 10rpx;
				}
			}

			.more {
				width: 10rpx;
				height: 18rpx;
			}

			.mid-img {
				position: absolute;
				top: 122rpx;
				left: 32rpx;
				width: 140rpx;
				height: 140rpx;
				border-radius: 100%;
				border: 2px solid #fff;
				overflow: hidden;
				min-width: 140rpx;
				max-width: 140rpx;
			}

			.mid_shiming {
				position: absolute;
				top: 240rpx;
				left: 60rpx;
				width: 84rpx;
				height: 34rpx;
				line-height: 34rpx;
				font-size: 16rpx;
				color: #FFD844;
				text-align: center;
				background: #2C2C2C;
				border-radius: 20rpx;
			}

		}

		.head-nav {
			// position: absolute;
			// top: 112rpx;
			// right: 188rpx;
			display: flex;
			justify-content: space-between;
			font-size: 22rpx;
			color: #fff;
			text-align: center;
			margin-top: 30rpx;

			.li {
				position: relative;
			}

			.t {
				margin-top: 20rpx;
			}

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin: 0 auto;
			}

			.dian {
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				background: red;
				border-radius: 50%;
				top: -4rpx;
				right: 18rpx;
			}
		}
	}

	.mine-jingpai {
		width: 686rpx;
		height: 180rpx;
		padding-top: 20rpx;
		background: #FFF;
		box-shadow: 0px 0px 20rpx 0px rgba(255, 198, 188, 0.3);
		border-radius: 20rpx;
		margin: 44rpx 0 0 32rpx;

		.mine-jingpai-list {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
		}

		.mine-jingpai-name {
			font-size: 28rpx;
			font-weight: bold;
			margin-left: 30rpx;
		}

		.mine-jingpai-li {
			width: 25%;
			text-align: center;

			view {
				width: 80%;
				height: 60rpx;
				text-align: center;
				overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				margin: 0 auto;
			}
		}

		image {
			width: 60rpx;
			height: 60rpx;
		}

	}

	.mine-order {
		// position: relative;
		height: 200rpx;
		background: #ffffff;
		box-shadow: 0px 0px 20rpx 0px rgba(255, 198, 188, 0.3);
		border-radius: 20rpx;
		margin: 0rpx 30rpx 30rpx 30rpx;

		.order-hd {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			// border-bottom: 1px solid #f5f5f5;
			margin-top: 44rpx;

			.t {
				font-size: 28rpx;
				font-weight: bold;
			}

			.more {
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				display: flex;
				align-items: center;

				.icon {
					width: 32rpx;
					height: 32rpx;
					margin-left: 10rpx;

				}
			}
		}

		.order-nav {
			text-align: center;
			padding: 0 0rpx 30rpx 0rpx;
			display: flex;
			justify-content: space-between;

			.li {
				width: 25%;
				text-align: center;
			}

			.icon {
				width: 60rpx;
				height: 60rpx;
				margin: 0 auto;
			}

			.t {
				margin-top: 15rpx;
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.mine-asd {
		margin: 20rpx 30rpx;
	}

	.mine-list {
		margin: -20rpx 30rpx 0 30rpx;

		.li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx 0;
			border-bottom: 1px solid #f5f5f5;
			position: relative;

			.more {
				width: 14rpx;
				height: 25rpx;
			}

			.dian {
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				background: red;
				border-radius: 50%;
				top: 40rpx;
				right: 20rpx;
			}

			.li-fl {
				display: flex;
				align-items: center;
				font-size: 26rpx;

				.icon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>