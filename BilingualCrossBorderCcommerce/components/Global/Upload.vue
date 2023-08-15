<template>
    <view class="upload-presentation">
	    <u-overlay :show="show" :opacity="0.5">
            <view class="warp">
                <image class="imgLottery" src="/static/Upload/rocket.png"></image>
                <view class="version">
                    <view class="version-top">
                        <view class="name">{{$t('Global.NewVersion')}}V{{version}}</view>
                    </view>
                    <view class="version-content">
                        <view class="imgFooter-text">{{$t('Global.VersionContent')}}</view>
                        <span class="imgFooter">{{version_auction_desc}}</span>
                    </view>
                </view>
                <a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall" style="text-decoration:none;">
					<view class="imgShare">
                        <view class="imgShare-text">Update Now</view>
                    </view>
				</a>
                <image class="imgClose" src="@/static/Bell/close.png" @click="closeOverLay()"></image>
            </view>
        </u-overlay>
        
    </view>
</template>

<script>
	export default {
		data() {
			return {
                info:{},
                version:'',
                version_auction_desc:'',
                show:false,
			}
		},
        mounted() {
			this.checkVersion()
		},

		methods: {
            async checkVersion() {
                try {
				    const isEnglish = uni.getStorageSync('locale') !== 'zh-Hans';
                    const res = await this.$http.post(this.$apiObj.IndexSetting, {fields: 'version_auction,version_auction_desc,version_auction_desc_en'});
                    if (res.code === 1) {
                        const {version_auction,version_auction_desc_en,version_auction_desc} = res.data
                        this.version_auction_desc  =  isEnglish ? version_auction_desc_en : version_auction_desc
                        this.version = version_auction
                        this.show = this.$version !== version_auction;
                    }
                } catch (error) {
                    console.error('Error checking version:', error);
                }
            },
            closeOverLay(){
                this.show = false
            },
		}
	}
</script>

<style lang="scss" scoped>
.upload-presentation{
    .warp{
        position: absolute;
        width: 560rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        /* 纯白色 - fff */
        background: rgb(255, 255, 255);
        border-radius:12px;
        .imgLottery{
            position: absolute;
            width: 391rpx;
            height: 300rpx;
            left: 50%;
            top: 0;
            transform: translate(-50%,-35%);
        }
        .imgClose{
            width: 64rpx;
            height: 64rpx;
            position: absolute;
            left: 50%;
            top: 100%;
            transform: translate(-50%, 50rpx);
        }
        .version{
            padding: 180rpx 60rpx 60rpx 60rpx;
            width:100%;
            box-sizing: border-box;
            text-align: center;
            .version-top{
                width: 100%;
                color: rgb(10, 198, 142);
                font-size:30rpx;
                font-weight: 500;
                text-align: center;
                margin: 40rpx 20rpx ;
            }
            .version-content{
                color: rgb(102, 102, 102);
                font-family: SF Pro Display;
                font-size: 25rpx;
                font-weight: 500;
                text-align: left;
            }
            span{
                display: block
            }
        }
        .imgShare{
            width: 333rpx;
            height: 115rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translate(0px, 4px);
            border-radius: 100rpx;
            border: 1px solid #fff;
            background: linear-gradient(180.00deg, rgb(51, 222, 114),rgb(5, 195, 146) 98.871%);
            margin: 0 auto 50rpx;
            .imgShare-text{
                color: rgb(255, 255, 255);
                font-size: 32rpx;
                font-weight: 700;
                margin-left: 10rpx;
            }
            image{
                width: 32rpx;
                height: 32rpx;
                margin-right: 10rpx;
            }
        }
    }
}
</style>