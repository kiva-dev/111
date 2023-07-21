<template>
	<view class="surprise">
		<template v-if="!isEnglish">
			<view class="head-info">
				<view class="top">
					<image src="/static/images/surprise/return.png" class="left" @click="toBack()"></image>
					<image src="/static/images/surprise/home.png" class="index" @click="toIndex()"></image>
				</view>
			</view>

			<view class="info" @click="toIndex()">
				<image src="/static/images/surprise/1.png" class="short"></image>
				<image src="/static/images/surprise/2.png" class="long"></image>
			</view>

			<image src="/static/images/surprise/3.png" class="join" @click="toIndex()"></image>

			<view class="btn">
				<a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
					style="text-decoration:none;">
					<image src="/static/images/surprise/download.png" class="download lfetBottomBtn"></image>
				</a>
				<image src="/static/images/surprise/register.png" class="register"
					@click="navClick('/pages/public/register')"></image>
			</view>
		</template>

		<template v-else-if="isEnglish">
			<view class="head-info head-info1">
				<view class="top">
					<image src="/static/images/surprise/return.png" class="left" @click="toBack()"></image>
					<image src="/static/images/surprise/home.png" class="index" @click="toIndex()"></image>
				</view>
			</view>

			<view class="info" @click="toIndex()">
				<image src="/static/images/surprise/1_en.png" class="short"></image>
				<image src="/static/images/surprise/2_en.png" class="long"></image>
			</view>

			<image src="/static/images/surprise/3_en.png" class="join" @click="toIndex()"></image>

			<view class="btn">
				<a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
					style="text-decoration:none;">
					<image src="/static/images/surprise/download_en.png" class="download lfetBottomBtn"></image>
				</a>
				<image src="/static/images/surprise/register_en.png" class="register"
					@click="navClick('/pages/public/register')"></image>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEnglish: true,
			}
		},
		onLoad(e) {
			if(e.language == 'en') this.isEnglish = true
			else this.isEnglish = false
			
			if(e.promotion_code) uni.setStorageSync('invite_code',e.promotion_code)
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
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
	.surprise {
		width: 750rpx;
		min-height: 100vh;
		padding-bottom: 188rpx;
		background: rgb(31, 61, 195);
		
		.lfetBottomBtn{
		     animation: shake 1s cubic-bezier(.36, .07, .19, .97) both infinite;
		}
		
		@keyframes shake {
		    0%, 100% {transform: scale(1);}
		    25%, 75% {transform: scale(1.05);}
		    50% {transform: scale(1);}
		}

		.head-info {
			width: 750rpx;
			padding-top: 88rpx;
			height: 812rpx;
			background: url('/static/images/surprise/head.png') no-repeat;
			background-size: 750rpx 900rpx;

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
			background: url('/static/images/surprise/head_en.png') no-repeat;
			background-size: 750rpx 900rpx;
		}

		.info {
			position: relative;
			width: 750rpx;
			height: 1816rpx;
			background: url('/static/images/surprise/info-bj.png') no-repeat;
			background-size: 750rpx 1816rpx;
			margin-top: 228rpx;

			.short {
				position: absolute;
				top: -300rpx;
				left: 50%;
				transform: translate(-50%, 0);
				display: block;
				width: 678rpx;
				height: 646rpx;
			}

			.long {
				position: absolute;
				top: 428rpx;
				left: 50%;
				transform: translate(-50%, 0);
				display: block;
				width: 738rpx;
				height: 1312rpx;
			}

		}

		.join {
			display: block;
			width: 750rpx;
			height: 502rpx;
			margin-top: ;
		}

		.btn {
			position: fixed;
			bottom: 40rpx;
			width: 750rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10;

			image {
				display: block;
				width: 318rpx;
				height: 110rpx;
				margin: 0 24rpx;
			}
		}

	}
</style>