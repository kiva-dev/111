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
						{{$t('new.gz3')}}
					</view>
				</view>
				<view class="commission-rule-des-info">
					<view class="commission-rule-des-info-num">4</view>
					<view class="commission-rule-des-info-txt">
						{{$t('new.gz4')}}
					</view>
				</view>
			</view>
		</view>

		<view class="commission-rule-yqm">
			<view>{{$t('new.ndyqm')}}：</view>
			<span>{{code}}</span>
			<image src="/static/images/new/copy-black.png" @click="copy(code)"></image>
		</view>

		<!-- -->
		<view class="commission-ewm">
			<image :src="qrcodeImg"></image> 
		</view>

		<view class="commission-btn" @click="showyq=true">{{$t('new.ljyq')}}</view>

		<u-popup :show="showyq" mode="center" @close="showyq=false" bgColor="transparent">
			<view>
				<view class="showyq">
					<view class="showyq-ewm">
						<image :src="qrcodeImg"></image>
					</view>
					
					<image src="/static/images/products/auth.png" class="showyq-auth"></image>
					<view class="showyq-hy">{{$t('new.ndhy')}}XXX</view>
					<view class="showyq-yq">{{$t('new.hnyql')}}</view>
				</view>
				<view class="showyq-btn">
					<image src="/static/images/new/save-img.png"></image>
					<view>{{$t('new.bctp')}}</view>
				</view>
			</view>

		</u-popup>
		
		<view class="commission-canvas">
			<canvas class="f__canvas" style="width:300px;height:300px;" canvas-id="qrcode" id="qrcode" ></canvas>
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
				code:'',
				qrUrl:'',
				qrcodeImg:'',
				lange:''
			}
		},
		onLoad() {
			this.lange=uni.getStorageSync('locale')
		},
		onShow() {
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					// uni.setStorageSync('userCont', res.data)
					// this.invite_code = res.data.invite_code
					// this.userCont=res.data
					this.code=res.data.invite_code
					this.qrUrl = 'https://h5.kolibrimall.com/h5/#/?invite_code=' + res.data.invite_code // 生成二维码的链接
					// this.qrUrl = 'http://localhost:8081/h5/#/?invite_code=' + res.data.invite_code// 生成二维码的链接
					this.createQrcode()
				}
			})
		},
		methods: {
			copy(val){
				uni.setClipboardData({
					data:val,
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
				qrcodeCanvas('qrcode', that.qrUrl, 600, 600);
				const ctx = uni.createCanvasContext('qrcode');
				ctx.draw(true, function() {
					uni.canvasToTempFilePath({
						width: 600,
						height: 600,
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
		align-items: center;
		justify-content: center;

		span {
			display: block;
			color: rgb(255, 78, 47);
			margin: 0 20rpx;
		}

		image {
			width: 40rpx;
			height: 40rpx;
		}

	}

	.commission-ewm {
		display: block;
		width: 280rpx;
		height: 280rpx;
		background: #fff;
		margin: 30rpx auto;
		
		image{
			width: 280rpx;
			height: 280rpx;
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
		width: 460rpx;
		height: 796rpx;
		background: url('/static/images/new/yjyq.png') no-repeat;
		background-size: 460rpx 796rpx;
		margin-top: 100rpx;

		.showyq-ewm {
			position: absolute;
			top: 406rpx;
			left: 152rpx;
			width: 154rpx;
			height: 154rpx;
			background: #fff;
			
			image{
				width: 160rpx;
				height: 160rpx;
			}
		}

		.showyq-auth {
			position: absolute;
			top: 570rpx;
			left: 190rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}

		.showyq-hy {
			position: absolute;
			bottom: 106rpx;
			width: 100%;
			font-size: 20rpx;
			color: rgb(255, 255, 255);
			text-align: center;
		}

		.showyq-yq {
			position: absolute;
			bottom: 48rpx;
			width: 100%;
			font-size: 24rpx;
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
		margin:20rpx auto 0 auto;
		
		image {
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin: 0 20rpx 0 30rpx;
		}
	}
	
	.commission-canvas{
		position: fixed;top: -1000000;
	}
	
</style>