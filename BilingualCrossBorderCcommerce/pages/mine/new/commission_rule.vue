<template>
	<view class="commission-rule">
		<view class="commission-rule-head">
			<view class="commission-rule-head-info">
				<image src="/static/images/new/left.png" @click="toBack()"></image>
				<view>{{$t('new.yqfy')}}</view>
			</view>
		</view>

		<view class="commission-rule-des" :style="lange=='en'?'height:640rpx;':''">
			<view class="commission-rule-des-tit" :style="lange=='en'?'top:50rpx;':''">{{$t('new.fysm')}}</view>
			<view class="commission-rule-des-info-list">
				<view class="commission-rule-des-info">
					<view class="commission-rule-des-info-num">1</view>
					<view class="commission-rule-des-info-txt">
						{{$t('new.gz1')}}
					</view>
				</view>
				<view class="commission-rule-des-info">
					<view class="commission-rule-des-info-num">2</view>
					<view class="commission-rule-des-info-txt">
						{{$t('new.gz2')}}
					</view>
				</view>
				<view class="commission-rule-des-info">
					<view class="commission-rule-des-info-num">3</view>
					<view class="commission-rule-des-info-txt">
						{{$t('new.gz31')}} {{info.were_invite_user_consume_rebate_rate*1}}% {{$t('new.gz32')}}
					</view>
				</view>
				<view class="commission-rule-des-info">
					<view class="commission-rule-des-info-num">4</view>
					<view class="commission-rule-des-info-txt">
						{{$t('new.gz41')}} RM{{info.user_consume_rebate_start_money*1}} {{$t('new.gz42')}} {{info.user_consume_rebate_rate*1}}% {{$t('new.gz43')}}
					</view>
				</view>
			</view>
		</view>

		<view class="commission-rule-yqm">
			<view style="max-width: 160rpx;">{{$t('new.yqlj')}}：</view>
			<span style="font-size: 24rpx;">{{qrUrl}}</span>
			<image src="/static/images/new/copy-black.png" @click="copy(qrUrl)"></image>
		</view>

		<view class="commission-rule-yqm">
			<view>{{$t('new.ndyqm')}}：</view>
			<span>{{code}}</span>
			<image src="/static/images/new/copy-black.png" @click="copy(code)"></image>
		</view>

		<!-- -->
		<view class="commission-rule-ewm">
			<view class="commission-rule-ewm-tit">{{$t('new.yqewm')}}：</view>
			<view class="commission-ewm">
				<image :src="qrcodeImg" class="commission-ewm-img"></image>
			</view>
		</view>

		<view class="commission-btn" @click="capture()">{{$t('new.ljyq')}}</view>

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
				isShopCont: false, // 中文还是英文
				info:{}
			}
		},
		onLoad() {
			this.lange = uni.getStorageSync('locale')
			this.$http.post(this.$apiObj.IndexSetting,{
				fields:'were_invite_user_consume_rebate_rate,user_consume_rebate_start_money,user_consume_rebate_rate'
			}).then(res=>{
				this.info=res.data
			})
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					// uni.setStorageSync('userCont', res.data)
					// this.invite_code = res.data.invite_code
					this.userCont = res.data
					this.code = res.data.invite_code
					this.qrUrl = this.$baseUrl + 'pages/mine/new/new-register?invite_code=' + res.data
						.invite_code // 生成二维码的链接
					// this.qrUrl = 'http://localhost:8081/h5/#/?invite_code=' + res.data.invite_code// 生成二维码的链接
					this.createQrcode()
				}
			})
		},
		onShow() {
			
		},
		methods: {
			capture() {
				this.showyq = true
				let that = this
				// 获取APP的所有页面列表
				const pages = getCurrentPages();

				// 获取到当前页面
				const page = pages[pages.length - 1];
				try {
					const currentWebview = page.$getAppWebview();
					let bitmap = new plus.nativeObj.Bitmap('amway_img');
					// 将webview内容绘制到Bitmap对象中
					setTimeout(() => {
						currentWebview.draw(bitmap, function() {
							console.log('截屏绘制图片成功');
							let fileName = '_doc/' + new Date().getTime() + '.png'
							bitmap.save(fileName, {}, function(i) {
								// 将图片保存到相册
								uni.saveImageToPhotosAlbum({
									filePath: i.target,
									success: function() {
										bitmap.clear(); //销毁Bitmap图片
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
								console.log('保存图片失败：' + JSON.stringify(e));
							});
						}, function(e) {
							that.showyq = false
							console.log('截屏绘制图片失败：' + JSON.stringify(e));
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


				//currentWebview.append(amway_bit);
			},
			copy(val) {
				uni.setClipboardData({
					data: val,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				})
			},
			toBack() {
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
							// 二维码本地图
							that.qrcodeImg = res.tempFilePath
						}
					}, that)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.commission-rule {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: rgb(255, 231, 221);
	}

	.commission-rule-head {
		width: 100%;
		height: 558rpx;
		padding-top: 102rpx;
		background: url('/static/images/new/yonjinbaoxiang.png') no-repeat;
		background-size: 100% 660rpx;

		.commission-rule-head-info {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;

			image {
				position: absolute;
				left: 20rpx;
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
	}

	.commission-rule-des {
		position: relative;
		width: 686rpx;
		min-height: 490rpx;
		background: url('/static/images/new/rules.png') no-repeat;
		background-size: 100% 100%;
		margin: 20rpx auto 40rpx auto;

		.commission-rule-des-tit {
			position: absolute;
			top: 40rpx;
			width: 100%;
			font-size: 32rpx;
			font-weight: bold;
			color: rgb(255, 255, 255);
			text-align: center;
		}

		.commission-rule-des-info-list {
			position: absolute;
			top: 120rpx;

			.commission-rule-des-info {
				width: 100%;
				display: flex;
				margin-bottom: 30rpx;

				.commission-rule-des-info-num {
					width: 32rpx;
					height: 32rpx;
					line-height: 32rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgb(255, 78, 47);
					border-radius: 50%;
					margin: 0 10rpx 0 40rpx;
				}

				.commission-rule-des-info-txt {
					width: 564rpx;
					line-height: 30rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					word-break: break-all;
				}

			}

		}

	}

	.commission-rule-yqm {
		width: 100%;
		font-size: 32rpx;
		color: rgb(44, 44, 44);
		display: flex;
		margin-bottom: 20rpx;

		view {
			margin-left: 40rpx;
		}

		span {
			display: block;
			max-width: 450rpx;
			color: rgb(255, 78, 47);
			word-break: break-all;
			margin: 0 20rpx;
		}

		image {
			width: 40rpx;
			height: 40rpx;
		}

	}

	.commission-rule-ewm {
		display: flex;
		font-size: 32rpx;
		color: rgb(44, 44, 44);

		.commission-rule-ewm-tit {
			width: 200rpx;
			margin-left: 40rpx;
		}

	}

	.commission-ewm {
		position: relative;
		width: 180rpx;
		height: 180rpx;
		// background: #fff;
		margin: 30rpx 0 30rpx 44rpx;

		.commission-ewm-img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 180rpx;
			height: 180rpx;
		}
	}

	.commission-btn {
		width: 398rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 40rpx;
		color: rgb(255, 255, 255);
		text-align: center;
		background: rgb(255, 78, 47);
		border-radius: 40rpx;
		margin: 0 auto;
	}

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

	.showyq-btn {
		width: 330rpx;
		height: 80rpx;
		font-size: 32rpx;
		color: rgb(255, 255, 255);
		display: flex;
		align-items: center;
		background: rgb(255, 78, 47);
		border-radius: 40rpx;
		margin: 20rpx auto 0 auto;

		image {
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin: 0 20rpx 0 30rpx;
		}
	}

	.commission-canvas {
		position: fixed;
		top: -1000000rpx;
	}
</style>