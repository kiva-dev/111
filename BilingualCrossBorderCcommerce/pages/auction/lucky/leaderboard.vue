<template>
	<view class="leaderboard">
		<view class="head-info">
			<view class="top">
				<image src="/static/images/auth/left.png" @click="toBack()"></image>
				<view class="top-tit" :class="select===1 ? 'select':''" @click="select=1">{{$t('ranking.luck_list')}} <text
						v-show="select==1"></text> </view>
				<view class="top-tit" :class="select===2 ? 'select':''" @click="select=2">{{$t('ranking.wish_list')}} <text
						v-show="select==2"></text> </view>
				<view class="top-tit" :class="select===3 ? 'select':''" @click="select=3">{{$t('ranking.invitation_list')}}<text
						v-show="select==3"></text> </view>
			</view>

			<view class="switch">
				<view class="switch-name" :class="switch_id==1?'switch-select':''" @click="switch_id=1">{{$t('ranking.weekly_list')}}
				</view>
				<view class="switch-name" :class="switch_id==2?'switch-select':''" @click="switch_id=2">{{$t('ranking.mothly_list')}}
				</view>
				<view class="switch-name" :class="switch_id==3?'switch-select':''" @click="switch_id=3">{{$t('ranking.overall')}}
				</view>
			</view>

			<view class="tip">{{$t('ranking.update')}}</view>

			<view class="ranking">
				<view class="ranking-info">
					<image src="/static/images/luck/luck2.png" class="crown"></image>
					<view class="auth">
						<image src="/static/images/me/auth1.png" class="auth-img"></image>
					</view>
					<view class="auth-name">Jackie Chan</view>
					<view class="num">2800</view>
					<view class="btm" style="border-radius: 24rpx 0 0 0;">2</view>
				</view>

				<view class="ranking-info" style="width: 220rpx;">
					<image src="/static/images/luck/luck1.png" class="crown"></image>
					<view class="auth" style="border: 4rpx solid rgb(255, 231, 42);">
						<image src="/static/images/me/auth1.png" class="auth-img"></image>
					</view>
					<view class="auth-name">Jackie Chan</view>
					<view class="num">2800</view>
					<view class="btm"
						style="font-size: 72rpx;height: 160rpx;border-radius: 24rpx 24rpx 0 0;background: rgba(255, 255, 255, 0.7);">1
					</view>
				</view>

				<view class="ranking-info">
					<image src="/static/images/luck/luck3.png" class="crown"></image>
					<view class="auth" style="border: 4rpx solid rgb(254, 202, 134);">
						<image src="/static/images/me/auth1.png" class="auth-img"></image>
					</view>
					<view class="auth-name">Jackie Chan</view>
					<view class="num">2800</view>
					<view class="btm" style="height: 94rpx;border-radius: 0 24rpx 0 0;">3</view>
				</view>

			</view>
			
			
			<view class="list">
				<view class="list-tit">
					<view class="left">
						<image src="/static/images/luck/trophy.png"></image>
						<view v-if="switch_id==1">{{$t('ranking.weekly_list')}}</view>
						<view v-else-if="switch_id==2">{{$t('ranking.mothly_list')}}</view>
						<view v-else>{{$t('ranking.overall')}}</view>
					</view>
					<view class="right" v-if="select==1">{{$t('ranking.luck_times')}}</view>
					<view class="right" v-else-if="select==2">{{$t('ranking.wishing_times')}}</view>
					<view class="right" v-else>{{$t('ranking.invitation_num')}}</view>
				</view>
				
				<view class="item" v-for="(item,i) in [1,1,1,1,1,1,1]">
					<view class="item-num">{{i+4}}</view>
					<image src="/static/images/me/auth1.png"></image>
					<view class="item-name">EasonEasonEasonEasonEasonEasonEasonEason</view>
					<view class="item-total">2533</view>
				</view>
				
			</view>
			
		</view>
		
		<view class="my-info">
			<view class="num">16</view>
			<image src="/static/images/me/auth1.png"></image>
			<view class="name">Eason Chan</view>
			<view class="total">868</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				select: 1,
				switch_id: 1
			}
		},
		onLoad() {
			let date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			let week = date.getDay()
			
			let monthNum = new Date(year,month,0).getDate()
			
			let monthStartTime = new Date(year+'/'+month+'/'+ 1).getTime()
			let monthEndTime = new Date(year+'/'+month+'/'+ monthNum+" 23:59:59").getTime()
			let weekStartTime = new Date(year,month,day - week + 1).getTime()
			let weekEndTime = new Date(year,month,day - week + 7).getTime()
			console.log(monthEndTime)
		},
		methods: {
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.leaderboard {

		.head-info {
			width: 750rpx;
			height: 842rpx;
			background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);

			.top {
				width: 100%;
				height: 88rpx;
				padding-top: 88rpx;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-left: 32rpx
				}

				.top-tit {
					position: relative;
					width: 220rpx;
					font-size: 28rpx;
					color: rgb(255, 255, 255);
					text-align: center;

					text {
						position: absolute;
						left: 50%;
						bottom: -8rpx;
						transform: translate(-50%, 0);
						width: 40rpx;
						height: 8rpx;
						background: rgb(255, 255, 255);
						border-radius: 8rpx;
					}
				}

				.select {
					font-weight: bold;
				}
			}

			.switch {
				width: 492rpx;
				height: 64rpx;
				display: flex;
				align-items: center;
				border-radius: 64rpx;
				background: rgba(255, 255, 255, 0.4);
				margin: 0 auto;

				.switch-name {
					width: 33.33%;
					height: 64rpx;
					line-height: 64rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					border-radius: 64rpx;
				}

				.switch-select {
					color: rgb(10, 198, 142);
					background: #fff;
				}
			}

			.tip {
				width: 100%;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				margin: 20rpx 0 46rpx 0;
			}

			.ranking {
				width: 644rpx;
				display: flex;
				align-items: flex-end;
				margin: 0 auto;

				.ranking-info {
					width: 212rpx;
					text-align: center;

					.crown {
						width: 44rpx;
						height: 44rpx;
					}

					.auth {
						position: relative;
						width: 128rpx;
						height: 128rpx;
						box-sizing: border-box;
						border: 4rpx solid rgb(180, 203, 233);
						border-radius: 50%;
						margin: 0 auto;

						.auth-img {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							width: 120rpx;
							height: 120rpx;
							border-radius: 50%;
						}
					}

					.auth-name {
						width: 100%;
						font-size: 24rpx;
						font-weight: bold;
						color: rgb(255, 255, 255);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 8rpx 0;
					}

					.num {
						width: 100%;
						font-size: 24rpx;
						font-weight: bold;
						color: rgb(255, 255, 255);
						margin-bottom: 20rpx;
					}

					.btm {
						width: 100%;
						height: 112rpx;
						font-size: 56rpx;
						font-weight: bold;
						color: rgb(10, 198, 142);
						display: flex;
						align-items: center;
						justify-content: center;
						background: rgba(255, 255, 255, 0.5);
					}
				}

			}
			
			.list{
				width: 750rpx;
				min-height: 300rpx;
				padding-top: 24rpx;
				background: #fff;
				border-radius: 32rpx 32rpx 0 0;
				
				.list-tit{
					position: relative;
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;
					
					.left{
						display: flex;
						align-items: center;
						margin-left: 44rpx;
						
						image{
							width: 48rpx;
							height: 48rpx;
						}
						
						view{
							font-size: 24rpx;
							font-weight: bold;
							color: rgb(51, 51, 51);
							margin-left: 18rpx;
						}
						
					}
					
					.right{
						position: absolute;
						right: 26rpx;
						font-size: 24rpx;
						color: rgb(102, 102, 102);
					}
					
				}
				
				.item{
					position: relative;
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;
					
					.item-num{
						width: 38rpx;
						font-size: 32rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						text-align: center;
						margin-left: 46rpx;
					}
					
					image{
						display: block;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						margin: 0 20rpx 0 40rpx;
					}
					
					.item-name{
						max-width: 300rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					
					.item-total{
						position: absolute;
						right: 56rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
					}
				}
				
			}
			
		}
		
		.my-info{
			position: fixed;
			left: 24rpx;
			bottom: 86rpx;
			width: 702rpx;
			height: 116rpx;
			font-weight: bold;
			color: rgb(255, 255, 255);
			display: flex;
			align-items: center;
			background: rgb(10, 198, 142);
			border-radius: 32rpx;
			z-index: 10;
			
			.num{
				font-size: 32rpx;
				margin-left: 24rpx;
			}
			
			image{
				display: block;
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				margin: 0 12rpx 0 32rpx;
			}
			
			.name{
				font-size: 28rpx;
			}
			
			.total{
				position: absolute;
				font-size: 28rpx;
				right: 32rpx;
			}
			
		}
		
	}
</style>