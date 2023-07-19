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
        <view class="u-demo-block" v-for="(nub) in 10" :key="nub">
            <view class="u-demo-block__content">
                <view class="album">
                    <view class="album__header">
                        <view class="album__right">
                            <view class="album__avatar">
                                <u-avatar :src="src" size='40'></u-avatar>
                                <!-- <image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="widthFix" ></image> -->
                            </view>
                            <view>
                                <u--text text="Eason Chan" bold size="17" class="album__text aaaaaaaaaaa"></u--text>
                                <view class="item-l-level">
                                    <view class="level-icon">
                                        <image src="@/static/images/mine/mine_icon_vip.png" mode="widthFix"></image>
                                    </view>
                                    <view class="level-num">Lv.2</view>
                                </view>
                            </view> 
                        </view>
                        <view class="album__left">
                            <view class="level-num">7-14</view>
                        </view>
                    </view>
                    <view class="album__content">
                        <u--text margin="0 0 8px 0" :text="demoText" ></u--text>
                        <view class="album__urls">
                            <image :src="item" v-for="(item,index) in urls1" :key="index"></image>
                        </view>
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
                src: 'https://cdn.uviewui.com/uview/album/1.jpg',
                urls1: [
                    'https://cdn.uviewui.com/uview/album/1.jpg',
                    'https://cdn.uviewui.com/uview/album/2.jpg',
                    'https://cdn.uviewui.com/uview/album/3.jpg',
                    'https://cdn.uviewui.com/uview/album/4.jpg',
                    'https://cdn.uviewui.com/uview/album/5.jpg'
                ]
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
    flex-direction: column;
    padding: 40rpx;
    .item-l-level{
        width: 80rpx;
        height: 30rpx;
        margin-top: 8rpx;
        padding-right: 5rpx;
        box-sizing: border-box;
        background: rgb(253, 240, 226);
        border-radius: 100rpx;
        display: flex;
        .level-icon {
            width: 30rpx;
            height: 30rpx;
            image {
                width: 100%;
            }
        }
        .level-num {
            margin-left: 5rpx;
            color: rgb(219, 132, 37);
            font-size: 16rpx;
            line-height: 30rpx;
        }
    }
    .album__header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .album__right,
        .album__left{
            width: 50%;
            display: flex;
            align-items: center;
        }
        .album__right{
            justify-content: flex-start;
            .album__avatar {
                margin-right: 40rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .album__left{
             justify-content: flex-end;
             color: #666;
             font-size: 16px;
        }
        .album__text{
            margin: 20rpx 0;
        }
    }
    .album__content {
        margin:45rpx 0rpx;
        flex: 1;
        .album__urls{
            margin-top:40rpx;
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: space-between;
            image{
                width: 180rpx;
                height: 180rpx !important;
                margin: 0 40rpx 40rpx 0;
                border-radius: 24rpx;
            }
        }
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
