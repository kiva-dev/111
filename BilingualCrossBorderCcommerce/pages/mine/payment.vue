<template>
	<view class="pay-page">
		<view class="pay-box">
			<view class="pay-tit">默认支付方式</view>
			<view class="pay-li">
				<view class="label">余额支付（<text class="color-red">可用余额RM520.00</text>）</view>
			    <view class="li-fr">
					<view class="sitch">
						<switch color="#FC0609" checked="" style="transform:scale(0.7)"/>
					</view>
				</view>
			</view>
			<view class="pay-li">
				<view class="label">银行卡支付</view>
				 <view class="li-fr">
					 <text class="tip color-red">绑定银行卡</text>
					 <view class="sitch">
					 	<switch color="#FC0609" style="transform:scale(0.7)"/>
					 </view>
				 </view>
			</view>
			<view class="pay-li">
				<view class="label">paypal支付</view>
				 <view class="li-fr">
					 <text class="tip color-red">绑定paypal</text>
					 <view class="sitch">
					 	<switch color="#FC0609" style="transform:scale(0.7)"/>
					 </view>
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.pay-page{
		.pay-box{
			margin:30rpx;
			.pay-tit{font-size:28rpx;font-weight:550;}
			.pay-li{
				font-size:28rpx;
				display:flex;
				justify-content:space-between;
				align-items:center;
				padding:40rpx 0;
				border-bottom:1px solid #f5f5f5;
				.li-fr{display:flex;align-items:center;}
				.tip{}
			}
		}
	}
</style>