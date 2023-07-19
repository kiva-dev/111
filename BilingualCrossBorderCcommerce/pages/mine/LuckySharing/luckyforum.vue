<template>
    <view>
        <view class="mp-header">
			<view style="height: 88rpx;"></view>
			<view class="mp-header-box">
				<view class="box-back" @click="onBack">
					<image src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
				</view>
				<view class="box-title">{{$t('top.luckyforum')}}</view>
				<view class="box-clear" style="visibility: hidden;">
					<image src="@/static/images/mine/msg_btn_clear.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
        <u--textarea confirm-type="done" v-model="value5" :placeholder="siderClasses" border="bottom" height='380' count maxlength='3000'></u--textarea>
        <view class="upload-prop">
            <u-upload
                deletable
                :fileList="fileList1"
                @afterRead="afterRead"
                @delete="deletePic"
                name="1"
                multiple
                :maxCount="5"
                width="110"
	            height="110"

            >
                <!-- <image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" mode="widthFix" style="width: 150px;height: 150px;"></image> -->
                <view class="upload-class">
                    <image :src="imgUrl" mode="widthFix" class="upload-image"></image>
                    <view class="upload-pictures">{{$t('luckysharing.pictures')}}</view>
                    <view>{{fileList1.length}}/5</view>
                </view>
            </u-upload>
        </view>

        <view class="address-fixed">
			<view class="fixed-con">
				<button class="public-btn" style="background: rgb(10, 198, 142);"
					@click="navClick('add')">{{$t('luckysharing.Btn')}}</button>
			</view>
		</view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
                imgUrl:require('@/static/icon/path.png'),
                value5: '',
				fileList1: [],
			}
		},
        computed: {
            siderClasses() {
                return this.$t('luckysharing.content')
            }
        },
		methods:{
            onBack(){
                console.log('1');
            },
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
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
            navClick(url) {
                console.log(url);
                return
				uni.navigateTo({
					url
				})
			},
		}

	}
</script>

<style lang="less" scoped>
.u-upload__wrap__preview__image{
    border-radius: 24rpx;
}
.upload-prop{
    padding: 40rpx 20rpx 0 40rpx;
    .u-upload__wrap__preview{
        width: 240rpx;
        height: 240rpx;
    }
}
.upload-class{
    width: 210rpx;
    height: 210rpx;
    color: #999;
    border: 1rpx solid #ccc;
    border-radius: 24rpx;
    background: #F6F7F9;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .upload-image{
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 36rpx;
    }
    .upload-pictures{
    }
}
.mp-header {
    width: 100%;
    background: #fff;

    .mp-header-box {
        width: 100%;
        height: 88rpx;
        padding: 0 32rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid rgb(204, 204, 204);

        .box-back {
            width: 40rpx;
            height: 40rpx;

            image {
                width: 100%;
            }
        }

        .box-title {
            color: rgb(51, 51, 51);
            font-size: 40rpx;
        }

        .box-clear {
            width: 36rpx;
            height: 36rpx;

            image {
                width: 100%;
            }
        }
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
        padding: 32rpx 32rpx 64rpx 32rpx;
        box-sizing: border-box;
    }
}
</style>
