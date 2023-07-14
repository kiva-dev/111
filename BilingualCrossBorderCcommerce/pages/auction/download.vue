<template>
	<view class="address-page">
		<uni-header :title="$t('top.download')"></uni-header>
		<view class="address-null" >
			<view class="null-img">
				<image src="@/static/images/new-index/downloadImg.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="address-fixed">
			<a href="https://kjtest.ysxrj.cn/uploads/k.apk" download="111" style="text-decoration:none;">
				<view class="fixed-con">
					<button class="public-btn" style="background: rgb(10, 198, 142);"
						@click="navClick('add')">
						<image class="fixed-icon" src="/static/icon/download-Android.png"></image>
						Android
					</button>
				</view>
			</a>
			<view class="fixed-con">
				<button class="public-btn" style="background: rgb(204,204,204);">
					<image class="fixed-icon" style="margin-top:-5px" src="/static/icon/download-IOS.png"></image>
					IOS (Stay tuned)
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addList: [],
				page: 1,
			}
		},
		onShow() {
		},
		onReachBottom() {
		},
		methods: {
			onaddClick(item) {
				this.$http.post(this.$apiObj.AddressEdit, {
					mobile_area_code: item.mobile_area_code, // 手机号区域编码
					mobile: item.mobile, // 手机号码
					detail: item.detail, // 收货地址
					is_default: 1, // 1默认，0不默认
					name: item.name, // 收货人
					address_id: item.id
				}).then(res => {
					if (res.code == 1) {
						setTimeout(() => {
							uni.navigateBack();
						}, 1000);
					}
				})
			},
			onEditClick(item) {
				uni.navigateTo({
					url: './edit?conter=' + JSON.stringify(item)
				})
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
		},
	}
</script>
<style lang="less" scoped>
	.address-page {
		width: 100%;
		height: 100vh;
		padding-bottom: 160rpx;
		box-sizing: border-box;
		background: #f8f8f8;

		.address-null {
			box-sizing: border-box;
			text-align: center;

			.null-img {
				width: 100%;
				height: 100%;
				margin: 0 auto;

				image {
					width: 100%;
				}
			}

			p {
				margin-top: 24rpx;
				color: rgb(153, 153, 153);
				font-size: 28rpx;
			}
		}

		.address-fixed {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 180rpx;
			z-index: 99;
			.fixed-con{
				padding: 32rpx;
				box-sizing: border-box;
				.public-btn{
					display: flex;
					justify-content:center;
					align-items: center;
				}
			}
			.fixed-icon{
				width: 55rpx;
				height: 55rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>