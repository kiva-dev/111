<template>
	<view class="address-page">
        <!-- v-if="isEnglish" -->
	    <view  >
            <view class="head-info">
				<view class="top">
					<image src="/static/images/surprise/return.png" class="left" @click="toBack()"></image>
					<image src="/static/images/surprise/home.webp" class="index" @click="toIndex()"></image>
				</view>
			</view>
            <image class="topImage" src="@/static/demo/top.webp"></image>
            <view :class='topText'>{{isEnglish ? 'Platform Activity Benefits' : '平台活动福利'}}</view>
            <view :class='topTextChild'>{{isEnglish ? 'Too many surprises' : '超多惊喜'}}</view>
            <view class="commissionImage">
                <image class="child" src="@/static/demo/commissionrefund-en.webp"></image>
                <image class="RedEnvelopes" src="@/static/demo/RedEnvelopesSurge.webp"></image>
            </view>
            <view>
                <image class="shopImage" :src="shopImageSrc" @click="toIndex()"></image>
                <image class="contentImage" :src="contentImageSrc"></image>
            </view>
            <view class="fingerI">
                <image class="fingerImage" src="@/static/demo/fingerdown.webp"></image>
            </view>
            <view class="bottomBtn">
                <view style="position: relative;" class="lfetBottomBtn">
                    <a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
                        style="text-decoration:none;color: #FFFFFF;">
                        <image class="contentImage" src="@/static/demo/DownloadBtn.webp"></image>
						<view class="download" >{{isEnglish ? 'Download App' : '下载 APP'}}</view>
                    </a>
                    
                </view>
                <view style="position: relative;">
                    <image class="contentImage" src="@/static/demo/Register.webp"></image>
                    <view class="Register" @click="navClick('/pages/public/register')">{{isEnglish ? 'Register' : '注册'}}</view>
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
        computed: {
			topText() {
				return [this.isEnglish ? 'topText-en' : 'topText'];
			},
            topTextChild(){
				return [this.isEnglish ? 'topText-child-en' : 'topText-child'];
            },
            shopImageSrc() {
                return this.isEnglish
                    ? require('@/static/demo/shop-en.webp')
                    : require('@/static/demo/shop.webp');
            },
            contentImageSrc(){
                return this.isEnglish
                    ? require('@/static/demo/content-en.webp')
                    : require('@/static/demo/content-cn.webp');
            },
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
        padding-top: 60rpx;
        background-size: 750rpx 900rpx;
        position: absolute;
        z-index: 999;
        width: 100%;
		
		a{
			
		}
		
        .top {
            position: fixed;
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
            height: 240rpx;
            display: flex;
            justify-content: flex-end;
            position: fixed;
            bottom: 12%;
            left: 10rpx;
            .fingerImage{
                width: 280rpx;
                height: 200rpx;
            }
        }
        .bottomBtn{
            position: fixed;
            bottom: 5%;
            left: 10rpx;
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
            .lfetBottomBtn{
                 animation: shake 1s cubic-bezier(.36, .07, .19, .97) both infinite;
            }
			
            @keyframes shake {
                0%, 100% {transform: scale(1);}
                25%, 75% {transform: scale(1.1);}
                50% {transform: scale(1);}
            }
        }
    }
</style>