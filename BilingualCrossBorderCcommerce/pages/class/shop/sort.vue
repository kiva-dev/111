<template>
	<view class="shop-page">
		<!--shop-head start-->
		<view class="shop-head">
			<view class="head-bg">
				<image class="img" src="../../../static/images/shop5.png"></image>
			</view>
			<!--head-box start-->
			<view class="head-box">
				<!--head-top start-->
				<view class="head-top">
					<view class="head-pre">
						<image class="img" src="../../../static/images/icon6.png"></image>
					</view>
					<view class="head-search">
						<view class="icon">
							<image class="img" src="../../../static/images/shop7.png"></image>
						</view>
						<text>搜索店内商品</text>
					</view>
					<view class="head-share">
						<image class="img" src="../../../static/images/shop6.png"></image>
					</view>
				</view>
				<!--head-top end-->
				<!--head-dl start-->
				<view class="head-dl">
					<view class="dt">
						<image class="img" src="../../../static/images/auc5.png"></image>
					</view>
					<view class="dd">
						<view class="t">LUCKY旗舰店</view>
						<view class="c">华为自营专卖店，质量保证，24小时售后服务</view>
					</view>
					<view class="focus-btn">关注</view>
				</view>
				<!--head-dl end-->
			</view>
			<!--head-box end-->
		</view>
		<!--shop-head end-->
		<!--shop-box start-->
		<view class="shop-box">
			<!--sort-side start-->
			<view class="sort-side">
				<view class="side-ul">
					<view class="li active">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装</view>
					<view class="li">女装111</view>
				</view>
			</view>
			<!--sort-side end-->
			<!--sort-box start-->
			<view class="sort-box">
				<view class="sort-t">女装</view>
				<view class="sort-ul">
					<view class="li">
						<view class="li-img">
							<image class="img" src="../../../static/images/public1.png"></image>
						</view>
						<view class="li-t">连衣裙</view>
					</view>
					<view class="li">
						<view class="li-img">
							<image class="img" src="../../../static/images/public1.png"></image>
						</view>
						<view class="li-t">连衣裙</view>
					</view>
					<view class="li">
						<view class="li-img">
							<image class="img" src="../../../static/images/public1.png"></image>
						</view>
						<view class="li-t">连衣裙</view>
					</view>
					<view class="li">
						<view class="li-img">
							<image class="img" src="../../../static/images/public1.png"></image>
						</view>
						<view class="li-t">连衣裙</view>
					</view>
					<view class="li">
						<view class="li-img">
							<image class="img" src="../../../static/images/public1.png"></image>
						</view>
						<view class="li-t">连衣裙</view>
					</view>
					<view class="li">
						<view class="li-img">
							<image class="img" src="../../../static/images/public1.png"></image>
						</view>
						<view class="li-t">连衣裙</view>
					</view>
				</view>
			</view>
			<!--sort-box end-->
		</view>
		<!--shop-box end-->
		<!--shop-menu start-->
		<view class="shop-menu">
			<view class="menu-con">
				<view class="menu-li" @click="navClick('shop')">
					<view class="icon default">
						<image class="img" src="../../../static/images/class21.png"></image>
					</view>
					<view class="icon selected">
						<image class="img" src="../../../static/images/class25.png"></image>
					</view>
					<view class="t">首页</view>
				</view>
				<view class="menu-li active" @click="navClick('sort')">
					<view class="icon default">
						<image class="img" src="../../../static/images/class22.png"></image>
					</view>
					<view class="icon selected">
						<image class="img" src="../../../static/images/class26.png"></image>
					</view>
					<view class="t">分类</view>
				</view>
				<view class="menu-li" @click="navClick('goods')">
					<view class="icon default">
						<image class="img" src="../../../static/images/class23.png"></image>
					</view>
					<view class="icon selected">
						<image class="img" src="../../../static/images/class27.png"></image>
					</view>
					<view class="t">商品</view>
				</view>
				<view class="menu-li" @click="navClick('')">
					<view class="icon default">
						<image class="img" src="../../../static/images/class24.png"></image>
					</view>
					<view class="icon selected">
						<image class="img" src="../../../static/images/class28.png"></image>
					</view>
					<view class="t">客服</view>
				</view>
			</view>
		</view>
		<!--shop-menu end-->
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
	.shop-page{
		//shop-head S
		.shop-head{
			position:relative;
			.head-bg{height:396rpx;position:absolute;left:0;
			top:0;width:100%;}
			.head-box{
				position: relative;
				z-index:99;
				padding:100rpx 30rpx 60rpx 30rpx;
				//head-top S
				.head-top{
					display:flex;
					align-items:center;
					.head-search{
						flex:1;
						height: 60rpx;
						border-radius:30rpx;
						padding:0 20rpx;
						display:flex;
						align-items:center;
						font-size:26rpx;
						color:#fff;
						background:rgba(255,255,255,0.2);
						.icon{
							width:29rpx;
							height:29rpx;
							min-width:29rpx;
							max-width:29rpx;
							margin-right:20rpx;
						}
					}
					.head-share{width:36rpx;height:34rpx;min-width:36rpx;max-width:36rpx;margin-left:20rpx;}
					.head-pre{width:14rpx;height:28rpx;min-width:14rpx;max-width:14rpx;margin-right:35rpx;}
				}
				//head-top E
				//head-dl S
				.head-dl{
					display:flex;
					margin:35rpx 0;
					color:#fff;
					align-items:center;
					.dt{
						width:92rpx;
						height:92rpx;
						border-radius:10rpx;
						overflow: hidden;
						min-width:92rpx;
						max-width:92rpx;
						margin-right:30rpx;
					}
					.dd{
						flex:1;
						.t{font-size:30rpx;}
						.c{
							word-break: break-all;
							
							    text-overflow: ellipsis;
							
							    display: -webkit-box;
							
							    -webkit-box-orient: vertical;
					
							    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
							    overflow: hidden;
								height:56rpx;
							font-size:26rpx;line-height:28rpx;margin-top:15rpx;
						}
					}
					.focus-btn{
						width: 116rpx;
						height: 46rpx;
						border: 1px solid #FFFFFF;
						border-radius: 23rpx;
						padding:0;
						margin:0;
						line-height:46rpx;
						text-align:center;
						font-size:26rpx;
						color:#fff;
						min-width:116rpx;
						max-width:116rpx;
						margin-left:20rpx;
					}
				}
				//head-dl E
			}
		}
		//shop-head E
		//shop-box S
		.shop-box{
			background:#fff;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top:-30rpx;
			position:relative;
			padding:30rpx;
			z-index:22;
			.shop-nav{
				border-bottom:1px solid #f5f5f5;
				line-height:1;
				margin:-30rpx -30rpx 30rpx -30rpx;
				padding:35rpx 30rpx;
				display:flex;
				justify-content:space-between;
				.li{font-size:28rpx;}
				.active{color:#FC0609;}
			}
			//gain-choice S
			.gain-choice{
				display:flex;
				align-items:center;
				justify-content:space-between;
				font-size:26rpx;
				line-height:1;
				margin-right:20rpx;
				margin-bottom:30rpx;
				.li{
					display:flex;
					align-items:center;
					position:relative;
					.up-icon{
						width:8rpx;
						height:6rpx;
						position:absolute;
						right:-15rpx;
						top:5rpx;
					}
					.down-icon{
						width:8rpx;
						height:6rpx;
						position:absolute;
						right:-15rpx;
						bottom:5rpx;
						.selected{display:none;}
					}
				}
				.active{
					.up-icon{display:none;}
					.down-icon{
						bottom:8rpx;
						.default{display:none;}
						.selected{display:block;width:8rpx;height:6rpx;}
					}
				}
			}
					
			//gain-choice E
			//att-goods S
			.att-goods{
				display:flex;
				flex-wrap:wrap;
				margin:0 -10rpx;
				.goods{
					width:50%;
					.goods-con{
						margin:10rpx;
						.goods-img{width:335rpx;height:335rpx;border-radius:10rpx;overflow:hidden;position: relative;}
						.goods-tip{
							height: 40rpx;
							background:#FC0609;
							background: linear-gradient(-45deg, #FC0609 0%, #FF4E50 100%);
							border-radius: 20rpx 0px 20rpx 0px;
							padding:0 15rpx;
							color:#fff;
							line-height:40rpx;
							font-size:22rpx;
							position:absolute;
							left:0;
							top:0;
						}
						.goods-t{
							font-size:26rpx;line-height:1.2;
							margin:30rpx 0;
							text-overflow: -o-ellipsis-lastline;
								overflow: hidden;				//溢出内容隐藏
								text-overflow: ellipsis;		//文本溢出部分用省略号表示
								display: -webkit-box;			//特别显示模式
								-webkit-line-clamp: 2;			//行数
								line-clamp: 2;					
								-webkit-box-orient: vertical;
							}
						.goods-m{
							display:flex;
							align-items:center;
							justify-content:space-between;
							.price{color:#FC0609;font-size:22rpx;font-weight:550;}
							.sale{font-size:20rpx;color:#999;}
						}
						.goods-b{
							display:flex;
							align-items:center;
							margin-top:20rpx;
							.icon{width:26rpx;height:26rpx;min-width:26rpx;max-width:26rpx;margin-right:10rpx;}
							.name{font-size:24rpx;}
							.more{width:10rpx;height:18rpx;margin-left:10rpx;min-width:10rpx;}
						}
					}
				}
			}
			//att-goods E
			//sort-side S
			.sort-side{
				position:fixed;
				left:0;
				top:380rpx;
				height:calc(100% - 380rpx);
				z-index:99;
				background:#F9F9F9;
				width:200rpx;
				.side-ul{
					position:relative;
					height:calc(100% - 150rpx);
					overflow-y:auto;
				}
				.li{
					height:90rpx;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					font-size:26rpx;
					text-align:center;
					line-height:90rpx;
					padding:0 20rpx;
					position: relative;
				}
				.active{
					font-size:28rpx;
					color:#FC0609;
					font-weight:550;
				}
				.active:before{
					width: 12rpx;
					height: 40rpx;
					background: #FC0609;
					position:absolute;
					left:0;
					top:50%;
					margin-top:-20rpx;
					display:block;
					content:"";
				}
			}
			//sort-side E
			//sort-box S
			.sort-box{
				margin-left:200rpx;
				.sort-t{font-size:28rpx;font-weight:550;}
				.sort-ul{
					display:flex;
					flex-wrap:wrap;
					margin-top:20rpx;
					.li{
						width:33.3333%;
						text-align:center;
						margin:15rpx 0;
						.li-img{
							width:130rpx;
							height:130rpx;
							margin:0 auto;
						}
						.li-t{font-size:24rpx;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;margin:10rpx 30rpx;}
					}
				}
			}
			//sort-box E
		}
		//shop-box E
	}
</style>
