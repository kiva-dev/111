<template>
	<view class="address-page">
	    <view  v-if="isEnglish">
            <view class="head-info">
				<view class="top">
					<image src="/static/images/surprise/return.png" class="left" @click="toBack()"></image>
					<image src="/static/images/surprise/home.png" class="index" @click="toIndex()"></image>
				</view>
			</view>
            <image class="topImage" src="@/static/demo/top.png"></image>
            <view class='topText-en'>Platform Activity Benefits</view>
            <view class='topText-child-en'>Too many surprises</view>
            <view class="commissionImage">
                <image class="child" src="@/static/demo/commissionrefund-en.png"></image>
                <image class="RedEnvelopes" src="@/static/demo/RedEnvelopesSurge.gif"></image>
            </view>
            <image class="shopImage" src="@/static/demo/shop-en.png" @click="toIndex()"></image>
            <image class="contentImage" src="@/static/demo/content-en.png"></image>
            <view class="fingerI">
                <image class="fingerImage" src="@/static/demo/fingerdown.gif"></image>
            </view>
            <view class="bottomBtn">
                <view style="position: relative;">
                    <image class="contentImage" src="@/static/demo/DownloadBtn.png"></image>
                    <view class="download" @click="navClick('add')">Download app</view>
                </view>
                <view style="position: relative;">
                    <image class="contentImage" src="@/static/demo/Register.png"></image>
                    <view class="Register" @click="navClick('/pages/public/login')">Register</view>
                </view>
            </view>
        </view>
        <view v-else>
            <view class="head-info">
				<view class="top">
					<image src="/static/images/surprise/return.png" class="left" @click="toBack()"></image>
					<image src="/static/images/surprise/home.png" class="index" @click="toIndex()"></image>
				</view>
			</view>
            <image class="topImage" src="@/static/demo/top.png"></image>
            <view class='topText'>平台活动福利</view>
            <view class='topText-child'>超多惊喜</view>
            <view class="commissionImage">
                <image class="child" src="@/static/demo/commissionrefund.png"></image>
                <image class="RedEnvelopes" src="@/static/demo/RedEnvelopesSurge.gif"></image>
            </view>
            <image class="shopImage" src="@/static/demo/shop.png" @click="toIndex()"></image>
            <image class="contentImage" src="@/static/demo/content-cn.png"></image>
            <view class="fingerI">
                <image class="fingerImage" src="@/static/demo/fingerdown.gif"></image>
            </view>
            <view class="bottomBtn">
                <view style="position: relative;">
                    <image class="contentImage" src="@/static/demo/DownloadBtn.png"></image>
                    <view class="download" @click="navClick('add')">下载 APP</view>
                </view>
                <view style="position: relative;">
                    <image class="contentImage" src="@/static/demo/Register.png"></image>
                    <view class="Register" @click="navClick('/pages/public/login')">注册</view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addList: [],
                isEnglish:true,
				page: 1,
			}
		},
		onLoad(e) {
			if(e.language == 'en') this.isEnglish = true
			else this.isEnglish = false
			
			if(e.promotion_code) uni.setStorageSync('invite_code',e.promotion_code)
		},
		onReachBottom() {
		},
		methods: {
            toBack() {
				uni.navigateBack()
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			toIndex() {
				uni.switchTab({
					url: '/pages/auction/auction'
				})
			}
		},
	}
</script>
<style lang="less" scoped>
    .head-info {
        padding-top: 88rpx;
        background-size: 750rpx 900rpx;
        position: absolute;
        z-index: 999;
        width: 100%;
        .top {
            position: relative;
            width: 100%;
            height: 88rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            image {
                display: block;
                width: 40rpx;
                height: 40rpx;
            }

            .left {
                margin-left: 32rpx;
            }

            .index {
                position: absolute;
                right: 32rpx;
            }
        }

    }
	.address-page {
		width: 100%;
		min-height: 200vh;
		padding-bottom: 160rpx;
		box-sizing: border-box;
		background: linear-gradient(180.00deg, rgb(254, 108, 85),rgb(255, 60, 42) 100%);;
        
        .commissionImage,
        .contentImage,
        .shopImage{
            width: 100%;
            height: 750rpx;
            padding: 0 40rpx 40rpx 40rpx;
            box-sizing: border-box;
            position: relative;
        }
        .commissionImage{
            .child{
                width: 100%;
                height: 100%;
                position: relative;
            }
            .RedEnvelopes{
                width: 89%;
                height: 600rpx;
                position: absolute;
                bottom: 0;
                left: 0;
                margin: 0 20px;
                transform: translate(0,-42rpx);
                box-sizing: border-box;
                border-radius: 24rpx;
            }
        }
        .contentImage{
            height: 600rpx;
            .download{
                color: #FFFFFF;
            }
        }
        .topImage{
            width: 100%;
            height: 750rpx;
        }
        .topText,
        .topText-child{
            font-size:40px;
            text-align: center;
            width: 100%;
            color: #FFFFFF;
            position: absolute;
            top: 5%;
            transform: rotate(-3.00deg);
            letter-spacing: 6px;
        }
        .topText-en,
        .topText-child-en{
            text-align: center;
            width: 100%;
            color: #FFFFFF;
            position: absolute;
            top: 6%;
            transform: rotate(-3.00deg);
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 0px;
        }
        .topText-child,
        .topText-child-en{
            top: 10%;
        }
        .fingerI{
            width: 100%;
            display: flex;
            height: 240rpx;
            display: flex;
            justify-content: flex-end;
            .fingerImage{
                width: 280rpx;
                height: 200rpx;
            }
        }
        .bottomBtn{
            width: 100%;
            color: #FFFFFF;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            image{
                width: 400rpx;
                height: 150rpx;
            }
            .download,
            .Register{
                font-weight: 700;
                font-size: 32rpx;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                text-align: center;
            }
            .download,
            .Register{
                transform: translate(-50%,-100%);
            }
        }
    }
</style>