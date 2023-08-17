<template>
	<view class="bonus_top">
		<!--赠金-->
		<u-overlay :show="show" :opacity="0.8">
			<view class="bonus-info">
				<view class="bonus">
					<view class="bonus-tit">{{$t('bonus.gifts')}}</view>
					<view class="bonus-name">{{$t('bonus.snhl')}}</view>
					<view class="bonus-price"><text style="font-size: 40rpx;margin-right: 8rpx;">RM</text> {{price*1}}
					</view>
					<view class="bonus-time">{{$t('bonus.yxq')}}</view>
					<view class="bonus-btn" @click="toList()">{{$t('bonus.cf')}}</view>
				</view>
				<image src="/static/Bell/close.png" class="close" @click="show=false"></image>
			</view>
		</u-overlay>

		<!--指引-->
		<u-overlay :show="showOperate">
			<view class="operate">
				<view class="operate-btn" @click="setOperate()">
					<view>{{isShopCont?'Skip Guidance':'跳过指引'}}</view>
					<image src="/static/images/luck/luck-right.png"></image>
				</view>
				<template v-if="isShopCont">
					<image src="/static/components/start_en.png" class="step" v-if="step==0" @click="nextStep()">
					</image>
					<image src="/static/components/step1_en.png" class="step" v-else-if="step==1" @click="nextStep()">
					</image>
					<image src="/static/components/step2_en.png" class="step" v-else-if="step==2" @click="nextStep()">
					</image>
					<image src="/static/components/step3_en.png" class="step" v-else-if="step==3" @click="nextStep()">
					</image>
					<image src="/static/components/step4_en.png" class="step" v-else-if="step==4" @click="nextStep()">
					</image>
				</template>
				<template v-else-if="!isShopCont">
					<image src="/static/components/start_cn.png" class="step" v-if="step==0" @click="nextStep()">
					</image>
					<image src="/static/components/step1_cn.png" class="step" v-else-if="step==1" @click="nextStep()">
					</image>
					<image src="/static/components/step2_cn.png" class="step" v-else-if="step==2" @click="nextStep()">
					</image>
					<image src="/static/components/step3_cn.png" class="step" v-else-if="step==3" @click="nextStep()">
					</image>
					<image src="/static/components/step4_cn.png" class="step" v-else-if="step==4" @click="nextStep()">
					</image>
				</template>

			</view>
		</u-overlay>

		<!--更新-->
		<!-- #ifdef APP-PLUS -->
		<u-overlay :show="showUpdate">
			<view class="update_info">
				<view class="update_app">
					<image src="/static/components/update.png"></image>
					<view class="version">{{$t('version.new_version')}} V{{version}}</view>
					<view class="des">
						{{isShopCont?'Update Content' : '更新内容'}}：<br>
						{{isShopCont ? version_desc_en : version_desc}}
					</view>
					<template>
						<a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
							style="text-decoration:none;">
							<view class="btn">{{$t('version.update_now')}}</view>
						</a>
					</template>
				</view>
				<image src="/static/Bell/close.png" class="close_btn" @click="updateClose()"></image>
			</view>
		</u-overlay>
		<!-- #endif -->
		

	</view>
</template>

<script>
	export default {
		props: ['update'],
		data() {
			return {
				show: false,
				isShopCont: true,
				price: 0,

				showOperate: false,
				step: 0,

				showUpdate: false,
				version: '',
				version_desc:'',
				version_desc_en:''
			}
		},
		mounted() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
		},
		created() {
			this.getVersion()
			// #ifdef H5
			if (uni.getStorageSync('token')) {
				this.getInfo()
			}
			// #endif
			// #ifndef H5
			if (this.update && this.version != this.$version) {
				this.showUpdate = true
			} else {
				if (uni.getStorageSync('token')) {
					this.getInfo()
				}
			}
			// #endif
			
		},
		methods: {
			updateClose(){
				this.showUpdate=false
				if (uni.getStorageSync('token')) {
					this.getInfo()
				}
			},
			nextStep() {
				if (this.step == 4) {
					this.setOperate()
					return
				}
				this.step += 1
			},
			setOperate() {
				this.updateOperate()
			},
			toList() {
				uni.navigateTo({
					url: '/pages/auction/auctionT?id=1&source=bonus'
				})
				this.show = false
			},
			getVersion() {
				this.$http.post(this.$apiObj.IndexSetting, {
					fields: 'version_auction,version_auction_desc,version_auction_desc_en'
				}).then(res => {
					if (res.code == 1) {
						this.version = res.data.version_auction
						this.version_desc = res.data.version_auction_desc
						this.version_desc_en = res.data.version_auction_desc_en
					}
				})
			},
			//修改操作指引是否已读
			updateOperate() {
				this.$http.post(this.$apiObj.MineUpdateOperate).then(res => {
					if (res.code == 1) {
						this.showOperate = false
						this.getBonusRecord()
					}
				})
			},
			getInfo() {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (!res.data.is_read_operation_guide) {
						this.showOperate = true
					} else {
						this.getBonusRecord()
					}
				})
			},
			getBonusRecord() {
				this.$http.post(this.$apiObj.BonusRecord, {
					pagenum: 1
				}).then(res => {
					if (res.data.list.data.length > 0) {
						this.show = true
						this.price = res.data.list.data[0].money
					}

				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.bonus_top {

		//app更新
		.update_info {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.update_app {
				position: relative;
				width: 590rpx;
				padding: 220rpx 0 40rpx 0;
				background: rgb(255, 255, 255);
				border-radius: 24rpx;

				image {
					position: absolute;
					top: -120rpx;
					left: 50%;
					transform: translate(-50%, 0);
					display: block;
					width: 376rpx;
					height: 334rpx;
				}

				.version {
					width: 100%;
					font-size: 32rpx;
					color: rgb(10, 198, 142);
					text-align: center;
				}

				.des {
					width: 494rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					margin: 40rpx auto 64rpx auto;
				}

				.btn {
					width: 320rpx;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 32rpx;
					font-weight: bold;
					color: rgb(255, 255, 255);
					text-align: center;
					background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);
					border-radius: 88rpx;
					margin: 0 auto;
				}

			}

			.close_btn {
				display: block;
				width: 64rpx;
				height: 64rpx;
				margin: 40rpx auto 0 auto;
			}

		}

		.operate {
			width: 750rpx;
			min-height: 100vh;

			.step {
				width: 750rpx;
				height: 100%;
			}

			.operate-btn {
				position: fixed;
				top: 120rpx;
				right: 48rpx;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				z-index: 10;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-left: 16rpx;
				}
			}
		}

		.bonus-info {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.close {
			display: block;
			width: 64rpx;
			height: 64rpx;
			margin: 40rpx auto;
		}

		.bonus {
			position: relative;
			width: 750rpx;
			height: 640rpx;
			background: url('/static/components/Bonus_bj.png')no-repeat;
			background-size: 750rpx 640rpx;

			.bonus-tit {
				width: 100%;
				background: linear-gradient(135.00deg, rgb(255, 181, 141), rgb(255, 83, 56));
				-webkit-background-clip:
					text;
				-webkit-text-fill-color:
					transparent;
				background-clip:
					text;
				text-fill-color:
					transparent;
				font-family: SF Pro Display;
				font-size: 44rpx;
				font-weight: 700;
				line-height: 52rpx;
				letter-spacing: 0rpx;
				text-align: center;
			}

			.bonus-name {
				position: absolute;
				top: 162rpx;
				left: 218rpx;
				width: 216rpx;
				font-family: SF Pro Display;
				font-size: 28rpx;
				font-weight: bold;
				text-align: center;
				background: linear-gradient(90.00deg, rgb(249, 118, 48), rgb(244, 67, 66));
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.bonus-price {
				position: absolute;
				top: 232rpx;
				left: 154rpx;
				width: 346rpx;
				font-size: 68rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				text-align: center;
			}

			.bonus-time {
				position: absolute;
				top: 358rpx;
				left: 196rpx;
				width: 260rpx;
				font-size: 20rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.bonus-btn {
				position: absolute;
				left: 202rpx;
				bottom: 0;
				width: 346rpx;
				height: 90rpx;
				line-height: 90rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				text-align: center;

			}

		}
	}
</style>