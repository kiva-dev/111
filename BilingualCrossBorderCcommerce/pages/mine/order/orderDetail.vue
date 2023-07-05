<template>
	<view class="detail-page">
		<uni-header :title="$t('user.order.detail.title')"></uni-header>
		<view class="info-layout">
			<view class="il-container">
				<view class="il-container-top" v-for="item in orderInfo.goods" :key="item.goods_id">
					<view class="top-bar">
						<view class="top-bar-shop">
							<image :src="orderInfo.shop_logo" mode="aspectFill"></image>
							<p>{{orderInfo.shop_name || ''}}</p>
						</view>
						<view class="top-bar-status">
							<text style="color: #FF3939;" v-if="orderInfo.status === '0'">{{$t('user.order.paid')}}</text>
							<text style="color: #1DD181;" v-if="orderInfo.status === '2'">{{$t('user.order.shipped')}}</text>
							<text style="color: #1DD181;" v-if="orderInfo.status === '3'">{{$t('user.order.received')}}</text>
							<text style="color: #999999;" v-if="orderInfo.status === '5'">{{$t('user.order.confirmed')}}</text>
							<text style="color: #999999;" v-if="orderInfo.status === '6'">{{$t('user.order.closed')}}</text>
						</view>
					</view>
					<view class="top-info">
						<view class="top-info-cover">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="top-info-detail">
							<view class="detail-name">{{item.goods_name}}</view>
							<view class="detail-num">
								<view class="detail-num-price">
									<text>RM</text>
									{{item.goods_price}}
								</view>
								<view class="detail-num-count">x{{item.total_num}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="il-container-order">
					<view class="order-address">
						<view class="order-address-info">
							<view class="info-title">{{$t('user.order.detail.address')}}</view>
							<view class="info-content">{{orderInfo.a_name || ''}} {{orderInfo.a_mobile || ''}}</view>
						</view>
						<view class="order-address-detail">{{orderInfo.a_detail || ''}}</view>
					</view>
					<view class="order-lab">
						<view class="order-lab-title">{{$t('user.order.detail.number')}}</view>
						<view class="order-lab-right">
							<p>{{orderInfo.order_no || ''}}</p>
							<image @click="onCopyText(orderInfo.order_no)" src="@/static/images/mine/mine_btn_copy.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="order-lab">
						<view class="order-lab-title">{{$t('user.order.detail.time')}}</view>
						<view class="order-lab-right">
							<p>{{onConversionTime(this.orderInfo.addtime) || ''}}</p>
						</view>
					</view>
					<view class="order-lab" v-if="orderInfo.express_no">
						<view class="order-lab-title">{{$t('user.order.detail.information')}}</view>
						<view class="order-lab-right">
							<p>{{orderInfo.express_no || ''}}</p>
							<image @click="onCopyText('Shunfeng544512445145416')" src="@/static/images/mine/mine_btn_copy.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="order-lab">
						<view class="order-lab-title">{{$t('user.order.detail.total')}}</view>
						<view class="order-lab-right">
							<text>RM</text>
							<text>{{orderInfo.total_price || 0}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from "@/utils/tool.js"
	
	export default {
		data() {
			return {
				orderInfo: '',
			}
		},
		onLoad(option) {
			this.onOrderDetailOrder(option.id);
		},
		methods: {
			onOrderDetailOrder(orderNo) {
				this.$http.post(this.$apiObj.OrderDetailOrder, {
					order_no: orderNo
				}).then(res => {
					if (res.code === 1) {
						this.orderInfo = res.data || '';
					}
				})
			},
			onCopyText(text) {
				uni.setClipboardData({
					data: text
				});
			},
			onConversionTime(time) {
				return tool.timestampToTime(time);
			}
		}
	}
</script>

<style lang="less" scoped>
	.detail-page {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;

		.info-layout {
			padding: 24rpx 32rpx;
			box-sizing: border-box;

			.il-container {
				width: 100%;
				background: #FFFFFF;
				border-radius: 20rpx;
				padding: 24rpx;
				box-sizing: border-box;

				.il-container-top {
					width: 100%;
					margin-top: 24rpx;
					padding-bottom: 32rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #CCCCCC;
					
					&:first-child {
						margin-top: 0;
					}

					.top-bar {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.top-bar-shop {
							flex: 1;
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
								font-weight: bold;
							}
						}

						.top-bar-status {

							text {
								font-size: 24rpx;
							}
						}
					}

					.top-info {
						width: 100%;
						margin-top: 24rpx;
						display: flex;
						align-items: center;

						.top-info-cover {
							width: 206rpx;
							height: 206rpx;
							border-radius: 16rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.top-info-detail {
							flex: 1;
							height: 206rpx;
							margin-left: 24rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: flex-start;

							.detail-name {
								width: 100%;
								color: rgb(51, 51, 51);
								font-size: 24rpx;
								line-height: 36rpx;
							}

							.detail-num {
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.detail-num-price {
									color: rgb(51, 51, 51);
									font-size: 32rpx;
									font-weight: bold;

									text {
										font-size: 20rpx;
									}
								}

								.detail-num-count {
									color: rgb(153, 153, 153);
									font-size: 20rpx;
								}
							}
						}
					}
				}

				.il-container-order {
					width: 100%;
					padding: 16rpx 0;
					box-sizing: border-box;
					border-bottom: 1rpx solid #CCCCCC;

					.order-address {
						width: 100%;
						padding: 16rpx 0;
						box-sizing: border-box;

						.order-address-info {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.info-title {
								color: rgb(102, 102, 102);
								font-size: 28rpx;
							}

							.info-content {
								color: rgb(51, 51, 51);
								font-size: 28rpx;
							}
						}

						.order-address-detail {
							width: 100%;
							margin-top: 16rpx;
							text-align: right;
							padding-left: 240rpx;
							box-sizing: border-box;
							color: rgb(102, 102, 102);
							font-size: 24rpx;
						}
					}

					.order-lab {
						width: 100%;
						padding: 16rpx 0;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.order-lab-title {
							color: rgb(102, 102, 102);
							font-size: 28rpx;
						}

						.order-lab-right {
							flex: 1;
							margin-left: 12rpx;
							display: flex;
							justify-content: flex-end;
							align-items: center;

							p {
								flex: 1;
								text-align: right;
								color: rgb(51, 51, 51);
								font-size: 28rpx;
								word-break: break-all;
							}

							image {
								width: 32rpx;
								margin-left: 16rpx;
							}

							text {
								color: rgb(255, 57, 57);
								font-size: 20rpx;
								font-weight: bold;

								&:last-child {
									font-size: 32rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>