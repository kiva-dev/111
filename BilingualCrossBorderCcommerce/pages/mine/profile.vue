<template>
	<view class="person-page">
		<uni-header :title="$t('top.userCont')"></uni-header>
		<view class="person-box">
			<view class="person-auth">
				<view class="person-auth-box" @click="upLoadLunimg">
					<image :src="userCont.avatar || require('@/static/images/mine/auth_logo.png')" mode="aspectFill">
					</image>
					<image class="box-icon" v-if="!userCont.audit_avatar || userCont.audit_avatar == ''"
						src="@/static/images/mine/profile_set_avatar.png" mode="widthFix"></image>
					<view class="box-status" v-if="userCont.audit_avatar">{{$t('profile.review')}}</view>
				</view>
			</view>
			<view class="person-li">
				<text class="label">{{$t('user.mine.neca')}}</text>
				<view class="li-r" @click="navClick('nick')">
					<view class="r-t">
						<p>{{userCont.nickname}}</p>
						<text v-if="userCont.audit_nickname">({{$t('profile.review')}})</text>
					</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			<view class="person-li" @click="navClick('phone')">
				<text class="label">{{$t('user.mine.phone')}}</text>
				<view class="li-r">
					<view class="r-t r-m" v-show="!userCont.mobile">{{$t('user.nick.wbd')}}</view>
					<view class="r-t r-m" v-show="userCont.mobile">{{$t('new.ybd')}}</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			<view class="person-li">
				<text class="label">{{$t('user.mine.email')}}</text>
				<view class="li-r">
					<view class="r-t">{{userCont.email}}</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			<view class="person-li" @click="navClick('attestation')">
				<text class="label">{{$t('user.mine.grrz')}}</text>
				<view class="li-r">
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			<view class="person-li" @click="navClick('grade')">
				<text class="label">{{$t('user.mine.yhdj')}}</text>
				<view class="li-r">
					<view class="box-name-level" v-if="userCont.level > 0">
						<view class="level-icon">
							<image src="@/static/images/mine/mine_icon_vip.webp" mode="widthFix"></image>
						</view>
						<view class="level-num">Lv.{{userCont.level}}</view>
					</view>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
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
				userCont: '',
				mobile: ''
			}
		},
		onShow() {
			this.getUserCont();
		},
		methods: {
			navClick(url) {
				if (url === 'nick') {
					if (this.userCont.audit_nickname) {
						uni.showToast({
							title: this.$t('profile.nickName'),
							icon: 'none',
						});
						return;
					}
				}
				uni.navigateTo({
					url
				});
			},
			getUserCont() {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.userCont = res.data;
						this.mobile = res.data.mobile.substring(0, 3) + '****' + res.data.mobile.slice(-4);
						uni.setStorageSync('userCont', res.data);
					}
				})
			},
			upLoadLunimg() {
				if (this.userCont.audit_avatar) {
					uni.showToast({
						title: this.$t('profile.avatar'),
						icon: 'none',
					});
				} else {
					uni.chooseImage({
						count: 1,
						sourceType: ['album'],
						crop: {
							quality: 100,
							saveToAlbum: false,
							width: 200,
							height: 200
						},
						success: (res) => {
							if (res.tempFilePaths[0]) {
								let tempFile = res.tempFilePaths[0];
								uni.uploadFile({
									url: this.$url + this.$apiObj.CommonUpload,
									filePath: tempFile,
									name: 'file',
									formData: {
										'token': uni.getStorageSync('token'),
									},
									success: (uploadFileRes) => {
										let res = JSON.parse(uploadFileRes.data);
										if (res.code == 200) {
											let imgs = res.data;
											this.$http.post(this.$apiObj.MineChangeAvatar, {
												avatar: imgs.url,
											}).then(e => {
												if (e.code == 1) {
													this.getUserCont();
												}
											});
										}
									}
								});
							}
						}
					});
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.person-page {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.person-box {
			padding: 0rpx 30rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.person-auth {
				width: 100%;
				padding-top: 25rpx;
				margin-bottom: 10rpx;
				position: relative;

				.person-auth-box {
					width: 200rpx;
					height: 200rpx;
					margin: 0 auto 25rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}

					.box-icon {
						width: 60rpx;
						position: absolute;
						bottom: 0;
						right: 0;
					}

					.box-status {
						padding: 6rpx 12rpx;
						box-sizing: border-box;
						background: rgba(0, 0, 0, 0.8);
						border-radius: 100rpx;
						color: rgb(255, 255, 255);
						font-size: 20rpx;
						text-align: center;
						white-space: nowrap;
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
					}
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
						position: relative;
						width: 500rpx;
						font-size: 28rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						
						p{
							max-width: 280rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						text {
							max-width: 240rpx;
							color: #FF3939;
							white-space: nowrap;
						}
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

	.btm {
		position: fixed;
		bottom: 68rpx;
		left: 32rpx;
		width: 686rpx;
		height: 246rpx;
		padding-top: 30rpx;
		background: url('/static/images/auth/jf-k.png') no-repeat;
		background-size: 686rpx 276rpx;

		.btm-head {
			width: 626rpx;
			font-size: 32rpx;
			color: rgb(255, 255, 255);
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 auto;
		}

		.btm-txt {
			width: 100%;
			font-size: 72rpx;
			font-weight: bold;
			color: rgb(255, 255, 255);
			text-align: center;
			margin-top: 60rpx;
		}
	}
</style>