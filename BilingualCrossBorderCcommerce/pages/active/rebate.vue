<template>
	<view class="rebate">
		<view class="header">
			<view class="head">
				<image src="/static/images/auth/left.png" class="left"></image>
				<view>{{$t('active.join')}}</view>
				<image src="/static/images/rebate/rebate_home.png" class="right" @click="toIndex()"></image>
			</view>

			<view class="subtitle">{{$t('active.award')}}</view>

			<image src="/static/images/rebate/rebate_bx.png" class="bx"></image>
		</view>

		<view class="info">
			<view class="user">
				<image :src="userCont.avatar"></image>
				<view>{{userCont.nickname}}</view>
			</view>

			<view class="info_tit">{{$t('active.invite_tit')}}</view>

			<view class="switch">
				<view class="switch_info" :class="select == 1 ? 'switch_select' : ''" @click="switchSelect(1)">
					<image src="/static/images/kbrick/login_email_select.png" v-if="select == 1"></image>
					<image src="/static/images/rebate/rebate_email_select.png" v-else></image>
					<view>Email address</view>
				</view>
				<view class="switch_info" :class="select == 2 ? 'switch_select' : ''" @click="switchSelect(2)">
					<image src="/static/images/kbrick/login_phone_select.png" v-if="select == 2"></image>
					<image src="/static/images/rebate/rebate_phone_select.png" v-else></image>
					<view>Phone number</view>
				</view>
			</view>

			<view class="my-input" v-if="select == 1">
				<image src="/static/images/rebate/rebate_email.png" class="logo"></image>
				<view class="input_class">
					<u--input :placeholder="$t('user.Vemail.qsremail')" border="none" v-model="email"></u--input>
				</view>
			</view>

			<view class="my-input" v-else-if="select == 2">
				<image src="/static/images/rebate/rebate_phone.png" class="logo"></image>
				<view class="area" @click="navClick('/pages/public/ownership')">
					<text>{{phone_area_code}}</text>
					<image src="/static/images/rebate/rebate_btm.png"></image>
				</view>
				<view class="input_class" style="width: 350rpx;margin-left: 24rpx;">
					<u--input :placeholder="$t('user.address.qsrsjhm')" border="none" v-model="phone"></u--input>
				</view>
			</view>

			<view class="send_code">
				<view class="my-input" style="width: 462rpx;margin-top: 0;">
					<image src="/static/images/rebate/rebate_code.png" class="logo"></image>
					<view class="input_class" style="width: 300rpx;">
						<u--input :placeholder="$t('user.Vemail.qsryzm')" border="none" v-model="code"></u--input>
					</view>
				</view>
				<view class="btn" @click="sendCodeByEmailOrPhone()">{{code_txt}}</view>
			</view>

			<view class="my-input">
				<image src="/static/images/rebate/rebate_pwd.png" class="logo"></image>
				<view class="input_class">
					<u--input :placeholder="$t('user.order.qsrmm')" border="none" v-model="pwd" type="password"
						v-show="!pwdShow"></u--input>
					<u--input :placeholder="$t('user.order.qsrmm')" border="none" v-model="pwd"
						v-show="pwdShow"></u--input>
				</view>
				<image src="/static/images/new-index/showpwd.png" class="pwd" v-show="pwdShow"
					@click="pwdShow=!pwdShow"></image>
				<image src="/static/images/new-index/hidepwd.png" class="pwd" v-show="!pwdShow"
					@click="pwdShow=!pwdShow"></image>
			</view>

			<view class="my-input">
				<image src="/static/images/rebate/rebate_pwd2.png" class="logo"></image>
				<view class="input_class">
					<u--input :placeholder="$t('login.qqrmm')" border="none" v-model="pwd2" type="password"
						v-show="!pwd2Show"></u--input>
					<u--input :placeholder="$t('login.qqrmm')" border="none" v-model="pwd2"
						v-show="pwd2Show"></u--input>
				</view>
				<image src="/static/images/new-index/showpwd.png" class="pwd" v-show="pwd2Show"
					@click="pwd2Show=!pwd2Show"></image>
				<image src="/static/images/new-index/hidepwd.png" class="pwd" v-show="!pwd2Show"
					@click="pwd2Show=!pwd2Show"></image>
			</view>

			<view class="my-input">
				<image src="/static/images/rebate/rebate_invite.png" class="logo"></image>
				<view class="input_class">
					<u--input :placeholder="$t('login.qsryqm')" border="none" v-model="invite" :disabled="isDisabled"
						disabledColor="#fff"></u--input>
				</view>
			</view>

		</view>

		<view class="register" @click="register()">{{$t('login.zc')}}</view>

		<view class="xy">
			<image src="/static/images/rebate/rebate_wxz.png" v-show="!isQuanShow" @click="isQuanShow=!isQuanShow">
			</image>
			<image src="/static/images/new-index/xz.png" v-show="isQuanShow" @click="isQuanShow=!isQuanShow"></image>
			<view>
				{{$t('active.xieyi')}}
				<text @click="navClick('/pages/mine/ptfwxy')">{{$t('login.ptfwxy')}}</text>
				<text @click="navClick('/pages/mine/ysxy')">《{{$t('user.xitong.Privacyagreement')}}》</text>
				<text @click="navClick('/pages/mine/agreement')">{{$t('login.zcxgxy')}}</text>

			</view>
		</view>

		<view style="height: 38rpx;"></view>
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
				select: 1,
				email: '', //邮箱
				phone: '', //手机号
				phone_area_code: '', //手机号归属
				pwd: '', //密码
				pwdShow: false, //默认为密码框
				pwd2: '', //确认密码
				pwd2Show: false, //默认为密码框
				code: '', //验证码
				invite: '', //邀请码
				code_txt: this.$t('active.send_code'), //验证文本
				isSendingRequest: false, //是否已发送验证码
				seconds: 120, //倒计时
				isQuanShow: false, //是否已同意协议
				isDisabled: false,
				isShopCont: uni.getStorageSync('locale') == 'en' ? true : false,
				userCont: {},
				timer: ''
			}
		},
		onShow() {
			if (uni.getStorageSync('phoneCont')) {
				this.phone_area_code = JSON.parse(uni.getStorageSync('phoneCont')).code
			} else {
				this.phone_area_code = '+60'
				let title = {
					city: this.$t('phone.mlxy'),
					code: "+60",
					"sou": "M"
				}
				uni.setStorageSync('phoneCont', JSON.stringify(title))
			}
		},
		onLoad(e) {
			if (e.invite_code) {
				this.isDisabled = true
				this.invite = e.invite_code
				this.getInfo()
			}
		},
		methods: {
			switchSelect(id) {
				this.select = id
				this.email = ''
				this.phone = ''
				this.code = ''
				this.pwd = ''
				this.pwd2 = ''
				this.seconds = 120
				this.code_txt = this.$t('active.send_code')
				this.pwdShow = false
				this.pwd2Show = false
			},
			toIndex() {
				uni.switchTab({
					url: '/pages/auction/auction'
				})
			},
			//获取用户信息
			getInfo() {
				this.$http.post(this.$apiObj.GetCodeInfo, {
					code: this.invite
				}).then(res => {
					this.userCont = res.data
				})
			},
			sendCodeByEmailOrPhone() {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.verifyEmailOrPhone()
				}, 500)
			},
			register() {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (this.select == 1) this.onLoginEmailRegister()
					else this.onLoginMobileRegister()
				}, 500)
			},
			verifyEmailOrPhone() {
				this.$http.post(this.$apiObj.verifyEmailOrPhone, {
					email: this.select == 1 ? this.email : '',
					mobile_area_code: this.select == 1 ? '' : this.phone_area_code.slice(1),
					mobile: this.select == 1 ? '' : this.phone
				}).then(res => {
					if (res.data && this.select == 1) {
						uni.showToast({
							title: this.$t('register.verify_email'),
							icon: 'none',
							duration: 3000
						})
					} else if (res.data && this.select == 2) {
						uni.showToast({
							title: this.$t('register.verify_phone'),
							icon: 'none',
							duration: 3000
						})
					} else if (!res.data && this.select == 1) {
						this.onLoginSendEmailCode()
					} else if (!res.data && this.select == 2) {
						this.onLoginSendMobileCode()
					}
				})
			},
			// 获取手机验证码
			onLoginSendMobileCode() {
				uni.showLoading({
					title: this.$t('login.qq'),
					mask: true
				})
				if (!this.phone) return uni.showToast({
					title: this.$t('login.qsrsjhm'),
					icon: 'none'
				})
				if (this.code_txt != this.$t('active.send_code')) return
				if (this.isSendingRequest) {
					return
				}
				this.isSendingRequest = true; // 设置标志变量为 true，表示正在发送请求
				this.$http.post(this.$apiObj.LoginSendMobileCode, {
					mobile: this.phone,
					mobile_area_code: this.phone_area_code.slice(1)
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.fscg'),
							icon: 'none'
						})
						this.timeDowns()
					}
				}).finally(() => {
					uni.hideLoading();
					this.isSendingRequest = false;
				});
			},
			timeDowns() {
				this.results = setInterval(() => {
					--this.seconds
					this.code_txt = this.seconds + 'S'
					if (this.seconds < 0) {
						clearInterval(this.results)
						this.seconds = 120
						this.code_txt = this.$t('active.send_code')
					}
				}, 1000)
			},
			// 手机号注册
			onLoginMobileRegister() {
				if (!this.phone) return uni.showToast({
					title: this.$t('login.qsrsjhm'),
					icon: 'none'
				})
				if (!this.code) return uni.showToast({
					title: this.$t('login.qsryzm'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})
				if (this.pwd) {
					let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d\\W_]{8,16}$")
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
					code: this.code, // 手机号验证码
					mobile: this.phone, // 手机号码
					mobile_area_code: this.phone_area_code.slice(1), // 手机号区域码
					pwd: pwd, // 密码
					pwd2: pwd, // 再次输入的密码
					invite_code: this.invite, // 邀请码
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.zccg'),
							icon: 'none'
						})
						setTimeout(() => {
							this.loginByPhone(this.phone_area_code.slice(1), this.phone, pwd)
						}, 1000);
					}
				})
			},
			//注册成功直接登录
			loginByPhone(mobile_area_code, mobile, pwd) {
				let loginType
				// #ifdef H5
				loginType = 1
				// #endif
				// #ifndef H5
				loginType = 2
				// #endif
				this.$http.post(this.$apiObj.LoginMobileLogin, {
					mobile_area_code, // 区号
					mobile, // 手机号码
					pwd, // 密码
					referer: loginType
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.dlcg'),
							icon: 'none'
						})
						uni.setStorageSync('userinfo', {
							token: res.data.im_tourists_token,
							auth_token: res.data.auth_token
						});
						uni.setStorageSync('token', res.data.token)

						uni.removeStorageSync('BellCode')

						this.ws.init(res.data.im_tourists_token, res.data.auth_token)

						this.$http.post(this.$apiObj.MineInfo).then(ress => {
							if (ress.code == 1) {
								uni.setStorageSync('userCont', ress.data)

								try {
									// #ifdef APP-PLUS
									if (!uni.getStorageSync(ress.data.u_id + '_cilent')) {
										uni.getPushClientId({
											success: (info) => {
												let push_clientid = info.cid
												this.$http.post(this.$apiObj
													.MineBindClientId, {
														client_id: push_clientid
													}).then(data => {
													uni.setStorageSync(ress.data.u_id +
														'_cilent', push_clientid)
												})
											},
											fail(err) {
												console.log(err)
											}
										})
									}
									// #endif
								} catch (err) {
									console.log(err)
								} finally {
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/auction/auction'
										});
									}, 1000);
								}
							}
						})

					}
				})
			},

			// 获取邮箱验证码
			onLoginSendEmailCode() {
				uni.showLoading({
					title: this.$t('login.qq'),
					mask: true
				})

				if (!this.email) return uni.showToast({
					title: this.$t('login.qsryx'),
					icon: 'none'
				})
				if (this.code_txt != this.$t('active.send_code')) return

				if (this.email) {
					var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
					if (!reg_tel.test(this.email)) return uni.showToast({
						title: this.$t('login.qsrzqyx'),
						icon: 'none'
					})
				}
				if (this.isSendingRequest) {
					return
				}
				this.isSendingRequest = true; // 设置标志变量为 true，表示正在发送请求
				this.$http.post(this.$apiObj.LoginSendEmailCode, {
					type: this.isShopCont ? 2 : 1,
					email: this.email
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.fscg'),
							icon: 'none'
						})
						this.timeDowns()
					}
				}).finally(() => {
					uni.hideLoading();
					this.isSendingRequest = false;
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
				if (!this.code) return uni.showToast({
					title: this.$t('login.qsryzm'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})

				if (this.pwd) {
					let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d\\W_]{8,16}$")
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
					invite_code: this.invite, // 邀请码
					email: this.email, // 邮箱
					email_code: this.code, // 邮箱验证码
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.zccg'),
							icon: 'none'
						})
						setTimeout(() => {
							this.loginByEmail(this.email, pwd)
						}, 1000);
						if (sessionStorage.getItem("invite_code")) {
							sessionStorage.removeItem("invite_code")
						}
					}
				}).finally(() => {
					uni.hideLoading();
				})
			},
			loginByEmail(email, pwd) {
				let loginType
				// #ifdef H5
				loginType = 1
				// #endif
				// #ifndef H5
				loginType = 2
				// #endif
				this.$http.post(this.$apiObj.LoginEmailLogin, {
					email, // 邮箱
					pwd, // 密码
					referer: loginType
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.dlcg'),
							icon: 'none'
						})
						uni.setStorageSync('token', res.data.token)

						uni.setStorageSync('userinfo', {
							token: res.data.im_tourists_token,
							auth_token: res.data.auth_token
						});

						uni.removeStorageSync('BellCode')

						this.ws.init(res.data.im_tourists_token, res.data.auth_token)

						this.$http.post(this.$apiObj.MineInfo).then(ress => {
							if (ress.code == 1) {
								uni.setStorageSync('userCont', ress.data)

								try {
									// #ifdef APP-PLUS
									if (!uni.getStorageSync(ress.data.u_id + '_cilent')) {
										uni.getPushClientId({
											success: (info) => {
												let push_clientid = info.cid
												this.$http.post(this.$apiObj
													.MineBindClientId, {
														client_id: push_clientid
													}).then(data => {
													uni.setStorageSync(ress.data.u_id +
														'_cilent', push_clientid)
												})
											},
											fail(err) {
												console.log(err)
											}
										})
									}
									// #endif
								} catch (err) {
									console.log(err)
								} finally {
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/auction/auction'
										});
									}, 1000);
								}
							}
						})

					}
				})
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
	.rebate {
		width: 750rpx;
		min-height: 100vh;
		background: url('/static/images/rebate/rebate_bj.png') no-repeat;
		background-size: 750rpx 100%;
		background-attachment: fixed;

		.header {
			width: 750rpx;
			height: 682rpx;
			background: url('/static/images/rebate/rebate_head.png') no-repeat;
			background-size: 750rpx 682rpx;

			.head {
				position: relative;
				width: 750rpx;
				height: 88rpx;
				padding-top: 88rpx;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				view {
					width: 100%;
					font-size: 60rpx;
					font-weight: 700;
					color: rgb(255, 255, 255);
					text-align: center;
				}

				.left {
					position: absolute;
					left: 32rpx;
				}

				.right {
					position: absolute;
					right: 32rpx;
				}

			}

			.subtitle {
				width: 100%;
				font-size: 36rpx;
				font-weight: 700;
				color: #fff;
				text-align: center;
				margin: 14rpx 0 54rpx 0;
			}

			.bx {
				display: block;
				width: 584rpx;
				height: 416rpx;
				margin: 0 auto;
			}

		}

		.info {
			position: relative;
			width: 686rpx;
			padding: 32rpx 0 40rpx 0;
			background: #fff;
			border-radius: 24rpx;
			margin: -46rpx auto 0 auto;
			z-index: 5;

			.user {
				font-size: 28rpx;
				font-weight: 700;
				color: rgb(51, 51, 51);
				display: flex;
				align-items: center;
				margin-left: 70rpx;

				image {
					display: block;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 24rpx;
				}
			}

			.info_tit {
				width: 100%;
				font-size: 24rpx;
				font-weight: 700;
				color: rgb(51, 51, 51);
				text-align: center;
				margin: 24rpx 0 44rpx 0;
			}

			.switch {
				width: 546rpx;
				height: 76rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border: 2rpx solid rgb(131, 104, 254);
				border-radius: 16rpx;
				margin: 0 auto;

				.switch_info {
					width: 50%;
					height: 76rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: rgb(131, 104, 254);
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 8rpx;
					}
				}

				.switch_select {
					color: #fff;
					background: rgb(131, 104, 254);
					border-radius: 16rpx;
				}

			}

			.send_code {
				width: 646rpx;
				display: flex;
				align-items: center;
				margin: 30rpx auto;

				.btn {
					width: 160rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					font-weight: 700;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgb(131, 104, 254);
					border-radius: 16rpx;
					margin-left: 24rpx;
				}
			}

			.my-input {
				position: relative;
				width: 646rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border: 2rpx solid rgb(179, 132, 255);
				border-radius: 80rpx;
				margin: 30rpx auto 0 auto;

				.logo {
					display: block;
					width: 44rpx;
					height: 44rpx;
					margin: 0 32rpx;
				}

				.pwd {
					position: absolute;
					right: 32rpx;
					width: 36rpx;
					height: 36rpx;
				}

				.input_class {
					width: 460rpx;
				}

				.area {
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					display: flex;
					align-items: center;
					border-right: 4rpx solid rgb(204, 204, 204);

					image {
						width: 20rpx;
						height: 20rpx;
						margin-left: 8rpx;
						margin-right: 24rpx;
					}
				}

			}

		}

		.register {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			font-weight: 700;
			color: rgb(131, 104, 254);
			text-align: center;
			background: rgb(255, 255, 255);
			border-radius: 88rpx;
			margin: 40rpx auto 32rpx auto;
		}

		.xy {
			width: 686rpx;
			display: flex;
			margin: 0 auto;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			view {
				width: 600rpx;
				font-size: 28rpx;
				color: rgb(255, 255, 255);
				margin-left: 12rpx;
			}
		}

	}
</style>