<template>
	<view class="invite_friend">
		<view class="header">
			<image src="/static/images/mine/left.png" @click="navBack()"></image>
			<view class="tit">{{$t('new.wdyq')}}</view>
			<view class="link" @click="navClick('/pages/mine/new/invite_rule')">{{$t('invite.view_rule')}}</view>
		</view>

		<view class="center">
			<view class="info">
				<view class="name">{{$t('invite.num')}}</view>
				<view class="num">{{total}}</view>
				<view class="btn" @click="navClick('/pages/mine/new/invite_rule')">
					<image src="/static/images/mine/invite.png"></image>
					<view>{{$t('top.yqhy')}}</view>
				</view>
			</view>

			<view class="switch">
				<view class="switch_name" :class="select==1?'switch_select':''" @click="select = 1;getList()">
					<view>{{$t('comment.all_comment')}}</view>
					<text v-show="select==1"></text>
				</view>
				<view class="switch_name" :class="select==2?'switch_select':''" @click="select = 2;getList()">
					<view>{{$t('invite.under_way')}}</view>
					<text v-show="select==2"></text>
				</view>
				<view class="switch_name" :class="select==3?'switch_select':''" @click="select = 3;getList()">
					<view>{{$t('auction.yiwancheng')}}</view>
					<text v-show="select==3"></text>
				</view>
			</view>

		</view>

		<view class="list">

			<view class="item" v-for="item in list" :key="item.id">
				<image :src="item.avatar" class="auth"></image>
				<view class="info">
					<view class="name">{{item.nickname}}</view>
					<view class="msg" v-if="item.mobile">{{$t('new.lxfs')}}:{{item.mobile}}</view>
					<view class="msg" v-else>{{$t('new.lxfs')}}:{{item.email}}</view>
					<view class="time">{{$t('invite.current_status')}}:
						<text>{{isShopCont ? item.current_status_en : item.current_status_zh}}</text>
					</view>
				</view>
				<view class="status" v-if="item.button_status == '正在进行中'">{{$t('invite.under_way')}}</view>
				<view class="status status2" v-else>
					{{$t('auction.yiwancheng')}}
				</view>
				<view class="price" v-if="item.button_status != '正在进行中'">RM <text>{{item.money}}</text></view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				select: 1,
				list: [],
				total: 0,
				isShopCont: false
			}
		},
		onLoad() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.getList()
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			getList() {
				let search;
				if (this.select == 1) search = 'all'
				else if (this.select == 2) search = 'progress'
				else search = 'issued'
				this.$http.post(this.$apiObj.MineInviteGiftRM, {
					search
				}).then(res => {
					if (res.code == 1) {
						if (this.select == 1) this.total = res.data.total
						this.list = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.invite_friend {
		width: 750rpx;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.header {
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

			.tit {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

			.link {
				position: absolute;
				right: 32rpx;
				font-size: 24rpx;
				color: rgb(102, 102, 102);
				z-index: 5;
			}
		}

		.center {
			width: 750rpx;
			height: 272rpx;
			padding-top: 24rpx;
			background: #fff;

			.info {
				position: relative;
				width: 686rpx;
				height: 176rpx;
				background: linear-gradient(180.00deg, rgba(51, 222, 114, 0.1), rgba(5, 195, 146, 0.1) 98.871%);
				border-radius: 24rpx;
				margin: 0 auto;

				.name {
					position: absolute;
					top: 32rpx;
					left: 32rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
				}

				.num {
					position: absolute;
					left: 32rpx;
					bottom: 32rpx;
					font-size: 40rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
				}

				.btn {
					position: absolute;
					top: 50%;
					right: 32rpx;
					transform: translate(0, -50%);
					width: 216rpx;
					height: 56rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: rgb(255, 255, 255);
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);
					border-radius: 56rpx;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}
			}

			.switch {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				margin: 16rpx auto 0 auto;

				.switch_name {
					position: relative;
					width: 33.33%;
					font-size: 24rpx;
					font-weight: bold;
					color: rgb(102, 102, 102);
					text-align: center;

					text {
						position: absolute;
						left: 50%;
						bottom: -24rpx;
						transform: translate(-50%, 0);
						display: block;
						width: 44rpx;
						height: 8rpx;
						background: rgb(10, 198, 142);
						border-radius: 8rpx;
					}
				}

				.switch_select {
					color: rgb(10, 198, 142);
				}

			}

		}

		.list {
			margin-top: 24rpx;

			.item {
				position: relative;
				width: 686rpx;
				height: 180rpx;
				display: flex;
				align-items: center;
				background: rgb(255, 255, 255);
				border-radius: 20rpx;
				margin: 0 auto 20rpx auto;

				.auth {
					width: 132rpx;
					height: 132rpx;
					border-radius: 50%;
					margin-left: 24rpx;
				}

				.info {
					margin-left: 24rpx;

					.name {
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
					}

					.msg {
						font-size: 20rpx;
						color: rgb(102, 102, 102);
						margin: 16rpx 0;
					}

					.time {
						font-size: 24rpx;
						color: rgb(153, 153, 153);

						text {
							color: rgb(51, 51, 51);
							margin-left: 8rpx;
						}
					}
				}
				
				.price{
					position: absolute;
					top: 118rpx;
					right: 24rpx;
					font-size: 24rpx;
					color: rgb(255, 57, 57);
					
					text{
						font-size: 32rpx;
						font-weight: bold;
						margin-left: 4rpx;
					}
				}

				.status {
					position: absolute;
					top: 24rpx;
					right: 24rpx;
					width: 140rpx;
					height: 46rpx;
					line-height: 46rpx;
					font-size: 24rpx;
					color: rgb(10, 198, 142);
					text-align: center;
					background: url('/static/images/mine/invite_bj.png') no-repeat;
					background-size: 140rpx 46rpx;
				}

				.status2 {
					color: rgb(204, 204, 204);
					background: url('/static/images/mine/invite_bj2.png') no-repeat;
					background-size: 140rpx 46rpx;
				}

			}
		}

	}
</style>