<template>
	<view class="recharge_rebate">
		<view class="header">
			<view class="head">
				<image src="/static/images/auth/left.png" @click="toBack()"></image>
				<view>{{$t('active.friend_fl')}}</view>
			</view>

			<view class="head_tit">{{$t('active.rmor_kdiamond')}}</view>

			<image src="/static/images/recharge_rebate/recharge_rebate_bx.png" class="bx"></image>
		</view>

		<view class="info">
			<view class="rule">
				<view class="time">
					<image src="/static/images/recharge_rebate/rebate_left.png"></image>
					<view>{{$t('active.active_time')}}</view>
					<image src="/static/images/recharge_rebate/rebate_right.png"></image>
				</view>

				<view class="time_info">{{$u.timeFormat(start_time, 'yyyy/mm/dd')}} - {{$u.timeFormat(end_time, 'yyyy/mm/dd')}}</view>

				<view class="rule_info">
					<view class="rule_tit">{{$t('active.acive_rule')}}</view>

					<view class="rule_des">
						<!-- <view class="num">1.</view> -->
						<view class="des">
							<u-parse :content="isShopCont ? rule_en : rule"></u-parse>
						</view>
					</view>

					<!-- <view class="rule_des">
						<view class="num">2.</view>
						<view class="des">
							The above two rebate activities will randomly receive one of them after the users you invite
							recharge
						</view>
					</view>

					<view class="rule_des">
						<view class="num">3.</view>
						<view class="des">
							Reward Withdrawal : Once approved, you can directly withdraw the cash rewards to your bank
							account.
						</view>
					</view> -->

				</view>

			</view>

			<view class="link">
				<view class="tit">{{$t('new.yqlj')}}: </view>
				<view class="link_info">
					<text>{{qrUrl}}</text>
					<image src="/static/images/recharge_rebate/recharge_rebate_copy.png" @click="copy(qrUrl)"></image>
				</view>
			</view>

			<view class="link">
				<view class="tit">{{$t('new.ndyqm')}}: </view>
				<view class="link_info" style="width: 300rpx;">
					<text>{{code}}</text>
					<image src="/static/images/recharge_rebate/recharge_rebate_copy.png" @click="copy(code)"></image>
				</view>
			</view>

			<view class="link">
				<view class="tit">{{$t('new.yqewm')}}: </view>
			</view>

			<view class="btm">
				<image :src="qrcodeImg" class="link_ewm"></image>

				<!-- #ifdef APP-PLUS -->
				<view class="btn" @click="capture()">{{$t('new.ljyq')}}</view>
				<!-- #endif -->
			</view>

		</view>

		<u-popup :show="showyq" mode="center" @close="showyq=false" bgColor="transparent">
			<view class="showyq"
				:style="isShopCont=='en'?`background: url('/static/images/new/yjyq-en.png') no-repeat;background-size: 100% 100vh;`:''">
				<view class="showyq-ewm">
					<image :src="qrcodeImg"></image>
				</view>

				<image :src="userCont.avatar" class="showyq-auth"></image>
				<view class="showyq-hy">{{$t('new.ndhy')}}[{{userCont.nickname}}]</view>
				<view class="showyq-yq">{{$t('new.hnyql')}}</view>
			</view>
		</u-popup>

		<view class="commission-canvas">
			<canvas class="f__canvas" style="width:140px;height:140px;" canvas-id="qrcode" id="qrcode"></canvas>
		</view>
		<!-- <view style="height: 48rpx;"></view> -->

	</view>
</template>

<script>
	import {
		saveImg,
		qrcodeCanvas
	} from '@/uni_modules/fan-canvas/plugins/utils';
	export default {
		data() {
			return {
				userCont: {},
				code: '',
				qrUrl: '',
				qrcodeImg: '',
				showyq: false,
				isShopCont: uni.getStorageSync('locale') == 'en' ? true : false,
				rule: '',
				rule_en: '',
				start_time: '',
				end_time: ''
			}
		},
		onLoad() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false

			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					this.userCont = res.data
					this.code = res.data.invite_code
					this.qrUrl = this.$baseUrl + 'pages/active/rebate?invite_code=' + res.data
						.invite_code
					this.createQrcode()
				}
			})

			this.$http.post(this.$apiObj.IndexSetting, {
				fields: 'beinvite_user_recharge_rebate_start_time,beinvite_user_recharge_rebate_end_time,beinvite_user_recharge_rebate_zh_desc,beinvite_user_recharge_rebate_en_desc'
			}).then(res => {
				if (res.code == 1) {
					this.start_time = res.data.beinvite_user_recharge_rebate_start_time
					this.end_time = res.data.beinvite_user_recharge_rebate_end_time
					this.rule = res.data.beinvite_user_recharge_rebate_zh_desc
					this.rule_en = res.data.beinvite_user_recharge_rebate_en_desc
				}
			})
		},
		methods: {
			toBack(){
				uni.navigateBack()
			},
			capture() {
				this.showyq = true
				let that = this
				const pages = getCurrentPages();

				const page = pages[pages.length - 1];
				try {
					const currentWebview = page.$getAppWebview();
					let bitmap = new plus.nativeObj.Bitmap('amway_img');
					setTimeout(() => {
						currentWebview.draw(bitmap, function() {
							let fileName = '_doc/' + new Date().getTime() + '.png'
							bitmap.save(fileName, {}, function(i) {
								uni.saveImageToPhotosAlbum({
									filePath: i.target,
									success: function() {
										bitmap.clear();
										uni.showToast({
											title: that.$t('new.bctpcg'),
											duration: 2000,
											icon: 'none'
										});
										setTimeout(() => {
											that.showyq = false
										}, 1000)
									}
								});
							}, function(e) {
								console.log('����ͼƬʧ�ܣ�' + JSON.stringify(e));
							});
						}, function(e) {
							that.showyq = false
							console.log('��������ͼƬʧ�ܣ�' + JSON.stringify(e));
						});
					}, 1000)
				} catch {
					uni.showToast({
						title: that.$t('new.bctpsb'),
						duration: 2000,
						icon: 'none'
					});
					setTimeout(() => {
						that.showyq = false
					}, 1000)

				}
			},
			navBack() {
				uni.navigateBack()
			},
			createQrcode() {
				var that = this
				qrcodeCanvas('qrcode', that.qrUrl, 280, 280);
				const ctx = uni.createCanvasContext('qrcode');
				ctx.fillStyle = "#fff"
				ctx.draw(true, function() {
					uni.canvasToTempFilePath({
						width: 280,
						height: 280,
						// fileType:'jpg',
						canvasId: 'qrcode',
						success(res) {
							that.qrcodeImg = res.tempFilePath
						}
					}, that)
				})
			},
			copy(val) {
				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = val;
				document.body.appendChild(oInput);
				oInput.select();
				document.execCommand("Copy");
				uni.showToast({
					icon: 'none',
					title: this.$t('user.order.detail.fzcg')
				})
				oInput.remove()
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: val,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			}
		}
	}
</script>

<style lang="less" scoped>
	.recharge_rebate {
		width: 750rpx;
		min-height: 100vh;

		.showyq {
			position: relative;
			width: 750rpx;
			min-height: 100vh;
			background: url('/static/images/new/yjyq.png') no-repeat;
			background-size: 100% 100vh;
			margin-top: 100rpx;

			.showyq-ewm {
				position: absolute;
				bottom: 506rpx;
				left: 50%;
				transform: translate(-50%, 0);
				width: 300rpx;
				height: 300rpx;
				// background: #fff;

				image {
					position: absolute;
					top: 50%;
					left: 4rpx;
					transform: translate(0, -50%);
					width: 300rpx;
					height: 300rpx;
				}
			}

			.showyq-auth {
				position: absolute;
				bottom: 300rpx;
				left: 50%;
				transform: translate(-50%, 0);
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}

			.showyq-hy {
				position: absolute;
				bottom: 206rpx;
				width: 100%;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.showyq-yq {
				position: absolute;
				bottom: 148rpx;
				width: 100%;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}

		}

		.header {
			width: 750rpx;
			height: 800rpx;
			background: url('/static/images/recharge_rebate/recharge_rebate_top.png') no-repeat;
			background-size: 750rpx 800rpx;

			.head {
				position: relative;
				width: 750rpx;
				height: 88rpx;
				padding-top: 60rpx;
				display: flex;
				align-items: center;

				image {
					position: absolute;
					left: 32rpx;
					width: 40rpx;
					height: 40rpx;
					z-index: 5;
				}

				view {
					width: 100%;
					font-size: 40rpx;
					font-weight: 700;
					color: rgb(255, 255, 255);
					text-align: center;
				}

			}

			.head_tit {
				width: 518rpx;
				height: 72rpx;
				font-size: 24rpx;
				font-weight: 700;
				color: rgb(0, 151, 106);
				display: flex;
				align-items: center;
				justify-content: center;
				background: url('/static/images/recharge_rebate/recharge_rebate_tit.png') no-repeat;
				background-size: 518rpx 72rpx;
				margin: 24rpx auto 0 auto;
			}

			.bx {
				display: block;
				width: 750rpx;
				height: 572rpx;
			}

		}

		.info {
			width: 750rpx;
			// height: 1296rpx;
			background: url('/static/images/recharge_rebate/recharge_rebate_bj.png') no-repeat;
			background-size: 750rpx 100%;
			margin-top: -64rpx;

			.rule {
				position: relative;
				width: 686rpx;
				padding: 24rpx 0 32rpx 0;
				background: rgb(165, 255, 196);
				border-radius: 24rpx;
				margin: -140rpx auto 0 auto;
				z-index: 5;

				.time {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 14rpx;
						height: 12rpx;
					}

					view {
						font-size: 28rpx;
						font-weight: 700;
						color: rgb(0, 153, 107);
						margin: 0 12rpx;
					}
				}

				.time_info {
					width: 100%;
					font-size: 28rpx;
					font-weight: 700;
					color: rgb(0, 153, 107);
					text-align: center;
					margin: 16rpx 0 32rpx 0;
				}

				.rule_info {
					width: 622rpx;
					padding: 16rpx 0 32rpx 0;
					background: rgb(255, 255, 255);
					border-radius: 24rpx;
					margin: 0 auto;

					.rule_tit {
						width: 220rpx;
						height: 52rpx;
						line-height: 52rpx;
						font-size: 26rpx;
						font-weight: 700;
						color: rgb(255, 255, 255);
						text-align: center;
						background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);
						box-shadow: 0px 4rpx 12rpx 0px rgba(34, 212, 126, 0.51);
						border-radius: 52rpx;
						margin: 0 auto 32rpx auto;
					}

					.rule_des {
						width: 574rpx;
						// line-height: 40rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: rgb(51, 51, 51);
						display: flex;
						margin: 0 auto 40rpx auto;

						.num {
							margin-right: 4rpx;
						}
					}

					.rule_des:last-child {
						margin-bottom: 0;
					}

				}

			}

			.link {
				width: 100%;
				font-size: 28rpx;
				font-weight: 500;
				color: rgb(0, 153, 107);
				display: flex;
				margin-top: 34rpx;

				.tit {
					margin-left: 36rpx;
				}

				.link_info {
					width: 446rpx;
					word-break: break-all;
					margin-left: 16rpx;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-left: 6rpx;
					}
				}

			}

			.btm {
				position: relative;
				width: 750rpx;
				height: 320rpx;
				background: url('/static/images/recharge_rebate/recharge_rebate_yun.png') no-repeat;
				background-size: 750rpx 320rpx;
				margin-top: 102rpx;

				.btn {
					position: absolute;
					bottom: 80rpx;
					left: 50%;
					transform: translate(-50%, 0);
					width: 320rpx;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 36rpx;
					font-weight: 700;
					color: rgb(255, 255, 255);
					text-align: center;
					background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);
					box-shadow: 0 8rpx 8rpx 0 rgba(255, 255, 255, 0.1);
					border-radius: 80rpx;
				}
			}

			.link_ewm {
				position: absolute;
				top: -50rpx;
				left: 50%;
				transform: translate(-50%, 0);
				display: block;
				width: 160rpx;
				height: 160rpx;
			}

		}

		.commission-canvas {
			position: fixed;
			top: -1000000rpx;
		}
	}
</style>