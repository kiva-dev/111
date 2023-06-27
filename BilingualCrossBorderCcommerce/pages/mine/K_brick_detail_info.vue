<template>
	<view class="detail-info">
		<view class="info-head">
			<image src="../../static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view>{{$t('new.kzmx')}}</view>
		</view>

		<view class="item" v-for="(item,i) in list" :key="item.user_k_diamond_log_id"
			:style="(i+1)==4?'border-bottom: none;':''">
			<image src="/static/images/mine/wallet_icon_income.png"></image>
			<view class="item-info">
				<view class="item-tit">{{item.memo}}</view>
				<view class="item-time">{{$u.timeFormat(item.addtime, 'yyyy/mm/dd hh:MM:ss')}}</view>
			</view>
			<view class="item-price">+{{item.money}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		mounted() {
			this.getAllList()
		},
		methods: {
			onReturn() {
				uni.navigateBack()
			},
			getAllList() {
				this.$http.post(this.$apiObj.diamondDetail, {
					page: 1,
					pagenum: 20
				}).then(res => {
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.detail-info {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;

		.info-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgb(204, 204, 204);

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

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
				width: 80rpx;
				height: 80rpx;
			}

			.item-info {
				width: 440rpx;
				line-height: 46rpx;
				margin-left: 32rpx;

				.item-tit {
					width: 100%;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
				}

				.item-time {
					font-size: 24rpx;
					color: rgb(153, 153, 153);
				}

			}

			.item-price {
				position: absolute;
				right: 0;
				font-size: 32rpx;
				color: rgb(255, 57, 57);
			}

		}

	}
</style>