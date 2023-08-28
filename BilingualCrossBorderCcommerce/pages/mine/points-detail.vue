<template>
	<view class="points-detail">
		<view class="points-detail-content">
			<view class="points-detail-head">
				<image src="/static/images/auth/left.png" @click="toReturn()"></image>
				<view>{{$t('new.jfmx')}}</view>
			</view>

			<view class="points-detail-info">
				<view class="points-detail-info-num">
					<image src="@/static/images/mine/mine_icon_integral1.png"></image>
					<view>{{total || 0}}</view>
				</view>
				<view class="points-detail-info-txt">{{$t('new.wdjf')}}</view>
				<view class="what"  @click="ExChangePop(total)">{{$t('Exchange_KDiamonds')}}<image src="/static/images/new-index/exchangeIcon.png"></image></view>
			</view>

			<view class="list">
				<view class="list-tit">{{$t('new.jfmx')}}</view>
				<template v-if="list.length > 0">
					<view class="item" v-for="(item,i) in list" :key="i"
						:style="list.length==(i+1)?'border-bottom: none;':''">
						<image src="@/static/images/mine/mine_icon_integral1.png"></image>
						<view class="item-info">
							<view class="item-name">{{isShopCont ? item.en_desc : item.desc}}</view>
							<view class="item-time">{{$u.timeFormat(item.createtime, 'yyyy/mm/dd hh:MM:ss')}}</view>
						</view>
						<view class="item-price">{{ item.points_number * 1 > 0 ? '+' : '' }}{{item.points_number}}</view>
					</view>
				</template>
				<template v-else>
					<uni-empty image="/static/images/mine/order_icon_null.png"
						:message="$t('home.zanwushuju')"></uni-empty>
				</template>
			</view>
		</view>
		<!-- 兑换提示 -->
		<u-popup :show="showExchange" mode="center" bgColor="transparent">
			<view class="exchange">
				<image src="/static/images/close1.png" class="close" @click="showExchange=false"></image>
				<view class="tit">Exchange for Kolibri Mall Coins</view>
				<view class="tit-des">Convertible</view>
				<view class="info">
					<view class="info-left">
						<image src="/static/images/mine/mine_icon_integral1.png"></image>
						<view class="name">My points</view>
						<view class="num">{{newData.point}}</view>
					</view>
					<image src="/static/images/task_center/exchange.png" class="des"></image>
					<view class="info-left">
						<image src="/static/images/task_center/app_logo.png"></image>
						<view class="name">My points</view>
						<view class="num">{{newData.KCoin}}</view>
					</view>
				</view>
				<view class="tip">You have {{newData.points_number}} points, which can be exchanged for {{newData.points_number}} Kolibri Mall Coins when we release them</view>
				<view class="btn" @click="ExchangeKcoin">I know</view>
				<view class="what" @click="navClick('/pages/mine/K_coin_introduction')">What is K coin? <image src="/static/images/task_center/doubt.png"></image> </view>
			</view>
		</u-popup>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newData:{
					points_number:0,
					KCoin:0
				},
				list: [],
				total: 0,
				showExchange: false,
				isShopCont:false
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
		},
		mounted() {
			this.getPointInfo()
		},
		methods: {
			ExChangePop(points_number){
				if(this.total === 0){
					uni.showToast({
						title: this.$t('Exchange_TotalError'),
						icon: 'none'
					})
					return
				}
				const poinIsTotla = points_number > this.total
				if(points_number * 1 < 0 &&  !poinIsTotla) {
					uni.showToast({
						title: this.$t('Exchange_Error'),
						icon: 'none'
					})
					return
				}
				const _data = {
					point:points_number,
					KCoin:points_number
				}
				this.newData = _data
				this.showExchange = true
			},
			ExchangeKcoin(){
				const {point} = this.newData 
				this.$http.post(this.$apiObj.PointConvertKCoin, {point}).then(res => {
					this.showExchange = false
					this.newData = {point:0,KCoin:0}
					this.getPointInfo()
					console.log(res);
				})
			},
			toReturn() {
				uni.navigateBack()
			},
			getPointInfo() {
				let userCont = uni.getStorageSync('userCont')
				this.$http.post(this.$apiObj.GetPointsInfo, {
					h5_user_id: userCont.u_id
				}).then(res => {
					this.list = res.data.points_details
				})

				this.$http.post(this.$apiObj.GetPoints, {
					h5_user_id: userCont.u_id
				}).then(res => {
					this.total = res.data.total_points
				})
			},
			navClick(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.points-detail {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);
		.what{
			width: 45%;
			font-size: 24rpx;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row-reverse;
			margin: 40rpx auto 0;
			padding: 10rpx;
			border: 2px solid #FFFFFF;
			border-radius: 40rpx;
			image{
				display: block;
				width: 40rpx;
				height: 40rpx;
				margin-right: 18rpx;
			}
		}
		.points-detail-content {
			width: 100%;
			height: 526rpx;
			background: url('/static/images/new-index/new_head.png') no-repeat;
			background-size: 100% 526rpx;
		}

		.points-detail-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				position: absolute;
				left: 20rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
			}

		}

		.points-detail-info {
			width: 100%;
			margin: 50rpx auto 0 auto;

			.points-detail-info-num {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 48rpx;
					height: 48rpx;
				}

				view {
					font-size: 64rpx;
					color: rgb(255, 255, 255);
					margin-left: 16rpx;
				}
			}

			.points-detail-info-txt {
				width: 100%;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				margin-top: 32rpx;
			}

		}

		.points-detail-tit {
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 50rpx;
			margin-bottom: 32rpx;

			.points-detail-tit-line {
				width: 8rpx;
				height: 40rpx;
				background: rgb(255, 179, 0);
				border-radius: 4rpx;
				margin: 0 12rpx 0 42rpx;
			}

			.points-detail-tit-des {
				font-size: 32rpx;
				color: rgb(44, 44, 44);
			}

		}

		.points-detail-item {
			position: relative;
			width: 686rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);
			border-radius: 16rpx;
			box-shadow: 0px 2rpx 5rpx rgba(44, 44, 44, 0.1);
			margin: 0 auto 20rpx auto;

			image {
				width: 60rpx;
				height: 60rpx;
				margin-left: 32rpx;
			}

			.points-detail-item-info {
				max-width: 420rpx;
				margin-left: 30rpx;

				.points-detail-item-info-txt {
					width: 100%;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.points-detail-item-info-time {
					font-size: 20rpx;
					color: rgb(190, 190, 190);
					margin-top: 12rpx;
				}

			}

			.points-detail-item-price {
				position: absolute;
				right: 28rpx;
				font-size: 28rpx;
				color: rgb(44, 44, 44);
			}

		}

		//数据
		.list {
			width: 750rpx;
			min-height: 800rpx;
			padding-top: 32rpx;
			background: #fff;
			border-radius: 24rpx 24rpx 0 0;
			margin-top: 82rpx;

			.list-tit {
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin-left: 32rpx;
				margin-bottom: 32rpx;
			}

			.item {
				position: relative;
				width: 686rpx;
				height: 144rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				margin: 0 auto;

				image {
					width: 64rpx;
					height: 64rpx;
					margin: 0 16rpx 0 0;
				}

				.item-info {
					width: 460rpx;
					margin-right: 8rpx;

					.item-name {
						max-width: 100%;
						font-size: 28rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.item-time {
						font-size: 24rpx;
						color: rgb(153, 153, 153);
						margin-top: 18rpx;
					}
				}

				.item-price {
					position: absolute;
					right: 0;
					font-size: 32rpx;
					color: rgb(255, 57, 57);
				}

			}

		}
		.exchange{
			position: relative;
			width: 590rpx;
			padding: 34rpx 0 40rpx 0;
			background: #fff;
			border-radius: 24rpx;
			
			.close{
				position: absolute;
				top: 32rpx;
				right: 32rpx;
				width: 36rpx;
				height: 36rpx;
				z-index: 5;
			}
			
			.tit{
				width: 100%;
				font-size: 28rpx;
				font-weight: 700;
				color: rgb(51, 51, 51);
				text-align: center;
			}
			
			.tit-des{
				width: 100%;
				font-size: 24rpx;
				color: rgb(51, 51, 51);
				text-align: center;
				margin-top: 30rpx;
			}
			
			.info{
				width: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: center;
				
				.info-left{
					text-align: center;
					
					image{
						width: 80rpx;
						height: 80rpx;
					}
					
					.name{
						font-size: 24rpx;
						font-weight: 500;
						color: rgb(51, 51, 51);
						margin: 20rpx 0;
					}
					
					.num{
						font-size: 52rpx;
						font-weight: 700;
					}
				}
				
				.des{
					display: block;
					width: 40rpx;
					height: 40rpx;
					margin: 20rpx 56rpx 0 56rpx;
				}
			}
			
			.tip{
				width: 446rpx;
				font-size: 22rpx;
				color: rgb(102, 102, 102);
				text-align: center;
				margin: 40rpx auto;
			}
			
			.btn{
				width: 312rpx;
				height: 96rpx;
				line-height: 96rpx;
				font-size: 36rpx;
				font-weight: 700;
				color: rgb(255, 255, 255);
				text-align: center;
				background: linear-gradient(180.00deg, rgb(51, 222, 114),rgb(5, 195, 146) 98.871%);
				border-radius: 96rpx;
				margin: 0 auto;
			}
			
			.what{
				width: 100%;
				font-size: 24rpx;
				color: rgb(10, 198, 142);
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 40rpx;
				
				image{
					width: 24rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}
			
		}
	}
</style>