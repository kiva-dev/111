<template>
  <view class="invite-page">
    <Headers>
      <template v-slot:header>
        <view class="header"> {{$t('top.yqhy')}} </view>
      </template>
      <template v-slot:right>
        <view class="queryCont" @click="onQuery" style="margin-right:20rpx;">{{$t('top.yqjl')}}</view>
      </template>
    </Headers>
    <!-- <view class="invite-box">
      <image class="img" src="../../static/images/in1.jpg"></image>
      <view class="invite-bot" @click="toggle">
        <image class="img" src="../../static/images/in3.png"></image>
      </view>
    </view> -->
    <image class="invite-home" src="../../static/invite-home.png"></image>
    <view class="invite-box" v-if="isShopCont">
      <view class="max-title" style="font-size:48rpx;">New register free credit</view>
      <view class="max-title2" style="font-size:36rpx;"> faster invite your friends to join now!</view>
      <view class="conter">
        <view class="title">
          <image class="invite-tobu" src="../../static/invite-tobu.png"></image>
          <view class="name">invite your friends</view>
        </view>
        <!-- <view class="cent">From now on, users who successfully invite friends to register KOLIBRI account, the inviter will be rewarded free credit of RM{{invite_send_money}} in your KOLIBRI E-wallet balance.Beside that's, invitee can free credit of RM{{beinvited_send_money}} as a reward. The credit balance can be used to pay for all orders on the platform, and the more you invite, the more you get. What are you waiting for, join us now.</view> -->
        <view class="btnsub" @click="toggle">Act Now</view>
        <view class="txt" @click="onpopup2">Click to view the invite code</view>
      </view>
      <!-- <view class="conter conter1">
        <view class="title">
          <image class="invite-tobu" src="../../static/invite-tobu.png"></image>
          <view class="name" style="line-height: 31rpx">Just three steps to easily get invitation benefits</view>
        </view>
        <view class="cent">
          <view>1. The inviter clicks [Act Now] to share the link with the invitee, or sends his/her own invitation code [Click to view the invite code] to the invitee.</view>
          <view>2. The invitee clicks the link shared by the inviter and successfully completes the KOLIBR account registration, or fills in the inviter's invitation code on the web page or app and successfully completes the registration, then a valid invitation is reached.</view>
          <view>3. The wallet balance of the inviter and the invitee will be rewarded by the corresponding platform.</view>
          <br>
          <view>The more you invite, the more you get, the more benefits you get.</view>
          <view>Valid invitations can get corresponding benefits, and there is no limit to the number of valid invitations during the event.</view>
          <br>
          <view>Note: 1. The invitee needs to click on the link shared by the inviter to register, or fill in the inviter's invitation code when registering, in order to bind the relationship between the two parties and will not affect the distribution of benefits.</view>
          <view>2. The balance gifted by the platform is universal and can be used for the purchase and payment of all products on the platform, but does not support cash withdrawal, and the cash withdrawal amount does not include the free credit or gift amount.</view>
          <view>3. The right to interpret this activity belongs to the KOLIBRI platform.</view>
        </view>
      </view> -->
    </view>
    <view class="invite-box" v-else>
      <view class="max-title">注册即送钱包余额</view>
      <view class="max-title2">快邀请你的小伙伴行动吧</view>
      <view class="conter">
        <view class="title">
          <image class="invite-tobu" src="../../static/invite-tobu.png"></image>
          <view class="name">邀请好友</view>
        </view>
        <!-- <view class="cent">即日起，成功邀请好友注册KOLIBRI账号的用户，邀请人可获得平台奖励赠送余额RM{{invite_send_money}}，被邀请人可获得平台奖励赠送余额RM{{beinvited_send_money}}。赠送余额可用于平台所有订单支付，多邀请多获取。还等什么，赶紧行动吧~</view> -->
        <view class="btnsub" @click="toggle">立刻行动</view>
        <view class="txt" @click="onpopup2">点击查看邀请码</view>
      </view>
      <!-- <view class="conter conter1">
        <view class="title">
          <image class="invite-tobu" src="../../static/invite-tobu.png"></image>
          <view class="name">只需三步，轻松获得邀请福利</view>
        </view>
        <view class="cent">
          <view>1、邀请人点击【立刻行动】将链接分享给被邀请人，或将自己的邀请码【点击查看邀请码】发送给被邀请人</view>
          <view>2、被邀请人点击邀请人分享的链接并成功完成KOLIBR账号注册，或在网页、app填写邀请人的邀请码并成功完成注册，即达成有效邀请</view>
          <view>3、邀请人和被邀请人的钱包余额获得对应的平台赠送奖励</view>
          <br>
          <view>多邀请多获取，福利多多送不停</view>
          <view>有效邀请即可获取对应福利，活动期间不限制有效邀请次数</view>
          <br>
          <view>注意：1、被邀请人需要点击邀请人分享的链接注册，或者在注册时填写邀请人的邀请码，才能绑定双方关系，不影响福利的发放</view>
          <view>2、平台赠送的余额全场通用，可用于平台内所有商品的购买支付，但不支持提现，可提现金额不包含赠送金额</view>
          <view>3、本活动解释权归KOLIBRI平台所有</view>
        </view>
      </view> -->
    </view>
    <!--邀请码弹出 start-->
    <uni-popup ref="popup2" type="center">
      <view class="yqm-cont" v-if="isShopCont">
        <image class="query" @click="query" src="../../static/query.png"></image>
        <image class="invite-tobu" src="../../static/invite-bj.png"></image>
        <view class="cont">
          <view class="title">Invitation code</view>
          <view class="num">{{invite_code}}</view>
          <view class="fuzhi" @click="onCopy(invite_code)">copy</view>
        </view>
      </view>
      <view class="yqm-cont" v-else>
        <image class="query" @click="query" src="../../static/query.png"></image>
        <image class="invite-tobu" src="../../static/invite-bj.png"></image>
        <view class="cont">
          <view class="title">邀请码</view>
          <view class="num">{{invite_code}}</view>
          <view class="fuzhi" @click="onCopy(invite_code)">复制</view>
        </view>
      </view>
    </uni-popup>
    <!--分享弹出 start-->
    <uni-popup ref="popup3" type="bottom">
      <view class="canvasBox">
        <view class="canvasItem">
          <image mode="widthFix" style="width:500rpx;height:450rpx" :src="canvasImg"></image>
        </view>
      </view>
      <view class="share-pop">
        <view class="share-t">
          <block v-if="isShopCont">Share to</block>
          <block v-else>分享到</block>
        </view>
        <view class="share-ul">
          <view class="share-li" @click="ontweet">
            <view class="icon">
              <image class="img" src="../../static/images/share21.png"></image>
            </view>
            <view class="t" style="color:#000">twitter</view>
          </view>
          <!-- <view class="share-li">
            <view class="icon">
              <image class="img" src="../../static/images/share22.png"></image>
            </view>
            <view class="t" style="color:#000">Google</view>
          </view> -->
          <view class="share-li" @click="onfacebook">
            <view class="icon">
              <image class="img" src="../../static/images/share23.png"></image>
            </view>
            <view class="t" style="color:#000">Facebook</view>
          </view>
          <view class="share-li" @click="onSaveImg">
            <view class="icon">
              <image class="img" src="../../static/baocunhaibao.png"></image>
            </view>
            <view class="t">
              <block v-if="isShopCont">Save Poster</block>
              <block v-else>保存海报</block>
            </view>
          </view>
          <view class="share-li" @click="onCopy(qrUrl)">
            <view class="icon">
              <image class="img" src="../../static/images/share25.png"></image>
            </view>
            <view class="t">
              <block v-if="isShopCont">Copy Link</block>
              <block v-else>复制链接</block>
            </view>
          </view>
        </view>
        <view class="share-bot">
          <button class="share-btn" @click="toggle3Close">
            <block v-if="isShopCont">cancel</block>
            <block v-else>取消</block>
          </button>
        </view>
      </view>
    </uni-popup>
    <!--分享弹出 end-->
    <view class="zhezhao">
      <!-- 矩形 -->
      <canvas class="f__canvas" style="width:200px;height:100px" canvas-id="rectangleCanvas" id="rectangleCanvas"></canvas>
      <!-- 矩形+边框 -->
      <canvas class="f__canvas" style="width:200px;height:100px" canvas-id="rectangleBorderCanvas" id="rectangleBorderCanvas"></canvas>
      <!-- 头像 -->
      <canvas class="f__canvas" style="width:100px;height:100px" canvas-id="circularCanvas" id="circularCanvas"></canvas>
      <!-- 不变形图片-最短边显示完整 -->
      <canvas class="f__canvas" style="width:200px;height:200px" canvas-id="coverCanvas" id="coverCanvas"></canvas>
      <!-- 文本自定义换行超出省略 -->
      <canvas class="f__canvas" style="width:1000px;height:300px" canvas-id="textCanvas" id="textCanvas"></canvas>
      <!-- 英文换行不截断，居中显示 -->
      <canvas class="f__canvas" style="width:1000px;height:300px" canvas-id="textCanvas2" id="textCanvas2"></canvas>
      <!-- 按钮 -->
      <canvas class="f__canvas" style="width:260px;height:100px" canvas-id="buttonCanvas" id="buttonCanvas"></canvas>
      <!-- 海报 -->
      <canvas class="f__canvas" style="width:600px;height:730px" canvas-id="firstCanvas" id="firstCanvas"></canvas>
      <!-- 二维码 -->
      <canvas class="f__canvas" style="width:300px;height:300px;" canvas-id="qrcode" id="qrcode"></canvas>
    </view>
  </view>
</template>

<script> 
import Headers from '@/components/navHeader'
import QRCode from "qrcode"
import _canvas from '@/uni_modules/fan-canvas/canvasUtils';// 加载万能绘制方法
import { saveImg, qrcodeCanvas } from '@/uni_modules/fan-canvas/plugins/utils';// 需要保存图片和生成二维码可以引用此文件
export default {
  components: { Headers },
  data () {
    return {
      isShopCont: false,// 商品详情显示中文还是英文
      goodsTitle: '注册即送钱包余额',		// 昵称
      goodsTitle2: '快邀请你的小伙伴行动吧',		// 昵称 
      shareImage: '../../static/invite-home.png',	// 背景图片
      shareImages: '../../static/invite-tobu.png',	// 标题图片
      title: '邀请好友',		// 标题 
      qrUrl: '',	// 生成二维码的链接
      invite_code: "",// 邀请码
      canvasImg: '',    //生成的海报图片
      qrcodeImg: '',    //二维码本地图片
      codetitle: '',
      // inviteLink:'https://www.facebook.com/sharer/'
      beinvited_send_money: 0,// 被邀请人金额
      invite_send_money: 0,// 邀请人金额
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.goodsTitle = uni.getStorageSync('locale') == 'en' ? 'New register free credit' : '注册即送钱包余额'
    this.goodsTitle2 = uni.getStorageSync('locale') == 'en' ? 'faster invite your friends to join now!' : '快邀请你的小伙伴行动吧'
    this.title = uni.getStorageSync('locale') == 'en' ? 'invite your friends' : '邀请好友'
    this.codetitle = uni.getStorageSync('locale') == 'en' ? 'Invitation code' : '邀请码'
    // 获取个人信息
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        uni.setStorageSync('userCont', res.data)
        this.invite_code = res.data.invite_code
        this.qrUrl = 'https://h5.kolibrimall.com/h5/#/?invite_code=' + res.data.invite_code// 生成二维码的链接
        // this.qrUrl = 'http://localhost:8081/h5/#/?invite_code=' + res.data.invite_code// 生成二维码的链接
        this.createQrcode()
      }
    })
    // 邀请金额
    this.$http.post(this.$apiObj.IndexInviteMoney).then(res => {
      if (res.code == 1) {
        this.beinvited_send_money = res.data.beinvited_send_money
        this.invite_send_money = res.data.invite_send_money
      }
    })
  },
  methods: {
    async createGoodsPoster () {
      if (this.canvasImg) {
        return
      }
      var that = this;
      uni.showLoading({
        title: '海报生成中'
      });
      const cvsW = 375;
      const cvsH = 660;
      const goodsH = 400;
      const logo_w = 100;
      const margin = 30;
      let family = " 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei',sans-serif";
      let ctx = uni.createCanvasContext('firstCanvas');
      // 绘制矩形
      _canvas.fillRoundRect(ctx, 0, 0, cvsW, cvsH, 20, "#ffffff");
      // 同步加载图片
      var logo = await _canvas.getImageInfo(this.shareImage);
      if (logo.path) {
        ctx.drawImage(this.shareImage, 0, 0, 375, 660); //填充进图片
        // 标题
        ctx.setFillStyle('#fff')  //昵称
        ctx.setTextAlign('left')
        ctx.setFontSize(24)
        ctx.fillText(this.goodsTitle, 50, 70);
        ctx.setFillStyle('#fff')  //昵称
        ctx.setTextAlign('left')
        ctx.setFontSize(18)
        ctx.fillText(this.goodsTitle2, 30, 120);
        // 正方形
        ctx.fillStyle = "rgba(255,255, 255,1)"
        ctx.fillRect(15, 345, 345, 250)
        // 标题
        ctx.drawImage(this.shareImages, 80, 330, 201, 31); //填充进图片
        ctx.setFillStyle('#fff')  //邀请码
        ctx.setTextAlign('left')
        ctx.setFontSize(18)
        ctx.fillText(this.title, 100, 350);
        // 邀请码
        ctx.setFillStyle('#FF4406')  //邀请码
        ctx.setTextAlign('left')
        ctx.setFontSize(12)
        ctx.fillText(this.codetitle + '：' + this.invite_code, 128, 570);
        // 绘制二维码
        ctx.drawImage(that.qrcodeImg, 110, 390, 150, 150);
        // 绘制图片
        ctx.draw(false, function () {
          uni.canvasToTempFilePath({
            width: cvsW,
            height: cvsH,
            canvasId: 'firstCanvas',
            success (res) {
              uni.hideLoading();
              that.canvasImg = res.tempFilePath
            }
          }, that)
        }, 500)
      } else {
        uni.hideLoading();
        uni.showToast({
          title: '海报制作失败',
          icon: 'none'
        });
      }
    },
    // 创建二维码
    createQrcode () {
      var that = this
      qrcodeCanvas('qrcode', that.qrUrl, 600, 600);
      const ctx = uni.createCanvasContext('qrcode');
      ctx.draw(true, function () {
        uni.canvasToTempFilePath({
          width: 600,
          height: 600,
          canvasId: 'qrcode',
          success (res) {
            // 二维码本地图
            that.qrcodeImg = res.tempFilePath
          }
        }, that)
      })
    },
    // 保存图片
    async onSaveImg () {
      let imgUrl = "";
      if (this.canvasImg) {
        imgUrl = await this.canvasImg;
        saveImg(imgUrl)
      }
    },
    toggle () {
      this.createGoodsPoster()
      // this.$refs.popup1.open()
      this.$refs.popup3.open()
    },
    toggle3Close () {
      this.$refs.popup3.close()
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    onpopup2 () {
      this.$refs.popup2.open()
    },
    query () {
      this.$refs.popup2.close()
    },
    onfacebook () {
      let url = `https://www.facebook.com/sharer/sharer.php?u=${this.qrUrl}`
      // #ifdef H5
      window.open(url)
      // #endif
      // #ifndef H5
      plus.runtime.openURL(
        url,
        // 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
        function (err) {
          console.log(err);
        }
      );
      // #endif
    },
    ontweet () {
      let url = `https://twitter.com/intent/tweet?url=${this.qrUrl}`
      // #ifdef H5
      window.open(url)
      // #endif
      // #ifndef H5
      plus.runtime.openURL(
        url,
        // 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
        function (err) {
          console.log(err);
        }
      );
      // #endif
    },
    // 复制
    onCopy (e) {
      // this.$emit('copy', this.shopCont.tui_express_no);
      // #ifdef H5
      let oInput = document.createElement('input');
      oInput.value = e; //要复制的订单编号
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      uni.showToast({ icon: 'none', title: this.$t('user.order.detail.fzcg') })
      oInput.remove()
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: e,
        success: () => {
          uni.showToast({ icon: 'none', title: this.$t('user.order.detail.fzcg') })
        }
      });
      // #endif
    },
    onQuery () {
      uni.navigateTo({
        url: './record'
      })
    }
  },
  // 点击取消按钮
  onNavigationBarButtonTap: function () {
    uni.navigateTo({
      url: './record'
    })
  },
}
</script>
<style>
page {
  padding-bottom: 40rpx;
  background: #ff9c2b;
}
</style>
<style lang="less" scoped>
page::before {
  content: "";
  position: fixed;
  right: 10rpx;
}
.invite-page {
  position: relative;
  // .invite-box {
  //   width: 100%;
  //   height: 100vh;
  //   position: fixed;
  //   width: 100%;
  //   display: flex;
  //   align-items: flex-end;
  //   .invite-bot {
  //     position: absolute;
  //     bottom: 160rpx;
  //     left: 50%;
  //     height: 133rpx;
  //     width: 678rpx;
  //     margin-left: -339rpx;
  //   }
  // }
  // .share-pop {
  //   width: 670rpx;
  //   border-radius: 20rpx;
  //   overflow: hidden;
  //   background: rgba(0, 0, 0, 0.5);
  //   .share-hd {
  //     height: 920rpx;
  //   }
  //   .share-bd {
  //     padding: 20rpx 30rpx;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     .bd-dl {
  //       display: flex;
  //       display: flex;
  //       align-items: center;
  //       flex: 1;
  //       margin-right: 20rpx;
  //       .dt {
  //         width: 88rpx;
  //         height: 88rpx;
  //         min-width: 88rpx;
  //         margin-right: 20rpx;
  //         border-radius: 100%;
  //         overflow: hidden;
  //       }
  //       .dd {
  //         color: #fff;
  //         width: calc(100% - 158rpx);
  //         .t {
  //           font-size: 28rpx;
  //           font-weight: 550;
  //         }
  //         .c {
  //           font-size: 26rpx;
  //           line-height: 1.2;
  //           margin-top: 10rpx;
  //         }
  //       }
  //     }
  //     .bd-wx {
  //       background: #ffffff;
  //       border-radius: 10rpx;
  //       padding: 10rpx;
  //       width: 150rpx;
  //       height: 150rpx;
  //     }
  //   }
  // }
  .invite-home {
    position: absolute;
    width: 750rpx;
    height: 1206rpx;
  }
  .invite-box {
    position: relative;
    .max-title {
      padding-top: 60rpx;
      text-align: center;
      font-size: 68rpx;
      color: #ffffff;
    }
    .max-title2 {
      text-align: center;
      font-size: 58rpx;
      color: #ffffff;
    }
    .conter {
      margin: 270rpx auto 0;
      width: 690rpx;
      background: #f5f5f5;
      border-radius: 16px;
      padding: 0 0 40rpx 0;
      position: relative;
      &.conter1 {
        margin-top: 80rpx;
        .title {
          .name {
            font-size: 26rpx;
          }
        }
        .cent {
          text-align: left;
        }
      }
      .title {
        width: 402rpx;
        height: 62rpx;
        position: absolute;
        left: calc(50% - 201rpx);
        top: -31rpx;
        .invite-tobu {
          position: absolute;
          width: 402rpx;
          height: 62rpx;
        }
        .name {
          position: relative;
          line-height: 62rpx;
          text-align: center;
          font-size: 36rpx;
          color: #fff;
        }
      }
      .cent {
        width: 625rpx;
        margin: 0 auto;
        text-align: center;
        padding-top: 60rpx;
      }
      .btnsub {
        margin: 60rpx auto 0;
        text-align: center;
        width: 560rpx;
        height: 88rpx;
        background: linear-gradient(0deg, #ff881f, #ff3500);
        border-radius: 44rpx;
        font-size: 36rpx;
        line-height: 88rpx;
        color: #fff;
      }
      .txt {
        margin-top: 35rpx;
        text-align: center;
        font-size: 28rpx;
        font-weight: 600;
        color: #ff4406;
      }
    }
  }
}
.yqm-cont {
  width: 528rpx;
  height: 474rpx;
  position: relative;
  .query {
    position: absolute;
    top: -70rpx;
    right: 0;
    width: 48rpx;
    height: 48rpx;
  }
  .invite-tobu {
    position: absolute;
    width: 528rpx;
    height: 474rpx;
  }
  .cont {
    position: relative;
    text-align: center;
    padding-top: 40rpx;
    .title {
      font-size: 36rpx;
      color: #eda431;
    }
    .num {
      margin-top: 50rpx;
      font-size: 80rpx;
      font-weight: 600;
      color: #fc575a;
    }
    .fuzhi {
      margin: 120rpx auto 0;
      width: 332rpx;
      height: 72rpx;
      line-height: 72rpx;
      background: linear-gradient(0deg, #ffc600, #fff945);
      border-radius: 36rpx;
      font-size: 30rpx;
      color: #b56408;
    }
  }
}
.canvasBox {
  margin: 0 auto;
  width: 500rpx;
  background: #fff;
}
.button {
  margin: 10rpx auto;
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: red;
  text-align: center;
  color: #fff;
  border-radius: 10rpx;
}
.zhezhao {
  position: fixed;
  top: -10000000rpx;
  right: -10000000rpx;
}
//share-pop S
.share-pop {
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
      width: 25%;
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
        line-height: 1;
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
//share-pop E
</style>
