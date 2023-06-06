<template>
	<view class="feed-page">
		<view class="feed-box">
			<!-- <view class="feed-t">{{$t('user.Feedback.wtms')}}</view> -->
			<view class="feed-text">
				<u--textarea class="text" v-model="content" placeholderStyle="color:rgb(190, 190, 190);"
					:placeholder="$t('new.qms')" border="none" height="200" :count="true"
					:maxlength="1000"></u--textarea>
			</view>

			<view class="feed-file">
				<view>
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="10">
						<view class="feed-file-img">
							<image src="../../static/images/new/xiangji.png"></image>
							<view>{{$t('new.sctp')}}</view>
						</view>
					</u-upload>
				</view>
				<!-- <view class="feed-file-add">
					<image src="../../static/images/new/add.png"></image>
				</view> -->
			</view>

			<view class="feed-input">
				<u--input :placeholder="$t('new.qsrlxfs')" border="none" v-model="phone">
					<u--text :text="$t('new.lxfs')" slot="prefix" style="font-size: 32rpx;" margin="0 3px 0 0"
						type="tips"></u--text>
				</u--input>
			</view>

			<view class="feed-bot" @click.stop="$noMultipleClicks(onMineFeedback)">
				{{$t('user.Feedback.ljtj')}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				content: '',
				phone: '',
				fileList1: [],
				urlList: []
			}
		},
		onShow() {},
		methods: {
			onMineFeedback() {
				console.log(this.fileList1)
				if (!this.content) return uni.showToast({
					title: this.$t('user.Feedback.qsrwtms'),
					icon: 'none'
				})

				if (!this.phone) return uni.showToast({
					title: this.$t('请输入联系方式'),
					icon: 'none'
				})

				this.$http.post(this.$apiObj.MineFeedback, {
					content: this.content,
					images: this.urlList,
					concat: this.phone
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.Feedback.tjcg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				})
			},

			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})

				for (let i = 0; i < lists.length; i++) {
					console.log(lists.length)
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'https://kjtest.ysxrj.cn/api/Mine/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							token: uni.getStorageSync('token')
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							this.urlList.push(data.data.fullurl)
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	/deep/.u-text__value--tips {
		max-width: 200rpx;
		color: rgb(44, 44, 44) !important;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.feed-page {
		width: 100%;
		min-height: 100vh;
		padding-top: 30rpx;
		background: rgb(248, 248, 248);

		.feed-t {
			font-size: 28rpx;
			font-weight: 550;
		}

		.feed-text {
			width: 674rpx;
			height: 364rpx;
			background: rgb(255, 255, 255);
			border-radius: 20rpx;
			// padding: 20rpx;
			margin: 0 20rpx;

			.text {
				width: 100%;
				font-size: 28rpx;
			}
		}

		//文件上传
		.feed-file {
			width: 710rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			margin-top: 100rpx;
			margin-left: 20rpx;

			.feed-file-img {
				width: 200rpx;
				height: 200rpx;
				font-size: 24rpx;
				color: rgb(190, 190, 190);
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: #fff;
				border-radius: 16rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					margin-bottom: 12rpx;
				}
			}

			.feed-file-add {
				margin-left: 60rpx;

				image {
					width: 100rpx;
					height: 100rpx;
				}
			}

		}

		.feed-bot {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: #FF4E2F;
			border-radius: 16rpx;
			margin: 100rpx auto;
		}

		.feed-input {
			width: 670rpx;
			height: 56rpx;
			line-height: 56rpx;
			padding: 12rpx 20rpx;
			background: #fff;
			border-radius: 16rpx;
			margin: 60rpx auto;
		}

	}
</style>