<template>
	<view class="view_page">
		<view class="service-head">
			<image src="/static/images/kbrick/kleft.png" @click="toBack()"></image>
			<view>Kolibri fan base 1</view>
		</view>

		<view class="des">
			<view class="info">
				<view class="info-time">6/30 17:13</view>
				<view class="dialogue">
					<view class="left">
						<image src="/static/images/service/service.png"></image>
						<view class="auth-info">
							<view class="auth-name">Eason Chan</view>
							<view class="auth-des">Hello, I am platform customer service.May I help you?</view>
						</view>
					</view>
					<view class="right">
						<view>Here is my question,Here is my question,Here is my question</view>
						<image src="/static/images/service/service.png"></image>
					</view>

				</view>
			</view>
		</view>

		<view class="btm">
			<view class="btm-show">
				<view class="myinput">
					<view class="input">
						<u--input placeholder="Please enter your question" border="none" v-model="content"></u--input>
					</view>
				</view>
				<image src="/static/images/service/add.png" v-show="!showMore" @click="showMore=!showMore"></image>
				<image src="/static/images/service/close.png" v-show="showMore" @click="showMore=!showMore"></image>
			</view>
			<view class="btm-hide" v-show="showMore">
				<view class="btm-hide-info" style="margin-left: 28rpx;">
					<image src="/static/images/service/img.png"></image>
					<view>Album</view>
				</view>
			</view>
		</view>

		<view style="height: 168rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				showMore: false,
				selectOrder: 1,
				list: [

				]
			}
		},
		mounted() {

		},
		methods: {
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.view_page {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.service-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #fff;

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

		}

		.des {
			width: 100%;
			margin-top: 32rpx;

			.info {
				width: 100%;

				.info-time {
					width: 176rpx;
					height: 52rpx;
					line-height: 52rpx;
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					text-align: center;
					background: rgba(0, 0, 0, 0.1);
					border-radius: 52rpx;
					margin: 0 auto 44rpx auto;
				}

				.dialogue {
					width: 100%;

					.left {
						width: 100%;
						display: flex;
						margin-bottom: 64rpx;

						image {
							display: block;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin: 0 8rpx 0 32rpx;
						}

						.auth-info {
							.auth-name {
								font-size: 24rpx;
								color: rgb(51, 51, 51);
								margin: 0 0 12rpx 24rpx;
							}

							.auth-des {
								width: 538rpx;
								line-height: 40rpx;
								font-size: 24rpx;
								color: rgb(51, 51, 51);
								padding: 24rpx 24rpx 24rpx 32rpx;
								background: url('/static/images/service/white.png') no-repeat;
								background-size: 586rpx 100%;
							}
						}


					}

					.right {
						position: relative;
						width: 100%;
						display: flex;
						justify-content: flex-end;
						margin-bottom: 64rpx;

						image {
							display: block;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin: 0 32rpx 0 8rpx;
						}

						view {
							width: 538rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							color: #fff;
							padding: 24rpx 24rpx 24rpx 32rpx;
							background: url('/static/images/service/green.png') no-repeat;
							background-size: 586rpx 100%;
						}

					}

				}

			}

		}

		.btm {
			position: fixed;
			bottom: 0;
			width: 100%;
			// height: 100rpx;
			padding-bottom: 68rpx;
			background: #fff;
			z-index: 100;

			.btm-show {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;

				.myinput {
					width: 586rpx;
					height: 68rpx;
					display: flex;
					align-items: center;
					background: rgb(239, 239, 239);
					border-radius: 68rpx;
					margin: 0 32rpx;

					.input {
						width: 90%;
						margin: 0 auto;
					}
				}

				image {
					display: block;
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
				}

			}

			.btm-hide {
				width: 100%;
				height: 232rpx;
				display: flex;
				align-items: center;

				.btm-hide-info {
					width: 150rpx;
					text-align: center;
					margin-left: 38rpx;

					image {
						width: 112rpx;
						height: 112rpx;
					}

					view {
						font-size: 24rpx;
						color: rgb(102, 102, 102);
						margin-top: 16rpx;
					}

				}

			}

		}

		.show-order {
			width: 100%;
			height: 1000rpx;
			background: rgb(248, 248, 248);
			border-radius: 24rpx 24rpx 0 0;

			.order-head {
				position: relative;
				width: 100%;
				padding-top: 32rpx;
				padding-bottom: 16rpx;
				background: #fff;
				border-radius: 24rpx 24rpx 0 0;

				.order-head-tit {
					width: 100%;
					font-size: 40rpx;
					color: rgb(51, 51, 51);
					text-align: center;
				}

				image {
					position: absolute;
					top: 40rpx;
					right: 32rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.order-switch {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 40rpx;

					.order-switch-info {
						margin: 0 116rpx;

						text {
							display: block;
							width: 72rpx;
							height: 8rpx;
							background: rgba(10, 198, 142, 0);
							border-radius: 8rpx;
							margin: 0 auto;
						}

						.tit {
							font-size: 28rpx;
							color: rgb(51, 51, 51);
						}

						.select {
							background: rgba(10, 198, 142, 0.4);
						}

						.select-tit {
							font-weight: bold;
						}

					}

				}

			}

			.auction {
				margin-top: 24rpx;

				.item {
					position: relative;
					width: 686rpx;
					height: 238rpx;
					background: #fff;
					border-radius: 20rpx;
					margin: 0 auto 20rpx auto;

					.item-img {
						position: absolute;
						top: 16rpx;
						left: 16rpx;
						width: 206rpx;
						height: 206rpx;
						border-radius: 16rpx;
					}

					.item-qi {
						position: absolute;
						left: 16rpx;
						bottom: 16rpx;
						width: 206rpx;
						height: 48rpx;
						line-height: 48rpx;
						font-size: 18rpx;
						color: #fff;
						text-align: center;
						background: rgba(0, 0, 0, 0.4);
						border-radius: 0 0 16rpx 16rpx;
					}

					.item-name {
						position: absolute;
						top: 20rpx;
						left: 238rpx;
						width: 228rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.item-status {
						position: absolute;
						top: 20rpx;
						right: 24rpx;
						font-size: 20rpx;
						color: rgb(10, 198, 142);
					}

					.item-auction-price {
						position: absolute;
						top: 60rpx;
						left: 238rpx;
						font-size: 16rpx;
						color: rgb(153, 153, 153);
					}

					.item-code {
						position: absolute;
						top: 80rpx;
						right: 24rpx;
						font-size: 20rpx;
						color: rgb(153, 153, 153);
					}

					.item-code-info {
						position: absolute;
						top: 116rpx;
						right: 64rpx;
						font-size: 20rpx;
						color: rgb(102, 102, 102);
					}

					.item-copy {
						position: absolute;
						top: 116rpx;
						right: 24rpx;
						width: 24rpx;
						height: 24rpx;
					}

					.item-zc {
						position: absolute;
						top: 156rpx;
						left: 238rpx;
						font-size: 16rpx;
						color: rgb(153, 153, 153);
					}

					.item-price {
						position: absolute;
						top: 180rpx;
						left: 238rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: rgb(255, 57, 57);

						text {
							font-size: 32rpx;
						}
					}

					.item-send {
						position: absolute;
						top: 170rpx;
						right: 24rpx;
						width: 130rpx;
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

			.order {
				margin-top: 24rpx;

				.order-item {
					position: relative;
					width: 686rpx;
					height: 328rpx;
					padding-top: 24rpx;
					background: #fff;
					border-radius: 20rpx;
					margin: 0 auto 20rpx auto;

					.order-item-head {
						position: relative;
						width: 100%;
						display: flex;
						align-items: center;

						image {
							display: block;
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							margin: 0 16rpx 0 24rpx;
						}

						.shop-name {
							font-size: 28rpx;
							color: rgb(51, 51, 51);
						}

						.shop-status {
							position: absolute;
							right: 24rpx;
							font-size: 24rpx;
							color: rgb(255, 57, 57);
						}
					}

					.order-item-img {
						position: absolute;
						top: 88rpx;
						left: 24rpx;
						width: 160rpx;
						height: 160rpx;
						border-radius: 16rpx;
					}

					.order-item-name {
						position: absolute;
						top: 88rpx;
						left: 208rpx;
						width: 454rpx;
						line-height: 36rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.order-item-num {
						position: absolute;
						top: 216rpx;
						left: 208rpx;
						font-size: 20rpx;
						color: rgb(153, 153, 153);
					}

					.order-item-price {
						position: absolute;
						top: 210rpx;
						right: 24rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: rgb(255, 57, 57);

						text {
							font-size: 32rpx;
						}
					}

					.order-item-send {
						position: absolute;
						top: 280rpx;
						right: 24rpx;
						width: 130rpx;
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

	}
</style>