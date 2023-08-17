<template>
	<view class="version_update">
		<view class="header">
			<image src="/static/images/mine/left.png" @click="toBack()"></image>
			<view>{{$t('user.xitong.Versionupdate')}}</view>
		</view>
		<u-line></u-line>
		<view class="logo-info">
			<image src="/static/images/mine/app-logo.png"></image>
			<view class="name">KOLIBRI</view>
			<view class="version">{{$t('version.current_version')}} V{{$version}}</view>
		</view>

		<view class="version-info">
			<view class="info">
				<view class="info-key">{{$t('version.version_update_time')}}</view>
				<view class="info-value">{{time}}</view>
			</view>

			<u-line style="width: 670rpx;margin: 0 auto;"></u-line>
			<view class="info">
				<view class="info-key">{{$t('version.last_version')}}</view>
				<view class="info-value">V {{version}}</view>
			</view>

			<u-line style="width: 670rpx;margin: 0 auto;"></u-line>
			<view class="des">
				<view class="tit">{{$t('version.des')}}</view>
				<view class="des-info">
					{{isShopCont ? version_desc_en : version_desc}}
				</view>
			</view>
		</view>

		<view class="btns">
			<template v-if="version != $version">
				<a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
					style="text-decoration:none;">
					<view class="android">
						<image src="/static/icon/download-Android.png"></image>
						Android
					</view>
				</a>
			</template>
			<template v-else>
				<view class="android" @click="send()">Android</view>
			</template>

			<view class="ios">
				<image src="/static/images/mine/apple.png"></image>
				<view>IOS<text>({{$t('version.stay_tuned')}})</text></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: '',
				version_desc: '',
				time: '',
				version_desc_en: '',
				isShopCont: uni.getStorageSync('locale') ? true : false
			}
		},
		mounted() {
			this.$http.post(this.$apiObj.IndexSetting, {
				fields: 'version_auction,version_auction_desc,version_auction_date,version_auction_desc_en'
			}).then(res => {
				if (res.code == 1) {
					this.version = res.data.version_auction
					this.version_desc = res.data.version_auction_desc
					this.time = res.data.version_auction_date
					this.version_desc_en = res.data.version_auction_desc_en
				}
			})
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			send() {
				uni.showToast({
					title: this.$t('mine.current_version_tip'),
					icon: 'none',
					duration: 3000
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.version_update {
		width: 750rpx;
		min-height: 100vh;
		padding-bottom: 20rpx;
		background: rgb(248, 248, 248);

		.header {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #fff;

			image {
				position: absolute;
				left: 32rpx;
				display: block;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}
		}

		.logo-info {
			width: 750rpx;
			text-align: center;
			padding: 48rpx 0 32rpx 0;
			background: #fff;

			image {
				width: 200rpx;
				height: 200rpx;
			}

			.name {
				font-size: 48rpx;
				font-weight: bold;
				color: rgb(10, 198, 142);
				margin: 16rpx 0 40rpx 0;
			}

			.version {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
			}

		}

		.version-info {
			width: 750rpx;
			background: #fff;
			padding-bottom: 32rpx;
			margin-top: 20rpx;

			.info {
				position: relative;
				width: 100%;
				height: 112rpx;
				display: flex;
				align-items: center;

				.info-key {
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					margin-left: 40rpx;
				}

				.info-value {
					position: absolute;
					right: 40rpx;
					font-size: 28rpx;
					color: rgb(153, 153, 153);
				}
			}

			.des {
				font-size: 28rpx;
				margin-top: 40rpx;

				.tit {
					color: rgb(51, 51, 51);
					margin-left: 40rpx;
				}

				.des-info {
					width: 670rpx;
					color: rgb(153, 153, 153);
					margin: 32rpx auto 0 auto;
				}

			}

		}

		.btns {
			margin-top: 88rpx;

			.android {
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgb(10, 198, 142);
				border-radius: 88rpx;
				margin: 0 auto;
				
				image{
					width: 48rpx;
					height: 48rpx;
					margin-right: 12rpx;
				}
				
			}

			.ios {
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgb(204, 204, 204);
				border-radius: 88rpx;
				margin: 40rpx auto;

				image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 12rpx;
				}

				text {
					font-size: 24rpx;
					margin-left: 12rpx;
				}

			}

		}

	}
</style>