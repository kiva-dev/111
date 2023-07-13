<template>
	<view class="association">
		<view class="association_head">
			<image src="/static/images/mine/left.png" class="left" @click="toBack()"></image>
			<view class="tit">{{$t('grop.addchat')}}</view>
		</view>

		<view class="center-tit">{{$t('grop.can_chat')}}</view>

		<template>
			<view class="association_list">
				<view class="item" v-for="item in list">
					<image src="/static/images/service/group_name.png" class="img"></image>
					<view class="item-name">Kolibri fan base 1</view>
					<view class="item-info">
						<image src="/static/images/service/nums.png"></image>
						<view>120/500</view>
					</view>
					<view class="item-btn">{{$t('grop.join')}}</view>
				</view>
			</view>
		</template>

		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [1, 1, 1, 1, 1],
				image: '/static/images/service/not_msg.png',
				isShopCont: false
			}
		},
		onShow() {

		},
		methods: {
			toBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.association {
		width: 100%;
		min-height: 100vh;
		background: rgb(255, 255, 255);

		.association_head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgb(204, 204, 204);

			.left {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			.tit {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

			.right {
				position: absolute;
				right: 32rpx;
				font-size: 20rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				display: flex;
				align-items: center;
				z-index: 5;

				image {
					width: 20rpx;
					height: 20rpx;
					margin-right: 8rpx;
				}

			}

		}

		.center-tit {
			width: 254rpx;
			height: 52rpx;
			line-height: 52rpx;
			font-size: 24rpx;
			color: rgb(10, 198, 142);
			text-align: center;
			box-sizing: border-box;
			border: 1rpx solid rgb(10, 198, 142);
			border-radius: 52rpx;
			margin: 32rpx auto 0 auto;
		}

		.association_list {
			margin-top: 32rpx;

			.item {
				position: relative;
				width: 686rpx;
				height: 140rpx;
				background: rgb(246, 246, 246);
				border-radius: 20rpx;
				margin: 0 auto 20rpx auto;

				.img {
					position: absolute;
					top: 16rpx;
					left: 16rpx;
					width: 108rpx;
					height: 108rpx;
					border-radius: 20rpx;
				}

				.item-name {
					position: absolute;
					top: 24rpx;
					left: 150rpx;
					max-width: 400rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.item-info {
					position: absolute;
					left: 150rpx;
					bottom: 24rpx;
					max-width: 420rpx;
					font-size: 24rpx;
					color: rgb(153, 153, 153);
					display: flex;
					align-items: center;
					
					image{
						display: block;
						width: 24rpx;
						height: 24rpx;
						margin-right: 8rpx;
					}
				}
				
				.item-btn{
					position: absolute;
					top: 50%;
					right: 28rpx;
					transform: translate(0,-50%);
					width: 92rpx;
					height: 48rpx;
					line-height: 48rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgb(10, 198, 142);
					border-radius: 48rpx;
				}

			}


		}

	}
</style>