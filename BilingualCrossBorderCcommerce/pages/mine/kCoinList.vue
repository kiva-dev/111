<template>
	<view class="points-detail">
		<view class="points-detail-content">
			<view class="points-detail-head">
				<image src="/static/images/auth/left.png" @click="toReturn()"></image>
				<view>{{$t('new.wdkb')}}</view>
			</view>

			<view class="points-detail-info">
				<view class="points-detail-info-num">
					<view>{{kCoinWallet * 1 || 0}}</view>
				</view>
				<view class="points-detail-info-txt">{{$t('new.wdkb')}}</view>
				<view class="what" @click="navClick('/pages/mine/K_coin_introduction')">{{$t('k_icon_what')}}<image src="/static/images/new-index/what.png"></image></view>
			</view>

			<view class="list">
				<view class="list-tit">{{$t('new.kbmx')}}</view>
				<template v-if="list.length > 0">
					<view class="item" v-for="(item,i) in list" :key="i" :style="list.length==(i+1)?'border-bottom: none;':''">
						<view class="item-info">
							<view class="item-name">{{isShopCont ? item.memo_en : item.memo}}</view>
							<view class="item-time">{{$u.timeFormat(item.addtime, 'yyyy/mm/dd hh:MM:ss')}}</view>
						</view>
						<view class="item-price">{{ item.money * 1 * 1 > 0 ? '+' : '' }}{{item.money * 1 || 0}}</view>
					</view>
				</template>
				<template v-else>
					<uni-empty image="/static/images/mine/order_icon_null.png" :message="$t('home.zanwushuju')"></uni-empty>
				</template>
			</view>
		</view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				kCoinWallet: 0,
				isShopCont:false
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
		},
		mounted() {
			this.getPointInfo()
		},
		methods: {
			toReturn() {
				uni.navigateBack()
			},
			getPointInfo() {
				let userCont = uni.getStorageSync('userCont')
				this.$http.post(this.$apiObj.kCoinList).then(res => {
					this.list = res.data.data
				})

				this.$http.post(this.$apiObj.MineInfo).then(res => {
					this.kCoinWallet = res.data.k_coin_wallet
				})
			},
			navClick(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.points-detail {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.points-detail-content {
			width: 100%;
			height: 526rpx;
			background: url('/static/images/new-index/kCoinListTopBg.png') no-repeat;
			background-size: 100% 526rpx;
		}

		.points-detail-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				position: absolute;
				left: 20rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
			}

		}

		.points-detail-info {
			width: 100%;
			margin: 50rpx auto 0 auto;
			
			.what{
				width: 100%;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 40rpx;
				
				image{
					display: block;
					width: 24rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}

			.points-detail-info-num {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 48rpx;
					height: 48rpx;
				}

				view {
					font-size: 64rpx;
					color: rgb(255, 255, 255);
					margin-left: 16rpx;
				}
			}

			.points-detail-info-txt {
				width: 100%;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				margin-top: 32rpx;
			}

		}

		.points-detail-tit {
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 50rpx;
			margin-bottom: 32rpx;

			.points-detail-tit-line {
				width: 8rpx;
				height: 40rpx;
				background: rgb(255, 179, 0);
				border-radius: 4rpx;
				margin: 0 12rpx 0 42rpx;
			}

			.points-detail-tit-des {
				font-size: 32rpx;
				color: rgb(44, 44, 44);
			}

		}

		.points-detail-item {
			position: relative;
			width: 686rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);
			border-radius: 16rpx;
			box-shadow: 0px 2rpx 5rpx rgba(44, 44, 44, 0.1);
			margin: 0 auto 20rpx auto;

			image {
				width: 60rpx;
				height: 60rpx;
				margin-left: 32rpx;
			}

			.points-detail-item-info {
				max-width: 420rpx;
				margin-left: 30rpx;

				.points-detail-item-info-txt {
					width: 100%;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.points-detail-item-info-time {
					font-size: 20rpx;
					color: rgb(190, 190, 190);
					margin-top: 12rpx;
				}

			}

			.points-detail-item-price {
				position: absolute;
				right: 28rpx;
				font-size: 28rpx;
				color: rgb(44, 44, 44);
			}

		}

		//数据
		.list {
			width: 750rpx;
			min-height: 800rpx;
			padding-top: 32rpx;
			background: #fff;
			border-radius: 24rpx 24rpx 0 0;
			margin-top: 82rpx;

			.list-tit {
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin-left: 32rpx;
				margin-bottom: 32rpx;
			}

			.item {
				position: relative;
				width: 686rpx;
				height: 144rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				margin: 0 auto;

				image {
					width: 64rpx;
					height: 64rpx;
					margin: 0 16rpx 0 0;
				}

				.item-info {
					width: 460rpx;
					margin-right: 8rpx;

					.item-name {
						max-width: 100%;
						font-size: 28rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.item-time {
						font-size: 24rpx;
						color: rgb(153, 153, 153);
						margin-top: 18rpx;
					}
				}

				.item-price {
					position: absolute;
					right: 0;
					font-size: 32rpx;
					color: rgb(10, 198, 142);
				}

			}

		}
	}
</style>