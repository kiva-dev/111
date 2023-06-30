<template>
	<view class="agree-page">
		<view class="agree-box" v-if="isShopCont" v-html="e_service_agree"></view>
		<view class="agree-box" v-else v-html="service_agree"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShopCont: false, // 商品详情显示中文还是英文
				service_agree: '',
				e_service_agree: '',
			}
		},
		onLoad() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.$http.post(this.$apiObj.IndexSetting,{
				fields: 'service_agree,e_service_agree'
			}).then(res => {
				if (res.code == 1) {
					res.data.service_agree = this.onHtmlcont(res.data.service_agree)
					res.data.e_service_agree = this.onHtmlcont(res.data.e_service_agree)
					this.service_agree = res.data.service_agree
					this.e_service_agree = res.data.e_service_agree
				}
			})
		},
		methods: {
			onHtmlcont(html) {
				let richtext = html
				const regex = new RegExp('<img', 'gi');
				richtext = richtext.replace(regex, '<img style="max-width: 100%;"');
				const regex1 = new RegExp('data-fail="0" style="', 'gi');
				richtext = richtext.replace(regex1, 'data-fail="0" style="max-width: 100%;');
				return richtext
			},
		}
	}
</script>

<style lang="less" scoped>
	.agree-page {
		.agree-box {
			padding: 30rpx;
			font-size: 28rpx;
			line-height: 1.6;
			white-space: pre-line;

			word-break: break-all;
		}
	}
</style>