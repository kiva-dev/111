<template>
	<view class="invite_rule">
		<view class="header">
			<image src="/static/images/auth/left.png" @click="navBack()"></image>
			<view class="tit">{{$t('newDetail.guize')}}</view>
		</view>

		<view class="info">
			<view class="info-tit">{{$t('invite.rule_ms')}}</view>
			<view class="rm_name">{{$t('invite.rule_invite_reward')}}</view>
			<view class="rm_des">{{$t('invite.rule_success')}} <text>RM{{price}}</text> {{$t('invite.rule_cash_reward')}}
			</view>
			<view class="rm_icon">RM</view>

			<view class="rm_name" style="top: 286rpx;">{{$t('incite.rule_invite_user')}}</view>
			<view class="rm_des" style="top: 330rpx;">{{$t('invite.rule_user_will')}} <text>{{kCoins}}</text>
				{{$t('invite.rule_k_coins')}}
			</view>
			<view class="rm_icon" style="top: 318rpx;right: 134rpx;">
				<view>K</view>
				<text>Coin</text>
			</view>

			<view class="info_time">
				{{$t('invite.rule_activity_time')}}<br />
				{{$u.timeFormat(startTime, 'yyyy.mm.dd')}} - {{$u.timeFormat(endTime, 'yyyy.mm.dd')}}
			</view>

		</view>

		<view class="rules">
			<view class="tit">{{$t('invite.rule_event')}}</view>
			<view class="rules_info">
				<view class="info_key">1</view>
				<view class="info_value">{{$t('invite.rule1')}} {{$u.timeFormat(startTime, 'yyyy.mm.dd')}} - {{$u.timeFormat(endTime, 'yyyy.mm.dd')}}</view>
			</view>

			<view class="rules_info">
				<view class="info_key">2</view>
				<view class="info_value">{{$t('invite.rule2_1')}} <text>RM{{price}}</text>
					{{$t('invite.rule_cash_reward')}}
				</view>
			</view>

			<view class="rules_info">
				<view class="info_key">3</view>
				<view class="info_value">{{$t('invite.rule3')}}</view>
			</view>

			<view class="rules_info">
				<view class="info_key">4</view>
				<view class="info_value">{{$t('invite.rule4')}}</view>
			</view>
		</view>

		<view class="link">
			<view class="link_tit">{{$t('new.yqlj')}}: </view>
			<view class="link_value">
				{{qrUrl}}
				<image src="/static/images/mine/invite_copy.png" @click="copy(qrUrl)"></image>
			</view>
		</view>

		<view class="link">
			<view class="link_tit">{{$t('new.ndyqm')}}: </view>
			<view class="value">
				{{code}}
				<image src="/static/images/mine/invite_copy.png" @click="copy(code)"></image>
			</view>
		</view>

		<view class="code">
			<view class="tit">{{$t('new.yqewm')}}:</view>
			<view class="ewm">
				<image :src="qrcodeImg"></image>
			</view>
		</view>
		
		<!-- #ifdef APP-PLUS -->
		<view class="invite_btn" @click="capture()">{{$t('new.ljyq')}}</view>
		<!-- #endif -->
		
		
		<u-popup :show="showyq" mode="center" @close="showyq=false" bgColor="transparent">
			<view class="showyq"
				:style="lange=='en'?`background: url('/static/images/new/yjyq-en.png') no-repeat;background-size: 100% 100vh;`:''">
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
		<view style="height: 48rpx;"></view>
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
				showyq: false,
				code: '',
				qrUrl: '',
				qrcodeImg: '',
				lange: '',
				userCont: {},
				isShopCont: false, // ���Ļ���Ӣ��
				info: {},
				startTime:'',
				endTime:'',
				kCoins:0,
				price:0
			}
		},
		onLoad() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.$http.post(this.$apiObj.IndexSetting, {
				fields: 'were_invite_user_consume_rebate_rate,user_consume_rebate_start_money,user_consume_rebate_rate'
			}).then(res => {
				this.info = res.data
			})
			// ��ȡ������Ϣ
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					this.userCont = res.data
					this.code = res.data.invite_code
					this.qrUrl = this.$baseUrl + 'pages/mine/new/new-register?invite_code=' + res.data
						.invite_code // ���ɶ�ά�������
					this.createQrcode()
				}
			})

			// ��˽Э���
			this.$http.post(this.$apiObj.IndexSetting, {
				fields: 'gift_balance_invitation_event_activity_money_withdraw,activity_user_register_gift_k_coin,gift_balance_invitation_event_start_time,gift_balance_invitation_event_end_time'
			}).then(res => {
				if (res.code == 1) {
					this.price = res.data.gift_balance_invitation_event_activity_money_withdraw
					this.kCoins = res.data.activity_user_register_gift_k_coin
					this.startTime = res.data.gift_balance_invitation_event_start_time
					this.endTime = res.data.gift_balance_invitation_event_end_time
				}
			})
		},
		methods: {
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
			copy(val){
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
	.invite_rule {
		width: 750rpx;
		min-height: 100vh;
		background: url('/static/images/mine/invite_rule_bj.png') no-repeat;
		background-size: 750rpx 100%;
		background-attachment: fixed;
		
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
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			.tit {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
			}
		}

		.info {
			position: relative;
			width: 750rpx;
			height: 800rpx;
			background: url('/static/images/mine/invite_rule_kuan.png') no-repeat;
			background-size: 750rpx 800rpx;

			.info-tit {
				position: absolute;
				top: 40rpx;
				left: 50%;
				transform: translate(-50%, 0);
				width: 280rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				text-align: center;
			}

			.rm_name {
				position: absolute;
				top: 124rpx;
				left: 150rpx;
				background: linear-gradient(90.00deg, rgb(249, 118, 48), rgb(244, 67, 66));
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				background-clip: text;
				text-fill-color: transparent;
				font-family: SF Pro Display;
				font-size: 28rpx;
				font-weight: 700;
			}

			.rm_des {
				position: absolute;
				top: 168rpx;
				left: 150rpx;
				width: 360rpx;
				font-size: 20rpx;
				color: rgb(102, 102, 102);

				text {
					color: rgb(255, 57, 57);
					margin: 0 4rpx;
				}
			}

			.rm_icon {
				position: absolute;
				top: 164rpx;
				right: 140rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;

				text {
					font-size: 20rpx;
					font-weight: 400;
				}
			}

			.info_time {
				position: absolute;
				top: 510rpx;
				left: 50%;
				transform: translate(-50%, 0);
				width: 322rpx;
				font-size: 28rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}

		}

		.rules {
			position: relative;
			width: 670rpx;
			padding: 68rpx 0 18rpx 0;
			background: rgb(255, 247, 218);
			border-radius: 24rpx;
			box-shadow: 0px 8rpx 16rpx 4rpx rgba(79, 73, 255, 0.25);
			margin: -120rpx auto 48rpx auto;

			.tit {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 238rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
				background: url('/static/images/mine/invite_btn.png') no-repeat;
				background-size: 238rpx 70rpx;
			}

			.rules_info {
				width: 100%;
				display: flex;
				align-items: flex-start;
				margin-bottom: 32rpx;

				.info_key {
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 28rpx;
					font-weight: 700;
					color: rgb(255, 255, 255);
					text-align: center;
					background: linear-gradient(135.00deg, rgb(255, 83, 56) 0%, rgb(255, 165, 117) 100%);
					border-radius: 50%;
					margin-left: 32rpx;
				}

				.info_value {
					width: 530rpx;
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					margin-left: 32rpx;
				}
			}

		}

		.link {
			width: 670rpx;
			font-size: 28rpx;
			color: #fff;
			display: flex;
			margin: 0 auto 42rpx auto;

			.link_value {
				width: 446rpx;
				word-break: break-all;
				margin-left: 16rpx;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 8rpx;
				}
			}

			.value {
				margin-left: 16rpx;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 8rpx;
				}
			}
		}

		.code {
			width: 670rpx;
			font-size: 28rpx;
			color: rgb(255, 255, 255);
			margin: 0 auto;

			.ewm {
				width: 200rpx;
				height: 200rpx;
				// background: #fff;
				border-radius: 8rpx;
				margin: 32rpx auto 0 auto;

				image {
					display: block;
					width: 200rpx;
					height: 200rpx;
				}
			}

		}

		.invite_btn {
			width: 360rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 36rpx;
			font-weight: 700;
			color: rgb(27, 161, 255);
			text-align: center;
			background: #fff;
			border-radius: 80rpx;
			margin: 48rpx auto 0 auto;
		}

		.commission-canvas {
			position: fixed;
			top: -1000000rpx;
		}

	}
</style>