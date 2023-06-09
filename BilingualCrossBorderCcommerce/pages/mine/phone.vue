<template>
	<view class="phone-page">
		<view class="phone-box">
			<view class="li">
				<view class="li-left" @click="navClick">
					<view class="code">{{mobile_area_code}}</view>
					<view class="down-icon">
						<image class="img" src="../../static/images/mine/down1.png"></image>
					</view>
				</view>
				<view class="li-right">
					<input class="input" v-model="mobile" placeholder-class="color-999"
						:placeholder="$t('user.phone.newphone')" />
				</view>
			</view>
			<view class="li">
				<view class="li-left">{{$t('user.phone.yzm')}}</view>
				<view class="li-right">
					<input class="input" v-model="code" placeholder-class="color-999"
						:placeholder="$t('user.phone.qsryzm')" />
				</view>
				<button class="ver-btn" v-if="codeTxt1==$t('user.phone.hqyzm')"
					@click.stop="$noMultipleClicks(onLoginSendMobileCode)">{{$t('user.phone.fsyzm')}}</button>
				<button class="ver-btn" v-else>{{codeTxt1}}</button>
			</view>
		</view>
		<view class="phone-bot">
			<button class="public-btn" style="background: rgb(255, 78, 47);"
				@click="onMineChangeMobile">{{$t('user.phone.qrxg')}}</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				mobile: '', // 手机号码
				code: '', // 验证码
				mobile_area_code: '', // 手机号国家区域码
				seconds: 60,
				codeTxt1: this.$t('user.phone.hqyzm')
			}
		},
		onShow() {
			if (uni.getStorageSync('phoneCont')) {
				this.mobile_area_code = JSON.parse(uni.getStorageSync('phoneCont')).code
			} else {
				this.mobile_area_code = '+60'
				let title = {
					city: this.$t('phone.mlxy'),
					code: "+60",
					"sou": "M"
				}
				uni.setStorageSync('phoneCont', JSON.stringify(title))
			}
		},
		methods: {
			navClick(url) {
				uni.navigateTo({
					url: '../public/ownership'
				})
			},
			// 获取验证码
			onLoginSendMobileCode() {
				if (!this.mobile) return uni.showToast({
					title: this.$t('user.phone.qsrphone'),
					icon: 'none'
				})
				if (this.mobile_area_code == 86) {
					if (this.mobile) {
						var reg_tel =
							/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
						if (!reg_tel.test(this.mobile)) return uni.showToast({
							title: this.$t('user.phone.qsrzqsjh'),
							icon: 'none'
						})
					}
				}
				this.$http.post(this.$apiObj.LoginSendMobileCode, {
					mobile: this.mobile,
					mobile_area_code: this.mobile_area_code.slice(1)
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: this.$t('user.phone.fscg'),
							icon: 'none'
						})
						this.timeDowns()
					}
				})
			},
			timeDowns() {
				this.results = setInterval(() => {
					--this.seconds
					this.codeTxt1 = this.seconds + 'S'
					if (this.seconds < 0) {
						clearInterval(this.results)
						this.seconds = 60
						this.codeTxt1 = this.$t('user.phone.fscg')
					}
				}, 1000)
			},
			// 修改
			onMineChangeMobile() {
				if (!this.mobile) return uni.showToast({
					title: this.$t('user.phone.qsrphone'),
					icon: 'none'
				})
				if (!this.code) return uni.showToast({
					title: this.$t('user.phone.qsryzm'),
					icon: 'none'
				})
				if (this.mobile_area_code == 86) {
					if (this.mobile) {
						var reg_tel =
							/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
						if (!reg_tel.test(this.mobile)) return uni.showToast({
							title: this.$t('user.phone.qsrzqsjh'),
							icon: 'none'
						})
					}
				}
				this.$http.post(this.$apiObj.MineChangeMobile, {
					code: this.code, // 手机号验证码
					mobile: this.mobile, // 手机号码
					mobile_area_code: this.mobile_area_code.slice(1), // 手机号区域码 
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.phone.xgcg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #f9f9f9;
	}

	.phone-page {
		.phone-box {
			background: #fff;
			padding: 0 30rpx;

			.li {
				padding: 30rpx 0;
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				align-items: center;
				position: relative;

				.ver-btn {
					position: absolute;
					right: 30rpx;
					top: 50%;
					margin-top: -20rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					color: rgb(255, 78, 47);
					padding: 0;
					width: 100rpx;
				}

				.li-right {
					flex: 1;
				}

				.input {
					height: 50rpx;
					width: 100%;
					font-size: 26rpx;
				}

				.down-icon {
					width: 10rpx;
					height: 7rpx;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -3.5rpx;
				}

				.li-left {
					position: relative;
					width: 135rpx;
					display: flex;
					justify-content: flex-end;
					margin-right: 24rpx;

					.code {
						margin-right: 30rpx;
					}
				}
			}
		}

		.phone-bot {
			margin: 50rpx 30rpx;
		}
	}

	/deep/ .uni-select {
		border: none;
		font-size: 28rpx;
		padding-right: 30rpx;
		text-align: right;
	}
</style>