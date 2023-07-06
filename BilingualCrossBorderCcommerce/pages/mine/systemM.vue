<template>
	<view class="sys-page">
		<view class="mp-header">
			<view style="height: 88rpx;"></view>
			<view class="mp-header-box">
				<view class="box-back" @click="onBack">
					<image src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
				</view>
				<view class="box-title">{{$t('top.xtxx')}}</view>
				<view class="box-clear" style="visibility: hidden;">
					<image src="@/static/images/mine/msg_btn_clear.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<template v-if="SysmsgList && SysmsgList.length > 0">
			<view class="sys-box">
				<view class="sys-li" v-for="item,k in SysmsgList" :key="k" @click="navClick(item)">
					<view class="hd">
						<!-- "type": 1, //消息类型：1提现 recharge_tocash ，2充值 recharge，3订单（data_id是订单id，order_no是订单号，跳转订单详情），4售后（data_id是售后订单id），5竞拍（data_id是竞拍商品id），6优惠券（data_id为0时跳转优惠券列表，data_id>0s时跳转商品列表） -->
						<view class="t" v-if="item.type==1">
							<view class="dian" v-if="item.read_status=='0'"></view>
							<view class="title" v-if="isShopCont">{{isShopCont ? 'Withdrawal notice' : '提现通知'}}</view>
						</view>
						<view class="t" v-if="item.type==2">
							<view class="dian" v-if="item.read_status=='0'"></view>
							<view class="title">{{isShopCont ? 'Recharge notification' : '充值通知'}}</view>
						</view>
						<view class="t" v-if="item.type==3">
							<view class="dian" v-if="item.read_status=='0'"></view>
							<view class="title">{{isShopCont ? 'Order Notice' : '订单通知'}}</view>
						</view>
						<view class="t" v-if="item.type==4">
							<view class="dian" v-if="item.read_status=='0'"></view>
							<view class="title">{{isShopCont ? 'After sales notification' : '售后通知'}}</view>
						</view>
						<view class="t" v-if="item.type==5">
							<view class="dian" v-if="item.read_status=='0'"></view>
							<view class="title">{{isShopCont ? 'Notice of Auction' : '许愿通知'}}</view>
						</view>
						<view class="t" v-if="item.type==6">
							<view class="dian" v-if="item.read_status=='0'"></view>
							<view class="title">{{isShopCont ? 'Coupon Notice' : '优惠券通知'}}</view>
						</view>
						<view class="time">{{$filter.to_date_time(item.addtime)}}</view>
					</view>
					<view class="bd">
						<view class="c" v-if="isShopCont">{{item.e_content}}</view>
						<view class="c" v-else>{{item.content}}</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<uni-empty image="/static/images/mine/massage_icon_null.png" :message="$t('msg.null')"></uni-empty>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShopCont: false, // 商品详情显示中文还是英文
				page: 1, // 页码
				pagenum: 10, // 每页显示商品数目
				totalPageNum: 0, // 总条数
				SysmsgList: []
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.page = 1
			this.SysmsgList = []
			this.onMineSysmsgList()
		},
		methods: {
			onBack() {
				uni.navigateBack();
			},
			// 列表
			onMineSysmsgList() {
				this.$http.post(this.$apiObj.MineSysmsgList, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						this.totalPageNum = res.data.list.total
						this.SysmsgList = this.page == 1 ? res.data.list.data : [...this.SysmsgList, ...res.data
							.list.data
						]
					}
				})
			},
			//导航点击的跳转处理函数
			navClick(item) {
				//  "type": 1, //消息类型：1提现 recharge_tocash ，2充值 recharge，3订单（data_id是订单id，order_no是订单号，跳转订单详情），4售后（data_id是售后订单id），5竞拍（data_id是竞拍商品id），6优惠券（data_id为0时跳转优惠券列表，data_id>0s时跳转商品列表）
				this.$http.post(this.$apiObj.readSysmsg, {
					msg_id: item.id
				}).then(res => {
					if (res.code == 1) {
						this.page = 1
						this.SysmsgList = []
						this.onMineSysmsgList()
					}
				})
				// if (item.type == 1) {
				// 	uni.navigateTo({
				// 		url: './wallet'
				// 	})
				// } else if (item.type == 2) {
				// 	uni.navigateTo({
				// 		url: './wallet'
				// 	})
				// } else if (item.type == 3) {
				// 	uni.navigateTo({
				// 		url: './order/detail?order_no=' + item.order_no
				// 	})
				// } else if (item.type == 4) {
				// 	uni.navigateTo({
				// 		url: './refund/detail?id=' + item.data_id
				// 	})
				// } else if (item.type == 5) {
				// 	uni.navigateTo({
				// 	  url: "/pages/auction/detail?id=" + item.data_id
				// 	})
				// } else if (item.type == 6) {
				// 	if (item.data_id == 0) {
				// 		uni.navigateTo({
				// 			url: "./coupon"
				// 		})
				// 	} else {
				// 		uni.navigateTo({
				// 			url: '/pages/class/search'
				// 		});
				// 	}
				// }
			},
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			if (this.totalPageNum <= this.page * this.pagenum) return
			this.page++
			this.onMineSysmsgList()
		}
	}
</script>
<style>
	page {
		background: #f9f9f9;
	}
</style>
<style lang="less" scoped>
	.sys-page {
		.mp-header {
			width: 100%;
			background: #fff;
			
			.mp-header-box {
				width: 100%;
				height: 88rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				
				.box-back {
					width: 40rpx;
					height: 40rpx;
					
					image {
						width: 100%;
					}
				}
				
				.box-title {
					color: rgb(51, 51, 51);
					font-size: 40rpx;
				}
				
				.box-clear {
					width: 36rpx;
					height: 36rpx;
					
					image {
						width: 100%;
					}
				}
			}
		}
		
		.sys-box {
			margin: 30rpx;

			.sys-li {
				margin: 20rpx 0;
				background: #ffffff;
				border-radius: 20rpx;

				.hd {
					padding: 30rpx;
					border-bottom: 1px solid #f5f5f5;
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;

					.t {
						display: flex;
						align-items: center;
						
						.dian {
							width: 20rpx;
							height: 20rpx;
							margin-right: 16rpx;
							background: red;
							border-radius: 50%;
						}
						
						.title {
							font-size: 28rpx;
							font-weight: 550;
						}
					}

					.time {
						font-size: 26rpx;
						color: #999;
					}
				}

				.bd {
					padding: 30rpx;
					font-size: 28rpx;
					line-height: 1.8;
				}
			}
		}
	}
</style>