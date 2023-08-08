<template>
	<view class="address-page">
		<uni-header :title="$t('top.xzshdz')"></uni-header>
		<view class="address-box" v-if="addList && addList.length>0">
			<view class="address-li" v-for="item in addList" :key="item.id" @click="onaddClick(item)">
				<view class="address-li-user">
					<view class="user-info">
						<view class="user-info-icon">
							<image src="@/static/images/new-index/address.png" mode="widthFix"></image>
						</view>
						<view class="user-info-name">{{item.name}}</view>
						<view class="user-info-phone">{{item.mobile}}</view>
					</view>
					<view class="user-edit" @click.stop="onEditClick(item)">{{$t('user.address.edit')}}</view>
				</view>
				<view class="address-li-detail">
					<view class="detail-container">{{isEnglish ? item.delivery_area_name_en : item.delivery_area_name }}</view>
					<view class="detail-container">{{item.detail}}</view>
					<view class="detail-defalt" v-if="item.is_default === '1'">{{$t('user.address.default')}}</view>
				</view>
			</view>
		</view>
		<view class="address-null" v-else>
			<view class="null-img">
				<image src="@/static/images/mine/address_icon_null.png" mode="widthFix"></image>
			</view>
			<p>{{$t('user.address.zwdz')}}~</p>
		</view>
		<view class="address-fixed">
			<view class="fixed-con">
				<button class="public-btn" style="background: rgb(10, 198, 142);"
					@click="navClick('add')">{{$t('user.address.addxdz')}}</button>
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
				isEnglish:uni.getStorageSync('locale') !== 'zh-Hans'
			}
		},
		onShow() {
			this.getAddressList();
		},
		onReachBottom() {
			this.page++;
			this.onAddressList();
		},
		methods: {
			getAddressList() {
				this.$http.post(this.$apiObj.AddressList, {
					page: this.page,
					pagenum: 10,
				}).then(res => {
					if (res.code == 1) {
						let arr = res.data.data;
						if (this.page > 1) {
							this.addList = this.addList.concat(arr);
						} else {
							this.addList = arr;
						}
					}
				})
			},
			onaddClick(item) {
				if(!item.delivery_area_id){
					uni.showToast({
						title: this.$t('user.address.xzyjdq'),
						icon: 'none'
					})
					return
				}
				this.$http.post(this.$apiObj.AddressEdit, {
					mobile_area_code: item.mobile_area_code, // 手机号区域编码
					mobile: item.mobile, // 手机号码
					detail: item.detail, // 收货地址
					is_default: 1, // 1默认，0不默认
					name: item.name, // 收货人
					delivery_area_id: item.delivery_area_id,  // 邮寄地区
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
		padding-bottom: 160rpx;
		box-sizing: border-box;

		.address-box {
			width: 100%;

			.address-li {
				padding: 32rpx;
				box-sizing: border-box;
				
				.address-li-user {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.user-info {
						display: flex;
						align-items: center;
						
						.user-info-icon {
							width: 48rpx;
							
							image {
								width: 100%;
							}
						}
						
						.user-info-name {
							margin-left: 24rpx;
							color: rgb(51, 51, 51);
							font-size: 32rpx;
							font-weight: 600;
						}
						
						.user-info-phone {
							margin-left: 24rpx;
							color: rgb(102, 102, 102);
							font-size: 28rpx;
						}
					}
					
					.user-edit {
						color: rgb(10, 198, 142);
						font-size: 28rpx;
					}
				}
				
				.address-li-detail {
					padding: 16rpx 72rpx 32rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid rgb(204, 204, 204);
					
					.detail-container {
						color: rgb(102, 102, 102);
						font-size: 24rpx;
						line-height: 44rpx;
					}
					
					.detail-defalt {
						margin-top: 20rpx;
						padding: 6rpx 12rpx;
						box-sizing: border-box;
						border: 1rpx solid rgb(10, 198, 142);
						border-radius: 8rpx;
						color: rgb(10, 198, 142);
						font-size: 20rpx;
						display: inline-block;
					}
				}
			}
		}

		.address-null {
			padding: 200rpx 30rpx;
			box-sizing: border-box;
			text-align: center;

			.null-img {
				width: 480rpx;
				height: 480rpx;
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
			background: #ffffff;
			box-shadow: 0 0 20rpx 0 rgba(153, 153, 153, 0.1);
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 99;

			.fixed-con {
				padding: 32rpx;
				box-sizing: border-box;
			}
		}
	}
</style>