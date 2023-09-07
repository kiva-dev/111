<template>
	<view class="recharge_rebate">
		<view class="header">
			<view class="head">
				<image src="/static/images/auth/left.png"></image>
				<view>Friend Recharge Rebate</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.recharge_rebate{
		width: 750rpx;
		min-height: 100vh;
		
		.header{
			width: 750rpx;
			height: 800rpx;
			background: url('/static/images/recharge_rebate/recharge_rebate_top.png') no-repeat;
			background-size: 750rpx 800rpx;
			
			.head{
				position: relative;
				width: 750rpx;
				height: 88rpx;
				padding-top: 60rpx;
				display: flex;
				align-items: center;
				
				image{
					position: absolute;
					left: 32rpx;
					width: 40rpx;
					height: 40rpx;
					z-index: 5;
				}
				
				view{
					width: 100%;
					font-size: 40rpx;
					font-weight: 700;
					color: rgb(255, 255, 255);
					text-align: center;
				}
				
			}
		}
		
	}
</style>