<template>
  <view class="leftSider" :class="siderClasses">
    <view class="imgArr" :class="imgArrFrames" >
      <image v-if="isDownloadVisibility" src="/static/images/mine/download.png" class="minImg" alt="" @click="toDownload('/pages/auction/download')">
      <image v-if="isContactVisibility" src="/static/images/mine/aixin.png" class="minImg" alt="" @click="checkApp()">
      <view class="people" v-if="isGroupVisibility">
        <image src="/static/images/mine/p.png" class="pImg" alt="" @click="toMessage('/pages/auction/association')">
      </view>
      <image src="/static/images/mine/listener.png" class="minImg" alt="" @click="openSession()">
    </view>
    <image src="/static/images/new-index/addImg.png" class="newListImgDeg" v-if="imgShow" @click="toggleImage"></image>
    <image src="/static/images/new-index/addImg.png" class="newListImg" v-else @click="toggleImage" ></image>
  </view>

</template>

<script>
/**
 * customerService 客服
 * @property {Boolean} isDownloadVisibility 是否显示下载
 * @property {Boolean} isContactVisibility 是否显示社交联系
 * @property {Boolean} isGroupVisibility 是否显示社群
 * @event {Function} showContactFun 展开分享事件
 * @example <customerService ref="customerService" @showContactFun="showContactFun" />
 */
export default {
	props:{
		isDownloadVisibility: {
      type: Boolean,
      default: true
    },
		isContactVisibility: {
      type: Boolean,
      default: true
    },
		isGroupVisibility: {
      type: Boolean,
      default: true
    },
	},
  data() {
    return {
      imgShow: true,
      transformClass: false,
      timer: null,
      showContact: false,
    };
  },
  computed: {
    siderClasses() {
      return [this.transformClass ? 'removeRightX' : 'removeLeftX', 'shopCart'];
    },
	imgArrFrames(){
		return [this.imgShow ? 'active' : 'close'];
	}
  },
  methods: {
    checkApp() {
      this.showContact = true;
      this.$emit("showContactFun",this.showContact);
    },
    
    isLogin() {
      const userinfo = uni.getStorageSync('userinfo');
      const _token = uni.getStorageSync('token');
      if (!userinfo?.token || !_token || _token.trim() === '') {
        this.handleNotLoggedIn();
      } else {
        const tokenArr = userinfo.token.split('|');
        const expirationTime = parseInt(tokenArr[2]) - 2;
        const currentTime = Math.floor(Date.now() / 1000);
        if (expirationTime < currentTime) {
          this.handleExpiredToken();
        } else {
          this.handleValidLogin(userinfo.token, userinfo.auth_token);
        }
      }
    },
    handleNotLoggedIn() {
      if (!uni.getStorageSync('UNI_LOCALE')) {
        uni.setStorageSync('UNI_LOCALE', 'en');
        uni.setStorageSync('locale', 'en');
      }
      if (!uni.getStorageSync('phoneCont')) {
        uni.setLocale('en');
        this.$i18n.locale = 'en';
      }
      const isEnglish = uni.getStorageSync('locale') === 'en';
      const title = isEnglish ? 'Tips' : '温馨提示';
      const content = isEnglish
        ? 'You have not logged in or your identity has expired, please log in.'
        : '您暂未登录或身份过期，请前往登录。';
      uni.showModal({
        title: title,
        content: content,
        success: (res) => {
          if (res.confirm) {
            uni.redirectTo({
              url: '/pages/public/login',
            });
          } else {
            uni.navigateBack();
          }
        },
      });
    },
    handleExpiredToken() {
      setTimeout(() => {
        this.ws.logout();
      }, 300);
    },
    handleValidLogin(token, auth_token) {
      this.ws.init(token, auth_token);
    },
    openSession: function() {
      const userinfo = uni.getStorageSync('userinfo');
      this.isLogin()
      if (!userinfo || !userinfo.token) {
        return;
      }
      this.ws.pageFun(() => {
        this.ws.send({ c: 'Message', a: 'assignCsr', data: {} })
      })
    },
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
		const userinfo = uni.getStorageSync('userinfo');
		this.isLogin()
		if (!userinfo || !userinfo.token) {
			return;
		}
		uni.navigateTo({
			url
		})
    },
    toDownload(url) {
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
	left: 32rpx; //-50
	bottom: 200rpx;
	z-index: 100;
	overflow: hidden;
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
		// height: 380rpx;
		border-radius: 45rpx;
		box-shadow: 0 0 20rpx rgba(198, 198, 198, 0.3);
		text-align: center;
		overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
		.people {
			margin: 25rpx 0;
			.pImg {
				width: 45rpx;
				height: 40rpx;
			}
		}

		.minImg {
			width: 45rpx;
			height: 45rpx;
			text-align: center;
			margin: 25rpx 0;
		}
	}
}
.active {
	animation: btns-open 1s ease-in forwards;
}
.close {
	animation: btns-close 1s ease-in forwards;
}
@keyframes btns-open {
    0% {
      height: 45rpx;
    }
	 25% {
      height: 100rpx;
    }
    50% {
      height: 120rpx;
    }
    100% {
      height: 100%;
    }
}

@keyframes btns-close {
  0% {
    height: 100%;
  }
  25% {
    height: 200rpx;
  }
  50% {
    height: 120rpx;
  }
  100% {
    height: 0;
  }
}
.removeRightX {
  transform: translateX(-80rpx);
  transition: all 0.5s ease;
}

.removeLeftX {
  transform: translateX(0);
  transition: all 0.5s ease;
}

</style>