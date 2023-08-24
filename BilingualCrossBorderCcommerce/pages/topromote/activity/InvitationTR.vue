<template>
	<view class="invitation-page">
	    <view>
            <view class="head-info">
				<view class="top">
					<image src="/static/demo/ITRreturn.png" class="left" @click="toBack()"></image>
					<image src="/static/demo/ITRhome.png" class="index" @click="toIndex()"></image>
				</view>
			</view>
            <view class="topAllImage">
                <image class="topImage" src="@/static/demo/ITRTopBg.png"></image>
                <image class="topGiftImage" src="@/static/demo/ITRTopGift.png"></image>
            </view>
            <view :class='topText'>{{isEnglish ? 'New Cash Rewards!' : '现金奖励'}}</view>
            <view :class='topTextChild'>{{isEnglish ? 'Earn Cash Prizes and Mysterious K Coins!' : '赢取现金奖励和神秘K币！'}}</view>
            <view class="invitation-content">
                <view class="commissionImage">
                    <image class="child" :src="combinationAImageSrc"></image>
                </view>
                <view class="commissionImage">
                    <image class="child" :src="combinationBImageSrc"></image>
                    <span>{{isEnglish ? illustrateText : illustrateTextCn}}</span>
                </view>
                <view class="Interpretation-rule">
                    <image class="contentImage" :src="contentImageSrc" mode="widthFix"></image>
                    <span>{{isEnglish ? InterpretationText : InterpretationTextCn}}</span>
                </view>
                <view class="bottomClass"></view>
                <view class="fingerI">
                    <image class="fingerImage" src="@/static/demo/fingerdown.webp"></image>
                </view>

                <view class="bottomBtn">
                    <view style="position: relative;" class="lfetBottomBtn">
                        <a href="https://wish.kolibrimall.com/api/Index/getApk" download="Kolibri mall"
                            style="text-decoration:none;color: #FFFFFF;">
                            <image class="contentImage" src="@/static/demo/ITRDownloadBtn.png"></image>
                            <view class="download" >{{isEnglish ? 'Download App' : '下载 APP'}}</view>
                        </a>
                        
                    </view>
                    <view style="position: relative;">
                        <image class="contentImage" src="@/static/demo/ITRRegister.png"></image>
                        <view class="Register" @click="navClick('/pages/public/register')">{{isEnglish ? 'Register' : '注册'}}</view>
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
                InterpretationText:'Disclaimer: This event follows the relevant policies and regulations of the KolibriMall platform. The final interpretation right of the event belongs to KolibriMall.',
                InterpretationTextCn:'免责声明：本活动遵循 KolibriMall 平台的相关政策和规定。活动最终解释权归 KolibriMall 所有。',
                illustrateText:'The value of K Coins will be determined based on the actual value on the subsequent public chain, bringing you more value!',
                illustrateTextCn:'K币的价值将根据后续公链上的实际价值来确定，为您带来更多的价值！',
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
            combinationAImageSrc(){
                return this.isEnglish
                    ? require('@/static/demo/combinationA-en.png')
                    : require('@/static/demo/combinationA-cn.png');
            },
            combinationBImageSrc(){
                return this.isEnglish
                    ? require('@/static/demo/combinationB-en.png')
                    : require('@/static/demo/combinationB-cn.png');
            },
            contentImageSrc(){
                return this.isEnglish
                    ? require('@/static/demo/eventRule-en.png')
                    : require('@/static/demo/eventRule-cn.png');
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
        padding-top: 88rpx;
        background-size: 750rpx 900rpx;
        position: absolute;
        z-index: 999;
        width: 100%;
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
                width: 24rpx;
            }

            .index {
                position: absolute;
                right: 32rpx;
            }
        }

    }
	.invitation-page {
		width: 100%;
		box-sizing: border-box;
        .commissionImage,
        .contentImage{
            width: 100%;
            padding: 0 40rpx 40rpx 40rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }
        .commissionImage{
            .child{
                width: 100%;
                height: 240rpx;
            }
            span{
                margin: 20rpx 0;
                color: #FFFFFF;
                font-size: 20rpx;
                font-weight: 500;
                text-align: center;
                text-transform: capitalize;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        }
        .Interpretation-rule{
            span{
                padding: 0 40rpx 40rpx 40rpx;
                color: #FFFFFF;
                font-size: 20rpx;
                font-weight: 500;
                text-align: center;
                text-transform: capitalize;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        }
        .contentImage{
			
            .download{
                color: #FFFFFF;
            }
        }
        .topAllImage{
            width: 100%;
            position: relative;
            .topImage{
                width: 100%;
                height: 750rpx;
            }
            .topGiftImage{
                width: 740rpx;
                height: 460rpx;
                position: absolute;
                bottom: 40rpx;
                left: 50%;
                transform: translate(-50%,0)
            }
        }
        .topText,
        .topText-child{
            font-size:40px;
            text-align: center;
            width: 100%;
            position: absolute;
            top: 5%;
            letter-spacing: 6px;
            background: linear-gradient(180.57deg, rgb(193, 156, 255),rgb(104, 72, 255));
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
            background-clip:text;
            text-fill-color:transparent;
            font-weight: 700;
            text-align: center;
            text-transform: capitalize;
        }
        .topText-en,
        .topText-child-en{
            text-align: center;
            width: 100%;
            color: transparent;
            background: linear-gradient(180.57deg, rgb(193, 156, 255),rgb(104, 72, 255));
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
            background-clip:text;
            text-fill-color:transparent;
            position: absolute;
            top: 6%;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 0px;
        }
        .topText-child,
        .topText-child-en{
            top: 10%;
            font-size: 16px;
            margin-top: 30rpx;
            transform: scale(0.9);
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
        .bottomClass{
            width: 100%;
            height: 480rpx;
        }
    }
    .invitation-content{
        margin-top: -20rpx;
        height: 100%;
        background: url('/static/demo/ITRbg.png') no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
</style>