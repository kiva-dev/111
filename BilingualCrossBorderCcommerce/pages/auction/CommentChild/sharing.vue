<template>
    <view style="background: #eee;min-height:100vh">
        <view class="mp-header">
			<view style="height: 88rpx;"></view>
			<view class="mp-header-box">
				<view class="box-back" @click="onBack">
					<image src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
				</view>
				<view class="box-title">{{$t('top.PostComments')}}</view>
				<view class="box-clear" style="visibility: hidden;">
					<image src="@/static/images/mine/msg_btn_clear.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="content">
            <view class="start-class">
                <u-rate active-color="#0AC68E" inactive-color="#CCCCCC" minCount='1' gutter="16" size='24' :allowHalf='true' v-model="stareValue"></u-rate>
                <span>{{stareValue}}</span>
            </view>
            <u--textarea confirm-type="done" v-model="value5" :placeholder="siderClasses" border="bottom" height='380' count maxlength='3000'></u--textarea>
		</view>
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
					@click="onShareClick">{{$t('luckysharing.Btn')}}</button>
			</view>
		</view>
        <u-popup ref="childShare" :show="shareFriendShow" :round="10" mode="center" closeable @close="close">
			<view class="tishingCont sareFriends">
				<view class="title">{{$t('luckysharing.Successfullypublished')}}</view>
				<view class="name">{{$t('luckysharing.SuccessText')}}</view>
				<view class="cont">
					<view class="btnsub" @click="openShare">{{$t('luckysharing.SuccessBtn')}}</view>
				</view>
			</view>
		</u-popup>
    </view>
</template>

<script>
	export default {
		data() {
			return {
                stareValue:5,
                orderauctionrecordid:'',
                shareFriendShow:false,
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
        onLoad(e) {
            if(e.orderauctionrecordid){
                this.orderauctionrecordid = e.orderauctionrecordid
                this.fun()
            }
		},
		methods:{
            onBack(){
                const routeArr = getCurrentPages().map(i => i.route);
				if (routeArr.length > 1) {
					uni.navigateBack();
				} else {
					uni.switchTab({
						url: '/pages/auction/auction'
					});
				}
            },
            // 获取期数
            async fun(){
                const url = this.$apiObj.getStageNumByUid;
                const res = await this.$http.post(url, {"goods_id": this.orderauctionrecordid});
                console.log(res);
            },
            // 分享
            close() {
                this.shareFriendShow = false;
            },
			async onShareClick(){
                if (!this.value5) {
                    uni.showToast({
                        title: this.$t('user.Feedback.qsrnr'),
                        icon: 'none'
                    })
                    return;
                }
                const url = this.$apiObj.SendComment;
                const comment = this.value5;
                const the_star = this.stareValue
                const urlArray = this.fileList1.map(item => item.url);
                const images = urlArray.join(',');
                try {
                    const res = await this.$http.post(url, {
                        comment,
                        images,
                        the_star,
                        "goods_id": this.orderauctionrecordid
                    });
                    // this.shareFriendShow = res.code === 1 ? true : false;
                    if (res.code !== 1) {
                        uni.showToast({
                            title: res.msg,
                            icon: 'none'
                        });
                    }else{
                        this.onBack()
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                }
			},
			openShare(){
				this.shareFriendShow = false
				uni.navigateTo({
					url: '/pages/auction/auction'
				});
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
                const message = this.$t('user.upgrade.scz')
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message
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
						url: this.$baseUrl + 'api/Common/upload', 
						filePath: url,
						name: 'file',
                        header: {
                            token: uni.getStorageSync('token'),
                        },  
						success: (res) => {
                            let responseData = JSON.parse(res.data);
                            let fullurl = responseData.data.fullurl;
							setTimeout(() => {
								resolve(fullurl);
							}, 1000)
						}
					});
				})
			},
            navClick(url) {
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
    padding: 40rpx 20rpx 20rpx 40rpx;
    background: #fff;
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
.content{
    background: #fff;
    margin: 21rpx 0 0 0;
    padding: 21rpx;
    box-sizing: border-box;
    .start-class{
        display: flex;
        align-items: center;
        span{
            color: rgb(10, 198, 142);
            font-size: 32rpx;
            font-weight: 500;
            text-align: left;
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
// 提示
.tishingCont {
    width: 590rpx;
    height: 360rpx;
    background: #ffffff;
    border-radius: 30rpx;
    padding-top: 50rpx;

    .title {
        font-size: 30rpx;
        color: #333;
        text-align: center;
    }

    .name {
        margin-top: 40rpx;
        font-size: 26rpx;
        color: #999;
        text-align: center;

        text {
            color: rgb(255, 78, 47);
        }
    }
    
    .cont {
        margin-top: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        padding: 0 50rpx;

        .query {
            width: 200rpx;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            background: #dddddd;
            border-radius: 40rpx;
            color: #000;
        }

        .btnsub {
            width: 200rpx;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            background: #1DD181;
            border-radius: 40rpx;
            color: #fff;
        }
    }
}
</style>
