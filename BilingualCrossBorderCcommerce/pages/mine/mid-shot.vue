<template>
	<view class="mid-shot">
		<view class="mid-shot-head">
			<image src="/static/images/new/left.png" @click="toReturn()"></image>
			<view>中拍分享</view>
		</view>

		<view class="mid-shot-des">
			<u--textarea v-model="des" border="none" height="200" placeholder="请输入内容" count
				maxlength="3000"></u--textarea>
		</view>

		<view class="mid-shot-info">
			<view class="mid-shot-info-imgs" v-for="(item,index) in urlList" :key="index">
				<image src="/static/images/close1.png" class="mid-shot-info-imgs-close" @click="deleteImg(item.id)">
				</image>
				<image :src="item.url" class="mid-shot-info-imgs-img"></image>
			</view>

			<view class="mid-shot-info-imgs" v-if="videoList.length>0">
				<image src="/static/images/close1.png" class="mid-shot-info-imgs-close" @click="videoList=[]"></image>
				<video :src="videoList[0]" class="mid-shot-info-imgs-img"></video>
			</view>

			<view class="mid-shot-info-des" @click="upLoadLunimg()" v-if="urlList.length<5">
				<image src="/static/images/new/xiangji.png"></image>
				<view>上传图片{{urlList.length}}/5</view>
			</view>

			<view class="mid-shot-info-des" @click="upLoadLunVideo()" v-if="videoList.length<1">
				<image src="/static/images/auth/sxj.png"></image>
				<view>上传视频{{videoList.length}}/1</view>
			</view>
		</view>

		<view class="mid-shot-btn" @click="showSuccess=true">提交</view>

		<u-popup :show="showSuccess" mode="center" bgColor="transparent" @close="showSuccess=false">
			<view class="shareShow">
				<image src="../../static/images/new/tck-xy.png" class="shareShow-img"></image>
				<view class="shareShow-info">
					<view class="shareShow-info-des">提交成功</view>
					<view class="shareShow-info-txt">敬请期待平台客服与您联系并发放奖励</view>
				</view>
			</view>
		</u-popup>


		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				des: '',
				showSuccess: false,
				fileList1: [],
				urlList: [],
				videoList: []
			}
		},
		methods: {
			toReturn() {
				uni.navigateBack()
			},
			upLoadLunimg() {
				let that = this
				uni.chooseImage({
					count: 5, //默认9
					success: function(res) {
						let tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach((em, i) => {
							uni.uploadFile({
								url: that.$url + that.$apiObj.CommonUpload,
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'token': uni.getStorageSync('token'),
								},
								success: (uploadFileRes) => {
									let res = JSON.parse(uploadFileRes.data)
									that.urlList.push({
										url: res.data.fullurl,
										id: that.urlList.length + 1
									})
									console.log(that.urlList)
								}
							})
						})
					}
				});
			},
			upLoadLunVideo() {
				let that = this
				uni.chooseVideo({
					success: function(res) {
						let tempFilePaths = res.tempFilePath
						console.log(tempFilePaths)
						uni.uploadFile({
							url: that.$url + that.$apiObj.CommonUpload,
							filePath: tempFilePaths,
							name: 'file',
							formData: {
								'token': uni.getStorageSync('token'),
							},
							success: (uploadFileRes) => {
								console.log('data', JSON.parse(uploadFileRes.data));
								let res = JSON.parse(uploadFileRes.data)
								that.videoList.push(res.fullurl)
							}
						})

					}
				});
			},
			deleteImg(id) {
				this.urlList = this.urlList.splice(id - 1, 1)
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.u-upload__wrap__preview {
		width: 200rpx;
		height: 200rpx;
	}

	.mid-shot {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.mid-shot-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: #fff;

			image {
				position: absolute;
				left: 20rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(255, 78, 47);
				text-align: center;
			}

		}

		.mid-shot-des {
			width: 710rpx;
			height: 400rpx;
			margin: 50rpx auto 40rpx auto;
			border-radius: 16rpx;
		}

		.mid-shot-info {
			width: 710rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			margin: 80rpx auto;

			.mid-shot-info-imgs {
				position: relative;
				width: 200rpx;
				height: 200rpx;
				background: #fff;
				border-radius: 16rpx;
				margin-right: 30rpx;
				margin-bottom: 20rpx;

				.mid-shot-info-imgs-close {
					position: absolute;
					top: 0;
					right: 0;
					width: 20rpx;
					height: 20rpx;
					z-index: 5;
				}

				.mid-shot-info-imgs-img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 180rpx;
					height: 180rpx;
				}

			}

			.mid-shot-info-des {
				width: 200rpx;
				height: 200rpx;
				text-align: center;
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: #fff;
				border-radius: 16rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;

				image {
					width: 100rpx;
					height: 100rpx;
				}

				view {
					font-size: 24rpx;
					color: rgb(190, 190, 190);
				}

			}
		}

		.mid-shot-btn {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(255, 78, 47);
			border-radius: 16rpx;
			margin: 200rpx auto 0 auto;
		}

		.shareShow {
			width: 686rpx;

			.shareShow-img {
				display: block;
				width: 600rpx;
				height: 372rpx;
				margin: 0 auto -50rpx auto;
			}

			.shareShow-info {
				width: 686rpx;
				padding: 40rpx 0 40rpx 0;
				background: rgb(255, 255, 255);
				border-radius: 16rpx;
				box-sizing: border-box;
				border: 2rpx solid rgb(255, 78, 47);

				.shareShow-info-des {
					width: 606rpx;
					font-size: 32rpx;
					font-weight: bold;
					color: rgb(44, 44, 44);
					text-align: center;
					margin: 0 auto;
				}

				.shareShow-info-txt {
					width: 606rpx;
					font-size: 28rpx;
					color: rgb(44, 44, 44);
					text-align: center;
					margin: 30rpx auto 0 auto;
				}

				.shareShow-info-btn {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 40rpx;

					view {
						width: 240rpx;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 32rpx;
						text-align: center;
						border-radius: 30rpx;
						margin: 0 20rpx;
					}

					.shareShow-info-btn-cancel {
						color: rgb(44, 44, 44);
						box-sizing: border-box;
						border: 2rpx solid rgb(255, 78, 47);
					}

					.shareShow-info-btn-ok {
						color: #fff;
						background: rgb(255, 78, 47);
					}

				}

			}

		}


	}
</style>