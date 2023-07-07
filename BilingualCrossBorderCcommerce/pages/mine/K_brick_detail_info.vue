<template>
	<view class="detail-info" v-if="list.length!=0">
		<view class="info-head">
			<image src="../../static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view>{{$t('new.kzmx')}}</view>
		</view>

		<view class="item" v-for="(item,i) in list" :key="item.user_k_diamond_log_id"
			:style="(i+1)==list.length?'border-bottom: none;':''">
			<image src="/static/images/mine/wallet_icon_income.png"></image>
			<view class="item-info">
				<view class="item-tit">{{item.memo}}</view>
				<view class="item-time">{{$u.timeFormat(item.addtime, 'yyyy/mm/dd hh:MM:ss')}}</view>
			</view>
			<view class="item-price" :style="item.money*1 < 1 ?'color: rgb(153, 153, 153);':''"><text v-show="item.money*1 > 0">+</text>{{item.money*1}}</view>
		</view>
	</view>
	<view class="NoDataAvailable" v-else>
		<view class="info-head">
			<image src="/static/images/kbrick/kleft.png" @click="onReturn()"></image>
			<view>{{$t('new.kzmx')}}</view>
		</view>
		
		<view class="item">
			<view class="img"><image src="/static/images/noData.png"></image></view>
			<text class="txt">{{$t('new.noData')}}~</text>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import $ from '@/common/jquery-3.6.1.min.js';
	export default {
		data() {
			return {
				list: []
			}
		},
		mounted() {
			this.getAllList()
		},
		methods: {
			onReturn() {
				uni.navigateBack()
			},
			getAllList() {
				let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false // 中文还是英文
				
				this.$http.post(this.$apiObj.diamondDetail, {
					page: 1,
					pagenum: 20
				}).then(res => {
					res.data.data.forEach(item=>{
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
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.NoDataAvailable{
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		background: #f8f8f8!important;
		margin: auto;
		text-align: center;
		.info-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgb(204, 204, 204);
			background-color: #fff;
		
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
		.item{
			.img{
				width: 100%;
				margin-top:80rpx;
				image{
				width: 480rpx;
				height: 480rpx;
			}
			}
			.txt{
				color: #999;
				font-size: 28rpx;
				margin-top: 24rpx;
			}
		}
	}
	.detail-info {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;

		.info-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgb(204, 204, 204);

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

		.item {
			position: relative;
			width: 686rpx;
			height: 144rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgb(204, 204, 204);
			margin: 0 auto;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			.item-info {
				width: 440rpx;
				line-height: 46rpx;
				margin-left: 32rpx;

				.item-tit {
					width: 100%;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
				}

				.item-time {
					font-size: 24rpx;
					color: rgb(153, 153, 153);
				}

			}

			.item-price {
				position: absolute;
				right: 0;
				font-size: 32rpx;
				color: rgb(255, 57, 57);
			}

		}

	}
</style>