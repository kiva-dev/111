<template>
	<view class="surprise">
		<template v-if="isEnglish">
			<view class="head-info">
				<view class="top">
					<image src="/static/images/kbrick/kleft.png" class="left" @click="toBack()"></image>
					<image src="/static/spread/path.webp" class="index" @click="toIndex()"></image>
				</view>
			</view>

			<view class="info" @click="onfenxingShow=true">
				<view class="short short-en">
					<view class="info-avatar">
						<image :src="shopData.avatar || require('@/static/images/mine/mine_defalt_avatar.webp')" ></image>
						<span>{{shopData.nickname}}</span>
					</view>
					<view class="info-content">
						Fuyoh! I just won an <span>{{shopData.goods_name}}</span> with only RM <span>{{shopData.auction_price}}</span>. It’s so exciting! I recommend you to try your luck.What surprises you the most is that it can be exchanged for cash! It’s really profitable!
					</view>
					<view class="info-goods">
						<view class="info-goods-left">
							<image :src="shopData.images" ></image>
						</view>
						<view class="info-goods-right">
							<view class="right-text-goods_name">
								{{shopData.goods_name}}
							</view>
							<view class="right-text-price" style="text-decoration:line-through">
								RM{{shopData.price}}
							</view>
							<view class="right-text-auction">
								<image src="/static/images/kbrick/diamond.png"></image>
								<span>{{shopData.auction_price}}
									<text style="font-size: 20rpx;margin-left: 16rpx;">(RM{{shopData.auction_price}})</text>
								</span>
								
							</view>
						</view>
					</view>
					<image :src="qrcodeImg" class="commission-ewm-img"></image>
				</view>
				<image src="/static/spread/join-en.png" class="long"></image>
			</view>
			<view class="hot-sale">
				<view>HOT SALE</view>
				<image src="/static/spread/praise.webp"></image>
			</view>
			<view class="new-list-item" v-for="(item,i) in jingpaiList" :key="i" @longpress="item.isMask=true">
				<image :src="item.image" class="new-list-item-left" v-if="item.check_status!=3 && item.check_status!=4" lazyLoad></image>
				<view class="item-historical" v-else>
					<view class="item-historical-info">
						<image :src="item.image"></image>
						<view>{{item.stage_num}}{{$t('shop.qi')}}</view>
					</view>
				</view>
				<view class="new-list-item-right" v-if="item.check_status!=3 && item.check_status!=4">
					<view class="new-list-item-right-txt">{{item.goods_name}}</view>
					<view class="new-list-item-right-jd">
						<view class="new-list-item-right-jd-data">
							<progress class="progress" :percent="(item.finish_rate*100).toFixed(0)" stroke-width="9" activeColor="#1DD181" backgroundColor="#EBEBEB" />
						</view>
						<view class="new-list-item-right-jd-auth">
							<block v-for="img in item.new_auction_avatar">
								<image :src="img"></image>
							</block>
						</view>
					</view>
					<view class="new-list-item-btm">
						<view class="new-list-item-btm-price">
							<view class="old">
								<view class="old_price">RM{{item.price}}</view>
							</view>
							<view class="new">
								<image src="/static/images/kbrick/diamond.png"></image>
								<span>{{item.auction_price}} 
									<text style="font-size: 20rpx;margin-left: 16rpx;">(RM{{item.auction_price}})</text>
								</span>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-text" @click="toIndex()">
				<image src="/static/spread/spredText-en.webp" ></image>
			</view>
		</template>

		<template v-else-if="isEnglish">
			<view class="head-info">
				<view class="top">
					<image src="/static/images/kbrick/kleft.png" class="left" @click="toBack()"></image>
					<image src="/static/spread/path.webp" class="index" @click="toIndex()"></image>
				</view>
			</view>

			<view class="info" @click="toIndex()">
				<view class="short">
					<view class="info-avatar">
						<image :src="shopData.avatar || require('@/static/images/mine/mine_defalt_avatar.webp')" ></image>
						<span>{{shopData.nickname}}</span>
					</view>
					<view class="info-content">
						太幸运了! 我刚刚只用了RM<span>{{shopData.auction_price}}</span>居然中了一部<span>{{shopData.goods_name}}</span>。太刺激了!我推荐你们一定要来试试手气。最让你吃惊的，还可以折现哦！真是太赚了！   
					</view>
					<view class="info-goods">
						<view class="info-goods-left">
							<image :src="shopData.images" ></image>
						</view>
						<view class="info-goods-right">
							<view class="right-text-goods_name">
								{{shopData.goods_name}}
							</view>
							<view class="right-text-price" style="text-decoration:line-through">
								RM{{shopData.price}}
							</view>
							<view class="right-text-auction">
								<image src="/static/images/kbrick/diamond.png"></image>
								<span>{{shopData.auction_price}}
									<text style="font-size: 20rpx;margin-left: 16rpx;">(RM{{shopData.auction_price}})</text>
								</span>
								
							</view>
						</view>
					</view>
					<image :src="qrcodeImg" class="commission-ewm-img"></image>
				</view>
				<image src="/static/spread/join.png" class="long"></image>
			</view>
			<view class="hot-sale">
				<view>热门商品</view>
				<image src="/static/spread/praise.webp"></image>
			</view>
			<view class="new-list-item" v-for="(item,i) in jingpaiList" :key="i" @longpress="item.isMask=true">
				<image :src="item.image" class="new-list-item-left" v-if="item.check_status!=3 && item.check_status!=4" lazyLoad></image>
				<view class="item-historical" v-else>
					<view class="item-historical-info">
						<image :src="item.image"></image>
						<view>{{item.stage_num}}{{$t('shop.qi')}}</view>
					</view>
				</view>
				<view class="new-list-item-right" v-if="item.check_status!=3 && item.check_status!=4">
					<view class="new-list-item-right-txt">{{item.goods_name}}</view>
					<view class="new-list-item-right-jd">
						<view class="new-list-item-right-jd-data">
							<progress class="progress" :percent="(item.finish_rate*100).toFixed(0)" stroke-width="9" activeColor="#1DD181" backgroundColor="#EBEBEB" />
						</view>
						<view class="new-list-item-right-jd-auth">
							<block v-for="img in item.new_auction_avatar">
								<image :src="img"></image>
							</block>
						</view>
					</view>
					<view class="new-list-item-btm">
						<view class="new-list-item-btm-price">
							<view class="old">
								<view class="old_price">RM{{item.price}}</view>
							</view>
							<view class="new">
								<image src="/static/images/kbrick/diamond.png"></image>
								<span>{{item.auction_price}} 
									<text style="font-size: 20rpx;margin-left: 16rpx;">(RM{{item.auction_price}})</text>
								</span>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-text" @click="toIndex()">
				<image src="/static/spread/spredText.webp" ></image>
			</view>
		</template>
		<!-- <view class="commission-canvas">
			<canvas class="f__canvas" style="width:140px;height:140px;" canvas-id="qrcode" id="qrcode"></canvas>
		</view> -->
		<!--分享弹出 start-->
		<view class="fenxiang" v-if="onfenxingShow">
			<view class="share-pop">
				<view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
				<view class="share-ul">
					<view class="share-li" @click="ontweet">
						<view class="icon">
							<image class="img" src="@/static/images/share21.png"></image>
						</view>
						<view class="t" style="color:#000">twitter</view>
					</view>
					<view @click="onfacebook" class="share-li">
						<view class="icon">
							<image class="img" src="@/static/images/share23.png"></image>
						</view>
						<view class="t" style="color:#000">Facebook</view>
					</view>
					<view class="share-li" @click="onUrlClick">
						<view class="icon">
							<image class="img" src="@/static/images/share25.png"></image>
						</view>
						<view class="t">{{$t('auction.detail.fuzhilianjie')}}</view>
					</view>
				</view>
				<view class="share-bot">
					<button class="share-btn" @click="toggle2Close">{{$t('auction.detail.query')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {qrcodeCanvas} from '@/uni_modules/fan-canvas/plugins/utils';
	export default {
		data() {
			return {
				isEnglish: uni.getStorageSync('locale') == 'en' ? true : false,
				jingpaiList:[],
				isShopCont:false,
				onfenxingShow: false,
				shopData:{},
				auction_goods_id:'',
				qrUrl: '',
				qrcodeImg:''
			}
		},
		onLoad(e) {
			this.auction_goods_id = e.shopId
			this.onAuctionDetail(JSON.parse(decodeURIComponent(e.shopId)))
		},
		onShow(){
			this.onAuctionNewGoods()
		},
		onReady(){
			this.onfenxingShow = true
		},
		methods: {
			getCaption(str, state) {
				if (state == 1) {
					var indexs = str.indexOf("|")
					str = str.substring(indexs + 1, str.length);
				} else {
					var index = str.indexOf("|")
					str = str.substring(0, index);
				}
				return str;
			},
			// 竞拍商品详情
			async onAuctionDetail(auction_goods_id) {
				try {
					const { invite_code,avatar, nickname } = uni.getStorageSync('userCont');
						this.qrUrl = this.$baseUrl + 'pages/mine/new/new-register?invite_code=' + invite_code // 生成二维码的链接
						const res = await this.$http.post(this.$apiObj.AuctionDetail, {
						auction_goods_id
					});
					if (res.code === 1) {
						const { goods_name, price, auction_price, images } = res.data;
						let content 
						if(this.isEnglish){
							content = `Fuyoh! I just won an ${goods_name} with only RM${auction_price}. It’s so exciting! I recommend you to try your luck.What surprises you the most is that it can be exchanged for cash! It’s really profitable!`
						}else{
							content = `太幸运了! 我刚刚只用了RM${auction_price}居然中了一部${goods_name}。太刺激了!我推荐你们一定要来试试手气。最让你吃惊的，还可以折现哦！真是太赚了！   `
						}
						const image = images.length > 1 ? images[1] : images[0];
						this.shopData = { goods_name, price, auction_price, avatar, nickname, images: image, content };
					}
					// this.createQrcode()
				} catch (error) {
					console.error(error);
				}
				},
			// 最新竞拍
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.AuctionNewGoods, {
					sort: 1,
					page: 1,
					pagenum: 5,
					keyword:''
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.remain_time = item.remain_time * 1000
						})
						this.totalPageNum = res.data.total
						this.jingpaiList = this.page == 1 ? res.data.data : [...this.jingpaiList, ...res.data.data]

						if (this.id == 1) this.productList = this.jingpaiList
						this.jingpaiList = this.jingpaiList.splice(0, 10)
					}
				})
			},
			// 生产二维码
			createQrcode() {
				let that = this
				qrcodeCanvas('qrcode', that.qrUrl, 280, 280);
				const ctx = uni.createCanvasContext('qrcode');
				ctx.fillStyle = "#fff"
				ctx.draw(true, function() {
					uni.canvasToTempFilePath({
						width: 280,
						height: 280,
						canvasId: 'qrcode',
						success(res) {
							that.qrcodeImg = res.tempFilePath
						
						}
					}, that)
				})
			},
			toBack() {
				uni.navigateBack()
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			onUrlClick() {
				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = this.qrUrl;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				uni.showToast({
					icon: 'none',
					title: this.$t('user.order.detail.fzcg')
				})
				oInput.remove()
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: this.qrUrl,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			},
			ontweet() {
				let url = `https://twitter.com/intent/tweet?url=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
			onfacebook() {
				let url = `https://www.facebook.com/sharer/sharer.php?u=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
			// 分享--加分享次数
			onAuctionorderShare() {
				this.$http.post(this.$apiObj.AuctionorderShare, {
					auction_goods_id: this.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						this.onAuctionDetail()
					}
				})
			},
			// 取消分享
			toggle2Close() {
				this.onfenxingShow = false
			},
			toIndex() {
				uni.switchTab({
					url: '/pages/auction/auction'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.uni-progress-inner-bar {
		border-radius: 9rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 9rpx !important;
	}
	.surprise {
		width: 750rpx;
		
		min-height: 100vh;
		padding-bottom: 188rpx;
		background: linear-gradient(83.16deg, rgb(253, 69, 63) 29.91%,rgb(254, 167, 129) 70.047%);

		.head-info {
			width: 750rpx;
			padding-top: 88rpx;
			height: 450rpx;
			background: url('/static/spread/head.png') no-repeat;
			background-size: 750rpx 450rpx;

			.top {
				position: fixed;
				top: 100rpx;
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				z-index: 10;

				image {
					display: block;
					width: 40rpx;
					height: 40rpx;
				}

				.left {
					margin-left: 32rpx;
				}

				.index {
					position: absolute;
					right: 32rpx;
				}
			}

		}

		.head-info1 {
			width: 750rpx;
			padding-top: 88rpx;
			height: 812rpx;
			background: url('/static/images/surprise/head_en.webp') no-repeat;
			background-size: 750rpx 900rpx;
		}

		.info {
			position: relative;
			width: 750rpx;
			height: 1000rpx;
			margin-top: 228rpx;

			.short {
				position: absolute;
				top: -300rpx;
				left: 50%;
				transform: translate(-50%, 0);
				display: block;
				width: 638rpx;
				height: 872rpx;
				background: url('/static/spread/bg.webp') no-repeat;
				background-size: 100% 100%;
				image{
					width: 638rpx;
					height: 872rpx;
				}
				.info-avatar{
					width: 136rpx;
					height: 136rpx;
					position: absolute;
					left: 56rpx;
					top: 20rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
					span{
						position: absolute;
						left: 158rpx;
						top: 85rpx;
						width: 375rpx;
						font-size: 41rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #7C4922;
						font-weight: 700;
					}
				}
				.info-content{
					width: 540rpx;
					position: absolute;
					top: 25%;
					left: 50%;
					transform: translate(-50%, 0px);
					font-weight: 400;
					text-align: left;
					span{
						max-width: 302rpx;
						overflow: hidden;
						max-height: 30rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #FF3131;
						display: inline-block;
						font-weight: 700;
					}
				}
				.info-goods{
					width: 540rpx;
					position: absolute;
					top: 52%;
					left: 50%;
					transform: translate(-50%, 0);
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 40rpx;
					overflow: hidden;
					.info-goods-left,
					.info-goods-right {
						width: 50%;
						height: 190rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.info-goods-right{
						display: flex;
						justify-content: space-around;
						align-items: flex-start;
						flex-direction: column;
						padding: 0 0 0 30rpx;
						.right-text-goods_name,
						.right-text-price,
						.right-text-auction{
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.right-text-goods_name{
							color: rgb(51, 51, 51);
							font-size: 25rpx;
						}
						.right-text-price{
							color: rgb(153, 153, 153);
							font-size: 16rpx;
						}
						.right-text-auction{
							color: rgb(255, 57, 57);
							font-size: 41rpx;
							font-size: 20rpx;
							font-weight: bold;
							display: flex;
							align-items: center;
							image {
								width: 52rpx;
								height: 52rpx;
							}
							span{
								margin-left: 6rpx;
								font-size: 43rpx;
							}
						}
					}
				}
				.commission-ewm-img{
					position: absolute;
					bottom: 9%;
					right: 8%;
					width: 134rpx;
					height: 134rpx;
				}
			}
			.short-en{
				background: url('/static/spread/bg-en.webp') no-repeat;
				background-size: 100% 100%;
			}
			.long {
				position: absolute;
				top: 608rpx;
				left: 50%;
				transform: translate(-48%, 0);
				display: block;
				width: 666rpx;
				height: 300rpx;
			}

		}
		.hot-sale{
			color: #fff;
			width: 90%;
			height: 105rpx;
			margin: 0 auto 50rpx;
			padding: 0 0 40rpx 0;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			font-size: 24px;
			line-height: 26px;
			font-weight: 700;
			border-bottom: 2px solid;
			border-image: -webkit-linear-gradient(-270deg, #FEEEAF 0%, #FFFFFF 50%, #FEEEAF 99%) 2 2 2 2;
			border-image: -moz-linear-gradient(-270deg, #FEEEAF 0%, #FFFFFF 50%, #FEEEAF 99%) 2 2 2 2;
			border-image: linear-gradient(-270deg, #FEEEAF 0%, #FFFFFF 50%, #FEEEAF 99%) 2 2 2 2;
			image{
				width: 100rpx;
				height: 100rpx;
				margin-left: 20rpx;
			}
		}
		.bottom-text{
			width: 686rpx;
			height: 160rpx;
			margin: 50rpx auto 16rpx auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.join {
			display: block;
			width: 750rpx;
			height: 502rpx;
		}
	}
	.new-list-item {
		position: relative;
		width: 686rpx;
		height: 242rpx;
		display: flex;
		align-items: center;
		background: #fff;
		box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);
		border-radius: 20rpx;
		margin: 0 auto 16rpx auto;

		.new-list-item-left {
			width: 230rpx;
			height: 100%;
			border-radius: 20rpx 0 0 20rpx;
		}

		.item-historical {
			position: relative;
			width: 206rpx;
			height: 272rpx;
			margin: 0 16rpx;

			.item-historical-info {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 206rpx;
				height: 206rpx;
				border-radius: 16rpx;

				image {
					width: 206rpx;
					height: 206rpx;
					border-radius: 16rpx;
				}

				view {
					position: absolute;
					bottom: 0;
					width: 206rpx;
					height: 48rpx;
					line-height: 48rpx;
					font-size: 18rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgba(0, 0, 0, 0.4);
					border-radius: 0 0 16rpx 16rpx;
				}
			}
		}

		.new-list-item-right {
			position: relative;
			width: 395rpx;
			height: 100%;
			margin-left: 24rpx;
			display: flex;
			justify-content: space-evenly;
			align-items: flex-start;
			flex-direction: column;

			.new-list-item-right-txt {
				top: 20rpx;
				width: 352rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				word-break: break-all;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.product-right-txt {
				position: absolute;
				top: 20rpx;
				width: 352rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.new-list-item-right-jd {
				top: 166rpx;
				width: 100%;
				display: flex;
				align-items: center;

				.new-list-item-right-jd-data {
					position: relative;
					width: 280rpx;
					height: 20rpx;
					margin-right: 20rpx;
					view {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						font-size: 20rpx;
						color: rgb(255, 255, 255);
						z-index: 2;
					}

					image {
						position: absolute;
						top: 50%;
						left: 2rpx;
						transform: translate(0, -50%);
						width: 228rpx;
						height: 18rpx;
						border-radius: 18rpx;
						z-index: 1;
					}

				}

				.new-list-item-right-jd-auth {
					display: flex;
					align-items: center;

					image {
						position: relative;
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						margin-left: 4rpx;
						z-index: 3;
					}

					image:nth-child(2) {
						position: relative;
						margin-left: -14rpx;
						z-index: 2;
					}

					image:nth-child(3) {
						position: relative;
						margin-left: -14rpx;
						z-index: 1;
					}
				}
			}

			.new-list-item-btm {
				bottom: 10rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.new-list-item-btm-price {

					.new {
						font-size: 20rpx;
						font-weight: bold;
						color: rgb(255, 57, 57);
						display: flex;
						align-items: center;

						image {
							width: 52rpx;
							height: 52rpx;
						}

						span,
						.zs {
							margin-left: 6rpx;
							font-size: 43rpx;
						}
					}

					.old {
						font-size: 16rpx;
						color: rgb(153, 153, 153);
						display: flex;
						align-items: flex-end;

						.old_price {
							text-decoration: line-through;
						}

						.zs {
							font-size: 16rpx;
							color: rgb(153, 153, 153);
							text-decoration: none;
							display: flex;
							align-items: center;
							margin-left: 8rpx;

							image {
								width: 20rpx;
								height: 20rpx;
							}
						}
					}
				}
			}
		}

	}
	.commission-canvas{
		position: fixed;
		top: -1000000rpx;
	}
	.fenxiang {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	.share-pop {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffffff;
		border-radius: 20rpx 20rpx 0px 0px;

		.share-t {
			font-size: 28rpx;
			font-weight: 550;
			text-align: center;
			padding: 30rpx;
		}

		.share-ul {
			display: flex;
			flex-wrap: wrap;
			padding: 50rpx 30rpx;
			text-align: center;

			.share-li {
				width: 33.3333%;
				text-decoration: none;

				.icon {
					width: 90rpx;
					height: 90rpx;
					margin: 0 auto;
				}

				.t {
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					// line-height: 1;
					margin-top: 25rpx;
				}
			}
		}

		.share-bot {
			padding: 40rpx 30rpx;
			border-top: 1px solid #f5f5f5;

			.share-btn {
				font-size: 28rpx;
				font-weight: 550;
				width: 100%;
				padding: 0;
				margin: 0;
			}
		}
	}
</style>