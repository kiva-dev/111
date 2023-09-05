<template>
	<view class="recharge">
		<view class="top" :style="isShopCont?'height:1338rpx;':''">
			<view class="head">
				<image src="/static/images/mine/left.png" @click="toBack()"></image>
				<view class="tit_en" v-if="isShopCont">
					Recharge<br />
					Enjoy Benefits
				</view>
				<view class="tit_zn" v-else-if="!isShopCont">充值享好礼</view>
			</view>

			<view class="product">
				<view class="tit">{{$t('recharge.kdiamond_gift')}}</view>
				<view class="list">
					<view class="item" v-for="item in list" :key="item.user_lucky_lottery_prize_id"
						:style="prizeById == item.user_lucky_lottery_prize_id ?'background: linear-gradient(180.00deg, rgb(255, 157, 111),rgb(250, 243, 204) 100%);':''">
						<image :src="item.prize_image" v-show="item.goods_id>0"></image>
						<image src="/static/images/kbrick/diamond.png" v-show="item.goods_id==0" style="width: 40rpx;height: 40rpx;">
						</image>
						<view class="price">RM {{item.prize_price*1}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="btns">
			<view class="my_prize" @click="navClick('/pages/active/recharge/my_prize')">{{$t('recharge.my_prize')}}
			</view>
			<view class="free" @click="send()">{{prizeNum}} {{$t('recharge.free')}}</view>
		</view>

		<view class="rule">
			<view class="tit">{{$t('recharge.gift')}}</view>
			<view class="rule_list">
				<view class="rule_item" :style="isShopCont? '' :'margin-top: 56rpx;'">
					<text>1.</text>
					<view>{{$t('recharge.rule1')}}</view>
				</view>
				<view class="rule_item" :style="isShopCont? '' :'margin-top: 56rpx;'">
					<text>2.</text>
					<view>
						{{$t('recharge.rule2')}}
					</view>
				</view>
				<view class="rule_item" :style="isShopCont? '' :'margin-top: 56rpx;'">
					<text>3.</text>
					<view>{{$t('recharge.rule3')}}</view>
				</view>
			</view>
		</view>
		<view style="height: 42rpx;"></view>

		<u-popup :show="showPop" mode="center" bgColor="transparent">
			<view class="winning">
				<view class="tit">{{$t('recharge.gxnzj')}}</view>
				<view class="count_down">
					<view class="count_down_name">{{$t('recharge.countdown')}}: </view>
					<u-count-down :time="24 * 60 * 60 * 1000" format="HH:mm:ss" autoStart millisecond
						@change="onChange">
						<view class="time">
							<view class="time__custom"
								style="width: 40rpx;height: 40rpx;background-color: rgb(255, 57, 57);">
								<text
									class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
							</view>
							<text class="time__doc" style="color: rgb(255, 57, 57);">:</text>
							<view class="time__custom"
								style="width: 40rpx;height: 40rpx;background-color: rgb(255, 57, 57);">
								<text class="time__custom__item">{{ timeData.minutes }}</text>
							</view>
							<text class="time__doc" style="color: rgb(255, 57, 57);">:</text>
							<view class="time__custom"
								style="width: 40rpx;height: 40rpx;background-color: rgb(255, 57, 57);">
								<text class="time__custom__item">{{ timeData.seconds }}</text>
							</view>
						</view>
					</u-count-down>
				</view>
				<view class="info">
					<view class="left" v-if="prizeInfo.goods_id==0">
						<image src="/static/images/kbrick/diamond.png"></image>
						<view>{{prizeInfo.number}}</view>
					</view>
					<view class="left" style="padding-top: 0;height: 136rpx;" v-else>
						<image :src="prizeInfo.prize_image" style="width: 136rpx;height: 136rpx;border-radius: 16rpx;"></image>
					</view>
					<view class="right">
						<view class="product_name">{{prizeInfo.prize_name}}</view>
						<view class="value" v-if="prizeInfo.goods_id > 0">
							<view class="value_tit">{{$t('recharge.product_value')}}:</view>
							<view class="value_num">RM<text>{{prizeInfo.prize_price * 1}}</text></view>
						</view>
						<view class="amount">{{$t('recharge.amount')}}:<image src="/static/images/kbrick/diamond.png">
							</image>
							<text>{{prizeInfo.recharge_k_diamond_of_lottery * 1}}</text>
						</view>
					</view>
				</view>

				<view class="tip">{{$t('recharge.tip')}}</view>

				<view class="winning_btn">
					<view class="cancel" @click="showPop=false">{{$t('app.cancel')}}</view>
					<view class="now" @click="navClick('/pages/mine/K_brick_detail?data='+JSON.stringify(prizeInfo))">{{$t('recharge.now')}}</view>
				</view>

			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPop: false,
				timeData: {},
				isShopCont: false,
				list: [],
				prizeNum: 0, //抽奖次数
				prizeById: 0, //抽奖每次跳动的Id
				prizeInfo: {}, //中奖信息
				isPrize: false,//是否正在抽奖
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
		},
		onLoad() {
			this.getPrizeList()
			this.getPrizeNum()
		},
		methods: {
			onChange(e) {
				this.timeData = e
			},
			toBack() {
				uni.switchTab({
					url:'/pages/mine/mine'
				})
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			getPrizeList() {
				this.$http.post(this.$apiObj.PrizeList).then(res => {
					this.list = res.data
				})
			},
			getPrizeNum() {
				this.$http.post(this.$apiObj.PrizeGetNum).then(res => {
					this.prizeNum = res.data.lottery_number
				})
			},
			send() {
				if(this.isPrize) return
				this.$http.post(this.$apiObj.PrizeAward).then(res => {
					if (res.code == 1) {
						this.prizeInfo = res.data
						this.isPrize = true
						let interTimer;
						interTimer = setInterval(() => {
							let random = Math.floor(Math.random() * this.list.length) + 1
							this.list.forEach(item => {
								if (random == item.user_lucky_lottery_prize_id) this.prizeById =
									random
							})
						}, 200)

						setTimeout(() => {
							clearInterval(interTimer)
							this.prizeById = this.prizeInfo.user_lucky_lottery_prize_id
							this.showPop = true
							this.isPrize = false
							this.getPrizeNum()
						}, 3000)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.recharge {
		width: 750rpx;
		min-height: 100vh;
		background: rgb(255, 179, 191);

		.top {
			width: 750rpx;
			height: 1268rpx;
			background: url('/static/images/active/recharge_bj.png') no-repeat;
			background-size: 750rpx 1328rpx;

			.head {
				position: relative;
				width: 100%;
				padding-top: 88rpx;
				display: flex;

				image {
					position: absolute;
					left: 32rpx;
					width: 40rpx;
					height: 40rpx;
				}

				.tit_en {
					width: 100%;
					font-size: 64rpx;
					font-weight: 900;
					text-align: center;
					background: linear-gradient(90.00deg, rgb(255, 82, 82), rgb(255, 68, 29));
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					text-fill-color: transparent;
				}

				.tit_zn {
					width: 100%;
					font-size: 88rpx;
					font-weight: 900;
					text-align: center;
					letter-spacing: 20rpx;
					background: linear-gradient(90.00deg, rgb(255, 82, 82), rgb(255, 68, 29));
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					text-fill-color: transparent;
				}

			}

			.product {
				position: relative;
				width: 686rpx;
				height: 1016rpx;
				background: url('/static/images/active/prize_bj.png') no-repeat;
				background-size: 686rpx 1016rpx;
				margin: 12rpx auto 32rpx auto;

				.tit {
					position: absolute;
					top: 48rpx;
					left: 50%;
					transform: translate(-50%, 0);
					width: 440rpx;
					font-size: 32rpx;
					font-weight: 550;
					color: rgb(255, 57, 57);
					text-align: center;
				}

				.list {
					position: absolute;
					top: 238rpx;
					left: 80rpx;
					width: 538rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;

					.item {
						position: relative;
						width: 164rpx;
						height: 160rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						background: #fff;
						border-radius: 12rpx;
						margin-bottom: 16rpx;

						image {
							display: block;
							width: 108rpx;
							height: 108rpx;
							margin: 0 auto 12rpx auto;
						}

						.price {
							// position: absolute;
							// top: 124rpx;
							width: 100%;
							font-size: 20rpx;
							font-weight: bold;
							color: rgb(255, 57, 57);
							text-align: center;
						}
					}
				}

			}

		}

		.btns {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			view {
				width: 312rpx;
				height: 108rpx;
				line-height: 108rpx;
				font-size: 32rpx;
				font-weight: 700;
				color: rgb(255, 255, 255);
				text-align: center;
				margin: 0 14rpx;
			}

			.my_prize {
				background: url('/static/images/active/my_prize.png') no-repeat;
				background-size: 312rpx 108rpx;
			}

			.free {
				background: url('/static/images/active/lottery.png') no-repeat;
				background-size: 312rpx 108rpx;
			}
		}

		.rule {
			width: 680rpx;
			padding: 16rpx 0 32rpx 0;
			min-height: 370rpx;
			background: url('/static/images/active/recharge_rule.png') no-repeat;
			background-size: 680rpx 100%;
			margin: 40rpx auto;

			.tit {
				width: 100%;
				font-size: 26rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
			}

			.rule_list {
				width: 100%;
				margin-top: 16rpx;

				.rule_item {
					width: 100%;
					font-size: 26rpx;
					color: rgb(51, 51, 51);
					display: flex;
					align-items: flex-start;
					margin-top: 32rpx;

					text {
						margin-left: 32rpx;
					}

					view {
						width: 600rpx;
						margin-left: 4rpx;
					}
				}

				.rule_item:last-child {
					margin-bottom: 0;
				}
			}

		}

		.winning {
			position: relative;
			width: 626rpx;
			height: 544rpx;
			padding-top: 200rpx;
			background: url('/static/images/active/winning_bj.png') no-repeat;
			background-size: 626rpx 744rpx;

			.tit {
				width: 100%;
				font-size: 40rpx;
				font-weight: 700;
				color: rgb(255, 57, 57);
				text-align: center;
			}

			.count_down {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 32rpx;

				.count_down_name {
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					margin-right: 8rpx;
				}
			}

			.info {
				width: 530rpx;
				height: 160rpx;
				background: #fff;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				margin: 32rpx auto;

				.left {
					width: 136rpx;
					height: 118rpx;
					padding-top: 18rpx;
					font-size: 32rpx;
					font-weight: 700;
					color: rgb(255, 57, 57);
					text-align: center;
					margin: 0 16rpx 0 12rpx;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.right {

					.product_name {
						font-size: 24rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
					}

					.value {
						display: flex;
						align-items: center;
						margin: 8rpx 0;

						.value_tit {
							font-size: 20rpx;
							color: rgb(102, 102, 102);
						}

						.value_num {
							font-size: 20rpx;
							font-weight: bold;
							color: rgb(51, 51, 51);
							margin-left: 8rpx;

							text {
								font-size: 28rpx;
							}
						}
					}

					.amount {
						font-size: 20rpx;
						color: rgb(102, 102, 102);

						image {
							width: 32rpx;
							height: 32rpx;
							margin-left: 8rpx;
						}

						text {
							font-size: 32rpx;
							font-weight: 700;
							color: rgb(255, 57, 57);
							margin-left: 8rpx;
						}
					}
				}

			}

			.tip {
				width: 480rpx;
				font-size: 24rpx;
				color: rgb(51, 51, 51);
				text-align: center;
				margin: 32rpx auto;
			}

			.winning_btn {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				view {
					width: 256rpx;
					height: 72rpx;
					line-height: 72rpx;
					font-size: 28rpx;
					font-weight: bold;
					text-align: center;
					box-sizing: border-box;
					border-radius: 72rpx;
					margin: 0 16rpx;
				}

				.cancel {
					background: linear-gradient(90.00deg, rgb(249, 118, 48), rgb(244, 67, 66));
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					text-fill-color: transparent;
					border: 2rpx solid rgb(249, 118, 48);
				}

				.now {
					color: #fff;
					background: linear-gradient(90.00deg, rgb(249, 118, 48), rgb(244, 67, 66) 98.871%);
				}
			}

		}

	}
</style>


<style lang="scss">
	.time {
		@include flex;
		align-items: center;

		&__custom {
			margin-top: 4px;
			width: 22px;
			height: 22px;
			background-color: $u-primary;
			border-radius: 4px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #fff;
				font-size: 12px;
				text-align: center;
			}
		}

		&__doc {
			color: $u-primary;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}
</style>