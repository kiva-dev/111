<template>
	<view class="person-page">
		<!--person-box start-->
		<view class="person-box">
			<!--person-li start-->
			<!-- <view class="person-li">
        <text class="label">{{$t('user.mine.avaitel')}}</text>
        <view class="li-r" @click="upLoadLunimg">
          <view class="r-img">
            <image class="img" v-if="userCont.avatar" :src="userCont.avatar"></image>
            <image class="img" v-else src="/static/userimg.png"></image>
          </view>
          <view class="icon">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view> -->


			<view class="person-auth" @click="upLoadLunimg">
				<image v-if="userCont.avatar" :src="userCont.avatar"></image>
				<image v-else src="../../static/images/mine/auth_logo.png"></image>
				<view>{{$t('user.nick.ghtx')}}</view>
			</view>

			<!--person-li end-->
			<!--person-li start-->
			<view class="person-li">
				<text class="label">{{$t('user.mine.neca')}}</text>
				<view class="li-r" @click="navClick('nick')">
					<view class="r-t">{{userCont.nickname}}</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			<!--person-li end-->
			<!--person-li start-->
			<!-- <view class="person-li">
        <text class="label">{{$t('user.mine.phone')}}</text>
        <view class="li-r" @click="navClick('phone')">
          <view class="r-t">{{mobile}}</view>
          <view class="icon">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view> -->
			<!--person-li end-->

			<view class="person-li" @click="navClick('phone')">
				<text class="label">{{$t('user.mine.phone')}}</text>
				<view class="li-r" >
					<view class="r-t r-m">{{$t('user.nick.wbd')}}</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>

			<!--person-li start-->
			<view class="person-li">
				<text class="label">{{$t('user.mine.email')}}</text>
				<view class="li-r" @click="navClick('email')">
					<view class="r-t">{{userCont.email}}</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			<!--person-li end-->
			<!--person-li start-->
			<view class="person-li" @click="navClick('attestation')">
				<text class="label">{{$t('user.mine.grrz')}}</text>
				<view class="li-r">
					<!-- <view class="r-t r-m">未认证</view> -->
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			<!--person-li end-->
			<!--person-li start-->
			<view class="person-li" @click="navClick('grade')">
				<text class="label">{{$t('user.mine.yhdj')}}</text>
				<view class="li-r">
					<view class="rank">LV{{userCont.level}}</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>


			<!-- <view class="person-li" @click="navClick('../address/address')">
        <text class="label">{{$t('user.mine.shdz')}}</text>
        <view class="li-r">
          <view class="icon">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view> -->
			<!--person-li end-->
		</view>
		<!--person-box end-->
		<!-- 底部弹窗 -->
		<!-- <uni-popup ref="popup" @change="change">
      <view class="popup-content personal-pop" :class="{ 'popup-height': type === 'left' || type === 'right' }">
        <view class="personal-pop-box">
          <button class="pop-box-btn">从手机相机选择</button>
          <button class="pop-box-btn">拍一张</button>
        </view>
        <button class="personal-pop-btn" @click="toggleClose">取消</button>
      </view>
    </uni-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userCont: '', // 个人信息
				mobile: ''
			}
		},
		onShow() {
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					this.userCont = res.data
					this.mobile = res.data.mobile.substring(0, 3) + '****' + res.data.mobile.slice(-4)
					// uni.setStorageSync('userCont', res.data)
				}
			})
		},
		methods: {
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 修改头像
			upLoadLunimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: function(res) {
						let tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach((em, i) => {
							uni.uploadFile({
								url: that.$url + that.$apiObj.CommonUpload,
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'token': uni.getStorageSync('token'),
								},
								success: (uploadFileRes) => {
									console.log('data', JSON.parse(uploadFileRes.data));
									let res = JSON.parse(uploadFileRes.data)
									if (res.code == 200) {
										let imgs = res.data
										that.$http.post(that.$apiObj.MineChangeAvatar, {
											avatar: imgs.url
										}).then(ress => {
											if (ress.code == 1) {
												that.$http.post(that.$apiObj
													.MineInfo).then(resss => {
													if (resss.code == 1) {
														that.userCont =
															resss.data
														uni.setStorageSync(
															'userCont',
															resss.data)
													}
												})
											}
										})
									}
								}
							})
						})
					}
				});
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			toggleClose(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.close(type)
			},
		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #f9f9f9;
	}

	.person-page {
		.person-box {
			padding: 0rpx 30rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.person-auth {
				width: 100%;
				padding-top: 25rpx;
				margin-bottom: 10rpx;

				image {
					display: block;
					width: 200rpx;
					height: 200rpx;
					border-radius: 50%;
					margin: 0rpx auto 25rpx auto;
				}

				view {
					width: 100%;
					font-size: 32rpx;
					font-weight: 400;
					color: #2C2C2C;
					text-align: center;
				}
			}

			.person-li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				line-height: 1;
				padding: 36rpx 0;
				border-bottom: 1px solid #f5f5f5;

				.label {
					font-size: 28rpx;
					color: rgb(44, 44, 44);
				}

				.li-r {
					display: flex;
					align-items: center;

					.icon {
						width: 12rpx;
						height: 21rpx;
						margin-left: 20rpx;
					}

					.r-img {
						width: 72rpx;
						height: 72rpx;
						border-radius: 100%;
						overflow: hidden;
					}

					.r-t {
						font-size: 28rpx;
					}

					.r-m {
						color: #FF4E2F;
					}

				}
			}

			.rank {
				width: 64rpx;
				height: 40rpx;
				background: #000000;
				border-radius: 6rpx;
				padding: 0 10rpx;
				font-size: 24rpx;
				color: #ffc263;
				line-height: 40rpx;
				text-align: center;
			}

			.person-li:nth-last-child(1) {
				border: none;
			}
		}

		.person-bot {
			margin: 100rpx 30rpx;

			.person-btn {
				height: 98rpx;
				background: #f13243;
				border-radius: 49rpx;
				font-size: 30rpx;
				color: #fff;
				text-align: center;
				width: 100%;
				line-height: 98rpx;
				font-weight: 600;
			}
		}
	}

	.personal-pop {
		margin: 20rpx;

		.personal-pop-box {
			background: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 20rpx;

			.pop-box-btn {
				background: #fff;
				height: 100rpx;
				font-size: 32rpx;
				line-height: 100rpx;
				text-align: center;
				border-bottom: 1px solid #ebebeb;
			}

			.pop-box-btn:nth-last-child(1) {
				border: none;
			}
		}

		.personal-pop-btn {
			background: #ffffff;
			border-radius: 16rpx;
			height: 100rpx;
			font-size: 32rpx;
			text-align: center;
			color: #999;
			line-height: 100rpx;
		}
	}
</style>