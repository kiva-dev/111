<template>
	<view class="view_page">
		<!-- <view class="service-head">
			<image src="/static/images/kbrick/kleft.png" @click="toBack()"></image>
			<view>{{$t('grop.customer')}}</view>
		</view>

		<view class="btm">
			<view class="btm-show">
				<view class="myinput">
					<view class="input">
						<u--input placeholder="Please enter your question" border="none" v-model="content"></u--input>
					</view>
				</view>
				<image src="/static/images/service/add.png" v-show="!showMore" @click="showMore=!showMore"></image>
				<image src="/static/images/service/close.png" v-show="showMore" @click="showMore=!showMore"></image>
			</view>
			<view class="btm-hide" v-show="showMore">
				<view class="btm-hide-info" @click="open()">
					<image src="/static/images/service/order.png"></image>
					<view>Send Order</view>
				</view>
			</view>
		</view> -->

		<uni-popup ref="popup" type="bottom" @open="open" zIndex='99999'>
			<view class="show-order">
				<view class="order-head">
					<view class="order-head-tit">Send Orders</view>
					<image src="/static/images/kbrick/close.png"  @click="close()"></image>
					<view class="order-switch">
						<view class="order-switch-info" @click="selectOrder=1">
							<view class="tit" :class="selectOrder==1?'select-tit':''">My Auction</view>
							<text :class="selectOrder==1?'select':''"></text>
						</view>
						<!-- <view class="order-switch-info" @click="selectOrder=2">
							<view class="tit" :class="selectOrder==2?'select-tit':''">My Oder</view>
							<text :class="selectOrder==2?'select':''"></text>
						</view> -->
					</view>
				</view>

				<block v-if="selectOrder==1">
					<view class="auction" id="listArea">
						<scroll-view scroll-y="true" class="scroll-Y"  @scrolltolower="lower" @scroll="scroll">
							<view class="item" v-for="(item,i) in newWish" :key="i">
								<image :src="item.image" class="item-img"></image>
								<view class="item-qi">{{item.stage_num}}</view>
								<view class="item-name">{{item.goods_name}}</view>
								<view class="item-status">
									<template v-if="item.select_way === 1">
										<text style="color: #1DD181;">{{$t('user.auctionM.inAppeal')}}</text>
									</template>
									<template v-else>
										<text v-if="item.status === 2 || item.status === 3"
											style="color: #1DD181;">{{$t('user.auctionM.shipped')}}</text>
										<text v-if="item.status === 4"
											style="color: #1DD181;">{{$t('user.auctionM.receive')}}</text>
										<text v-if="item.status === 5"
											style="color: #1DD181;">{{$t('user.auctionM.beConfirmed')}}</text>
										<text v-if="item.status === 6"
											style="color: #999999;">{{item.select_way == 1 ? $t('user.auctionM.cash') : $t('user.order.yiwanc')}}</text>
									</template>
								</view>
								<view class="item-auction-price">Bidding price:RM{{item.single_money}}</view>
								<view class="item-code">Lucky Code</view>
								<view class="item-code-info">{{item.num_id}}</view>
								<image src="/static/images/mine/mine_btn_copy.png" class="item-copy"></image>
								<view class="item-zc">Disbursements:</view>
								<view class="item-price">RM<text>{{item.pay_price}}</text></view>
								<view class="item-send" @click="propsSendMessage(item)">Sending</view>
							</view>
						</scroll-view>
					</view>
				</block>
				<block v-else>
					<view class="order">
						<view class="order-item" v-for="(item,i) in newOrders" :key="i">
							<view class="order-item-head">
								<image :src="item.shop_logo"></image>
								<view class="shop-name">{{item.shop_name}}</view>
								<view class="shop-status">{{item.status}}</view>
							</view>
							<view v-for="(list,nub) in item.goods" :key="nub">
								<image src="/static/images/detail5.png" class="order-item-img"></image>
								<view class="order-item-name">Here is the product name, Here is the product name,Here is the product name</view>
								<view class="order-item-num">1 in total</view>
								<view class="order-item-price">RM <text>999.00</text></view>
								<view class="order-item-send">Sending</view>
							</view>
							
						</view>
					</view>
				</block>

			</view>
		</uni-popup>
		<!-- <view style="height: 168rpx;"></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				showMore: false,
				selectOrder: 1,
				newOrders:[],
				newWish:[],
				list: []
			}
		},
		mounted() {
			// this.$refs.popup.open()
		},
		methods: {
			open(){
				this.sendOrder()
			},
			close(){
				this.$refs.popup.close()
			},
			sendOrder(){
				var that = this
				that.$refs.popup.open();
				that.ws.pageFun(function() {
					that.ws.send({
						c: 'H5User',
						a: 'searchAuctionOrders',
						data: {
							"page": 1
						}
					});
				}, that);
				setTimeout(()=>{
					this.newWish = this.ws.newWish
				},200)
			},
			propsSendMessage(props){
				this.$emit("propsSendMessage",props);
			},
			toBack() {
				uni.navigateBack()
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 监听滚动事件 scroEl是table外的div的dom
			listenerFunction(e) {
				var scroEl = document.getElementById('scro')
				scroEl.addEventListener('scroll', this.handleScroll, true)
			},
			handleScroll() {
				// scroel
				var scroEl = document.getElementById('scro')
				// 获取内容高度
				const scrollHeight = scroEl.scrollHeight
				// 获取滚动条纵坐标位置
				const scrollTop = scroEl.scrollTop
				// 我给的div高度是300px
				// 判断是否到底部是的话把数据push进去
				if (scrollHeight === scrollTop + 300) {
					console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
				}
			},
			onPageScroll: function(e) {
                const { scrollTop } = e; //滚动条距离页面顶部的像素
				console.log(scrollTop);
                //防止重复触发
                if(this.isLoading){
                    return;
                }

                const query = uni.createSelectorQuery().in(this);
                query.select('#listArea').boundingClientRect(data => {
                    let {
                        height//listArea节点的高度
                    } = data; 
                    //如果设置的事件触发距离 大于等于 (节点的高度-屏幕高度-滚动条到顶部的距离)
                    if(this.bottomDistinct>=height-this.screenHeight-scrollTop){
                        //阻止时间重复触发
                        this.isLoading=true;
                        //模拟异步加载数据
                        uni.showToast({
                            title:"获取新数据"
                        })
                        setTimeout(()=>{
                            //测试数据
                            let arr=new Array(5).fill(0);
                            arr=arr.map((v,i)=>this.info.length+i+1);

                            //数据填充
                            this.info=this.info.concat(arr);
                            this.isLoading=false;
                        }, 1500);
                    }
                }).exec();
            },
			// 页面滑动到底部
			onReachBottom() {
				console.log('底部=====');
				// 判断是否还有数据
				// if (this.navId == 1) {
				// 	if (this.totalPageNum <= this.page * this.pagenum) return
				// 	this.page++
				// 	// 我的竞拍
				// 	if (this.type == 1 || this.type == 2) {
				// 		this.onMineAttendAuction()
				// 	}
				// 	// 中拍记录
				// 	if (this.type == 3) {
				// 		this.onMineWinAuction()
				// 	}
				// 	// 竞拍记录
				// 	if (this.type == 4) {
				// 		this.onMineRecordList()
				// 	}
				// 	// 竞拍记录
				// 	if (this.type == 5) {
				// 		this.AuctionorderMineOrder()
				// 	}
				// } else if (this.navId == 2) {
				// 	// 关注
				// 	if (this.totalPageNum <= this.page * this.pagenum) return
				// 	this.page++
				// 	// 我的竞拍
				// 	if (this.type == 1 || this.type == 2) {
				// 		this.onMineFocusAuction()
				// 	}
				// 	// 中拍记录
				// 	if (this.type == 3) {
				// 		this.onMineFocusWinAuction()
				// 	}
				// }
			}
		}
	}
</script>

<style lang="less" scoped>
	.view_page {
		width: 100%;
		background: rgb(248, 248, 248);
		z-index: 99999;
		.uni-popup{
			z-index: 99999;
		}
		.service-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #fff;

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

		}

		.des {
			width: 100%;
			margin-top: 32rpx;

			.info {
				width: 100%;

				.info-time {
					width: 176rpx;
					height: 52rpx;
					line-height: 52rpx;
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					text-align: center;
					background: rgba(0, 0, 0, 0.1);
					border-radius: 52rpx;
					margin: 0 auto 44rpx auto;
				}

				.dialogue {
					width: 100%;

					.left {
						width: 100%;
						display: flex;
						margin-bottom: 64rpx;

						image {
							display: block;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin: 0 16rpx 0 32rpx;
						}

						view {
							width: 538rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							color: rgb(51, 51, 51);
							padding: 24rpx 24rpx 24rpx 32rpx;
							background: url('/static/images/service/white.png') no-repeat;
							background-size: 586rpx 100%;
						}

					}

					.right {
						position: relative;
						width: 100%;
						display: flex;
						justify-content: flex-end;
						margin-bottom: 64rpx;

						image {
							display: block;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin: 0 32rpx 0 16rpx;
						}

						view {
							width: 538rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							color: #fff;
							padding: 24rpx 24rpx 24rpx 32rpx;
							background: url('/static/images/service/green.png') no-repeat;
							background-size: 586rpx 100%;
						}

					}

				}

			}

		}

		.btm {
			position: fixed;
			bottom: 0;
			width: 100%;
			// height: 100rpx;
			padding-bottom: 68rpx;
			background: #fff;
			z-index: 100;

			.btm-show {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;

				.myinput {
					width: 586rpx;
					height: 68rpx;
					display: flex;
					align-items: center;
					background: rgb(239, 239, 239);
					border-radius: 68rpx;
					margin: 0 32rpx;

					.input {
						width: 90%;
						margin: 0 auto;
					}
				}

				image {
					display: block;
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
				}

			}

			.btm-hide {
				width: 100%;
				height: 232rpx;
				display: flex;
				align-items: center;

				.btm-hide-info {
					width: 150rpx;
					text-align: center;
					margin-left: 38rpx;

					image {
						width: 112rpx;
						height: 112rpx;
					}

					view {
						font-size: 24rpx;
						color: rgb(102, 102, 102);
						margin-top: 16rpx;
					}

				}

			}

		}

		.show-order {
			width: 100%;
			height: 1000rpx;
			background: rgb(248, 248, 248);
			border-radius: 24rpx 24rpx 0 0;

			.order-head {
				position: relative;
				width: 100%;
				padding-top: 32rpx;
				padding-bottom: 16rpx;
				background: #fff;
				border-radius: 24rpx 24rpx 0 0;
				.order-head-tit {
					width: 100%;
					font-size: 40rpx;
					color: rgb(51, 51, 51);
					text-align: center;
				}

				image {
					position: absolute;
					top: 40rpx;
					right: 32rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.order-switch {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 40rpx;

					.order-switch-info {
						margin: 0 116rpx;

						text {
							display: block;
							width: 72rpx;
							height: 8rpx;
							background: rgba(10, 198, 142, 0);
							border-radius: 8rpx;
							margin: 0 auto;
						}

						.tit {
							font-size: 28rpx;
							color: rgb(51, 51, 51);
						}

						.select {
							background: rgba(10, 198, 142, 0.4);
						}

						.select-tit {
							font-weight: bold;
						}

					}

				}

			}

			.auction {
				margin-top: 24rpx;
				height:780rpx;
				overflow: auto;
				.item {
					position: relative;
					width: 686rpx;
					height: 238rpx;
					background: #fff;
					border-radius: 20rpx;
					margin: 0 auto 20rpx auto;

					.item-img {
						position: absolute;
						top: 16rpx;
						left: 16rpx;
						width: 206rpx;
						height: 206rpx;
						border-radius: 16rpx;
					}

					.item-qi {
						position: absolute;
						left: 16rpx;
						bottom: 16rpx;
						width: 206rpx;
						height: 48rpx;
						line-height: 48rpx;
						font-size: 18rpx;
						color: #fff;
						text-align: center;
						background: rgba(0, 0, 0, 0.4);
						border-radius: 0 0 16rpx 16rpx;
					}

					.item-name {
						position: absolute;
						top: 20rpx;
						left: 238rpx;
						width: 228rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.item-status {
						position: absolute;
						top: 20rpx;
						right: 24rpx;
						font-size: 20rpx;
						color: rgb(10, 198, 142);
					}

					.item-auction-price {
						position: absolute;
						top: 60rpx;
						left: 238rpx;
						font-size: 16rpx;
						color: rgb(153, 153, 153);
					}

					.item-code {
						position: absolute;
						top: 80rpx;
						right: 24rpx;
						font-size: 20rpx;
						color: rgb(153, 153, 153);
					}

					.item-code-info {
						position: absolute;
						top: 116rpx;
						right: 64rpx;
						font-size: 20rpx;
						color: rgb(102, 102, 102);
					}

					.item-copy {
						position: absolute;
						top: 116rpx;
						right: 24rpx;
						width: 24rpx;
						height: 24rpx;
					}

					.item-zc {
						position: absolute;
						top: 156rpx;
						left: 238rpx;
						font-size: 16rpx;
						color: rgb(153, 153, 153);
					}

					.item-price {
						position: absolute;
						top: 180rpx;
						left: 238rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: rgb(255, 57, 57);

						text {
							font-size: 32rpx;
						}
					}

					.item-send {
						position: absolute;
						top: 170rpx;
						right: 24rpx;
						width: 130rpx;
						height: 48rpx;
						line-height: 48rpx;
						font-size: 24rpx;
						color: rgb(255, 255, 255);
						text-align: center;
						background: rgb(10, 198, 142);
						border-radius: 48rpx;
					}

				}
			}
			
			.order{
				margin-top: 24rpx;
				height:780rpx;
				overflow: auto;
				.order-item{
					position: relative;
					width: 686rpx;
					height: 328rpx;
					padding-top: 24rpx;
					background: #fff;
					border-radius: 20rpx;
					margin: 0 auto 20rpx auto;
					
					.order-item-head{
						position: relative;
						width: 100%;
						display: flex;
						align-items: center;
						
						image{
							display: block;
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							margin: 0 16rpx 0 24rpx;
						}
						
						.shop-name{
							font-size: 28rpx;
							color: rgb(51, 51, 51);
						}
						
						.shop-status{
							position: absolute;
							right: 24rpx;
							font-size: 24rpx;
							color: rgb(255, 57, 57);
						}
					}
					
					.order-item-img{
						position: absolute;
						top: 88rpx;
						left: 24rpx;
						width: 160rpx;
						height: 160rpx;
						border-radius: 16rpx;
					}
					
					.order-item-name{
						position: absolute;
						top: 88rpx;
						left: 208rpx;
						width: 454rpx;
						line-height: 36rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					
					.order-item-num{
						position: absolute;
						top: 216rpx;
						left: 208rpx;
						font-size: 20rpx;
						color: rgb(153, 153, 153);
					}
					
					.order-item-price{
						position: absolute;
						top: 210rpx;
						right: 24rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: rgb(255, 57, 57);
						
						text{
							font-size: 32rpx;
						}
					}
					
					.order-item-send{
						position: absolute;
						top: 280rpx;
						right: 24rpx;
						width: 130rpx;
						height: 48rpx;
						line-height: 48rpx;
						font-size: 24rpx;
						color: rgb(255, 255, 255);
						text-align: center;
						background: rgb(10, 198, 142);
						border-radius: 48rpx;
					}
					
				}
				
			}
			
		}

	}
</style>