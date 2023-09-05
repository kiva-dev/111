<template>
	<view class="lucky-page">
		<view class="banner-layout">
			<image src="/static/images/new-index/luckstar-en.png" mode="widthFix" v-if="isEnglish"></image>
			<image src="/static/images/new-index/luckstar-zh.png" v-else></image>
		</view>
		<view class="switch">
			<view class="switch-info" @click="navClick('/pages/auction/lucky/leaderboard')">
				<view class="left">
					<view class="left-name">{{$t('ranking.ranking_list')}}</view>
					<view class="left-more">{{$t('ranking.gotoview')}}<image src="/static/images/luck/luck-right.png"></image></view>
				</view>
				<!-- <view class="right">
					<image src="/static/images/luck/luck_list.png"></image>
				</view> -->
			</view>
			
			<!-- <view class="switch-info">
				<view class="left">
					<view class="left-name">{{$t('ranking.luck_forum')}}</view>
					<view class="left-more">{{$t('ranking.gotoview')}}<image src="/static/images/mine/mine_icon_right.webp"></image></view>
				</view>
				<view class="right">
					<image src="/static/images/luck/msg_list.png"></image>
				</view>
			</view> -->
		</view>
		<view class="member-layout">
			
			<view class="ml-title">
				<!-- <view class="ml-title-icon">
					<image src="@/static/images/new-index/lv-start.png" mode="widthFix"></image>
				</view> -->
				<view class="ml-title-text">{{$t('xyzx')}}</view>
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
								<image src="@/static/images/mine/mine_icon_vip.webp" mode="widthFix"></image>
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
								In the Wish Pool Campaigns provided by{{' '}}
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
							<view class="bot-box">{{$filter.to_date_time(item.end_time)}}</view>
							<view class="bot-box">{{item.stage_num}}{{$t('auction.qi')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示领奖弹窗 -->
		<!-- <Bell ref="Bell" /> -->
		
		<!--赠金弹出-->
		<Bonus></Bonus>
	</view>
</template>

<script>
	export default {
		components: {},
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
			navClick(url){
				uni.navigateTo({
					url
				})
			},
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
			height: 900rpx;

			image {
				width: 100%;
				height: 900rpx;
			}
		}
		
		//头部切换
		.switch{
			position: relative;
			width: 750rpx;
			height: 220rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(180.00deg, rgb(255, 227, 221),rgba(255, 255, 255) 100%);
			margin-top: -390rpx;
			z-index: 9;
			
			.switch-info{
				position: relative;
				width: 686rpx;
				height: 176rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: url('/static/images/luck/ranking-bj.png') no-repeat;
				background-size: 686rpx 176rpx;
				border-radius: 24rpx;
				margin: 0 10rpx;
				
				.left{
					margin-right: 240rpx;
					
					.left-name{
						position: absolute;
						top: 26rpx;
						left: 56rpx;
						font-size: 44rpx;
						font-weight: bold;
						color: rgb(248, 91, 0);
					}
					
					.left-more{
						position: absolute;
						left: 56rpx;
						bottom: 26rpx;
						width: 184rpx;
						height: 50rpx;
						font-size: 28rpx;
						color: rgb(255, 255, 255);
						background: linear-gradient(90.00deg, rgb(254, 160, 62),rgb(255, 100, 14) 100%);
						border-radius: 50rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						
						image{
							width: 20rpx;
							height: 20rpx;
							margin-left: 4rpx;
						}
					}
					
				}
				
				.right{
					
					image{
						width: 100rpx;
						height: 100rpx;
					}
				}
				
			}
			
		}

		.member-layout {
			width: 100%;
			min-height: 50vh;
			background: rgb(255, 255, 255);
			// border-radius: 32rpx;
			margin-top: -4rpx;
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