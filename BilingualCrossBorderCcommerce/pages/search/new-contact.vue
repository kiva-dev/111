
<template>
	<view>
		<u-toast ref="uToast" />
		<!-- <common :tips='commonTips'></common> -->
		<!-- <view class="tabs-box-f">
			<view class="tabs-box">
				<u-tabs :list="tabs" :is-scroll="false" :current="tabCurrent" @change="tabChange"></u-tabs>
			</view>
		</view> -->
        <view class="kbrick-head">
			<image src="/static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view class="tit">Association</view>
			<view class="head-detail" @click="toDetail()">Group Chat</view>
		</view>
		<!-- <view class="search-box">
			<u-search @search="search(1)" @custom="search(1)" v-model="keywords" class="search-box-u-search" shape="square" placeholder="搜索其实很简单" :clearabled="true" :animation="true"></u-search>
		</view> -->
		<view class="search-res">
			<view v-for="(item,index) in res" :key="index" class="contact-item">
				<image @click="goCenterInfo(item.id, item.type)" class="contact-item-avatar" :src="item.avatar" mode="widthFix"></image>
				<view @click="goCenterInfo(item.id, item.type)" class="contact-item-info">
					<view class="contact-item-info-item contact-item-info-name">{{item.nickname}}</view>
					<view class="contact-item-info-item">{{item.bio}}</view>
				</view>
				<u-button @click="clickContact(item.id, item.type, item.button.action, item.button.opt,item)" size="mini" class="contact-item-button">{{item.button.text}}</u-button>
			</view>
		</view>
		<u-loadmore margin-top="40" margin-bottom="40" :status="loadStatus" :icon="false" :loadText="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
				// tabs: [{
				// 	name: '找群'
				// }],
				tabCurrent: 1,
				res: [],
				loadStatus: 'loadmore',
				loadText: {
					loadmore: '请输入关键词搜索用户/群聊',
					loading: '努力加载中...',
					nomore: '没有更多了~'
				},
				commonTips: ''
			}
		},
		onShow: function (){
            var that = this
			that.ws.checkNetwork(that)
			that.ws.pageFun(function(){
				that.ws.send({
					c: 'User',
					a: 'searchNewContact',
					data: {
						'keyword': 'k',
                        'type': 'group',
                        'page': 1
					}
				})
			}, that);
		},
		methods: {
            onReturn() {
				uni.navigateBack()
			},
            toDetail(){
                uni.navigateTo({
					url: '/pages/auction/association'
				})
            },
			search: function(page = 1) {
				var that = this
				if (!that.keywords) {
					that.$refs.uToast.show({
						title: '请输入搜索关键词~',
						type: 'error'
					})
					return ;
				}
				
				that.ws.pageFun(function(){
					let message = {
						c: 'User',
						a: 'searchNewContact',
						data: {
							'keyword': 'k',
							'type': 'group',
							'page': page
						}
					}
					that.ws.send(message);
				}, that)
			},
			tabChange: function (index) {
				this.tabCurrent = index
				if(this.keywords) {
					this.search()
				}
			},
			onReachBottom: function () {
				if (this.newContactData) {
					this.search(parseInt(this.newContactData.page) + 1)
				}
			},
			goCenterInfo: function (id, type) {
				uni.navigateTo({
					url: '/pages/center/info?id=' + id + '&type=' + type
				})
			},
			clickContact: function (id , type, action, opt = false,obj) {
				if (action == 'open-session') {
					let message = { c: 'Message', a: 'openSession', data: { 'id': id, 'type': type } }
					this.ws.send(message);
				} else if ((action == 'userinfo-opt' && opt == 'join') || action == 'add-friends') {
					// 加入群聊-加好友
					uni.navigateTo({
						url: '/pages/search/add-contact?id=' + id + '&type=' + type
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background: #FFFFFF;
}
.tabs-box {
	width: 50vw;
	margin: 0 auto;
}
.search-box {
	display: flex;
	align-items: center;
	padding: 20rpx 4vw;
}
.search-box .search-box-u-search {
	flex: 1;
}
.contact-item {
	display: flex;
	width: 100vw;
	align-items: center;
	padding: 20rpx 4vw;
}
.contact-item-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 16rpx;
}
.contact-item-info {
	padding-left: 20rpx;
	width: 64%;
}
.contact-item-info-item {
	display: block;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.contact-item-info-name {
	font-size: 32rpx;
}
.contact-item-button {
	margin-left: auto;
}
.kbrick-head {
	position: relative;
	width: 100%;
	height: 88rpx;
	padding-top: 88rpx;
	display: flex;
	align-items: center;
	background: #FFF;

	image {
		position: absolute;
		left: 32rpx;
		width: 40rpx;
		height: 40rpx;
		z-index: 10;
	}

	.tit {
		width: 100%;
		font-size: 40rpx;
		font-weight: bold;
		color: rgb(51, 51, 51);
		text-align: center;
	}

	.head-detail {
		position: absolute;
		right: 32rpx;
		font-size: 24rpx;
		color: rgb(51, 51, 51);
		z-index: 10;
	}
}
</style>
