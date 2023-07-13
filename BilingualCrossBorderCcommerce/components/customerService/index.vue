<template>
  <view class="leftSider" :class="siderClasses">
    <view class="imgArr" v-show="imgShow">
      <img src="/static/images/mine/aixin.png" class="minImg" alt="" @click="toMessage('/pages/message/message')">
      <view class="people">
        <img src="/static/images/mine/p.png" class="pImg" alt="">
      </view>
      <img src="/static/images/mine/listener.png" class="minImg" alt="">
    </view>
    <image src="/static/images/new-index/addImg.png" class="newListImgDeg" v-if="imgShow" @click="toggleImage"></image>
    <image src="/static/images/new-index/addImg.png" class="newListImg" v-else @click="toggleImage" ></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgShow: true,
      transformClass: false,
      timer: null,
    };
  },
  computed: {
    siderClasses() {
      return [this.transformClass ? 'removeRightX' : 'removeLeftX', 'shopCart'];
    }
  },
  methods: {
    handleScroll() {
      this.transformClass = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.transformClass = false;
      }, 1000);
    },
    handleNavigation(url) {
      this.$router.push(url);
    },
    toggleImage() {
      this.imgShow = !this.imgShow;
    },
    toMessage(url) {
      uni.navigateTo({
        url
      })
    },
  },
};
</script>

<style lang="less" scoped>
.leftSider {
	position: fixed;
	right: 32rpx; //-50
	bottom: 200rpx;
	z-index: 100;

	.gwc {
		width: 92rpx;
		height: 92rpx;
	}

	.gz {
		width: 92rpx;
		height: 92rpx;
	}

	.newListImg {
		width: 92rpx;
		height: 92rpx;
	}

	.newListImgDeg {
		width: 92rpx;
		height: 92rpx;
		margin-top: 30rpx;
		transform: rotate(-45deg);
	}

	//三个入口
	.imgArr {
		background: #fff;
		width: 92rpx;
		height: 280rpx;
		border-radius: 45rpx;
		box-shadow: 0 0 20rpx rgba(198, 198, 198, 0.3);
		text-align: center;

		.people {
			margin-top: 30rpx;

			.pImg {
				width: 45rpx;
				height: 40rpx;
			}
		}

		.minImg {
			width: 45rpx;
			height: 45rpx;
			text-align: center;
			margin-top: 40rpx;
		}
	}
}
.removeRightX {
	transform: translateX(80rpx);
	transition: all 0.5s ease;
}

.removeLeftX {
	transform: translateX(0);
	transition: all 0.5s ease;
}
</style>