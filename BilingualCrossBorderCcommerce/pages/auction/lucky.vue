<template>
	<view class="lucky-page">
		<view class="banner-layout">
			<image src="@/static/images/new-index/luckstar-en.png" mode="widthFix"></image>
		</view>
		<view class="member-layout">
			<view class="ml-title">
				<view class="ml-title-icon">
					<image src="@/static/images/new-index/lv-start.png" mode="widthFix"></image>
				</view>
				<view class="ml-title-text">Lucky Star</view>
			</view>
			<view class="ml-list">
				<view class="ml-list-item" v-for="(item,index) in luckyList" :key="index"
					@click="toDetail(item.auction_goods_id)">
					<view class="item-left">
						<view class="item-l-avatar">
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="item-l-level">
							<view class="level-icon">
								<image src="@/static/images/mine/mine_icon_vip.png" mode="widthFix"></image>
							</view>
							<view class="level-num">Lv.{{item.level}}</view>
						</view>
					</view>
					<view class="item-right">
						<view class="item-right-name">
							<view class="name-container">{{item.nickname || ''}}</view>
							<view class="name-like" @click.stop="onLikeClick(item)">
								<image v-if="item.is_zan === 1" src="@/static/images/new/dz1.png" mode="widthFix">
								</image>
								<image v-else src="@/static/images/new/dz.png" mode="widthFix"></image>
								<p>{{item.zan_num || 0}}</p>
							</view>
						</view>
						<template v-if="isEnglish">
							<view class="item-right-content">
								In the Joint contribution sales activities provided by{{' '}}
								<text style="color: rgb(10, 198, 142);">{{item.shop_name}}</text>
								,at the price of{{' '}}
								<text style="color: rgb(255, 57, 57); font-weight: bold;">
									<image src="/static/images/kbrick/diamond.png"></image>{{item.pay_price}}
								</text>
								,I was lucky to win a
								{{item.goods_name}}
								{{' '}}worth{{' '}}
								<text style="color: rgb(255, 57, 57); font-weight: bold;">RM{{item.price}}</text>
							</view>
						</template>
						<template v-else>
							<view class="item-right-content">
								在
								<text style="color: rgb(10, 198, 142);">{{item.shop_name}}</text>
								提供的许愿活动中，以
								<text style="color: rgb(255, 57, 57); font-weight: bold;">
									<image src="/static/images/kbrick/diamond.png"></image>{{item.pay_price}}
								</text>
								的价格，幸运地获得了价值
								<text style="color: rgb(255, 57, 57); font-weight: bold;">RM{{item.price}}</text>
								的
								{{item.goods_name}}
							</view>
						</template>
						<view class="item-right-bot">
							<view class="bot-box">{{$filter.to_date_time(item.update_time)}}</view>
							<view class="bot-box">{{item.stage_num}}{{$t('auction.qi')}}</view>
						</view>
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
				page: 1,
				luckyList: [],
				isEnglish: uni.getStorageSync('locale') === 'en' ? true : false,
			}
		},
		onLoad() {
			this.getLuckyList();
		},
		onReachBottom() {
			this.page++;
			this.getLuckyList();
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/auction/detail?id=' + id + '&type=4'
				})
			},
			getLuckyList() {
				this.$http.post(this.$apiObj.AuctionLuckyList, {
					page: this.page,
					pagenum: 10,
					keyword: '',
				}).then(res => {
					if (res.code === 1) {
						let arr = res.data.data || [];
						if (this.page > 1) {
							this.luckyList = this.luckyList.concat(arr);
						} else {
							this.luckyList = arr;
						}
					}
				})
			},
			onLikeClick(item) {
				this.$http.post(this.$apiObj.AuctionFocusLucky, {
					lucky_id: item.id
				}).then(res => {
					if (res.code == 1) {
						if (item.is_zan == 0) {
							item.is_zan = 1;
							item.zan_num++;
						} else {
							item.is_zan = 0;
							item.zan_num--;
						}
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.lucky-page {
		width: 100%;
		position: relative;

		.banner-layout {
			width: 100%;

			image {
				width: 100%;
			}
		}

		.member-layout {
			width: 100%;
			min-height: 50vh;
			background: rgb(255, 255, 255);
			border-radius: 32rpx;
			margin-top: -390rpx;
			padding: 28rpx 56rpx;
			box-sizing: border-box;
			position: relative;
			z-index: 9;

			.ml-title {
				display: flex;
				justify-content: center;
				align-items: center;

				.ml-title-icon {
					width: 58rpx;
					display: flex;

					image {
						width: 100%;
					}
				}

				.ml-title-text {
					margin-left: 12rpx;
					color: rgb(51, 51, 51);
					font-size: 32rpx;
					font-weight: bold;
					position: relative;
					transform: translateY(-8rpx);

					&::after {
						content: "";
						width: 92rpx;
						height: 8rpx;
						background: rgb(10, 198, 142);
						opacity: 0.4;
						border-radius: 100rpx;
						position: absolute;
						left: 50%;
						bottom: -10rpx;
						transform: translate(-50%);
					}
				}
			}

			.ml-list {
				width: 100%;
				margin-top: 32rpx;

				.ml-list-item {
					width: 100%;
					margin-bottom: 24rpx;
					padding-bottom: 24rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid rgb(204, 204, 204);
					display: flex;
					align-items: flex-start;

					&:last-child {
						margin-bottom: 0;
						border-bottom: none;
					}

					.item-left {
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: center;

						.item-l-avatar {
							width: 80rpx;
							height: 80rpx;
							position: sticky;

							image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}

						.item-l-level {
							height: 30rpx;
							margin-top: 8rpx;
							padding-right: 5rpx;
							box-sizing: border-box;
							background: rgb(253, 240, 226);
							border-radius: 100rpx;
							display: flex;

							.level-icon {
								width: 30rpx;
								height: 30rpx;

								image {
									width: 100%;
								}
							}

							.level-num {
								margin-left: 5rpx;
								color: rgb(219, 132, 37);
								font-size: 16rpx;
								line-height: 30rpx;
							}
						}
					}

					.item-right {
						flex: 1;
						margin-left: 18rpx;

						.item-right-name {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.name-container {
								width: 420rpx;
								color: rgb(51, 51, 51);
								font-size: 30rpx;
								font-weight: bold;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.name-like {
								display: flex;
								align-items: center;

								image {
									width: 30rpx;
								}

								p {
									margin-left: 8rpx;
									color: rgb(153, 153, 153);
									font-size: 20rpx;
								}
							}
						}

						.item-right-content {
							width: 100%;
							margin-top: 16rpx;
							font-size: 24rpx;
							line-height: 40rpx;
							// word-break: break-all;

							image {
								width: 24rpx;
								height: 24rpx;
							}
						}

						.item-right-bot {
							width: 100%;
							margin-top: 16rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.bot-box {
								color: rgb(153, 153, 153);
								font-size: 20rpx;
							}
						}
					}
				}
			}
		}
	}
</style>