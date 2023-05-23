<template>
	<view class="phone-page">
		<view class="phone-box">
			<view class="li">
				<view class="li-left">
					<uni-data-select v-model="value" :localdata="range" @change="change" :clear="false"></uni-data-select>
				     <view class="down-icon">
						 <image class="img" src="../../static/images/mine/down1.png"></image>
					 </view>
				</view>
				<view class="li-right">
					<input class="input" placeholder-class="color-999" placeholder="请输入新手机号" />
				</view>
			</view>
			<view class="li">
				<view class="li-left">
					验证码
				</view>
				<view class="li-right">
					<input class="input" placeholder-class="color-999" placeholder="请输入验证码" />
				</view>
				<button class="ver-btn">获取验证码</button>
			</view>
		</view>
	    <view class="phone-bot">
			<button class="public-btn">确认绑定</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				value: 0,
				range: [{
						"value": 0,
						"text": "+86",
					},
					{
						"value": 1,
						"text": "+0378"
					},
					{
						"value": 2,
						"text": "+0379"
					}
				]
			}
		},
		methods: {
			change(e) {
				console.log('e:', e);
			}
		}
	}
</script>

<style lang="less" scoped>
	page{background:#F9F9F9;}
	.phone-page{
		.phone-box{
			background:#fff;
			padding:0 30rpx;
			.li{
				padding:30rpx 0;
				border-bottom:1px solid #F5F5F5;
				display:flex;
				align-items:center;
				position: relative;
				.ver-btn{position:absolute;right:30rpx;top:50%;margin-top:-20rpx;line-height:40rpx;font-size:24rpx;color:#FC0609;padding:0;}
				.li-right{flex:1;}
				.input{height:50rpx;width:100%;font-size:26rpx;}
				.down-icon{width:10rpx;height:7rpx;position:absolute;right:0;top:50%;margin-top:-3.5rpx;}
				.li-left{position:relative;width:135rpx;display:flex;justify-content:flex-end;margin-right:24rpx;}
			}
		}
		.phone-bot{
			margin:50rpx 30rpx;
			
		}
	}
	/deep/ .uni-select{border:none;font-size:28rpx;padding-right:30rpx;text-align: right;}
</style>