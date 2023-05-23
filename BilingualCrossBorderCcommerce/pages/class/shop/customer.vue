<template>
	<view class="talk-page">
		<view class="talk-box">
			<view class="date">2021-02-28 15:32</view>
			<!--talk-li start-->
			<view class="talk-li">
				<view class="li-img">
					<image class="img" src="../../../static/images/public1.png"></image>
				</view>
				<view class="li-txt">
					<view class="con">收到！</view>
				</view>
			</view>
			<!--talk-li end-->
			<!--talk-li start-->
			<view class="talk-li end">
				<view class="li-txt">
					<view class="con">
						收到！收到！收到！收到！收到！收到！收到！收到！收到！收到！收到！收到！收到！收到！收到！收到！
					</view>
				</view>
				<view class="li-img">
					<image class="img" src="../../../static/images/index/banner.png"></image>
				</view>
			</view>
			<!--talk-li end-->
		</view>
		<!--talk-fixed start-->
		<view class="talk-fixed">
			<view class="fixed-flex">
				<view class="fixed-input">
					<input class="input" type="text" placeholder="请输入..." placeholder-class="color-9" />
				</view>
				<button class="fixed-btn">发送</button>
			</view>
		</view>
		<!--talk-fixed end-->
	</view>
</template>

<script>
</script>

<style lang="less" scoped>

	.talk-page{
		padding-bottom:100rpx;
		.talk-box{
			margin:30rpx;
			.date{color:#aaa;font-size:26rpx;text-align:center;}
			.talk-li{
				display:flex;
				margin:30rpx 0;
				.li-img{width:80rpx;height:80rpx;border-radius:100%;overflow: hidden;}
				.li-txt{
					max-width:calc(100% - 120rpx);
					background:#EEEEEE;border-radius:20rpx;margin:0 20rpx;font-size:28rpx;
					.con{padding:20rpx;}
					}
			}
			.talk-li.end{
				justify-content:flex-end;
				.li-txt{background:#377AFD;color:#fff;}
			}
		}
		.talk-fixed{
			position:fixed;
			left:0;bottom:0;
			width:100%;
			background:#fff;
			padding:20rpx 0;
			box-shadow: 0px 0px 20rpx 0px rgba(153,153,153,0.1000);
			.fixed-flex{
				display:flex;
				justify-content:space-between;
				padding:0 30rpx;
				.fixed-input{
					background:#FAFAFA;
					height:68rpx;
					border-radius:34rpx;
					padding:0 20rpx;
					width:calc(100% - 180rpx);
					.input{font-size:28rpx;height:68rpx;width:100%;}
				}
				.fixed-btn{
					width: 128rpx;
					height: 68rpx;
					background:#FC0609;
					border-radius: 34rpx;
					padding:0;
					text-align:center;
					line-height:68rpx;
					font-size:28rpx;
					font-weight:600;
					color:#fff;
					margin:0;
				}
			}
		}
	}
</style>