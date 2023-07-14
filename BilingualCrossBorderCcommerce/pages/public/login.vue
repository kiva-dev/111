<template>
	<view class="login-page">
		<view class="login-box">
			<!--login-logo start-->
			<!-- <view class="login-logo">
				<image class="img" src="../../static/images/new/login.png"></image>
			</view> -->
			<view class="login-close">
				<image src="/static/images/new-index/closed.png" @click="toIndex()"></image>
			</view>

			<view class="login-head">
				<view class="tit">{{$t('new.dld')}} <span>KOLIBRI</span></view>
				<view class="info">{{$t('new.havatheproduct')}}</view>
			</view>

			<view class="switchLoginType">
				<view class="info" @click="isNav=2">
					<image src="/static/images/kbrick/login_email.png" class="email" v-show="isNav!=2"></image>
					<image src="/static/images/kbrick/login_email_select.png" class="email" v-show="isNav==2"></image>
					<view class="email_tit" :class="isNav==2?'select_tit':''">Email</view>
				</view>
				<view class="info" @click="isNav=1">
					<view class="phone_tit" :class="isNav==1?'select_tit':''">Phone</view>
					<image src="/static/images/kbrick/login_phone.png" class="phone" v-show="isNav!=1"></image>
					<image src="/static/images/kbrick/login_phone_select.png" class="phone" v-show="isNav==1"></image>
				</view>
			</view>

			<block v-if="isNav==2">
				<view class="email-info">
					<view class="email-input">
						<image src="../../static/images/new-index/email.png" class="logo"></image>
						<view class="email-input-info">
							<u--input :placeholder="$t('login.qsryx')" border="none" v-model="email" />
						</view>
					</view>

					<view class="email-input">
						<image src="../../static/images/new-index/pwd.png" class="logo"></image>
						<view class="email-input-info">
							<u--input type="password" :placeholder="$t('login.qsrmm')" border="none" v-model="pwd"
								v-show="!isShow"></u--input>
							<u--input :placeholder="$t('login.qsrmm')" border="none" v-model="pwd"
								v-show="isShow"></u--input>
						</view>
						<image src="/static/images/new-index/showpwd.png" class="pwd" v-show="isShow"
							@click="isShow=!isShow"></image>
						<image src="/static/images/new-index/hidepwd.png" class="pwd" v-show="!isShow"
							@click="isShow=!isShow"></image>
					</view>

					<view class="email-btm">
						<view style="color: rgb(10, 198, 142);" @click="navClick('register')">{{$t('login.zczh')}}
						</view>
						<view @click="navClick('/pages/public/password')">{{$t('login.wjmm')}}?</view>
					</view>

					<view class="email-btn" @click.stop="$noMultipleClicks(onLoginEmailLogin)">{{$t('login.ljdl')}}
					</view>

				</view>
			</block>

			<!--login-logo end-->
			<block v-if="isNav==1">
				<view class="email-info">
					<view class="email-input">
						<image src="../../static/images/new-index/phone.png" class="logo"></image>
						<view class="phone-qh" @click="navClick('ownership')">{{mobile_area_code}}</view>
						<view class="email-input-info">
							<u--input :placeholder="$t('login.qsrsjh')" border="none" v-model="mobile" />
						</view>
					</view>

					<view class="email-input">
						<image src="../../static/images/new-index/pwd.png" class="logo"></image>
						<view class="email-input-info">
							<u--input type="password" :placeholder="$t('login.qsrmm')" border="none" v-model="pwd"
								v-show="!isShow"></u--input>
							<u--input :placeholder="$t('login.qsrmm')" border="none" v-model="pwd"
								v-show="isShow"></u--input>
						</view>
						<image src="/static/images/new-index/showpwd.png" class="pwd" v-show="isShow"
							@click="isShow=!isShow"></image>
						<image src="/static/images/new-index/hidepwd.png" class="pwd" v-show="!isShow"
							@click="isShow=!isShow"></image>
					</view>

					<view class="email-btm">
						<view style="color: rgb(10, 198, 142);" @click="navClick('register')">{{$t('login.zczh')}}
						</view>
						<view @click="navClick('/pages/public/password')">{{$t('login.wjmm')}}</view>
					</view>

					<view class="email-btn" @click.stop="$noMultipleClicks(onLoginMobileLogin)">{{$t('login.ljdl')}}
					</view>

				</view>
			</block>


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

			<view class="login-other">
				<view class="other-tit">
					<view class="line"></view>
					<view class="t">{{$t('login.qtfsdl')}}</view>
					<view class="line"></view>
				</view>
				<view class="other-ul">
					<!-- <view class="li" v-if="isNav==2" @click="isNav=1">
						<image class="img" src="/static/images/new-index/phone_login.png"></image>
					</view>
					<view class="li" v-else @click="isNav=2">
						<image class="img" src="/static/images/new-index/email_login.png"></image>
					</view> -->
					<view class="li" @click="handleGoogleAuth">
						<image class="img" src="/static/images/new-index/goole.png"></image>
					</view>
					<view class="li" @click="handleFacebookAuth">
						<image class="img" src="/static/images/new-index/facebook.png"></image>
					</view>
				</view>
			</view>

			<view class="login-lan">
				<block v-for="(item,index) in locales" :key="index">
					<text class="t on" @click="onLocaleChange(item)">{{item.text}}</text>
					<text class="t" v-if="index==0">| </text>
				</block>

			</view>

		</view>
	</view>
</template>

<script>
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	// import FB from '@/common/facebook-sdk-en.js'
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
				noClick: true, // 防止重复点击 
				isNav: 2, //2：邮箱登录，1：手机号登录
				mobile_area_code: '', // 区号
				mobile: '', // 手机号码
				pwd: '', // 密码
				email: '', // 邮箱
				facebookInfo: {},
				googleClient: {},
				isQuanShow: false,
				systemLocale: '',
				applicationLocale: '',
				googleSdkLoadStatus: '',
				isShow: false,
				login_front: ''
			}
		},
		computed: {
			locales() {
				return [{
					text: this.$t('locale.zh-hans'),
					code: 'zh-Hans'
				}, {
					text: this.$t('locale.en'),
					code: 'en'
				}, ]
			}
		},
		onLoad() {
			this.login_front = uni.getStorageSync('login_front')
		},
		onShow() {
			// if (uni.getStorageSync('token')) {
			//   uni.navigateBack({ delta: 1 })
			// }
			// plus.navigator.setstatusbarbackground("#000");
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
			// uni.setStorageSync('UNI_LOCALE', 'en')
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
			this.$nextTick(() => {
				// Facebook 👇👇👇👇👇👇👇👇👇👇
				const facebookSdkScript = document.createElement('script')
				facebookSdkScript.src = 'https://connect.facebook.net/en_US/sdk.js'
				facebookSdkScript.onerror = () => {
					console.log('Facebook SDK 加载失败')
					this.facebookSdkLoadStatus = 'fail'
				}
				facebookSdkScript.onload = () => {
					console.log('Facebook SDK 加载成功')
					this.facebookSdkLoadStatus = 'success'
					FB.init({
						// 客户的
						appId: '8119729181402947',
						cookie: true, // enable cookies to allow the server to access
						// the session
						xfbml: true, // parse social plugins on this page
						version: 'v14.0', // Specify the Graph API version to use
					})
				}
				document.body.appendChild(facebookSdkScript)
				// Facebook 👆👆👆👆👆👆👆👆👆👆

				// Google 👇👇👇👇👇👇👇👇👇👇
				const googleSdkScript = document.createElement('script')
				googleSdkScript.src = 'https://accounts.google.com/gsi/client'
				googleSdkScript.onerror = () => {
					console.log('Google SDK 加载失败')
					this.googleSdkLoadStatus = 'fail'
				}
				googleSdkScript.onload = () => {
					console.log('Google SDK 加载成功')
					this.googleSdkLoadStatus = 'success'

					google.accounts.id.initialize({
						// 我的
						// client_id: '332892212901-9clll2shontb4jrd34v7c1them5bfmvu.apps.googleusercontent.com',
						// 客户的
						client_id: '891469343952-d8fa94t5a29bqh1nnsgkav7359sq0chp.apps.googleusercontent.com',
						callback: response => {
							// { clientId: '', credential: '', select_by: '' }
							console.log(response)
							this._googleAuthCallback(response)
						},
					})

					google.accounts.id.renderButton(document.querySelector('.google-login-button'), {
						width: 360, // 最小 200，最大 400，单位 px
						locale: 'en-US',
						// locale: 'en',
						theme: 'outline', // outline filled_blue filled_black
						// theme: 'filled_black', // outline filled_blue filled_black
						shape: 'circle', // rectangular square pill circle
						size: 'large', // large medium small
						text: 'signin_with', // signin signin_with signup_with continue_with
						type: 'icon', // standard icon
						logo_alignment: 'center', // left center
					})

					this.googleButtonInit = true

					// google.accounts.id.prompt()
				}
				document.body.appendChild(googleSdkScript)
				// Google 👆👆👆👆👆👆👆👆👆👆
			})
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: '/pages/auction/auction'
				})
			},
			onLocaleChange(e) {
				// #ifdef H5
				uni.setStorageSync('UNI_LOCALE', e.code)
				uni.setStorageSync('locale', e.code)
				this.$i18n.locale = e.code;
				// #endif
				// #ifdef APP-PLUS
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t('index.language-change-confirm'),
						success: (res) => {
							if (res.confirm) {
								uni.setLocale(e.code);
							}
						}
					})
				} else {
					uni.setLocale(e.code);
					this.$i18n.locale = e.code;
				}
				// #endif
				this.$router.go(0)
			},
			// 手机号登录
			onLoginMobileLogin() {
				if (!this.mobile) return uni.showToast({
					title: this.$t('login.qsrsjhm'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
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
				if (this.isQuanShow == false) return uni.showToast({
					title: this.$t('login.qydxybty'),
					icon: 'none'
				})
				const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
				this.$http.post(this.$apiObj.LoginMobileLogin, {
					mobile_area_code: this.mobile_area_code.slice(1), // 区号
					mobile: this.mobile, // 手机号码
					pwd: pwd, // 密码
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
						this.$http.post(this.$apiObj.MineInfo).then(ress => {
							if (ress.code == 1) {
								uni.setStorageSync('userCont', ress.data)
							}
						})
						this.ws.init(res.data.im_tourists_token, res.data.auth_token)
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/auction/auction'
							});
						}, 1000);
					}
				})
			},
			// 邮箱登录
			onLoginEmailLogin() {
				if (!this.email) return uni.showToast({
					title: this.$t('login.qsryx'),
					icon: 'none'
				})
				if (!this.pwd) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})
				
				if (this.email) {
					var reg_tel = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
					if (!reg_tel.test(this.email)) return uni.showToast({
						title: this.$t('login.qsrzqyx'),
						icon: 'none'
					})
				}
				if (!this.isQuanShow) return uni.showToast({
					title: this.$t('login.qydxybty'),
					icon: 'none'
				})
				const pwd = jsencrypt.setEncrypt(publiukey, String(this.pwd))
				this.$http.post(this.$apiObj.LoginEmailLogin, {
					email: this.email, // 邮箱
					pwd: pwd, // 密码
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

						this.$http.post(this.$apiObj.MineInfo).then(ress => {
							if (ress.code == 1) {
								uni.setStorageSync('userCont', ress.data)
							}
						})
						this.ws.init(res.data.im_tourists_token, res.data.auth_token)

						setTimeout(() => {
							uni.switchTab({
								url: '/pages/auction/auction'
							});
						}, 1000);
					}
				})
			},
			onnavClick(e) {
				if (e == 1) {
					this.mobile = ''
					this.pwd = ''
					this.isNav = 2
				} else if (e == 2) {
					this.email = ''
					this.pwd = ''
					this.isNav = 1
				}
			},
			//导航点击的跳转处理函数
			navClick(url) {
				this.email = ''
				this.pwd = ''
				uni.navigateTo({
					url
				})
			},
			handletwitterAuth() {
				// let aa = 'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=M1M5R3BMVy13QmpScXkzTUt5OE46MTpjaQ&redirect_uri=https://www.example.com&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain'
				// #ifdef H5 
				//  #endif
				// #ifdef APP-PLUS 
				//  #endif
			},
			// Facebook 👇👇👇👇👇👇👇👇👇👇
			// Facebook 登录
			handleFacebookAuth() {
				// #ifdef H5
				if (this.facebookSdkLoadStatus === '') {
					const message = 'Please try again later'
					util.showError({
						message
					})
					return
				} else if (this.facebookSdkLoadStatus === 'fail') {
					const message = 'Network error, please refresh and try again'
					util.showError({
						message
					})
					return
				}
				FB.login(
					response => {
						// handle the response
						console.log('response', response)
						if (response.status === 'connected') {
							// 登录到您的网页和 Facebook。
							console.log('登录到您的网页和 Facebook。')

							FB.api('/me', {
								fields: 'id,name,first_name,middle_name,last_name,short_name,name_format,picture.width(120).height(120),email'
							}, async result => {
								console.log(result)
								this.$http.post(this.$apiObj.LoginThirdPartyLogin, {
									type: 2, // 1google, 2facebook, 3twitter
									third_id: result.id, // 第三方账号唯一标识
								}).then(res => {
									if (res.code == 1) {
										console.log(res)
										uni.showToast({
											title: this.$t('login.dlcg'),
											icon: 'none'
										})
										uni.setStorageSync('token', res.data.token)
										this.$http.post(this.$apiObj.MineInfo).then(ress => {
											if (ress.code == 1) {
												uni.setStorageSync('userCont', ress.data)
											}
										})
										setTimeout(() => {
											uni.switchTab({
												url: '/pages/auction/auction'
											});
										}, 1000);
									} else if (res.code == 7) {
										uni.navigateTo({
											url: '/pages/public/logins?type=2&third_id=' +
												result.id
										})
									}
								})
								// 加载中
								// const elLoading = this.$loading({
								//   text: 'Signing in...',
								//   background: 'rgba(255, 255, 255, 0.9)',
								// })
								const loginResult = await data.facebookLogin(result.id).finally()

								console.log('/index/login/facebook_login 返回的信息', loginResult)
								if (loginResult.code === 0) {
									util.setToken(loginResult.data.token)
									window.location.href = '/'
								} else {
									sessionStorage.setItem('authType', 'facebook')
									sessionStorage.setItem('facebookId', result.id)
									location.href = '/login/bindemail.html'
								}
							})
						} else {
							// 未登录您的网页，或者我们无法判断。
							console.log('未登录您的网页，或者我们无法判断。')
							const message = 'Authorization failed (unknown error)'
							util.showError({
								message
							})
						}
					}, {
						scope: 'email'
					}
				)
				//  #endif
				// #ifdef APP-PLUS
				uni.login({
					provider: 'facebook',
					success: (loginRes) => {
						console.log(loginRes);
						this.$http.post(this.$apiObj.LoginThirdPartyLogin, {
							type: 2,
							third_id: loginRes.authResult.openid
						}).then(res => {
							// console.log('res值：');
							// console.log(res);
							if (res.code == 1) {
								uni.showToast({
									title: this.$t('login.dlcg'),
									icon: 'none'
								})
								uni.setStorageSync('token', res.data.token)
								this.$http.post(this.$apiObj.MineInfo).then(ress => {
									if (ress.code == 1) {
										uni.setStorageSync('userCont', ress.data)
									}
								})
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/auction/auction'
									});
								}, 1000);
							} else if (res.code == 7) {
								uni.navigateTo({
									url: '/pages/public/logins?type=2&third_id=' + loginRes
										.authResult.openid
								})
							}

						})
						// 登录成功
						//  uni.getUserInfo({
						//      provider: 'facebook',
						//      success:(info) => {
						// console.log(info);
						//          // 获取用户信息成功, info.authResult保存用户信息
						//      }
						//  })
					},
					fail: function(err) {
						console.log(err);
						// 登录授权失败  
						// err.code是错误码
					}
				});
				//  #endif
			},
			// Facebook 👆👆👆👆👆👆👆👆👆👆

			// Google 👇👇👇👇👇👇👇👇👇👇
			handleGoogleAuth() {
				// #ifdef H5
				// console.log('H5端');
				if (this.googleSdkLoadStatus === '') {
					const message = 'Please try again later'
					util.showError({
						message
					})
					return
				} else if (this.googleSdkLoadStatus === 'fail') {
					const message = 'Network error, please refresh and try again'
					util.showError({
						message
					})
					return
				}
				console.log(google)
				//  #endif
				// #ifdef APP-PLUS
				uni.login({
					provider: 'google',
					success: (loginRes) => {
						console.log(loginRes.authResult.openid);
						this.$http.post(this.$apiObj.LoginThirdPartyLogin, {
							type: 1, // 1google, 2facebook, 3twitter
							third_id: loginRes.authResult.openid, // 第三方账号唯一标识
						}).then(res => {
							if (res.code == 1) {
								uni.showToast({
									title: this.$t('login.dlcg'),
									icon: 'none'
								})
								uni.setStorageSync('token', res.data.token)
								this.$http.post(this.$apiObj.MineInfo).then(ress => {
									if (ress.code == 1) {
										uni.setStorageSync('userCont', ress.data)
									}
								})
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/auction/auction'
									});
								}, 1000);
							} else if (res.code == 7) {
								uni.navigateTo({
									url: '/pages/public/logins?type=1&third_id=' + loginRes
										.authResult.openid
								})
							}
						})
					},
					fail: function(err) {
						console.log(err);
						// 登录授权失败  
						// err.code是错误码
					}
				});
				//  #endif
			},
			// Google 授权回调
			async _googleAuthCallback(response) {
				console.log('google response', response)
				this.onLoginThirdPartyLogin(response, 1)

				const googleResult = await request({
					url: 'https://oauth2.googleapis.com/tokeninfo',
					method: 'get',
					params: {
						id_token: response.credential
					},
				}).finally(() => {
					console.log();
				})

				const loginResult = await server.googleLogin(googleResult.sub).finally(() => {
					console.log();
				})

				if (loginResult.code === 0) {
					util.setToken(loginResult.data.token)
					window.location.href = '/'
				} else {
					sessionStorage.setItem('authType', 'google')
					sessionStorage.setItem('googleId', googleResult.sub)
					location.href = '/index/login/bindemail.html'
				}
			},
			// Google 👆👆👆👆👆👆👆👆👆👆
			// 授权登录没有登录注册
			onLoginThirdPartyLogin(response, e) {
				this.$http.post(this.$apiObj.LoginThirdPartyLogin, {
					type: e, // 1google, 2facebook, 3twitter
					third_id: response.clientId, // 第三方账号唯一标识
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.dlcg'),
							icon: 'none'
						})
						uni.setStorageSync('token', res.data.token)
						this.$http.post(this.$apiObj.MineInfo).then(ress => {
							if (ress.code == 1) {
								uni.setStorageSync('userCont', ress.data)
							}
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/auction/auction'
							});
						}, 1000);
					} else if (res.code == 7) {
						uni.navigateTo({
							url: '/pages/public/logins?type=' + e + '&third_id=' + response.clientId
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-page {
		.login-box {
			padding: 30rpx;

			.switchLoginType {
				position: relative;
				width: 332rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border: 1rpx solid rgb(10, 198, 142);
				border-radius: 80rpx;
				margin: 64rpx 0 0 18rpx;

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

			//关闭
			.login-close {
				width: 100%;
				height: 88rpx;
				padding-top: 88rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-left: 2rpx;
				}
			}

			//登录标语
			.login-head {
				margin-top: 104rpx;
				margin-left: 18rpx;

				.tit {
					font-size: 48rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);

					span {
						font-size: 60rpx;
						color: rgb(10, 198, 142);
						margin-left: 8rpx;
					}
				}

				.info {
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					margin-top: 16rpx;
				}
			}

			//邮箱登录
			.email-info {
				width: 100%;
				margin-top: 32rpx;

				.email-input {
					width: 654rpx;
					height: 88rpx;
					display: flex;
					align-items: center;
					background: rgb(241, 241, 241);
					border-radius: 16rpx;
					margin: 0 0 32rpx 18rpx;

					.logo {
						width: 48rpx;
						height: 48rpx;
						margin: 0 32rpx;
					}

					.phone-qh {
						width: 70rpx;
						font-size: 28rpx;
						color: rgb(51, 51, 51);
						text-align: center;
					}

					.email-input-info {
						width: 460rpx;
					}

					.pwd {
						display: block;
						width: 36rpx;
						height: 36rpx;
						margin-left: 10rpx;
					}
				}

				.email-btm {
					width: 654rpx;
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					margin-left: 18rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.email-btn {
					width: 654rpx;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 36rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgba(10, 198, 142, 1);
					border-radius: 88rpx;
					margin: 48rpx auto;
				}

			}

			.login-logo {
				padding: 150rpx 0 100rpx 0;
				width: 300rpx;
				height: 300rpx;
				margin: 0 auto;
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
						width: 130rpx;

						.line {
							width: 2rpx;
							height: 40rpx;
							margin-right: 20rpx;
							background: #eeeeee;
						}
					}

					.label {
						width: 124rpx;
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

			.login-flex {
				display: flex;
				align-items: center;
				justify-content: space-between;
				line-height: 1;
				padding: 35rpx;
				font-size: 26rpx;
			}

			.login-bot {
				margin: 5rpx 0 35rpx;
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

			.login-other {
				margin-top: 170rpx;

				.other-tit {
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 1;

					.t {
						font-size: 26rpx;
						margin: 0 20rpx;
					}

					.line {
						width: 189rpx;
						height: 2rpx;
						background: #eeeeee;
					}
				}

				.other-ul {
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					margin-top: 50rpx;

					.li {
						width: 90rpx;
						height: 90rpx;
						margin: 15rpx 28rpx;
					}
				}
			}

			.login-lan {
				padding: 70rpx 0 42rpx 0;
				display: flex;
				justify-content: center;
				font-size: 28rpx;

				.t {
					margin: 0 10rpx;
				}

				.on {
					color: rgb(10, 198, 142);
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