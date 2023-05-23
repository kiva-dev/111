<template>
	<view class="mine-page">
		<!--mine-head start-->
		<view class="mine-head">
			<view class="head-set" @click="navClick('set')">
				<image class="img" src="../../static/images/mine/setting.png"></image>
			</view>
			
			<image src="../../static/images/mine/kefu.png" class="head_kf"></image>
			
			<image src="../../static/images/mine/comment.png" class="head_msg"></image>
			
			<view class="head-mid" @click="navClick('profile')">
				<view class="mid-fl">
					<view class="mid-img">
						<image class="img" v-if="userCont.avatar" :src="userCont.avatar"></image>
						<image class="img" v-else src="../../static/images/mine/auth_logo.png"></image>
					</view>
					<view class="mid_shiming">未实名</view>
					<view class="mid-txt">
						<view class="name">{{userCont.nickname}}</view>
						<view class="vip">
							<view class="icon">
								<image class="img" src="../../static/images/mine/mine0.png"></image>
							</view>
							<text>LV{{userCont.level}}</text>
						</view>
					</view>
				</view>
				<!-- <view class="more">
					<image class="img" src="../../static/images/mine/more.png"></image>
				</view> -->
			</view>
			
			<!-- <view class="head-nav">
				<view class="li" @click="navClick('wallet')">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine2.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.myqianbao')}}</view>
				</view> -->
				<!-- <view class="li" @click="navClick('coupon')">
          <view class="icon">
            <image class="img" src="../../static/images/mine/mine03.png"></image>
          </view>
          <view class="t">{{$t('user.myCont.yhq')}}</view>
        </view> -->
				<!-- <view class="li" @click="navClick('auctionM')">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine04.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.myjingpai')}}</view>
					<view class="dian" v-if="no_select=='1'"></view>
				</view>
				<view class="li" @click="navClick('attentionM')">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine05.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.guanzhu')}}</view>
				</view>
			</view> -->
		
		</view>
		<!--mine-head end-->
		
		<!--钱包信息-->
		<view class="mine-wallet">
			<view class="mine-wallet-left" @click="navClick('wallet')">
				<image src="../../static/images/new/wallet.png"></image>
				<view>我的钱包</view>
			</view>
			<view class="mine-wallet-right">
				<view class="mine-wallet-info" >
					<image src="../../static/images/new/scj.png"></image>
					<view>我的收藏</view>
				</view>
				<view class="mine-wallet-info" style="margin-top: 12rpx;" @click="navClick('attentionM')">
					<image src="../../static/images/new/subject.png"></image>
					<view>订阅店铺</view>
				</view>
			</view>
		</view>
		
		<!--竞拍-->
		<view class="mine-jingpai">
			<view class="mine-jingpai-li" @click="toAuction(1)">
				<image src="../../static/images/mine/jpz.png"></image>
				<view>竞拍中</view>
			</view>
			
			<view class="mine-jingpai-li" @click="toAuction(5)">
				<image src="../../static/images/mine/jpdd.png"></image>
				<view>竞拍订单</view>
			</view>
			
			<view class="mine-jingpai-li" @click="toAuction(3)">
				<image src="../../static/images/mine/zpjl.png"></image>
				<view>中拍记录</view>
			</view>
			
			<view class="mine-jingpai-li" @click="toAuction(4)">
				<image src="../../static/images/mine/jpjl.png"></image>
				<view>竞拍记录</view>
			</view>
			
		</view>
		
		<!--mine-order start-->
		<view class="mine-order">
			<view class="order-hd">
				<view class="t">{{$t('user.myCont.order')}}</view>
				<view class="more" @click="navClick('/pages/mine/order/order')">
					<text>{{$t('user.myCont.ckqb')}}</text>
					<view class="icon">
						<image class="img" src="../../static/images/mine/more1.png"></image>
					</view>
				</view>
			</view>
			
			<view class="order-nav">
				<!-- <view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=2')">
          <view class="icon">
            <image class="img" src="../../static/images/mine/mine06.png"></image>
          </view>
          <view class="t">{{$t('user.myCont.dafk')}}</view>
        </view> -->
				<!-- <view class="li" @click="navClick('/pages/mine/order/order?Inv=1&type=3')">
          <view class="icon">
            <image class="img" src="../../static/images/mine/mine3.png"></image>
          </view>
          <view class="t">{{$t('user.myCont.daipt')}}</view>
        </view> -->
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=2')">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine4.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.dfh')}}</view>
				</view>
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=3')">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine5.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.dsh')}}</view>
				</view>
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=4')">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine6.png"></image>
					</view>
					<!-- <view class="t">{{$t('user.myCont.dpj')}}</view> -->
					<view class="t">{{$t('zhongpai.daiqueren')}}</view>
				</view>
				<view class="li" @click="navClick('/pages/mine/order/order?Inv=2&type=6')">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine15.png"></image>
					</view>
					<view class="t">{{$t('user.myCont.yiwanceng')}}</view>
				</view>
			</view>
		</view>
		<!--mine-order end-->
		<!--分享广告位 start-->
		<!-- <view class="mine-asd" @click="navClick('/pages/invite/invite')">
      <image v-if="isShopCont" class="img" mode="widthFix" src="../../static/yaoqing.png"></image>
      <image v-else class="img" mode="widthFix" src="../../static/images/mine/mine7.png"></image>
    </view> -->
		<!--mine-asd end-->
		<!--mine-list start-->
		<view class="mine-list">
			<view class="li" @click="navClick('/pages/invite/invite')">
				<view class="li-fl">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine16.png"></image>
					</view>
					<text>推广分享</text>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/mine/more1.png"></image>
				</view>
			</view>
			<view class="li" @click="navClick('refund/refund')">
				<view class="li-fl">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine8.png"></image>
					</view>
					<text>{{$t('user.myCont.tkshh')}}</text>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/mine/more1.png"></image>
				</view>
			</view>
			<view class="li" @click="navClick('upgrade')">
				<view class="li-fl">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine9.png"></image>
					</view>
					<text>{{$t('user.myCont.zhj')}}</text>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/mine/more1.png"></image>
				</view>
			</view>
			<view class="li" @click="navClick('message')">
				<view class="li-fl">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine10.png"></image>
					</view>
					<text>{{$t('user.myCont.xxzx')}}</text>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/mine/more1.png"></image>
				</view>
				<view class="dian" v-if="noSelect=='1'"></view>
			</view>
			<view class="li" @click="onkefyu">
				<view class="li-fl">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine11.png"></image>
					</view>
					<text>{{$t('user.myCont.ptkf')}}</text>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/mine/more1.png"></image>
				</view>
			</view>
			<view class="li" @click="navClick('Feedback')">
				<view class="li-fl">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine12.png"></image>
					</view>
					<text>{{$t('user.myCont.yjfk')}}</text>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/mine/more1.png"></image>
				</view>
			</view>
			<view class="li" @click="navClick('about')">
				<view class="li-fl">
					<view class="icon">
						<image class="img" src="../../static/images/mine/mine13.png"></image>
					</view>
					<text>{{$t('user.myCont.about')}}</text>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/mine/more1.png"></image>
				</view>
			</view>
		</view>
		<!--mine-list end-->
		<!--联系客服弹出 start-->
		<uni-popup ref="popup2" type="center">
			<view class="email-cont">
				<image class="query" @click="onQuery" src="../../static/images/close1.png"></image>
				<view class="title">{{$t('kefu.title')}}</view>
				<view class="cont">
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>cs-reply@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>info@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>reply@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>support@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>help@kolibrimall.com
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				no_select: 0,
				noSelect: 0,
				isShopCont: false, // 商品详情显示中文还是英文
				userCont: '', // 个人信息
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			// 获取个人信息
			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (res.code == 1) {
					uni.setStorageSync('userCont', res.data)
					this.userCont = res.data
				}
			})
			this.$http.post(this.$apiObj.MineWinAuction, {
				page: '1',
				pagenum: '1'
			}).then(res => {
				if (res.code == 1) {
					this.no_select = res.data.no_select
				}
			})
			this.$http.post(this.$apiObj.MineSysmsgList, {
				page: 1,
				pagenum: 1
			}).then(res => {
				if (res.code == 1) {
					this.noSelect = res.data.no_read
				}
			})
		},
		methods: {
			toAuction(num){
				uni.navigateTo({
					url:'/pages/mine/auctionM?num='+num
				})
			},
			onkefyu() {
				uni.navigateTo({
					url: './kefu'
				})
				// this.$refs.popup2.open()
				// uni.navigateTo({
				//   url: 'custom?uuid=1&avatar=' + uni.getStorageSync('userCont').avatar
				// })
			},
			onQuery() {
				this.$refs.popup2.close()
			},
			onPingtaiClick() {
				(function() {
					var c = document.createElement("script"),
						s = document.getElementsByTagName("script")[0];
					c.src = "https://kefu3.cckefucloud.com/vclient/?webid=1784027&wc=5513c6cf";
					s.parentNode.insertBefore(c, s);
				})();
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.mine-page {
		min-height: 100vh;
		background: #f8f8f8;
	}
	
	/*钱包相关*/
	.mine-wallet{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		
		.mine-wallet-left{
			width: 300rpx;
			height: 182rpx;
			text-align: center;
			padding-top: 10rpx;
			background: #FFF;
			border-radius: 16rpx;
			box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
			
			image{
				width: 120rpx;
				height: 120rpx;
			}
			
			view{
				font-size: 32rpx;
				color: rgb(44, 44, 44);
			}
		}
		
		.mine-wallet-right{
			margin-left: 90rpx;
			
			.mine-wallet-info{
				width: 300rpx;
				height: 90rpx;
				background: #FFF;
				border-radius: 16rpx;
				box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
				display: flex;
				align-items: center;
				justify-content: center;
				
				image{
					width: 60rpx;
					height: 60rpx;
				}
				
				view{
					width: 180rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					margin-left: 20rpx;
				}
			}
		}
		
	}
	
	.mine-head {
		width: 750rpx;
		height: 334rpx;
		background: url('../../static/images/mine/tuoyuan.png') no-repeat;
		background-size: 750rpx 334rpx;
		position: relative;

		.head-set {
			position: absolute;
			top: 112rpx;
			right: 110rpx;
			width: 48rpx;
			height: 48rpx;
		}
		
		.head_kf{
			position: absolute;
			top: 112rpx;
			right: 188rpx;
			width: 48rpx;
			height: 48rpx;
		}
		
		.head_msg{
			position: absolute;
			top: 112rpx;
			right: 32rpx;
			width: 48rpx;
			height: 48rpx;
		}

		.head-mid {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.mid-fl {
				display: flex;
				align-items: center;
			}

			.mid-txt {
				position: absolute;
				top: 152rpx;
				left: 202rpx;
				display: flex;
				align-items: center;
				
				.name {
					width: 200rpx;
					font-size: 40rpx;
					color: #fff;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: 10rpx;
				}

				.vip {
					font-size: 16rpx;
					color: #FFD844;
					background: #2C2C2C;
					padding: 1rpx 4rpx;
					border-radius: 6rpx;
					// margin-top: 20rpx;
					// height: 26rpx;
					// background: linear-gradient(90deg, #ffebc0, #ffc479);
					// border-radius: 11rpx;
					// font-size: 18rpx;
					// color: #6c2a09;
					// display: flex;
					// align-items: center;

					// .icon {
					// 	width: 38rpx;
					// 	height: 35rpx;
					// 	margin-right: 10rpx;
					// 	position: relative;
					// 	top: -4rpx;
					// }
				}
			}

			.more {
				width: 10rpx;
				height: 18rpx;
			}

			.mid-img {
				position: absolute;
				top: 122rpx;
				left: 32rpx;
				width: 140rpx;
				height: 140rpx;
				border-radius: 100%;
				border: 2px solid #fff;
				overflow: hidden;
				min-width: 140rpx;
				max-width: 140rpx;
			}
			
			.mid_shiming{
				position: absolute;
				top: 240rpx;
				left: 50rpx;
				width: 104rpx;
				height: 34rpx;
				line-height: 34rpx;
				font-size: 16rpx;
				color: #FFD844;
				text-align: center;
				background: #2C2C2C;
				border-radius: 20rpx;
			}
			
		}

		.head-nav {
			// position: absolute;
			// top: 112rpx;
			// right: 188rpx;
			display: flex;
			justify-content: space-between;
			font-size: 22rpx;
			color: #fff;
			text-align: center;
			margin-top: 30rpx;

			.li {
				position: relative;
			}

			.t {
				margin-top: 20rpx;
			}

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin: 0 auto;
			}

			.dian {
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				background: red;
				border-radius: 50%;
				top: -4rpx;
				right: 18rpx;
			}
		}
	}
	
	.mine-jingpai{
		width: 686rpx;
		height: 146rpx;
		display: flex;
		align-items: center;
		background: #FFF;
		box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
		border-radius: 20rpx;
		margin: 44rpx 0 0 32rpx;
		
		.mine-jingpai-li{
			width: 25%;
			text-align: center;
		}
		
		image{
			width: 56rpx;
			height: 56rpx;
		}
		
	}
	
	.mine-order {
		// position: relative;
		background: #ffffff;
		box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
		border-radius: 20rpx;
		margin: 0rpx 30rpx 30rpx 30rpx;

		.order-hd {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			// border-bottom: 1px solid #f5f5f5;
			margin-top: 44rpx;

			.t {
				font-size: 28rpx;
				font-weight: 600;
			}

			.more {
				font-size: 26rpx;
				color: #999;
				display: flex;
				align-items: center;

				.icon {
					width: 10rpx;
					height: 18rpx;
					margin-left: 15rpx;
				}
			}
		}

		.order-nav {
			text-align: center;
			padding: 0 30rpx 30rpx 30rpx;
			display: flex;
			justify-content: space-between;

			.icon {
				width: 42rpx;
				height: 42rpx;
				margin: 0 auto;
			}

			.t {
				margin-top: 15rpx;
				font-size: 24rpx;
			}
		}
	}

	.mine-asd {
		margin: 20rpx 30rpx;
	}

	.mine-list {
		margin: -20rpx 30rpx 0 30rpx;

		.li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx 0;
			border-bottom: 1px solid #f5f5f5;
			position: relative;

			.more {
				width: 14rpx;
				height: 25rpx;
			}

			.dian {
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				background: red;
				border-radius: 50%;
				top: 40rpx;
				right: 20rpx;
			}

			.li-fl {
				display: flex;
				align-items: center;
				font-size: 26rpx;

				.icon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>