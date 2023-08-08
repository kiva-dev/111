<template>
	<view class="id-page">
		<view class="id-box">
			<view class="li">
				<view class="label">{{$t('user.vid.zjlx')}}</view>
				<view class="li-r" v-if="status==='0'">
					<!-- <picker @change="bindPickerChange" :value="index" :range="array"> -->
					<view class="flex flex-center pick">
						<text>{{array[index]}}</text>
						<view class="more">
							<image class="img" src="../../static/images/mine/more1.png"></image>
						</view>
					</view>
					<!-- </picker> -->
				</view>
				<view class="li-r" v-else>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="flex flex-center pick">
							<text>{{array[index]}}</text>
							<view class="more">
								<image class="img" src="../../static/images/mine/more1.png"></image>
							</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="li">
				<view class="label">{{$t('user.vid.name')}}</view>
				<input class="input" v-model="firstName" v-if="status==='0'" disabled placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrxm')" />
				<input class="input" v-model="firstName" v-else placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrxm')" />
			</view>
			<!-- <view class="li">
				<view class="label">{{$t('user.vid.xs')}}</view>
				<input class="input" v-model="lastName" v-if="status==='0'" disabled placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrxs')" />
				<input class="input" v-model="lastName" v-else placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrxs')" />
			</view> -->
			<view class="li" v-if="index==0">
				<view class="label">{{$t('user.vid.sfzh1')}}</view>
				<input class="input" v-model="idcard" v-if="status==='0'" disabled placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrsfzh')" />
				<input class="input" v-model="idcard" v-else placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrsfzh')" />
			</view>
			<view class="li" v-if="index==1">
				<view class="label">{{$t('user.vid.jszh')}}</view>
				<input class="input" v-model="idcard" v-if="status==='0'" disabled placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrjszh')" />
				<input class="input" v-model="idcard" v-else placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrjszh')" />
			</view>
			<view class="li" v-if="index==2">
				<view class="label">{{$t('user.vid.hzh')}}</view>
				<input class="input" v-model="idcard" v-if="status==='0'" disabled placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrhzh')" />
				<input class="input" v-model="idcard" v-else placeholder-class="color-999"
					:placeholder="$t('user.vid.qsrhzh')" />
			</view>
			<view class="id-pic">
				<view class="label">{{$t('user.vid.sczz')}}</view>
				<view class="pic-li">
					<view class="li-con" @click="chooseImage">
						<view class="li-img" v-if="front_image">
							<image class="img"
								:src="front_image.startsWith('http') ? front_image : baseUrl+front_image"></image>
						</view>
						<view class="li-img" v-else>
							<!-- <image class="img" src="../../static/images/mine/id1.png"></image> -->
							<view class="icon">
								<image class="img" src="@/static/images/mine/profile_set_avatar.png"></image>
							</view>
							<view class="t">{{$t('user.vid.zjzm')}}</view>
						</view>
						
					</view>
					<view class="li-con" @click="chooseImages">
						<view class="li-img" v-if="front_image">
							<image class="img" :src="back_image.startsWith('http') ? back_image : baseUrl+back_image">
							</image>
						</view>
						<view class="li-img" v-else>
							<!-- <image class="img" src="../../static/images/mine/id2.png"></image> -->
							<view class="icon">
								<image class="img" src="@/static/images/mine/profile_set_avatar.png"></image>
							</view>
							<view class="t">{{$t('user.vid.zjfm')}}</view>
						</view>
						
					</view>
				</view>
				<view class="id-tip">
					<view class="icon">
						<image class="img" src="../../static/images/mine/tip.png"></image>
					</view>
					<view class="c">{{$t('user.vid.wenzi')}}</view>
				</view>
			</view>
			<view class="id-pic" style="padding:0" v-if="status=='-1'">
				<view class="label">{{$t('user.vid.wtgyy')}}</view>
				<view class="pic-li">{{refuse_reason}} </view>
			</view>
		</view>
		<!--id-fixed start-->
		<view class="id-fixed">
			<view class="fixed-con">
				<button class="public-btn" style="background: rgb(10, 198, 142);"
					v-if="status==='0'">{{$t('user.vid.dsh')}}</button>
				<!-- <template v-else-if="status==='1'"></template> -->
				<button class="public-btn" style="background: rgb(10, 198, 142);" v-else
					@click.stop="$noMultipleClicks(onBtnSub)">{{$t('user.vid.qrtj')}}</button>
			</view>
		</view>
		<!--id-fixed end-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				title: 'picker',
				array: [this.$t('user.vid.sfzh'), this.$t('user.vid.jszh'), this.$t('user.vid.hzh')],
				index: 0,
				firstName: '', // 名字
				lastName: '', // 姓氏
				idcard: '', // 身份证号
				front_image: '', // 身份证正面
				back_image: '', // 身份证反面
				baseUrl: this.$baseUrl,
				status: '',
				refuse_reason: '',
				isShopCont: false, // 商品详情显示中文还是英文
			}
		},
		mounted() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			// 实名认证
			this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
				if (res.code == 1) {
					if (res.data) {
						console.log(res.data)
						this.index = res.data.type - 1 || 0
						this.firstName = res.data.firstName
						this.lastName = res.data.lastName
						this.idcard = res.data.idcard
						this.front_image = res.data.front_image
						this.back_image = res.data.back_image
						this.status = res.data.status || '1'
						if (this.isShopCont) {
							this.refuse_reason = this.getCaption(res.data.refuse_reason, 1) ? this.getCaption(res
								.data.refuse_reason, 1) : res.data.refuse_reason
						} else {
							this.refuse_reason = this.getCaption(res.data.refuse_reason, 0) ? this.getCaption(res
								.data.refuse_reason, 0) : res.data.refuse_reason
						}
					}
				}
			})
		},
		methods: {
			getCaption(str, state) {
				if (state == 1) {
					var indexs = str.indexOf("|")
					str = str.substring(indexs + 1, str.length);
				} else {
					var index = str.indexOf("|")
					str = str.substring(0, index);
				}
				return str;
			},
			// 上传图片
			chooseImage() {
				if (this.status === 0 && this.firstName) return
				this.show = false
				uni.chooseImage({
					count: 1,
					size: 10 * 1000000,
					sizeType: ['compressed'],
					success: (res) => {
						uni.showLoading({
							title: this.$t('user.vid.scz'),
							mask: true
						});
						this.resImg = res.tempFilePaths[0] //这就是要的blod
						this.uploadImg(this.resImg)
					}
				})
			},
			//-----------------------------------------------结束
			uploadImg(tempFilePaths) {
				// console.log(tempFilePaths, "触发上传接口")
				uni.uploadFile({
					url: this.$baseUrl + 'api/Common/upload',
					filePath: tempFilePaths,
					name: 'file',
					header: {
						token: uni.getStorageSync('token'),
					},
					success: res => {
						var data = JSON.parse(res.data);
						if (data.code == 200) {
							this.front_image = data.data.url
							uni.showToast({
								title: this.$t('user.vid.sccg'),
								icon: 'none',
								duration: 1000
							});
						} else {
							uni.showToast({
								title: this.$t('user.vid.scsb'),
								icon: 'none',
								duration: 1000
							});
						}
					}
				});
			},
			// 上传图片
			chooseImages() {
				if (this.status === 0 && this.firstName) return
				this.show = false
				uni.chooseImage({
					count: 1,
					size: 10 * 1000000,
					sizeType: ['compressed'],
					success: (res) => {
						uni.showLoading({
							title: this.$t('user.vid.scz'),
							mask: true
						});
						this.resImg = res.tempFilePaths[0] //这就是要的blod
						this.uploadImgs(this.resImg)
					}
				})
			},
			//-----------------------------------------------结束
			uploadImgs(tempFilePaths) {
				// console.log(tempFilePaths, "触发上传接口")
				uni.uploadFile({
					url: this.$baseUrl + 'api/Common/upload',
					filePath: tempFilePaths,
					name: 'file',
					header: {
						token: uni.getStorageSync('token'),
					},
					success: res => {
						var data = JSON.parse(res.data);
						if (data.code == 200) {
							this.back_image = data.data.url
							uni.showToast({
								title: this.$t('user.vid.sccg'),
								icon: 'none',
								duration: 1000
							});
						} else {
							uni.showToast({
								title: this.$t('user.vid.scsb'),
								icon: 'none',
								duration: 1000
							});
						}
					}
				});
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
			},
			onBtnSub() {
				if (!this.firstName) return uni.showToast({
					title: this.$t('user.vid.qsrxm'),
					icon: 'none'
				})
				// if (!this.lastName) return uni.showToast({
				// 	title: this.$t('user.vid.qsrxs'),
				// 	icon: 'none'
				// })
				if (!this.idcard) return uni.showToast({
					title: this.$t('user.vid.qsrsfzh'),
					icon: 'none'
				})
				if (!this.front_image) return uni.showToast({
					title: this.$t('user.vid.qszmczj'),
					icon: 'none'
				})
				if (!this.back_image) return uni.showToast({
					title: this.$t('user.vid.qsczjfm'),
					icon: 'none'
				})
				this.$http.post(this.$apiObj.MineRealAuth, {
					firstName: this.firstName, // 名字
					lastName: this.lastName, // 姓氏
					idcard: this.idcard, // 身份证号
					front_image: this.front_image, // 身份证正面
					back_image: this.back_image, // 身份证反面
					type: this.index + 1, // 1身份证,2驾驶证，3护照
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.vid.tjcg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.id-page {
		padding-bottom: 200rpx;

		.id-box {
			padding: 0 30rpx;

			.label {
				font-size: 28rpx;
				font-weight: bold;
			}

			.li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 36rpx 0;
				border-bottom: 1px solid #f5f5f5;

				.li-r {
					display: flex;
					align-items: center;

					.gray {
						color: #999;
						font-size: 28rpx;
					}

					.red {
						font-size: 28rpx;
						color: rgb(255, 78, 47);
					}

					.more {
						width: 12rpx;
						height: 21rpx;
						margin-left: 20rpx;
					}
				}

				.input {
					flex: 1;
					text-align: right;
					font-size: 28rpx;
					color: rgb(153, 153, 153);
				}
			}

			.id-pic {
				padding: 36rpx 0;

				.pic-li {
					display: flex;
					justify-content: space-between;
					margin: 30rpx 0;

					.li-con {
						.t {
							font-size: 22rpx;
							margin-top: 20rpx;
							text-align: center;
						}

						.icon {
							width: 64rpx;
							height: 64rpx;
						}

						.li-img {
							border: 1rpx dashed rgba(10, 198, 142, 0.5);
							width: 328rpx;
							height: 202rpx;
							position: relative;
							background: rgba(10, 198, 142, 0.08);
							border-radius: 16rpx;
							
							.t{
								position: absolute;
								left: 50%;
								bottom: 56rpx;
								transform: translate(-50%,0);
								font-size: 24rpx;
								color: rgb(10, 198, 142);
							}
							
							.icon{
								position: absolute;
								top: 56rpx;
								left: 50%;
								transform: translate(-50%,0);
							}
							
						}
					}
				}

				.id-tip {
					display: flex;
					font-size: 22rpx;
					line-height: 30rpx;
					display: flex;
					color: #999;

					.icon {
						width: 27rpx;
						height: 27rpx;
						min-width: 27rpx;
						max-width: 27rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.id-fixed {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;

			.fixed-con {
				padding: 50rpx 30rpx;
			}
		}
	}
</style>