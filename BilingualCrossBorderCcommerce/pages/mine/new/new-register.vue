<template>
	<view class="new-register">
		<image src="/static/images/new/jiarubaoxian.png" class="new-register-head" v-if="!isShopCont"></image>
		<image src="/static/images/new/jiarubaoxian-en.png" class="new-register-head" v-else></image>
		<image :src="userCont.avatar" class="new-register-auth"></image>
		<view class="new-register-tit">{{$t('new.ndhy')}} [<span>{{userCont.nickname}}</span>] {{$t('new.hnyql')}}</view>

		<view class="new-register-input">
			<image src="/static/images/new/new-yx.png"></image>
			<view class="my-input">
				<u--input :placeholder="$t('user.Vemail.qsremail')" border="none"
					placeholderStyle="font-size:28rpx;color:rgb(190, 190, 190);" v-model="email"></u--input>
			</view>
		</view>

		<view class="new-register-yq">
			<view class="new-register-input" style="width: 500rpx;margin: 0;">
				<image src="/static/images/new/new-yzm.png"></image>
				<view class="my-input" style="width: 260rpx;">
					<u--input :placeholder="$t('user.Vemail.qsryzm')" border="none"
						placeholderStyle="font-size:28rpx;color:rgb(190, 190, 190);" v-model="code"></u--input>
				</view>
			</view>
			<view class="new-register-yq-btn" @click.stop="$noMultipleClicks(onLoginSendEmailCode)">
				{{codeTxt}}
			</view>
		</view>

		<view class="new-register-input">
			<image src="/static/images/new/new-mm.png"></image>
			<view class="my-input">
				<u--input :placeholder="$t('user.order.qsrmm')" border="none" type="password"
					placeholderStyle="font-size:28rpx;color:rgb(190, 190, 190);" v-model="password"></u--input>
			</view>
		</view>

		<view class="new-register-input">
			<image src="/static/images/new/new-qdmm.png"></image>
			<view class="my-input">
				<u--input :placeholder="$t('login.qqrmm')" border="none" type="password"
					placeholderStyle="font-size:28rpx;color:rgb(190, 190, 190);" v-model="confirmPassword"></u--input>
			</view>
		</view>

		<view class="new-register-input">
			<image src="/static/images/new/new-yqm.png"></image>
			<view class="my-input">
				<u--input :placeholder="$t('login.qsryqm')" border="none"
					placeholderStyle="font-size:28rpx;color:rgb(190, 190, 190);" v-model="yqCode"></u--input>
			</view>
		</view>

		<view class="new-register-btn" @click.stop="$noMultipleClicks(onLoginEmailRegister)">{{$t('login.zc')}}</view>

		<view class="new-register-xieyi">
			<u-checkbox-group v-model="select" placement="column">
				<u-checkbox activeColor="rgb(255, 78, 47)" shape="circle" v-for="(item, index) in checkList"
					:name="item.id"></u-checkbox>
			</u-checkbox-group>
			<view class="new-register-xieyi-txt">
				{{$t('login.shcg')}}<span @click="navClick('/pages/mine/ptfwxy')">《{{$t('login.ptfwxy')}}》</span><span
					@click="navClick('/pages/mine/ysxy')">《{{$t('user.xitong.Privacyagreement')}}》</span><span
					@click="navClick('/pages/mine/agreement')">《{{$t('top.yhxy')}}》</span>
			</view>
		</view>

	</view>
</template>

<script>
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	const publiukey = `-----BEGIN PUBLIC KEY-----
	MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
	c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
	UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
	NoR+zv3KaEmPSHtooQIDAQAB
	-----END PUBLIC KEY-----`

	export default {
		data() {
			return {
				noClick: true,
				second: 60,
				email: '',
				code: '',
				password: '',
				confirmPassword: '',
				yqCode: '',
				select: [],
				checkList: [{
					id: 1,
					name: 'select'
				}],
				isShopCont: false, // 中文还是英文
				codeTxt: this.$t('login.getcode'),
				userCont: {}
			}
		},
		onLoad(e) {
			if (e.invite_code) this.yqCode = e.invite_code
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			//获取用户信息
			getInfo() {
				this.$http.post(this.$apiObj.GetCodeInfo, {
					code: this.yqCode
				}).then(res => {
					this.userCont = res.data
				})
			},
			// 获取邮箱验证码
			onLoginSendEmailCode() {
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
				uni.showLoading({
					title: '请求中',
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
						this.second = 60
						this.codeTxt = this.$t('login.hqyzm')
					}
				}, 1000)
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
				if (!this.password) return uni.showToast({
					title: this.$t('login.qsrmm'),
					icon: 'none'
				})
				// console.log(this.pwd);
				if (this.password) {
					// 验证由数字,大写字母,小写字母,特殊符,至少其中三种组成密码
					// var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,16}$/;
					let reg =
						/(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%&*~()-+=]+$)(?![0-9\\W_!@#$%^&*()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`()-+=]{8,16}$/
					if (!reg.test(this.password)) return uni.showToast({
						title: this.$t('pwdcd'),
						icon: 'none'
					})
				}
				if (!this.confirmPassword) return uni.showToast({
					title: this.$t('login.qqrmm'),
					icon: 'none'
				})
				if (this.password !== this.confirmPassword) return uni.showToast({
					title: this.$t('login.lcmmbyzqcxsr'),
					icon: 'none'
				})
				if (this.select.length < 1) return uni.showToast({
					title: this.$t('login.qydxybty'),
					icon: 'none'
				})
				const password = jsencrypt.setEncrypt(publiukey, String(this.password))
				uni.showLoading({
					title: '请求中',
					mask: true
				});
				this.$http.post(this.$apiObj.LoginEmailRegister, {
					pwd: password, // 密码
					pwd2: password, // 再次输入的密码
					invite_code: this.yqCode, // 邀请码
					email: this.email, // 邮箱
					email_code: this.code, // 邮箱验证码
				}).then(res => {
					if (res.code == 1) {
						uni.removeStorageSync('invite_code')
						uni.showToast({
							title: this.$t('login.zccg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/public/login'
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
		}
	}
</script>

<style lang="less" scoped>
	.new-register {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: rgb(255, 231, 221);
	}

	.new-register-head {
		display: block;
		width: 100%;
		height: 760rpx;
	}

	.new-register-auth {
		display: block;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin: -100rpx auto 0 auto;
	}

	.new-register-tit {
		width: 100%;
		font-size: 24rpx;
		color: rgb(255, 78, 47);
		text-align: center;
		margin: 10rpx 0 40rpx 0;

		span {
			font-size: 32rpx;
			font-weight: bold;
			margin: 0 10rpx;
		}
	}

	.new-register-input {
		width: 686rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		border: 2rpx solid rgb(255, 78, 47);
		border-radius: 50rpx;
		margin: 0 auto 30rpx auto;

		image {
			width: 60rpx;
			height: 60rpx;
			margin-left: 40rpx;
		}

		.my-input {
			width: 520rpx;
			margin-left: 40rpx;
		}

	}

	.new-register-yq {
		width: 686rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto 30rpx auto;

		.new-register-yq-btn {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(255, 78, 47);
			border-radius: 16rpx;
		}
	}

	.new-register-btn {
		width: 686rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 40rpx;
		color: rgb(255, 255, 255);
		text-align: center;
		background: rgb(255, 78, 47);
		border-radius: 16rpx;
		margin: 60rpx auto 0 auto;
	}

	.new-register-xieyi {
		width: 686rpx;
		font-size: 20rpx;
		color: rgb(190, 190, 190);
		display: flex;
		margin: 18rpx auto 0 auto;

		span {
			color: rgb(44, 44, 44);
		}

		.new-register-xieyi-txt {
			width: 638rpx;
			word-break: break-all;
		}

	}
</style>