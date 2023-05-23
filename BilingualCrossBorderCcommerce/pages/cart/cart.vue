<template>
  <view class="cart-page">
    <block v-if="shopList.length>0">
      <!--cart-head start-->
      <view class="cart-head">
        <view class="head-btn" v-if="isShow" @click="isShow=false">{{$t('cart.guanli')}}</view>
        <view class="head-btn" v-else @click="isShow=true">{{$t('cart.wancheng')}}</view>
      </view>
      <!--cart-head end-->
      <!--cart-box start-->
      <view class="cart-box">
        <!--cart-li start-->
        <view v-for="item in shopList" :key="item.id" class="cart-li">
          <view class="li-hd">
            <view class="cart-check">
              <checkbox :checked="item.isShow?true:false" @click="checkbox(item)" style="transform: scale(0.7);" />
            </view>
            <view class="icon">
              <image class="img" src="../../static/images/index/dianpu.png"></image>
            </view>
            <view class="t">{{item.shop_name}}</view>
            <view class="more">
              <image class="img" src="../../static/images/index/more.png"></image>
            </view>
          </view>
          <!--li-item start-->
          <view v-for="items in item.goods" :key="items.id" class="li-item">
            <view class="cart-check">
              <checkbox :checked="items.isShow?true:false" @click="oncheckbox(items,item)" style="transform: scale(0.7);" />
            </view>
            <view class="li-img">
              <image class="img" :src="items.spec_image"></image>
            </view>
            <view class="li-txt">
              <view class="t">{{items.goods_name}}</view>
              <view class="specs" @click="onShopClick(items)">
                <text class="c">
                  <block v-for="(itemss,index) in items.attrs" :key="{index}">
                    <block v-if="index!=0">，</block> {{itemss}}
                  </block>
                </text>
                <view class="icon">
                  <image class="img" src="../../static/images/down1.png"></image>
                </view>
              </view>
              <view class="b">
                <view class="price">
                  RM<text class="f-34">{{items.goods_price}}</text>
                </view>
                <view class="cart-num">
                  <button class="num-btn" @click="onJian(items)">-</button>
                  <input class="num-input" v-model="items.num" disabled />
                  <button class="num-btn" @click="onJia(items)">+</button>
                </view>
              </view>
            </view>
          </view>
          <!--li-item end-->
        </view>
        <!--cart-li end-->
      </view>
      <!--cart-box end-->
      <!--cart-fixed start-->
      <view class="cart-fixed">
        <view class="fixed-con">
          <view class="fix-check" @click="onQuanClick">
            <checkbox :checked="isQuanShow?true:false" style="transform: scale(0.7);" />
            <text class="all">{{$t('cart.quanxuan')}}</text>
          </view>
          <view class="fix-fr" v-if="isShow">
            <view class="price">{{$t('cart.zongji')}}：RM{{month}}</view>
            <button class="cart-btn" @click="onGoShop">{{$t('cart.jiesuan')}}</button>
          </view>
          <view class="fix-fr" v-else>
            <button class="cart-btn" @click="onDelClick">{{$t('cart.shanchu')}}</button>
          </view>
        </view>
      </view>
      <!--cart-fixed end-->
    </block>
    <!--购物车空状态 start-->
    <view v-else class="cart-null">
      <view class="null-img">
        <image class="img" src="../../static/images/null.png"></image>
      </view>
      <view class="tip">{{$t('cart.gwckkry')}}~</view>
    </view>
    <!--购物车空状态 end-->

    <!--规格选择弹出 start-->
    <uni-popup ref="shopPopup" type="bottom">
      <view class="rule-pop">
        <view class="pop-close" @click="toggleClose">
          <image class="img" src="../../static/images/close1.png"></image>
        </view>
        <!--pop-hd start-->
        <view class="pop-hd">
          <view class="hd-img">
            <image class="img" :src="spec_image"></image>
          </view>
          <view class="hd-txt">
            <view class="t">{{GoodsCont.goods_name}}</view>
            <view class="c">
              <block v-for="(item,index) in attrs" :key="{index}">
                {{item}}
              </block>
            </view>
            <view class="price">¥<text class="f-30">{{price}}</text></view>
          </view>
        </view>
        <!--pop-hd end-->
        <!--pop-li start-->
        <view v-for="item,k in GoodsCont.spec_list" :key="k" class="pop-li">
          <view class="li-t">{{item.spec_name}}</view>
          <view class="li-tags">
            <block v-for="items,j in item.attr" :key="j">
              <view class="tag" :class="items.isShow?'active':''" @click="onShopSKUClick(item,items)">{{items.spec_value}}</view>
            </block>
          </view>
        </view>
        <!--pop-li end-->
        <!--pop-num start-->
        <view class="pop-num">
          <view class="t">{{$t('home.shop.shuliang')}}</view>
          <view class="num-coum">
            <button class="coum-btn" @click="onJianClick">-</button>
            <input class="coum-input" v-model="num" disabled />
            <button class="coum-btn last" @click="onJiaClick">+</button>
          </view>
        </view>
        <!--pop-num end-->
        <!--pop-bot start-->
        <view class="pop-bot">
          <button class="public-btn" @click="onGoShopClick">{{$t('user.xitong.btnsub')}}</button>
        </view>
        <!--pop-bot end-->
      </view>
    </uni-popup>
    <!--规格选择弹出 start-->
    <!--购物车删除弹出 start-->
    <uni-popup ref="DelPupop" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.xitong.tishi')}}</view>
          <view class="pop-c">{{$t('cart.nqdyscxxspm')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click="onQueryClick">{{$t('user.xitong.query')}}</button>
            <button class="pop-btn red" @click="onDeleteClick">{{$t('user.xitong.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--购物车删除弹出 end-->
  </view>
</template>
<script>
export default {
  data () {
    return {
      isQuanShow: false,// 全选是否选中
      isShow: true,
      shopList: [],// 列表
      month: 0,// 总计
      GoodsCont: '',// 详情
      price: '',// 选中的价格
      spec_image: '',// 选中的商品图片
      attrs: [],// 属性值
      spec_sku_id: '',// sku属性id组合
      goods_spec_id: '',// skuid
      stock_num: '',// 库存
      isShopCont: false,// 商品详情显示中文还是英文
      num: 1,// 购买数量
      id: '',// 修改规格id
      cart_ids: [],// 删除购物车数据
      totalPageNum: 0,// 总条数
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    // 购物车列表
    this.onCartList()
    // 计算价格
    this.onMouth()
  },
  methods: {
    // 点击列表规格并弹框
    onShopClick (items) {
      this.price = items.goods_price // 选中的价格
      this.spec_image = items.spec_image // 选中的图片
      this.attrs = items.attrs// 属性值
      this.spec_sku_id = items.spec_sku_id// sku属性id组合
      this.goods_spec_id = items.goods_spec_id// skuid
      this.stock_num = items.stock_num// 库存
      this.id = items.id// id
      this.num = items.num// 数量
      this.onIndexGoodsDetail(items)
      setTimeout(() => {
        this.$refs.shopPopup.open()
      }, 200);
    },
    // 关闭规格弹框
    toggleClose () {
      this.$refs.shopPopup.close()
    },
    getCaption (str, state) {
      if (state == 1) {
        var indexs = str.indexOf("|")
        str = str.substring(indexs + 1, str.length);
      } else {
        var index = str.indexOf("|")
        str = str.substring(0, index);
      }
      return str;
    },
    // 购物车列表
    onCartList () {
      this.$http.post(this.$apiObj.CartList, { page: this.page, pagenum: this.pagenum }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.data.map(item => {
              item.goods.map(items => {
                items.goods_name = this.getCaption(items.goods_name, 1) ? this.getCaption(items.goods_name, 1) : items.goods_name
              })
            })
          } else {
            res.data.data.map(item => {
              item.goods.map(items => {
                items.goods_name = this.getCaption(items.goods_name, 0) ? this.getCaption(items.goods_name, 1) : items.goods_name
              })
            })
          }
          res.data.data.map(item => {
            item.isShow = false
            item.goods.map(items => {
              items.isShow = false
            })
          })
          this.totalPageNum = res.data.total
          this.shopList = this.page == 1 ? res.data.data : [...this.shopList, ...res.data.data]
          this.isQuanShow = false
        }
      })
    },
    // 点击商铺是否选中
    checkbox (e) {
      e.isShow = !e.isShow
      if (e.isShow === true) {
        e.goods.map(items => {
          items.isShow = true
        })
      } else {
        e.goods.map(items => {
          items.isShow = false
        })
      }
      let num = 0
      for (let i in this.shopList) {
        if (this.shopList[i].isShow == true) {
          num++
        }
      }
      if (num == this.shopList.length) {
        this.isQuanShow = true
      } else {
        this.isQuanShow = false
      }
      this.onMouth()
    },
    // 点击商品是否选中
    oncheckbox (items, item) {
      items.isShow = !items.isShow
      let num = 0
      item.goods.map(items => {
        if (items.isShow == true) {
          num++
        }
      })
      if (num == item.goods.length) {
        item.isShow = true
      } else {
        item.isShow = false
      }
      // 判断是否全选
      let numsize = 0
      for (let i in this.shopList) {
        if (this.shopList[i].isShow == true) {
          numsize++
        }
      }
      if (numsize == this.shopList.length) {
        this.isQuanShow = true
      } else {
        this.isQuanShow = false
      }
      this.onMouth()
    },
    // 点击全选
    onQuanClick () {
      this.isQuanShow = !this.isQuanShow
      if (this.isQuanShow == true) {
        this.shopList.map(item => {
          item.isShow = true
          item.goods.map(items => {
            items.isShow = true
          })
        })
      } else {
        this.shopList.map(item => {
          item.isShow = false
          item.goods.map(items => {
            items.isShow = false
          })
        })
      }
      this.onMouth()
    },
    // 点击减
    onJian (items) {
      if (items.num == 1) return
      let num = items.num - 1
      this.onCartEdit(num, items)
    },
    // 点击加
    onJia (items) {
      if (items.num == items.stock_num) return
      let num = items.num + 1
      this.onCartEdit(num, items)
    },
    // 修改购物车数量
    onCartEdit (num, items) {
      this.$http.post(this.$apiObj.CartEdit, { goods_spec_id: items.goods_spec_id, num: num, cart_id: items.id }).then(res => {
        if (res.code == 1) {
          items.num = num
          this.onMouth()
        }
      })
    },
    // 计算价格
    onMouth () {
      let month = 0
      for (let i in this.shopList) {
        for (let j in this.shopList[i].goods) {
          if (this.shopList[i].goods[j].isShow) {
            console.log(2222);
            month = month + this.shopList[i].goods[j].goods_price * this.shopList[i].goods[j].num
          }
        }
      }
      this.month = month
    },
    // 请求商品详情
    onIndexGoodsDetail (e) {
      this.$http.post(this.$apiObj.IndexGoodsDetail, { goods_id: e.goods_id }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.goods_name = this.getCaption(res.data.goods_name, 1) ? this.getCaption(res.data.goods_name, 1) : res.data.goods_name
          } else {
            res.data.goods_name = this.getCaption(res.data.goods_name, 0) ? this.getCaption(res.data.goods_name, 0) : res.data.goods_name
          }
          this.GoodsCont = res.data // 全部
          res.data.spec_list.map(item => {
            item.attr.map(items => {
              items.isShow = false
              this.attrs.map(itemss => {
                if (itemss == items.spec_value) {
                  items.isShow = true
                }
              })
            })
          })
        }
      })
    },
    // 点击sku选中
    onShopSKUClick (e, k) {
      e.attr.map(item => {
        item.isShow = false
      })
      k.isShow = true
      let spec_value_id = ''
      this.GoodsCont.spec_list.map(item => {
        item.attr.map(items => {
          if (items.isShow) {
            spec_value_id = spec_value_id ? (spec_value_id + '_' + items.spec_value_id) : items.spec_value_id
          }
        })
      })
      for (let i in this.GoodsCont.sku_list) {
        if (this.GoodsCont.sku_list[i].spec_sku_id == spec_value_id) {
          this.price = this.GoodsCont.sku_list[i].goods_price // 选中的价格
          this.spec_image = this.GoodsCont.sku_list[i].spec_image // 选中的图片
          this.attrs = this.GoodsCont.sku_list[i].attrs// 属性值
          this.spec_sku_id = this.GoodsCont.sku_list[i].spec_sku_id// sku属性id组合
          this.goods_spec_id = this.GoodsCont.sku_list[i].goods_spec_id// skuid
          this.stock_num = this.GoodsCont.sku_list[i].stock_num// 库存
        }
      }
      setTimeout(() => {
        this.onMouth()
      }, 1000);
    },
    // 点击减
    onJianClick () {
      if (this.num == 1) return
      this.num--
    },
    // 点击加
    onJiaClick () {
      if (this.num == this.stock_num) return
      this.num++
    },
    // 修改规格
    onGoShopClick () {
      this.$http.post(this.$apiObj.CartEdit, { goods_spec_id: this.goods_spec_id, num: this.num, cart_id: this.id }).then(res => {
        if (res.code == 1) {
          this.page = 1
          this.onCartList()
          this.onMouth()
          this.$refs.shopPopup.close()
        }
      })
    },
    // 点击右下角删除按钮
    onDelClick () {
      let num = 0
      let cart_ids = []
      this.shopList.map(item => {
        item.goods.map(items => {
          if (items.isShow == true) {
            num++
            cart_ids.push(items.id)
          }
        })
      })
      this.cart_ids = cart_ids
      if (num == 0) return uni.showToast({ title: this.$t('cart.qxzyscdsj'), icon: 'none' })
      this.$refs.DelPupop.open()
    },
    // 点击删除弹框取消按钮
    onQueryClick () {
      this.$refs.DelPupop.close()
    },
    // 点击删除弹框确定按钮删除数据
    onDeleteClick () {
      this.$http.post(this.$apiObj.CartDelete, { cart_ids: this.cart_ids.toString() }).then(res => {
        if (res.code == 1) {
          this.page = 1
          this.onCartList()
          this.onMouth()
          this.$refs.DelPupop.close()
        }
      })
    },
    // 点击结算
    onGoShop () {
      let num = 0
      let cart_ids = []
      this.shopList.map(item => {
        item.goods.map(items => {
          if (items.isShow == true) {
            num++
            cart_ids.push(items.id)
          }
        })
      })
      this.cart_ids = cart_ids
      if (num == 0) return uni.showToast({ title: this.$t('cart.qxzsp'), icon: 'none' })
      uni.navigateTo({
        url: './submit?cart_ids=' + cart_ids.toString()
      })
    }
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onCartList()
  }
}
</script>
<style >
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.cart-page {
  padding-bottom: 200rpx;
  .cart-head {
    padding: 30rpx;
    display: flex;
    justify-content: flex-end;
    font-size: 26rpx;
  }
  .cart-box {
    .cart-li {
      background: #ffffff;
      border-radius: 20rpx;
      margin: 20rpx 0;
      padding: 30rpx;
      .cart-check {
        position: absolute;
        left: -20rpx;
        top: 50%;
        margin-top: -25rpx;
      }
      .li-hd {
        display: flex;
        padding-left: 40rpx;
        align-items: center;
        position: relative;
        .icon {
          width: 26rpx;
          height: 26rpx;
          margin-right: 15rpx;
          min-width: 26rpx;
        }
        .t {
          font-size: 26rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .more {
          width: 10rpx;
          height: 18rpx;
          min-width: 10rpx;
          margin-left: 15rpx;
        }
      }
      .li-item {
        margin: 36rpx 0;
        padding-left: 40rpx;
        display: flex;
        position: relative;
        .li-img {
          // background: #fc5917;
          border-radius: 10rpx;
          width: 175rpx;
          height: 175rpx;
          min-width: 175rpx;
          margin-right: 20rpx;
        }
        .li-txt {
          width: 100%;
          .t {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 28rpx;
            line-height: 34rpx;
          }
          .specs {
            display: inline-flex;
            align-items: center;
            height: 43rpx;
            background: #f5f5f5;
            border-radius: 10rpx;
            align-items: center;
            padding: 0 10rpx;
            line-height: 43rpx;
            margin: 15rpx 0 20rpx 0;
            .c {
              font-size: 24rpx;
              color: #999;
            }
            .icon {
              width: 14rpx;
              height: 14rpx;
              margin-left: 10rpx;
              min-width: 14rpx;
            }
          }
          .b {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .cart-num {
              display: flex;
              align-items: center;
              border: 2rpx solid #eeeeee;
              border-radius: 6rpx;
              .num-btn {
                width: 40rpx;
                height: 40rpx;
                font-size: 24rpx;
                color: #999;
                padding: 0;
                margin: 0;
                line-height: 40rpx;
              }
              .num-input {
                width: 60rpx;
                height: 40rpx;
                border-left: 1px solid #eee;
                border-right: 1px solid #eee;
                text-align: center;
                font-size: 24rpx;
                font-weight: 550;
              }
            }
            .price {
              font-weight: 550;
              color: #fc0609;
              font-size: 22rpx;
            }
          }
        }
      }
    }
  }

  .cart-fixed {
    position: fixed;
    left: 0;
    //#ifdef APP-PLUS
    bottom: 0;
    //#endif
    //#ifdef H5
    bottom: 100rpx;
    //#endif
    width: 100%;
    background: #ffffff;
    z-index: 99;
    .fixed-con {
      padding: 15rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .fix-check {
        display: flex;
        align-items: center;
        .all {
          font-size: 26rpx;
          margin-left: 20rpx;
        }
      }
      .fix-fr {
        display: flex;
        align-items: center;
        .price {
          margin-right: 20rpx;
          font-size: 24rpx;
        }
      }
      .cart-btn {
        width: 150rpx;
        height: 60rpx;
        background: #fc0609;
        border-radius: 30rpx;
        margin: 0;
        line-height: 60rpx;
        font-size: 26rpx;
        color: #fff;
      }
    }
  }

  .cart-null {
    padding: 200rpx 30rpx;
    text-align: center;
    font-size: 32rpx;
    color: #666;
    .null-img {
      width: 393rpx;
      height: 290rpx;
      margin: 0 auto;
    }
  }

  .rule-pop {
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    background: #fff;
    padding: 30rpx 24rpx;
    position: relative;
    .pop-close {
      width: 18rpx;
      height: 18rpx;
      position: absolute;
      right: 24rpx;
      top: 30rpx;
    }
    .pop-hd {
      display: flex;
      padding-right: 30rpx;
      .hd-txt {
        .t {
          font-size: 28rpx;
          line-height: 1.6;
        }
        .c {
          font-size: 26rpx;
          margin: 10rpx 0;
        }
        .price {
          color: #fc0609;
          font-weight: 550;
        }
      }
      .hd-img {
        width: 175rpx;
        height: 175rpx;
        border-radius: 10rpx;
        min-width: 175rpx;
        margin-right: 20rpx;
      }
    }
    .pop-li {
      margin: 30rpx 0;
      .li-t {
        font-size: 28rpx;
        margin-bottom: 20rpx;
      }
      .li-tags {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10rpx;
        .tag {
          height: 62rpx;
          background: #eeeeee;
          border-radius: 32rpx;
          border: 1px solid #eee;
          padding: 0 20rpx;
          line-height: 62rpx;
          margin: 10rpx;
        }
        .active {
          border: 1px solid #f41a0c;
          background: #ffe9e8;
          color: #f41a0c;
        }
      }
    }
    .pop-num {
      display: flex;
      margin: 30rpx 0;
      align-items: center;
      justify-content: space-between;
      .t {
        font-size: 28rpx;
      }
      .num-coum {
        display: flex;
        .coum-btn {
          width: 54rpx;
          height: 45rpx;
          background: #eeeeee;
          border-radius: 10rpx 0px 0px 10rpx;
          text-align: center;
          line-height: 45rpx;
          color: #666;
          text-align: center;
        }
        .coum-btn.last {
          border-radius: 0px 10rpx 10rpx 0px;
        }
        .coum-input {
          width: 54rpx;
          height: 45rpx;
          background: #eeeeee;
          text-align: center;
          font-size: 30rpx;
          color: #666;
          text-align: center;
          margin: 0 3rpx;
        }
      }
    }
  }
  .pop-bot {
    margin: 50rpx 0;
  }
}
/deep/ uni-checkbox .uni-checkbox-input {
  border-radius: 100%;
}
/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
  border-color: #d1d1d1;
}
/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
  background: #fc0609;
  color: #fff !important;
  border-color: #fc0609;
}
</style>
