<template>
	<view class="detail-info" v-if="list.length!=0">
		<view class="info-head">
			<image src="../../static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view>{{$t('new.kzmx')}}</view>
		</view>

		<view class="item" v-for="(item,i) in list" :key="item.user_k_diamond_log_id"
			:style="(i+1)==list.length?'border-bottom: none;':''">
			<view class="item-info">
				<view class="item-tit">
					<view>{{isShopCont ?item.memo_en : item.memo}}</view>
					<text v-show="item.money_type == 2">{{$t('wallet.gift_kdiamond')}}</text>
				</view>
				<view class="item-time">
					<view>{{$t('wallet.get_time')}}</view>
					<text>{{$u.timeFormat(item.addtime, 'yyyy/mm/dd hh:MM:ss')}}</text>
				</view>
				
				<view class="item-time" v-show="item.expire_time">
					<view>{{$t('wallet.out_time')}}</view>
					<text>{{$filter.to_date_time(item.expire_time)}}</text>
				</view>
				
				<view class="item-time" v-show="item.order_no"
					@click="navClick('/pages/mine/auctionDetail?orderNo='+item.order_no)">
					<view>{{$t('user.order.detail.number')}}</view>
					<text>{{item.order_no}}</text>
					<image src="/static/images/mine/wallet_right.png"></image>
				</view>
				
			</view>
			<view class="item-price" :style="item.money*1 < 1 ?'color: rgb(153, 153, 153);':''"><text
					v-show="item.money*1 > 0">+</text>{{item.money*1}}</view>
		</view>
	</view>
	<view class="NoDataAvailable" v-else>
		<view class="info-head">
			<image src="/static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view>{{$t('new.kzmx')}}</view>
		</view>

		<view class="item">
			<view class="img">
				<image src="/static/images/noData.png"></image>
			</view>
			<text class="txt">{{$t('new.noData')}}~</text>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import $ from '@/common/jquery-3.6.1.min.js';
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pagenum: 20,
				totalPageNum: 0,
				isShopCont: false
			}
		},
		onLoad() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.getAllList()
		},
		methods: {
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			onReturn() {
				uni.navigateBack()
			},
			getAllList() {
				let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false // 中文还是英文

				this.$http.post(this.$apiObj.diamondDetail, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					this.totalPageNum = res.data.total
					this.list = this.page == 1 ? res.data.data : [...this.list, ...res.data.data]
				})
			}
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			if (this.totalPageNum <= this.page * this.pagenum) return
			this.page++
			this.getAllList()
		}
	}
</script>

<style lang="less" scoped>
	.NoDataAvailable {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: #f8f8f8 !important;
		margin: auto;
		text-align: center;

		.info-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 60rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgb(204, 204, 204);
			background-color: #fff;

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
			.img {
				width: 100%;
				margin-top: 80rpx;

				image {
					width: 480rpx;
					height: 480rpx;
				}
			}

			.txt {
				color: #999;
				font-size: 28rpx;
				margin-top: 24rpx;
			}
		}
	}

	.detail-info {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;

		.info-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 60rpx;
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
			padding: 34rpx 0 32rpx 0;
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
				width: 540rpx;
				line-height: 46rpx;
				margin-left: 32rpx;

				.item-tit {
					width: 100%;
					display: flex;
					align-items: center;
					
					view {
						max-width: 420rpx;
						margin: 9rpx 0;
						color: rgb(51, 51, 51);
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
									
					text {
						display: block;
						font-size: 16rpx;
						color: rgb(27, 161, 255);
						padding: 2rpx 10rpx;
						box-sizing: border-box;
						border: 2rpx solid rgb(27, 161, 255);
						border-radius: 28rpx;
						margin-left: 24rpx;
					}
				}
				

				.item-time {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: rgb(153, 153, 153);
					
					view {
						width: 190rpx;
					}
									
					image {
						width: 24rpx;
						height: 24rpx;
						margin-left: 8rpx;
					}
					
					text{
						color: rgb(51, 51, 51);
						margin-left: 64rpx;
					}
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