<template>
	<view class="yqlist-page">
		<view class="yqlist-content">
			<view class="yqlist-head" :style="{'borderBottom': level > 1 ? '1rpx solid rgb(204, 204, 204)' : 'none'}">
				<image src="@/static/images/mine/collect_icon_back.png" @click="onBack"></image>
				<view>{{$t('new.wdyq')}}</view>
			</view>
			<template v-if="level === 1 && memberArr.length > 0">
				<view class="yqlist-container">
					<view class="container-box">
						<view class="cb-left">
							<span>{{$t('new.total')}}</span>
							<span>9</span>
						</view>
						<view class="cb-right" @click="capture()">{{$t('new.ljyq')}}</view>
					</view>
				</view>
				<view class="yqlist-title">{{$t('new.my')}}{{level || 1}}{{$t('new.members')}}
					({{memberArr.length || 0}}{{$t('new.people')}})</view>
			</template>
			<template v-if="level > 1 && memberArr.length > 0">
				<view class="yqlist-illustrate">
					<view class="yl-avatar">
						<image :src="memberInfo.avatar" mode="aspectFill"></image>
					</view>
					<view class="yl-text">
						<p class="yl-text-name">{{memberInfo.nickname || ''}}</p>
						<p class="yl-text-info">{{$t('new.multistage')}}{{level || 1}}{{$t('new.members')}}</p>
					</view>
				</view>
			</template>
			<view class="yqlist-layout">
				<template v-if="memberArr && memberArr.length > 0">
					<view class="yl-item" v-for="(item,index) in memberArr" :key="index"
						@click="onViewInvitation(item)">
						<view class="yl-item-box">
							<view class="yl-item-avatar">
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="yl-item-info">
								<view class="info-name">{{item.nickname}}</view>
								<view class="info-people">
									{{$t('new.Invitations')}}：({{item.invite_count}})
								</view>
								<view class="info-amount">
									<span>{{$t('new.rebate')}}：</span>
									<span>RM</span>
									<span>{{item.rebate_money}}</span>
								</view>
							</view>
						</view>
						<view class="yl-item-right">
							<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
						</view>
					</view>
					<view style="padding-top: 1px;">
						<u-loadmore :status="status" />
					</view>
				</template>
				<template v-else>
					<view class="yl-empty">
						<image src="@/static/images/new/member_null.png" mode="widthFix"></image>
						<p class="yl-empty-null">{{$t('new.noMoment')}}</p>
						<p class="yl-empty-text">{{$t('new.ljyqhy')}}</p>
						<view class="yl-empty-btn" @click="capture()">{{$t('new.ljyq')}}</view>
					</view>
				</template>
			</view>
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
		</view>
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
	import tool from '@/utils/tool.js';
	export default {
		data() {
			return {
				level: 1,
				status: 'loadmore',
				page: 1,
				cuid: 0,
				memberArr: [],
				memberInfo: {},
				showyq: false,
				code: '',
				qrUrl: '',
				qrcodeImg: '',
				lange: '',
				userCont: {},
				isShopCont: false, // 中文还是英文
			}
		},
		onLoad(option) {
			this.lange = uni.getStorageSync('locale');
			this.level = parseInt(option.level) || 1;
			this.cuid = parseInt(option.cuid) || 0;
			this.memberInfo = option.info ? JSON.parse(decodeURIComponent(option.info)) : {};
			this.getInvitationList();
			uni.$on('refreshData', () => {
				this.level = parseInt(option.level) || 1;
			})
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
		onReachBottom() {
			this.page++;
			this.getInvitationList();
		},
		methods: {
			onBack() {
				uni.$emit('refreshData');
				uni.navigateBack();
			},
			getInvitationList() {
				this.status = 'loading';
				let req = {
					token: uni.getStorageSync('token'),
					page: this.page,
					pagenum: 10,
				}
				if (this.cuid !== 0) {
					req.cuid = this.cuid;
				}
				this.$http.post(this.$apiObj.InvitationList, req).then(res => {
					if (res.code === 1) {
						let arr = res.data.data || [];
						this.memberArr = this.memberArr.concat(arr);
						arr.length < 10 ? this.status = 'nomore' : this.status = 'loadmore';
					}
				})
			},
			onViewInvitation(item) {
				this.level++;
				let info = encodeURIComponent(JSON.stringify(item));
				uni.navigateTo({
					url: '/pages/mine/new/yqlist?level=' + this.level + '&cuid=' + item.id + '&info=' + info
				})
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
	.yqlist-page {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: rgb(248, 248, 248);

		.yqlist-content {
			width: 100%;

			.yqlist-head {
				position: relative;
				width: 100%;
				height: 88rpx;
				background: rgb(255, 255, 255);
				padding-top: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					position: absolute;
					left: 20rpx;
					width: 40rpx;
					height: 40rpx;
				}

				view {
					font-size: 40rpx;
					color: rgb(51, 51, 51);
				}
			}

			.yqlist-container {
				width: 100%;
				margin-top: 20rpx;
				padding: 0 32rpx;
				box-sizing: border-box;

				.container-box {
					width: 100%;
					background: #FFFFFF;
					border-radius: 50rpx;
					padding: 8rpx;
					box-sizing: border-box;
					border: 1rpx solid rgb(10, 198, 142);
					display: flex;
					justify-content: space-between;

					.cb-left {
						padding-left: 40rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: flex-start;
						align-items: center;

						span {
							color: rgb(51, 51, 51);
							font-size: 28rpx;
							font-weight: 700;

							&:last-child {
								color: rgb(10, 198, 142);
								margin-left: 15rpx;
								font-size: 40rpx;
							}
						}
					}

					.cb-right {
						width: 200rpx;
						height: 80rpx;
						background: rgb(10, 198, 142);
						border-radius: 40rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: rgb(255, 255, 255);
						text-align: center;
					}
				}
			}

			.yqlist-title {
				margin-top: 40rpx;
				padding: 0 60rpx;
				box-sizing: border-box;
				color: rgb(44, 44, 44);
				font-size: 28rpx;
				font-weight: 400;
			}

			.yqlist-illustrate {
				width: 100%;
				background: #FFFFFF;
				padding: 22rpx 80rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				.yl-avatar {
					width: 88rpx;
					height: 88rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.yl-text {
					flex: 1;
					margin-left: 24rpx;
					
					.yl-text-name {
						margin: 10rpx 0;
						color: rgb(51, 51, 51);
						font-size: 28rpx;
						font-weight: bold;
					}
					
					.yl-text-info {
						margin: 10rpx 0;
						color: rgb(102, 102, 102);
						font-size: 24rpx;
						font-weight: 400;
					}
				}
			}

			.yqlist-layout {
				margin-top: 30rpx;
				padding: 0 32rpx 30rpx;
				box-sizing: border-box;

				.yl-item {
					width: 100%;
					margin-bottom: 30rpx;
					background: rgb(255, 255, 255);
					box-shadow: 0rpx 0rpx 8rpx rgba(190, 190, 190, 0.3);
					border-radius: 8px;
					padding: 24rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.yl-item-box {
						display: flex;
						align-items: center;
						
						.yl-item-avatar {
							width: 132rpx;
							height: 132rpx;
						
							image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
								box-shadow: 0rpx 2rpx 4rpx rgba(190, 190, 190, 0.3);
							}
						}
						
						.yl-item-info {
							flex: 1;
							margin-left: 24rpx;
						
							.info-name {
								font-size: 28rpx;
								color: rgb(51, 51, 51);
								font-size: 14px;
								font-weight: bold;
							}
						
							.info-amount {
								
								span {
									color: rgb(44, 44, 44);
									font-size: 24rpx;
									font-weight: 400;
									
									&:nth-child(2) {
										color: #FF3939;
										font-weight: bold;
									}
									
									&:last-child {
										font-size: 32rpx;
										color: #FF3939;
										font-weight: bold;
									}
								}
							}
						
							.info-people {
								margin: 16rpx 0;
								color: rgb(44, 44, 44);
								font-size: 24rpx;
								font-weight: 400;
							}
						}
					}
					
					.yl-item-right {
						width: 32rpx;
						height: 32rpx;
						
						image {
							width: 100%;
						}
					}
				}

				.yl-empty {
					width: 100%;
					margin-top: 300rpx;
					text-align: center;

					image {
						width: 256rpx;
					}

					.yl-empty-null {
						margin: 20rpx 0 40rpx;
						color: rgb(190, 190, 190);
						font-size: 24rpx;
						font-weight: 400;
					}

					.yl-empty-text {
						color: rgb(102, 102, 102);
						font-size: 40rpx;
						font-weight: 400;
					}

					.yl-empty-btn {
						width: 400rpx;
						height: 80rpx;
						margin: 60rpx auto 0;
						background: rgb(10, 198, 142);
						border-radius: 40rpx;
						color: rgb(255, 255, 255);
						font-size: 40rpx;
						font-weight: 400;
						text-align: center;
						line-height: 80rpx;
					}
				}
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
	}

	.commission-canvas {
		position: fixed;
		top: -1000000rpx;
	}
</style>