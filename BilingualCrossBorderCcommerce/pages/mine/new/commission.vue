<template>
	<view class="commission-page">
		<view class="commission-head">
			<image class="commission-head-img" src="@/static/images/mine/collect_icon_back.png" @click="toBack()"></image>
			<view class="commission-head-txt">{{$t('new.yjfx')}}</view>
		</view>
		<view class="commission-center">
			<view class="commission-center-tit">
				<view class="tit-left">{{$t('new.fyje')}}（RM）</view>
				<view class="tit-right" @click="toRule('/pages/mine/new/yqlist')">
					<p>{{$t('new.wdyq')}}</p>
					<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="commission-center-price">{{info.rebate_money_total}}</view>
			<!-- <view class="commission-center-jjdz">
				<view class="jjdz-icon">
					<image src="@/static/images/mine/commission_icon_account.png" mode="widthFix"></image>
				</view>
				<view class="jjdz-text">{{$t('new.jjdzje')}}(RM)：{{info.pre_entry_rebate}}</view>
			</view> -->
		</view>
		<view class="commission-layout">
			<view class="cl-title">
				<view class="cl-title-left">{{$t('new.fymx')}}</view>
				<view class="cl-title-right" @click="toRule('/pages/mine/new/commission_rule')">
					<p>{{$t('new.fygz')}}</p>
					<image src="@/static/images/mine/mine_icon_right.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="cl-list">
				<template v-if="moneyList && moneyList.length > 0">
					<view class="cl-list-item" v-for="(item,i) in moneyList" :key="item.id">
						<view class="item-left">
							<view class="item-left-icon">
								<image src="@/static/images/mine/wallet_icon_income.png" v-if="item.type==20"></image>
								<image src="@/static/images/mine/wallet_icon_expenditure.png" v-else></image>
							</view>
							<view class="item-left-info">
								<view class="info-tit">{{item.memo}}</view>
								<view class="info-time">{{$filter.to_date_time(item.addtime)}}</view>
							</view>
						</view>
						<view class="item-right">{{item.money}}</view>
					</view>
				</template>
				<template v-else>
					<view class="cl-list-null">
						<image src="/static/images/new/zwsj.png"></image>
						<view class="null-msg">{{$t('new.zwfy')}}</view>
						<view class="null-text">{{$t('new.ljyqhy')}}</view>
						<view class="null-btn" @click="toRule('/pages/mine/new/commission_rule')">{{$t('new.ljcy')}}</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import $ from '@/common/jquery-3.6.1.min.js'
	export default {
		data() {
			return {
				list: [1],
				moneyList: [],
				page: 1,
				pagenum: 10,
				info: {}
			}
		},
		onShow() {
			this.getMoneyList()
			this.getRebate()
		},
		methods: {
			getMoneyList() {
				let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false // 中文还是英文
				this.$http.post(this.$apiObj.MineMoneyList, {
					is_rebate: 1,
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					res.data.data.map(item => {
						let zhStr = item.memo
						let appid = '20230630001729096'
						let userkey = '8e_t3vzBtUjLMRNafCp5'
						let salt = (new Date).getTime()
						const str = `${appid}${zhStr}${salt}${userkey}`;
						const sign = md5(str); /* md5加密，生成签名 */
						const params = {
							q: zhStr,
							from: 'zh',
							to: 'en',
							appid: appid,
							sign,
							salt: salt
						}

						//#ifdef H5
						// console.log($, "======uni-app的H5模式引入JQuery=====");
						if (isShopCont) {
							$.ajax({
								url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
								type: 'get',
								dataType: 'jsonp',
								data: params,
								success: function(data) {
									item.memo = data.trans_result[0].dst
								}
							});
						}
						//#endif
						// #ifdef APP-PLUS
						if (isShopCont) {
							uni.request({
								url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', //仅为示例，并非真实接口地址。
								data: params,
								header: {
									'custom-header': 'hello' //自定义请求头信息
								},
								success: (res) => {
									item.memo = res.data.trans_result[0].dst
								}
							});
						}
						// #endif
					})
					this.moneyList = res.data.data
				})
			},
			getRebate() {
				this.$http.post(this.$apiObj.MineRebateInfo).then(res => {
					this.info = res.data
				})
			},
			toBack() {
				uni.navigateBack()
			},
			toRule(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.commission-page {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
	}

	.commission-head {
		position: relative;
		width: 100%;
		height: 88rpx;
		padding-top: 88rpx;
		display: flex;
		align-items: center;
		background: rgb(255, 255, 255);

		.commission-head-img {
			position: absolute;
			left: 20rpx;
			width: 40rpx;
			height: 40rpx;
			z-index: 10;
		}

		.commission-head-txt {
			width: 100%;
			color: rgb(51, 51, 51);
			font-size: 40rpx;
			text-align: center;
		}
		
		.commission-head-right{
			position: absolute;
			right: 20rpx;
			display: flex;
			align-items: center;
			
			image{
				width: 48rpx;
				height: 48rpx;
			}
			
			view{
				font-size: 20rpx;
				color: rgb(44, 44, 44);
				margin-right: 16rpx;
			}
			
		}
		
	}

	.commission-center {
		width: calc(100% - 56rpx);
		height: 350rpx;
		margin: 32rpx auto;
		background: url('@/static/images/mine/commission_bg.png') no-repeat;
		background-size: 100% 100%;
		position: relative;

		.commission-center-tit {
			padding: 36rpx 50rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.tit-left {
				color: rgb(51, 51, 51);
				font-size: 32rpx;
			}
			
			.tit-right {
				display: flex;
				align-items: center;
				
				p {
					color: rgb(102, 102, 102);
					font-size: 24rpx;
				}
				
				image {
					width: 24rpx;
					margin-left: 5rpx;
					transform: translateY(2rpx);
				}
			}
		}

		.commission-center-price {
			width: 100%;
			font-size: 72rpx;
			font-weight: bold;
			color: rgb(255, 57, 57);
			text-align: center;
		}

		.commission-center-jjdz {
			display: flex;
			align-items: center;
			position: absolute;
			left: 32rpx;
			bottom: 40rpx;
			
			.jjdz-icon {
				width: 48rpx;
				height: 48rpx;
				
				image {
					width: 100%;
				}
			}
			
			.jjdz-text {
				margin-left: 8rpx;
				color: rgb(255, 255, 255);
				font-size: 28rpx;
			}
		}
	}
	
	.commission-layout {
		width: 100%;
		background: rgb(255, 255, 255);
		border-radius: 24rpx 24rpx 0px 0px;
		padding: 32rpx;
		box-sizing: border-box;
		
		.cl-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.cl-title-left {
				color: rgb(51, 51, 51);
				font-size: 28rpx;
			}
			
			.cl-title-right {
				display: flex;
				align-items: center;
				
				p {
					color: rgb(102, 102, 102);
					font-size: 24rpx;
				}
				
				image {
					width: 24rpx;
					margin-left: 5rpx;
					transform: translateY(2rpx);
				}
			}
		}
		
		.cl-list {
			width: 100%;
			margin-top: 32rpx;
			
			.cl-list-item {
				width: 100%;
				margin-bottom: 32rpx;
				padding-bottom: 32rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.item-left {
					display: flex;
					align-items: center;
					
					.item-left-icon {
						width: 80rpx;
						height: 80rpx;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
					
					.item-left-info {
						margin-left: 32rpx;
						
						.info-tit {
							max-width: 420rpx;
							margin: 9rpx 0;
							color: rgb(51, 51, 51);
							font-size: 28rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						
						.info-time {
							margin: 9rpx 0;
							color: rgb(153, 153, 153);
							font-size: 24rpx;
						}
					}
				}
				
				.item-right {
					color: rgb(255, 57, 57);
					font-size: 32rpx;
				}
			}
		}
	}
	
	.cl-list-null {
		min-height: 50vh;
		padding-top: 200rpx;

		image {
			display: block;
			width: 256rpx;
			height: 160rpx;
			margin: 0 auto 10rpx auto;
		}

		.null-msg {
			width: 686rpx;
			font-size: 24rpx;
			color: rgb(190, 190, 190);
			text-align: center;
			margin: 0 auto;
		}

		.null-text {
			width: 100%;
			font-size: 34rpx;
			color: rgb(102, 102, 102);
			text-align: center;
			word-break: break-all;
			margin-top: 40rpx;
		}

		.null-btn {
			width: 400rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 34rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(10, 198, 142);
			border-radius: 40rpx;
			margin: 60rpx auto 0 auto;
		}
	}
</style>