<template>
	<view class="yqlist">
		<view class="yqlist-head">
			<image src="/static/images/new/left.png" @click="toBack()"></image>
			<view>{{$t('new.wdyq')}}</view>
		</view>

		<view class="yqlist-info">
			<view class="yqlist-info-head">
				<view>{{$t('new.yqrs')}}：<span style="font-weight: bold;">5</span></view>
				<view>{{$t('new.tdfy')}}</view>
			</view>

			<view class="yqlist-item" v-for="(item,i) in [1,1,1,1]">
				<view class="yqlist-item-left">
					<image src="/static/images/products/auth.png"></image>
					<view>Carlos Mobley</view>
				</view>
				<view class="yqlist-item-right">4.50RM</view>
			</view>
		</view>

		<view class="yqlist-btn" @click="capture()">{{$t('new.ljyq')}}</view>

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
			}
		},
		onLoad() {
			this.lange = uni.getStorageSync('locale')
		},
		onShow() {
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
		methods: {
			toBack() {
				uni.navigateBack()
			},
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
	.yqlist {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: rgb(248, 248, 248);

		.yqlist-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #fff;

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
				font-weight: bold;
				color: rgb(255, 78, 47);
				text-align: center;
			}

		}

		.yqlist-info {
			width: 710rpx;
			padding: 20rpx 0 40rpx 0;
			background: rgb(255, 255, 255);
			border-radius: 16rpx;
			margin: 50rpx auto 0 auto;

			.yqlist-info-head {
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 40rpx;

				view {
					width: 50%;
					font-size: 28rpx;
					color: rgb(255, 78, 47);
					text-align: center;
				}
			}

			.yqlist-item {
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.yqlist-item-left {
					width: 50%;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}

					view {
						font-size: 24rpx;
						color: rgb(44, 44, 44);
						margin-left: 20rpx;
					}
				}

				.yqlist-item-right {
					width: 50%;
					font-size: 32rpx;
					color: rgb(44, 44, 44);
					text-align: center;
				}

			}

		}

		.yqlist-btn {
			width: 398rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 40rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(255, 78, 47);
			border-radius: 40rpx;
			margin: 100rpx auto 0 auto;
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
		
	}
	
	.commission-canvas {
		position: fixed;
		top: -1000000rpx;
	}
</style>