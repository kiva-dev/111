<template>
	<view>
		<web-view :src="'https://h5.kolibrimall.com/pay.html?' +url"> </web-view>
		<!-- @message="getMessage" -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(e) {
			console.log(e);
			console.log(e.url);
			// console.log(JSON.parse(e.url));
			// 获取传递过来的链接
			this.url = encodeURIComponent(e.url)
			// console.log(this.url);
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