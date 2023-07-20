<template>
	<view>
		<view class="kbrick-head">
			<image src="/static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view class="tit">{{$t('new.wdkz')}} Join group chat</view>
			<view class="head-detail" @click="toDetail()">{{$t('new.ckmx')}}</view>
		</view>
		<!-- <u-toast ref="uToast" /> -->
		<!-- <common :tips='commonTips'></common>
		<u-mask z-index="1000" :custom-style="{background: 'rgba(0, 0, 0, 0.1)'}" :show="maskShow" @click="maskClick"></u-mask>
		<u-action-sheet :list="sessionLongpressList" @click="sessionLongpressAction" v-model="sessionLongpressShow"></u-action-sheet> -->
		<!-- <u-navbar :background="navBackground" @rightClick="rightClick" :autoBack="true"></u-navbar> -->
		<!-- 顶部搜索栏-start -->
		<!-- <view class="search">
			<view class="search-box">
				<u-search @search="search()" @custom="search()" v-model="keywords" class="search-box-u-search" shape="square" placeholder="搜索其实很简单" :clearabled="true" :show-action="false"></u-search>
				<view @click="toggleMessageMenu" class="message-menu">
					<u-icon class="message-menu-icon" name="plus" :class="messageMenu.show ? 'im-bg-grey':''" color="#3f3f3f" size="40"></u-icon>
					<view v-if="messageMenu.show" :style="{top: messageMenu.top, left: messageMenu.left}" class="message-menu-box popup-menu">
						<navigator class="popup-menu-item" url="/pages/search/new-contact" open-type="navigate">加好友/群</navigator>
						<navigator url="/pages/pick-user/pick-user?action=create-group" open-type="navigate">
							<view class="popup-menu-item">创建群聊</view>
						</navigator>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 顶部搜索栏-end -->
		<!-- 待办-start -->
		<!-- <u-cell-group class="to-do" :border="false">
			<navigator url="/pages/center/to-do" open-type="navigate">
				<u-cell-item class="to-do-cell-item" :border-bottom="false" :arrow="true" :title="'待办 • ' + TODOcount">
					<u-icon class="to-do-cell-item-icon" slot="icon" size="32" name="/static/icon/to-do.png"></u-icon>
				</u-cell-item>
			</navigator>
		</u-cell-group> -->
		<!-- 待办-end -->
		<!-- <u-line length="92%" class="session-list-top-line" color="#F2F3F4" /> -->
		<!-- 会话列表-start -->
		<view class="session-list">
			<block v-for="(item, index) in sessionListTop" :key="item.id">
				<session @click.native="goToSessionInfo(item.id, item.type, item.chat_id)" @longpress.native="sessionLongpress(item.id, item.top)" :item="item"></session>
			</block>
			<block v-for="(item, index) in sessionList" :key="item.id">
				<session @click.native="goToSessionInfo(item.id, item.type, item.chat_id)" @longpress.native="sessionLongpress(item.id, item.top)" :item="item"></session>
			</block>
			<view class="im-data-none" v-if="loadStatus">{{loadStatus}}</view>
		</view>
		<!-- 会话列表-end -->
	</view>
</template>

<script>
import session from "@/components/session/session.vue";
	export default {
        components: {
			session
		},
		data() {
			return {
				navBackground: {
					backgroundColor: '#F5F6F7'
				},
				keywords: '',
				maskShow: false,
				messageMenu: {
					show: false
				},
				sessionList: [],
				sessionListTop: [],
				TODOcount: 0,
				pageDataLoadBool: false,
				sessionLongpressList: [],
				sessionLongpressShow: false,
				loadStatus: '加载中...',
				commonTips: ''
			}
		},
		onLoad: function () {
			this.ws.pageFun(this.pageDataLoad, this);
		},
		onShow: function () {
			var that = this
			if(this.ws.pageRefresh.message) {
				// 被其他页面通知刷新会话列表(更新列表中的好友备注等)
				this.ws.pageFun(this.pageDataLoad, this);
				this.ws.clearPageRefresh()
				this.ws.pageRefresh.message = false
				this.ws.pageRefresh.sessionInfo = false
				this.ws.messageShow = [] // 已经重载,无需执行messageShow中的方法
				return ;
			}
			if (this.ws.messageShow.length) {
				for (let m in this.ws.messageShow) {
					if (typeof this.ws.messageShow[m] == 'function') {
						this.ws.messageShow[m](that)
						this.ws.messageShow[m] = null
					}
				}
			}
			if (!this.pageDataLoadBool) {
				return ;
			}
			that.ws.checkNetwork(that)
			that.ws.pageFun(function(){
				that.ws.send({
					c: 'User',
					a: 'getCommunityList',
					data: {
						"page": 1
					}
				})
			}, that);
			/* that.ws.pageFun(function(){
				that.ws.send({
					// c: 'ImBase',
					// a: 'loadTODO',
					// data: {
					// 	'method': 'get-all-count'
					// }
					"c": "User",
					"a": "getCommunityList",
					"data": {
						"page": 1
					}
				})
			}, that); */
		},
		onPullDownRefresh: function () {
			this.ws.pageFun(this.pageDataLoad(true), this);
			this.ws.onMessageCallBack.set('load_session_list', (msg) => {
				if (msg.data.data.refresh && msg.data.data.method == 'load') {
					this.$refs.uToast.show({
						title: '刷新成功~',
						type: 'success'
					})
					uni.stopPullDownRefresh()
				}
			})
		},
		methods: {
			onReturn() {
				uni.navigateBack()
			},
			// toDetail() {
			// 	uni.navigateTo({
			// 		url: '/pages/mine/K_brick_detail_info'
			// 	})
			// },
			pageDataLoad: function (refresh = false) {
				this.pageDataLoadBool = true
				this.ws.send({
					c: 'User',
					a: 'loadSessionList',
					data: {
						'refresh': refresh
					}
				})
				this.ws.send({
					c: 'ImBase',
					a: 'loadTODO',
					data: {
						'method': 'get-all-count'
					}
				})
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
			sessionLongpress: function (id, top) {
				this.sessionLongpressShow = true
				this.sessionLongpressList = [{
					text: top ? '取消置顶':'置顶',
					id: id
				}, {
					text: '移除会话',
					color: '#f74c31',
					id: id
				}]
			},
			sessionLongpressAction: function (idx) {
				var that = this
				if (idx == 0) {
					that.ws.pageFun(function(){
						that.ws.send({
							c: 'User',
							a: 'sessionOperation',
							data: {
								id: that.sessionLongpressList[idx].id,
								action: 'session-top',
								source: 'uni-app'
							}
						})
					}, that)
				} else if (idx == 1) {
					that.ws.pageFun(function(){
						that.ws.send({
							c: 'User',
							a: 'sessionOperation',
							data: {
								action: "session-remove",
								id: that.sessionLongpressList[idx].id,
								source: 'uni-app'
							}
						});
					}, that)
				}
			},
			maskClick: function() {
				this.messageMenu.show && this.toggleMessageMenu()
			},
			toggleMessageMenu: function(e) {
				var that = this
				if (that.messageMenu.show) {
					that.maskShow = false
					that.messageMenu.show = false
					return ;
				}
				that.messageMenu = {
					show: true,
					top: (e.detail.y + 14) + 'px',
					left: (e.detail.x - 120) + 'px'
				}
				that.maskShow = true
			},
			search: function() {
				if (!this.keywords) {
					this.$refs.uToast.show({
						title: '请输入关键词~',
						type: 'error'
					})
					return ;
				}
				uni.navigateTo({
					url: '/pages/search/search?keywords=' + this.keywords,
					success: () => {
						this.keywords = ''
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background: #FFFFFF;
}
.search {
	display: flex;
	align-items: center;
	justify-content: center;
}
.search-box {
	display: flex;
	align-items: center;
	padding: 20rpx 0 10rpx 0;
}
.search-box .search-box-u-search {
	width: 616rpx;
}
.search-box .message-menu {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 20rpx;
}
.message-menu .message-menu-icon {
	padding: 6rpx;
	z-index: 1001;
	border-radius: 4px;
}
.message-menu-box {
	position: absolute;
	background: #FFFFFF;
	box-shadow: 0 0 20rpx rgba(0, 0, 0, .1);
	border-radius: 4px;
	z-index: 1001;
}
.popup-menu .popup-menu-item {
	padding: 30rpx 70rpx;
	text-align: center;
	border-bottom: 1px solid #F3F4F6;
}
.popup-menu .popup-menu-item:last-child {
	border: none;
}
.to-do .to-do-cell-item .to-do-cell-item-icon {
	margin-right: 10rpx;
}
.session-list {
	margin-top: 70rpx;
}
.session-list-top-line {
	display: flex;
	align-items: center;
	justify-content: center;
}
.im-bg-grey {
	background-color: $--grey;
	color: $--white;
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
