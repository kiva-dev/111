<template>
	<view class="collect-layout">
		<view class="cl-header">
			<view class="cl-header-container">
				<p>{{$t('collect.nav')}}</p>
				<image @click="onBack" src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="cl-switch">
			<view @click="selectCollectType('goods')" :class="collectType === 'goods' ? 'active':''">{{$t('collect.collectGoods')}}</view>
			<view @click="selectCollectType('shop')" :class="collectType === 'shop' ? 'active':''">{{$t('collect.collectShop')}}</view>
			<view class="cl-switch-line" :style="{ left: collectType === 'goods' ? '20.5%':'71%'}"></view>
		</view>
		<template v-if="dataList && dataList.length > 0">
			<view class="cl-goods" v-show="collectType === 'goods'">
				<view class="cl-goods-item" v-for="(item,index) in dataList" :key="item.goods_id"
					@touchstart="onTouchStart" @touchmove="onTouchEnd" :class="item.touchSwich == true ?'isSlide':''"
					:data-index='index' @click="toProductInfo(item)">
					<view class="item-cover">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="item-info">
						<view class="item-info-name">{{item.goods_name}}</view>
						<view class="item-info-data">
							<view class="data-left">
								<view class="data-l-price">
									<text>RM</text>{{item.goods_price}}
								</view>
								<view class="data-l-shop">
									<image :src="item.shop_logo" mode="aspectFill"></image>
									<p>{{item.shop_name}}</p>
								</view>
							</view>
							<view class="data-right">
								<image src="@/static/images/new/collect_btn_cart.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="item-btn" :class="item.touchSwich == true ?'item-delete':''"
						@click.stop="deleteGoods(item)">
						<text>{{$t('collect.unCollect')}}</text>
					</view>
				</view>
			</view>
			<view class="cl-shop" v-show="collectType === 'shop'">
				<view class="cl-shop-item" v-for="(item,index) in dataList" :key="item.goods_id"
					@touchstart="onTouchStart" @touchmove="onTouchEnd" :class="item.touchSwich == true ?'isSlide':''"
					:data-index='index'>
					<view class="item-cover">
						<image :src="item.shop_logo" mode="aspectFill"></image>
					</view>
					<view class="item-info">
						<view class="item-info-container">
							<view class="item-info-name">{{item.shop_name}}</view>
							<view class="item-info-text">{{item.shop_info}}</view>
						</view>
					</view>
					<view class="item-btn" :class="item.touchSwich == true ?'item-delete':''" @click.stop="deleteShop(item)">
						<text>{{$t('collect.unSubscribe')}}</text>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="cl-null">
				<image src="@/static/images/new/zwdd.png" mode="widthFix"></image>
				<p>{{$t('new.zwxgnr')}}</p>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectType: 'goods', //goods shop
				page: 1,
				dataList: [],
				startX: 0,
				startY: 0,
			}
		},
		onLoad(option) {
			this.collectType = option.type || 'goods';
			this.getCollectList();
		},
		onReachBottom() {
			this.page++;
			this.getCollectList();
		},
		methods: {
			onBack() {
				uni.navigateBack();
			},
			selectCollectType(type) {
				if (type !== this.collectType) {
					this.collectType = type;
					this.page = 1;
					this.dataList = [];
					this.getCollectList();
				}
			},
			getCollectList() {
				this.$http.post(this.$apiObj.MineFocusList, {
					page: this.page,
					pagenum: 10,
					type: this.collectType === 'goods' ? 1 : 2,
					token: uni.getStorageSync('token')
				}).then((res) => {
					if (res.code == 1) {
						let arr = res.data.data.map(item => {
							item.touchSwich = false;
							return item;
						})
						if (this.page > 1) {
							this.dataList = this.dataList.concat(arr);
						} else {
							this.dataList = arr;
						}
					}
				})
			},
			toProductInfo(item) {
				if (!item.touchSwich) {
					uni.navigateTo({
						url: '/pages/auction/product_info?goodsId=' + item.goods_id
					});
				}
			},
			deleteGoods(item) {
				uni.showModal({
					title: this.$t('mine.tip'),
					content: this.$t('collect.deleteGoods'),
					success: (res) => {
						if (res.confirm) {
							this.$http.post(this.$apiObj.MineFocus, {
								type: 1,
								data_id: item.goods_id
							}).then(res => {
								if (res.code == 1) {
									this.page = 1;
									this.getCollectList();
								}
							})
						}
					},
				});
			},
			deleteShop(item) {
				uni.showModal({
					title: this.$t('mine.tip'),
					content: this.$t('collect.deleteShop'),
					success: (res) => {
						if (res.confirm) {
							this.$http.post(this.$apiObj.MineFocus, {
								type: 2,
								data_id: item.id
							}).then(res => {
								if (res.code == 1) {
									this.page = 1;
									this.getCollectList();
								}
							})
						}
					},
				});
			},
			onTouchStart(e) {
				var operationArr = this.dataList;
				operationArr.forEach(function(v, i) {
					if (v.touchSwich) {
						v.touchSwich = false;
					}
				});
				this.startX = e.changedTouches[0].clientX;
				this.startY = e.changedTouches[0].clientY;
				this.$emit('touchEv', operationArr);
			},
			onTouchEnd(e) {
				var operationArr = this.dataList;
				var index = e.currentTarget.dataset.index,
					startX = this.startX,
					startY = this.startY,
					touchMoveX = e.changedTouches[0].clientX,
					touchMoveY = e.changedTouches[0].clientY,
					angle = this.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY
					});
				operationArr.forEach(function(v, i) {
					v.touchSwich = false
					if (Math.abs(angle) > 30) return;
					if (i == index) {
						if (touchMoveX > startX) {
							v.touchSwich = false;
						} else {
							v.touchSwich = true;
						}
					}
				})
				this.$emit('touchEv', operationArr);
			},
			angle(start, end) {
				var _X = end.X - start.X,
					_Y = end.Y - start.Y;
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			}
		}
	}
</script>

<style lang="less" scoped>
	.collect-layout {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
		overflow: hidden;

		.cl-header {
			width: 100%;
			background: rgb(255, 255, 255);
			padding-top: 88rpx;
			box-sizing: border-box;

			.cl-header-container {
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

		.cl-switch {
			width: 100%;
			height: 80rpx;
			background: rgb(255, 255, 255);
			display: flex;
			position: relative;
			color: rgb(51, 51, 51);
			font-size: 28rpx;
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

			.cl-switch-line {
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

		.cl-goods {
			padding: 24rpx 32rpx;
			box-sizing: border-box;
			overflow: hidden;

			.cl-goods-item {
				width: 100%;
				background: rgb(255, 255, 255);
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				position: relative;
				transition: transform 0.4s;

				&:last-child {
					margin-bottom: 0;
				}

				.item-cover {
					width: 220rpx;
					height: 220rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 20rpx 0 0 20rpx;
					}
				}

				.item-info {
					flex: 1;
					height: 220rpx;
					padding: 20rpx 24rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;

					.item-info-name {
						width: 100%;
						color: rgb(51, 51, 51);
						font-size: 24rpx;
						line-height: 36rpx;
						word-break: break-all;
					}

					.item-info-data {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;

						.data-left {

							.data-l-price {
								color: rgb(255, 57, 57);
								font-size: 28rpx;

								text {
									font-size: 20rpx;
								}
							}

							.data-l-shop {
								margin-top: 16rpx;
								display: flex;
								align-items: center;

								image {
									width: 32rpx;
									height: 32rpx;
									border-radius: 50%;
								}

								p {
									margin-left: 8rpx;
									color: rgb(51, 51, 51);
									font-size: 20rpx;
								}
							}
						}

						.data-right {
							width: 48rpx;

							image {
								width: 100%;
							}
						}
					}
				}

				.item-btn {
					width: 136rpx;
					height: 220rpx;
					background: rgb(236, 118, 132);
					border-radius: 0 20rpx 20rpx 0;
					text-align: center;
					line-height: 220rpx;
					position: absolute;
					right: 0;
					top: 50%;
					transform: translate(100%, -50%);
					transition: visibility .2s;
					visibility: hidden;

					text {
						color: rgb(255, 255, 255);
						font-size: 24rpx;
					}
				}

				.item-delete {
					visibility: visible;
				}
			}

			.isSlide {
				border-radius: 20rpx 0 0 20rpx;
				transform: translateX(-136rpx);
			}
		}

		.cl-shop {
			padding-bottom: 32rpx;
			box-sizing: border-box;

			.cl-shop-item {
				width: 100%;
				display: flex;
				align-items: center;
				position: relative;
				-webkit-transition: all 0.4s;
				transition: all 0.4s;

				.item-cover {
					padding: 32rpx;
					box-sizing: border-box;

					image {
						width: 112rpx;
						height: 112rpx;
						border-radius: 50%;
					}
				}

				.item-info {
					width: calc(100% - 176rpx);
					border-bottom: 1rpx solid rgb(204, 204, 204);
					padding: 32rpx 0;
					box-sizing: border-box;
					
					.item-info-container {
						width: 100%;
						height: 112rpx;
						padding: 7rpx 0;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: flex-start;
						
						.item-info-name {
							padding-right: 32rpx;
							box-sizing: border-box;
							color: rgb(51, 51, 51);
							font-size: 28rpx;
							font-weight: bold;
						}
						
						.item-info-text {
							width: 100%;
							padding-right: 32rpx;
							box-sizing: border-box;
							color: rgb(102, 102, 102);
							font-size: 24rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
				
				.item-btn {
					width: 145rpx;
					height: 180rpx;
					background: rgb(135, 138, 155);
					text-align: center;
					line-height: 180rpx;
					position: absolute;
					right: 0;
					top: 50%;
					transform: translate(100%, -52%);
				
					text {
						color: rgb(255, 255, 255);
						font-size: 20rpx;
					}
				}
			}

			.isSlide {
				transform: translateX(-145rpx);
			}
		}
		
		.cl-null {
			padding-top: 200rpx;
			text-align: center;
			
			image {
				width: 360rpx;
			}
			
			p {
				font-size: 32rpx;
				color: rgb(190, 190, 190);
			}
		}
	}
</style>