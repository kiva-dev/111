<template>
	<view class="bind-page">

		<view style="height: 24rpx;"></view>
		<view class="tips">
			<span>*Tips</span>: For the security of your account funds, bind your bank card Only limited to bank card
			accounts corresponding to real-name authentication
		</view>

		<view class="bind-box">
			<view class="li">
				<view class="label"><text>*</text>{{$t('user.bank.yhzh')}}</view>
				<input class="input" placeholder-class="color-999" v-model="account"
					:placeholder="$t('user.bank.qsryhkh')" />
			</view>
			<view class="li">
				<view class="label"><text>*</text>{{$t('user.bank.khyh')}}</view>
				<input class="input" placeholder-class="color-999" v-model="bank_name"
					:placeholder="$t('user.bank.qsrkhyh')" />
			</view>
			<view class="li">
				<view class="label"><text>*</text>{{$t('user.bank.ckr')}}</view>
				<input class="input" placeholder-class="color-999" v-model="name"
					:placeholder="$t('user.bank.qsrckrxm')" />
			</view>
			<view class="li">
				<view class="label">{{$t('user.bank.gjhkdm')}}</view>
				<input class="input" placeholder-class="color-999" v-model="swift_code"
					:placeholder="$t('user.bank.qsrgjhkdm')" />
			</view>
			<view class="li">
				<view class="label">{{$t('user.bank.yhklx')}}</view>
				<view class="li-r">
					<text>{{$t('user.bank.cxk')}}</text>
				</view>
			</view>

		</view>

		<view class="card-btn">
			<button class="public-btn" style="background: rgb(10, 198, 142);"
				@click.stop="$noMultipleClicks(onMineAddBankCard)" v-show="!edit">{{$t('user.bank.qrbd')}}</button>
			<button class="public-btn" style="background: rgb(10, 198, 142);"
				@click.stop="$noMultipleClicks(onMineUpdateBank)" v-show="edit">{{$t('user.phone.qrxg')}}</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				account: '', // 银行卡账号
				bank_name: '', // 银行
				name: '', // 姓名
				swift_code: '', // 国际代码
				username: '', // 实名信息
				id: 0,
				edit: false
			}
		},
		onLoad(e) {
			if (e.data) {
				let data = JSON.parse(e.data)
				console.log(data)
				if (data.create_status == 1) {
					this.swift_code = data.swift_code
					this.account = data.account
					this.name = data.name
					this.bank_name = data.bank_name
					this.edit = true
					this.id = data.id
				}else{
					this.swift_code = data.audit_swift_code
					this.account = data.audit_account
					this.name = data.audit_name
					this.bank_name = data.audit_bank_name
					this.edit = true
					this.id = data.id
				}

			}
		},
		onShow() {
			// 实名认证
			this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
				if (res.code == 1) {
					this.username = res.data.firstName
				}
			})
		},
		methods: {
			onMineUpdateBank() {
				if (!this.account) return uni.showToast({
					title: this.$t('user.bank.qsryhkh'),
					icon: 'none'
				})
				if (!this.bank_name) return uni.showToast({
					title: this.$t('user.bank.qsrkhyh'),
					icon: 'none'
				})
				if (!this.name) return uni.showToast({
					title: this.$t('user.bank.qsrckrxm'),
					icon: 'none'
				})
				if (this.username != this.name) return uni.showToast({
					title: this.$t('usernames'),
					icon: 'none'
				})
				this.$http.post(this.$apiObj.MineUpdateBank, {
					user_bank_id: this.id,
					account: this.account,
					bank_name: this.bank_name,
					name: this.name,
					swift_code: this.swift_code
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('mine.send_setting'),
							icon: 'none',
							duration: 3000,
							success: () => {
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							}
						})
					}
				})
			},
			onMineAddBankCard() {
				if (!this.account) return uni.showToast({
					title: this.$t('user.bank.qsryhkh'),
					icon: 'none'
				})
				if (!this.bank_name) return uni.showToast({
					title: this.$t('user.bank.qsrkhyh'),
					icon: 'none'
				})
				if (!this.name) return uni.showToast({
					title: this.$t('user.bank.qsrckrxm'),
					icon: 'none'
				})
				// if (!this.swift_code) return uni.showToast({ title: '请输入国际汇款代码', icon: 'none' })
				if (this.username != this.name) return uni.showToast({
					title: this.$t('usernames'),
					icon: 'none'
				})
				this.$http.post(this.$apiObj.MineAddBankCard, {
					account: this.account, // 银行卡账号
					bank_name: this.bank_name, // 银行
					name: this.name, // 姓名
					swift_code: this.swift_code, // 国际代码
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.bank.tjcg'),
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
					url: './bank'
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.bind-page {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.tips {
			width: 686rpx;
			line-height: 36rpx;
			font-size: 24rpx;
			color: rgb(153, 153, 153);
			word-break: break-all;
			margin: 0 auto 24rpx auto;

			span {
				color: rgb(255, 57, 57);
			}
		}

		.bind-box {
			width: 686rpx;
			background: #fff;
			border-radius: 20rpx;
			margin: 0 auto;

			.li {
				position: relative;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #f5f5f5;
				padding: 30rpx 0;
				font-size: 28rpx;

				.label {
					max-width: 200rpx;
					word-break: break-all;
					margin-left: 32rpx;
					display: flex;
					align-items: center;

					text {
						color: #ff3939;
						margin-top: 10rpx;
					}
				}

				.input {
					position: absolute;
					right: 32rpx;
					width: 400rpx;
					margin-left: 20rpx;
					text-align: right;
					font-size: 28rpx;
				}

				.li-r {
					position: absolute;
					right: 32rpx;

					.more {
						width: 10rpx;
						height: 19rpx;
						margin-left: 15rpx;
					}
				}
			}
		}

		.card-btn {
			width: 686rpx;
			margin: 80rpx auto;
		}

	}
</style>