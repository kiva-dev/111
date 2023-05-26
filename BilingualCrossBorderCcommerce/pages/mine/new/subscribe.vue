<template>
	<view class="subscribe">
		<view class="collect-header">
			<image src="../../../static/images/new/left.png" @click="toMine"></image>
			<view>{{$t('user.myCont.dysp')}}</view>
		</view>

		<view class="subscribe-item" v-for="(item,i) in subscribeList">
			<view class="subscribe-item-top">
				<image :src="item.shop_logo" class="subscribe-item-img"></image>
				<view class="subscribe-item-top-info">
					<view class="subscribe-item-name">{{ item.shop_name }}</view>
					<!-- <view class="subscribe-item-des" v-show="!isShowAll">
						{{ item.shop_info ? item.shop_info.substr(0,40) : '' }}</view> -->
					<view class="subscribe-item-des-info" >
						{{ item.shop_info }}
						<!-- <image src="../../../static/images/new/shouqi.png" @click="isShowAll=!isShowAll"></image> -->
					</view>
					<!-- <image src="../../../static/images/new/zhankai.png" class="subscribe-item-zk"
						@click="isShowAll=!isShowAll" v-show="!isShowAll"></image> -->

				</view>
			</view>
			<!-- <view class="subscribe-item-list">
				<image src="../../../static/images/new/ipad.png" v-for="(item,i) in [1,1,1]" :key="i"
					:style="i%3==1?'margin: 0 24rpx;':''"></image>
			</view> -->
		</view>

		<view class="subscribe-not">已经到底啦~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subscribeList: [], // 商铺列表
				isShowAll: false
			}
		},
		onLoad() {
			// 收藏店铺
			this.onAuctionNewGoods()
		},
		methods: {
			toMine() {
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			},
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.MineFocusSubscribe, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						this.subscribeList = this.page == 1 ? res.data.data : [...this.subscribeList, ...res.data
							.data
						]
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.subscribe {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 30rpx;
		background: rgb(248, 248, 248);
	}

	//头部
	.collect-header {
		position: relative;
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		padding-top: 50rpx;
		background: rgb(255, 255, 255);
		margin-bottom: 30rpx;

		image {
			position: absolute;
			width: 60rpx;
			height: 60rpx;
			left: 20rpx;
			z-index: 10;
		}

		view {
			width: 100%;
			font-size: 36rpx;
			font-weight: bold;
			color: rgb(255, 78, 47);
			text-align: center;
		}
	}

	//内容
	.subscribe-item {
		width: 100%;
		padding: 30rpx 0;
		background: #fff;
		border-bottom: 1rpx solid #BEBEBE;

		.subscribe-item-top {
			width: 100%;
			display: flex;
			margin-bottom: 20rpx;
		}

		.subscribe-item-img {
			width: 108rpx;
			height: 108rpx;
			border-radius: 50%;
			margin-left: 30rpx;
		}

		.subscribe-item-top-info {
			margin-left: 30rpx;

		}

		.subscribe-item-zk {
			display: block;
			width: 20rpx;
			height: 20rpx;
			margin: 10rpx auto 0 auto;
		}

		.subscribe-item-name {
			max-width: 300rpx;
			font-size: 32rpx;
			color: #FF4E2F;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

		}

		.subscribe-item-des {
			width: 512rpx;
			font-size: 24rpx;
			color: #2C2C2C;
			margin-top: 10rpx;
		}

		.subscribe-item-des-info {
			width: 512rpx;
			font-size: 24rpx;
			color: #2C2C2C;
			word-break: break-all;
			padding: 10rpx 6rpx;
			border-radius: 16rpx;
			z-index: 10;

			image {
				display: block;
				width: 20rpx;
				height: 20rpx;
				margin: 0 auto;
			}
		}

		.subscribe-item-list {
			width: 588rpx;
			display: flex;
			align-items: center;
			margin: 0 auto;

			image {
				width: 180rpx;
				height: 180rpx;
			}
		}

	}

	.subscribe-not {
		width: 100%;
		font-size: 24rpx;
		color: rgb(190, 190, 190);
		text-align: center;
		margin: 50rpx 0;
	}
</style>