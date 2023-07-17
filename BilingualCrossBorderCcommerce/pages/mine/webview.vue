<template>
	<view>
		<web-view :src="`${$baseUrl}pay.html?` +payurl"> </web-view>
		<!-- @message="getMessage" -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				payurl: ''
			}
		},
		onLoad(e) {
			// 获取传递过来的链接
			this.payurl = encodeURIComponent(e.url)
		},
		methods: {
			// getMessage (message) {
			//   console.log('h5退出通知uni--->message', message.detail)
			//   if (message.detail.data[0].action === 'logout') {
			//     const storageKey = message.detail.data[0].account
			//     uni.removeStorageSync(storageKey)
			//     this.$Router.replaceAll('pages/login/index')
			//   }
			// }
		},
	}
</script>