<template>
	<view class="bonus_top">
		<!--赠金-->
		<u-overlay :show="show" :opacity="0.8">
			<view class="bonus-info">
				<view class="bonus">
					<view class="bonus-tit">{{$t('bonus.gifts')}}</view>
					<view class="bonus-name">{{$t('bonus.snhl')}}</view>
					<view class="bonus-price"><text style="font-size: 40rpx;margin-right: 8rpx;">RM</text> {{price*1}}
					</view>
					<view class="bonus-time">{{isShopCont ? `Validity period: 7 days`:`有效期：7天`}}</view>
					<view class="bonus-btn" @click="toList()">{{$t('bonus.cf')}}</view>
				</view>
				<image src="/static/Bell/close.png" class="close" @click="show=false;getPrizeNum()"></image>
			</view>
		</u-overlay>

		<!--指引-->
		<u-overlay :show="showOperate">
			<view class="operate">
				<view class="operate-btn" @click="setOperate()">
					<view>{{isShopCont?'Skip Guidance':'跳过指引'}}</view>
					<image src="/static/images/luck/luck-right.png"></image>
				</view>
				<template v-if="isShopCont">
					<image src="/static/components/start_en.png" class="step" v-if="step==0" @click="nextStep()">
					</image>
					<image src="/static/components/step1_en.png" class="step" v-else-if="step==1" @click="nextStep()">
					</image>
					<image src="/static/components/step2_en.png" class="step" v-else-if="step==2" @click="nextStep()">
					</image>
					<image src="/static/components/step3_en.png" class="step" v-else-if="step==3" @click="nextStep()">
					</image>
					<image src="/static/components/step4_en.png" class="step" v-else-if="step==4" @click="nextStep()">
					</image>
				</template>
				<template v-else-if="!isShopCont">
					<image src="/static/components/start_cn.png" class="step" v-if="step==0" @click="nextStep()">
					</image>
					<image src="/static/components/step1_cn.png" class="step" v-else-if="step==1" @click="nextStep()">
					</image>
					<image src="/static/components/step2_cn.png" class="step" v-else-if="step==2" @click="nextStep()">
					</image>
					<image src="/static/components/step3_cn.png" class="step" v-else-if="step==3" @click="nextStep()">
					</image>
					<image src="/static/components/step4_cn.png" class="step" v-else-if="step==4" @click="nextStep()">
					</image>
				</template>

			</view>
		</u-overlay>

		<!--更新-->
		<!-- #ifdef APP-PLUS -->
		<u-overlay :show="showUpdate">
			<view class="update_info">
				<view class="update_app">
					<image src="/static/components/update.png"></image>
					<view class="version">{{$t('version.new_version')}} V{{version}}</view>
					<view class="des">
						{{isShopCont?'Update Content' : '更新内容'}}：<br>
						{{isShopCont ? version_desc_en : version_desc}}
					</view>
					<template>
						<a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
							style="text-decoration:none;">
							<view class="btn">{{$t('version.update_now')}}</view>
						</a>
					</template>
				</view>
				<!-- <image src="/static/Bell/close.png" class="close_btn" @click="updateClose()"></image> -->
			</view>
		</u-overlay>
		<!-- #endif -->

		<u-overlay :show="showRecharge">
			<view class="recharge_info">
				<image :src="isShopCont ? '/static/Bell/recharge_en.png' : '/static/Bell/recharge_cn.png'"
					mode="widthFix" class="recharge_tk"
					@click="navClick('/pages/active/recharge/recharge');showRecharge=false;"></image>
				<image src="/static/Bell/close.png" class="close_btn" @click="closeRecharge()"></image>
			</view>
		</u-overlay>

		<u-overlay :show="showBell" :opacity="0.9">
			<view class="warp">
				<image class="imgLottery" src="/static/Bell/lottery.png" v-if="isShopCont"></image>
				<image class="imgLottery" src="/static/Bell/lottery_en.png" v-else></image>
				<view class="bell-shop-name">
					<view class="name">
						{{info.goods_name}}
					</view>
				</view>
				<view class="imgTrumpet">
					<view class="imgTrumpet-img">
						<image src="/static/Bell/trumpet.png"></image>
					</view>
					<image :src="info.showimg" class="imgTrumpet-shop-img" mode="widthFix"></image>
					<view class="imgTrumpet-text">
						{{$t('bell.gx')}}
					</view>
					<view class="imgTrumpet-text">
						{{$t('bell.xyhd')}}
					</view>
				</view>
				<view class="imgFooter">
					<view class="imgFooter-text" @click="toGift">
						{{$t('bell.ljlq')}}
					</view>
				</view>
				<view class="imgShare" @click="copyUrl()">
					<image class="imgShare-img" src="/static/Bell/share.png"></image>
					<view class="imgShare-text">
						{{$t('bell.fx')}}
					</view>
				</view>
				<image class="imgClose" src="/static/Bell/close.png" @click="closeOverLay()"></image>
			</view>
			<!--分享弹出 start-->
			<view class="fenxiang" v-if="onfenxingShow">
				<view class="share-pop">
					<view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
					<view class="share-ul">
						<view class="share-li" @click="ontweet">
							<view class="icon">
								<image class="img" src="/static/images/share21.png"></image>
							</view>
							<view class="t" style="color:#000">twitter</view>
						</view>
						<view @click="onfacebook" class="share-li">
							<view class="icon">
								<image class="img" src="/static/images/share23.png"></image>
							</view>
							<view class="t" style="color:#000">Facebook</view>
						</view>
						<view class="share-li" @click="onUrlClick">
							<view class="icon">
								<image class="img" src="/static/images/share25.png"></image>
							</view>
							<view class="t">{{$t('auction.detail.fuzhilianjie')}}</view>
						</view>
					</view>
					<view class="share-bot">
						<button class="share-btn" @click="toggle2Close">{{$t('auction.detail.query')}}</button>
					</view>
				</view>
			</view>
		</u-overlay>


	</view>
</template>

<script>
	export default {
		props: ['update'],
		data() {
			return {
				show: false, //赠金弹框，层级3
				isShopCont: true,
				price: 0,

				showOperate: false, //指引弹框，层级2
				step: 0,

				showUpdate: false, //更新弹框，层级1
				version: '',
				version_desc: '',
				version_desc_en: '',

				showRecharge: false, //充值弹框，层级4
				rechargeIsOpenOrClose: false, //充值弹窗默认关闭还是开启

				showBell: false, //中拍弹框，层级5
				onfenxingShow: false,
				info: {},
				newNub: 0,
				newArr: [],
				show: false,
				onfenxingShow: false,
				qrUrl: '',
				auction_goods_id: 0
			}
		},
		created() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.getVersion()
		},
		methods: {
			closeRecharge() {
				this.showRecharge = false
				this.setUpMemory()
			},
			getPrizeNum() {
				if (this.update) {
					this.$http.post(this.$apiObj.PrizeGetNum).then(res => {
						if (res.data.lottery_number > 0) this.showRecharge = true
						else this.setUpMemory()
					})
				} else {
					this.setUpMemory()
				}
			},
			setUpMemory() {
				if (uni.getStorageSync('BellCode')) {
					setInterval(() => {
						this.getLatestWinAuction()
					}, 1000 * 60 * 60)
				} else {
					uni.setStorageSync('BellCode', true)
					this.getLatestWinAuction()
					setInterval(() => {
						this.getLatestWinAuction()
					}, 1000 * 60 * 60)
				}
			},

			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			updateClose() {
				this.showUpdate = false
				if (uni.getStorageSync('token')) {
					this.getInfo()
				}
			},
			nextStep() {
				if (this.step == 4) {
					this.setOperate()
					return
				}
				this.step += 1
			},
			setOperate() {
				this.updateOperate()
			},
			toList() {
				uni.navigateTo({
					url: '/pages/auction/auctionT?id=1&source=bonus'
				})
				this.show = false
			},
			getVersion() {
				this.$http.post(this.$apiObj.IndexSetting, {
					fields: 'version_auction,version_auction_desc,version_auction_desc_en,user_lucky_lottery_status'
				}).then(res => {
					if (res.code == 1) {
						this.version = res.data.version_auction
						this.version_desc = res.data.version_auction_desc
						this.version_desc_en = res.data.version_auction_desc_en
						this.rechargeIsOpenOrClose = res.data.user_lucky_lottery_status == 1 ? true : false
						
						// #ifdef H5
						if (uni.getStorageSync('token')) {
							this.getInfo()
						}
						// #endif
						// #ifndef H5
						if (this.update && this.version != this.$version) {
							this.showUpdate = true
						} else {
							if (uni.getStorageSync('token')) {
								this.getInfo()
							}
						}
						// #endif
					}
				})
			},
			//修改操作指引是否已读
			updateOperate() {
				this.$http.post(this.$apiObj.MineUpdateOperate).then(res => {
					if (res.code == 1) {
						this.showOperate = false
						this.getBonusRecord()
					}
				})
			},
			getInfo() {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (!res.data.is_read_operation_guide && this.update) {
						this.showOperate = true
					} else {
						this.getBonusRecord()
					}
				})
			},
			getBonusRecord() {
				this.$http.post(this.$apiObj.BonusRecord, {
					pagenum: 1
				}).then(res => {
					if (res.data.list.data.length > 0) {
						this.show = true
						this.price = res.data.list.data[0].money
					} else {
						if(this.rechargeIsOpenOrClose) this.getPrizeNum()
						else this.setUpMemory()
					}
				})
			},

			//中拍弹出
			closeOverLay() {
				if (this.newArr.length > this.newNub) {
					this.auction_goods_id = this.newArr[this.newNub].auction_goods_id
					this.info = this.newArr[this.newNub]
					const {
						invite_code
					} = uni.getStorageSync('userCont');
					this.qrUrl = this.generateQrUrl(invite_code);
					this.newNub++
					this.showBell = true
				} else {
					this.showBell = false
				}
			},
			async getLatestWinAuction() {
				try {
					const res = await this.$http.post(this.$apiObj.LatestWinAuction);
					const neData = res.data.list.data
					neData.forEach(item => {
						let imgarr = item.images.split(',')
						this.$set(item, 'showimg', imgarr[0])
					})
					if (neData.length > 0) {
						this.showBell = true
						this.newArr = neData
						this.closeOverLay()
					}
				} catch (error) {
					console.error(error);
				}

			},
			generateQrUrl(invite_code) {
				return this.$baseUrl + 'pages/topromote/activity/spread?invite_code=' + invite_code + '&shopId=' + this
					.auction_goods_id;
			},
			copyUrl() {
				this.onfenxingShow = true
			},
			// 链接分享
			ontweet() {
				let url = `https://twitter.com/intent/tweet?url=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
			onfacebook() {
				let url = `https://www.facebook.com/sharer/sharer.php?u=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
			// 分享--加分享次数
			onAuctionorderShare() {
				this.$http.post(this.$apiObj.AuctionorderShare, {
					auction_goods_id: this.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						// this.onAuctionDetail()
					}
				})
			},
			onUrlClick() {
				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = this.qrUrl;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				uni.showToast({
					icon: 'none',
					title: this.$t('user.order.detail.fzcg')
				})
				oInput.remove()
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: this.qrUrl,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			},
			// 取消分享
			toggle2Close() {
				this.onfenxingShow = false
			},
			toGift() {
				uni.navigateTo({
					url: '/pages/mine/auctionM?num=' + 3 + '&type=other&data=' + JSON.stringify(this.info)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.bonus_top {

		//中拍弹出
		.warp {
			height: 100%;
			position: relative;

			.imgTop {
				width: 100%;
				height: 225rpx;
				background-size: 100% 660rpx;
			}

			.imgFooter {
				width: 400rpx;
				height: 104rpx;
				position: absolute;
				top: 75%;
				right: -2%;
				background: url('@/static/Bell/footer.png') no-repeat;
				background-size: 100% 100%;
				padding: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.imgFooter-text {
					color: rgb(255, 255, 255);
					font-size: 32rpx;
					font-weight: 700;
					margin-bottom: 20rpx;
				}
			}

			.imgShare {
				width: 224rpx;
				height: 120rpx;
				position: absolute;
				top: 76%;
				left: 2%;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 130px;
				transform: translate(0px, 4px);
				border-radius: 100rpx;
				border: 1px solid #fff;

				.imgShare-text {
					color: rgb(255, 255, 255);
					font-size: 32rpx;
					font-weight: 700;
					margin-left: 10rpx;
				}

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
			}

			.imgTrumpet {
				.imgTrumpet-shop-img {
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 360rpx;
				}

				.imgTrumpet-img {
					width: 678rpx;
					height: 672rpx;

					image {
						width: 678rpx;
						height: 672rpx;
					}
				}

				.imgTrumpet-text {
					color: rgb(255, 255, 255);
					font-size: 32rpx;
					text-align: center;
				}

				position: absolute;
				top: 45%;
				left: 50%;
				z-index: 101;
				transform: translate(-50%, -50%);
				z-index: 101;
			}

			.imgLottery {
				width: 490rpx;
				height: 260rpx;
				position: absolute;
				top: 6%;
				left: 50%;
				transform: translate(-50%, 0);
			}

			.imgClose {
				width: 64rpx;
				height: 64rpx;
				position: absolute;
				left: 50%;
				top: 86%;
				transform: translate(-50%, 30rpx);
			}
		}

		.fenxiang {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.4);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
		}

		.bell-shop-name {
			color: rgb(255, 255, 255);
			font-size: 28rpx;
			font-weight: 700;
			position: absolute;
			top: 18%;
			left: 50%;
			transform: translate(-50%, 0px);
			font-weight: 700;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			text-align: center;
		}

		.share-pop {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #ffffff;
			border-radius: 20rpx 20rpx 0px 0px;

			.share-t {
				font-size: 28rpx;
				font-weight: 550;
				text-align: center;
				padding: 30rpx;
			}

			.share-ul {
				display: flex;
				flex-wrap: wrap;
				padding: 50rpx 30rpx;
				text-align: center;

				.share-li {
					width: 33.3333%;
					text-decoration: none;

					.icon {
						width: 90rpx;
						height: 90rpx;
						margin: 0 auto;
					}

					.t {
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						// line-height: 1;
						margin-top: 25rpx;
					}
				}
			}

			.share-bot {
				padding: 40rpx 30rpx;
				border-top: 1px solid #f5f5f5;

				.share-btn {
					font-size: 28rpx;
					font-weight: 550;
					width: 100%;
					padding: 0;
					margin: 0;
				}
			}
		}

		.recharge_info {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.recharge_tk {
				display: block;
				width: 630rpx;
				// height: 820rpx;
				margin: 0 auto;
			}

			.close_btn {
				display: block;
				width: 64rpx;
				height: 64rpx;
				margin: 40rpx auto 0 auto;
			}

		}

		//app更新
		.update_info {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.update_app {
				position: relative;
				width: 590rpx;
				padding: 220rpx 0 40rpx 0;
				background: rgb(255, 255, 255);
				border-radius: 24rpx;

				image {
					position: absolute;
					top: -120rpx;
					left: 50%;
					transform: translate(-50%, 0);
					display: block;
					width: 376rpx;
					height: 334rpx;
				}

				.version {
					width: 100%;
					font-size: 32rpx;
					color: rgb(10, 198, 142);
					text-align: center;
				}

				.des {
					width: 494rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					margin: 40rpx auto 64rpx auto;
				}

				.btn {
					width: 320rpx;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 32rpx;
					font-weight: bold;
					color: rgb(255, 255, 255);
					text-align: center;
					background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);
					border-radius: 88rpx;
					margin: 0 auto;
				}

			}

			.close_btn {
				display: block;
				width: 64rpx;
				height: 64rpx;
				margin: 40rpx auto 0 auto;
			}

		}

		.operate {
			width: 750rpx;
			min-height: 100vh;

			.step {
				width: 750rpx;
				height: 100%;
			}

			.operate-btn {
				position: fixed;
				top: 120rpx;
				right: 48rpx;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				z-index: 10;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-left: 16rpx;
				}
			}
		}

		.bonus-info {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.close {
			display: block;
			width: 64rpx;
			height: 64rpx;
			margin: 40rpx auto;
		}

		.bonus {
			position: relative;
			width: 750rpx;
			height: 640rpx;
			background: url('/static/components/Bonus_bj.png')no-repeat;
			background-size: 750rpx 640rpx;

			.bonus-tit {
				width: 100%;
				background: linear-gradient(135.00deg, rgb(255, 181, 141), rgb(255, 83, 56));
				-webkit-background-clip:
					text;
				-webkit-text-fill-color:
					transparent;
				background-clip:
					text;
				text-fill-color:
					transparent;
				font-family: SF Pro Display;
				font-size: 44rpx;
				font-weight: 700;
				line-height: 52rpx;
				letter-spacing: 0rpx;
				text-align: center;
			}

			.bonus-name {
				position: absolute;
				top: 162rpx;
				left: 218rpx;
				width: 216rpx;
				font-family: SF Pro Display;
				font-size: 28rpx;
				font-weight: bold;
				text-align: center;
				background: linear-gradient(90.00deg, rgb(249, 118, 48), rgb(244, 67, 66));
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.bonus-price {
				position: absolute;
				top: 232rpx;
				left: 154rpx;
				width: 346rpx;
				font-size: 68rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				text-align: center;
			}

			.bonus-time {
				position: absolute;
				top: 358rpx;
				left: 196rpx;
				width: 260rpx;
				font-size: 20rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.bonus-btn {
				position: absolute;
				left: 202rpx;
				bottom: 0;
				width: 346rpx;
				height: 90rpx;
				line-height: 90rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				text-align: center;

			}

		}
	}
</style>