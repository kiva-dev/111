<template>
	<view class="association">
		<view class="association_head">
			<image src="/static/images/mine/left.png" class="left" @click="toBack()"></image>
			<view class="tit">{{$t('new.association')}}</view>
			<view class="right" @click="navClick('/pages/auction/join_group_chat')">
				<image src="/static/images/kbrick/jia.png"></image> {{$t('grop.add')}}
			</view>
		</view>

		<template v-if="sessionList.length > 0">
			<view class="association_list">
				<view class="item" v-for="(item,index) in sessionListTop" :key="index" @click="goToSessionInfo(item.id, item.type, item.chat_id)">
					<image :src="item.avatar"></image>
					<view class="item-name">{{item.nickname}}</view>
					<view class="item-info">{{item.last_message}}</view>
					<view class="item-time">{{item.last_time}}</view>
					<view class="item-num">
						<u-badge numberType="overflow" max="99" :value="item.unreadMessagesNumber"></u-badge>
					</view>
				</view>
				<view class="item" v-for="(item,index) in sessionList" :key="index" @click="goToSessionInfo(item.id, item.type, item.chat_id)">
					<image :src="item.avatar"></image>
					<view class="item-name">{{item.nickname}}</view>
					<view class="item-info">{{item.last_message}}</view>
					<view class="item-time">{{item.last_time}}</view>
					<view class="item-num">
						<u-badge numberType="overflow" max="99" :value="item.unreadMessagesNumber"></u-badge>
					</view>
				</view>
				<view class="association-not">{{$t('grop.nomore')}}</view>
			</view>
		</template>
		<template v-else>
			<uni-empty :image="image"
				:message="$t('grop.not')"></uni-empty>
		</template>

		
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sessionList: [],
				sessionListTop: [],
				image: '/static/images/service/not_msg.png',
				isShopCont: false
			}
		},
		onShow() {
			var that = this
			that.ws.checkNetwork(that)
			that.ws.pageFun(function(){
				that.ws.send({
					c: 'User',
					a: 'loadSessionList',
					data: {
						"get_community_list": 1
					}
				})
			}, that);
		},
		methods: {
			goToSessionInfo: function(id, type, chat_id) {
				var url = '/pages/session-info/session-info?id=' + id
				if (type == 'service') {
					if (chat_id != 3) {
						url = '/pages/session-info/notice-session-info?session_id=' + id
					}
				}
				uni.navigateTo({
					url: url
				})
			},
			navClick(url){
				uni.navigateTo({
					url
				})
			},
			toBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.association {
		width: 100%;
		min-height: 100vh;
		background: rgb(255, 255, 255);

		.association_head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgb(204, 204, 204);

			.left {
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

			.right {
				position: absolute;
				right: 32rpx;
				font-size: 20rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				display: flex;
				align-items: center;
				z-index: 5;

				image {
					width: 20rpx;
					height: 20rpx;
					margin-right: 8rpx;
				}

			}

		}

		.association_list {
			margin-top: 32rpx;

			.item {
				position: relative;
				width: 686rpx;
				height: 140rpx;
				background: rgb(246, 246, 246);
				border-radius: 20rpx;
				margin: 0 auto 20rpx auto;

				image {
					position: absolute;
					top: 16rpx;
					left: 16rpx;
					width: 108rpx;
					height: 108rpx;
					border-radius: 20rpx;
				}

				.item-name {
					position: absolute;
					top: 24rpx;
					left: 150rpx;
					max-width: 400rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.item-info {
					position: absolute;
					left: 150rpx;
					bottom: 24rpx;
					max-width: 420rpx;
					font-size: 24rpx;
					color: rgb(153, 153, 153);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.item-time {
					position: absolute;
					top: 28rpx;
					right: 24rpx;
					font-size: 20rpx;
					color: rgb(102, 102, 102);
				}

				.item-num {
					position: absolute;
					right: 24rpx;
					bottom: 26rpx;
					line-height: 30rpx;
					text-align: center;
					font-size: 16rpx;
					color: #fff;
					// background: rgb(255, 57, 57);
					border-radius: 50%;
				}

			}

			.association-not {
				width: 100%;
				font-size: 24rpx;
				color: rgb(153, 153, 153);
				text-align: center;
				margin-top: 12rpx;
			}

		}

	}
</style>