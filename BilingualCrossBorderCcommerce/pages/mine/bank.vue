<template>
	<view class="bank-page">

		<view class="bank-box">

			<view class="bank-hd">
				<view class="t">
					{{$t('user.bank.wdk')}}
					<text class="tc">({{$t('user.bank.gong')}}{{CardList.length}})</text>
				</view>
				<view class="add" @click="onBindClick">
					<text>{{$t('user.bank.tjyhzh')}}</text>
				</view>
			</view>
			
			<view class="bank-ul">
				<view v-for="item,k in CardList" :key="k" class="bank-li" :class="k%3==1?'green':k%3==2?'blue':''"
					@click="onClick(item)">
					<view class="li-hd">
						<view class="hd-fl">
							<view class="li-logo">
								<view class="logo">
									<image class="img" src="../../static/images/bank1.png"></image>
								</view>
							</view>
							<view class="t">{{item.bank_name}}{{$t('user.bank.cxk')}}</view>
						</view>
						<button class="li-btn" @click.stop="onseach(item)">{{$t('user.bank.jcbd')}}</button>
					</view>
					<view class="li-bd">**** **** **** {{item.account.substr(-4)}}</view>
				</view>

			</view>
			
		</view>
		
		<uni-popup ref="popup1" type="center">
			<view class="public-pop">
				<view class="pop-con">
					<view class="pop-t">{{$t('user.bank.tishi')}}</view>
					<view class="pop-c">{{$t('user.bank.nqdyjf')}}{{name}}{{$t('user.bank.ma')}}？</view>
					<view class="pop-b">
						<button class="pop-btn" @click="toggleClose">{{$t('user.bank.query')}}</button>
						<button class="pop-btn red"
							@click.stop="$noMultipleClicks(onMineDelBankCard)">{{$t('user.bank.btnsub')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				CardList: [],
				id: '',
				name: '',
				status: '', // 实名认证
			}
		},
		onShow() {
			// 实名认证
			this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
				if (res.code == 1) {
					this.status = res.data.status
				}
			})
			// 银行卡列表
			this.onMineBankCardList()
		},
		methods: {
			onClick(item) {
				uni.setStorageSync('yhkList', item)
				uni.showToast({
					title: this.$t('user.bank.qhyhkcg'),
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1500);
			},
			onBindClick() {
				if (this.status) {
					uni.navigateTo({
						url: "./bindingB"
					})
				} else {
					uni.showToast({
						title: this.$t('shimingrenzheng'),
						icon: 'none'
					})
				}
			},
			// 银行卡列表
			onMineBankCardList() {
				this.$http.post(this.$apiObj.MineBankCardList).then(res => {
					if (res.code == 1) {
						this.CardList = res.data
					}
				})
			},
			onseach(item) {
				this.id = item.id
				this.name = item.bank_name + item.account.substr(-4)
				this.$refs.popup1.open()
			},
			toggleClose() {
				this.$refs.popup1.close()
			},
			// 解除银行卡
			onMineDelBankCard() {
				this.$http.post(this.$apiObj.MineDelBankCard, {
					bank_id: this.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.bank.jccg'),
							icon: 'none'
						})
						this.onMineBankCardList()
						this.$refs.popup1.close()
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
	.bank-page {
		.bank-box {
			padding: 40rpx 30rpx;

			.bank-hd {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.t {
					font-size: 28rpx;
					font-weight: 550;
				}

				.tc {
					color: #999;
					font-size: 26rpx;
					font-weight: normal;
				}

				.add {
					display: flex;
					align-items: center;
					height: 60rpx;
					border-radius: 30rpx;
					padding: 0 20rpx;
					font-size: 26rpx;
					color: rgb(153, 153, 153);
					box-sizing: border-box;
					border: 1rpx solid rgb(10, 198, 142);

					.icon {
						width: 19rpx;
						height: 20rpx;
						margin-right: 15rpx;
					}
				}
			}

			.bank-ul {
				margin-top: 40rpx;

				.bank-li {
					margin: 20rpx 0;
					background: url('/static/images/kbrick/bank_bj.png') no-repeat;
					background-size: 100% 100%;
					border-radius: 30rpx;
					padding: 30rpx;

					.li-hd {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.hd-fl {
							display: flex;
							align-items: center;

							.li-logo {
								width: 80rpx;
								height: 80rpx;
								background: #ffffff;
								border-radius: 50%;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 25rpx;

								.logo {
									width: 80rpx;
									height: 80rpx;
								}
							}

							.t {
								font-size: 28rpx;
								color: #fff;
							}
						}

						.li-btn {
							width: 140rpx;
							height: 55rpx;
							border: 2rpx solid rgba(255, 255, 255, 0.5);
							border-radius: 10rpx;
							padding: 0;
							margin: 0;
							line-height: 55rpx;
							font-size: 24rpx;
							color: #fff;
						}
					}

					.li-bd {
						padding: 50rpx 0 30rpx 0;
						font-size: 44rpx;
						color: #fff;
						text-align: center;
					}
				}

				.bank-li.green {
					background: #009174;
				}

				.bank-li.blue {
					background: #003a90;
				}
			}
		}
	}
</style>