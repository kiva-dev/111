<template>
	<view class="auct-page">
		<view class="ap-header">
			<view class="ap-header-container">
				<p>{{$t('mine.auction')}}</p>
				<image @click="tomine" src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="ap-switch">
			<view :class="type === 1 ? 'active':''" @click="onTypeClcik(1)">{{$t('user.auctionM.jpz')}}</view>
			<template v-if="navId==1">
				<view :class="type === 5 ? 'active':''" @click="onTypeClcik(5)">{{$t('user.auctionM.jpdd')}}</view>
			</template>
			<view :class="type === 3 ? 'active':''" @click="onTypeClcik(3)">{{$t('user.auctionM.zpjl')}}</view>
			<template v-if="navId==1">
				<view :class="type === 4 ? 'active':''" @click="onTypeClcik(4)">{{$t('user.auctionM.jpjl')}}</view>
			</template>
			<view class="ap-switch-line" :style="{left: shifting}"></view>
		</view>
		<!-- 竞拍中 -->
		<view class="auct-box" v-if="type == 1">
			<template v-if="auctionList && auctionList.length > 0">
				<view class="jping" v-for="(item,i) in auctionList" :key="i" @click="toDetail(item.order_no)">
					<view class="jping-left">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="jping-right">
						<view class="jping-name">{{item.goods_name}}</view>
						<view class="jping-icon">
							<view class="li-icon" v-for="tag in item.tags" :key="tag.tag_id">
								<image :src="tag.image" mode="widthFix"></image>
							</view>
						</view>
						<view class="jping-num">
							<view class="jping-num-box">
								<image src="@/static/images/new-index/detail_icon_collect.png" mode="widthFix"></image>
								<p>{{item.litestore_goods_focus_total}}</p>
							</view>
							<view class="jping-num-box">
								<image src="@/static/images/new-index/detail_icon_clap.png" mode="widthFix"></image>
								<p>{{item.auction_goods_total}}</p>
							</view>
							<view class="jping-num-box">
								<image src="@/static/images/new-index/pl.png" mode="widthFix"></image>
								<p>{{item.litestore_goods_comment_total}}</p>
							</view>
						</view>
						<view class="jping-jd">
							<view class="jping-jd-box">
								<image :style="{'width': item.finish_rate*100 + '%'}" src="@/static/images/new-index/select-jd.png" mode="aspectFill"></image>
								<view class="box-progress">{{(item.finish_rate*100).toFixed(0)}}%</view>
							</view>
						</view>
						<view class="jping-price">
							<view class="jping-price-left">
								<view class="jping-price-new"><span>RM</span>{{item.auction_price}}</view>
								<view class="jping-price-old">RM{{item.price}}</view>
							</view>
							<view class="jping-price-btn">
								<image src="@/static/images/mine/auctionm_icon_auction.png" mode="widthFix"></image>
								<p>{{$t('auction.qiangpai')}}</p>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<uni-empty message="暂无内容"></uni-empty>
			</template>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.auct-page {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
		
		.ap-header {
			width: 100%;
			background: rgb(255, 255, 255);
			padding-top: 88rpx;
			box-sizing: border-box;
		
			.ap-header-container {
				width: 100%;
				height: 88rpx;
				text-align: center;
				line-height: 88rpx;
				position: relative;
		
				p {
					color: rgb(51, 51, 51);
					font-size: 40rpx;
				}
		
				image {
					width: 40rpx;
					position: absolute;
					top: 50%;
					left: 32rpx;
					transform: translateY(-50%);
				}
			}
		}
		
		.ap-switch {
			width: 100%;
			height: 90rpx;
			background: rgb(255, 255, 255);
			display: flex;
			position: relative;
			color: rgb(51, 51, 51);
			font-size: 22rpx;
			text-align: center;
			line-height: 80rpx;
		
			view {
				flex: 1;
				transition: color .2s;
		
				&.active {
					position: relative;
					color: rgb(10, 198, 142);
				}
			}
		
			.ap-switch-line {
				position: absolute;
				background: rgba(10, 198, 142, 0.3);
				width: 64rpx;
				height: 8rpx;
				border-radius: 100rpx;
				bottom: 12rpx;
				left: 0;
				transition: left .5s;
			}
		}
		
		.auct-box {
			width: 100%;
			padding: 24rpx 32rpx;
			box-sizing: border-box;
			
			.jping {
				width: 100%;
				background: rgb(255, 255, 255);
				border-radius: 20rpx;
				margin-bottom: 24rpx;
				overflow: hidden;
				display: flex;
			
				.jping-left {
					width: 272rpx;
					height: 272rpx;
			
					image {
						width: 100%;
						height: 100%;
					}
			
					.jping-left-q {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 280rpx;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 24rpx;
						color: rgb(255, 255, 255);
						text-align: center;
						background: rgba(255, 78, 47, 0.3);
						border-radius: 0 0 16rpx 16rpx;
						z-index: 10;
					}
				}
			
				.jping-right {
					width: calc(100% - 272rpx);
					height: 272rpx;
					padding: 20rpx 24rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
			
					.jping-name {
						width: 100%;
						color: rgb(51, 51, 51);
						font-size: 28rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					
					.jping-icon {
						display: flex;
						align-items: center;
						
						.li-icon {
							width: 30rpx;
							height: 30rpx;
							margin-right: 16rpx;
							display: flex;
							
							image {
								width: 100%;
							}
						}
					}
					
					.jping-num {
						width: 100%;
						display: flex;
						align-items: center;
						
						.jping-num-box {
							margin-right: 16rpx;
							padding-right: 16rpx;
							box-sizing: border-box;
							display: flex;
							align-items: center;
							border-right: 1rpx solid #CCCCCC;
							
							&:last-child {
								border-right: none;
							}
							
							image {
								width: 25rpx;
								height: 25rpx;
							}
							
							p {
								margin-left: 8rpx;
								color: rgb(102, 102, 102);
								font-size: 16rpx;
							}
						}
					}
			
					.jping-price {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
			
						.jping-price-left {
			
							.jping-price-new {
								color: rgb(255, 57, 57);
								font-size: 32rpx;
								font-weight: bold;
								
								span {
									font-size: 20rpx;
								}
							}
			
							.jping-price-old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}
						}
			
						.jping-price-btn {
							width: 124rpx;
							height: 48rpx;
							box-sizing: border-box;
							border: 2rpx solid rgb(10, 198, 142);
							border-radius: 100rpx;
							text-align: center;
							line-height: 48rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							
							image {
								width: 28rpx;
								transform: translateY(2rpx);
							}
							
							p {
								margin-left: 8rpx;
								font-size: 24rpx;
								color: rgb(10, 198, 142);
							}
						}
			
					}
			
					.jping-jd {
						width: 100%;
						display: flex;
						align-items: center;
						
						.jping-jd-box {
							width: 280rpx;
							height: 32rpx;
							box-sizing: border-box;
							background: rgba(255, 0, 0, 0.1);
							border: 1rpx solid rgb(255, 197, 182);
							border-radius: 100rpx;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							position: relative;
							
							image {
								height: 32rpx;
								border-radius: 100rpx;
							}
							
							.box-progress {
								color: rgb(255, 255, 255);
								font-size: 20rpx;
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%,-50%);
								z-index: 9;
							}
						}
					}
				}
			}
		}
	}
</style>