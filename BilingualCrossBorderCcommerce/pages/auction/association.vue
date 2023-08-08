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
			<uni-empty class="empty-class" :image="image" :message="$t('grop.not')" iconSize="60" :width='160' :height='160'></uni-empty>
			<scroll-view class="association-child" scroll-y="true">
				<view class="child_list">
					<view class="child_list_text">Can Join The group</view>
					<view class="child" v-for="(item, index) in JoinGroupList" :key="item.id">
						<image :src="item.avatar" class="img"></image>
						<view class="child-name">{{item.nickname}}</view>
						<view class="child-info">
							<image src="/static/images/service/nums.png"></image>
							<view>{{item.user_count}}/{{item.max_user_count}}</view>
						</view>
						<view class="child-btn" @click="userAction(item)" :key="index">{{$t('grop.join')}}</view>
					</view>
				</view>
			</scroll-view>
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
				JoinGroupList:[],
				form:{},
				image: '/static/images/service/not_msg.png',
				isShopCont: false
			}
		},
		onShow() {
			this.getCommunityList()
		},
		methods: {
			getCommunityList(){
				var that = this
				/*that.ws.checkNetwork(that)
				function pageFun(asyncFunc, context) {
					return new Promise((resolve, reject) => {
						asyncFunc.call(context, resolve, reject);
					});
				}
				// 第一个异步操作
				const firstAsyncOperation = function (resolve, reject) {
					that.ws.send({
						c: 'User',
						a: 'loadSessionList',
						data: {
						"get_community_list": 1
						}
					});
					setTimeout(() => {
						resolve('First async operation completed.');
					}, 2000);
				};

				// 第二个异步操作
				const secondAsyncOperation = function (resolve, reject) {
					that.ws.send({
						c: 'User',
						a: 'getCommunityList',
						data: {
						'page': 1
						}
					});
					setTimeout(() => {
						resolve('Second async operation completed.');
					}, 2000);
				};
				// 使用 ws.pageFun 来处理两个异步操作
				pageFun(firstAsyncOperation, that.ws).then((result) => {console.log(result);}).catch((error) => {console.error(error);});
				pageFun(secondAsyncOperation, that.ws).then((result) => {console.log(result);}).catch((error) => {console.error(error);}); */
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
				setTimeout(() => {
					that.ws.pageFun(function(){
						that.ws.send({
							c: 'User',
							a: 'getCommunityList',
							data: {
								'page': 1
							}
						})
					}, that);
				}, 1000);
			},
			userAction :function ({id,type}) {
				let that = this
				that.submitButtonStatus = true
				that.form.id = id
				that.form.type = (type == 'user') ? 'friends':'group'
				that.form.action = 'apply'
				that.form.method = 'post'
				console.log(that.form);
				that.ws.pageFun(function(){
					var message = { c: 'User', a: 'createNewContact', data: that.form }
					that.ws.send(message);
					that.ws.showMsgCallback = function () {
						that.submitButtonStatus = false
						setTimeout(function(){
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					}
				}, that)
				return
			},
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
			padding-top: 60rpx;
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
		.empty-class{
			border-bottom: 20rpx solid #F6F6F6;
		}
		.association-child{
			min-height: 64vh;
			.child_list {
				margin-top: 32rpx;
				.child_list_text{
					text-align: center;
					font-size: 32rpx;
					margin: 40rpx 0 ;
				}
				.child {
					position: relative;
					width: 686rpx;
					height: 140rpx;
					background: rgb(246, 246, 246);
					border-radius: 20rpx;
					margin: 0 auto 20rpx auto;

					.img {
						position: absolute;
						top: 16rpx;
						left: 16rpx;
						width: 108rpx;
						height: 108rpx;
						border-radius: 20rpx;
					}

					.child-name {
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

					.child-info {
						position: absolute;
						left: 150rpx;
						bottom: 24rpx;
						max-width: 420rpx;
						font-size: 24rpx;
						color: rgb(153, 153, 153);
						display: flex;
						align-items: center;
						
						image{
							display: block;
							width: 24rpx;
							height: 24rpx;
							margin-right: 8rpx;
						}
					}
					
					.child-btn{
						position: absolute;
						top: 50%;
						right: 28rpx;
						transform: translate(0,-50%);
						width: 92rpx;
						height: 48rpx;
						line-height: 48rpx;
						font-size: 24rpx;
						color: rgb(255, 255, 255);
						text-align: center;
						background: rgb(10, 198, 142);
						border-radius: 48rpx;
					}

				}
			}
		}
	}
</style>