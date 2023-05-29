<template>
	<view class="auct-page">
		<view class="zxjpCont">
			<view v-for="item in newsjpList" :key="item.id" class="li" :class="item.id==newsjpId?'active':''"
				@click="onZxjpClick(item.id)">{{item.title}}</view>
		</view>
		<view class="auct-new">
			<block v-for="item in jingpaiList" :key="item.id">
				<view v-if="item.check_status==1||item.check_status==2" class="new-li" @click="onJingPai(item)">
					<view class="li-img">
						<image class="img" :src="item.image"></image>
						<view class="li-date" v-if="item.auction_type==2">
							<u-count-down :time="item.remain_time" format="HH:mm:ss"></u-count-down>
						</view>
						<view class="li-t">{{item.stage_num}}{{$t('auction.qi')}}</view>
					</view>
					<view class="li-txt">
						<view class="li-h">
							<view class="name">{{item.goods_name}}</view>
							<view class="s">{{item.shop_name}}{{$t('auction.tigong')}}</view>
						</view>
						<view class="t">{{item.goods_mark}}</view>
						<view class="li-tags">
							<block v-for="(items,index) in item.tags" :key="{index}">
								<view v-if="items.tag_id==2" class="tag">{{items.name}}</view>
								<block v-if="item.limit==1">
									<view v-if="index==0" class="tag yellow">
										{{$t('auction.xianpai')}}{{item.limit_num}}{{$t('auction.ci')}}</view>
								</block>
								<view v-if="items.tag_id==1" class="tag red">{{$t('auction.baokuan')}}</view>
							</block>
						</view>
						<view class="li-price">
							<view class="price-fl">
								<text class="red">{{$t('auction.qiangpaijia')}} RM{{item.auction_price}}</text>
								<text class="gray">{{$t('auction.shichangjia')}} RM{{item.price}}</text>
							</view>
							<button class="price-btn">{{$t('auction.qiangpai')}}</button>
						</view>
						<view class="li-b">
							<text v-if="item.finish_rate==100">{{$t('auction.yiwancheng')}}</text>
							<text v-else>{{$t('auction.jinxingzhong')}}</text>
							<view class="li-pro">
								<view class="pro" :style="'width:'+item.finish_rate*100+'%;'"></view>
							</view>
							<text>{{(item.finish_rate*100).toFixed(0)}}%</text>
						</view>
					</view>
				</view>
				<view v-if="item.check_status==3||item.check_status==4" class="new-li active" @click="onJingPai(item)">
					<view class="li-img">
						<image class="img" :src="item.image"></image>
						<view class="li-t">{{item.stage_num}}{{$t('auction.qi')}}</view>
					</view>
					<view class="li-txt">
						<view class="li-h">
							<view class="name">{{item.goods_name}}</view>
							<view class="s">{{item.shop_name}}{{$t('auction.tigong')}}</view>
						</view>
						<view class="li-price">
							<view class="price-fl">
								<text class="red">{{$t('auction.qiangpaijia')}} RM{{item.auction_price}}</text>
								<text class="gray">{{$t('auction.shichangjia')}} RM{{item.price}}</text>
							</view>
						</view>
						<view class="li-time">{{$t('auction.lishi')}}：{{item.continue_time}}</view>
						<view class="li-b">{{$filter.to_date_time(item.end_time)}} <text v-if="item.check_status==3">
								<block v-if="item.part_fengpan==1">
									<block v-if="isShopCont">Partial sealing disc</block>
									<block v-else></block>
								</block>
								<block v-else>
									{{$t('auction.chenggongjingpai')}}
								</block>
							</text>
							<text style="color:#999" v-if="item.check_status==4">{{$t('auction.yiliupai')}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1, // 页码
				pagenum: 10, // 每页显示商品数目
				totalPageNum: 0, // 总条数
				newsjpList: [{
					id: 1,
					title: this.$t('auction.jindu')
				}, {
					id: 2,
					title: this.$t('auction.jssj')
				}, {
					id: 3,
					title: this.$t('auction.yuanjia')
				}, {
					id: 4,
					title: this.$t('auction.jingpaijia')
				}, {
					id: 5,
					title: this.$t('auction.zhikazng')
				}, ], // 头部
				newsjpId: 1, // 头部id
				jingpaiList: [], // 列表
				isShopCont: false, // 商品详情显示中文还是英文
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.name
			})
			this.id = e.id
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.jingpaiList = []
			this.page = 1
			// 列表
			this.onAuctionGoodsFromCate()
		},
		methods: {
			// 点击筛选
			onZxjpClick(id) {
				this.newsjpId = id
				this.jingpaiList = []
				this.page = 1
				this.onAuctionGoodsFromCate()
			},
			// 列表
			onAuctionGoodsFromCate() {
				this.$http.post(this.$apiObj.AuctionGoodsFromCate, {
					sort: this.newsjpId,
					page: this.page,
					pagenum: this.pagenum,
					c_id: Number(this.id)
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 1) ? this.getCaption(
										items.name, 1) : items.name
								})
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 0) ? this.getCaption(
										items.name, 0) : items.name
								})
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.continue_time = this.daojishi(item.continue_time)
							item.remain_time = item.remain_time * 1000
						})
						this.totalPageNum = res.data.total
						this.jingpaiList = this.page == 1 ? res.data.data : [...this.jingpaiList, ...res.data.data]
					}
				})
			},
			getCaption(str, state) {
				if (state == 1) {
					var indexs = str.indexOf("|")
					str = str.substring(indexs + 1, str.length);
				} else {
					var index = str.indexOf("|")
					str = str.substring(0, index);
				}
				return str;
			},
			// 倒计时
			daojishi(mss) {
				let s = mss % 60;
				mss = parseInt(mss / 60);
				let m = mss % 60;
				mss = parseInt(mss / 60);
				let h = mss % 24;
				mss = parseInt(mss / 24);
				let d = mss;
				return d + this.$t('auction.day') + h + this.$t('auction.shi') + m + this.$t('auction.fen') + s + this.$t(
					'auction.miao')
			},
			// 点击竞拍列表
			onJingPai(item) {
				uni.navigateTo({
					url: './detail?id=' + item.auction_goods_id
				})
			},
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			if (this.totalPageNum <= this.page * this.pagenum) return
			this.page++
			this.onAuctionGoodsFromCate()
		}
	}
</script>

<style lang="less" scoped>
	page {
		// padding-top: 20rpx;
		background: #f9f9f9;
	}

	.auct-page {
		.auct-new {
			background: #fff;
			padding: 10rpx 0rpx 0rpx 0rpx;

			.new-li {
				background: #fff;
				padding: 30rpx;
				border-bottom: 10rpx solid #f9f9f9;
				display: flex;

				.li-img {
					width: 230rpx;
					height: 230rpx;
					border-radius: 10rpx;
					position: relative;
					margin-right: 25rpx;
					min-width: 230rpx;
					max-width: 230rpx;
					overflow: hidden;
				}

				.li-date {
					height: 40rpx;
					background: #fc0609;
					background: linear-gradient(-45deg, #fc0609 0%, #ff4e50 100%);
					border-radius: 10px 0px 10rpx 0px;
					position: absolute;
					left: 0;
					top: 0;
					line-height: 40rpx;
					padding: 0 10rpx;
					font-size: 22rpx;
					color: #fff;
				}

				.li-t {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					background: rgba(252, 6, 9, 0.3);
					height: 34rpx;
					border-radius: 10rpx;
					line-height: 34rpx;
					text-align: center;
					color: #fff;
					font-size: 22rpx;
					line-height: 34rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.li-txt {
					width: calc(100% - 255rpx);

					.li-h {

						// display: flex;
						// align-items: center;
						// justify-content: space-between;
						.name {
							font-size: 28rpx;
							font-weight: 550;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// width: 93%;
						}

						.s {
							color: #999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// max-width: 70%;
						}
					}

					.t {
						font-size: 26rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 10rpx 0 10rpx 0;
					}

					.li-tags {
						display: flex;
						flex-wrap: wrap;
						margin: 0 -5rpx;

						.tag {
							margin: 5rpx;
							// width: 110rpx;
							height: 30rpx;
							background: #e1ebff;
							line-height: 30rpx;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 22rpx;
							color: #699dff;
						}

						.yellow {
							background: #ffedcc;
							color: #ffa503;
						}

						.red {
							background: #ffe2e2;
							color: #d32524;
						}
					}

					.li-price {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 10rpx 0;

						.price-fl {
							.red {
								color: #fc0609;
								margin-right: 20rpx;
							}

							.gray {
								color: #999;
								text-decoration: line-through;
							}
						}

						.price-btn {
							width: 100rpx;
							height: 50rpx;
							background: #fc0609;
							border-radius: 10rpx;
							min-width: 100rpx;
							max-width: 100rpx;
							text-align: center;
							line-height: 50rpx;
							margin: 0;
							font-size: 24rpx;
							color: #fff;
						}
					}

					.li-b {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #fc0609;

						.w {}

						.li-pro {
							position: relative;
							flex: 1;
							margin: 0 10rpx;
							height: 12rpx;
							background: #f5f5f5;
							border-radius: 6rpx;

							.pro {
								position: absolute;
								left: 0;
								top: 0;
								height: 100%;
								border-radius: 6rpx;
								background: #fc0609;
							}
						}
					}
				}
			}
		}
	}

	.new-li.active {
		background: #fff;
		padding: 30rpx;
		border-bottom: 10rpx solid #f9f9f9;
		display: flex;

		.li-img {
			width: 230rpx;
			height: 230rpx;
			border-radius: 10rpx;
			position: relative;
			margin-right: 25rpx;
			min-width: 230rpx;
			max-width: 230rpx;
			overflow: hidden;
		}

		.li-date {
			height: 40rpx;
			background: #9a3064;
			background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
			border-radius: 10px 0px 10rpx 0px;
			position: absolute;
			left: 0;
			top: 0;
			line-height: 40rpx;
			padding: 0 10rpx;
			font-size: 22rpx;
			color: #fff;
		}

		.li-t {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.5);
			height: 34rpx;
			border-radius: 10rpx;
			line-height: 34rpx;
			text-align: center;
			color: #fff;
			font-size: 22rpx;
			line-height: 34rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.li-txt {
			width: calc(100% - 255rpx);

			.li-h {

				// display: flex;
				// align-items: center;
				// justify-content: space-between;
				.name {
					font-size: 28rpx;
					font-weight: 550;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					// width: 93%;
				}

				.s {
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					// max-width: 70%;
				}
			}

			.t {
				font-size: 26rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 10rpx 0 10rpx 0;
			}

			.li-price {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;

				.price-fl {
					.red {
						color: #fc0609;
						margin-right: 20rpx;
					}

					.gray {
						color: #999;
						text-decoration: line-through;
					}
				}
			}

			.li-time {
				// height: 45rpx;
				background: #ffe2e2;
				padding: 0 15rpx;
				display: flex;
				font-size: 22rpx;
				color: #fc0609;
				line-height: 45rpx;
				margin: 15rpx 0;
			}

			.li-b {
				font-size: 22rpx;
				color: #999;
			}
		}
	}

	/deep/.u-count-down__text {
		color: #fff !important;
		font-size: 22rpx !important;
	}

	.zxjpCont {
		height: 55rpx;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 10rpx 30rpx;

		.li {
			width: auto;
			height: 45rpx;
			line-height: 45rpx;
			background: #f5f5f5;
			border-radius: 23rpx;
			font-size: 20rpx;
			color: #000;
			margin-right: 20rpx;
			padding: 0 22rpx;

			&.active {
				background: #fc0609;
				color: #fff;
			}
		}
	}
</style>