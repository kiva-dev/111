<template>
	<view class="bind-page">
		<!--bind-box start-->
		<view class="bind-box">
			<view class="li">
				<view class="label">姓名</view>
				<input class="input" placeholder-class="color-999" placeholder="请输入姓名" />
			</view>
			<view class="li">
				<view class="label">paypal账号</view>
				<input class="input" placeholder-class="color-999" placeholder="请输入paypal账号" />
			</view>
			<!--bind-bot start-->
			<view class="bind-bot">
				<button class="public-btn" @click="navClick('payment')">立即绑定</button>
			</view>
			<!--bind-bot end-->
		</view>
		<!--bind-box end-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

			
			//导航点击的跳转处理函数
			navClick (url) {
				uni.navigateTo ({
					url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.bind-page{
		.bind-box{
			padding:0 30rpx;
			.li{
				display:flex;
				align-items:center;
				border-bottom:1px solid #f5f5f5;
				padding:30rpx 0;
				justify-content:space-between;
				font-size:28rpx;
				.input{flex:1;margin-left:20rpx;text-align:right;font-size:28rpx;}
				.li-r{
					display:flex;
					align-items:center;
					.more{width:10rpx;height:19rpx;margin-left:15rpx;}
				}
			}
			.bind-bot{
				margin:80rpx 0;
			}
		}
	}
</style>