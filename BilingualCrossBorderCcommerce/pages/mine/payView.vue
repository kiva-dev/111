<template>
	<view class="payview">
		<view class="btn" @click="success()">完成</view>
		<a href="kolibri://"></a>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(e) {

		},
		methods: {
			success() {
				// #ifdef H5
				uni.redirectTo({
					url:'/pages/mine/K_brick_detail'
				})
				// #endif

				// #ifdef APP-PLUS
				this.isIos = uni.getSystemInfoSync().platform //判断是否安卓、ios
				if (this.isIos == 'android') {
					let ifr = document.createElement("a");
					ifr.href="kolibri://";
					document.body.appendChild(ifr);//添加到body
					ifr.click();//触发事件
				} else {
					window.location = "https://apps.apple.com/cn/app/idxxxxxxx" //你的苹果应用app链接 
				}
				// #endif
			}
		},
	}
</script>
<style lang="less" scoped>
	.payview {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.btn {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: #fff;
			text-align: center;
			background: rgb(10, 198, 142);
			border-radius: 88rpx;
		}

	}
</style>