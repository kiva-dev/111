<template>
	<view class="about-page">
		<view class="about-box">
			<view class="about-logo">
				<image class="img" mode="widthFix" src="../../static/images/new/login.png"></image>
			</view>
			<view class="about-article" v-if="isShopCont" v-html="e_aboutwe"></view>
			<view class="about-article" v-else v-html="aboutwe"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShopCont: false, // 商品详情显示中文还是英文
				aboutwe: '',
				e_aboutwe: '',
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.$http.post(this.$apiObj.IndexSetting, {
				fields: 'aboutwe,e_aboutwe'
			}).then(res => {
				if (res.code == 1) {
					res.data.aboutwe = this.onHtmlcont(res.data.aboutwe)
					res.data.e_aboutwe = this.onHtmlcont(res.data.e_aboutwe)
					this.aboutwe = res.data.aboutwe
					this.e_aboutwe = res.data.e_aboutwe
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
	.about-page {
		.about-box {
			padding: 30rpx;

			.about-logo {
				width: 26%;
				padding: 30rpx 0;
				margin: 0 auto;
			}

			.about-article {
				font-size: 28rpx;
				line-height: 1.6;
			}
		}
	}
</style>