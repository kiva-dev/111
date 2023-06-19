<template>
	<view class="cart">
		<view class="head">
			<image src="/static/images/new-index/return.png" class="return" @click="toBack()"></image>
			<view class="txt">My Cart</view>
			<view class="right">
				<image src="/static/images/new-index/edit.png"></image>
				<view>Edit</view>
			</view>
		</view>

		<!--购物车商品列表-->
		<view class="list" v-for="item in [1,1]">
			<view class="head_info">
				<image src="../../static/images/new-index/wxz.png" class="head_logo"></image>
				<image src="../../static/images/new-index/xz.png" class="head_logo" v-show="false"></image>
				<view class="head_txt">Best Household</view>
				<image src="../../static/images/products/right.png" class="head_more"></image>
			</view>

			<view class="item" v-for="(data,i) in [1,1]">
				<view class="detail">
					<image src="/static/images/new-index/wxz.png" class="logo"></image>
					<image src="../../static/images/new-index/xz.png" class="logo" v-show="false"></image>
					<image src="../../static/fxtu.png" class="img"></image>
					<view class="info">
						<view class="name">Xiaomi 33W Power Bank 10000mA Pock EditiPock3 Power Bank</view>
						<view class="guige">
							<view>256GB,10000mAh,Pro</view>
							<image src="/static/images/new-index/btm.png"></image>
						</view>
						<view class="tags">
							<view>xiaomi</view>
						</view>
					</view>
				</view>
				<view class="price-info">
					<view class="price">RM<span>1990.00</span></view>
					<view class="btn">
						<view class="jian" @click="changNum('jian')">
							<image src="../../static/images/new-index/jian1.png" v-if="num==1"></image>
							<image src="/static/images/new-index/jian.png" v-else></image>
						</view>
						<view class="myinput">
							<input type="number" v-model="num" @confirm="inspectNum()" />
						</view>
						<view class="jia" @click="changNum('jia')">
							<image src="../../static/images/new-index/jia.png"></image>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="btm">
			<image src="../../static/images/new-index/wxz.png"></image>
			<image src="../../static/images/new-index/xz.png" v-show="false"></image>
			<view class="btm-all">All</view>
			<view class="btm-price">Total:<span>RM</span><span style="font-size: 36rpx;">13069.00</span></view>
			<view class="btm-btn">Check Out(4)</view>
		</view>

		<!--规格选择-->
		<uni-popup ref="popup" type="bottom">
			<view class="showgg">
				<view class="top">
					<image src="../../static/fxtu.png" class="product-img"></image>
					<image src="/static/images/close1.png" class="close"></image>
					<view class="name">White,256GB,5G</view>
					<view class="price">RM<span>1990.00</span></view>
				</view>

				<view class="line"></view>

				<view class="info" v-for="item in list" :key="item.id">
					<view class="info-name">{{item.name}}</view>
					<view class="info-tags">
						<view class="info-tag" v-for="data in item.tags" :key="data.id"
							:class="data.select ?'select':''">{{data.name}}</view>
					</view>
				</view>
				
				<view class="confirm">Confirm</view>

			</view>
		</uni-popup>

		<view style="height: 136rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 1,
				list: [{
						id: 1,
						name: "Color",
						tags: [{
							id: 11,
							select: true,
							name: 'White'
						}, {
							id: 12,
							select: false,
							name: 'Red'
						}, {
							id: 13,
							select: false,
							name: 'Black'
						}, {
							id: 14,
							select: false,
							name: 'Yellow'
						}, {
							id: 15,
							select: false,
							name: 'Blue'
						}, {
							id: 16,
							select: false,
							name: 'Green'
						}]
					}, {
						id: 2,
						name: "Memory",
						tags: [{
							id: 21,
							select: true,
							name: '128GB'
						}, {
							id: 22,
							select: false,
							name: '256GB'
						}, {
							id: 23,
							select: false,
							name: '512GB'
						}, {
							id: 24,
							select: false,
							name: '1TB'
						}]
					},
					{
						id: 3,
						name: "Network",
						tags: [{
							id: 31,
							select: true,
							name: '4G'
						}, {
							id: 32,
							select: false,
							name: '5G'
						}]
					}
				]
			}
		},
		mounted() {
			this.$refs.popup.open()
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			//加减数字
			changNum(type) {
				if (type == 'jia') {
					this.num++
				} else {
					if (this.num == 1) return
					this.num--
				}
			},
			//验证数据是否合法
			inspectNum() {
				if (this.num < 1) this.num = 1
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.uni-input-input {
		text-align: center !important;
	}

	.cart {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.head {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: rgb(10, 198, 142);

			.return {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			.txt {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.right {
				position: absolute;
				right: 32rpx;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				display: flex;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
		}

		.btm {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 96rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);

			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 32rpx;
			}

			.btm-all {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
				margin-left: 24rpx;
			}

			.btm-price {
				position: absolute;
				right: 248rpx;
				font-size: 28rpx;
				color: rgb(51, 51, 51);

				span {
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);
				}
			}

			.btm-btn {
				position: absolute;
				right: 32rpx;
				width: 200rpx;
				height: 72rpx;
				line-height: 72rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 72rpx;
			}

		}

		.list {
			width: 100%;
			padding-top: 32rpx;
			background: #fff;
			margin-bottom: 8rpx;

			.head_info {
				width: 100%;
				display: flex;
				align-items: center;

				.head_logo {
					width: 40rpx;
					height: 40rpx;
					margin-left: 32rpx;
				}

				.head_txt {
					font-size: 36rpx;
					color: rgb(51, 51, 51);
					margin-left: 24rpx;
				}

				.head_more {
					width: 28rpx;
					height: 28rpx;
					margin-left: 8rpx;
				}
			}

			.item {
				width: 100%;
				height: 260rpx;
			}

			.detail {
				position: relative;
				width: 100%;
				height: 172rpx;
				display: flex;
				align-items: center;
				margin-top: 40rpx;

				.logo {
					width: 40rpx;
					height: 40rpx;
					margin: 0 24rpx 0 32rpx;
				}

				.img {
					width: 172rpx;
					height: 172rpx;
					border-radius: 16rpx;
					margin-right: 24rpx;
				}

				.info {
					width: 416rpx;
					height: 172rpx;

					.name {
						width: 416rpx;
						font-size: 24rpx;
						line-height: 36rpx;
						color: rgb(51, 51, 51);
						word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.guige {
						width: 260rpx;
						height: 40rpx;
						font-size: 24rpx;
						color: rgb(153, 153, 153);
						display: flex;
						align-items: center;
						justify-content: center;
						background: rgb(242, 242, 242);
						border-radius: 40rpx;
						margin-top: 16rpx;

						view {
							width: 196rpx;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						image {
							width: 16rpx;
							height: 16rpx;
							margin-left: 8rpx;
						}
					}

					.tags {
						width: 100%;
						display: flex;
						align-items: center;
						margin-top: 12rpx;

						view {
							font-size: 16rpx;
							color: rgb(102, 102, 102);
							padding: 4rpx 8rpx;
							box-sizing: border-box;
							border: 1rpx solid rgb(204, 204, 204);
							border-radius: 4rpx;
							margin-right: 12rpx;
						}
					}

				}

			}

			.price-info {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 50rpx;

				.price {
					position: absolute;
					right: 312rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);

					span {
						font-size: 28rpx;
					}
				}

				.btn {
					position: absolute;
					right: 32rpx;
					width: 132rpx;
					height: 48rpx;
					display: flex;
					align-items: center;
					background: #fff;
					box-sizing: border-box;
					border: 1rpx solid rgb(204, 204, 204);
					border-radius: 48rpx;

					.jian {
						width: 40rpx;
						height: 48rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 16rpx;
							height: 2rpx;
						}
					}

					.jia {
						width: 40rpx;
						height: 48rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 16rpx;
							height: 16rpx;
						}
					}

					.myinput {
						width: 52rpx;
						height: 100%;
						border: 1rpx solid rgb(204, 204, 204);
						border-top: none;
						border-bottom: none;
					}
				}
			}

		}

		//规格选择
		.showgg {
			position: relative;
			width: 750rpx;
			height: 1276rpx;
			padding-top: 32rpx;
			background: #fff;
			border-radius: 24rpx 24rpx 0 0;

			.top {
				position: relative;
				width: 100%;
				height: 240rpx;

				.product-img {
					width: 240rpx;
					height: 240rpx;
					border-radius: 16rpx;
					margin-left: 32rpx;
				}

				.close {
					position: absolute;
					top: 0;
					right: 36rpx;
					width: 20rpx;
					height: 20rpx;
				}

				.name {
					position: absolute;
					left: 296rpx;
					bottom: 62rpx;
					font-size: 24rpx;
					color: rgb(153, 153, 153);
				}

				.price {
					position: absolute;
					left: 296rpx;
					bottom: 0;
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);

					span {
						font-size: 32rpx;
					}
				}
			}

			.line {
				width: 686rpx;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				margin: 32rpx auto;
			}

			.info {
				width: 100%;
				margin-bottom: 40rpx;

				.info-name {
					font-size: 28rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
					margin-left: 32rpx;
				}

				.info-tags {
					width: 686rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					margin: 0 auto;

					.info-tag {
						font-size: 26rpx;
						color: rgb(102, 102, 102);
						padding: 20rpx 40rpx;
						background: rgb(245, 245, 245);
						border-radius: 100rpx;
						margin: 22rpx 24rpx 0rpx 0;
					}

					.select {
						color: rgb(10, 198, 142);
						background: rgba(10, 198, 142, 0.1);
						box-sizing: border-box;
						border: 1rpx solid rgb(10, 198, 142);
					}
				}
			}
			
			.confirm{
				position: absolute;
				left: 32rpx;
				bottom: 40rpx;
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 88rpx;
			}
			
		}

	}
</style>