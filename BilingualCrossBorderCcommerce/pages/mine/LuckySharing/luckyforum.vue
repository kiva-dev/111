<template>
     <view class="u-page">
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
        <view class="u-demo-block">
            <view class="u-demo-block__content">
                <view class="album">
                    <view class="album__avatar">
                        <image src="/static/uview/common/logo.png" mode="" style="width: 32px;height: 32px;"></image>
                    </view>
                    <view class="album__content">
                        <u--text text="Eason Chan" bold size="17"></u--text>
                        <u--text margin="0 0 8px 0" :text="demoText" ></u--text>
                        <u-album :urls="urls1" keyName="src2"></u-album>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
                albumWidth: 0,
                demoText:'This is my first successful wish since using KOLIBRI. I am really happy to be able to participate in the wish at such a low price and become the lucky one. My joy in sharing this is to promote this platform for more people to use and participate in the wish. Thank you.',
                urls1: [{
                    src2: 'https://cdn.uviewui.com/uview/album/1.jpg',
                }]
            }
		},
        computed: {
            siderClasses() {
                return this.$t('luckysharing.content')
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
            }
		}

	}
</script>

<style lang="less" scoped>
.album {
    display: flex;
    align-items: flex-start;
    .album__avatar {
            background-color: #0f0;
            padding: 5px;
            border-radius: 3px;
        }

    .album__content {
            margin-left: 10px;
            flex: 1;
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
</style>
