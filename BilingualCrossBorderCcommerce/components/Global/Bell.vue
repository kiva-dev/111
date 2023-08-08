<template>
    <view class="page-body">
	    <u-overlay :show="show" :opacity="0.9">
            <view class="warp">
                <image class="imgLottery" src="@/static/Bell/lottery.png"></image>
                <view class="bell-shop-name">
                    <view class="name">
                       {{info.goods_name}}
                    </view>
                </view>
                <view class="imgTrumpet">
                    <view class="imgTrumpet-img">
                        <image src="@/static/Bell/trumpet.png"></image>
                    </view>
                    <view class="imgTrumpet-shop-img">
                        <image :src="info.image"></image>
                    </view>
                    <view class="imgTrumpet-text">
                        Congratulations ！Become the lucky star Of
                    </view>
                    <view class="imgTrumpet-text">
                        the Wishing Event!
                    </view>
                </view>
                <view class="imgFooter">
                    <view class="imgFooter-text" @click="toGift">
                        Receive your Gift now！
                    </view>
                </view>
                <view class="imgShare" @click="copyUrl()">
                    <image class="imgShare-img" src="@/static/Bell/share.png"></image>
                    <view class="imgShare-text">
                        Share
                    </view>
                </view>
                <image class="imgClose" src="@/static/Bell/close.png" @click="closeOverLay()"></image>
            </view>
            <!--分享弹出 start-->
            <view class="fenxiang" v-if="onfenxingShow">
                <view class="share-pop">
                    <view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
                    <view class="share-ul">
                        <view class="share-li" @click="ontweet">
                            <view class="icon">
                                <image class="img" src="@/static/images/share21.png"></image>
                            </view>
                            <view class="t" style="color:#000">twitter</view>
                        </view>
                        <view @click="onfacebook" class="share-li">
                            <view class="icon">
                                <image class="img" src="@/static/images/share23.png"></image>
                            </view>
                            <view class="t" style="color:#000">Facebook</view>
                        </view>
                        <view class="share-li" @click="onUrlClick">
                            <view class="icon">
                                <image class="img" src="@/static/images/share25.png"></image>
                            </view>
                            <view class="t">{{$t('auction.detail.fuzhilianjie')}}</view>
                        </view>
                    </view>
                    <view class="share-bot">
                        <button class="share-btn" @click="toggle2Close">{{$t('auction.detail.query')}}</button>
                    </view>
                </view>
            </view>
        </u-overlay>
        <view class="page-section page-section-gap" style="text-align: center;">
            <!-- <audio controls :src="audio" hidden ref="audio"></audio> -->
            <!-- <audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" :action="audioAction" controls></audio> -->
        </view>
        
    </view>
</template>

<script>
	export default {
        props: {
			// LatestWinObj: {
			// 	type: Object,
			// 	default: {}
			// },
            // newArr:{
            //     type: Array,
            //     default: []
            // },
			nub: {
				type: Number,
				default:0
			},
			// show: {
			// 	type: Boolean,
			// 	default: false
			// }
		},
		data() {
			return {
                info:{},
                newNub:0,
                newArr:[],
                show:false,
				onfenxingShow: false,
                qrUrl:'',
				audio: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
				current: {
					poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				},
			}
		},
        mounted() {
            if(uni.getStorageSync('BellCode')){
                setInterval(()=>{
                    this.getLatestWinAuction()
                },20000)
            }else{
                uni.setStorageSync('BellCode', true)
                this.getLatestWinAuction()
            }
		},

		methods: {
            closeOverLay(){
                if(this.newArr.length > this.newNub){
                    this.auction_goods_id = this.newArr[this.newNub].auction_goods_id
                    this.info = this.newArr[this.newNub]
                    const { invite_code } = uni.getStorageSync('userCont');
                    this.qrUrl = this.generateQrUrl(invite_code);
                    this.newNub ++ 
                    this.show = true
                }else{
                    this.show = false
                }
            },
            async getLatestWinAuction() {
				try {
					const res = await this.$http.post(this.$apiObj.LatestWinAuction);
                    const neData = res.data.list.data
                    neData.forEach(i=>{
                        console.log(i.auction_goods_id);
                    })
                    if(neData.length > 0) {
                        this.newArr = neData
                        this.closeOverLay()
                    }
				} catch (error) {
					console.error(error);
				}
			},
            toGift(){
                uni.navigateTo({
                    url: '/pages/mine/auctionM?num=' + 3
                })
            },
            generateQrUrl(invite_code) {
				return this.$baseUrl + 'pages/topromote/activity/spread?invite_code=' + invite_code + '&shopId=' + this.auction_goods_id;
			},
            copyUrl(){
                console.log('1');
                this.onfenxingShow = true
            },
            // 链接分享
            ontweet() {
				let url = `https://twitter.com/intent/tweet?url=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
            onfacebook() {
				let url = `https://www.facebook.com/sharer/sharer.php?u=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
            // 分享--加分享次数
			onAuctionorderShare() {
				this.$http.post(this.$apiObj.AuctionorderShare, {
					auction_goods_id: this.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						// this.onAuctionDetail()
					}
				})
			},
            onUrlClick() {
				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = this.qrUrl;
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
            // 取消分享
			toggle2Close() {
				this.onfenxingShow = false
			},
			createWebSocket() {
				const {token,auth_token} = uni.getStorageSync('userinfo');
				const url = 'wss://kjtest.ysxrj.cn:2088/'
				const ws = new WebSocket(url)
				ws.onopen = () => {
					const _data = {
						c: 'ImBase',
						a: 'login',
						data: {
                            identity:"imuser",
                            platform:"ios",
                            tokens:{"im_tourists_token":token,auth_token}
                        }
					};
					ws.send(JSON.stringify(_data));
				};
				ws.onmessage = (evt) => {
                    const resData = JSON.parse(evt.data)
                    console.log(resData);
					if (evt.data) {
						if (resData?.data?.status === 1) {
							console.log('弹提示--------------------------------------------------------');
							this.handleWarn()
						} else {
                            console.log('其他');
						}
					}
				}

				ws.onclose = () => {
					// this.reconnect()
				}
				ws.onerror = () => {
					// this.reconnect()
				}
			},
            handleWarn() {
                const innerAudioContext = uni.createInnerAudioContext();
                // innerAudioContext.autoplay = true;
                innerAudioContext.src = this.audio
                innerAudioContext.loop = false;
                innerAudioContext.onPlay(() => {
                    console.log('开始播放');
                });
                let loopCount = 0;
                innerAudioContext.onEnded(() => {
                    loopCount++;
                    if (loopCount >= 3) {
                        innerAudioContext.stop();
                    } else {
                        innerAudioContext.play();
                    }
                });

                innerAudioContext.play();
            },
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		height: 100%;
        position: relative;
        .imgTop{
            width: 100%;
            height: 225rpx;
		    background-size: 100% 660rpx;
        }
        .imgFooter{
            width: 400rpx;
            height: 104rpx;
            position: absolute;
            top: 70%;
            right: -2%;
            background: url('/static/Bell/footer.png') no-repeat;
            background-size:100% 100%;
            padding: 40rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            .imgFooter-text{
                color: rgb(255, 255, 255);
                font-size: 32rpx;
                font-weight: 700;
                margin-bottom: 20rpx;
            }
        }
        .imgShare{
            width: 224rpx;
            height: 120rpx;
            position: absolute;
            top: 71%;
            left: 2%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 130px;
            transform: translate(0px, 4px);
            border-radius: 100rpx;
            border: 1px solid #fff;
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
        .imgTrumpet{
            .imgTrumpet-shop-img{
                position: absolute;
                top: 40%;
                left: 52%;
                transform: translate(-50%, -50%);
                width: 200rpx;
                height: 200rpx;
                image{
                    width: 200rpx;
                    height: 200rpx;
                }
            }
            .imgTrumpet-img{
                width: 678rpx;
                height: 672rpx;
                image{
                    width: 678rpx;
                    height: 672rpx;
                }
            }
            .imgTrumpet-text{
                color: rgb(255, 255, 255);
                font-size: 32rpx;
                text-align: center;
            }
            position: absolute;
            top: 45%;
            left: 50%;
            z-index: 101;
            transform: translate(-50%, -50%);
            z-index: 101;
        }
        .imgLottery{
            width: 490rpx;
            height: 260rpx;
            position: absolute;
            top: 6%;
            left: 50%;
            transform: translate(-50%,0);
        }
        .imgClose{
            width: 64rpx;
            height: 64rpx;
            position: absolute;
            left: 50%;
            top: 80%;
            transform: translate(-50%, 30rpx);
        }
	}
    .fenxiang {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
    .bell-shop-name{
        color: rgb(255, 255, 255);
        font-size: 28rpx;
        font-weight: 700;
        position: absolute;
        top: 18%;
        left: 50%;
        transform: translate(-50%, 0px);
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
	.share-pop {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffffff;
		border-radius: 20rpx 20rpx 0px 0px;

		.share-t {
			font-size: 28rpx;
			font-weight: 550;
			text-align: center;
			padding: 30rpx;
		}

		.share-ul {
			display: flex;
			flex-wrap: wrap;
			padding: 50rpx 30rpx;
			text-align: center;

			.share-li {
				width: 33.3333%;
				text-decoration: none;

				.icon {
					width: 90rpx;
					height: 90rpx;
					margin: 0 auto;
				}

				.t {
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					// line-height: 1;
					margin-top: 25rpx;
				}
			}
		}

		.share-bot {
			padding: 40rpx 30rpx;
			border-top: 1px solid #f5f5f5;

			.share-btn {
				font-size: 28rpx;
				font-weight: 550;
				width: 100%;
				padding: 0;
				margin: 0;
			}
		}
	}
</style>