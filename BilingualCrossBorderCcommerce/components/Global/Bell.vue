<template>
    <view class="page-body">
	    <u-overlay :show="show" @click="show = false">
            <view class="warp">
                <image class="imgTop" src="@/static/Bell/imgTop.png"></image>
                <image class="imgFooter" src="@/static/Bell/footer.png"></image>
                <image class="imgTrumpet" src="@/static/Bell/trumpet.png"></image>
                <view class="rect" @tap.stop></view>
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
		data() {
			return {
                show:true,
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
		},

		methods: {
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
        }
        .imgFooter{
            width: 100%;
            height: 458rpx;
            position: absolute;
            bottom: 0;
            left: 0;
        }
        .imgTrumpet{
            width: 280rpx;
            height: 280rpx;
            position: absolute;
            top: 50%;
            left: 10%;

        }
	}

	.rect {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}
</style>