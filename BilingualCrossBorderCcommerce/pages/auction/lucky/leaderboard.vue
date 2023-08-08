<template>
	<view class="leaderboard">
		<view class="head-info">
			<view class="top">
				<image src="/static/images/auth/left.png" @click="toBack()"></image>
				<view class="tit">{{$t('ranking.ranking')}}</view>
			</view>
			
			<view class="top-info">
				<view class="top-tit" :class="select===1 ? 'select':''" @click="switchSelect(1)">
					{{$t('ranking.luck_list')}}
					<text v-show="select==1"></text>
				</view>
				<view class="top-tit" :class="select===2 ? 'select':''" @click="switchSelect(2)">
					{{$t('ranking.wish_list')}}
					<text v-show="select==2"></text>
				</view>
				<view class="top-tit" :class="select===3 ? 'select':''" @click="switchSelect(3)">
					{{$t('ranking.invitation_list')}}<text v-show="select==3"></text>
				</view>
			</view>

			<view class="switch">
				<view class="switch-name" :class="switch_id==1?'switch-select':''" @click="switchId(1)">
					{{$t('ranking.weekly_list')}}
				</view>
				<view class="switch-name" :class="switch_id==2?'switch-select':''" @click="switchId(2)">
					{{$t('ranking.mothly_list')}}
				</view>
				<view class="switch-name" :class="switch_id==3?'switch-select':''" @click="switchId(3)">
					{{$t('ranking.overall')}}
				</view>
			</view>

			<view class="tip">{{$t('ranking.update')}}</view>

			<view class="ranking">
				<view class="ranking-info">
					<image src="/static/images/luck/luck2.png" class="crown"></image>
					<view class="auth">
						<image :src="info2.avatar" class="auth-img" v-if="info2.avatar"></image>
						<image src="/static/images/luck/not-auth.png" class="auth-img" v-else></image>
					</view>
					<view class="auth-name">{{info2.nickname || $t('ranking.not')}}</view>

					<view class="num" v-if="select==1">{{info2.price}}</view>
					<view class="num" v-else-if="select==2">{{info2.count}}</view>
					<view class="num" v-else="select==3">{{info2.invite_num}}</view>

					<view class="btm" style="border-radius: 24rpx 0 0 0;">2</view>
				</view>

				<view class="ranking-info" style="width: 220rpx;">
					<image src="/static/images/luck/luck1.png" class="crown"></image>
					<view class="auth" style="border: 4rpx solid rgb(255, 231, 42);">
						<image :src="info1.avatar" class="auth-img" v-if="info1.avatar"></image>
						<image src="/static/images/luck/not-auth.png" class="auth-img" v-else></image>
					</view>
					<view class="auth-name">{{info1.nickname || $t('ranking.not')}}</view>

					<view class="num" v-if="select==1">{{info1.price}}</view>
					<view class="num" v-else-if="select==2">{{info1.count}}</view>
					<view class="num" v-else="select==3">{{info1.invite_num}}</view>

					<view class="btm"
						style="font-size: 72rpx;height: 160rpx;border-radius: 24rpx 24rpx 0 0;background: rgba(255, 255, 255, 0.7);">
						1
					</view>
				</view>

				<view class="ranking-info">
					<image src="/static/images/luck/luck3.png" class="crown"></image>
					<view class="auth" style="border: 4rpx solid rgb(254, 202, 134);">
						<image :src="info3.avatar" class="auth-img" v-if="info3.avatar"></image>
						<image src="/static/images/luck/not-auth.png" class="auth-img" v-else></image>
					</view>
					<view class="auth-name">{{info3.nickname || $t('ranking.not')}}</view>

					<view class="num" v-if="select==1">{{info3.price}}</view>
					<view class="num" v-else-if="select==2">{{info3.count}}</view>
					<view class="num" v-else="select==3">{{info3.invite_num}}</view>

					<view class="btm" style="height: 94rpx;border-radius: 0 24rpx 0 0;">3</view>
				</view>

			</view>


			<view class="list">
				<view class="list-tit">
					<view class="left">
						<image src="/static/images/luck/trophy.png"></image>
						<view v-if="switch_id==1">{{$t('ranking.weekly_list')}}</view>
						<view v-else-if="switch_id==2">{{$t('ranking.mothly_list')}}</view>
						<view v-else>{{$t('ranking.overall')}}</view>
					</view>
					<view class="right" v-if="select==1">{{$t('ranking.luck_times')}}</view>
					<view class="right" v-else-if="select==2">{{$t('ranking.wishing_times')}}</view>
					<view class="right" v-else>{{$t('ranking.invitation_num')}}</view>
				</view>

				<view class="item" v-for="(item,i) in List.slice(3,10)">
					<view class="item-num">{{i+4}}</view>
					<image :src="item.avatar"></image>
					<view class="item-name">{{item.nickname}}</view>
					<view class="item-total" v-show="select==1">{{item.price}}</view>
					<view class="item-total" v-show="select==2">{{item.count}}</view>
					<view class="item-total" v-show="select==3">{{item.invite_num}}</view>
				</view>

			</view>

		</view>

		<view class="my-info" v-if="showRanking">
			<view class="num" v-if="userInfo.ranking > 99">99+</view>
			<view class="num" v-else>{{userInfo.ranking == 0 ? '...':userInfo.ranking}}</view>
			<image :src="userInfo.avatar"></image>
			<view class="name">{{userInfo.nickname}}</view>
			<view class="total">{{userInfo.count}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				select: 1,
				switch_id: 1,
				weekStartTime: '',
				weekEndTime: '',
				monthStartTime: '',
				monthEndTime: '',

				info1: {},
				info2: {},
				info3: {},
				List: [],

				userInfo: {},
				user: {},
				showRanking: false
			}
		},
		onLoad() {
			let date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			let week = date.getDay()

			let monthNum = new Date(year, month, 0).getDate()

			this.monthStartTime = new Date(year + '/' + month + '/' + '1').getTime()
			this.monthEndTime = new Date(year + '/' + month + '/' + monthNum + " 23:59:59").getTime()
			this.weekStartTime = new Date(year, month - 1, day - week + 1).getTime()
			this.weekEndTime = new Date(year, month - 1, day - week + 7, 23, 59, 59).getTime()

			if (uni.getStorageSync('token')) {
				this.showRanking = true
				this.$http.post(this.$apiObj.MineInfo).then(item => {
					if (item.code == 1) {
						this.user = item.data
					}
				})
			}

			setTimeout(() => {
				this.getList()
			}, 200)
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			switchId(id) {
				this.switch_id = id
				this.info1 = {}
				this.info2 = {}
				this.info3 = {}
				this.getList()
			},
			switchSelect(id) {
				this.select = id
				this.info1 = {}
				this.info2 = {}
				this.info3 = {}
				this.getList()
			},
			//幸运之星
			getList() {
				let start;
				let end;
				let url;
				//得到时间段
				if (this.switch_id === 1) {
					start = parseInt(this.weekStartTime) / 1000
					end = parseInt(this.weekEndTime) / 1000
				} else if (this.switch_id === 2) {
					start = parseInt(this.monthStartTime) / 1000
					end = parseInt(this.monthEndTime) / 1000
				}

				//根据选择的不同切换url
				if (this.select === 1) {
					url = this.$apiObj.GoodLuckyLeaderboard
				} else if (this.select === 2) {
					url = this.$apiObj.WishlistLeaderboard
				} else {
					url = this.$apiObj.InvitationListLeaderboard
				}

				this.$http.post(url, {
					since: start,
					until: end,
					h5_user_id: uni.getStorageSync('token') ? uni.getStorageSync('token') : ''
				}).then(res => {
					if (res.code == 1) {
						//防止没有数据导致页面渲染报错
						if (res.data.data.length >= 1) this.info1 = res.data.data[0]

						if (res.data.data.length >= 2) this.info2 = res.data.data[1]

						if (res.data.data.length >= 3) this.info3 = res.data.data[2]


						let data = {
							avatar: res.data.avatar || this.user.avatar,
							count: res.data.count,
							nickname: res.data.nickname || this.user.nickname,
							ranking: res.data.ranking
						}

						this.userInfo = data

						this.List = res.data.data
					}
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.leaderboard {

		.head-info {
			width: 750rpx;
			height: 842rpx;
			background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);
			
			.top{
				position: relative;
				width: 100%;
				height: 88rpx;
				padding-top: 60rpx;
				display: flex;
				align-items: center;
				
				image {
					position: absolute;
					left: 32rpx;
					width: 40rpx;
					height: 40rpx;
					z-index: 10;
				}
				
				view{
					width: 100%;
					font-size: 40rpx;
					font-weight: bold;
					color: #fff;
					text-align: center;
				}
				
			}
			
			.top-info {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20rpx;

				.top-tit {
					position: relative;
					width: 220rpx;
					font-size: 28rpx;
					color: rgb(255, 255, 255);
					text-align: center;

					text {
						position: absolute;
						left: 50%;
						bottom: -8rpx;
						transform: translate(-50%, 0);
						width: 40rpx;
						height: 8rpx;
						background: rgb(255, 255, 255);
						border-radius: 8rpx;
					}
				}

				.select {
					font-weight: bold;
				}
			}

			.switch {
				width: 492rpx;
				height: 64rpx;
				display: flex;
				align-items: center;
				border-radius: 64rpx;
				background: rgba(255, 255, 255, 0.4);
				margin: 0 auto;

				.switch-name {
					width: 33.33%;
					height: 64rpx;
					line-height: 64rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					border-radius: 64rpx;
				}

				.switch-select {
					color: rgb(10, 198, 142);
					background: #fff;
				}
			}

			.tip {
				width: 100%;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				margin: 20rpx 0 46rpx 0;
			}

			.ranking {
				width: 644rpx;
				display: flex;
				align-items: flex-end;
				margin: 0 auto;

				.ranking-info {
					width: 212rpx;
					text-align: center;

					.crown {
						width: 44rpx;
						height: 44rpx;
					}

					.auth {
						position: relative;
						width: 124rpx;
						height: 124rpx;
						box-sizing: border-box;
						border: 4rpx solid rgb(180, 203, 233);
						border-radius: 50%;
						margin: 0 auto;

						.auth-img {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							width: 120rpx;
							height: 120rpx;
							border-radius: 50%;
						}
					}

					.auth-name {
						width: 100%;
						font-size: 24rpx;
						font-weight: bold;
						color: rgb(255, 255, 255);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 8rpx 0;
					}

					.num {
						width: 100%;
						font-size: 24rpx;
						font-weight: bold;
						color: rgb(255, 255, 255);
						margin-bottom: 20rpx;
					}

					.btm {
						width: 100%;
						height: 112rpx;
						font-size: 56rpx;
						font-weight: bold;
						color: rgb(10, 198, 142);
						display: flex;
						align-items: center;
						justify-content: center;
						background: rgba(255, 255, 255, 0.5);
					}
				}

			}

			.list {
				width: 750rpx;
				min-height: 300rpx;
				padding-top: 24rpx;
				background: #fff;
				border-radius: 32rpx 32rpx 0 0;

				.list-tit {
					position: relative;
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					.left {
						display: flex;
						align-items: center;
						margin-left: 44rpx;

						image {
							width: 48rpx;
							height: 48rpx;
						}

						view {
							font-size: 24rpx;
							font-weight: bold;
							color: rgb(51, 51, 51);
							margin-left: 18rpx;
						}

					}

					.right {
						position: absolute;
						right: 26rpx;
						font-size: 24rpx;
						color: rgb(102, 102, 102);
					}

				}

				.item {
					position: relative;
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					.item-num {
						width: 38rpx;
						font-size: 32rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						text-align: center;
						margin-left: 46rpx;
					}

					image {
						display: block;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						margin: 0 20rpx 0 40rpx;
					}

					.item-name {
						max-width: 300rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.item-total {
						position: absolute;
						right: 56rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
					}
				}

			}

		}

		.my-info {
			position: fixed;
			left: 24rpx;
			bottom: 86rpx;
			width: 702rpx;
			height: 116rpx;
			font-weight: bold;
			color: rgb(255, 255, 255);
			display: flex;
			align-items: center;
			background: rgb(10, 198, 142);
			border-radius: 32rpx;
			z-index: 10;

			.num {
				font-size: 32rpx;
				margin-left: 24rpx;
			}

			image {
				display: block;
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				margin: 0 12rpx 0 32rpx;
			}

			.name {
				font-size: 28rpx;
				max-width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.total {
				position: absolute;
				font-size: 28rpx;
				right: 32rpx;
			}

		}

	}
</style>