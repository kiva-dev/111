<template>
	<view class="activeties-layout">
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
		<!-- <image src="https://kjtest.ysxrj.cn/uploads/20230429/db74caf0bad7599e65888dab796aeee5.png" mode="widthFix"></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: { 
					progress: {
						width:'750rpx',
						color: '#1DD181',
					} 
				},
			}
		},
		onLoad(option) {
			if(option.url) {
				this.url = option.url;
			}
		}
	}
</script>

<style lang="less" scoped>
	.activeties-layout {
		width: 100%;
		
		image {
			width: 100%;
		}
	}
</style>
