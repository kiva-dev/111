<template>
	<view class="order-page">
		<view class="header-layout">
			<view class="hl-container">
				<view class="hl-c-back" @click="onBack">
					<image src="@/static/images/active/active_btn_back.png" mode="widthFix"></image>
				</view>
				<view class="hl-c-search">
					<view class="search-icon">
						<image src="@/static/images/mine/order_icon_search.png" mode="widthFix"></image>
					</view>
					<view class="search-ipt">
						<input type="text" :placeholder="$t('order.search')" />
					</view>
				</view>
			</view>
		</view>
		<view class="tab-layout">
			<scroll-view class="tab-layout-scroll" scroll-x="true">
				<view class="scroll-item" :class="{'scroll-active' : tabIndex === item.id}" v-for="item in tabArr"
					:key="item.id" @click="onChangeTab(item.id)">
					<text
						:style="{'color': tabIndex === item.id ? 'rgb(10, 198, 142)' : 'rgb(51, 51, 51)'}">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<template v-if="orderList && orderList.length > 0">
			<view class="list-layout">
				<view class="ll-item" v-for="item in orderList" :key="item.id">
					<view class="ll-item-header">
						<view class="header-shop">
							<image src="@/static/images/new-index/detail_demo_cover.png" mode="aspectFill"></image>
							<p>{{item.shop_name}}</p>
						</view>
						<view class="header-status">To be paid</view>
					</view>
					<view class="ll-item-info">
						<view class="info-cover">
							<image src="@/static/images/new-index/detail_demo_cover.png" mode="aspectFill"></image>
						</view>
						<view class="info-content">
							<view class="info-content-name">Here is the product name, Here is the product name,Here is
								the product name</view>
							<view class="info-content-num">
								<view class="num-total">1 in total</view>
								<view class="num-price">
									<text>RM</text>
									{{item.pay_price}}
								</view>
							</view>
						</view>
					</view>
					<view class="ll-item-btns">
						<view class="btns-grey">Cancel order</view>
						<view class="btns-green">payment</view>
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
						id: 1,
						name: this.$t('user.order.qbdd')
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
						id: 4,
						name: this.$t('zhongpai.daiqueren')
					},
					{
						id: 5,
						name: this.$t('zhongpai.yiqueren')
					},
					{
						id: 6,
						name: this.$t('user.order.yiwanc')
					}
				],
				tabIndex: 1,
				page: 1,
				orderList: [],
			}
		},
		onLoad(option) {
			this.tabIndex = parseInt(option.tabIndex) || 1;
			this.getOrderList();
		},
		methods: {
			onBack() {
				uni.navigateBack();
			},
			onChangeTab(id) {
				this.tabIndex = id;
				this.page = 1;
				this.getOrderList();
			},
			getOrderList() {
				this.$http.post(this.$apiObj.AuctionorderWinOrder, {
					pagenum: 10,
					page: this.page,
					token: uni.getStorageSync('token')
				}).then((res) => {
					console.log(res);
					if (res.code === 1) {
						let arr = res.data.data || [];
						if (this.page > 1) {
							this.orderList = this.orderList.concat(arr);
						} else {
							this.orderList = arr;
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.order-page {
		width: 100%;
		background: #F8F8F8;
		min-height: 100vh;

		.header-layout {
			width: 100%;
			background: rgb(10, 198, 142);
			padding-top: 88rpx;
			box-sizing: border-box;

			.hl-container {
				width: 100%;
				height: 88rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.hl-c-back {
					width: 40rpx;

					image {
						width: 100%;
					}
				}

				.hl-c-search {
					width: 600rpx;
					background: rgb(255, 255, 255);
					border-radius: 100rpx;
					padding: 14rpx 20rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;

					.search-icon {
						width: 36rpx;
						display: flex;

						image {
							width: 100%;
						}
					}

					.search-ipt {
						flex: 1;
						margin-left: 20rpx;

						input {
							width: 100%;
							color: rgb(153, 153, 153);
							font-size: 24rpx;
						}
					}
				}
			}
		}

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
						color: rgb(255, 57, 57);
						font-size: 24rpx;
					}
				}

				.ll-item-info {
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