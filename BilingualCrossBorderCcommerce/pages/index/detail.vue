<template>
  <view class="detail-page">
    <!--轮播图 start-->
    <view class="detail-big">
      <uni-swiper-dot class="uni-swiper-dot-box" :info="GoodsCont.images" :current="current" :mode="mode" field="content">
        <swiper class="swiper-box" autoplay="true" :circular="true" @change="change">
          <swiper-item v-for="(item, index) in GoodsCont.images" :key="index">
            <view :class="item.colorClass" class="swiper-item">
              <view class="big-img">
                <image class="image img" :src="item" mode="aspectFill" :draggable="false" @click="onBanner(index)" />
              </view>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
    <!--轮播图 end-->
    <!--商品标题信息 start-->
    <view class="detail-head">
      <view class="head-hd">
        <view class="price">
          RM<text class="f-34">{{$filter.formatValue(line_price, 'split')[0]}}</text>.{{$filter.formatValue(line_price, 'split')[1] ? $filter.formatValue(line_price, 'split')[1] : '00'}}
        </view>
        <view class="sale">{{$t('home.shop.xiaoliang')}}{{GoodsCont.sales_initial}}</view>
      </view>
      <view class="head-bd">
        <view class="tag">{{GoodsCont.tag_name}}</view>
        <text>{{GoodsCont.goods_name}}</text>
      </view>
    </view>
    <!--商品标题信息 end-->
    <!--规格 start-->
    <view class="detail-one">
      <view class="one-li" @click="onShopClick(2)">
        <view class="li-fl">
          <view class="label">{{$t('home.shop.gueige')}}</view>
          <view class="c">
            <block v-for="(item,index) in attrs" :key="{index}">
              <block v-if="index!==0">，</block> {{item}}
            </block>
          </view>
        </view>
        <view class="more">
          <image class="img" src="../../static/images/detail3.png"></image>
        </view>
      </view>
      <view class="one-li">
        <view class="li-fl">
          <view class="label">{{$t('home.shop.yunfei')}}</view>
          <view class="c">{{$t('home.shop.mianyunfei')}}</view>
        </view>
      </view>
    </view>
    <!--规格 end-->
    <!--拼团消息 start-->
    <view class="detail-two">
      <view class="two-li">
        <view class="icon">
          <image class="img" src="../../static/images/detail.png"></image>
        </view>
        <swiper class="swiper-pintuan" autoplay vertical="true" circular="true">
          <swiper-item class="swiper-item" v-for="(item, index) in finishList" :key="index">
            <view class="pic">
              <image class="img" :src="item.avatar"></image>
            </view>
            <text>{{item.nickname}}{{$t('home.detail.ptcg')}}</text>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!--拼团消息 end-->
    <!--拼团列表 start-->
    <view class="detail-three">
      <view class="detail-title">
        <view class="t">{{total}}{{$t('home.detail.rzzptkzjcy')}}</view>
        <view class="more" @click="onpintuanClick">
          <text>{{$t('home.detail.more')}}</text>
          <view class="icon">
            <image class="img" src="../../static/images/detail3.png"></image>
          </view>
        </view>
      </view>
      <!--three-li start-->
      <block v-for="(item,index) in GroupList" :key="{index}">
        <view class="three-li" v-if="index<2">
          <view class="li-fl">
            <view class="pic">
              <image class="img" :src="item.avatar"></image>
            </view>
            <text>{{item.nickname}}</text>
          </view>
          <view class="li-fr">
            <view class="time">{{$t('home.detail.shengyu')}}<u-count-down :time="item.remain_time" format="HH:mm:ss"></u-count-down>
            </view>
            <button class="three-btn" @click="onGoPintuan(item)">{{$t('home.detail.qupt')}}</button>
          </view>
        </view>
      </block>
      <!--three-li end-->
    </view>
    <!--拼团列表 end-->
    <!--评价 start-->
    <view class="detail-four" v-if="JudgeList.length">
      <view class="detail-title">
        <view class="t flex">{{$t('home.shop.pingjia')}}<text class="f-22 m-l-15">{{Judgetotal}}{{$t('home.shop.tiao')}}</text></view>
        <view class="more" @click="navClick('../class/appraise?id='+GoodsCont.goods_id)">
          <text>{{$t('home.shop.haopingdu')}} {{GoodsCont.judge_rate}}%</text>
          <view class="icon">
            <image class="img" src="../../static/images/detail3.png"></image>
          </view>
        </view>
      </view>
      <JudgeList :JudgeList="JudgeList"></JudgeList>
      <button class="four-btn" @click="navClick('../class/appraise?id='+GoodsCont.goods_id)">{{$t('home.shop.chakanpingjia')}}</button>
    </view>
    <!--评价 end-->
    <!--店铺信息 start-->
    <view class="detail-five">
      <view class="five-hd">
        <view class="hd-fl">
          <view class="logo">
            <image class="img" :src="shopingCont.shop_logo"></image>
          </view>
          <view class="txt">
            <view class="t">{{shopingCont.shop_name}}</view>
            <view class="c">{{shopingCont.shop_info}}</view>
          </view>
        </view>
        <view class="more" @click="onshopCont">
          <image class="img" src="../../static/images/detail3.png"></image>
        </view>
      </view>
      <view class="five-bd">
        <view class="bd-li" @click="onMineFocus(2)">
          <view class="icon">
            <image class="img" v-if="shopingCont.is_shop_focus==1" src="../../static/images/detail1.png"></image>
            <image class="img" v-else src="../../static/images/xin.png"></image>
          </view>
          <text v-if="shopingCont.is_shop_focus==1">{{$t('home.detail.qxgz')}}</text>
          <text v-else>{{$t('home.detail.guanzhu')}}</text>
        </view>
        <view class="bd-li" @click="onshopCont">
          <view class="icon">
            <image class="img" src="../../static/images/detail2.png"></image>
          </view>
          <text>{{$t('home.detail.jindgg')}}</text>
        </view>
      </view>
    </view>
    <!--店铺信息 end-->
    <!--商品详情 start-->
    <view class="detail-six">
      <view class="six-tit">
        <view class="line">
          <image class="img" src="../../static/images/detail6.png"></image>
        </view>
        <text>{{$t('home.shop.title')}}</text>
        <view class="line">
          <image class="img" src="../../static/images/detail7.png"></image>
        </view>
      </view>
      <view class="six-article" v-if="isShopCont" v-html="GoodsCont.english_content"></view>
      <view class="six-article" v-else v-html="GoodsCont.content"></view>
    </view>
    <!--商品详情 end-->
    <!--底部 start-->
    <view class="detail-fixed">
      <view class="fixed-con">
        <view class="fixed-fl">
          <view class="li" @click="onshopCont">
            <view class="icon">
              <image class="img" src="../../static/images/icon11.png"></image>
            </view>
            <view class="t">{{$t('home.detail.dianpu')}}</view>
          </view>
          <view class="li" @click="onkefyu">
            <view class="icon">
              <image class="img" src="../../static/images/icon12.png"></image>
            </view>
            <view class="t">{{$t('home.detail.kefu')}}</view>
          </view>
          <view class="li" @click="onMineFocus(1)">
            <view class="icon">
              <image class="img" v-if="GoodsCont.is_goods_focus==1" src="../../static/images/detail1.png"></image>
              <image class="img" v-else src="../../static/images/xin.png"></image>
            </view>
            <view class="t" v-if="GoodsCont.is_goods_focus==1">{{$t('home.detail.qxgz')}}</view>
            <view class="t" v-else>{{$t('home.detail.guanzhu')}}</view>
          </view>
        </view>
        <view class="fixed-fr">
          <view class="detail-btn orange" @click="onShopClick(2)">
            <view>RM{{goods_price}}</view>
            <view>{{$t('home.detail.ddgm')}}</view>
          </view>
          <view class="detail-btn" @click="onShopClick(1)">
            <view>RM{{line_price}}</view>
            <view>{{$t('home.detail.fqpt')}}</view>
          </view>
        </view>
      </view>
    </view>
    <!--底部 end-->
    <!--购买弹出 start-->
    <uni-popup ref="shopPopup" type="bottom">
      <view class="rule-pop">
        <view class="pop-close" @click="onShopQuery">
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
                <block v-if="index!==0">，</block> {{item}}
              </block>
            </view>
            <view class="price">¥<text class="f-30" v-if="isShopNum==2">{{goods_price}}</text><text class="f-30" v-else>{{line_price}}</text></view>
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
          <view class="t">{{$t('home.detail.gmsl')}}</view>
          <view class="num-coum">
            <button class="coum-btn" @click="onJian">-</button>
            <input class="coum-input" v-model="num" disabled />
            <button class="coum-btn last" @click="onJia">+</button>
          </view>
        </view>
        <!--pop-num end-->
        <!--pop-bot start-->
        <view class="pop-bot">
          <button class="public-btn" v-if="isShopNum==1" @click="onGoPay">{{$t('home.detail.ljptgm')}}</button>
          <button class="public-btn" v-if="isShopNum==2" @click="onGoPay">{{$t('home.detail.ljzf')}}</button>
          <button class="public-btn" v-if="isShopNum==3" @click="onGoPay">{{$t('home.detail.qd')}}</button>
        </view>
        <!--pop-bot end-->
      </view>
    </uni-popup>
    <!--购买弹出 start-->
    <!--拼团列表弹出 start-->
    <uni-popup ref="pintuanPopup" type="center">
      <view class="pintuanCont">
        <view class="query" @click="onQueryClick">
          <image src="/static/images/close1.png" mode="" />
        </view>
        <view class="max-title">{{$t('home.detail.kcydpd')}}</view>
        <view class="conter">
          <block v-for="(item,index) in GroupList" :key="{index}">
            <view class="three-li">
              <view class="li-fl">
                <view class="pic">
                  <image class="img" :src="item.avatar"></image>
                </view>
                <text>{{item.nickname}}</text>
              </view>
              <view class="li-fr">
                <!-- <view class="time">剩余<u-count-down :time="item.remain_time" format="HH:mm:ss"></u-count-down>
              </view> -->
                <button class="three-btn" @click="onGoPintuan(item)">{{$t('home.detail.qupt')}}</button>
              </view>
            </view>
          </block>
        </view>
      </view>
    </uni-popup>
    <!--拼团列表弹出 start-->
    <!--联系客服弹出 start-->
    <uni-popup ref="popup3" type="center">
      <view class="email-cont">
        <image class="query" @click="onQuerys" src="../../static/images/close1.png"></image>
        <view class="title">{{$t('kefu.title')}}</view>
        <view class="cont">
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>cs-reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>info@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>support@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../static/email.png"></image>help@kolibrimall.com
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import JudgeList from '@/components/judgeList'
export default {
  components: { JudgeList },
  data () {
    return {
      total: 0,// 拼团人数
      current: 0,
      mode: 'nav',
      shopingCont: '',// 店铺信息
      GoodsCont: '',// 详情
      line_price: '',// 拼团价格
      goods_price: '',// 单独价格
      spec_image: '',// 选中的商品图片
      attrs: [],// 属性值
      spec_sku_id: '',// sku属性id组合
      goods_spec_id: '',// skuid
      stock_num: '',// 库存
      isShopCont: false,// 商品详情显示中文还是英文
      num: 1,// 购买数量
      shopCont: '',// 选中的规格
      isShopNum: 3,// 1拼团 2单独 3规格
      GroupList: [],// 拼团列表
      JudgeList: [],// 评价列表
      Judgetotal: 0,// 评价总条数
      finishList: [],// 拼团成功列表
      major_no: '',// 拼团编号
      id: '',
      userList: [],// 用户拼团数据
    }
  },
  onLoad (e) {
    this.id = e.id
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    // 详情接口
    this.$http.post(this.$apiObj.IndexGoodsDetail, { goods_id: e.id }).then(res => {
      if (res.code == 1) {
        res.data.spec_list.map(item => {
          item.attr.map(items => {
            items.isShow = false
            res.data.now_sku.attrs.map(itemss => {
              if (itemss == items.spec_value) {
                items.isShow = true
              }
            })
          })
        })
        if (this.isShopCont) {
          res.data.goods_name = this.getCaption(res.data.goods_name, 1) ? this.getCaption(res.data.goods_name, 1) : res.data.goods_name
          res.data.tag_name = this.getCaption(res.data.tag_name, 1) ? this.getCaption(res.data.tag_name, 1) : res.data.tag_name
          res.data.sku_list.map(item => {
            item.attrs[0] = this.getCaption(item.attrs[0], 1) ? this.getCaption(item.attrs[0], 1) : item.attrs[0]
          })
          res.data.now_sku.attrs[0] = this.getCaption(res.data.now_sku.attrs[0], 1) ? this.getCaption(res.data.now_sku.attrs[0], 1) : res.data.now_sku.attrs[0]
          res.data.spec_list.map(item => {
            item.spec_name = this.getCaption(item.spec_name, 1) ? this.getCaption(item.spec_name, 1) : item.spec_name
            item.attr.map(items => {
              items.spec_value = this.getCaption(items.spec_value, 1) ? this.getCaption(items.spec_value, 1) : items.spec_value
            })
          })
        } else {
          res.data.goods_name = this.getCaption(res.data.goods_name, 0) ? this.getCaption(res.data.goods_name, 0) : res.data.goods_name
          res.data.tag_name = this.getCaption(res.data.tag_name, 0) ? this.getCaption(res.data.tag_name, 0) : res.data.tag_name
          res.data.sku_list.map(item => {
            item.attrs[0] = this.getCaption(item.attrs[0], 0) ? this.getCaption(item.attrs[0], 0) : item.attrs[0]
          })
          res.data.now_sku.attrs[0] = this.getCaption(res.data.now_sku.attrs[0], 0) ? this.getCaption(res.data.now_sku.attrs[0], 0) : res.data.now_sku.attrs[0]
          res.data.spec_list.map(item => {
            item.spec_name = this.getCaption(item.spec_name, 0) ? this.getCaption(item.spec_name, 0) : item.spec_name
            item.attr.map(items => {
              items.spec_value = this.getCaption(items.spec_value, 0) ? this.getCaption(items.spec_value, 0) : items.spec_value
            })
          })
        }
        res.data.content = this.onHtmlcont(res.data.content)
        res.data.english_content = this.onHtmlcont(res.data.english_content)
        this.GoodsCont = res.data // 全部
        this.shopingCont = res.data.shop
        this.shopCont = res.data.now_sku
        this.goods_price = res.data.now_sku.goods_price // 单独价格
        this.line_price = res.data.now_sku.line_price // 拼团价格
        this.spec_image = res.data.now_sku.spec_image // 选中的图片
        this.attrs = res.data.now_sku.attrs// 属性值
        this.spec_sku_id = res.data.now_sku.spec_sku_id// sku属性id组合
        this.goods_spec_id = res.data.now_sku.goods_spec_id// skuid
        this.stock_num = res.data.now_sku.stock_num// 库存
      }
    })
    // 拼团成功消息
    this.$http.post(this.$apiObj.OrderFinishGroup, { goods_id: e.id }).then(res => {
      if (res.code == 1) {
        this.finishList = res.data.data
      }
    })
    // 评价列表
    this.$http.post(this.$apiObj.OrderGoodsJudgeList, { goods_id: e.id, type: 1, page: 1, pagenum: 2 }).then(res => {
      if (res.code == 1) {
        this.Judgetotal = res.data.list.total
        this.JudgeList = res.data.list.data
      }
    })
  },
  onShow () {
    // 拼团列表
    this.$http.post(this.$apiObj.OrderWaitGroupList, { goods_id: this.id, pagenum: 20 }).then(res => {
      if (res.code == 1) {
        res.data.data.map(item => {
          item.remain_time = item.remain_time * 1000
        })
        this.total = res.data.total
        this.GroupList = res.data.data
      }
    })
  },
  methods: {
    getCaption (str, state) {
      if (state == 1) {
        console.log(str);
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
    onkefyu () {
      this.$refs.popup3.open()
      // uni.navigateTo({
      //   url: '/pages/mine/custom?uuid=' + this.GoodsCont.shop.id + '&avatar=' + uni.getStorageSync('userCont').avatar
      // })
    },
    onQuerys () {
      this.$refs.popup3.close()
    },
    onHtmlcont (html) {
      let richtext = html
      const regex = new RegExp('<img', 'gi');
      richtext = richtext.replace(regex, '<img style="max-width: 100%;"');
      const regex1 = new RegExp('data-fail="0" style="', 'gi');
      richtext = richtext.replace(regex1, 'data-fail="0" style="max-width: 100%;');
      return richtext
    },
    // 跳转店铺
    onshopCont () {
      uni.setStorageSync('shop_id', this.shopingCont.id)
      uni.navigateTo({
        url: '/pages/class/shop/shop'
      });
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    // 轮播图数字变
    change (e) {
      this.current = e.detail.current
    },
    // 点击sku选中
    onShopSKUClick (e, k) {
      this.num = 1
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
          this.shopCont = this.GoodsCont.sku_list[i]
          this.goods_price = this.GoodsCont.sku_list[i].goods_price // 拼团价格
          this.line_price = this.GoodsCont.sku_list[i].line_price // 单独价格
          this.spec_image = this.GoodsCont.sku_list[i].spec_image // 选中的图片
          this.attrs = this.GoodsCont.sku_list[i].attrs// 属性值
          this.spec_sku_id = this.GoodsCont.sku_list[i].spec_sku_id// sku属性id组合
          this.goods_spec_id = this.GoodsCont.sku_list[i].goods_spec_id// skuid
          this.stock_num = this.GoodsCont.sku_list[i].stock_num// 库存
        }
      }
    },
    // 商品关注、取消关注
    onMineFocus (e) {
      this.$http.post(this.$apiObj.MineFocus, { type: e, data_id: e == 1 ? this.GoodsCont.goods_id : this.shopingCont.id }).then(res => {
        if (res.code == 1) {
          if (e == 1) {
            if (this.GoodsCont.is_goods_focus == 1) {
              uni.showToast({ icon: 'none', title: this.$t('home.detail.yqxcg') })
              this.GoodsCont.is_goods_focus = 0
            } else {
              uni.showToast({ icon: 'none', title: this.$t('home.detail.gzcg') })
              this.GoodsCont.is_goods_focus = 1
            }
          }
          if (e == 2) {
            if (this.shopingCont.is_shop_focus == 1) {
              uni.showToast({ icon: 'none', title: this.$t('home.detail.yqxcg') })
              this.shopingCont.is_shop_focus = 0
            } else {
              uni.showToast({ icon: 'none', title: this.$t('home.detail.gzcg') })
              this.shopingCont.is_shop_focus = 1
            }
          }
        }
      })
    },
    // 点击减
    onJian () {
      if (this.num == 1) return
      this.num--
    },
    // 点击加
    onJia () {
      if (this.num == this.stock_num) return
      if (this.isShopNum == 1) return uni.showToast({ icon: 'none', title: this.$t('home.detail.ptzngmyj') })
      this.num++
    },
    // 点击拼团列表
    onGoPintuan (item) {
      console.log(item);
      this.userList.push(item)
      if (item.u_id == uni.getStorageSync('userCont').u_id) return uni.showToast({ icon: 'none', title: this.$t('home.detail.zjbnhezjpt') })
      this.major_no = item.major_no
      this.isShopNum = 1
      this.num = 1
      this.$refs.shopPopup.open()
      this.$refs.pintuanPopup.close()
    },
    // 点击弹框立即购买
    onGoPay () {
      this.userList.push({
        avatar: uni.getStorageSync('userCont').avatar,
        major_no: '',
        nickname: uni.getStorageSync('userCont').nickname,
        pay_time: '',
        remain_time: '',
        u_id: uni.getStorageSync('userCont').u_id,
      })
      console.log(this.num, this.line_price, this.goods_price)
      let shopCont = {
        total: this.isShopNum == 2 ? this.num * this.goods_price : this.num * this.line_price, //总价
        cartdata: [{
          admin_id: this.shopingCont.id, //店铺id
          shop_name: this.shopingCont.shop_name, //店铺名称
          list: [{
            goods_id: this.GoodsCont.goods_id, //商品id
            price: this.isShopNum == 2 ? this.goods_price : this.line_price, // 价格
            num: this.num, //购买数量
            good_name: this.GoodsCont.goods_name, //商品名称
            image: this.spec_image, //图片
            admin_id: this.shopingCont.id, //店铺id
            attrs: this.attrs,// 规格
            goods_spec_id: this.goods_spec_id,// sku id
            spec_sku_id: this.spec_sku_id, //sku属性id的组合
            stock_num: this.stock_num,//库存
          }]
        }]
      }
      if (this.isShopNum == 2) {
        uni.navigateTo({
          url: '../class/submit?shopCont=' + JSON.stringify(shopCont) + '&group_type=0&userList=' + JSON.stringify(this.userList)
        })
      } else if (this.major_no) {
        uni.navigateTo({
          url: '../class/submit?shopCont=' + JSON.stringify(shopCont) + '&group_type=2' + '&major_no=' + this.major_no + '&userList=' + JSON.stringify(this.userList)
        })
      } else {
        uni.navigateTo({
          url: '../class/submit?shopCont=' + JSON.stringify(shopCont) + '&group_type=1&userList=' + JSON.stringify(this.userList)
        })
      }
    },
    // 点击弹出规格框
    onShopClick (e) {
      let that = this
      that.isShopNum = e
      that.num = 1
      that.$refs.shopPopup.open()
    },
    // 关闭规格框
    onShopQuery () {
      let that = this
      that.$refs.shopPopup.close()
    },
    // 点击显示拼单弹框
    onpintuanClick () {
      let that = this
      that.$refs.pintuanPopup.open()
    },
    // 点击关闭拼单弹框
    onQueryClick () {
      let that = this
      that.$refs.pintuanPopup.close()
    }
  }
}
</script>
<style>
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.detail-page {
  padding-bottom: 100rpx;
  .detail-big {
    /deep/ uni-swiper {
      height: 475rpx;
    }
    .big-img {
      width: 100%;
      height: 475rpx;
    }
    /deep/.uni-swiper__dots-nav {
      background: none;
      display: flex;
      justify-content: flex-end;
      padding-bottom: 50rpx;
    }
    /deep/ .uni-swiper__dots-nav-item {
      width: 80rpx;
      height: 36rpx;
      background: rgba(0, 0, 0, 0.4);
      text-align: center;
      border-radius: 18rpx;
    }
  }
  //detail-head S
  .detail-head {
    background: #ffffff;
    border-radius: 20rpx 20rpx 0px 0px;
    padding: 30rpx;
    margin-top: -30rpx;
    position: relative;
    z-index: 11;
    .head-hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sale {
        font-size: 24rpx;
        color: #999;
      }
      .price {
        color: #fc0609;
        font-size: 22rpx;
        font-weight: 550;
      }
    }
    .head-bd {
      display: inline-block;
      font-size: 28rpx;
      line-height: 40rpx;
      margin-top: 40rpx;
      .tag {
        height: 40rpx;
        background: #fc0609;
        border-radius: 6rpx;
        padding: 0 10rpx;
        color: #fff;
        font-size: 22rpx;
        color: #fff;
        line-height: 40rpx;
        white-space: nowrap;
        margin-right: 15rpx;
        display: inline-block;
      }
    }
  }
  //detail-head E

  //detail-one S
  .detail-one {
    background: #fff;
    margin: 20rpx 0;
    padding: 30rpx;
    .one-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      .more {
        width: 12rpx;
        height: 22rpx;
        margin-left: 20rpx;
        min-width: 12rpx;
        max-width: 12rpx;
      }
      .li-fl {
        flex: 1;
        display: flex;
        line-height: 40rpx;
        .label {
          // width: 80rpx;
          font-size: 26rpx;
          min-width: 80rpx;
          margin-right: 20rpx;
        }
        .c {
          font-size: 28rpx;
        }
      }
    }
  }
  //detail-one E
  //detail-two S
  .detail-two {
    margin: 20rpx 0;
    background: #fff;
    padding: 30rpx;
    .two-li {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      .icon {
        width: 43rpx;
        height: 39rpx;
        min-width: 43rpx;
        margin-right: 24rpx;
      }
      .pic {
        width: 45rpx;
        height: 45rpx;
        border-radius: 100%;
        overflow: hidden;
        min-width: 45rpx;
        max-width: 45rpx;
        margin-right: 15rpx;
      }
    }
  }
  //detail-two E

  .detail-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20rpx;
    font-size: 26rpx;
    position: relative;
    .more {
      font-size: 24rpx;
      color: #999;
      display: flex;
      align-items: center;
      .icon {
        width: 12rpx;
        height: 22rpx;
        margin-left: 10rpx;
      }
    }
  }
  .detail-title:before {
    width: 6rpx;
    height: 32rpx;
    background: #f52c1f;
    border-radius: 3rpx;
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -16rpx;
  }

  //detail-three S
  .detail-three {
    background: #fff;
    margin: 20rpx 0;
    padding: 30rpx;
    .three-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30rpx 0;
      .li-fl {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        .pic {
          width: 45rpx;
          height: 45rpx;
          border-radius: 100%;
          overflow: hidden;
          margin-right: 15rpx;
        }
      }
      .li-fr {
        display: flex;
        align-items: center;
        .time {
          font-size: 26rpx;
          color: #999;
          margin-right: 12rpx;
          display: flex;
          /deep/.u-count-down__text {
            font-size: 26rpx;
            color: #999;
            line-height: normal;
          }
        }
      }
      .three-btn {
        width: 100rpx;
        height: 45rpx;
        background: #fc0609;
        border-radius: 10rpx;
        margin: 0;
        line-height: 45rpx;
        color: #fff;
        font-size: 24rpx;
      }
    }
  }
  //detail-three E
  //detail-four S
  .detail-four {
    margin: 20rpx 0;
    background: #fff;
    padding: 30rpx;
    .four-li {
      margin: 30rpx 0;
      .li-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .date {
          font-size: 26rpx;
        }
        .hd-fl {
          display: flex;
          align-items: center;
          .pic {
            width: 52rpx;
            height: 52rpx;
            border-radius: 100%;
            overflow: hidden;
            min-width: 52rpx;
            margin-right: 20rpx;
          }
          .txt {
            .t {
              font-size: 26rpx;
            }
            .star {
              display: flex;
              margin-top: 10rpx;
              .icon {
                width: 18rpx;
                height: 18rpx;
                margin-right: 10rpx;
              }
            }
          }
        }
      }

      .li-bd {
        margin: 20rpx 0;
        font-size: 26rpx;
        line-height: 36rpx;
      }
      .li-img {
        display: flex;
        overflow-x: auto;
        width: 100%;
        white-space: nowrap;
        .small {
          width: 190rpx;
          height: 190rpx;
          margin-right: 18rpx;
          min-width: 190rpx;
        }
      }
    }
    .four-btn {
      width: 210rpx;
      height: 60rpx;
      border: 1px solid #dddddd;
      border-radius: 30rpx;
      line-height: 60rpx;
      font-size: 24rpx;
      margin: 50rpx auto;
    }
  }
  //detail-four E
  //detail-five S
  .detail-five {
    margin: 20rpx 0;
    padding: 30rpx;
    background: #fff;
    .five-hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .hd-fl {
        display: flex;
        align-items: center;
        flex: 1;
        .logo {
          width: 80rpx;
          height: 80rpx;
          border-radius: 100%;
          overflow: hidden;
          min-width: 80rpx;
          max-width: 80rpx;
          margin-right: 20rpx;
        }
        .txt {
          .t {
            font-size: 28rpx;
          }
          .c {
            font-size: 22rpx;
            margin-top: 10rpx;
          }
        }
      }
      .more {
        width: 12rpx;
        height: 22rpx;
        min-width: 12rpx;
        max-width: 12rpx;
        margin-left: 20rpx;
      }
    }
    .five-bd {
      display: flex;
      margin-top: 30rpx;
      justify-content: center;
      .bd-li {
        width: 208rpx;
        height: 70rpx;
        border: 1px solid #dddddd;
        border-radius: 35rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        margin: 0 30rpx;
        .icon {
          width: 34rpx;
          height: 34rpx;
          margin-right: 10rpx;
        }
      }
    }
  }
  //detail-five E
  //detail-six S
  .detail-six {
    margin: 0rpx 0;
    .six-tit {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      margin: 30rpx 0;
      .line {
        width: 85rpx;
        height: 6rpx;
        margin: 0 20rpx;
      }
    }
    .six-article {
      padding: 30rpx;
    }
  }
  //detail-six E
  //detail-fixed S
  .detail-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 99;
    .fixed-con {
      padding: 15rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .fixed-fl {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: space-between;
        .li {
          margin-right: 20rpx;
          text-align: center;
          .icon {
            width: 42rpx;
            height: 42rpx;
            margin: 0 auto;
          }
          .t {
            font-size: 22rpx;
            margin-top: 10rpx;
          }
        }
      }
      .fixed-fr {
        display: flex;
        align-items: center;
        .detail-btn {
          width: 200rpx;
          height: 75rpx;
          background: #fc0609;
          border-radius: 38rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          font-size: 28rpx;
          line-height: 30rpx;
          margin-left: 10rpx;
          flex-direction: column;
          justify-content: center;
        }
        .orange {
          background: #ffb202;
        }
      }
    }
  }
  //detail-fixed E

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
.swiper-pintuan {
  width: 600rpx;
  height: 44rpx;
  .swiper-item {
    display: flex;
    align-items: center;
  }
}
.pintuanCont {
  padding: 20rpx 30rpx;
  width: 500rpx;
  background: #fff;
  border-radius: 20rpx;
  position: relative;
  .query {
    position: absolute;
    top: -25rpx;
    right: -25rpx;
    width: 50rpx;
    height: 50rpx;
    background: #ccc;
    border-radius: 50%;
    text-align: center;
    image {
      margin-top: 15rpx;
      width: 20rpx;
      height: 20rpx;
    }
  }
  .max-title {
    text-align: center;
    font-size: 32rpx;
  }
  .conter {
    width: 100%;
    height: 500rpx;
    overflow-y: auto;
  }
  .three-li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30rpx 0;
    .li-fl {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      .pic {
        width: 60rpx;
        height: 60rpx;
        border-radius: 100%;
        overflow: hidden;
        margin-right: 15rpx;
      }
    }
    .li-fr {
      display: flex;
      align-items: center;
    }
    .three-btn {
      width: 100rpx;
      height: 45rpx;
      background: #fc0609;
      border-radius: 10rpx;
      margin: 0;
      line-height: 45rpx;
      color: #fff;
      font-size: 24rpx;
    }
  }
}
</style>