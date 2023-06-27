<template>
	<view class="phone-page">
		<view class="nick-line"></view>

		<view class="phone-logo">
			<image src="/static/images/new-index/register.png"></image>
			<view>{{$t('top.xgsjh')}}</view>
		</view>

		<view class="phone-box">
			<block v-if="blockNum==1">
				<view class="li">
					<view class="li-left" @click="navClick">
						<view class="code">{{mobile_area_code}}</view>
						<view class="down-icon">
							<image class="img" src="../../static/images/mine/down1.png"></image>
						</view>
					</view>
					<view class="li-right">
						<u--input :placeholder="$t('user.phone.newphone')" v-model="mobile" border="none"
							clearable></u--input>
					</view>
				</view>

				<view class="li-btn" @click.stop="$noMultipleClicks(onLoginSendMobileCode)">{{$t('login.fsyzm')}}</view>
			</block>

			<block v-else-if="blockNum==2">
				<view class="li">
					<view class="li-right" style="width: 90%;margin-left: 5%;">
						<u--input :placeholder="$t('user.phone.qsryzm')" v-model="code" border="none"
							clearable></u--input>
					</view>
				</view>
				<view class="getcode" @click="onLoginSendMobileCode(1)" v-show="seconds<60 && isShopCont">{{$t('new.kcxhq')}} {{codeTxt1}}</view>
				<view class="getcode" @click="onLoginSendMobileCode(1)" v-show="seconds<60 && !isShopCont">{{codeTxt1}} {{$t('new.kcxhq')}}</view>
				<view  class="getcode" @click="onLoginSendMobileCode()" v-show="seconds>=60">{{$t('login.fsyzm')}}</view>
				
				<view class="li-btn" @click="onMineChangeMobile">{{$t('user.address.baocun')}}</view>
			</block>

			<block v-if="blockNum==3">
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
			</block>

		</view>

		<view class="phone-bot" v-show="false">
			<button class="public-btn" style="background: rgb(10, 198, 142);"
				@click="onMineChangeMobile">{{$t('user.phone.qrxg')}}</button>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				blockNum: 1,
				noClick: true, // 防止重复点击 
				mobile: '', // 手机号码
				code: '', // 验证码
				mobile_area_code: '', // 手机号国家区域码
				seconds: 60,
				codeTxt1: this.$t('user.phone.hqyzm'),
				isShopCont:''
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
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
			onLoginSendMobileCode(val) {
				console.log(val)
				if (this.seconds < 60 && val == 1) return
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
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.phone.fscg'),
							icon: 'none'
						})
						this.blockNum = 2
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
		background: rgb(255, 255, 255);
	}

	.phone-page {

		.nick-line {
			width: 100%;
			border-top: 1rpx solid rgb(204, 204, 204);
		}

		.phone-logo {
			width: 100%;
			text-align: center;
			margin-top: 32rpx;

			image {
				width: 280rpx;
				height: 280rpx;
			}

			view {
				width: 100%;
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				text-align: center;
				margin-top: 22rpx;
			}

		}

		.li-btn {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(10, 198, 142);
			border-radius: 88rpx;
			margin: 0 auto;
		}

		.phone-box {
			background: #fff;
			padding: 0 30rpx;

			.getcode {
				width: 96%;
				font-size: 24rpx;
				color: rgb(10, 198, 142);
				text-align: right;
				margin-top: -24rpx;
				margin-bottom: 48rpx;
			}

			.li {
				position: relative;
				width: 686rpx;
				height: 82rpx;
				display: flex;
				align-items: center;
				background: rgb(245, 245, 245);
				border-radius: 8rpx;
				margin: 60rpx 0 48rpx 0;

				.ver-btn {
					position: absolute;
					right: 30rpx;
					top: 50%;
					margin-top: -20rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					color: rgb(10, 198, 142);
					padding: 0;
					width: 100rpx;
				}

				.li-right {
					height: 50rpx;
					width: 540rpx;
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
					width: 100rpx;
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