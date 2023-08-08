<template>
	<view class="award-detail">
		<view style="height: 24rpx;"></view>
		<view class="address_info">
			<image src="/static/images/new-index/address.png"></image>
			<view class="info">
				<view class="info-name">
					<view>{{info.a_name}}</view>
					<text>+{{info.a_mobile_area_code}} {{info.a_mobile}}</text>
				</view>
				<view class="info-des">{{info.a_detail}}</view>
			</view>
		</view>

		<view class="detail-info">
			<view class="head">
				<image :src="info.shop_logo"></image>
				<view class="header-name">{{info.shop_name}}</view>
				<view class="header-tag" v-if="info.status==2 || info.status == 3">{{$t('user.auctionM.shipped')}}</view>
				<view class="header-tag" v-else-if="info.status==4">{{$t('user.auctionM.receive')}}</view>
				<view class="header-tag" v-else-if="info.status==5">{{$t('user.auctionM.beConfirmed')}}</view>
				<view class="header-tag" v-else-if="info.status==6 && info.is_complain==0">{{$t('user.order.ywc')}}</view>
				<view class="header-tag" v-else-if="info.status==6 && info.is_complain==1">{{$t('user.auctionM.inAppeal')}}</view>
			</view>
			<view class="detail_des">
				<image :src="info.image"></image>
				<view class="detail_des_name">{{info.goods_name}}</view>
				<view class="detail_des_tag">{{$t('user.auctionM.original')}}:</view>
				<view class="detail_des_price">RM<text>{{info.price}}</text></view>
				<view class="detail_des_line"></view>
			</view>

			<view class="des_info">
				<view class="des_info_key">{{$t('new.xyje')}}</view>
				<view class="des_info_value">
					<image src="/static/images/kbrick/diamond.png"></image>
					<text>{{info.auction_price}}</text>
				</view>
			</view>

			<view class="des_info">
				<view class="des_info_key">{{$t('auction.detail.total')}}</view>
				<view class="des_info_value">
					<image src="/static/images/kbrick/diamond.png"></image>
					<text style="font-size: 32rpx;font-weight: bold;color: rgb(255, 57, 57);">{{info.auction_price}}</text>
				</view>
			</view>

			<view class="detail_info_line"></view>

			<view class="wishing">{{$t('new.xyxx')}}</view>

			<view class="des_info">
				<view class="des_info_key">{{$t('new.spqs')}}</view>
				<view class="des_info_value">
					<text>{{info.stage_num}}</text>
				</view>
			</view>

			<view class="des_info">
				<view class="des_info_key">{{$t('new.xym')}}</view>
				<view class="des_info_value">
					<text>{{info.num_id}}</text>
					<image src="/static/images/mine/k_copy.webp"
						style="width: 32rpx;height: 32rpx;margin-left: 16rpx;margin-right: 0;" @click="copyVal(info.num_id)"></image>
				</view>
			</view>

			<view class="des_info">
				<view class="des_info_key">{{$t('new.xdsj')}}</view>
				<view class="des_info_value">
					<text>{{$u.timeFormat(info.addtime, 'yyyy/mm/dd hh:MM:ss')}}</text>
				</view>
			</view>

			<view class="des_info">
				<view class="des_info_key">{{$t('new.lqsj')}}</view>
				<view class="des_info_value">
					<text>{{$u.timeFormat(info.award_receiving_time, 'yyyy/mm/dd hh:MM:ss')}}</text>
				</view>
			</view>
			<view class="des_info" style="flex-direction: column;align-items: flex-start;">
				<view class="des_info_key">{{$t('new.wlpz')}}</view>
				<view class="des_info_Voucher">
					<image :src="item" v-for="(item,nub) in info.send_images" :key="nub"></image>
				</view>
			</view>
			
			<view class="detail_info_line"></view>
			
			<view class="des_info">
				<view class="des_info_key">{{$t('new.fhm')}}</view>
				<view class="des_info_value">
					<text>{{info.send_number}}</text>
					<image src="/static/images/mine/k_copy.webp"
						style="width: 32rpx;height: 32rpx;margin-left: 16rpx;margin-right: 0;" @click="copyVal(info.num_id)"></image>
				</view>
			</view>
			
			<view class="des_info">
				<view class="des_info_key">{{$t('new.fhsj')}}</view>
				<view class="des_info_value">
					<text>{{info.send_company}}</text>
				</view>
			</view>
			
			<view class="detail_info_line"></view>
			
			<!-- <view class="btn">Confirm receipt</view> -->

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad(e) {
			if(e.id){
				this.getOrderInfo(e.id)
			}
		},
		methods:{
			async getOrderInfo(id) {
				try {
					const res = await this.$http.post(this.$apiObj.OrderAuctionRecordDetail, {order_auction_record_id: id});
					if (res.data.send_images) {
						const sendImages = res.data.send_images.split(',');
						this.info = { ...res.data, send_images: sendImages };
					} else {
						this.info = res.data;
					}
				} catch (error) {
					console.error('Error fetching order info:', error);
				}
			},
			copyVal(val){
				uni.setClipboardData({
					data: val,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg'),
							duration:2000
						})
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.award-detail {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.address_info {
			width: 686rpx;
			height: 194rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 20rpx;
			margin: 0 auto 24rpx auto;

			image {
				display: block;
				width: 48rpx;
				height: 48rpx;
				margin: 0 24rpx;
			}

			.info {
				width: 516rpx;

				.info-name {
					display: flex;
					align-items: center;

					view {
						font-size: 32rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
					}

					text {
						font-size: 28rpx;
						color: rgb(51, 51, 51);
						margin-left: 20rpx;
					}
				}

				.info-des {
					width: 100%;
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					margin-top: 20rpx;
				}

			}

		}

		.detail-info {
			width: 686rpx;
			padding: 26rpx 0 32rpx 0;
			background: #fff;
			border-radius: 20rpx;
			margin: 0 auto;

			.head {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					margin-left: 24rpx;
				}

				.header-name {
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					margin-left: 12rpx;
				}

				.header-tag {
					position: absolute;
					right: 24rpx;
					font-size: 24rpx;
					color: rgb(10, 198, 142);
				}

			}

			.detail_des {
				position: relative;
				width: 100%;
				height: 270rpx;

				image {
					position: absolute;
					top: 50%;
					left: 24rpx;
					transform: translate(0, -50%);
					width: 206rpx;
					height: 206rpx;
					border-radius: 16rpx;
				}

				.detail_des_name {
					position: absolute;
					top: 32rpx;
					right: 54rpx;
					width: 378rpx;
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.detail_des_tag {
					position: absolute;
					top: 168rpx;
					left: 254rpx;
					font-size: 20rpx;
					color: rgb(102, 102, 102);
				}

				.detail_des_price {
					position: absolute;
					left: 254rpx;
					top: 200rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);

					text {
						font-size: 32rpx;
					}
				}

				.detail_des_line {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translate(-50%, 0);
					width: 638rpx;
					border-bottom: 1rpx solid rgb(204, 204, 204);
				}

			}

			.des_info {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 32rpx;

				.des_info_key {
					font-size: 28rpx;
					color: rgb(102, 102, 102);
					margin-left: 24rpx;
				}

				.des_info_value {
					position: absolute;
					right: 24rpx;
					display: flex;
					align-items: center;

					image {
						width: 24rpx;
						height: 24rpx;
						margin-right: 8rpx;
					}

					text {
						font-size: 28rpx;
						color: rgb(51, 51, 51);
					}
				}
				.des_info_Voucher{
					position: unset;
					display: flex;
					align-items: center;
					width: 100%;
					flex-wrap: wrap;
					margin-left: 24rpx;
					text {
						font-size: 28rpx;
						color: rgb(51, 51, 51);
					}
					image {
						width: 200rpx;
						height: 200rpx;
						margin: 20rpx 20rpx 10.5rpx 0rpx;
						border-radius: 16rpx;
					}
				}

			}

			.detail_info_line {
				width: 638rpx;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				margin: 32rpx auto 0 auto;
			}

			.wishing {
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				margin: 32rpx 0 0 24rpx;
			}
			
			.btn{
				width: 196rpx;
				height: 56rpx;
				line-height: 56rpx;
				font-size: 24rpx;
				color: rgb(10, 198, 142);
				text-align: center;
				box-sizing: border-box;
				border: 1rpx solid rgb(10, 198, 142);
				border-radius: 56rpx;
				margin-top: 32rpx;
				margin-left: 466rpx;
			}

		}

	}
</style>