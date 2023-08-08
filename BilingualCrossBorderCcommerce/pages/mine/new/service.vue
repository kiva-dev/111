<template>
	<view class="service-page">
		<view class="comment-head">
			<image src="/static/images/new/left.png" @click="onReturn()"></image>
			<view>{{$t('new.fuwu')}}</view>
		</view>
		<view class="service-list">
			<view class="service-item" @click="onToInfo('/pages/mine/Feedback')">
				<image src="/static/images/new/edit.png"></image>
				<view>{{$t('top.yjfk')}}</view>
			</view>
			<view class="service-item" @click="onToInfo('/pages/mine/about')">
				<image src="/static/images/new/info.png"></image>
				<view>{{$t('top.about')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			onReturn() {
				uni.navigateBack()
			},
			onToInfo(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.service-page{
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);
	}
	
	.comment-head {
		position: relative;
		// top: 0;
		width: 100%;
		height: 88rpx;
		padding-top: 88rpx;
		display: flex;
		align-items: center;
		background: #FFF;
		box-shadow: 0px 4rpx 14rpx rgba(190, 190, 190, 0.3);
		z-index: 100;
	
		image {
			position: absolute;
			left: 20rpx;
			width: 60rpx;
			height: 60rpx;
		}
	
		view {
			width: 100%;
			font-size: 40rpx;
			font-weight: 700;
			color: rgb(255, 78, 47);
			text-align: center;
		}
	}

	.service-list{
		width: 100%;
		min-height: calc(100vh - 216rpx);
		background: #FFF;
		margin-top: 40rpx;
		
		.service-item{
			width: 686rpx;
			height: 120rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid rgb(190, 190, 190);
			margin: 0 auto;
			
			image{
				width: 40rpx;
				height: 40rpx;
			}
			
			view{
				font-size: 32rpx;
				color: rgb(44, 44, 44);
				margin-left: 30rpx;
			}
			
		}
	}
	
</style>