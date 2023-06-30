<template>
	<view class="comment-page">
		<uni-header :title="$t('new.plq')"></uni-header>
		<template v-if="commentList && commentList.length > 0">
			<view class="comment-list">
				<view class="comment-item" v-for="(item,i) in commentList">
					<view class="comment-item-head">
						<view class="comment-item-head-left">
							<image :src="item.user.avatar"></image>
							<view>{{item.user.nickname}}</view>
						</view>
						<view class="comment-item-head-right">{{item.createtime}}</view>
					</view>

					<view class="comment-item-info">{{item.comment}}
					</view>

					<view class="comment-item-icons">
						<view class="comment-item-icons-info" style="right: 138rpx;"
							@click="sendLike(item)">
							<image src="../../static/images/products/xiai.png" v-if="item.is_like==1"></image>
							<image src="../../static/images/products/xiai1.png" v-else></image>
							<view>{{item.like_count}}</view>
						</view>
						<view class="comment-item-icons-info" style="right: 46rpx;"
							@click="onShowmsg(item)">
							<image src="../../static/images/products/pinglun.png" v-if="item.sub_count==0"></image>
							<image src="../../static/images/products/pinglun1.png" v-else></image>
							<view>{{item.sub_count}}</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<uni-empty image="/static/images/new/wpl.png" :message="$t('new.zwpl')"></uni-empty>
		</template>
		<view class="comment-botm">
			<view class="comment-botm-inpit">
				<u--input placeholder="我想说" border="surround" v-model="comment" @confirm="sendComment()"></u--input>
			</view>
		</view>

		<u-popup :show="showComment" mode="bottom" bgColor="transparent">
			<view class="showComment">
				<view class="tit">
					<view>{{selectCommentList.length}}{{$t('new.tpl')}}</view>
					<image src="/static/images//products/guanbi.png" @click="showComment=false;comment1=''"></image>
				</view>
				<view class="list">
					<scroll-view scroll-y style="height: 670rpx;">
						<view class="item" v-for="(item,i) in selectCommentList">
							<image :src="item.user.avatar" class="auth"></image>
							<view class="item-info">
								<view class="item-info-top">
									{{item.user.nickname}} <span>{{item.createtime}}</span>
								</view>
								<view class="item-info-des">
									{{item.comment}}
								</view>
							</view>
							<view class="item-img" @click="sendLike(item)">
								<image src="../../static/images/products/xiai.png" v-show="item.is_like==1"></image>
								<image src="../../static/images/products/xiai1.png" v-show="item.is_like==0"></image>
								<span>{{item.like_count}}</span>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="showComment-btn">
					<view class="comment-botm-inpit">
						<u--input placeholder="我想说" border="surround" v-model="comment1"
							@confirm="sendCommentTwoInfo()"></u--input>
					</view>
				</view>
			</view>
		</u-popup>
		<view style="height: 170rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showComment: false,
				id: 0,
				selectId: 0,
				comment: '',
				commentList: [],
				comment1: '',
				selectCommentList: {}
			}
		},
		onLoad(e) {
			if (e.id) this.id = e.id;
		},
		onShow() {
			this.getCommentList();
		},
		methods: {
			onShowmsg(item) {
				this.selectId = item.user_comment_id
				this.showComment = true
				this.getSelectComment(item.user_comment_id)
			},
			//获取子列表
			getSelectComment(id) {
				this.$http.post(this.$apiObj.getSelectCommentList, {
					user_comment_id: id
				}).then(res => {
					if (res.code == 1) {
						res.data.data.forEach(item => {
							let arr = item.createtime.split(' ')
							let day = arr[0].split('-')
							let time = arr[1].split(':')
							item.createtime = day[1] + '/' + day[2] + ' ' + time[0] + ':' + time[1]
						})
						this.selectCommentList = res.data.data
					}
				})
			},
			onReturn() {
				uni.navigateBack()
			},
			//获取所有列表
			getCommentList() {
				this.$http.post(this.$apiObj.GoodsCommentList, {
					goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						res.data.data.forEach(item => {
							let arr = item.createtime.split(' ')
							let day = arr[0].split('-')
							let time = arr[1].split(':')
							item.createtime = day[1] + '/' + day[2] + ' ' + time[0] + ':' + time[1]
						})
						this.commentList = res.data.data
					}
				})
			},
			//发送一级评论
			sendComment() {
				this.$http.post(this.$apiObj.SendComment, {
					goods_id: this.id,
					comment: this.comment
				}).then(res => {
					if (res.code == 1) {
						this.getCommentList()
						this.comment = ''
					}
				})
			},
			//发送二级评论
			sendCommentTwoInfo() {
				this.$http.post(this.$apiObj.SendComment, {
					goods_id: this.id,
					comment: this.comment1,
					user_comment_id: this.selectId
				}).then(res => {
					if (res.code == 1) {
						this.getSelectComment(this.selectId)
						this.comment1 = ''
					}
				})
			},
			//点赞
			sendLike(item) {
				this.$http.post(this.$apiObj.SendLike, {
					user_comment_id: item.user_comment_id
				}).then(res => {
					if (res.code == 1) {
						if(item.pid==0) this.getCommentList()
						else this.getSelectComment(item.pid)
					}
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	/deep/.u-border {
		border-color: rgb(10, 198, 142) !important;
	}

	.comment-page {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.comment-list {
			margin-top: 40rpx;

			.comment-item {
				width: 750rpx;
				padding: 20rpx 0 10rpx 0;
				// height: 292rpx;
				background: #FFF;
				margin-bottom: 20rpx;

				.comment-item-head {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.comment-item-head-left {
						display: flex;
						align-items: center;

						image {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							margin-left: 30rpx;
						}

						view {
							font-size: 24rpx;
							color: rgb(44, 44, 44);
							margin-left: 20rpx;
						}
					}

					.comment-item-head-right {
						font-size: 24rpx;
						color: rgba(44, 44, 44, 0.3);
						margin-right: 32rpx;
					}

				}

				.comment-item-name {
					font-size: 24rpx;
					color: rgb(255, 78, 47);
					margin: 10rpx 0 20rpx 30rpx;
				}

				.comment-item-info {
					width: 690rpx;
					line-height: 30rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					word-break: break-all;
					margin: 10rpx auto;
				}

				.comment-item-icons {
					position: relative;
					width: 100%;
					display: flex;
					align-items: center;
					margin: 20rpx 0 30rpx 0;

					.comment-item-icons-info {
						position: absolute;
						display: flex;
						align-items: flex-end;

						image {
							width: 40rpx;
							height: 40rpx;
						}

						view {
							font-size: 16rpx;
							color: rgb(44, 44, 44);
						}
					}
				}
			}
		}

		.comment-botm {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 144rpx;
			display: flex;
			align-items: center;
			background: #FFF;
			box-shadow: 0px -4rpx 14rpx rgba(255, 198, 188, 0.3);

			.comment-botm-inpit {
				width: 690rpx;
				margin: 0 auto;
			}
		}

		.showComment {
			position: relative;
			width: 100%;
			height: 1000rpx;
			background: #FFF;
			border-radius: 16rpx 16rpx 0 0;

			.tit {
				position: relative;
				width: 100%;
				height: 100rpx;
				font-size: 32rpx;
				color: rgb(0, 0, 0);
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid rgb(190, 190, 190);

				image {
					position: absolute;
					right: 32rpx;
					width: 48rpx;
					height: 48rpx;
				}

				view {
					width: 100%;
					text-align: center;
				}
			}

			.list {
				width: 100%;
				margin-top: 42rpx;

				.item {
					width: 100%;
					display: flex;
					align-items: flex-start;
					margin-bottom: 42rpx;

					.auth {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						margin-left: 30rpx;
					}

					.item-info {
						margin-left: 20rpx;

						.item-info-top {
							font-size: 16rpx;
							color: rgba(44, 44, 44, 0.3);

							span {
								margin-left: 20rpx;
							}
						}

						.item-info-des {
							width: 520rpx;
							font-size: 24rpx;
							color: rgb(44, 44, 44);
							margin-top: 4rpx;
							word-break: break-all;
						}

					}

					.item-img {
						margin: 20rpx 0 0 20rpx;

						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}

			.showComment-btn {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 144rpx;
				display: flex;
				align-items: center;
				background: #FFF;
				box-shadow: 0px -4rpx 14rpx rgba(255, 198, 188, 0.3);

				.comment-botm-inpit {
					width: 690rpx;
					margin: 0 auto;
				}
			}
		}
	}
</style>