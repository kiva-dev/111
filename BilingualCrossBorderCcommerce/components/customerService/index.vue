<template>
  <view class="leftSider" :class="siderClasses">
    <view class="imgArr" v-show="imgShow">
      <image src="/static/images/mine/download.png" class="minImg" alt="" @click="toMessage('/pages/auction/download')">
	  <view>
      	<image src="/static/images/mine/aixin.png" class="minImg" alt="" @click="checkApp()">
	  </view>
      <view class="people">
        <image src="/static/images/mine/p.png" class="pImg" alt="" @click="toMessage('/pages/auction/association')">
      </view>
      <image src="/static/images/mine/listener.png" class="minImg" alt="" @click="openSession()">
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
		showContact: false,
    };
  },
  computed: {
    siderClasses() {
      return [this.transformClass ? 'removeRightX' : 'removeLeftX', 'shopCart'];
    }
  },
  methods: {
	checkApp() {
		this.showContact = true;
		this.$emit("showContactFun",this.showContact);
	},
	
	isLogin() {
		const userinfo = uni.getStorageSync('userinfo');
		if (!userinfo || !userinfo.token) {
			this.handleNotLoggedIn();
		} else {
			const token = userinfo.token.split('|');
			const time = Math.floor(Date.now() / 1000);
			if (parseInt(token[2]) - 2 < time) {
				this.handleExpiredToken();
			} else {
				this.handleValidLogin(userinfo.token, userinfo.auth_token);
			}
		}
	},
	handleNotLoggedIn() {
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
		height: 380rpx;
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