<template>
	<view class="empty-layout">
		<image :style="{'width': width + 'rpx'}"
			:src="image ? image: require('@/static/images/mine/order_icon_null.png')" mode="widthFix"></image>
		<p>{{message || ''}}</p>
	</view>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				default: ''
			},
			image: {
				type: String,
				default: ''
			},
			width: {
				type: Number,
				default: 400
			}
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.empty-layout {
		width: 100%;
		text-align: center;
		padding: 80rpx 0 40rpx;
		box-sizing: border-box;

		>image {
			margin-bottom: 40rpx;
		}

		>p {
			width: 80%;
			color: #908F94;
			font-size: 28rpx;
			text-align: center;
			margin: 0 auto;
		}
	}
</style>