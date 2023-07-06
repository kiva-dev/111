<template>
	<view class="auction-layout">
		<view class="al-container">
			<view class="al-c-product">
				<view class="product-store">
					<view class="product-store-l">
						<image :src="goodsInfo.shop_logo" mode="aspectFill"></image>
						<p>{{goodsInfo.shop_name}}</p>
					</view>
					<!-- <view class="product-store-r">oder</view> -->
				</view>
				<view class="product-info">
					<view class="product-info-cover">
						<image :src="goodsInfo.image" mode="aspectFill"></image>
					</view>
					<view class="product-info-box">
						<view class="box-goods">{{goodsInfo.goods_name}}</view>
						<view class="box-detail">
							<view class="box-detail-tit">{{$t('user.auctionM.original')}}:</view>
							<view class="box-detail-price"><text>RM</text>{{goodsInfo.price}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="al-c-data">
				<view class="data-item">
					<view class="data-item-l">{{$t('new.xyje')}}</view>
					<view class="data-item-r">
						<image src="/static/images/kbrick/diamond.png"></image> {{goodsInfo.pay_price}}
					</view>
				</view>
				<view class="data-item">
					<view class="data-item-l">{{$t('auction.detail.total')}}</view>
					<view class="data-item-r price">
						<image src="/static/images/kbrick/diamond.png"></image>{{goodsInfo.pay_price}}
					</view>
				</view>
			</view>
		</view>

		<view class="al-description">
			<view class="al-description-head">{{$t('new.shsm')}}</view>
			<view class="al-description-des">
				{{appealInfo.mark}}
			</view>
			<view class="al-description-imgs">
				<image :src="item" v-for="item in appealInfo.images"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: '',
				appealInfo: '',
			}
		},
		onLoad(option) {
			this.goodsInfo = JSON.parse(option.info);
			console.log(this.goodsInfo);
			this.getAppealDetail(this.goodsInfo.id);
		},
		methods: {
			getAppealDetail(id) {
				this.$http.post(this.$apiObj.AuctionorderComplainDetail, {
					record_id: id
				}).then((res) => {
					console.log(res);
					if (res.code === 1) {
						this.appealInfo = res.data;
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
						}

						.box-detail {
							width: 100%;

							.box-detail-tit {
								color: rgb(102, 102, 102);
								font-size: 24rpx;
							}

							.box-detail-price {
								margin-top: 8rpx;
								color: rgb(51, 51, 51);
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

			.al-c-data {
				width: 100%;

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
						display: flex;
						align-items: center;
						
						image{
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

		.al-description {
			width: 686rpx;
			padding: 32rpx 24rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 24rpx;

			.al-description-head {
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				margin-left: 14rpx;
			}

			.al-description-des {
				width: 638rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin: 32rpx 0 32rpx 14rpx;
			}

			.al-description-imgs {
				width: 686rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin: 0 auto;

				image {
					display: block;
					width: 148rpx;
					height: 148rpx;
					border-radius: 8rpx;
					margin-right: 16rpx;
					margin-bottom: 20rpx;
				}
			}

		}
	}
</style>