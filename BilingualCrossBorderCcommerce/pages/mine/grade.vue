<template>
	<view class="grade-page">
		<uni-header :title="$t('top.yhdj')"></uni-header>
		<!--grade-head start-->
		<view class="grade-head">
			<view class="head-img">
				<image v-if="userCont.avatar" :src="userCont.avatar" mode="aspectFill"></image>
				<image v-else src="/static/userimg.png" mode="aspectFill"></image>
			</view>
			<view class="head-level" v-if="userCont.level > 0">
				<view class="level-icon">
					<image src="@/static/images/mine/mine_icon_vip.png" mode="widthFix"></image>
				</view>
				<view class="level-num">Lv.{{userCont.level}}</view>
			</view>
		</view>
		<!--grade-head end-->
		<!--grade-box start-->
		<view class="grade-box">
			<view class="grade-tit">{{$t('user.grade.czrw')}}</view>
			<view class="grade-li">
				<view class="li-fl">
					<view class="li-img">
						<image class="img" src="@/static/images/mine/grade_icon_no1.png"></image>
					</view>
					<view class="li-txt">
						<view class="t">{{$t('user.grade.sctx')}}</view>
						<view class="c">
							<view class="icon">
								<image class="img" src="@/static/images/mine/mine_icon_vip.png"></image>
							</view>
							<text>{{$t('user.grade.syj')}}</text>
						</view>
					</view>
				</view>
				<button v-if="mineCont.is_change_avatar !== '0'" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
				<button v-else class="grade-btn" @click="navClick('profile')">{{$t('user.grade.qwc')}}</button>
			</view>
			<view class="grade-li">
				<view class="li-fl">
					<view class="li-img">
						<image class="img" src="@/static/images/mine/grade_icon_no2.png"></image>
					</view>
					<view class="li-txt">
						<view class="t">{{$t('user.grade.smrz')}}</view>
						<view class="c">
							<view class="icon">
								<image class="img" src="@/static/images/mine/mine_icon_vip.png"></image>
							</view>
							<text>{{$t('user.grade.syj')}}</text>
						</view>
					</view>
				</view>
				<button v-if="mineCont.status == 1" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
				<button v-else class="grade-btn" @click="navClick('Vid')">{{$t('user.grade.qwc')}}</button>
			</view>
			<view class="grade-li">
				<view class="li-fl">
					<view class="li-img">
						<image class="img" src="@/static/images/mine/grade_icon_no3.png"></image>
					</view>
					<view class="li-txt">
						<view class="t">{{$t('user.grade.email')}}</view>
						<view class="c">
							<view class="icon">
								<image class="img" src="@/static/images/mine/mine_icon_vip.png"></image>
							</view>
							<text>{{$t('user.grade.syj')}}</text>
						</view>
					</view>
				</view>
				<button v-if="userCont.email" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
				<button v-else class="grade-btn" @click="navClick('Vemail')">{{$t('user.grade.qwc')}}</button>
			</view>
			<view class="grade-li">
				<view class="li-fl">
					<view class="li-img">
						<image class="img" src="@/static/images/mine/grade_icon_no4.png"></image>
					</view>
					<view class="li-txt">
						<view class="t">{{$t('user.grade.month')}}</view>
						<view class="c">
							<view class="icon">
								<image class="img" src="@/static/images/mine/mine_icon_vip.png"></image>
							</view>
							<text>{{$t('user.grade.syj')}}</text>
						</view>
					</view>
				</view>
				<button v-if="userCont.is_recharge==1" class="grade-btn gray">{{$t('user.grade.ywc')}}</button>
				<button v-else class="grade-btn" @click="navClick('recharge')">{{$t('user.grade.qwc')}}</button>
			</view>
		</view>
		<!--grade-box end-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userCont: '', // 个人信息
				mineCont: '', // 实名认证
			}
		},
		onShow() {
			this.getMineInfo();
			this.getMineAuth();
		},
		methods: {
			navClick(url) {
				uni.navigateTo({
					url
				});
			},
			getMineInfo() {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.userCont = res.data;
					}
				})
			},
			getMineAuth() {
				this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
					if (res.code == 1) {
						this.mineCont = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.grade-page {
		width: 100%;

		.grade-head {
			padding: 60rpx 30rpx;

			.head-img {
				width: 148rpx;
				height: 148rpx;
				margin: 0 auto;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.head-level {
				width: 100rpx;
				height: 40rpx;
				margin: 30rpx auto 0;
				background: rgb(253, 240, 226);
				border-radius: 100rpx;
				display: flex;

				.level-icon {
					width: 40rpx;
					height: 40rpx;

					image {
						width: 100%;
					}
				}

				.level-num {
					margin-left: 8rpx;
					color: rgb(219, 132, 37);
					font-size: 20rpx;
					line-height: 40rpx;
				}
			}
		}

		.grade-box {
			padding: 30rpx;

			.grade-tit {
				font-size: 32rpx;
				margin-bottom: 30rpx;
				font-weight: 600;
			}

			.grade-li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #f5f5f5;
				padding: 30rpx 0;
				box-sizing: border-box;

				&:last-child {
					border-bottom: none;
				}

				.grade-btn {
					width: 150rpx;
					height: 55rpx;
					background: rgb(10, 198, 142);
					border-radius: 28rpx;
					line-height: 55rpx;
					text-align: center;
					font-size: 24rpx;
					color: #fff;
					margin: 0;
				}

				.grade-btn.gray {
					background: #dfdfdf;
				}

				.li-fl {
					display: flex;
					align-items: center;

					.li-img {
						width: 68rpx;
						height: 68rpx;
						margin-right: 15rpx;
					}

					.li-txt {
						.t {
							font-size: 28rpx;
						}

						.c {
							margin-top: 6rpx;
							display: flex;
							align-items: center;
							font-size: 22rpx;
							color: rgba(0, 0, 0, 0.7);

							.icon {
								width: 24rpx;
								height: 25rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>