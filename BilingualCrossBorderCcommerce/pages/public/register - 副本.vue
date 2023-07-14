<template>
	<view class="register-page">

		<block>
			<view class="register-email">
				<image src="/static/images/new-index/register.png" class="logo"></image>
				<!--邮箱输入-->
				<block v-if="blockNum==1">
					<view class="switchLoginType">
						<view class="info" @click="emailOrPhone=1">
							<image src="/static/images/kbrick/login_email.png" class="email" v-show="emailOrPhone!=1">
							</image>
							<image src="/static/images/kbrick/login_email_select.png" class="email"
								v-show="emailOrPhone==1"></image>
							<view class="email_tit" :class="emailOrPhone==1?'select_tit':''">Email</view>
						</view>
						<view class="info" @click="emailOrPhone=2">
							<view class="phone_tit" :class="emailOrPhone==2?'select_tit':''">Phone</view>
							<image src="/static/images/kbrick/login_phone.png" class="phone" v-show="emailOrPhone!=2">
							</image>
							<image src="/static/images/kbrick/login_phone_select.png" class="phone"
								v-show="emailOrPhone==2"></image>
						</view>
					</view>

					<view class="register-input" v-show="emailOrPhone==1">
						<view class="input">
							<u--input :placeholder="$t('login.qsryx')" v-model="email" border="none" clearable
								@input="changInput('email')"></u--input>
						</view>
					</view>
					<view class="register-input" v-show="emailOrPhone==2">
						<span class="input-code" @click="navClick('ownership')">{{mobile_area_code}}</span>
						<view style="width: 522rpx;margin: 0;">
							<u--input :placeholder="$t('login.qsrsjh')" v-model="mobile" border="none" clearable
								@input="changInput('email')" width="261"></u--input>
						</view>
					</view>

					<view class="register-btn" style="background: rgba(10, 198, 142,0.5);" v-show="!isOnSendEmail">
						{{$t('login.fsyzm')}}
					</view>
					<view class="register-btn" @click="verifyData('email')" v-show="isOnSendEmail">{{$t('login.fsyzm')}}
					</view>

					<view class="register-box" style="padding:0 30rpx">
						<view class="login-check">
							<view class="check" @click="isQuanShow=!isQuanShow">
								<checkbox :checked="isQuanShow?true:false" style="transform: scale(0.7);" />

							</view>
							<view class="xy">
								<text class="color-999">{{$t('login.shcg')}}</text>
								<navigator url="../mine/ptfwxy" hover-class="none">{{$t('login.ptfwxy')}}</navigator>
								<navigator url="../mine/ysxy" hover-class="none">{{$t('login.ysxy')}}</navigator>
								<navigator url="../mine/agreement" hover-class="none">{{$t('login.zcxgxy')}}</navigator>
							</view>
						</view>
					</view>

				</block>

				<!--验证码输入-->
				<block v-else-if="blockNum==2">
					<view class="register-input" style="margin-bottom: 24rpx;">
						<view class="input">
							<u--input placeholder="Please enter the verification code" v-model="email_code"
								border="none" @input="changInput('code')"></u--input>
						</view>
					</view>
					<view class="code-info">
						<view>
							<view class="code-info-err" v-show="showErrCode">{{$t('new.yzmcw')}}</view>
						</view>
						<view class="code" @click="onLoginSendEmailCode()" v-show="emailOrPhone==1">
							<span>{{codeTxt}}</span>
						</view>
						<view class="code" @click="onLoginSendMobileCode()" v-show="emailOrPhone==2">
							<span>{{codeTxt1}}</span>
						</view>
					</view>

					<view class="register-btn" style="background: rgba(10, 198, 142,0.5);" v-show="!isOnSendCode">
						{{$t('login.xyb')}}
					</view>

					<!--验证码验证-->
					<view class="register-btn" @click="LoginVerifyCode()" v-show="isOnSendCode && emailOrPhone==1">
						{{$t('login.xyb')}}
					</view>
					<view class="register-btn" @click="LoginVerifyPhone()" v-show="isOnSendCode && emailOrPhone==2">
						{{$t('login.xyb')}}
					</view>
				</block>

				<!--密码输入-->
				<block v-else-if="blockNum==3">
					<!--密码-->
					<view class="email-input" style="margin-top: 60rpx;">
						<image src="../../static/images/new-index/pwd.png" class="logo"></image>
						<view class="email-input-info">
							<u--input type="password" :placeholder="$t('login.qsrmm')" border="none" v-model="pwd"
								v-show="!isPwdShow" @input="changInput('pwd')"></u--input>
							<u--input :placeholder="$t('login.qsrmm')" border="none" v-model="pwd" v-show="isPwdShow"
								@input="changInput('pwd')"></u--input>
						</view>
						<image src="/static/images/new-index/showpwd.png" class="pwd" v-show="isPwdShow"
							@click="isPwdShow=!isPwdShow"></image>
						<image src="/static/images/new-index/hidepwd.png" class="pwd" v-show="!isPwdShow"
							@click="isPwdShow=!isPwdShow"></image>
					</view>

					<!--确认密码-->
					<view class="email-input">
						<image src="../../static/images/new-index/pwd.png" class="logo"></image>
						<view class="email-input-info">
							<u--input type="password" :placeholder="$t('login.qsrmm')" border="none" v-model="pwd2"
								v-show="!isPwdOkShow" @input="changInput('pwd')"></u--input>
							<u--input :placeholder="$t('login.qsrqrmm')" border="none" v-model="pwd2"
								v-show="isPwdOkShow" @input="changInput('pwd')"></u--input>
						</view>
						<image src="/static/images/new-index/showpwd.png" class="pwd" v-show="isPwdOkShow"
							@click="isPwdOkShow=!isPwdOkShow"></image>
						<image src="/static/images/new-index/hidepwd.png" class="pwd" v-show="!isPwdOkShow"
							@click="isPwdOkShow=!isPwdOkShow"></image>
					</view>

					<view class="email-input">
						<image src="../../static/images/new-index/yqcode.png" class="logo"></image>
						<view class="email-input-info">
							<u--input :placeholder="$t('login.qsryqm')" border="none" :disabled="isDisabled"
								disabledColor="#f1f1f1" v-model="share_code"></u--input>
						</view>
					</view>

					<view class="pwd-err" v-show="showPwdErr">The two passwords are different</view>

					<view class="register-btn" style="background: rgba(10, 198, 142,0.5);" v-show="!isOnSendPwd">
						{{$t('login.zc')}}
					</view>

					<!--注册-->
					<view class="register-btn" @click.stop="$noMultipleClicks(onLoginEmailRegister)"
						v-show="isOnSendPwd && emailOrPhone==1">{{$t('login.zc')}}</view>
					<view class="register-btn" @click.stop="$noMultipleClicks(onLoginMobileRegister)"
						v-show="isOnSendPwd && emailOrPhone==2">{{$t('login.zc')}}</view>
				</block>

			</view>
		</block>

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
				showErrCode: false,
				showPwdErr: false,
				isOnSendEmail: false, //无法操作获取验证码
				isOnSendCode: false, //无法操作下一步
				isOnSendPwd: false, //无法操作注册
				blockNum: 1, //操作步骤
				noClick: true, // 防止重复点击 
				Inv: 2,
				emailOrPhone: 1,
				code: '', // 手机号验证码
				mobile: '', // 手机号码
				mobile_area_code: '', // 手机号区域码
				pwd: '', // 密码
				pwd2: '', // 再次输入的密码
				invite_code: '', // 邀请码
				share_code: '', //推广码
				email: '', // 电子邮箱，比如 example@qq.com
				email_code: '', // 邮箱验证码
				second: 120,
				codeTxt: this.$t('login.hqyzm'),
				seconds: 120,
				codeTxt1: this.$t('login.hqyzm'),
				isQuanShow: false,
				isShopCont: false, // 中文还是英文
				isPwdShow: false,
				isPwdOkShow: false,
				isDisabled: false
			}
		},
		onLoad(e) {
			if (e.promotion_code) {
				this.isDisabled=true
				this.share_code = e.promotion_code
			}

			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.invite_code = e.invite_code ? e.invite_code : ''
			if (sessionStorage.getItem("invite_code")) {
				this.invite_code = sessionStorage.getItem("invite_code") ? sessionStorage.getItem("invite_code") : ''
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
			//输入框改变事件
			changInput(val) {
				if (val == 'email') {
					this.isOnSendEmail = this.email.length > 0 ? true : false || this.mobile.length > 0 ? true : false
				} else if (val == 'code') {
					this.isOnSendCode = this.email_code.length > 0 ? true : false
				} else if (val == 'pwd') {
					this.isOnSendPwd = this.pwd.length > 0 && this.pwd2.length > 0 ? true : false
				}
			},
			//密码验证
			verifyPwd() {
				if (this.pwd != this.pwd2) {
					this.showPwdErr = true
				} else {
					this.showPwdErr = false
				}
			},
			verifyData(val) {
				if (!this.isQuanShow) {
					uni.showToast({
						title: this.$t('login.gx'),
						icon: 'none'
					})
					return
				}
				if (this.emailOrPhone == 1) {
					this.onLoginSendEmailCode()
				} else {
					this.onLoginSendMobileCode()
				}
			},
			// 点击切换
			changeTab(Inv) {
				console.log(Inv);
				this.Inv = Inv
				this.pwd = '' // 密码
				this.pwd2 = '' // 再次输入的密码
			},
			// 获取手机验证码
			onLoginSendMobileCode() {
				if (!this.mobile) return uni.showToast({
					title: this.$t('login.qsrsjhm'),
					icon: 'none'
				})
				if (this.codeTxt1 != this.$t('login.hqyzm')) return

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
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.fscg'),
							icon: 'none'
						})
						this.timeDowns()
						this.blockNum = 2
					}
				})
			},
			timeDowns() {
				this.results = setInterval(() => {
					--this.seconds
					this.codeTxt1 = this.seconds + 'S'
					if (this.seconds < 0) {
						clearInterval(this.results)
						this.seconds = 120
						this.codeTxt1 = this.$t('login.hqyzm')
					}
				}, 1000)
			},
			// 手机号注册
			onLoginMobileRegister() {
				if (!this.mobile) return uni.showToast({
					title: this.$t('login.qsrsjhm'),
					icon: 'none'
				})
				if (!this.email_code) return uni.showToast({
					title: this.$t('login.qsryzm'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})
				if (this.pwd) {
					let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,16}$/

					if (!reg.test(this.pwd)) return uni.showToast({
						title: this.$t('pwdcd'),
						icon: 'none'
					})
				}
				if (!this.pwd2) return uni.showToast({
					title: this.$t('login.qqrmm'),
					icon: 'none'
				})
				if (this.pwd !== this.pwd2) return uni.showToast({
					title: this.$t('login.lcmmbyzqcxsr'),
					icon: 'none'
				})
				if (!this.isQuanShow) return uni.showToast({
					title: this.$t('login.qydxybty'),
					icon: 'none'
				})
				const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
				this.$http.post(this.$apiObj.LoginMobileRegister, {
					code: this.email_code, // 手机号验证码
					mobile: this.mobile, // 手机号码
					mobile_area_code: this.mobile_area_code.slice(1), // 手机号区域码
					pwd: pwd, // 密码
					pwd2: pwd, // 再次输入的密码
					invite_code: this.share_code, // 邀请码
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.zccg'),
							icon: 'none'
						})
						setTimeout(() => {
							// uni.navigateBack({ delta: 1 })
							uni.navigateTo({
								url: './login'
							})
						}, 1000);
					}
				})
			},
			// 获取邮箱验证码
			onLoginSendEmailCode() {
				if (!this.email) return uni.showToast({
					title: this.$t('login.qsryx'),
					icon: 'none'
				})
				if (this.codeTxt != this.$t('login.hqyzm')) return

				if (this.email) {
					var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
					if (!reg_tel.test(this.email)) return uni.showToast({
						title: this.$t('login.qsrzqyx'),
						icon: 'none'
					})
				}
				uni.showLoading({
					title: this.$t('login.qq'),
					mask: true
				});
				this.$http.post(this.$apiObj.LoginSendEmailCode, {
					type: this.isShopCont ? 2 : 1,
					email: this.email
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.fscg'),
							icon: 'none'
						})
						this.blockNum = 2
						this.timeDown()
					}
				}).finally(() => {
					uni.hideLoading();
				})
			},
			timeDown() {
				this.result = setInterval(() => {
					--this.second
					this.codeTxt = this.second + 'S'
					if (this.second < 0) {
						clearInterval(this.result)
						this.second = 120
						this.codeTxt = this.$t('login.hqyzm')
					}
				}, 1000)
			},
			//邮箱验证码验证
			LoginVerifyCode() {
				if (!this.email_code) {
					uni.showToast({
						title: this.$t('login.qsryzm'),
						icon: 'none'
					})
					return
				}
				this.$http.post(this.$apiObj.LoginVerifyCode, {
					email: this.email,
					email_code: this.email_code
				}).then(res => {
					if (res.code == 1) {
						this.blockNum = 0
						setTimeout(() => {
							this.blockNum = 3
						}, 300)
						this.showErrCode = false
					} else {
						this.showErrCode = true
					}
				})
			},
			//手机验证码验证
			LoginVerifyPhone() {
				if (!this.email_code) {
					uni.showToast({
						title: this.$t('login.qsryzm'),
						icon: 'none'
					})
					return
				}
				this.$http.post(this.$apiObj.LoginVerifyPhone, {
					mobile_area_code: this.mobile_area_code.slice(1),
					mobile: this.mobile,
					code: this.email_code
				}).then(res => {
					if (res.code == 1) {
						this.blockNum = 0
						setTimeout(() => {
							this.blockNum = 3
						}, 300)
						this.showErrCode = false
					} else {
						this.showErrCode = true
					}
				})
			},
			// 邮箱注册
			onLoginEmailRegister() {
				if (!this.email) return uni.showToast({
					title: this.$t('login.qsryx'),
					icon: 'none'
				})
				if (this.email) {
					var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
					if (!reg_tel.test(this.email)) return uni.showToast({
						title: this.$t('login.qsrzqyx'),
						icon: 'none'
					})
				}
				if (!this.email_code) return uni.showToast({
					title: this.$t('login.qsryzm'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})

				if (this.pwd) {
					let reg =
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,16}$/

					if (!reg.test(this.pwd)) return uni.showToast({
						title: this.$t('pwdcd'),
						icon: 'none'
					})
				}
				if (!this.pwd2) return uni.showToast({
					title: this.$t('login.qqrmm'),
					icon: 'none'
				})
				//两次密码不一致
				if (this.pwd !== this.pwd2) {
					this.showPwdErr = true
					uni.showToast({
						title: this.$t('login.lcmmbyzqcxsr'),
						icon: 'none'
					})
					return
				}
				if (!this.isQuanShow) return uni.showToast({
					title: this.$t('login.qydxybty'),
					icon: 'none'
				})
				//密码不能输入空格
				let re = /^(?!\s+).*(?<!\s)$/;
				if (re.test(this.pwd || this.pwd2) == true) {
					uni.showToast({
						title: this.$t('login.kg'),
						icon: 'none'
					})
				}
				//密码中不能输入汉字
				let h = /[\u4E00-\u9FA5]/g;
				if (h.test(this.pwd || this.pwd2) == true) {
					uni.showToast({
						title: this.$t('login.hz'),
						icon: 'none'
					})
				}
				const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
				uni.showLoading({
					title: this.$t('login.qq'),
					mask: true
				});
				this.$http.post(this.$apiObj.LoginEmailRegister, {
					pwd: pwd, // 密码
					pwd2: pwd, // 再次输入的密码
					invite_code: this.share_code, // 邀请码
					email: this.email, // 邮箱
					email_code: this.email_code, // 邮箱验证码
				}).then(res => {
					if (res.code == 1) {
						uni.removeStorageSync('invite_code')
						uni.showToast({
							title: this.$t('login.zccg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: './login'
							})
						}, 1000);
						if (sessionStorage.getItem("invite_code")) {
							sessionStorage.removeItem("invite_code")
						}
					}
				}).finally(() => {
					uni.hideLoading();
				})
			},
			// 字符串加密
			toCode(str) { //加密字符串
				//定义密钥，36个字母和数字
				var key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				var len = key.length; //获取密钥的长度
				var a = key.split(""); //把密钥字符串转换为字符数组
				var s = "",
					b, b1, b2, b3; //定义临时变量
				for (var i = 0; i < str.length; i++) { //遍历字符串
					b = str.charCodeAt(i); //逐个提取每个字符，并获取Unicode编码值
					b1 = b % len; //求Unicode编码值得余数
					b = (b - b1) / len; //求最大倍数
					b2 = b % len; //求最大倍数的于是
					b = (b - b2) / len; //求最大倍数
					b3 = b % len; //求最大倍数的余数
					s += a[b3] + a[b2] + a[b1]; //根据余数值映射到密钥中对应下标位置的字符
				}
				return s; //返回这些映射的字符
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.register-page {

		.switchLoginType {
			position: relative;
			width: 332rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			border: 1rpx solid rgb(10, 198, 142);
			border-radius: 80rpx;
			margin: 50rpx 0 -18rpx 32rpx;

			.info {
				display: flex;
				align-items: center;
			}

			.email {
				width: 64rpx;
				height: 64rpx;
				margin-left: 8rpx;
			}

			.email_tit {
				font-size: 24rpx;
				color: rgb(153, 153, 153);
				margin-left: 12rpx;
			}

			.phone {
				position: absolute;
				right: 8rpx;
				width: 64rpx;
				height: 64rpx;
			}

			.phone_tit {
				position: absolute;
				right: 80rpx;
				font-size: 24rpx;
				color: rgb(153, 153, 153);
			}

			.select_tit {
				font-weight: bold;
				color: rgb(10, 198, 142);
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
				width: 686rpx;
				height: 84rpx;
				display: flex;
				align-items: center;
				background: rgb(245, 245, 245);
				border-radius: 8rpx;
				margin: 60rpx auto 48rpx auto;

				.input {
					width: 622rpx;
					margin: 0 auto;
				}

				span {
					width: 100rpx;
					text-align: center;
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
				text-align: center;
			}

			.active {
				color: rgb(255, 78, 47);
			}

			.active::after {
				width: 68rpx;
				height: 5rpx;
				background: rgb(255, 78, 47);
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

				.xy {
					display: flex;
					flex-wrap: wrap;
				}
			}

			.login-ul {
				.login-li {
					border-bottom: 1px solid #f5f5f5;
					padding: 24rpx 0;
					display: flex;
					align-items: center;
					position: relative;

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

						text {
							color: red;
						}

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
						display: flex;
						justify-content: space-between;
						align-items: center;

						.input {
							height: 60rpx;
							width: 100%;
							font-size: 28rpx;

							&.act {
								width: 72%;
							}
						}

						.yzm {
							color: rgb(255, 78, 47);
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}

	/deep/ uni-checkbox .uni-checkbox-input {
		border-radius: 100%;
	}

	/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: #d1d1d1;
	}

	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: rgb(10, 198, 142);
		color: #fff !important;
		border-color: rgb(10, 198, 142);
	}
</style>