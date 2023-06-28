<template>
	<view class="found-page">
		<uni-empty image="/static/images/auction/public_icon_found.png" :message="$t('found.text')"></uni-empty>
		<view class="btn-layout">
			<view class="bl-home" @click="toIndex">{{$t('found.home')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url: '/pages/auction/new_index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.found-page {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
		
		.btn-layout {
			width: 100%;
			display: flex;
			justify-content: center;
			
			.bl-home {
				width: 156rpx;
				height: 64rpx;
				background: rgb(10, 198, 142);
				border-radius: 100rpx;
				text-align: center;
				line-height: 64rpx;
				color: rgb(255, 255, 255);
				font-size: 28rpx;
			}
		}
	}
</style>