<template>
  <view class="shop-page">
    <!--shop-head start-->
    <view class="shop-head">
      <view class="head-bg">
        <image class="img" src="../../../static/images/shop5.png"></image>
      </view>
      <!--head-box start-->
      <view class="head-box">
        <!--head-top start-->
        <view class="head-top">
          <view class="head-pre" @click="goCLass">
            <image class="img" src="../../../static/images/icon6.png"></image>
          </view>
          <view class="head-search" @click="onSearch">
            <view class="icon">
              <image class="img" src="../../../static/images/shop7.png"></image>
            </view>
            <text>{{$t('shop.ssdnsp')}}</text>
          </view>
          <view class="head-share" @click="onFengxiang">
            <image class="img" src="../../../static/images/shop6.png"></image>
          </view>
        </view>
        <!--head-top end-->
        <!--head-dl start-->
        <view class="head-dl">
          <view class="dt">
            <image class="img" :src="shopCont.shop_logo"></image>
          </view>
          <view class="dd">
            <view class="t">{{shopCont.shop_name}}</view>
            <view class="c">{{shopCont.shop_info}}</view>
          </view>
          <view class="focus-btn" v-if="shopCont.shop_focus==1" @click="onMineFocus">{{$t('shop.ygz')}}</view>
          <view class="focus-btn" v-else @click="onMineFocus">{{$t('shop.guanzhu')}}</view>
        </view>
        <!--head-dl end-->
      </view>
      <!--head-box end-->
    </view>
    <!--shop-head end-->
    <!--首页 start-->
    <view class="shop-box" v-if="mynavID==1">
      <!--shop-nav start-->
      <view class="shop-nav">
        <view :class="['li',Inv==0?'active':'']" @click="onNavClick(0)">{{$t('shop.xinpin')}}</view>
        <view :class="['li',Inv==1?'active':'']" @click="onNavClick(1)">{{$t('shop.shangpin')}}</view>
        <view :class="['li',Inv==2?'active':'']" @click="onNavClick(2)">{{$t('shop.ptsp')}}</view>
        <view :class="['li',Inv==3?'active':'']" @click="onNavClick(3)">{{$t('shop.jpsp')}}</view>
      </view>
      <!--shop-nav end-->
      <!--新品 shop-content start-->
      <view class="shop-content" v-if="Inv == 0">
        <!--att-goods start-->
        <view class="att-goods">
          <navigator :url="'../Gdetail?id='+item.goods_id" hover-class="none" v-for="item in goodList" :key="item.goods_id" class="goods">
            <view class="goods-con">
              <view class="goods-img">
                <image class="img" :src="item.image"></image>
                <view class="goods-tip" v-if="item.tag_name.length">{{item.tag_name[0]}}</view>
              </view>
              <view class="goods-t">{{item.goods_name}}</view>
              <view class="goods-m">
                <view class="price">
                  RM<text class="f-34">{{item.goods_price}}</text>
                </view>
                <view class="sale">{{$t('shop.xl')}}{{item.sales_actual}}</view>
              </view>
            </view>
          </navigator>
        </view>
        <!--att-goods end-->
      </view>
      <!--新品 shop-content end-->
      <!--商品 shop-content start-->
      <view class="shop-content" v-if="Inv == 1">
        <!--gain-choice start-->
        <view class="gain-choice">
          <view class="li" :class="sort_type==2?'active':''" @click="onZonghe">
            <text>{{$t('shop.zonghe')}}</text>
            <view class="down-icon" v-if="sort_type==2">
              <image class="img default" src="../../../static/images/icon1.png"></image>
            </view>
            <view class="down-icon" v-else>
              <image class="img default" src="../../../static/images/icon2.png"></image>
              <!-- <image class="img selected" src="../../static/images/icon1.png"></image> -->
            </view>
          </view>
          <view class="li" :class="sort_type==3?'active':sort_type==4?'active':''" @click="onXiaoliang">
            <text>{{$t('shop.xl')}}</text>
            <block v-if="sort_type==3">
              <view class="up-icon">
                <image class="img" src="../../../static/images/icon3.png"></image>
              </view>
              <view class="down-icon">
                <image class="img selected" src="../../../static/images/icon1.png"></image>
              </view>
            </block>
            <block v-else-if="sort_type==4">
              <view class="up-icon">
                <image class="img" src="../../../static/images/icon17.png"></image>
              </view>
              <view class="down-icon">
                <image class="img selected" src="../../../static/images/icon2.png"></image>
              </view>
            </block>
            <block v-else>
              <view class="up-icon">
                <image class="img" src="../../../static/images/icon3.png"></image>
              </view>
              <view class="down-icon">
                <image class="img selected" src="../../../static/images/icon2.png"></image>
              </view>
            </block>
          </view>
          <view class="li" :class="sort_type==5?'active':sort_type==6?'active':''" @click="onMouth">
            <text>{{$t('shop.jiage')}}</text>
            <block v-if="sort_type==5">
              <view class="up-icon">
                <image class="img" src="../../../static/images/icon3.png"></image>
              </view>
              <view class="down-icon">
                <image class="img selected" src="../../../static/images/icon1.png"></image>
              </view>
            </block>
            <block v-else-if="sort_type==6">
              <view class="up-icon">
                <image class="img" src="../../../static/images/icon17.png"></image>
              </view>
              <view class="down-icon">
                <image class="img selected" src="../../../static/images/icon2.png"></image>
              </view>
            </block>
            <block v-else>
              <view class="up-icon">
                <image class="img" src="../../../static/images/icon3.png"></image>
              </view>
              <view class="down-icon">
                <image class="img selected" src="../../../static/images/icon2.png"></image>
              </view>
            </block>
          </view>
        </view>
        <!--gain-choice end-->
        <!--att-goods start-->
        <view class="att-goods">
          <navigator :url="'../Gdetail?id='+item.goods_id" hover-class="none" v-for="item in goodList" :key="item.goods_id" class="goods">
            <view class="goods-con">
              <view class="goods-img">
                <image class="img" :src="item.image"></image>
                <view class="goods-tip" v-if="item.tag_name.length">{{item.tag_name[0]}}</view>
              </view>
              <view class="goods-t">{{item.goods_name}}</view>
              <view class="goods-m">
                <view class="price">
                  RM<text class="f-34">{{item.goods_price}}</text>
                </view>
                <view class="sale">{{$t('shop.xl')}}{{item.sales_actual}}</view>
              </view>
            </view>
          </navigator>
        </view>
        <!--att-goods end-->
      </view>
      <!--商品 shop-content end-->
      <!--拼团商品 shop-content start-->
      <view class="shop-content" v-if="Inv == 2">
        <!--att-goods start-->
        <view class="att-goods">
          <navigator :url="'/pages/index/detail?id='+item.goods_id" hover-class="none" v-for="item in goodList" :key="item.goods_id" class="goods">
            <view class="goods-con">
              <view class="goods-img">
                <image class="img" :src="item.image"></image>
                <view class="goods-tip" v-if="item.tag_name.length">{{item.tag_name[0]}}</view>
              </view>
              <view class="goods-t">{{item.goods_name}}</view>
              <view class="goods-m">
                <view class="price">
                  RM<text class="f-34">{{item.line_price}}</text>
                </view>
                <view class="sale">{{$t('shop.xl')}}{{item.sales_actual}}</view>
              </view>
            </view>
          </navigator>
        </view>
        <!--att-goods end-->
      </view>
      <!--拼团商品 shop-content end-->
      <!--竞拍商品 shop-content start-->
      <view class="shop-content" v-if="Inv == 3">
        <!--auct-new start-->
        <view class="auct-new">
          <!--new-li start-->
          <navigator :url="'/pages/auction/detail?id='+item.goods_id" hover-class="none" v-for="item in goodList" :key="item.goods_id" class="new-li">
            <view class="li-img">
              <image class="img" :src="item.image"></image>
              <view class="li-date" v-if="item.auction_type==2">
                <u-count-down :time="item.remain_time" format="HH:mm:ss"></u-count-down>
              </view>
              <view class="li-t">{{item.stage_num}}{{$t('shop.qi')}}</view>
            </view>
            <view class="li-txt">
              <view class="li-h">
                <view class="name">{{item.goods_name}}</view>
                <view class="s">{{shopCont.shop_name}}{{$t('shop.tigong')}}</view>
              </view>
              <view class="t">{{item.goods_name}}</view>
              <view class="li-tags">
                <block v-for="(items,index) in item.tags" :key="{index}">
                  <view v-if="index%2==0" class="tag">{{items.name}}</view>
                  <!-- <block v-if="item.limit==1">
                  <view v-if="index==0" class="tag yellow">{{$t('auction.xianpai')}}{{item.limit_num}}{{$t('auction.ci')}}</view>
                </block> -->
                  <view v-else class="tag red">{{items.name}}</view>
                  <!-- <view v-if="items.tag_id==2" class="tag">{{items.name}}</view>
                  <view v-if="index==0" class="tag yellow">{{$t('shop.xianp')}}</view>
                  <view v-if="items.tag_id==1" class="tag red">{{$t('shop.baokuan')}}</view> -->
                </block>
              </view>
              <view class="li-price">
                <view class="price-fl">
                  <text class="red">{{$t('shop.qpj')}}RM{{item.auction_price}}</text>
                  <text class="gray">{{$t('shop.scj')}}RM{{item.price}}</text>
                </view>
                <button class="price-btn">{{$t('shop.qiangpai')}}</button>
              </view>
              <view class="li-b">
                <text v-if="item.finish_rate==100">{{$t('shop.ywc')}}</text>
                <text v-else>{{$t('shop.jxz')}}</text>
                <view class="li-pro">
                  <view class="pro" :style="'width:'+item.finish_rate+'%;'"></view>
                </view>
                <text>{{(item.finish_rate*100).toFixed(0)}}%</text>
              </view>
            </view>
          </navigator>
          <!--new-li end-->
        </view>
        <!--auct-new end-->
      </view>
      <!--竞拍商品 shop-content end-->
    </view>
    <!--首页 end-->
    <!--分类 start-->
    <view class="shop-box" v-if="mynavID==2">
      <!--sort-side start-->
      <view class="sort-side">
        <view class="side-ul">
          <view v-for="item in FirstList" :key="item.id" class="li" :class="item.id==navId?'active':''" @click="onclassNavClick(item)">{{item.name}}</view>
        </view>
      </view>
      <!--sort-side end-->
      <!--sort-box start-->
      <view class="sort-box">
        <view class="sort-t">{{name}}</view>
        <view class="sort-ul">
          <navigator :url="'../Glist?id='+item.id+'&admin_id='+shop_id" hover-class="none" v-for="item,k in SecondList" :key="k" class="li">
            <view class="li-img">
              <image class="img" :src="item.image"></image>
            </view>
            <view class="li-t">{{item.name}}</view>
          </navigator>
        </view>
      </view>
      <!--sort-box end-->
    </view>
    <!--分类 end-->
    <!--shop-box start-->
    <view class="shop-box" v-if="mynavID==3">
      <!--gain-choice start-->
      <view class="gain-choice">
        <view class="li" :class="sort_type==2?'active':''" @click="onZonghe">
          <text>{{$t('shop.zonghe')}}</text>
          <view class="down-icon" v-if="sort_type==2">
            <image class="img default" src="../../../static/images/icon1.png"></image>
          </view>
          <view class="down-icon" v-else>
            <image class="img default" src="../../../static/images/icon2.png"></image>
            <!-- <image class="img selected" src="../../static/images/icon1.png"></image> -->
          </view>
        </view>
        <view class="li" :class="sort_type==3?'active':sort_type==4?'active':''" @click="onXiaoliang">
          <text>{{$t('shop.xl')}}</text>
          <block v-if="sort_type==3">
            <view class="up-icon">
              <image class="img" src="../../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../../static/images/icon1.png"></image>
            </view>
          </block>
          <block v-else-if="sort_type==4">
            <view class="up-icon">
              <image class="img" src="../../../static/images/icon17.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../../static/images/icon2.png"></image>
            </view>
          </block>
          <block v-else>
            <view class="up-icon">
              <image class="img" src="../../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../../static/images/icon2.png"></image>
            </view>
          </block>
        </view>
        <view class="li" :class="sort_type==5?'active':sort_type==6?'active':''" @click="onMouth">
          <text>{{$t('shop.jiage')}}</text>
          <block v-if="sort_type==5">
            <view class="up-icon">
              <image class="img" src="../../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../../static/images/icon1.png"></image>
            </view>
          </block>
          <block v-else-if="sort_type==6">
            <view class="up-icon">
              <image class="img" src="../../../static/images/icon17.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../../static/images/icon2.png"></image>
            </view>
          </block>
          <block v-else>
            <view class="up-icon">
              <image class="img" src="../../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../../static/images/icon2.png"></image>
            </view>
          </block>
        </view>
      </view>
      <!--gain-choice end-->
      <!--att-goods start-->
      <view class="att-goods">
        <navigator :url="'../Gdetail?id='+item.goods_id" hover-class="none" v-for="item in goodList" :key="item.goods_id" class="goods">
          <view class="goods-con">
            <view class="goods-img">
              <image class="img" :src="item.image"></image>
              <view class="goods-tip" v-if="item.tag_name.length">{{item.tag_name[0]}}</view>
            </view>
            <view class="goods-t">{{item.goods_name}}</view>
            <view class="goods-m">
              <view class="price">
                RM<text class="f-34">{{item.goods_price}}</text>
              </view>
              <view class="sale">{{$t('shop.xl')}}{{item.sales_actual}}</view>
            </view>
          </view>
        </navigator>
      </view>
      <!--att-goods end-->
    </view>
    <!--shop-box end-->
    <!--底部 start-->
    <view class="shop-menu">
      <view class="menu-con">
        <view class="menu-li" :class="mynavID==1?'active':''" @click="onshopNavClick(1)">
          <view class="icon default">
            <image class="img" src="../../../static/images/class21.png"></image>
          </view>
          <view class="icon selected">
            <image class="img" src="../../../static/images/class25.png"></image>
          </view>
          <view class="t">{{$t('shop.sye')}}</view>
        </view>
        <view class="menu-li" :class="mynavID==2?'active':''" @click="onshopNavClick(2)">
          <view class="icon default">
            <image class="img" src="../../../static/images/class22.png"></image>
          </view>
          <view class="icon selected">
            <image class="img" src="../../../static/images/class26.png"></image>
          </view>
          <view class="t">{{$t('shop.feilie')}}</view>
        </view>
        <view class="menu-li" :class="mynavID==3?'active':''" @click="onshopNavClick(3)">
          <view class="icon default">
            <image class="img" src="../../../static/images/class23.png"></image>
          </view>
          <view class="icon selected">
            <image class="img" src="../../../static/images/class27.png"></image>
          </view>
          <view class="t">{{$t('shop.sp')}}</view>
        </view>
        <view class="menu-li" :class="mynavID==4?'active':''" @click="onkefyu">
          <view class="icon default">
            <image class="img" src="../../../static/images/class24.png"></image>
          </view>
          <view class="icon selected">
            <image class="img" src="../../../static/images/class28.png"></image>
          </view>
          <view class="t">{{$t('shop.kefu')}}</view>
        </view>
      </view>
    </view>
    <!--底部 end-->
    <!--联系客服弹出 start-->
    <uni-popup ref="popup3" type="center">
      <view class="email-cont">
        <image class="query" @click="onQuery" src="../../../static/images/close1.png"></image>
        <view class="title">{{$t('kefu.title')}}</view>
        <view class="cont">
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>cs-reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>info@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>support@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>help@kolibrimall.com
          </view>
        </view>
      </view>
    </uni-popup>
    <!--分享弹出 start-->
    <uni-popup ref="popup2" type="bottom">
      <view class="share-pop">
        <view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
        <view class="share-ul">
          <view class="share-li" @click="ontweet">
            <view class="icon">
              <image class="img" src="../../../static/images/share21.png"></image>
            </view>
            <view class="t">twitter</view>
          </view>
          <!-- <view class="share-li">
            <view class="icon">
              <image class="img" src="../../static/images/share22.png"></image>
            </view>
            <view class="t">Google</view>
          </view> -->
          <view class="share-li" @click="onfacebook">
            <view class="icon">
              <image class="img" src="../../../static/images/share23.png"></image>
            </view>
            <view class="t">Facebook</view>
          </view>
          <!-- <view class="share-li">
            <view class="icon">
              <image class="img" src="../../static/images/share24.png"></image>
            </view>
            <view class="t">微信</view>
          </view> -->
          <view class="share-li" @click="onFuzhi">
            <view class="icon">
              <image class="img" src="../../../static/images/share25.png"></image>
            </view>
            <view class="t">{{$t('auction.detail.fuzhilianjie')}}</view>
          </view>
        </view>
        <view class="share-bot">
          <button class="share-btn" @click="toggle2Close">{{$t('auction.detail.query')}}</button>
        </view>
      </view>
    </uni-popup>
    <!--分享弹出 end-->
  </view>
</template>

<script>
export default {
  data () {
    return {
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      totalPageNum: 0,// 总条数
      Inv: 0,
      shopCont: '',//
      goodList: [],
      shop_id: '',// 店铺id
      type: 1,// 1普通商品，2拼团商品，3竞拍商品
      sort_type: 1,// 1新品，2综合，3销量低到高，4销量高到低，5价格低到高，6价格高到低
      mynavID: 1,// 底部切换id
      navId: '',// 选中
      name: '',
      FirstList: [],// 一级分类
      SecondList: [],// 二级分类
      isShopCont: false,// 中文还是英文
    }
  },
  onLoad (e) {
    if (e.shop_id) {
      this.shop_id = e.shop_id
    }
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
  },
  onShow () {
    this.shop_id = uni.getStorageSync('shop_id')
    this.page = 1
    this.goodList = []
    this.onShopIndex()
    // 一级分类
    this.$http.post(this.$apiObj.IndexFirstCate).then(res => {
      if (res.code == 1) {
        if (this.isShopCont) {
          res.data.map(item => {
            item.name = this.getCaption(item.name, 1)
          })
        } else {
          res.data.map(item => {
            item.name = this.getCaption(item.name, 0)
          })
        }
        this.navId = uni.getStorageSync('isNum') ? res.data[uni.getStorageSync('isNum')].id : res.data[0].id
        this.name = uni.getStorageSync('isNum') ? res.data[uni.getStorageSync('isNum')].name : res.data[0].name
        uni.removeStorageSync('isNum')
        this.FirstList = res.data
        // 获取二级分类 
        this.onIndexSecondCate()
      }
    })
  },
  methods: {
    onSearch () {
      uni.navigateTo({
        url: '/pages/class/search?admin_id=' + this.shop_id
      });
    },
    onkefyu () {
      this.$refs.popup3.open()
      // uni.navigateTo({
      //   url: '/pages/mine/custom?uuid=' + this.shop_id + '&avatar=' + uni.getStorageSync('userCont').avatar
      // })
    },
    onQuery () {
      this.$refs.popup3.close()
    },
    // 商品关注、取消关注
    onMineFocus () {
      this.$http.post(this.$apiObj.MineFocus, { type: 2, data_id: this.shop_id }).then(res => {
        if (res.code == 1) {
          if (this.shopCont.shop_focus == 1) {
            uni.showToast({ icon: 'none', title: this.$t('home.shop.yiquery') })
            this.shopCont.shop_focus = 0
          } else {
            uni.showToast({ icon: 'none', title: this.$t('home.shop.guanzhuchenggong') })
            this.shopCont.shop_focus = 1
          }
        }
      })
    },
    getCaption (str, state) {
      if (state == 1) {
        if (str == undefined) {
          str = str
        } else {
          var indexs = str.indexOf("|")
          str = str.substring(indexs + 1, str.length);
        }
      } else {
        console.log(str);
        if (str == undefined) {
          str = str
        } else {
          var index = str.indexOf("|")
          str = str.substring(0, index);
        }
      }
      return str;
    },
    // 列表数据
    onShopIndex () {
      this.$http.post(this.$apiObj.ShopIndex, { shop_id: this.shop_id, page: this.page, pagenum: this.pagenum, type: this.type, sort_type: this.sort_type }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.goods_list.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
              if (this.type == 1 || this.type == 2) {
                item.tag_name[0] = this.getCaption(item.tag_name[0], 1) ? this.getCaption(item.tag_name[0], 1) : item.tag_name[0]
              } else {
                for (let i in item.tags) {
                  item.tags[i].name = this.getCaption(item.tags[i].name, 1) ? this.getCaption(item.tags[i].name, 1) : item.tags[i].name
                }
              }
              item.remain_time = item.remain_time * 1000
            })
          } else {
            res.data.goods_list.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 1) : item.goods_name
              if (this.type == 1 || this.type == 2) {
                item.tag_name[0] = this.getCaption(item.tag_name[0], 0) ? this.getCaption(item.tag_name[0], 0) : item.tag_name[0]
              } else {
                for (let i in item.tags) {
                  item.tags[i].name = this.getCaption(item.tags[i].name, 0) ? this.getCaption(item.tags[i].name, 0) : item.tags[i].name
                }
              }
              item.remain_time = item.remain_time * 1000
            })
          }
          this.shopCont = res.data.shop
          this.totalPageNum = res.data.goods_list.total
          this.goodList = this.page == 1 ? res.data.goods_list.data : [...this.goodList, ...res.data.goods_list.data]
        }
      })
    },
    // 点击综合
    onZonghe () {
      this.page = 1
      this.sort_type = 2
      this.goodList = []
      this.onShopIndex()
    },
    // 点击销量
    onXiaoliang () {
      this.page = 1
      this.sort_type = this.sort_type == 3 ? 4 : 3
      this.goodList = []
      this.onShopIndex()
    },
    // 点击价格
    onMouth () {
      this.page = 1
      this.sort_type = this.sort_type == 5 ? 6 : 5
      this.goodList = []
      this.onShopIndex()
    },
    // 点击切换
    onNavClick (e) {
      this.Inv = e
      this.page = 1
      this.goodList = []
      if (e === 0) {
        this.type = 1
        this.sort_type = 1
      } else if (e === 1) {
        this.type = 1
        this.sort_type = 2
      } else if (e === 2) {
        this.type = 2
        this.sort_type = 1
      } else if (e === 3) {
        this.type = 3
        this.sort_type = 1
      }
      this.onShopIndex()
    },
    // 点击一级分类
    onclassNavClick (item) {
      this.name = item.name
      this.navId = item.id
      this.onIndexSecondCate()
    },
    // 获取二级分类
    onIndexSecondCate () {
      this.$http.post(this.$apiObj.IndexSecondCate, { c_id: this.navId }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.map(item => {
              item.name = this.getCaption(item.name, 1)
            })
          } else {
            res.data.map(item => {
              item.name = this.getCaption(item.name, 0)
            })
          }
          this.SecondList = res.data
        }
      })
    },
    // 点击底部导航
    onshopNavClick (id) {
      this.mynavID = id
      if (this.mynavID == 1) {
        this.page = 1
        this.type = 1
        this.sort_type = 1
        this.goodList = []
        this.onShopIndex()
      } else if (this.mynavID == 3) {
        this.page = 1
        this.type = 1
        this.sort_type = 2
        this.goodList = []
        this.onShopIndex()
      }
    },
    goCLass () {
      uni.navigateBack({ delta: 1 });
    },
    changeTab (Inv) {
      that.navIdx = Inv;
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    // 点击分享
    onFengxiang () {
      this.$refs.popup2.open()
    },
    toggle2Close () {
      this.$refs.popup2.close()
    },
    onfacebook () {
      let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/class/shop/shop?shop_id=' + this.shop_id// 生成二维码的链接
      let url = `https://www.facebook.com/sharer/sharer.php?u=${qrUrl}`
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
      let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/class/shop/shop?shop_id=' + this.shop_id// 生成二维码的链接
      let url = `https://twitter.com/intent/tweet?url=${qrUrl}`
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
    onFuzhi () {
      let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/class/shop/shop?shop_id=' + this.shop_id// 生成二维码的链接
      // #ifdef H5
      let oInput = document.createElement('input');
      oInput.value = qrUrl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      uni.showToast({ icon: 'none', title: this.$t('user.order.detail.fzcg') })
      oInput.remove()
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: qrUrl,
        success: () => {
          uni.showToast({ icon: 'none', title: this.$t('user.order.detail.fzcg') })
        }
      });
      // #endif
    }
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onShopIndex()
  }
}
</script>

<style lang="less" scoped>
.shop-page {
  //shop-head S
  .shop-head {
    position: relative;
    .head-bg {
      height: 396rpx;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .head-box {
      position: relative;
      z-index: 99;
      padding: 100rpx 30rpx 60rpx 30rpx;
      //head-top S
      .head-top {
        display: flex;
        align-items: center;
        .head-search {
          flex: 1;
          height: 60rpx;
          border-radius: 30rpx;
          padding: 0 20rpx;
          display: flex;
          align-items: center;
          font-size: 26rpx;
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          .icon {
            width: 29rpx;
            height: 29rpx;
            min-width: 29rpx;
            max-width: 29rpx;
            margin-right: 20rpx;
          }
        }
        .head-share {
          width: 36rpx;
          height: 34rpx;
          min-width: 36rpx;
          max-width: 36rpx;
          margin-left: 20rpx;
        }
        .head-pre {
          width: 14rpx;
          height: 28rpx;
          min-width: 14rpx;
          max-width: 14rpx;
          margin-right: 35rpx;
        }
      }
      //head-top E
      //head-dl S
      .head-dl {
        display: flex;
        margin: 35rpx 0;
        color: #fff;
        align-items: center;
        .dt {
          width: 92rpx;
          height: 92rpx;
          border-radius: 10rpx;
          overflow: hidden;
          min-width: 92rpx;
          max-width: 92rpx;
          margin-right: 30rpx;
        }
        .dd {
          flex: 1;
          .t {
            font-size: 30rpx;
          }
          .c {
            word-break: break-all;

            text-overflow: ellipsis;

            display: -webkit-box;

            -webkit-box-orient: vertical;

            -webkit-line-clamp: 2; /* 这里是超出几行省略 */
            overflow: hidden;
            height: 56rpx;
            font-size: 26rpx;
            line-height: 28rpx;
            margin-top: 15rpx;
          }
        }
        .focus-btn {
          width: 116rpx;
          height: 46rpx;
          border: 1px solid #ffffff;
          border-radius: 23rpx;
          padding: 0;
          margin: 0;
          line-height: 46rpx;
          text-align: center;
          font-size: 26rpx;
          color: #fff;
          min-width: 116rpx;
          max-width: 116rpx;
          margin-left: 20rpx;
        }
      }
      //head-dl E
    }
  }
  //shop-head E
  //shop-box S
  .shop-box {
    background: #fff;
    background: #ffffff;
    border-radius: 20rpx;
    margin-top: -30rpx;
    position: relative;
    padding: 30rpx;
    z-index: 22;
    .shop-nav {
      border-bottom: 1px solid #f5f5f5;
      line-height: 1;
      margin: -30rpx -30rpx 30rpx -30rpx;
      padding: 35rpx 30rpx;
      display: flex;
      justify-content: space-between;
      .li {
        font-size: 28rpx;
      }
      .active {
        color: #fc0609;
      }
    }
    //gain-choice S
    .gain-choice {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 26rpx;
      line-height: 1;
      margin-right: 20rpx;
      margin-bottom: 30rpx;
      .li {
        display: flex;
        align-items: center;
        position: relative;
        .up-icon {
          width: 8rpx;
          height: 6rpx;
          position: absolute;
          right: -15rpx;
          top: 5rpx;
        }
        .down-icon {
          width: 8rpx;
          height: 6rpx;
          position: absolute;
          right: -15rpx;
          bottom: 5rpx;
          .selected {
            // display: none;
          }
        }
      }
      .active {
        .up-icon {
          // display: none;
        }
        .down-icon {
          bottom: 8rpx;
          .default {
            // display: none;
          }
          .selected {
            display: block;
            width: 8rpx;
            height: 6rpx;
          }
        }
      }
    }

    //gain-choice E
    //att-goods S
    .att-goods {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      .goods {
        width: 50%;
        .goods-con {
          margin: 10rpx;
          .goods-img {
            width: 335rpx;
            height: 335rpx;
            border-radius: 10rpx;
            overflow: hidden;
            position: relative;
          }
          .goods-tip {
            height: 40rpx;
            background: #fc0609;
            background: linear-gradient(-45deg, #fc0609 0%, #ff4e50 100%);
            border-radius: 20rpx 0px 20rpx 0px;
            padding: 0 15rpx;
            color: #fff;
            line-height: 40rpx;
            font-size: 22rpx;
            position: absolute;
            left: 0;
            top: 0;
          }
          .goods-t {
            font-size: 26rpx;
            line-height: 1.2;
            margin: 30rpx 0;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden; //溢出内容隐藏
            text-overflow: ellipsis; //文本溢出部分用省略号表示
            display: -webkit-box; //特别显示模式
            -webkit-line-clamp: 2; //行数
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .goods-m {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: #fc0609;
              font-size: 22rpx;
              font-weight: 550;
            }
            .sale {
              font-size: 20rpx;
              color: #999;
            }
          }
          .goods-b {
            display: flex;
            align-items: center;
            margin-top: 20rpx;
            .icon {
              width: 26rpx;
              height: 26rpx;
              min-width: 26rpx;
              max-width: 26rpx;
              margin-right: 10rpx;
            }
            .name {
              font-size: 24rpx;
            }
            .more {
              width: 10rpx;
              height: 18rpx;
              margin-left: 10rpx;
              min-width: 10rpx;
            }
          }
        }
      }
    }
    //att-goods E
  }
  //shop-box E
  //auct-new S
  .auct-new {
    .new-li {
      background: #fff;
      padding: 30rpx 0;
      border-bottom: 10rpx solid #f9f9f9;
      display: flex;
      .li-img {
        width: 230rpx;
        height: 230rpx;
        border-radius: 10rpx;
        position: relative;
        margin-right: 25rpx;
        min-width: 230rpx;
        max-width: 230rpx;
        overflow: hidden;
      }
      .li-date {
        height: 40rpx;
        background: #fc0609;
        background: linear-gradient(-45deg, #fc0609 0%, #ff4e50 100%);
        border-radius: 10px 0px 10rpx 0px;
        position: absolute;
        left: 0;
        top: 0;
        line-height: 40rpx;
        padding: 0 10rpx;
        font-size: 22rpx;
        color: #fff;
      }
      .li-t {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(252, 6, 9, 0.3);
        height: 34rpx;
        border-radius: 10rpx;
        line-height: 34rpx;
        text-align: center;
        color: #fff;
        font-size: 22rpx;
        line-height: 34rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .li-txt {
        width: calc(100% - 255rpx);
        .li-h {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            font-size: 28rpx;
            font-weight: 550;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 30%;
          }
          .s {
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 70%;
          }
        }
        .t {
          font-size: 26rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 10rpx 0 10rpx 0;
        }
        .li-tags {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -5rpx;
          .tag {
            margin: 5rpx;
            width: 110rpx;
            height: 30rpx;
            background: #e1ebff;
            line-height: 30rpx;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 22rpx;
            color: #699dff;
          }
          .yellow {
            background: #ffedcc;
            color: #ffa503;
          }
          .red {
            background: #ffe2e2;
            color: #d32524;
          }
        }
        .li-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10rpx 0;
          .price-fl {
            .red {
              color: #fc0609;
              margin-right: 20rpx;
            }
            .gray {
              color: #999;
              text-decoration: line-through;
            }
          }
          .price-btn {
            width: 100rpx;
            height: 50rpx;
            background: #fc0609;
            border-radius: 10rpx;
            min-width: 100rpx;
            max-width: 100rpx;
            text-align: center;
            line-height: 50rpx;
            margin: 0;
            font-size: 24rpx;
            color: #fff;
          }
        }
        .li-b {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #fc0609;
          .w {
          }
          .li-pro {
            position: relative;
            flex: 1;
            margin: 0 10rpx;
            height: 12rpx;
            background: #f5f5f5;
            border-radius: 6rpx;
            .pro {
              position: absolute;
              left: 0;
              top: 0;
              height: 100%;
              border-radius: 6rpx;
              background: #fc0609;
            }
          }
        }
      }
    }
  }
}
//sort-side S
.sort-side {
  position: fixed;
  left: 0;
  top: 380rpx;
  height: calc(100% - 380rpx);
  z-index: 99;
  background: #f9f9f9;
  width: 200rpx;
  .side-ul {
    position: relative;
    height: calc(100% - 150rpx);
    overflow-y: auto;
  }
  .li {
    height: 90rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 26rpx;
    text-align: center;
    line-height: 90rpx;
    padding: 0 20rpx;
    position: relative;
  }
  .active {
    font-size: 28rpx;
    color: #fc0609;
    font-weight: 550;
  }
  .active:before {
    width: 12rpx;
    height: 40rpx;
    background: #fc0609;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -20rpx;
    display: block;
    content: "";
  }
}
//sort-side E
//sort-box S
.sort-box {
  margin-left: 200rpx;
  .sort-t {
    font-size: 28rpx;
    font-weight: 550;
  }
  .sort-ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20rpx;
    .li {
      width: 33.3333%;
      text-align: center;
      margin: 15rpx 0;
      .li-img {
        width: 130rpx;
        height: 130rpx;
        margin: 0 auto;
      }
      .li-t {
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 10rpx 30rpx;
      }
    }
  }
}
//sort-box E

/deep/.u-count-down__text {
  color: #fff !important;
  font-size: 22rpx !important;
}

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
      width: 33.333%;
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
