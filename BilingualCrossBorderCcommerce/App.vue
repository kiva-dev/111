<script>
	//引入融云SDK
	const RongIMLib = require('./common/libs/RongIMLib-3.0.7.1-dev.js')
	// const RongIMLib = require('./common/libs/RongEmoji-2.2.9.js')
	let im = RongIMLib.init({
		appkey: 'kj7swf8okxfe2',
		debug: true
	}); // 建议全局只初始化一次     //不要忘记接开获取头像失败时候闸阀
	export default {
		onLaunch: function() {
			if (!uni.getStorageSync('UNI_LOCALE')) {
				uni.setStorageSync('UNI_LOCALE', 'en')
				uni.setStorageSync('locale', 'en')
			}
			if (!uni.getStorageSync('phoneCont')) {
				console.log('App Launch')
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t('index.language-change-confirm'),
						success: (res) => {
							if (res.confirm) {
								uni.setLocale('en');
							}
						}
					})
				} else {
					uni.setLocale('en');
					this.$i18n.locale = 'en';
				}
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";

	/deep/uni-tabbar,
	uni-tabbar .uni-tabbar {
		box-shadow: 0px -2px 7px rgba(255, 198, 188, 0.3) !important;
	}

	/*每个页面公共css */
	* {
		padding: 0;
		margin: 0;
	}

	body {
		font-family: "SourceHanSansCN-Regular", "microsoft yahei";
		font-size: 24rpx;
		color: #000;
	}

	/* 	page{background:#F5F5F5;} */
	button {
		background: none;
		padding: 0;
	}

	.img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.color-999 {
		color: #999;
	}

	.color-6 {
		color: #666;
	}

	.flex {
		display: flex;
	}

	.flex-end {
		justify-content: flex-end;
	}

	.flex-between {
		justify-content: space-between;
	}

	.flex-center {
		align-items: center;
		display: flex;
	}

	button::after {
		display: none;
	}

	.color-fff {
		color: #fff;
	}

	.color-orange {
		color: #f79a33;
	}

	.color-yellow {
		color: #ffb42b;
	}

	.color-blue {
		color: #027aff;
	}

	.color-red {
		color: #fc0609;
	}

	.color-purse {
		color: #5a56ff;
	}

	.m-r50 {
		margin-right: 50rpx;
	}

	.f-22 {
		font-size: 22rpx;
	}

	.f-24 {
		font-size: 24rpx;
	}

	.f-26 {
		font-size: 26rpx;
	}

	.f-28 {
		font-size: 28rpx;
	}

	.f-30 {
		font-size: 30rpx;
	}

	.f-32 {
		font-size: 32rpx;
	}

	.f-34 {
		font-size: 34rpx;
	}

	.f-36 {
		font-size: 36rpx;
	}

	.f-46 {
		font-size: 46rpx;
	}

	.f-48 {
		font-size: 48rpx;
	}

	.f-68 {
		font-size: 68rpx;
	}

	.f-bold {
		font-weight: 600;
	}

	.m-l-40 {
		margin-left: 40rpx;
	}

	.m-l-15 {
		margin-left: 15rpx;
	}

	.public-btn {
		height: 90rpx;
		background: #fc0609;
		border-radius: 45rpx;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 90rpx;
	}

	.more-icon {
		width: 22rpx;
		height: 22rpx;
		margin-left: 10rpx;
		min-width: 22rpx;
		width: 22rpx;
	}

	.public-bottom-pop {
		background: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 30rpx;
		position: relative;

		.bottom-tit {
			font-size: 30rpx;
			text-align: center;
			font-weight: 600;
		}

		.bottom-pop-close {
			width: 26rpx;
			height: 26rpx;
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}
	}

	.public-pop-center {
		width: 640rpx;
		border-radius: 20rpx;
		background: #fff;

		.center-hd {
			padding: 60rpx 30rpx;
			text-align: center;

			.hd-t {
				font-size: 32rpx;
			}

			.hd-c {
				font-size: 26rpx;
				color: #999;
				margin: 20rpx 0 0 0;
			}
		}

		.center-bd {
			border-top: 1px solid #e9e9e9;
			display: flex;
			position: relative;

			.center-btn {
				font-size: 30rpx;
				background: none;
				padding: 0;
				margin: 0;
				height: 115rpx;
				flex: 1;
				text-align: center;
				line-height: 115rpx;
			}
		}

		.center-bd:before {
			position: absolute;
			left: 50%;
			top: 0;
			height: 100%;
			width: 1px;
			background: #e9e9e9;
			content: "";
		}
	}

	.public-bottom-pop {
		background: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 30rpx;
		position: relative;

		.bottom-tit {
			font-size: 30rpx;
			text-align: center;
			font-weight: 600;
		}

		.bottom-pop-close {
			width: 24rpx;
			height: 24rpx;
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}

		.bottom-box {
			margin: 30rpx;
		}
	}

	uni-tabbar.uni-tabbar-bottom .uni-tabbar {
		box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
	}

	uni-tabbar.uni-tabbar__item:nth-last-child(3) .uni-tabbar__icon {
		width: 68rpx !important;
		height: 68rpx !important;
	}

	.public-pop {
		width: 556rpx;
		background: #ffffff;
		border-radius: 30rpx;

		.pop-con {
			padding: 40rpx 45rpx;

			.pop-t {
				font-size: 30rpx;
				text-align: center;
				font-weight: 550;
				position: relative;
			}

			.pop-c {
				padding: 60rpx 0;
				text-align: center;
				font-size: 26rpx;
			}

			.pop-b {
				display: flex;
				justify-content: space-between;

				.pop-btn {
					width: 200rpx;
					height: 80rpx;
					background: #dddddd;
					border-radius: 40rpx;
					margin: 0;
					line-height: 80rpx;
					font-size: 26rpx;
				}

				.pop-btn.red {
					background: #fc0609;
					color: #fff;
				}
			}
		}
	}

	.bar-bg {
		position: fixed;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 88rpx;
		background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
	}

	//店铺底部分类
	.shop-menu {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #fff;
		box-shadow: 0px 0px 20px 0px rgba(153, 153, 153, 0.1);
		z-index: 999;

		.menu-con {
			padding: 20rpx 30rpx;
			display: flex;
			text-align: center;
			justify-content: space-between;

			.menu-li {
				width: 25%;

				.icon {
					width: 44rpx;
					height: 44rpx;
					margin: 0 auto;
				}

				.default {}

				.selected {
					display: none;
				}

				.t {
					font-size: 24rpx;
					color: #666;
				}
			}

			.active {
				.default {
					display: none;
				}

				.selected {
					display: block;
				}

				.t {
					color: #fc0609;
				}
			}
		}
	}

	.zanwusju {
		padding-top: 200rpx;
		text-align: center;

		image {
			width: 267rpx;
			height: 222rpx;
		}

		.title {
			margin-top: 40rpx;
			font-size: 32rpx;
			color: #666;
		}
	}

	/* 1行 */
	.oneblock {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 2行 */
	.twoblock {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.email-cont {
		width: 600rpx;
		background: #fff;
		position: relative;
		padding: 30rpx 0;

		.query {
			width: 20rpx;
			height: 20rpx;
			border-radius: 30rpx;
			border: 1rpx solid #000;
			position: absolute;
			top: 10rpx;
			right: 30rpx;
			padding: 10rpx;
		}

		.title {
			text-align: center;
			font-size: 36rpx;
			color: #000;
			font-weight: bold;
		}

		.cont {
			padding-left: 100rpx;

			.list {
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				font-weight: bold;

				.invite-tobu {
					width: 44rpx;
					height: 44rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>