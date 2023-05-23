<template>
  <view class="up-page">
    <!--up-box start-->
    <view class="up-box">
      <view class="li">
        <view class="label">{{$t('user.upgrade.shangjiamc')}}</view>
        <view class="li-r">
          <input class="input" v-if="status==='0'||status==1" disabled v-model="shop_name" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrsjmc')" />
          <input class="input" v-else v-model="shop_name" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrsjmc')" />
        </view>
      </view>
      <view class="li">
        <view class="label">{{$t('user.upgrade.lxr')}}</view>
        <view class="li-r">
          <input class="input" v-if="status==='0'||status==1" disabled v-model="con_name" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrlxrxm')" />
          <input class="input" v-else v-model="con_name" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrlxrxm')" />
        </view>
      </view>
      <view class="li">
        <view class="label">{{$t('user.mine.email')}}</view>
        <view class="li-r">
          <input class="input" disabled v-model="userCont.email" placeholder-class="color-999" :placeholder="$t('qingsremail')" />
        </view>
      </view>
      <view class="li">
        <view class="label">{{$t('yinhangkahao')}}</view>
        <view class="li-r">
          <input class="input" v-if="status==='0'||status==1" disabled v-model="account" placeholder-class="color-999" :placeholder="$t('qsryhkh')" />
          <input class="input" v-else v-model="account" placeholder-class="color-999" :placeholder="$t('qsryhkh')" />
        </view>
      </view>
      <view class="li">
        <view class="label">{{$t('kaihuyh')}}</view>
        <view class="li-r">
          <input class="input" v-if="status==='0'||status==1" disabled v-model="bank_name" placeholder-class="color-999" :placeholder="$t('qsrkhhname')" />
          <input class="input" v-else v-model="bank_name" placeholder-class="color-999" :placeholder="$t('qsrkhhname')" />
        </view>
      </view>
      <view class="li">
        <view class="label">{{$t('cikaren')}}</view>
        <view class="li-r">
          <input class="input" v-if="status==='0'||status==1" disabled v-model="name" placeholder-class="color-999" :placeholder="$t('qsrckrxm')" />
          <input class="input" v-else v-model="name" placeholder-class="color-999" :placeholder="$t('qsrckrxm')" />
        </view>
      </view>
      <view class="li">
        <view class="label">{{$t('guojkhdm')}}</view>
        <view class="li-r">
          <input class="input" v-if="status==='0'||status==1" disabled v-model="swift_code" placeholder-class="color-999" :placeholder="$t('qsrgjhkdm')" />
          <input class="input" v-else v-model="swift_code" placeholder-class="color-999" :placeholder="$t('qsrgjhkdm')" />
        </view>
      </view>
      <!-- <view class="li">
        <view class="label">银行卡类型</view>
        <view class="li-r">
          储蓄卡
        </view>
      </view> -->
      <!-- <view class="li">
        <view class="label">{{$t('user.upgrade.lxdh')}}</view>
        <view class="li-r">
          <view class="li-left" v-if="status==='0'||status==1">
            <view class="code">{{mobile_area_code}}</view>
            <view class="down-icon">
              <image class="img" src="/static/images/mine/down1.png"></image>
            </view>
          </view>
          <view class="li-left" v-else @click="navClicks">
            <view class="code">{{mobile_area_code}}</view>
            <view class="down-icon">
              <image class="img" src="/static/images/mine/down1.png"></image>
            </view>
          </view>
          <input class="input" v-if="status==='0'||status==1" disabled v-model="mobile" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrlxdh')" />
          <input class="input" v-else v-model="mobile" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrlxdh')" />
        </view>
      </view> -->
      <view class="item">
        <view class="label">{{$t('user.upgrade.logo')}}</view>
        <view class="upload-li">
          <view class="up-img" slot="" v-if="status==='0'||status==1">
            <image class="img" v-if="shop_logo" :src="shop_logo.startsWith('http') ? shop_logo : baseUrl + shop_logo"></image>
            <image class="img" v-else src="../../static/images/mine/grade9.png"></image>
          </view>
          <view class="up-img" v-else @click="chooseImage">
            <image class="img" v-if="shop_logo" :src="shop_logo.startsWith('http') ? shop_logo : baseUrl + shop_logo"></image>
            <image class="img" v-else src="../../static/images/mine/grade9.png"></image>
          </view>
        </view>
      </view>
      <!-- <view class="li">
        <view class="label">定位地址</view>
        <view class="li-r">
          <input class="input" placeholder-class="color-999" placeholder="请选择定位地址" />
        </view>
        <view class="address-icon">
          <image class="img" src="../../static/images/mine/grade8.png"></image>
        </view>
      </view> -->
      <view class="li">
        <view class="label">{{$t('user.upgrade.xxdz')}}</view>
        <view class="li-r">
          <input class="input" v-if="status==='0'||status==1" disabled v-model="address" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrxxdz')" />
          <input class="input" v-else v-model="address" placeholder-class="color-999" :placeholder="$t('user.upgrade.qsrxxdz')" />
        </view>
      </view>
      <view class="item">
        <view class="label">{{$t('user.upgrade.sqsm')}}</view>
        <view class="text-w">
          <textarea class="text" v-if="status==='0'||status==1" disabled v-model="remark" placeholder-class="color-999" :placeholder="$t('user.upgrade.qtxsqwzsm')" auto-height="true"></textarea>
          <textarea class="text" v-else v-model="remark" placeholder-class="color-999" :placeholder="$t('user.upgrade.qtxsqwzsm')" auto-height="true"></textarea>
        </view>
      </view>
      <view class="item">
        <view class="label">{{$t('user.upgrade.ryzz')}}</view>
        <view class="upload-li">
          <view class="up-img" v-if="status==='0'||status==1">
            <image class="img" v-if="license_image" :src="license_image.startsWith('http') ? license_image : baseUrl + license_image"></image>
            <image class="img" v-else src="../../static/images/mine/grade9.png"></image>
          </view>
          <view class="up-img" v-else @click="chooseImages">
            <image class="img" v-if="license_image" :src="license_image.startsWith('http') ? license_image : baseUrl + license_image"></image>
            <image class="img" v-else src="../../static/images/mine/grade9.png"></image>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="label">{{$t('user.upgrade.qtzz')}}</view>
        <view class="upload-li">
          <block v-if="status==='0'||status==1"></block>
          <view class="up-img" v-else @click="upLoadLunimg">
            <image class="img" src="../../static/images/mine/grade9.png"></image>
          </view>
          <view class="up-img" v-for="item,k in other_image" :key="k">
            <image class="img" v-if="item" :src="item.startsWith('http') ? item : baseUrl + item"></image>
          </view>
        </view>
      </view>
      <view class="li" v-if="reason">
        <view class="label">{{$t('user.upgrade.wtgyy')}}</view>
        <view class="li-r">{{reason}}</view>
      </view>
      <view class="up-bot">
        <button class="public-btn" v-if="status=='0'">{{$t('user.upgrade.shz')}}</button>
        <button class="public-btn" v-else-if="status==1">{{$t('user.upgrade.shtg')}}</button>
        <button class="public-btn" v-else @click.stop="$noMultipleClicks(navClick)">{{$t('user.upgrade.ljsq')}}</button>
      </view>
    </view>
    <!--up-box end-->
  </view>
</template>

<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      shop_name: '',// 商家名称
      con_name: '',// 联系人
      mobile_area_code: '',// 区域码
      mobile: '',// 手机号码
      shop_logo: '',// 商家logo
      address: '',// 地址
      remark: '',// 申请说明
      license_image: '',// 营业执照
      other_image: [],// 其他资质，多张图片用英文逗号隔开
      status: '',
      baseUrl: this.$baseUrl,
      reason: '',// 未通过原因
      userCont: '',
      isShopCont: false,// 中文还是英文
      account: '',// 银行卡号
      bank_name: '',// 开户行名称
      name: '',// 真实姓名
      swift_code: '',// 国籍汇款代码
    }
  },
  onLoad () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.$http.post(this.$apiObj.MineUpgradeDetail).then(res => {
      if (res.code == 1) {
        if (res.data) {
          this.shop_name = res.data.shop_name// 商家名称
          this.con_name = res.data.con_name// 联系人
          this.mobile_area_code = res.data.mobile_area_code ? res.data.mobile_area_code : this.mobile_area_code // 区域码
          this.mobile = res.data.mobile// 手机号码
          this.shop_logo = res.data.shop_logo// 商家logo
          this.address = res.data.address// 地址
          this.remark = res.data.remark// 申请说明
          this.license_image = res.data.license_image// 营业执照
          this.other_image = res.data.other_image// 其他资质，多张图片用英文逗号隔开
          this.status = res.data.status
          this.reason = res.data.reason
          this.account = res.data.account
          this.bank_name = res.data.bank_name
          this.name = res.data.name
          this.swift_code = res.data.swift_code
          if (this.isShopCont) {
            this.reason = this.getCaption(res.data.reason, 1) ? this.getCaption(res.data.reason, 1) : res.data.reason
          } else {
            this.reason = this.getCaption(res.data.reason, 0) ? this.getCaption(res.data.reason, 0) : res.data.reason
          }
        }
      }
    })
  },
  onShow () {
    if (uni.getStorageSync('phoneCont')) {
      this.mobile_area_code = JSON.parse(uni.getStorageSync('phoneCont')).code
    } else {
      this.mobile_area_code = '+60'
      let title = { city: this.$t('phone.mlxy'), code: "+60", "sou": "M" }
      uni.setStorageSync('phoneCont', JSON.stringify(title))
    }

    // 获取个人信息
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        uni.setStorageSync('userCont', res.data)
        this.userCont = res.data
      }
    })
  },
  methods: {

    getCaption (str, state) {
      if (state == 1) {
        if (str == undefined) {
          str = str
        } else {
          var indexs = str.indexOf("|")
          str = str.substring(indexs + 1, str.length);
        }
      } else {
        var index = str.indexOf("|")
        str = str.substring(0, index);
      }
      return str;
    },
    navClicks (url) {
      uni.navigateTo({
        url: '../public/ownership'
      })
    },
    // 上传图片
    chooseImage () {
      this.show = false
      uni.chooseImage({
        count: 1,
        size: 10 * 1000000,
        sizeType: ['compressed'],
        success: (res) => {
          uni.showLoading({
            title: this.$t('user.upgrade.scz'),
            mask: true
          });
          this.resImg = res.tempFilePaths[0] //这就是要的blod
          this.uploadImg(this.resImg)
        }
      })
    },
    //-----------------------------------------------结束
    uploadImg (tempFilePaths) {
      // console.log(tempFilePaths, "触发上传接口")
      uni.uploadFile({
        url: this.$baseUrl + 'api/Common/upload',
        filePath: tempFilePaths,
        name: 'file',
        header: {
          token: uni.getStorageSync('token'),
        },
        success: res => {
          var data = JSON.parse(res.data);
          if (data.code == 200) {
            this.shop_logo = data.data.url
            uni.showToast({ title: this.$t('user.upgrade.sccg'), icon: 'none', duration: 1000 });
          } else {
            uni.showToast({ title: this.$t('user.upgrade.scsb'), icon: 'none', duration: 1000 });
          }
        }
      });
    },
    // 上传图片
    chooseImages () {
      this.show = false
      uni.chooseImage({
        count: 1,
        size: 10 * 1000000,
        sizeType: ['compressed'],
        success: (res) => {
          uni.showLoading({
            title: this.$t('user.upgrade.scz'),
            mask: true
          });
          this.resImg = res.tempFilePaths[0] //这就是要的blod
          this.uploadImgs(this.resImg)
        }
      })
    },
    //-----------------------------------------------结束
    uploadImgs (tempFilePaths) {
      // console.log(tempFilePaths, "触发上传接口")
      uni.uploadFile({
        url: this.$baseUrl + 'api/Common/upload',
        filePath: tempFilePaths,
        name: 'file',
        header: {
          token: uni.getStorageSync('token'),
        },
        success: res => {
          var data = JSON.parse(res.data);
          if (data.code == 200) {
            this.license_image = data.data.url
            uni.showToast({ title: this.$t('user.upgrade.sccg'), icon: 'none', duration: 1000 });
          } else {
            uni.showToast({ title: this.$t('user.upgrade.scsb'), icon: 'none', duration: 1000 });
          }
        }
      });
    },
    // 上传资质
    upLoadLunimg () {
      let that = this
      uni.chooseImage({
        count: 9, //默认9
        // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        // sourceType: ['album'], //从相册选择
        success: function (res) {
          let tempFilePaths = res.tempFilePaths
          tempFilePaths.forEach((em, i) => {
            uni.uploadFile({
              url: that.$url + that.$apiObj.CommonUpload,
              filePath: tempFilePaths[i],
              name: 'file',
              formData: { 'token': uni.getStorageSync('token'), },
              success: (uploadFileRes) => {
                console.log('data', JSON.parse(uploadFileRes.data));
                let res = JSON.parse(uploadFileRes.data)
                if (res.code == 200) {
                  let imgs = res.data
                  that.other_image.push(imgs.url)
                }
              }
            })
          })
        }
      });
    },
    //导航点击的跳转处理函数
    navClick () {
      if (!this.shop_name) return uni.showToast({ title: this.$t('user.upgrade.qsrsjmc'), icon: 'none' })
      if (!this.con_name) return uni.showToast({ title: this.$t('user.upgrade.qsrlxrxm'), icon: 'none' })
      // if (!this.mobile) return uni.showToast({ title: this.$t('user.upgrade.qsrlxdh'), icon: 'none' })
      if (!this.account) return uni.showToast({ title: this.$t('qsryhkh'), icon: 'none' })
      if (!this.bank_name) return uni.showToast({ title: this.$t('qsrkhhname'), icon: 'none' })
      if (!this.name) return uni.showToast({ title: this.$t('qsrckrxm'), icon: 'none' })
      if (!this.shop_logo) return uni.showToast({ title: this.$t('user.upgrade.qsclogo'), icon: 'none' })
      if (!this.address) return uni.showToast({ title: this.$t('user.upgrade.qsrxxdz'), icon: 'none' })
      if (!this.remark) return uni.showToast({ title: this.$t('user.upgrade.qtxsqwzsm'), icon: 'none' })
      if (!this.license_image) return uni.showToast({ title: this.$t('user.upgrade.qscyyzz'), icon: 'none' })
      this.$http.post(this.$apiObj.MineUpgrade, {
        shop_name: this.shop_name,// 商家名称
        con_name: this.con_name,// 联系人
        account: this.account,// 银行卡号
        bank_name: this.bank_name,// 开户行名称
        name: this.name,// 真实姓名
        swift_code: this.swift_code,// 国籍汇款代码
        // mobile_area_code: this.mobile_area_code.slice(1),// 区域码
        // mobile: this.mobile,// 手机号码
        shop_logo: this.shop_logo,// 商家logo
        address: this.address,// 地址
        remark: this.remark,// 申请说明
        license_image: this.license_image,// 营业执照
        other_image: this.other_image.toString(),// 其他资质，多张图片用英文逗号隔开
      }).then(res => {
        if (res.code == 1) {
          uni.navigateTo({
            url: "./Sgrade"
          })
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.up-page {
  .up-box {
    padding: 0 30rpx;
    .li {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      padding: 36rpx 0;
      position: relative;
      .address-icon {
        width: 29rpx;
        height: 34rpx;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -17rpx;
      }

      .li-r {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .input {
        font-size: 28rpx;
        width: 100%;
      }
    }
    .label {
      font-size: 28rpx;
      width: 180rpx;
    }
    .item {
      .label {
        width: auto;
        margin-bottom: 36rpx;
      }
      padding: 36rpx 0;
      .text-w {
        background: #f9f9f9;
        border-radius: 20rpx;
        padding: 20rpx;
        .text {
          font-size: 28rpx;
        }
      }
      .upload-li {
        display: flex;
        flex-wrap: wrap;
        .up-img {
          width: 156rpx;
          height: 156rpx;
        }
      }
    }
    .up-bot {
      margin: 50rpx auto;
    }
  }
}
.li-left {
  position: relative;
  width: 135rpx;
  display: flex;
  justify-content: flex-end;
  margin-right: 24rpx;
  .code {
    margin-right: 30rpx;
  }
  .down-icon {
    width: 10rpx;
    height: 7rpx;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -3.5rpx;
  }
}
</style>