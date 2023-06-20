<template>
	<view class="address-page">
		<!--address-box start-->
		<view class="address-box" v-if="addList.length>0">
			<view v-for="item in addList" :key="item.id" class="address-li" @click="onaddClick(item)">
				<view class="li-fl">{{item.name.slice(0, 1)}}</view>
				<view class="li-mid">
					<view class="mid-h">
						<text class="name">{{item.name}}</text>
						<text class="phone">{{item.mobile}}</text>
					</view>
					<view class="c">{{item.detail}}</view>
				</view>
				<view class="edit-btn" @click.stop="onEditClick(item)">{{$t('user.address.edit')}}</view>
			</view>
		</view>
		<!--address-box end-->
		<!--address-null start-->
		<view class="address-null" v-else>
			<view class="null-img">
				<image src="@/static/images/mine/address_icon_null.png" mode="widthFix"></image>
			</view>
			<p>{{$t('user.address.zwdz')}}~</p>
		</view>
		<!--address-null end-->
		<!--address-fixed start-->
		<view class="address-fixed">
			<view class="fixed-con">
				<button class="public-btn" style="background: rgb(10, 198, 142);"
					@click="navClick('add')">{{$t('user.address.addxdz')}}</button>
			</view>
		</view>
		<!--address-fixed end-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addList: [], // 地址列表
				totalPageNum: 0, // 总条数
				page: 1, // 页码
				pagenum: 10, // 每页显示商品数目
			}
		},
		onShow() {
			// 地址列表
			this.onAddressList()
		},
		methods: {
			// 地址列表
			onAddressList() {
				this.$http.post(this.$apiObj.AddressList, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						this.totalPageNum = res.data.total
						this.addList = this.page == 1 ? res.data.data : [...this.addList, ...res.data.data]
					}
				})
			},
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
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				})
			},
			onEditClick(item) {
				uni.navigateTo({
					url: './edit?conter=' + JSON.stringify(item)
				})
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			if (this.totalPageNum <= this.page * this.pagenum) return
			this.page++
			this.onAddressList()
		}
	}
</script>
<style lang="less" scoped>
	.address-page {
		padding-bottom: 100rpx;

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

		.address-box {
			padding: 30rpx;

			.address-li {
				display: flex;
				align-items: center;
				border-bottom: 1px solid #f5f5f5;
				padding: 30rpx 150rpx 30rpx 0;
				position: relative;

				.edit-btn {
					font-size: 26rpx;
					color: #999;
					position: absolute;
					right: 30rpx;
					top: 50%;
					margin-top: -13rpx;
					line-height: 1;
				}

				.li-fl {
					width: 68rpx;
					height: 68rpx;
					background: #f6f6f6;
					border-radius: 50%;
					border-radius: 100%;
					text-align: center;
					line-height: 68rpx;
					font-size: 32rpx;
					min-width: 68rpx;
					max-width: 68rpx;
					margin-right: 34rpx;
				}

				.li-mid {
					flex: 1;

					.mid-h {
						display: flex;
						align-items: center;
					}

					.name {
						font-size: 28rpx;
						margin-right: 20rpx;
					}

					.phone {
						color: #999;
						font-size: 24rpx;
					}

					.c {
						font-size: 26rpx;
						line-height: 36rpx;
						margin-top: 15rpx;
					}
				}
			}
		}

		.address-fixed {
			background: #ffffff;
			z-index: 99;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);

			.fixed-con {
				padding: 15rpx 30rpx;
			}
		}
	}
</style>