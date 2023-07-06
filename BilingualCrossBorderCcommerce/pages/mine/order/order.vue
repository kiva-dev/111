<template>
	<view class="order-page">
		<uni-header :title="$t('top.MyOrder')"></uni-header>
		<view class="tab-layout">
			<scroll-view class="tab-layout-scroll" scroll-x="true" :scroll-left="scrollLeft" @scroll="scroll">
				<view class="scroll-item" :class="{'scroll-active' : tabIndex === item.id}" v-for="item in tabArr"
					:key="item.id" @click="onChangeTab(item.id)">
					<text
						:style="{'color': tabIndex === item.id ? 'rgb(10, 198, 142)' : 'rgb(51, 51, 51)'}">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<template v-if="orderList && orderList.length > 0">
			<view class="list-layout">
				<view class="ll-item" v-for="item in orderList" :key="item.id" @click="jumpOrderDetail(item.order_no)">
					<view class="ll-item-header">
						<view class="header-shop">
							<image :src="item.shop_logo" mode="aspectFill"></image>
							<p>{{item.shop_name}}</p>
						</view>
						<view class="header-status" style="color: #FF3939;" v-if="item.status === '0'">
							{{$t('user.order.paid')}}
						</view>
						<view class="header-status" style="color: #1DD181;" v-if="item.status === '2'">
							{{$t('user.order.shipped')}}
						</view>
						<view class="header-status" style="color: #1DD181;" v-if="item.status === '3'">
							{{$t('user.order.received')}}
						</view>
						<view class="header-status" style="color: #999999;" v-if="item.status === '5'">
							{{$t('user.order.confirmed')}}
						</view>
						<view class="header-status" style="color: #999999;"
							v-if="item.status === '6' || item.status === '-1' || item.status === '-2'">
							{{$t('user.order.closed')}}
						</view>
					</view>
					<view class="ll-item-info" v-for="goods in item.goods" :key="goods.goods_id">
						<view class="info-container">
							<view class="info-cover">
								<image :src="goods.image" mode="aspectFill"></image>
							</view>
							<view class="info-content">
								<view class="info-content-name">{{goods.goods_name || ''}}</view>
								<view class="info-content-num">
									<view class="num-total">x{{goods.total_num}}</view>
									<view class="num-price">
										<text>RM</text>
										{{goods.goods_price}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="ll-item-btns">
						<template v-if="item.status === '0'">
							<view class="btns-grey" @click.stop="onCancelOrder(item)">{{$t('user.order.cancel')}}</view>
							<view class="btns-green" @click.stop="toOrderInfo(item.order_no)">
								{{$t('user.order.payment')}}</view>
						</template>
						<template v-if="item.status === '2'">
							<view class="btns-grey" @click.stop="onCancelOrder(item)">{{$t('user.order.cancel')}}</view>
						</template>
						<template v-if="item.status === '3'">
							<!-- <view class="btns-grey" @click.stop="onAfterSale(item)">{{$t('user.order.sale')}}</view> -->
							<view class="btns-green" @click.stop="onConfirmReceipt(item)">{{$t('user.order.receipt')}}
							</view>
						</template>
						<!-- <template v-if="item.status === '5'">
							<view class="btns-grey" @click.stop="onAfterSale(item)">{{$t('user.order.sale')}}</view>
						</template> -->
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<uni-empty message="暂无内容"></uni-empty>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabArr: [{
						id: 10,
						name: this.$t('user.order.qbdd')
					},
					{
						id: 0,
						name: this.$t('user.order.daifuk')
					},
					{
						id: 2,
						name: this.$t('user.order.daifahuo')
					},
					{
						id: 3,
						name: this.$t('user.order.dsh')
					},
					{
						id: 5,
						name: this.$t('user.order.yiwanc')
					},
					{
						id: 6,
						name: this.$t('user.order.closing')
					},
				],
				tabIndex: 10, // 10全部，0待付款，2待发货，3待收货，5已完成，6交易关闭
				page: 1,
				orderList: [],
				scrollLeft: 0,
				sendTit: 10
			}
		},
		onLoad(option) {
			this.tabIndex = parseInt(option.tabIndex);
			this.sendTit = parseInt(option.tabIndex);
			this.getOrderList();
			setTimeout(() => {
				if (this.tabIndex === 5 || this.tabIndex === 6) {
					console.log(this.tabIndex)
					this.scrollLeft = 500;
				} else {
					this.scrollLeft = 0;
				}
			},50)
		},
		onShow() {

		},
		onReachBottom() {
			this.page++;
			this.getOrderList();
		},
		methods: {
			scroll(e) {
				this.scrollLeft = e.detail.scrollLeft
			},
			toOrderInfo(order_no) {
				uni.navigateTo({
					url: '/pages/cart/orderinfo?order_no=' + order_no
				})
			},
			onBack() {
				uni.navigateBack();
			},
			onChangeTab(id) {
				if (id == 6) this.sendTit = [-1, -2, 6].toString()
				else this.sendTit = id
				this.tabIndex = id
				this.page = 1;
				this.getOrderList();
			},
			getOrderList() {
				this.$http.post(this.$apiObj.OrderOrderList, {
					page: this.page,
					pagenum: 10,
					type: this.sendTit === 10 ? null : this.sendTit
				}).then((res) => {
					if (res.code === 1) {
						let arr = res.data.data || [];
						if (this.page > 1) {
							this.orderList = this.orderList.concat(arr);
						} else {
							this.orderList = arr;
						}
					}
				});
			},
			jumpOrderDetail(id) {
				uni.navigateTo({
					url: '/pages/mine/order/orderDetail?id=' + id
				})
			},
			onCancelOrder(item) {
				uni.showModal({
					title: this.$t('user.order.tishi'),
					content: this.$t('user.order.nqdyqxdqddm'),
					success: (res) => {
						if (res.confirm) {
							if (item.status === '0') {
								this.$http.post(this.$apiObj.OrderNotpayCancelOrder, {
									order_no: item.order_no
								}).then(res => {
									if (res.code === 1) {
										uni.showToast({
											title: this.$t('user.order.qxddcg'),
											icon: 'none'
										});
										this.page = 1;
										this.getOrderList();
									}
								});
							}
							if (item.status === '2') {
								this.$http.post(this.$apiObj.OrderPayCancelOrder, {
									order_no: item.order_no
								}).then(res => {
									if (res.code === 1) {
										uni.showToast({
											title: this.$t('user.order.qxddcg'),
											icon: 'none'
										})
										this.page = 1;
										this.getOrderList();
									}
								});
							}
						}
					},
				});
			},
			// 确认收货
			onConfirmReceipt(item) {
				this.$http.post(this.$apiObj.OrderReceiptOrder, {
					order_no: item.order_no
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.order.shcg'),
							icon: 'none'
						})
						this.page = 1;
						this.getOrderList();
					}
				});
			},
			// 申请售后
			onAfterSale(item) {
				uni.navigateTo({
					url: '/pages/mine/order/sqsh?conter=' + JSON.stringify(item.goods[0]) + '&cent=' + JSON
						.stringify(item)
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.order-page {
		width: 100%;
		background: #F8F8F8;
		min-height: 100vh;

		.tab-layout {
			width: 100%;
			height: 88rpx;
			background: rgb(255, 255, 255);
			padding: 0 20rpx;
			box-sizing: border-box;

			.tab-layout-scroll {
				width: 100%;
				white-space: nowrap;

				.scroll-item {
					padding: 0 30rpx;
					box-sizing: border-box;
					display: inline-block;
					position: relative;

					text {
						color: rgb(51, 51, 51);
						font-size: 28rpx;
						line-height: 88rpx;
					}
				}

				.scroll-active {

					&::after {
						content: "";
						width: 64rpx;
						height: 8rpx;
						background: rgba(10, 198, 142, 0.3);
						border-radius: 100rpx;
						position: absolute;
						left: 50%;
						bottom: 16rpx;
						transform: translateX(-50%);
						transition: all .5s;
					}
				}
			}
		}

		.list-layout {
			padding: 24rpx 32rpx;
			box-sizing: border-box;

			.ll-item {
				width: 100%;
				background: rgb(255, 255, 255);
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				padding: 24rpx;
				box-sizing: border-box;

				.ll-item-header {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.header-shop {
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
							font-weight: 600;
						}
					}

					.header-status {
						font-size: 24rpx;
					}
				}

				.ll-item-info {
					width: 100%;

					.info-container {
						width: 100%;
						padding: 24rpx 0;
						box-sizing: border-box;
						display: flex;
						align-items: center;

						.info-cover {
							width: 160rpx;
							height: 160rpx;

							image {
								width: 100%;
								height: 100%;
								border-radius: 16rpx;
							}
						}

						.info-content {
							margin-left: 24rpx;
							flex: 1;
							min-height: 160rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: flex-start;

							.info-content-name {
								color: rgb(51, 51, 51);
								font-size: 24rpx;
								line-height: 36rpx;
							}

							.info-content-num {
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.num-total {
									color: rgb(153, 153, 153);
									font-size: 20rpx;
								}

								.num-price {
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

					.info-buts {
						width: 100%;
						display: flex;
						justify-content: flex-end;
						align-items: center;

						.info-btns-grey {
							margin-left: 24rpx;
							padding: 10rpx 20rpx;
							box-sizing: border-box;
							font-size: 24rpx;
							box-sizing: border-box;
							border-radius: 100rpx;
							color: rgb(153, 153, 153);
							border: 1rpx solid rgb(153, 153, 153);
						}
					}
				}

				.ll-item-btns {
					display: flex;
					justify-content: flex-end;
					align-items: center;

					view {
						margin-left: 24rpx;
						padding: 10rpx 20rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						box-sizing: border-box;
						border-radius: 100rpx;
					}

					.btns-grey {
						color: rgb(153, 153, 153);
						border: 1rpx solid rgb(153, 153, 153);
					}

					.btns-green {
						color: rgb(10, 198, 142);
						border: 1rpx solid rgb(10, 198, 142);
					}
				}
			}
		}
	}
</style>