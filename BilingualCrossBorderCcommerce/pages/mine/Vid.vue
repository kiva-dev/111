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
					<view class="pic-info">
						<view class="tit">{{$t('user.vid.zjzm')}}</view>
						<view class="li-con" @click="chooseImage">
							<view class="li-img" v-if="front_image">
								<image class="img" :src="front_image? front_image : baseUrl+front_image"></image>
							</view>
							<view class="li-img" v-else>
								<view class="icon">
									<image class="img" src="@/static/images/mine/profile_set_avatar.png"></image>
								</view>
								<view class="t">{{$t('user.vid.upload')}}</view>
							</view>
						</view>
					</view>

					<view class="pic-info">
						<view class="tit">{{$t('user.vid.zjfm')}}</view>
						<view class="li-con" @click="chooseImages">
							<view class="li-img" v-if="back_image">
								<image class="img" :src="back_image ? back_image : baseUrl+back_image">
								</image>
							</view>
							<view class="li-img" v-else>
								<!-- <image class="img" src="../../static/images/mine/id2.png"></image> -->
								<view class="icon">
									<image class="img" src="@/static/images/mine/profile_set_avatar.png"></image>
								</view>
								<view class="t">{{$t('user.vid.upload')}}</view>
							</view>
						</view>
					</view>

					<view class="pic-info">
						<view class="tit">{{$t('user.vid.hand_card')}}</view>
						<view class="li-con" @click="chooseImageByHand">
							<view class="li-img" v-if="hand_image">
								<image class="img" :src="hand_image ? hand_image : baseUrl+hand_image">
								</image>
							</view>
							<view class="li-img" v-else>
								<!-- <image class="img" src="../../static/images/mine/id2.png"></image> -->
								<view class="icon">
									<image class="img" src="@/static/images/mine/profile_set_avatar.png"></image>
								</view>
								<view class="t">{{$t('user.vid.upload')}}</view>
							</view>
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

		<!--未实名弹框-->
		<u-popup :show="showBindPhone" mode="center" bgColor="transparent">
			<view class="bind-phone">
				<view class="tit">{{$t('mine.bind_phone')}}</view>
				<view class="tit-info">{{$t('mine.real_need_bind_phone')}}</view>
				<view class="email-input">
					<view class="phone-qh" @click="navClick()">{{mobile_area_code}}
						<image src="/static/images/mine/btm.png"></image>
					</view>
					<view class="email-input-info">
						<u--input :placeholder="$t('login.qsrsjh')" border="none" v-model="mobile" />
					</view>
				</view>
				<view class="bind-btn">
					<view class="email-input" :class="showErr?'errinfo':''" style="width: 352rpx;margin: 0;">
						<view class="email-input-info" style="width: 320rpx;margin: 0 auto;">
							<u--input :placeholder="$t('user.Vemail.qsryzm')" border="none" v-model="mobile_code" />
						</view>
					</view>
					<view class="input-btn" @click="verifyEmailOrPhone()">{{mobile_txt}}{{show_mobile_time?'S':''}}
					</view>
				</view>
				<view class="tip" v-if="showErr">{{$t('new.yzmcw')}}</view>

				<view class="btn" :style="showErr?'margin-top: 36rpx;':''">
					<view class="cancel" @click="toBack()">{{$t('home.search.query')}}</view>
					<view class="confirm" @click="$noMultipleClicks(addBindPhone)">{{$t('auction.detail.btnsub')}}
					</view>
				</view>

			</view>
		</u-popup>

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
				hand_image: '', // 手持身份证
				baseUrl: this.$baseUrl,
				status: '',
				refuse_reason: '',
				isShopCont: false, // 商品详情显示中文还是英文
				user: {},
				showBindPhone: false,
				mobile_area_code: '',
				mobile: '',
				mobile_code: '',
				mobile_txt: this.$t('mine.send_code'),
				show_mobile_time: false,
				showErr: false
			}
		},
		onShow() {
			if (uni.getStorageSync('phoneCont')) {
				this.mobile_area_code = JSON.parse(uni.getStorageSync('phoneCont')).code
			} else {
				this.mobile_area_code = '+60'
				let title = {
					city: this.$t('phone.mlxy'),
					code: "+60",
					"sou": "M"
				}
				uni.setStorageSync('phoneCont', JSON.stringify(title))
			}
		},
		mounted() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false

			this.$http.post(this.$apiObj.MineInfo).then(res => {
				if (!res.data.mobile) {
					this.showBindPhone = true
				}
			})

			// 实名认证
			this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
				if (res.code == 1) {
					if (res.data) {
						this.index = res.data.type - 1 || 0
						this.firstName = res.data.firstName
						this.lastName = res.data.lastName
						this.idcard = res.data.idcard
						this.front_image = res.data.front_image
						this.hand_image = res.data.hand_image
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
			addBindPhone() {
				if (!this.mobile) {
					return uni.showToast({
						title: this.$t('login.qsrsjhm'),
						icon: 'none',
						duration: 3000
					})
				}
				if (!this.mobile_code) {
					return uni.showToast({
						title: this.$t('user.phone.qsryzm'),
						icon: 'none',
						duration: 3000
					})
				}

				this.$http.post(this.$apiObj.MineChangeMobile, {
					code: this.mobile_code, // 手机号验证码
					mobile: this.mobile, // 手机号码
					mobile_area_code: this.mobile_area_code.slice(1), // 手机号区域码 
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('mine.bind_phone_success'),
							icon: 'none',
							duration: 3000
						})
						this.showBindPhone = false
					} else {
						this.showErr = true
					}
				})
			},
			verifyEmailOrPhone() {
				if (this.show_mobile_time) return
				if (!this.mobile) {
					return uni.showToast({
						title: this.$t('login.qsrsjhm'),
						icon: 'none',
						duration: 3000
					})
				}
				this.$http.post(this.$apiObj.verifyEmailOrPhone, {
					email: '',
					mobile_area_code: this.mobile_area_code.slice(1),
					mobile: this.mobile
				}).then(res => {
					if (res.data) {
						uni.showToast({
							title: this.$t('register.verify_phone'),
							icon: 'none',
							duration: 3000
						})
					} else {
						this.getSendCode()
					}
				})
			},
			getSendCode() {
				if (this.show_mobile_time) return

				uni.showLoading({
					title: this.$t('login.qq'),
					mask: true
				});

				this.$http.post(this.$apiObj.LoginSendMobileCode, {
					mobile: this.mobile,
					mobile_area_code: this.mobile_area_code.slice(1)
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('login.fscg'),
							icon: 'none'
						})
						this.timeDone()
					}
					uni.hideLoading();
				})

			},
			timeDone() {
				this.mobile_txt = 119
				this.show_mobile_time = true
				let timer = setInterval(() => {
					if (this.mobile_txt > 1) {
						this.mobile_txt -= 1
					} else {
						this.mobile_txt = this.$t('mine.send_code')
						this.show_mobile_time = false
						clearInterval(timer)
					}
				}, 1000)
			},
			navClick() {
				uni.navigateTo({
					url: '/pages/public/ownership'
				})
			},
			toBack() {
				uni.navigateBack()
			},
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

			// 上传手持身份证图片
			chooseImageByHand() {
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
						this.uploadImgByHand(this.resImg)
					}
				})
			},
			//-----------------------------------------------结束
			uploadImgByHand(tempFilePaths) {
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
							this.hand_image = data.data.url
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
					idcard: this.idcard, // 身份证号
					front_image: this.front_image, // 身份证正面
					back_image: this.back_image, // 身份证反面
					hand_image: this.hand_image, //手持身份证
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

		.bind-phone {
			width: 622rpx;
			padding: 40rpx 0;
			background: #fff;
			border-radius: 20rpx;

			.tit {
				width: 100%;
				font-size: 28rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}

			.tit-info {
				width: 486rpx;
				font-size: 24rpx;
				color: rgb(153, 153, 153);
				text-align: center;
				margin: 24rpx auto 32rpx auto;
			}

			.bind-btn {
				width: 542rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 auto;

				.input-btn {
					width: 174rpx;
					height: 76rpx;
					line-height: 76rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: #fff;
					text-align: center;
					background: rgb(10, 198, 142);
					border-radius: 8rpx;
				}
			}

			.tip {
				font-size: 24rpx;
				color: rgb(255, 57, 57);
				margin: 20rpx 0 0 40rpx;
			}

			.email-input {
				width: 542rpx;
				height: 76rpx;
				display: flex;
				align-items: center;
				background: rgb(241, 241, 241);
				border-radius: 8rpx;
				margin: 0 auto 32rpx auto;

				.phone-qh {
					width: 140rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 16rpx;
						height: 16rpx;
						margin-left: 8rpx;
					}
				}

				.email-input-info {
					width: 390rpx;
				}

				.pwd {
					display: block;
					width: 36rpx;
					height: 36rpx;
					margin-left: 10rpx;
				}
			}

			.btn {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 80rpx;

				view {
					width: 256rpx;
					height: 68rpx;
					line-height: 68rpx;
					font-size: 28rpx;
					font-weight: 500;
					text-align: center;
					border-radius: 68rpx;
					margin: 0 14rpx;
				}

				.cancel {
					color: rgb(10, 198, 142);
					box-sizing: border-box;
					border: 2rpx solid rgb(10, 198, 142);
				}

				.confirm {
					color: #fff;
					background: rgb(10, 198, 142);
				}

			}

			.errinfo {
				box-sizing: border-box;
				border: 2rpx solid rgb(255, 57, 57);
				background: rgba(255, 57, 57, 0.1);
			}

		}

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
					// display: flex;
					// flex-wrap: wrap;
					// justify-content: center;
					margin: 30rpx 0;
					
					.pic-info{
						display: flex;
						align-items: center;
						
						.tit{
							width: 220rpx;
							font-size: 24rpx;
							font-weight: 700;
							color: rgb(51, 51, 51);
							margin-left: 60rpx;
						}
					}

					.li-con {
						margin: 0 8rpx 32rpx 24rpx;

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

							.t {
								position: absolute;
								left: 50%;
								bottom: 40rpx;
								transform: translate(-50%, 0);
								font-size: 24rpx;
								color: rgb(10, 198, 142);
							}

							.icon {
								position: absolute;
								top: 56rpx;
								left: 50%;
								transform: translate(-50%, 0);
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