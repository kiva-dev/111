<template>
	<view class="address-page">
	    <view  v-if="isEnglish" class="time-page">
            <view class="head-info">
				<view class="top">
					<image src="/static/images/surprise/return.png" class="left" @click="toBack()"></image>
					<image src="/static/images/surprise/home.webp" class="index" @click="toIndex()"></image>
				</view>
			</view>
            <view class='topText-en'>Great value gift</view>
            <view class='topText-child-en' style="margin-top: -20rpx;">Register TODAY and Join as a Member/Join us as a Member</view>
            <view class="topImage">
                <image class="capsule_bg" style="width: 60%;" src="@/static/demo/capsule_bg.webp"></image>
                <view class="capsule_text" style="top: 5%;">YOU’LL GET EXTRA</view>
                <view class="capsule_right" style="left: 58%;">
                    <view class="capsule_number">RM30</view>
                    <view class="capsule_underline"></view>
                </view>
                <view class="commission">
                    <!-- <image class="commission_top" src="@/static/demo/timeevent_bg.webp"></image> -->
                    <image class="commission_bg" src="@/static/demo/timeevent_bg3-en.png"></image>
                    <!-- <view class="capsule_text_top">Hi！Join now</view>
                    <view class="capsule_text_content">Join us & stand a chance</view>
                    <view class="capsule_text_bottom">Join us & stand a chance to win your preferred luxury items from authentic brand!
What’s more? The platform also often holds exciting lucky draw events, allowing you to win great prizes!</view>
                    <view class="capsule_text_red">Don't hesitate any longer and REGISTER NOW!</view> -->
                </view>
                <view class="commission" style="top:130%">
                    <!-- <image class="commission_top" src="@/static/demo/timeevent_bg.webp"></image> -->
                    <image class="commission_bg" src="@/static/demo/timeevent_bg4-en.png"></image>
                    <!-- <view class="capsule_text_top" style="font-size:14px">Activity Content</view>
                    <view class="capsule_text_content" style="left: 50%;text-align: center;">28th July 2023 - 11th August 2023</view>
                    <view class="capsule_text_red" style="left: 15%;top: 30%;">Platform Bonuses</view>
                    <view class="capsule_text_bottom" style="top: 38%;transform: scale(0.8);">Can be used to purchase certain specific products or participate in wishing activities (deducting diamond consumption according to the merchant's set ratio)</view> -->
                </view>
                <view class="commission" style="top:205%;">
                    <image style="height:781rpx" class="commission_bg" src="@/static/demo/timeevent_bg5-en.png"></image>
                </view>
                <!-- <view class="commission commission2">
                    <image class="commission_top" src="@/static/demo/3-en.webp"></image>
                </view> -->
            </view>
            <view class="fingerI">
                <image class="fingerImage" src="@/static/demo/fingerdown.webp"></image>
            </view>
            <view class="bottomBtn">
                <view style="position: relative;" class="lfetBottomBtn">
                    <a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
                        style="text-decoration:none;color: #FFFFFF;">
                        <image class="contentImage" src="@/static/demo/DownloadBtn.webp"></image>
						<view class="download" >Download app</view>
                    </a>
                    
                </view>
                <view style="position: relative;">
                    <image class="contentImage" src="@/static/demo/Register.webp"></image>
                    <view class="Register" @click="navClick('/pages/public/register')">Register</view>
                </view>
            </view>
        </view>
        <view  v-else class="time-page">
            <view class="head-info">
				<view class="top">
					<image src="/static/images/surprise/return.png" class="left" @click="toBack()"></image>
					<image src="/static/images/surprise/home.webp" class="index" @click="toIndex()"></image>
				</view>
			</view>
            <view class='topText-en'>超值礼物</view>
            <view class='topText-child-en'>立即注册并加入会员</view>
            <view class="topImage">
                <image class="capsule_bg" src="@/static/demo/capsule_bg.webp"></image>
                <view class="capsule_text">你会得到额外的</view>
                <view class="capsule_right">
                    <view class="capsule_number">RM30</view>
                    <view class="capsule_underline"></view>
                </view>
                <view class="commission">
                    <!-- <image class="commission_top" src="@/static/demo/timeevent_bg.webp"></image> -->
                    <image class="commission_bg" src="@/static/demo/timeevent_bg3.png"></image>
                    <!-- <view class="capsule_text_top">Hi！Join now</view>
                    <view class="capsule_text_content">Join us & stand a chance</view>
                    <view class="capsule_text_bottom">Join us & stand a chance to win your preferred luxury items from authentic brand!
What’s more? The platform also often holds exciting lucky draw events, allowing you to win great prizes!</view>
                    <view class="capsule_text_red">Don't hesitate any longer and REGISTER NOW!</view> -->
                </view>
                <view class="commission" style="top:130%">
                    <!-- <image class="commission_top" src="@/static/demo/timeevent_bg.webp"></image> -->
                    <image class="commission_bg" src="@/static/demo/timeevent_bg4.png"></image>
                    <!-- <view class="capsule_text_top" style="font-size:14px">Activity Content</view>
                    <view class="capsule_text_content" style="left: 50%;text-align: center;">28th July 2023 - 11th August 2023</view>
                    <view class="capsule_text_red" style="left: 15%;top: 30%;">Platform Bonuses</view>
                    <view class="capsule_text_bottom" style="top: 38%;transform: scale(0.8);">Can be used to purchase certain specific products or participate in wishing activities (deducting diamond consumption according to the merchant's set ratio)</view> -->
                </view>
                <view class="commission" style="top:205%;">
                    <image style="height:781rpx" class="commission_bg" src="@/static/demo/timeevent_bg5.png"></image>
                </view>
                <!-- <view class="commission commission2">
                    <image class="commission_top" src="@/static/demo/3-en.webp"></image>
                </view> -->
            </view>
            <view class="fingerI">
                <image class="fingerImage" src="@/static/demo/fingerdown.webp"></image>
            </view>
            <view class="bottomBtn">
                <view style="position: relative;" class="lfetBottomBtn">
                    <a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
                        style="text-decoration:none;color: #FFFFFF;">
                        <image class="contentImage" src="@/static/demo/DownloadBtn.webp"></image>
						<view class="download" >下载 APP</view>
                    </a>
                    
                </view>
                <view style="position: relative;">
                    <image class="contentImage" src="@/static/demo/Register.webp"></image>
                    <view class="Register" @click="navClick('/pages/public/register')">注册</view>
                </view>
            </view>
        </view>
        <image class="address-page_bottom" src="@/static/demo/timeevent_bottm.webp"></image>
	</view>
</template>

<script>
    const supportsWebp = ({ createImageBitmap, Image }) => {
        if (!createImageBitmap || !Image) return Promise.resolve(false);

        return new Promise(resolve => {
            const image = new Image();
            image.onload = () => {
                createImageBitmap(image)
                    .then(() => {
                        resolve(true);
                    })
                    .catch(() => {
                        resolve(false);
                    });
            };
            image.onerror = () => {
                resolve(false);
            };
            image.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        });
    };

    const webpIsSupported = () => {
    let memo = null;
    return () => {
        if (!memo) {
            memo = supportsWebp(window);
        }
        return memo;
    };
    };

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
             webpIsSupported()().then(res => {
                console.log("是否支持 webp", res)
            }).catch(err => {
                console.log(err)
            })
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
		min-height: 210vh;
		padding-bottom: 160rpx;
		box-sizing: border-box;
        background: url('/static/demo/timeevent_page.webp') no-repeat;
        background-size: 100% 100%;
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
            position: absolute;
            top: 20%;
            left: 0;
            transform: scale(1);
            background: url('/static/demo/timeevent_topbg.png') no-repeat;
            background-size: 100% 100%;
            .capsule_bg{
                width: 50%;
                height: 75rpx;
                position: absolute;
                left: 50%;
                top: 2%;
                transform: translate(-50%,0);
            }
            .capsule_text{
                font-size: 24rpx;
                font-weight: 700;
                color: rgb(255, 57, 57);
                text-align: center;
                position: absolute;
                left: 40%;
                top: 4%;
                transform: translate(-45%,9%);
                text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px white;
            }
            .capsule_right{
                color: rgb(255, 57, 57);
                width: 150rpx;
                height: 150rpx;
                position:absolute;
                left: 55%;
                top: 0;
                transform: translate(5px, -20px);
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .capsule_number{
                    font-size: 58rpx;
                    font-weight: 900;
                    text-align: center;
                    text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px white;
                }
                .capsule_underline{
                    width: 70rpx;
                    height: 10rpx;
                    background: rgb(255, 57, 57);
                    border: 0.5px solid rgb(255, 255, 255);
                    border-radius: 50px;
                }

            }
            .commission{
                width: 100%;
                height: 20vh;
                position: absolute;
                top: 55%;
                left: 0;
                .commission_top{
                    width: 70%;
                    height: 30px;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    z-index: 999;
                    transform: translate(-50%,-10px);
                }
                .commission_bg{
                    width: 90%;
                    height: 510rpx;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, 10px);
                }
                .capsule_text_top{
                    z-index: 999;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%,-5px);
                    color: #fff;
                    font-size: 16px;
                    font-weight: 700;
                }
                .capsule_text_content{
                    width: 100%;
                    position: absolute;
                    top: 30%;
                    left: 50%;
                    text-align: center;
                    transform: translate(-50%,-20px);
                    color: rgb(254, 62, 43);
                    font-size: 12px;
                    font-weight: 700;
                }
                .capsule_text_bottom{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    color: #333333;
                    margin: 0 auto;
                    top: 20%;
                    overflow: hidden;
                    transform: scale(0.7);
                }
                .capsule_text_red{
                    width: 625rpx;
                    font-weight: 500;
                    position: absolute;
                    top: 75%;
                    left: -12%;
                    color: #fe3e2b;
                    transform: scale(0.8);
                }
            }
            .commission2{
                    width: 60%;
                    height: 480rpx;
                    top: 200%;
                    left: 50%;
                    transform: translate(-50%,0);
                .commission_top{
                    width: 100%;
                    height: 100%;
                }
            }
            .address-page_bottom{
                width: 100%;
                height: 20vh;
                position: absolute;
                bottom: 0;
                left: 0;
            }
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
            // transform: rotate(-3.00deg);
            font-weight: 900;
            letter-spacing: 0px;
        }
        .topText-en{
            font-size: 80rpx;
        }
        .topText-child-en{
            font-size: 40rpx;
        }
        .topText-child,
        .topText-child-en{
            top: 14%;
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