
<template>
	<view class="commission-page">
		<view class="commission-head">
			<image class="commission-head-img" src="@/static/images/mine/collect_icon_back.png" @click="toBack()"></image>
			<view class="commission-head-txt">{{$t('new.yjfxMaterialTitle')}}</view>
		</view>
		<view class="commission-center">
			<view class="commission-center-left">
                <view class="commission-center-text">
                    <image  :src="require(`@/static/images/mine/${previewImg}.png`)" mode="widthFix" @click="previewImgList(previewImg)"></image>
                    <view class="PreView" @click="previewImgList(previewImg)">PreView</view>
                </view>
			    <view class="commission-center-btn"  @click="onUrlClick()">{{$t('new.yjfxBtn')}}</view>
			</view>
			<view class="commission-center-right">
                <view class="commission-center-text">
                    <image  :src="require(`@/static/images/mine/${preview2Img}.png`)" mode="widthFix"  @click="previewImgList(preview2Img)"></image>
                    <view class="PreView" @click="previewImgList(preview2Img)">PreView</view>
                </view>
			    <view class="commission-center-btn" @click="onUrlClick()">{{$t('new.yjfxBtn')}}</view>
			</view>
		</view>
        <!--图片预览-->
		<u-overlay :show="showImages" :duration="400" :z-index="999" :opacity="1">
			<view class="show_images">
                <scroll-view class="show_images-child" scroll-y="true" style="height:100vh">
                    <image src="/static/images/new-index/close.png" class="close" @click="closeImg"></image>
                    <view class="carousel">
                        <image  :src="require(`@/static/images/mine/${showImagUrl}.png`)" mode="widthFix"></image>
                    </view>
                </scroll-view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                isEnglish:uni.getStorageSync('locale') === 'en' ? true : false,
                showImagUrl:'preview2-en',
                showImages:false
			}
		},
        computed: {
            preview2Img() {
                return this.isEnglish ? 'preview2-en' : 'preview2-cn';
            },
            previewImg(){
                return this.isEnglish ? 'preview-en' : 'preview-cn';
            }
        },
		onShow() {},
		methods: {
            //预览图片
			previewImgList(name) {
                this.showImagUrl = 'Material' + name
				this.showImages = true
			},
            closeImg(){
                this.showImagUrl = 'preview2-en'
                this.showImages = false
            },
			toBack() {
				uni.navigateBack()
			},
			toRule(url) {
				uni.navigateTo({
					url
				})
			},
            // 点击复制链接
			onUrlClick() {
                console.log('辅助');
                uni.showToast({
					icon: 'none',
					title: this.$t('user.order.detail.fzcg')
				})

				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = ''; //要复制的
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				uni.showToast({
					icon: 'none',
					title: this.$t('user.order.detail.fzcg')
				})
				oInput.remove()
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: this.qrUrl,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			},
		}
	}
</script>

<style lang="less" scoped>
	.commission-page {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
	}

	.commission-head {
		position: relative;
		width: 100%;
		height: 88rpx;
		padding-top: 88rpx;
		display: flex;
		align-items: center;
		background: rgb(255, 255, 255);

		.commission-head-img {
			position: absolute;
			left: 20rpx;
			width: 40rpx;
			height: 40rpx;
			z-index: 10;
		}

		.commission-head-txt {
			width: 100%;
			color: rgb(51, 51, 51);
			font-size: 40rpx;
			text-align: center;
		}
		
		.commission-head-right{
			position: absolute;
			right: 20rpx;
			display: flex;
			align-items: flex-start;
			flex-direction: column;
			image{
				width: 48rpx;
				height: 48rpx;
			}
			
			view{
				font-size: 20rpx;
				color: #0AC68E;
				margin-right: 16rpx;
				margin-top: 4rpx;
			}
			
		}
		
	}

	.commission-center {
        display: flex;
        align-items: center;
        justify-content: space-around;
		.commission-center-left,
        .commission-center-right{
            width: 50%;
			padding: 36rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
            flex-direction: column;
            .commission-center-text{
                width: 100%;
                position: relative;
                .PreView{
                    position: absolute;
                    left: 50%;
                    bottom: 20px;
                    color: #fff;
                    width: 100rpx;
                    padding: 20rpx 40rpx;
                    transform: translate(-50%, 0px);
                    background: rgba(0, 0, 0, 0.5);
                    border-radius:40rpx;
                }
            }
            image{
                width: 100%;
            }
		}
        .commission-center-btn {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: #FFF;
			text-align: center;
			background: #0AC68E;
			border-radius: 88rpx;
			margin: 40rpx auto 0 auto;
		}
	}
    //图片预览
	.show_images {
		position: relative;
		width: 100%;
		min-height: 100vh;
        .show_images-child{
            min-height: 100vh;
        }
		.close {
			position: fixed;
			top: 20rpx;
			right: 32rpx;
			width: 50rpx;
			height: 50rpx;
            z-index: 999;
		}

		.carousel {
			width: 100%;
            image{
                width: 100%;
            }
		}
	}
</style>