<template>
    <view style="background:#F8F8F8;min-height:100vh width: 100%; overflow-x: hidden;">
        <view class="rule-header">
			<view class="mp-header-box">
				<view class="box-back" @click="onBack">
					<image src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
				</view>
				<view class="box-title">{{$t('rule.title')}}</view>
				<view class="box-clear" style="visibility: hidden;">
					<image src="@/static/images/mine/msg_btn_clear.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
        <!-- 限额许愿规则 -->
        <view class="rule-conent">
            <view class="titleRule">
                <image class="titleStart" src="@/static/images/mine/rule/ruleStartGreen.png" mode="widthFix"></image>
                <span class="green">{{$t('rule.QuotaWishingRules')}}</span>
                <image class="titleStart" src="@/static/images/mine/rule/ruleStartGreen.png" mode="widthFix"></image>
            </view>
            <view class="conentRule">
                <view class="conentTopRule green">#{{$t('rule.closingle')}}#</view>
                <view class="conentBottomRule">{{$t('rule.quotaRuleContent')}}</view>
            </view>
            <view class="fotterRule">
                <view class="fotterBottomRule">
                    <image :src="CaseAImageSrc" mode="widthFix"></image>
                </view>
                <view class="fotterBottomRule" style="margin-top:60rpx;">
                    <image :src="CaseBImageSrc" mode="widthFix"></image>
                </view>
            </view>
            <view class="conentEnd">
                <view>{{$t('rule.announcedLuckyCode')}}</view>
            </view>
        </view>
        <!-- 限时许愿规则 -->
        <view class="rule-conent">
            <view class="titleRule">
                <image class="titleStart" src="@/static/images/mine/ruleStart.png" mode="widthFix"></image>
                <span>{{$t('rule.limitedTime')}}</span>
                <image class="titleStart" src="@/static/images/mine/ruleStart.png" mode="widthFix"></image>
            </view>
            <view class="conentRule" style="border: 2px solid #E5C09F">
                <view class="conentTopRule">#{{$t('rule.closingle')}}#</view>
                <view class="conentBottomRule">{{$t('rule.limitedTimeClose')}}</view>
            </view>
            <view class="LimitedImag">
                <image :src="limitedCaseImageSrc" mode="widthFix"></image>
            </view>
            <view class="conentEnd">
                <view>{{$t('rule.announcedLuckyCode')}}</view>
            </view>
        </view>
        <!-- 实现原理 -->
        <view class="rule-conent">
            <view class="titleRule">
                <image class="titleStart" src="@/static/images/mine/rule/ruleStartBlue.png" mode="widthFix"></image>
                <span class="blue">{{$t('rule.principle')}}</span>
                <image class="titleStart" src="@/static/images/mine/rule/ruleStartBlue.png" mode="widthFix"></image>
            </view>
            <view class="fotterRule">
                <view class="fotterBottomRule">
                    <image :src="principleTextImageSrc" mode="widthFix"></image>
                </view>
                <view class="fotterBottomRule" style="margin-top:60rpx;">
                    <image :src="principleImageSrc" mode="widthFix"></image>
                </view>
            </view>
        </view>
        <!-- 温馨提示 -->
        <view class="fotterKind">
            <view class="KindTips">
                <view class="tipsTop">{{$t('rule.Reminder')}}</view>
                <view>
                    <view style="color:#666666;font-size:12px">{{$t('rule.ReminderConent')}}</view>
                </view>
            </view>
            <view style="margin-bottom: 50rpx;">
                <view style="color:#999999;font-size:10px">{{$t('rule.note')}}</view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				isEnglish : uni.getStorageSync('locale') !== 'zh-Hans'
			}
		},
        computed: {
            CaseAImageSrc() {
                return this.isEnglish
                    ? require('@/static/images/mine/rule/CaseA-en.png')
                    : require('@/static/images/mine/rule/CaseA-cn.png')
            },
            CaseBImageSrc() {
                return this.isEnglish
                    ? require('@/static/images/mine/rule/CaseB-en.png')
                    : require('@/static/images/mine/rule/CaseB-cn.png')
            },
            limitedCaseImageSrc() {
                return this.isEnglish
                    ? require('@/static/images/mine/rule/limitedCase-en.png')
                    : require('@/static/images/mine/rule/limitedCase-cn.png')
            },
            principleTextImageSrc() {
                return this.isEnglish
                    ? require('@/static/images/mine/rule/principleText-en.png')
                    : require('@/static/images/mine/rule/principleText-cn.png')
            },
            principleImageSrc() {
                return this.isEnglish
                    ? require('@/static/images/mine/rule/principleImage-en.png')
                    : require('@/static/images/mine/rule/principleImage-cn.png')
            },
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
.rule-header {
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
.rule-conent{
    background: #fff;
    margin: 21rpx 0 0 0;
    padding: 21rpx 40rpx;
    box-sizing: border-box;
    .titleRule{
        display: flex;
        justify-content: center;
        align-items: center;
        .titleStart{
            width: 40rpx;
            height: 40rpx;
        }
        span{
            background: linear-gradient(135.00deg, rgb(255, 83, 56) 0%,rgb(255, 165, 117) 100%);
            border-radius:105rpx;
            font-weight: 700;
            padding: 30rpx;
            color: rgb(255, 255, 255);
            text-align: center;
            margin: 0 40rpx
        }
        .green{
            background: linear-gradient(180.00deg, rgb(51, 222, 114),rgb(5, 195, 146) 98.871%);
        }
        .blue{
            background: linear-gradient(135.00deg, rgb(0, 185, 255) 0%,rgb(125, 219, 255) 100%);
        }
    }
    .conentRule,
    .fotterRule{
        background: rgb(255, 255, 255);
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .conentRule{
        margin: 40rpx 0;
        border: 2px solid rgba(10, 198, 142, 0.4);
        .conentTopRule{
            height: 26px;
            background: linear-gradient(135.00deg, rgb(255, 107, 29) 9.104%,rgb(255, 187, 131) 89.786%);
            border-radius:0px 0px 6px 6px;
            display: flex;
            align-items: center;
            padding: 10rpx 20rpx;
            color: rgb(255, 255, 255);
            font-weight: 500;
            text-align: center;
        }
        .green{
            background: linear-gradient(180.00deg, rgb(51, 222, 114),rgb(5, 195, 146) 98.871%);
        }
        .conentBottomRule{
            box-sizing: border-box;
            padding: 40rpx;
            color: rgb(102, 102, 102);
            text-align: left;
        }
    }
    .fotterRule{
        margin: 40rpx 0;
        .fotterTopRule{
            background: linear-gradient(225.00deg, rgb(255, 36, 74) 3.817%,rgb(254, 80, 45) 100%);
            opacity: 0.8;
            border-radius:16px 16px 0px 0px;
            width: 100%;
            text-align: center;
            padding:30rpx 40rpx ;
            box-sizing: border-box;
            color: #fff;
            font-size: 32rpx;
            font-weight: 700;
        }
        .fotterBottomRule{
            width: 670rpx;
            image{
                width: 100%;
                height: 100%;
            }
        }
    }
    .conentEnd{
        color: rgb(102, 102, 102);
        font-size: 12px;
        margin: 20rpx 0;
        text-align: left;
    }
    .LimitedImag{
        width: 670rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 80rpx 0;
        image{
            width: 100%;
        }
    }
}
.fotterKind{
    padding: 0rpx 40rpx;
    .KindTips{
        background: #FFFFFF;
        border-radius:10px;
        padding: 20rpx 40rpx 40rpx 40rpx;
        margin: 60rpx 0;
        box-sizing: border-box;
        .tipsTop{
            color: rgb(51, 51, 51);
            text-align: left;
            font-weight: 500;
            font-size: 28rpx;
            margin-bottom: 15rpx;
        }
    }
}

</style>
