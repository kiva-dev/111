<template>
	<view class="activeties-layout">
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
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
				url: '',
			}
		},
		onLoad(option) {
			this.url = option.url || '';
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
