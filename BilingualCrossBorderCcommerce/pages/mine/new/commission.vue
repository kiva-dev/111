<template>
	<view class="commission-page">
		<view class="commission-head">
			<image class="commission-head-img" src="/static/images/new/left.png" @click="toBack()"></image>
			<view class="commission-head-txt">{{$t('new.yjfx')}}</view>
			<!-- <view class="commission-head-right" @click="toRule('/pages/mine/new/yqlist')">
				<view>{{$t('new.wdyq')}}</view>
			</view> -->
		</view>

		<view class="commission-center">
			<view class="commission-center-tit">{{$t('new.fyje')}}（RM）</view>
			<view class="commission-center-price">{{info.rebate_money_total}}</view>
			<view class="commission-center-jjdz">{{$t('new.jjdzje')}}(RM)：{{info.pre_entry_rebate}}</view>
		</view>

		<view class="commission-info">
			<view class="commission-info-left">{{$t('new.fymx')}}</view>
			<view class="commission-info-right" @click="toRule('/pages/mine/new/commission_rule')">
				<view>{{$t('new.fygz')}}</view>
				<image src="../../../static/images/products/right.png"></image>
			</view>
		</view>
		<block v-if="moneyList.length>0">
			<scroll-view scroll-y style="height: 890rpx;">
				<view class="commission-item" v-for="(item,i) in moneyList" :key="item.id">
					<image src="/static/images/new/chonzhi.png" v-if="item.type==20"></image>
					<image src="/static/images/new/xiaofei.png" v-else></image>
					<view class="commission-item-info">
						<view class="commission-item-info-tit">{{item.memo}}</view>
						<view class="commission-item-info-time">{{$filter.to_date_time(item.addtime)}}</view>
					</view>
					<view class="commission-item-price">{{item.money}}</view>
				</view>
			</scroll-view>
		</block>
		<block v-else>
			<view class="not-data">
				<image src="/static/images/new/zwsj.png"></image>
				<view class="not-view">{{$t('new.zwfy')}}</view>
				<view class="not-data-yaoqin">{{$t('new.ljyqhy')}}</view>
				<view class="not-data-btn" @click="toRule('/pages/mine/new/commission_rule')">{{$t('new.ljcy')}}</view>
			</view>
		</block>


		<view style="height: 40rpx;"></view>
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
						let appid = '20220914001342711'
						let userkey = 'QzytrtrDkXeAeaEp_yW3'
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
		background: rgb(248, 248, 248);
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
			width: 60rpx;
			height: 60rpx;
			z-index: 10;
		}

		.commission-head-txt {
			width: 100%;
			font-size: 40rpx;
			color: rgb(255, 78, 47);
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
		position: relative;
		width: 686rpx;
		height: 350rpx;
		background: url('/static/images/new/commission-head.png') no-repeat;
		background-size: 686rpx 350rpx;
		margin: 50rpx auto;

		.commission-center-tit {
			position: absolute;
			top: 30rpx;
			left: 50rpx;
			font-size: 32rpx;
			color: rgb(44, 44, 44);
		}

		.commission-center-price {
			position: absolute;
			top: 98rpx;
			width: 100%;
			font-size: 72rpx;
			font-weight: bold;
			color: rgb(255, 78, 47);
			text-align: center;
		}

		.commission-center-jjdz {
			position: absolute;
			left: 40rpx;
			bottom: 50rpx;
			font-size: 24rpx;
			color: rgb(255, 255, 255);
		}

	}

	.commission-info {
		width: 686rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto 30rpx auto;

		.commission-info-left {
			font-size: 32rpx;
			color: rgb(255, 78, 47);
		}

		.commission-info-right {
			font-size: 24rpx;
			color: rgb(44, 44, 44);
			display: flex;
			align-items: center;

			image {
				width: 38rpx;
				height: 38rpx;
				margin-left: 10rpx;
			}

		}

	}

	.commission-item {
		position: relative;
		width: 686rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		background: #fff;
		border-radius: 12rpx;
		box-shadow: 0px 4rpx 10rpx rgba(44, 44, 44, 0.1);
		margin: 0 auto 20rpx auto;

		image {
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin: 0 30rpx;
		}

		.commission-item-info {

			.commission-item-info-tit {
				font-size: 24rpx;
				color: rgb(44, 44, 44);
			}

			.commission-item-info-time {
				font-size: 20rpx;
				color: rgb(190, 190, 190);
				margin-top: 10rpx;
			}

		}

		.commission-item-price {
			position: absolute;
			right: 30rpx;
			font-size: 32rpx;
			color: rgb(44, 44, 44);
		}

	}

	.not-data {
		padding-top: 200rpx;

		image {
			display: block;
			width: 256rpx;
			height: 160rpx;
			margin: 0 auto 10rpx auto;
		}

		.not-view {
			width: 686rpx;
			font-size: 24rpx;
			color: rgb(190, 190, 190);
			text-align: center;
			margin: 0 auto;
		}

		.not-data-yaoqin {
			width: 100%;
			font-size: 34rpx;
			color: rgb(255, 78, 47);
			text-align: center;
			word-break: break-all;
			margin-top: 40rpx;
		}

		.not-data-btn {
			width: 400rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 34rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(255, 78, 47);
			border-radius: 40rpx;
			margin: 60rpx auto 0 auto;
		}

	}
</style>