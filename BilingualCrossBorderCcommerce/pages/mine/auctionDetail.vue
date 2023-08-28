<template>
	<view class="auction-layout">
		<view class="al-container">
			<view class="al-c-product">
				<view class="product-store">
					<view class="product-store-l">
						<image :src="auctionInfo.shop_logo" mode="aspectFill"></image>
						<p>{{auctionInfo.shop_name}}</p>
					</view>
					<!-- <view class="product-store-r">oder</view> -->
				</view>
				<view class="product-info">
					<view class="product-info-cover">
						<image :src="auctionInfo.image" mode="aspectFill"></image>
					</view>
					<view class="product-info-box">
						<view class="box-goods">{{auctionInfo.goods_name}}</view>
						<view class="box-detail">
							<view class="box-detail-l">
								<p class="l-current"><text>RM</text>{{auctionInfo.auction_original_price}}</p>
								<p class="l-original">RM{{auctionInfo.price}}</p>
							</view>
							<view class="box-detail-r">x{{auctionInfo.auction_count}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="al-c-data">
				<view class="data-item">
					<view class="data-item-l">{{$t('new.spqs')}}</view>
					<view class="data-item-r">{{auctionInfo.stage_num}}</view>
				</view>
				<view class="data-item">
					<view class="data-item-l">{{$t('auction.detail.market')}}</view>
					<view class="data-item-r">RM {{auctionInfo.price}}</view>
				</view>
				<view class="data-item">
					<view class="data-item-l">{{$t('user.auctionM.bidding')}}</view>
					<view class="data-item-r">
						<image src="/static/images/kbrick/diamond.png"></image>
						{{auctionInfo.auction_price}}
					</view>
				</view>
				<view class="data-item">
					<view class="data-item-l">{{$t('new.qpsl')}}</view>
					<view class="data-item-r">x{{auctionInfo.auction_count}}</view>
				</view>
				<view class="data-item">
					<view class="data-item-l">{{$t('new.xyje')}}</view>
					<view class="data-item-r price">
						<image src="/static/images/kbrick/diamond.png"></image>
						{{auctionInfo.auction_amount}}
					</view>
				</view>
			</view>
			<view class="al-c-data">
				<view class="data-item">
					<view class="data-item-l">{{$t('auction.detail.recharge')}}</view>
					<view class="data-item-r">RM {{auctionInfo.use_recharge_money*1}}</view>
				</view>
				<view class="data-item">
					<view class="data-item-l">{{$t('auction.detail.gift')}}</view>
					<view class="data-item-r">RM {{auctionInfo.use_presentation_money*1}}</view>
				</view>
				<view class="data-item">
					<view class="data-item-l">{{$t('auction.detail.total')}}</view>
					<view class="data-item-r price">
						<image src="/static/images/kbrick/diamond.png"></image>
						{{auctionInfo.total_price}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				auctionInfo: '',
			}
		},
		onLoad(option) {
			this.getAuctionDetail(option.orderNo);
		},
		methods: {
			getAuctionDetail(id) {
				this.$http.post(this.$apiObj.AuctionOrderDetail, {
					order_no: id,
					token: uni.getStorageSync('token'),
				}).then((res) => {
					if (res.code === 1) {
						this.auctionInfo = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.auction-layout {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
		padding: 24rpx 32rpx;
		box-sizing: border-box;

		.al-container {
			width: 100%;
			background: rgb(255, 255, 255);
			border-radius: 20rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.al-c-product {
				width: 100%;
				padding-bottom: 32rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid rgb(204, 204, 204);

				.product-store {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.product-store-l {
						display: flex;
						align-items: center;

						image {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
						}

						p {
							margin-left: 12rpx;
							color: rgb(51, 51, 51);
							font-size: 28rpx;
						}
					}

					.product-store-r {
						color: rgb(10, 198, 142);
						font-size: 28rpx;
					}
				}

				.product-info {
					margin-top: 24rpx;
					display: flex;
					align-items: center;

					.product-info-cover {
						width: 206rpx;
						height: 206rpx;
						border-radius: 16rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.product-info-box {
						flex: 1;
						height: 206rpx;
						margin-left: 24rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: flex-start;

						.box-goods {
							color: rgb(51, 51, 51);
							font-size: 24rpx;
							line-height: 36rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 4;
						}

						.box-detail {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.box-detail-l {

								.l-current {
									color: rgb(51, 51, 51);
									font-size: 32rpx;
									font-weight: bold;

									text {
										font-size: 20rpx;
									}
								}

								.l-original {
									color: rgb(153, 153, 153);
									font-size: 16rpx;
									text-decoration: line-through;
								}
							}

							.box-detail-r {
								color: rgb(153, 153, 153);
								font-size: 20rpx;
							}
						}
					}
				}
			}

			.al-c-data {
				width: 100%;
				border-bottom: 1px solid rgb(204, 204, 204);
				box-sizing: border-box;

				&:last-child {
					border: none;
				}

				.data-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 16rpx 0;
					box-sizing: border-box;

					.data-item-l {
						color: rgb(102, 102, 102);
						font-size: 28rpx;
					}

					.data-item-r {
						color: rgb(51, 51, 51);
						font-size: 28rpx;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 8rpx;
						}
					}

					.price {
						color: rgb(255, 57, 57);
						font-size: 32rpx;
						font-weight: bold;

						text {
							font-size: 20rpx;
						}
					}
				}
			}
		}
	}
</style>