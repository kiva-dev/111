<template>
	<view class="detail-page">
		<uni-header :title="$t('user.order.detail.title')"></uni-header>
		<view class="info-layout">
			<view class="il-container">
				<view class="il-container-top">
					<view class="top-bar">
						<view class="top-bar-shop">
							<image src="@/static/images/new-index/detail_demo_cover.png" mode="aspectFill"></image>
							<p>Merchant Name</p>
						</view>
						<view class="top-bar-status">
							<text style="color: #1DD181;">To BeConfirmed</text>
						</view>
					</view>
					<view class="top-info">
						
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
				
			}
		},
		onLoad() {
			
		},
		methods: {
			
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
					padding-bottom: 32rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #CCCCCC;
					
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
					}
				}
			}
		}
	}
</style>