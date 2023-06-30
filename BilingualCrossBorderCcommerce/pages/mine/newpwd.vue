<template>
	<view class="register-page">

		<view class="phone-logo">
			<image src="/static/images/new-index/register.png"></image>
		</view>

		<block v-if="blockNum==1">
			<view class="newpwd">
				<view class="newpwd-info">
					<view class="myinput">
						<u--input :placeholder="$t('login.qsryzm')" border="none" type="text"
							v-model="code"></u--input>
					</view>
				</view>
				<view class="getcode" @click.stop="$noMultipleClicks(onLoginSendEmailCode)">{{codeTxt}}</view>

				<view class="btn" v-if="Inv==1" @click="LoginVerifyCode()">{{$t('login.xyb')}}</view>
				<view class="btn" v-else @click="LoginVerifyPhone()">{{$t('login.xyb')}}</view>
			</view>
		</block>

		<block v-else-if="blockNum==2">
			<view class="newpwd">
				<view class="newpwd-info" style="margin-bottom: 20rpx;">
					<view class="myinput" style="width: 590rpx;" v-show="!isPwdShow">
						<u--input :placeholder="$t('login.qsrmm')" border="none" v-model="pwd" type="password" />
					</view>
					<image src="/static/images/new-index/hidepwd.png" v-show="!isPwdShow"
						@click="isPwdShow = !isPwdShow">
					</image>

					<view class="myinput" style="width: 590rpx;" v-show="isPwdShow">
						<u--input :placeholder="$t('login.qsrmm')" border="none" v-model="pwd" type="text" />
					</view>
					<image src="/static/images/new-index/showpwd.png" v-show="isPwdShow"
						@click="isPwdShow = !isPwdShow">
					</image>
				</view>

				<view class="newpwd-info">
					<view class="myinput" style="width: 590rpx;" v-show="!isPwdOkShow">
						<u--input :placeholder="$t('login.qsrqrmm')" border="none" v-model="pwd2" type="password" />
					</view>
					<image src="/static/images/new-index/hidepwd.png" v-show="!isPwdOkShow"
						@click="isPwdOkShow=!isPwdOkShow"></image>

					<view class="myinput" style="width: 590rpx;" v-show="isPwdOkShow">
						<u--input :placeholder="$t('login.qsrqrmm')" border="none" v-model="pwd2" type="text" />
					</view>
					<image src="/static/images/new-index/showpwd.png" v-show="isPwdOkShow"
						@click="isPwdOkShow=!isPwdOkShow"></image>
				</view>

				<view class="btn" @click="$noMultipleClicks(onLoginForgetPwdByEmail)">{{$t('new.updatePwd')}}</view>
			</view>
		</block>



		<!--register-box start-->
		<view class="register-box" v-show="Inv == 0">

			<!--login-ul start-->
			<view class="login-ul">
				<view class="login-li">
					<view class="label" @click="navClick('../public/ownership')">
						<text>{{mobile_area_code}}</text>
						<view class="icon">
							<image class="img" src="../../static/images/icon5.png"></image>
						</view>
					</view>
					<view class="li-input">
						<input class="input" placeholder-class="color-999" v-model="mobile"
							:placeholder="$t('login.qsrsjh')" />
					</view>
				</view>
				<view class="login-li">
					<view class="label">{{$t('login.yzm')}}</view>
					<view class="li-input">
						<input class="input" placeholder-class="color-999" v-model="code"
							:placeholder="$t('login.qsryzm')" />
					</view>
					<view class="ver-btn" v-if="codeTxt1==$t('login.hqyzm')"
						@click.stop="$noMultipleClicks(onLoginSendMobileCode)">{{$t('login.fsyzm')}}</view>
					<view class="ver-btn" v-else>{{codeTxt1}}</view>
				</view>
				<view class="login-li">
					<view class="label">{{$t('user.pwd.szzfmm')}}</view>
					<view class="li-input">
						<input class="input" maxlength="6" type="password" placeholder-class="color-999" v-model="pwd"
							:placeholder="$t('user.pwd.qsrzfmm')" />
					</view>
				</view>

			</view>
			<!--login-ul end-->
			<!--register-bot start-->
			<view class="register-bot">
				<button class="public-btn" style="background: #1DD181;"
					@click.stop="$noMultipleClicks(onLoginForgetPwdByMobile)">{{$t('login.qrzh')}}</button>
			</view>
			<!--register-bot end-->
		</view>
		<!--register-box end-->
		<!--register-box start-->
		<view class="register-box" v-show="Inv == 2">
			<!--login-ul start-->
			<view class="login-ul">

				<view class="login-li">
					<view class="li-input">
						<input class="input" placeholder-class="color-999" v-model="email_code"
							:placeholder="$t('login.qsryzm')" />
					</view>
					<view class="ver-btn" v-if="codeTxt==$t('login.hqyzm')"
						@click.stop="$noMultipleClicks(onLoginSendEmailCode)">{{$t('login.fsyzm')}}</view>
					<view class="ver-btn" v-else>{{codeTxt}}</view>
				</view>

				<view class="login-li">
					<view class="label">{{$t('user.pwd.szzfmm')}}</view>
					<view class="li-input">
						<input class="input" maxlength="6" type="password" placeholder-class="color-999" v-model="pwd"
							:placeholder="$t('user.pwd.qsrzfmm')" />
					</view>
				</view>

			</view>
			<!--login-ul end-->
			<!--register-bot start-->
			<view class="register-bot">
				<button class="public-btn" style="background: #1DD181;"
					@click.stop="$noMultipleClicks(onLoginForgetPwdByEmail)">{{$t('new.updatePwd')}}</button>
			</view>
			<!--register-bot end-->
		</view>
		<!--register-box end-->
	</view>
</template>
<script>
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		data() {
			return {
				blockNum: 1,
				noClick: true, // 防止重复点击 
				Inv: 1,
				email: '', // 邮箱号
				pwd: '', // 密码
				pwd2: '', // 再次输入的密码
				email_code: '', // 邮箱验证码
				second: 60,
				codeTxt: this.$t('login.hqyzm'),
				mobile: '', // 手机号
				code: '', // 手机验证码
				mobile_area_code: '', // 区号
				seconds: 60,
				codeTxt1: this.$t('login.hqyzm'),
				isShopCont: false, // 中文还是英文
				isPwdShow: false,
				isPwdOkShow: false,
				showErrCode:false
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
			if (uni.getStorageSync('token')) {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.data.email) {
						this.email = res.data.email
						this.Inv = 1
					} else {
						this.mobile = res.data.mobile
						this.mobile_area_code = res.data.mobile_area_code
						this.Inv = 0
					}

				})
			}

		},
		methods: {
			//邮箱验证码验证
			LoginVerifyCode() {
				if (!this.code) {
					uni.showToast({
						title: this.$t('login.qsryzm'),
						icon: 'none'
					})
					return
				}
				this.$http.post(this.$apiObj.LoginVerifyCode, {
					email: this.email,
					email_code: this.code
				}).then(res => {
					if (res.code == 1) {
						this.blockNum = 2
						this.showErrCode = false
					} else {
						this.showErrCode = true
					}
				})
			},
			//手机验证码验证
			LoginVerifyPhone(){
				if (!this.code) {
					uni.showToast({
						title: this.$t('login.qsryzm'),
						icon: 'none'
					})
					return
				}
				this.$http.post(this.$apiObj.LoginVerifyPhone, {
					mobile_area_code: this.mobile_area_code,
					mobile: this.mobile,
					code: this.code
				}).then(res => {
					if (res.code == 1) {
						this.blockNum = 2
						this.showErrCode = false
					} else {
						this.showErrCode = true
					}
				})
			},
			// 点击切换
			changeTab(Inv) {
				this.navIdx = Inv;
			},
			// 获取验证码
			onLoginSendMobileCode() {
				if (!this.mobile) return uni.showToast({
					title: this.$t('login.qsrsjh'),
					icon: 'none'
				})
				if (this.mobile_area_code == 86) {
					if (this.mobile) {
						var reg_tel =
							/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
						if (!reg_tel.test(this.mobile)) return uni.showToast({
							title: this.$t('login.qsrzqsjh'),
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
							title: this.$t('login.fscg'),
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
						this.codeTxt1 = this.$t('login.hqyzm')
					}
				}, 1000)
			},
			// 手机号重置密码
			onLoginForgetPwdByMobile() {
				if (!this.mobile) return uni.showToast({
					title: this.$t('login.qsrsjhm'),
					icon: 'none'
				})
				if (this.mobile) {
					var reg_tel =
						/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
					if (!reg_tel.test(this.mobile)) return uni.showToast({
						title: this.$t('login.qsrzqsjh'),
						icon: 'none'
					})
				}
				if (!this.code) return uni.showToast({
					title: this.$t('login.qsryzm'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})
				if (!this.pwd2) return uni.showToast({
					title: '请确认密码',
					icon: 'none'
				})
				if (this.pwd !== this.pwd2) return uni.showToast({
					title: '2次密码不一致，请重新输入',
					icon: 'none'
				})
				const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
				this.$http.post(this.$apiObj.MineSetPaypwdByMobile, {
					mobile: this.mobile, // 邮箱
					code: this.code, // 邮箱验证码 
					mobile_area_code: this.mobile_area_code.slice(1),
					pay_pwd: pwd, // 密码
					// pwd2: pwd,// 再次输入的密码 
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.czmmcg'),
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
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 获取验证码
			onLoginSendEmailCode() {
				this.$http.post(this.$apiObj.LoginSendEmailCode, {
					type: this.isShopCont ? 2 : 1,
					email: this.email
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.fscg'),
							icon: 'none'
						})
						this.timeDown()
					}
				})
			},
			timeDown() {
				this.result = setInterval(() => {
					--this.second
					this.codeTxt = this.second + 'S'
					if (this.second < 0) {
						clearInterval(this.result)
						this.second = 60
						this.codeTxt = this.$t('login.hqyzm')
					}
				}, 1000)
			},
			// 邮箱重置密码
			onLoginForgetPwdByEmail() {

				if (!this.code) return uni.showToast({
					title: this.$t('login.qsryzm'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})
				if (!/^\d{6}$/.test(this.pwd)) return uni.showToast({
					title: this.$t('numshuzi'),
					icon: 'none'
				})
				if (!this.pwd2) return uni.showToast({
					title: '请确认密码',
					icon: 'none'
				})
				if (this.pwd !== this.pwd2) return uni.showToast({
					title: '2次密码不一致，请重新输入',
					icon: 'none'
				})
				const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
				this.$http.post(this.$apiObj.MineSetPaypwdByEmail, {
					email: this.email, // 邮箱
					email_code: this.code, // 邮箱验证码 
					pay_pwd: pwd, // 密码
					// pwd2: pwd,// 再次输入的密码 
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.czmmcg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.register-page {

		.newpwd {
			margin-top: 60rpx;

			.newpwd-info {
				position: relative;
				width: 686rpx;
				height: 84rpx;

				display: flex;
				align-items: center;
				background: rgb(245, 245, 245);
				border-radius: 8rpx;
				margin: 0 auto;

				.myinput {
					width: 460rpx;
					font-size: 28rpx;
					color: rgb(245, 245, 245);
					margin-left: 20rpx;
				}

				image {
					width: 36rpx;
					height: 36rpx;
				}

			}

			.getcode {
				width: 718rpx;
				font-size: 24rpx;
				color: rgb(10, 198, 142);
				text-align: right;
				text-decoration: underline;
				margin-top: 20rpx;
			}
			
			.btn {
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 40rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 88rpx;
				margin: 48rpx auto 0 auto;
			}

		}

		.register-email {
			width: 100%;
			margin-top: 32rpx;

			.switch_email_phone {
				font-size: 24rpx;
				color: rgb(10, 198, 142);
				margin: -20rpx 0 48rpx 32rpx;
			}

			.logo {
				display: block;
				width: 280rpx;
				height: 280rpx;
				margin: 0 auto;
			}

			.title {
				width: 100%;
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				text-align: center;
				margin-top: 22rpx;
			}

			.register-input {
				position: relative;
				width: 686rpx;
				height: 84rpx;
				display: flex;
				align-items: center;
				background: rgb(245, 245, 245);
				border-radius: 8rpx;
				margin: 60rpx auto 48rpx auto;

				.input {
					width: 500rpx;
				}

				span {
					width: 100rpx;
					text-align: center;
				}

				view {
					position: absolute;
					right: 20rpx;
					font-size: 24rpx;
					color: rgb(153, 153, 153);
				}

			}

			.register-btn {
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 40rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgba(10, 198, 142, 1);
				border-radius: 88rpx;
				margin: 0 auto 40rpx auto;
			}

			.code-info {
				width: 686rpx;
				font-size: 24rpx;
				color: rgb(153, 153, 153);
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 auto 48rpx auto;

				span {
					font-weight: bold;
					color: rgb(10, 198, 142);
					margin-left: 8rpx;
				}

				.code-info-err {
					color: rgb(255, 57, 57);
				}
			}

			.email-input {
				width: 686rpx;
				height: 88rpx;
				display: flex;
				align-items: center;
				background: rgb(241, 241, 241);
				border-radius: 16rpx;
				margin: 0 auto 32rpx auto;

				.logo {
					width: 48rpx;
					height: 48rpx;
					margin: 0 32rpx;
				}

				.email-input-info {
					width: 500rpx;
				}

				.pwd {
					display: block;
					width: 36rpx;
					height: 36rpx;
					margin-left: 10rpx;
				}
			}

			.pwd-err {
				width: 686rpx;
				font-size: 24rpx;
				color: rgb(255, 57, 57);
				margin: 0 auto 48rpx auto;
			}

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


		.register-tab {
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 35rpx 30rpx;
			line-height: 1;
			font-size: 32rpx;
			border-bottom: 1px solid #f5f5f5;

			.li {
				position: relative;
			}

			.active {
				color: #fc0609;
			}

			.active::after {
				width: 68rpx;
				height: 5rpx;
				background: #fc0609;
				border-radius: 3rpx;
				position: absolute;
				left: 50%;
				margin-left: -34rpx;
				bottom: -35rpx;
				content: "";
				display: block;
			}
		}

		.register-box {
			padding: 30rpx;

			.register-bot {
				margin: 55rpx 0;
			}

			.login-check {
				display: flex;
				font-size: 24rpx;
				line-height: 32rpx;

				.check {
					margin-right: 0rpx;
				}
			}

			.login-ul {
				.login-li {
					border-bottom: 1px solid #f5f5f5;
					padding: 24rpx 0;
					display: flex;
					align-items: center;
					position: relative;

					.ver-btn {
						position: absolute;
						right: 0;
						top: 50%;
						font-size: 2rpx;
						color: rgb(29, 209, 129);
						font-size: 28rpx;
						line-height: 1;
						padding: 0;
						margin: -14rpx 0 0 0;
					}

					.login-eye {
						width: 38rpx;
						height: 38rpx;
						position: absolute;
						right: 145rpx;
						top: 50%;
						margin-top: -19rpx;
					}

					.login-pass {
						font-size: 26rpx;
						position: absolute;
						right: 0;
						color: #333;
						top: 50%;
						margin-top: -20rpx;
						line-height: 40rpx;
						display: flex;

						.line {
							width: 2rpx;
							height: 40rpx;
							margin-right: 20rpx;
							background: #eeeeee;
						}
					}

					.label {
						width: 150rpx;
						margin-right: 10rpx;
						font-size: 28rpx;
						display: flex;
						align-items: center;
						line-height: 1;

						.icon {
							width: 11rpx;
							height: 7rpx;
							min-width: 11rpx;
							max-width: 11rpx;
							margin-left: 10rpx;
						}
					}

					.li-input {
						flex: 1;

						.input {
							height: 60rpx;
							width: 100%;
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}
</style>