<template>
	<view class="detail-page">
		<!--detail-head start-->
		<view class="detail-head">
			<view class="t">商家处理中</view>
			<view class="c"><text class="color-red">35小时59分</text>后商家未处理将自动处理</view>
		</view>
		<!--detail-head end-->
		<!--detail-sec1 start-->
		<view class="detail-sec1">
			<view class="li-hd">
				<view class="hd-fl">
					<view class="icon">
						<image class="img" src="../../../static/images/index/dianpu.png"></image>
					</view>
					<view class="name">卡西欧官方旗舰店</view>
				    <view class="more">
						<image class="img" src="../../../static/images/more.png"></image>
					</view>
				</view>
				<view class="contact">
					<view class="icon">
						<image class="img" src="../../../static/images/icon4.png"></image>
					</view>
					<text>联系商家</text>
				</view>
			</view>
			<view class="li-text">
				我们已收到您的申请，将会在第一时间为您处理，请耐
				心等待
			</view>
		</view>
		<!--detail-sec1 end-->
		<view class="detail-line"></view>
		<!--detail-sec2 start-->
		<view class="detail-sec2">
			<!--order-mid start-->
			<view class="order-mid">
				<view class="mid-img">
					<image class="img" src="../../../static/images/auc7.png"></image>
				</view>
				<view class="mid-txt">
					<view class="h-flex">
						<view class="t">卡西欧手表男官方旗舰PRX8000光能电波海神户外登山男士运动表</view>
						
					</view>
					<view class="b-flex">
						<view class="s">蓝色，75-88mm</view>
						<view class="num">*1</view>
					</view>
					<view class="flex flex-between">
						<view class="price color-red f-22">
							RM<text class="f-34">868</text>.00 
						</view>
					</view>
				</view>
			</view>
			<!--order-mid end-->
			<view class="detail-li">
				<view class="label">订单编号:</view>
				<view class="c">14654654646555464</view>
			</view>
			<view class="detail-li">
				<view class="label">申请金额：</view>
				<view class="c">RM100.00</view>
			</view>
			<view class="detail-li">
				<view class="label">退款原因：</view>
				<view class="c">与图片不符</view>
			</view>
			<view class="detail-li">
				<view class="label">申请状态：</view>
				<view class="c">退货退款</view>
			</view>
			<view class="detail-li">
				<view class="label">申请时间：</view>
				<view class="c">2020-03-12  22:25:22</view>
			</view>
		</view>
		<!--detail-sec2 end-->
		<!--order-fixed start-->
		<view class="order-fixed">
			<view class="fixed-con">
				<view class="fixed-fr">
					<button class="order-gray">再次申请</button>
					<button class="order-btn" @click="toggle1('center')">平台介入</button>
				</view>
			</view>
		</view>
		<!--order-fixed end-->
		<!--确认收货弹出 start-->
		<uni-popup ref="popup1">
			<view class="public-pop">
				<view class="pop-con">
					<view class="phone-close" @click="toggle1Close">
						<image class="img" src="../../../static/images/close1.png"></image>
					</view>
					<view class="pop-t">填写联系方式</view>
					 <view class="pop-phone">
						 <view class="li">
						 	<view class="li-left">
						 		<uni-data-select v-model="value" :localdata="range" @change="change" :clear="false"></uni-data-select>
						 	     <view class="down-icon">
						 			 <image class="img" src="../../../static/images/mine/down1.png"></image>
						 		 </view>
						 	</view>
						 	<view class="li-right">
						 		<input class="input" placeholder-class="color-999" placeholder="请输入新手机号" />
						 	</view>
						 </view>
						 <button class="phone-btn">确认</button>
					 </view>
					 
				</view>
			</view>
		</uni-popup>
		<!--确认收货弹出 start-->
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
			},
			toggle1(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup1.open(type)
			},
			toggle1Close(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup1.close(type)
			},
			toggle2(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup2.open(type)
			},
			toggle2Close(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup2.close(type)
			},
			toggle3(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup3.open(type)
			},
			toggle3Close(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup3.close(type)
			},
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
	.detail-page{
		padding-bottom:100rpx;
		.detail-head{
			padding:40rpx 30rpx;
			font-size:26rpx;
			.t{font-size:32rpx;font-weight:550;}
			.c{font-size:26rpx;margin-top:15rpx;}
			border-bottom:1px solid #f5f5f5;
		}
		//detail-sec1 S
		.detail-sec1{
			padding:30rpx;
			//li-hd E
			.li-hd{
				display:flex;
				align-items:center;
				justify-content:space-between;
				.hd-fl{
					display:inline-flex;
					align-items:center;
					font-size:28rpx;
					flex:1;
					width:calc(100% - 180rpx);
					margin-right:20rpx;
					line-height:1;
					.icon{
						width:26rpx;height:26rpx;
						min-width:26rpx;
						max-width:26rpx;
						margin-right:15rpx;
					}
					.more{width:10rpx;height:18rpx;min-width:10rpx;margin-left:15rpx;}
					.name{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
				}
				.contact{
					display:flex;
					align-items:center;
					line-height:1;
					font-size:26rpx;
					white-space: nowrap;
					.icon{width:26rpx;height:25rpx;min-width:26rpx;max-width:26rpx;margin-right:15rpx;}
				}
			}
			//li-hd E
			.li-text{
				background: #F9F9F9;
				border-radius: 20rpx;
				margin-top:30rpx;
				padding:20rpx;
				font-size:26rpx;
				line-height:35rpx;
			}
		}
		//detail-sec1 E
		.detail-line{
			height: 15rpx;
			background: #F9F9F9;
		}
		//detail-sec2 S
		.detail-sec2{
			padding:30rpx;
			//order-mid S
			.order-mid{
				display:flex;
				padding:10rpx 0;
				.mid-img{
					width:130rpx;
					height:130rpx;
					border-radius:10rpx;
					overflow:hidden;
					margin-right:20rpx;
					min-width:130rpx;
					max-width:130rpx;
				}
				.mid-txt{
					width:calc(100% - 150rpx);
					.h-flex{
						display:flex;
						align-items:center;
						justify-content:space-between;
						line-height:36rpx;
						.t{font-size:26rpx;line-height:36rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
						.num{font-size:24rpx;color:#999;white-space: nowrap;margin-left:20rpx;}
					}
					.price{font-size:22rpx;color:#FC0609;font-weight:550;}
					.b-flex{
						margin:10rpx 0;
						display:flex;
						align-items:center;
						justify-content:space-between;
						.s{font-size:24rpx;color:#999;}
						
					}
				}
			}
			//order-mid E
			.detail-li{
				padding:20rpx 0;
				font-size:26rpx;
				line-height:34rpx;
				display:flex;
				align-items:center;
				.label{margin-right:10rpx;white-space: nowrap;}
			}
		}
		//detail-sec2 E
		//order-fixed S
		.order-fixed{
			position:fixed;
			left:0;
			bottom:0;
			width:100%;
			z-index:999;
			background:#fff;
			box-shadow: 0px 0px 20rpx 0px rgba(153,153,153,0.1000);
			.fixed-con{
				padding:15rpx 30rpx;
				display:flex;
				align-items:center;
				justify-content:space-between;
				.fixed-fr{
					flex:1;
					display:flex;
					justify-content:flex-end;
				}
			}
			.order-btn{
				width: 180rpx;
				height: 70rpx;
				background: #FC0609;
				border-radius: 35rpx;
				font-size:26rpx;
				color:#fff;
				padding:0;
				margin:0 0 0 10rpx;
				line-height:70rpx;
			}
			.order-gray{
				width: 180rpx;
				height: 70rpx;
				background: #FFFFFF;
				border: 1px solid #DFDFDF;
				border-radius: 35rpx;
				line-height:70rpx;
				margin:0 0 0 10rpx;
				padding:0;
				font-size:16rpx;
				color:#999;
			}
		}
		//order-fixed E
	}
	.phone-close{
		width:18rpx;
		height:18rpx;
		position:absolute;
		right:30rpx;
		top:30rpx;
	}
	.pop-phone{
		margin:40rpx 0  0 0;
		
		.phone-btn{
			width: 260rpx;
			height: 80rpx;
			background: #FC0609;
			border-radius: 40rpx;
			margin:48rpx auto 0 auto;
			padding:0;
			line-height:80rpx;
			color:#fff;
			font-size:32rpx;
		}
		.li{
			padding:10rpx 0;
			border-bottom:1px solid #F5F5F5;
			display:flex;
			align-items:center;
			position: relative;
			background: #F5F5F5;
			border-radius: 10rpx;
			.ver-btn{position:absolute;right:30rpx;top:50%;margin-top:-20rpx;line-height:40rpx;font-size:24rpx;color:#FC0609;padding:0;}
			.li-right{flex:1;}
			.input{height:50rpx;width:100%;font-size:26rpx;}
			.down-icon{width:10rpx;height:7rpx;position:absolute;right:0;top:50%;margin-top:-3.5rpx;}
			.li-left{position:relative;width:135rpx;display:flex;justify-content:flex-end;margin-right:24rpx;}
		}
	}
	/deep/ .uni-select{border:none;font-size:28rpx;padding-right:30rpx;text-align: right;}
</style>