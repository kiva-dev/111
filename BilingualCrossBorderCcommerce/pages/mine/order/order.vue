<template>
  <view class="order-page">
    <!-- <view class="order-tab">
      <view :class="['li',Inv==0?'active':'']" @click="onInvClick(0)">{{$t('user.order.putdd')}}</view>
      <view :class="['li',Inv==1?'active':'']" @click="onInvClick(1)">{{$t('user.order.pintdd')}}</view>
      <view :class="['li',Inv==2?'active':'']" @click="onInvClick(2)">{{$t('user.order.jpdd')}}</view>
    </view> -->
    <!--普通订单 order-box start-->
    <view class="order-box" v-if="Inv == 0">
      <view class="order-nav">
        <view v-for="item in pttypeList" :key="item.id" class="li" :class="item.id==type?'active':''" @click="onNavClick(item.id)">{{item.name}}</view>
      </view>
      <view class="order-ul" v-if="orderList.length">
        <view v-for="item in orderList" :key="item.id" class="order-li" @click="onShopClick(item)">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="icon">
                <image class="img" src="../../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
            </view>
            <view v-if="item.status=='-2'" class="status gray">{{$t('user.order.qxdd')}}</view>
            <view v-if="item.status=='-1'" class="status gray">{{$t('user.order.qxdd')}}</view>
            <view v-if="item.status==0" class="status">{{$t('user.order.ddfk')}}</view>
            <view v-if="item.status==1" class="status">{{$t('user.order.yzfdct')}}</view>
            <view v-if="item.status==2" class="status">{{$t('user.order.ddmjfh')}}</view>
            <view v-if="item.status==3" class="status">{{$t('user.order.mjyfh')}}</view>
            <view v-if="item.status==4" class="status">{{$t('user.order.dpj')}}</view>
            <view v-if="item.status==5" class="status">{{$t('user.order.ywc')}}</view>
            <view v-if="item.status==6" class="status">{{$t('user.order.jygb')}}</view>
          </view>
          <!--order-mid start-->
          <view class="order-mid" v-for="items,k in item.goods" :key="k">
            <view class="mid-img">
              <image class="img" :src="items.image"></image>
            </view>
            <view class="mid-txt">
              <view class="h-flex">
                <view class="t">{{items.goods_name}}</view>
                <view class="num">*{{items.total_num}}</view>
              </view>
              <view class="b-flex">
                <block v-if="item.status==3&&items.back_num==0">
                  <view>
                    <view class="s">{{items.goods_attrs}}</view>
                    <view class="price" style="margin-top:5rpx;">
                      RM
                      <text>{{$filter.formatValue(items.goods_price, 'split')[0]}}</text>
                      .{{$filter.formatValue(items.goods_price, 'split')[1] ? $filter.formatValue(items.goods_price, 'split')[1] : '00'}}
                    </view>
                  </view>
                  <button @click.stop="onSengqing(items,item)" class="order-btn gray">{{$t('user.order.sqshh')}}</button>
                </block>
                <block v-else>
                  <view class="s">{{items.goods_attrs}}</view>
                  <view class="price">
                    RM
                    <text>{{$filter.formatValue(items.goods_price, 'split')[0]}}</text>
                    .{{$filter.formatValue(items.goods_price, 'split')[1] ? $filter.formatValue(items.goods_price, 'split')[1] : '00'}}
                  </view>
                </block>
              </view>
            </view>
          </view>
          <!--order-mid end-->
          <view class="order-price" v-if="item.status==2||item.status==3||item.status==4||item.status==5">
            <view></view>
            <view class="shopCont">
              {{$t('user.order.sfk')}} RM<text class="f-28">{{$filter.formatValue(item.pay_price, 'split')[0]}}</text>.{{$filter.formatValue(item.pay_price, 'split')[1] ? $filter.formatValue(item.pay_price, 'split')[1] : '00'}}
              <view class="yhje" v-if="item.coupon_price!='0.00'"> {{$t('user.order.yhje')}} RM<text class="f-28">{{$filter.formatValue(item.coupon_price, 'split')[0]}}</text>.{{$filter.formatValue(item.coupon_price, 'split')[1] ? $filter.formatValue(item.coupon_price, 'split')[1] : '00'}}</view>
            </view>
          </view>
          <!--待付款-->
          <view class="order-bd" v-if="item.status==0">
            <button class="order-btn gray" @click.stop="onQueryClick(item)">{{$t('user.order.qxdd')}}</button>
            <button class="order-btn" @click.stop="onorderPwdClick(item)">{{$t('user.order.qzf')}}</button>
          </view>
          <!-- 交易关闭  ptddgb -->
          <view class="order-bd" v-if="item.status=='-2'||item.status=='-1'||item.status==6">
            <button class="order-btn gray" @click.stop="onDelClick(item)">{{$t('user.order.scdd')}}</button>
          </view>
          <!-- 已支付待成团 -->
          <view class="order-bd" v-if="item.status==1"></view>
          <!-- 等待卖家发货  ddfh -->
          <view class="order-bd" v-if="item.status==2">
            <button class="order-btn gray" @click.stop="onQueryClick(item)">{{$t('user.order.qxdd')}}</button>
          </view>
          <!-- 单个已发货  ptqrsh -->
          <view class="order-bd" v-if="item.status==3">
            <button class="order-btn" @click.stop="onshopClick(item,1)">{{$t('user.order.qrsh')}}</button>
          </view>
          <!-- 待评价 -->
          <view class="order-bd" v-if="item.status==4">
            <button class="order-btn" @click.stop="onPingClick(item)">{{$t('user.order.dpj')}}</button>
          </view>
          <!-- 已完成 -->
          <view class="order-bd" v-if="item.status==5">
            <button class="order-btn gray" @click.stop="onDelClick(item)">{{$t('user.order.scdd')}}</button>
          </view>
          <!--order-bd end-->
        </view>
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
    </view>
    <!--普通订单 order-box end-->
    <!--拼团订单 order-box start-->
    <view class="order-box" v-if="Inv == 1">
      <!--order-nav start-->
      <view class="order-nav">
        <view v-for="item in pintuantypeList" :key="item.id" class="li" :class="item.id==type?'active':''" @click="onNavClick(item.id)">{{item.name}}</view>
      </view>
      <!--order-nav end-->
      <view class="order-ul" v-if="orderList.length">
        <!--order-li start-->
        <view v-for="item in orderList" :key="item.id" class="order-li" @click="onShopClick(item)">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="icon">
                <image class="img" src="../../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
            </view>
            <view v-if="item.status=='-2'" class="status gray">{{$t('user.order.qxdd')}}</view>
            <view v-if="item.status=='-1'" class="status gray">{{$t('user.order.qxdd')}}</view>
            <view v-if="item.status==0" class="status">{{$t('user.order.ddfk')}}</view>
            <view v-if="item.status==1" class="status">{{$t('user.order.ddpt')}}</view>
            <view v-if="item.status==2" class="status">{{$t('user.order.ddmjfh')}}</view>
            <view v-if="item.status==3" class="status">{{$t('user.order.mjyfh')}}</view>
            <view v-if="item.status==4" class="status">{{$t('user.order.dpj')}}</view>
            <view v-if="item.status==5" class="status">{{$t('user.order.ywc')}}</view>
            <view v-if="item.status==6" class="status">{{$t('user.order.jygb')}}</view>
          </view>
          <!--order-mid start-->
          <view class="order-mid" v-for="items,k in item.goods" :key="k">
            <view class="mid-img">
              <image class="img" :src="items.image"></image>
            </view>
            <view class="mid-txt">
              <view class="h-flex">
                <view class="t">{{items.goods_name}}</view>
                <view class="num">*{{items.total_num}}</view>
              </view>
              <view class="b-flex">
                <block v-if="item.status==3&&items.back_num==0">
                  <view>
                    <view class="s">{{items.goods_attrs}}</view>
                    <view class="price" style="margin-top:5rpx;">
                      RM
                      <text>{{$filter.formatValue(items.goods_price, 'split')[0]}}</text>
                      .{{$filter.formatValue(items.goods_price, 'split')[1] ? $filter.formatValue(items.goods_price, 'split')[1] : '00'}}
                    </view>
                  </view>
                  <button @click.stop="onSengqing(items,item)" class="order-btn gray">{{$t('user.order.sqshh')}}</button>
                </block>
                <block v-else>
                  <view class="s">{{items.goods_attrs}}</view>
                  <view class="price">
                    RM
                    <text>{{$filter.formatValue(items.goods_price, 'split')[0]}}</text>
                    .{{$filter.formatValue(items.goods_price, 'split')[1] ? $filter.formatValue(items.goods_price, 'split')[1] : '00'}}
                  </view>
                </block>
              </view>
            </view>
          </view>
          <!--order-mid end-->
          <!--order-bd start-->
          <view class="order-bd" v-if="item.status==0">
            <button class="order-btn gray" @click.stop="onQueryClick(item)">{{$t('user.order.qxdd')}}</button>
            <button class="order-btn" @click.stop="onorderPwdClick(item)">{{$t('user.order.qzf')}}</button>
          </view>
          <view class="order-bd" v-if="item.status==1">
            <button class="order-btn gray" @click.stop="onQueryClick(item)">{{$t('user.order.qxdd')}}</button>
            <button class="order-btn">{{$t('user.order.yqct')}}</button>
          </view>
          <view class="order-bd" v-if="item.status==3">
            <button class="order-btn" @click.stop="onshopClick(item,1)">{{$t('user.order.qrsh')}}</button>
          </view>
          <!-- 待评价 -->
          <view class="order-bd" v-if="item.status==4">
            <button class="order-btn" @click.stop="onPingClick(item)">{{$t('user.order.dpj')}}</button>
          </view>
          <!-- 已完成 -->
          <view class="order-bd" v-if="item.status==5">
            <button class="order-btn gray" @click.stop="onDelClick(item)">{{$t('user.order.scdd')}}</button>
          </view>
          <!--order-bd end-->
          <!--order-bd end-->
        </view>
        <!--order-li end-->
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
    </view>
    <!--拼团订单 order-box end-->
    <!--竞拍订单 order-box start-->
    <view class="order-box" v-if="Inv == 2" style="display:none;">
      <!--order-nav start-->
      <view class="order-nav">
        <view v-for="item in jingpaitypeList" :key="item.id" class="li" :class="item.id==type?'active':''" @click="onNavClick(item.id)">{{item.name}}</view>
      </view>
      <!--order-nav end-->
      <view class="order-ul" v-if="orderList.length">
        <!--等待付款 order-li start-->
        <view class="order-li" v-for="item,k in orderList" :key="k" @click="onjingpai(item)">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="icon">
                <image class="img" src="../../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
            </view>
            <view class="status" v-if="item.status=='-2'">{{$t('user.order.qxdd')}}</view>
            <view class="status" v-if="item.status=='-1'">{{$t('user.order.qxdd')}}</view>
            <view class="status" v-if="item.status==0">{{$t('user.order.ddfk')}}</view>
            <view class="status" v-if="item.status==2">{{$t('user.order.ddmjfh')}}</view>
            <view class="status" v-if="item.status==3">{{$t('user.order.dsh')}}</view>
            <view class="status" v-if="item.status==4">{{$t('user.order.dpj')}}</view>
            <view class="status" v-if="item.status==5">{{$t('user.order.ywc')}}</view>
            <view class="status" v-if="item.status==6">{{$t('user.order.jygb')}}</view>
          </view>
          <!--order-mid start-->
          <view class="order-mid" v-for="items,n in item.goods" :key="n">
            <view class="mid-img">
              <image class="img" :src="items.image"></image>
            </view>
            <view class="mid-txt">
              <view class="h-flex">
                <view class="t">{{items.goods_name}}</view>
                <view class="num">*{{items.total_num}}</view>
              </view>
              <!-- <view class="b-flex">
                <view class="s"> </view>
                <view class="price">
                  RM
                  <text>{{$filter.formatValue(items.goods_price, 'split')[0]}}</text>
                  .{{$filter.formatValue(items.goods_price, 'split')[1] ? $filter.formatValue(items.goods_price, 'split')[1] : '00'}}
                </view>
              </view> -->
              <block v-if="item.status==3&&items.back_num==0">
                <view style="display: flex;justify-content: space-between;align-items: center;margin-top:20rpx;">
                  <view class="b-flex">
                    <view class="s"> </view>
                    <view class="price">
                      RM
                      <text>{{$filter.formatValue(items.goods_price, 'split')[0]}}</text>
                      .{{$filter.formatValue(items.goods_price, 'split')[1] ? $filter.formatValue(items.goods_price, 'split')[1] : '00'}}
                    </view>
                  </view>
                  <button @click.stop="onSengqing(items,item)" class="order-btn gray">{{$t('user.order.sqshh')}}</button>
                </view>
              </block>
              <block v-else>
                <view class="b-flex">
                  <view class="s"> </view>
                  <view class="price">
                    RM
                    <text>{{$filter.formatValue(items.goods_price, 'split')[0]}}</text>
                    .{{$filter.formatValue(items.goods_price, 'split')[1] ? $filter.formatValue(items.goods_price, 'split')[1] : '00'}}
                  </view>
                </view>
              </block>
            </view>
          </view>
          <!--order-mid end-->
          <!--order-bd start-->
          <!-- <view class="order-bd">
            <button class="order-btn gray" v-if="item.status==0">取消订单</button>
            <button class="order-btn" v-if="item.status==0">去支付</button>
            <button class="order-btn gray" v-if="item.status==2">申请售后</button>
          </view> -->
          <!--待付款-->
          <view class="order-bd" v-if="item.status==0">
            <button class="order-btn gray" @click.stop="onQueryClick(item)">{{$t('user.order.qxdd')}}</button>
            <button class="order-btn" @click.stop="onorderPwdClick(item)">{{$t('user.order.qzf')}}</button>
          </view>
          <!-- 交易关闭  ptddgb -->
          <view class="order-bd" v-if="item.status=='-2'||item.status=='-1'||item.status==6">
            <button class="order-btn gray" @click.stop="onDelClick(item)">{{$t('user.order.scdd')}}</button>
          </view>
          <!-- 已支付待成团 -->
          <view class="order-bd" v-if="item.status==1"></view>
          <!-- 等待卖家发货  ddfh -->
          <view class="order-bd" v-if="item.status==2">
            <button class="order-btn gray" @click.stop="onQueryClick(item)">{{$t('user.order.qxdd')}}</button>
          </view>
          <!-- 单个已发货  ptqrsh -->
          <view class="order-bd" v-if="item.status==3">
            <button class="order-btn" @click.stop="onshopClick(item,1)">{{$t('user.order.qrsh')}}</button>
          </view>
          <!-- 待评价 -->
          <view class="order-bd" v-if="item.status==4">
            <button class="order-btn" @click.stop="onPingClick(item)">{{$t('user.order.dpj')}}</button>
          </view>
          <!-- 已完成 -->
          <view class="order-bd" v-if="item.status==5">
            <button class="order-btn gray" @click.stop="onDelClick(item)">{{$t('user.order.scdd')}}</button>
          </view>
          <!--order-bd end-->
        </view>
        <!--等待付款 order-li end-->
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
    </view>
    <view class="order-box" v-if="Inv == 2">
      <!--order-nav start-->
      <view class="order-nav">
        <view v-for="item in jingpaitypeList" :key="item.id" class="li" :class="item.id==type?'active':''" @click="onNavClick(item.id)">{{item.name}}</view>
      </view>
      <!--order-nav end-->
      <view class="order-ul" v-if="orderList.length>0">
        <!--等待付款 order-li start-->
        <view class="order-li" v-for="item in orderList" :key="item.id" @click="onzhongpaiClick(item)">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="icon">
                <image class="img" src="../../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
            </view>
            <!-- 
                  select_way 0未选择 1、折现 2、实物
                  status 2、待发货 3、待收货  4、待确认 5、已确认 6、已完成
                 -->
            <!-- {{item.status}} -->
            <!-- <view class="status" v-if="item.status=='-2'">{{$t('user.order.qxdd')}}</view>
            <view class="status" v-if="item.status=='-1'">{{$t('user.order.qxdd')}}</view>
            <view class="status" v-if="item.status==0">{{$t('user.order.ddfk')}}</view> -->
            <view class="status" v-if="item.status==2">{{$t('zhongpai.daifahuo')}}</view>
            <view class="status" v-if="item.status==3">{{$t('zhongpai.daishuohuo')}}</view>
            <view class="status" v-if="item.status==4">{{$t('zhongpai.daiqueren')}}</view>
            <view class="status" v-if="item.status==5">{{$t('zhongpai.yiqueren')}}</view>
            <!-- {{$filter.to_date_time(item.select_time)}}
            {{$filter.to_date_time(item.update_time)}} -->
            <view class="status" v-if="item.status==6">{{$t('user.order.ywc')}}</view>
          </view>
          <!--order-mid start-->
          <view class="order-mid">
            <view class="mid-img">
              <image class="img" :src="item.image"></image>
            </view>
            <view class="mid-txt">
              <view class="h-flex">
                <view class="t twoblock">{{item.goods_name}}</view>
                <!-- <view class="num">*2</view> -->
              </view>
              <view class="b-flex">
                <view class="s"> </view>
                <view class="price">RM{{item.single_money}}</view>
              </view>
            </view>
          </view>
          <!--order-mid end-->
          <!--待发货-->
          <view class="order-bd active">
            <view></view>
            <!-- <view class="name" style="background: #fdf5e9;color: #e29836;" v-if="item.select_way==1">{{$t('zhongpai.zhexian')}}</view>
            <view class="name" style="background: #eef8e8;color: #7ac756;" v-if="item.select_way==2">{{$t('zhongpai.linghuo')}}</view> -->
            <view style="display: flex;">
              <button class="order-btn gray" v-if="item.isShow&&item.is_complain==0" @click.stop="onShenshuClick(item)">{{$t('zhongpai.shenshu')}}</button>
              <button class="order-btn gray" @click.stop="onShenshu(item)" v-if="item.see_complain==1">{{$t('zhongpai.ckss')}}</button>
              <button v-if="item.status===4" @click.stop="onshopClick(item,2)" class="order-btn red" style="background:#FC0609;color:#fff;border:none">{{$t('zhongpai.qrsh')}}</button>
              <button v-if="item.status===5" @click.stop="$noMultipleClicks(onquerenClick(item))" class="order-btn red" style="background:#FC0609;color:#fff;border:none">{{$t('zhongpai.queren')}}</button>
            </view>
          </view>
          <!--order-bd end-->
        </view>
        <!--等待付款 order-li end-->
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
    </view>
    <!--竞拍订单 order-box end-->
    <!--取消订单弹出 start-->
    <uni-popup ref="QueryPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.order.tishi')}}</view>
          <view class="pop-c">{{$t('user.order.nqdyqxdqddm')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onQuery">{{$t('user.order.query')}}</button>
            <button class="pop-btn red" @click.stop="$noMultipleClicks(onOrderNotpayCancelOrder)">{{$t('user.order.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--取消订单弹出 start-->
    <!--删除订单弹出 start-->
    <uni-popup ref="DelPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.order.tishi')}}</view>
          <view class="pop-c">{{$t('user.order.nqdyscdqddm')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onDel">{{$t('user.order.query')}}</button>
            <button class="pop-btn red" @click.stop="$noMultipleClicks(onOrderDeleteOrder)">{{$t('user.order.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--删除订单弹出 start-->
    <!--确认收货弹出 start-->
    <uni-popup ref="shopPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <!-- <view class="pop-t">提示</view> -->
          <view class="pop-c">{{$t('user.order.qdysdsp')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onshopQuery">{{$t('user.order.query')}}</button>
            <button class="pop-btn red" v-if="num===1" @click.stop="$noMultipleClicks(onOrderReceiptOrder)">{{$t('user.order.btnsub')}}</button>
            <button class="pop-btn red" v-if="num===2" @click.stop="$noMultipleClicks(onAuctionorderConfirmOrder)">{{$t('user.order.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--确认收货弹出 start-->
    <!--支付密码弹出 start-->
    <uni-popup ref="pwdPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">
            <text>{{$t('user.order.qsrzfmm')}}</text>
            <view class="pay-close" @click="onPwdQuery">
              <image class="img" src="../../../static/images/close1.png"></image>
            </view>
          </view>
          <view class="pop-c">
            <view class="pay-input">
              <input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd" :placeholder="$t('user.order.qsrzfmm')" />
            </view>
          </view>
          <view class="pay-bot">
            <button class="pay-btn" @click="$noMultipleClicks(onPwdClick)">{{$t('user.order.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--支付密码弹出 end-->
    <!--支付方式弹出 start-->
    <uni-popup ref="popup1" type="bottom">
      <view class="mode-pop">
        <view class="mode-tit">
          <text>{{$t('user.order.xzzffs')}}</text>
          <view class="cancel" @click="toggle1Close">{{$t('user.order.query')}}</view>
        </view>
        <view v-for="item,k in orderPayList" :key="item.id" class="mode-li">
          <view class="label">
            {{item.title}} <block v-if="item.id==1">（{{$t('user.order.kyye')}}<text class="color-red">RM{{userCont.money}}</text>）</block>
          </view>
          <view class="li-fr" @click="onQuanClick(item,k)">
            <radio :checked="item.isShow?true:false" value="r1" />
          </view>
        </view>
        <view class="mode-bot">
          <button class="public-btn" @click="$noMultipleClicks(onPayClick)">{{$t('user.order.btnsub')}}</button>
        </view>
      </view>
    </uni-popup>
    <!--支付方式弹出 end-->
  </view>
</template>
<script>
import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
//公钥.
const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      userCont: '',// 用户信息
      Inv: 2,
      orderList: [],// 普通订单列表
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      order_no: '',// 订单号
      status: '',// 订单状态
      type: 1,// 1全部，2待付款，3待发货，4待收货，5待评价，6已完成
      pttypeList: [{ id: 1, name: this.$t('user.order.quanbu') }, { id: 2, name: this.$t('user.order.daifuk') }, { id: 3, name: this.$t('user.order.daifahuo') }, { id: 4, name: this.$t('user.order.dsh') }, { id: 5, name: this.$t('user.order.daipingjia') }, { id: 6, name: this.$t('user.order.yiwanc') }],// 普通头部切换数据
      pintuantypeList: [{ id: 1, name: this.$t('user.order.qbdd') }, { id: 2, name: this.$t('user.order.daifuk') }, { id: 3, name: this.$t('user.order.daipintUAN') }, { id: 4, name: this.$t('user.order.daifahuo') }, { id: 5, name: this.$t('user.order.dsh') }, { id: 6, name: this.$t('user.order.daipingjia') }, { id: 7, name: this.$t('user.order.yiwanc') }],// 拼团头部切换数据
      jingpaitypeList: [
        { id: 1, name: this.$t('user.order.qbdd') },
        // { id: 2, name: this.$t('user.order.daifuk') },
        { id: 2, name: this.$t('user.order.daifahuo') },
        { id: 3, name: this.$t('user.order.dsh') },
        { id: 4, name: this.$t('zhongpai.daiqueren') },
        { id: 5, name: this.$t('zhongpai.yiqueren') },
        { id: 6, name: this.$t('user.order.yiwanc') }],// 竞拍头部切换数据
      pay_pwd: '',// 支付密码
      major_no: '',// 主订单号
      order_no: '',// 小订单号
      total: '',// 支付总金额
      orderCont: '',
      orderPayList: [{ id: 1, title: this.$t('user.order.yuerzfu'), isShow: false }, { id: 2, title: this.$t('user.order.sfzf'), isShow: false },],
      isShopCont: false,// 商品详情显示中文还是英文
      timeCont: "",// 时间
      num: "",// 1普通和拼团 2中拍
      MineCont: {}
    }
  },
  watch: {
    total: {
      handler (e, m) {
        if (e < 10) {
          this.orderPayList = [{ id: 1, title: this.$t('auction.detail.yuerzhifu'), isShow: false }]
        } else {
          this.orderPayList = [{ id: 1, title: this.$t('auction.detail.yuerzhifu'), isShow: false }, { id: 2, title: this.$t('auction.detail.sfzfu'), isShow: false }]
        }
      }
    },
  },
  onLoad (e) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    if (e.type) {
      this.Inv = e.Inv
      this.type = e.type
    }
    this.$http.post(this.$apiObj.IndexSetting).then(res => {
      if (res.code == 1) {
        this.timeCont = res.data
      }
    })
    // 实名认证
    this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
      if (res.code == 1) {
        this.MineCont = res.data
      }
    })
  },
  onShow () {
    this.page = 1
    this.orderList = []
    this.onOrderOrderList()
    this.onMineInfo()
  },
  methods: {
    onMineInfo () {
      this.$http.post(this.$apiObj.MineInfo).then(res => {
        if (res.code == 1) {
          this.userCont = res.data
        }
      })
    },
    toggle1Close () {
      this.$refs.popup1.close()
    },
    onQuanClick (item, k) {
      for (let i in this.orderPayList) {
        this.orderPayList[i].isShow = false
      }
      item.isShow = true
      this.orderCont = k + 1
    },
    onPayClick () {
      if (!this.orderCont) return uni.showToast({ icon: 'none', title: this.$t('user.order.qxzzffs') })
      if (this.orderCont == 1) {
        // 余额支付弹框
        this.$refs.popup1.close()
        this.$refs.pwdPopup.open()
      } else if (this.orderCont == 2) {
        if (this.MineCont === null) return uni.showToast({ icon: 'none', title: this.$t('smrz') })
        if (this.MineCont.status == 0) return uni.showToast({ icon: 'none', title: this.$t('smrzshh') })
        if (this.MineCont.status == '-1') return uni.showToast({ icon: 'none', title: this.$t('smrzwtg') })
        this.$refs.popup1.close()
        // 3方支付
        this.$http.post(this.$apiObj.OrderMalaysiaPay, { order_no: this.order_no, money: this.total }).then(res => {
          if (res.code == 1) {
            const formStr = `<form action="${res.data.action_url}" method="POST" >
                        <input name="MerchantCode" value="${res.data.MerchantCode}">
                        <input name="TransNum" value="${res.data.TransNum}">
                        <input name="Currency" value="${res.data.Currency}">
                        <input name="Amount" value="${res.data.Amount}">
                        <input name="PaymentDesc" value="${res.data.PaymentDesc}">
                        <input name="FirstName" value="${res.data.FirstName}">
                        <input name="LastName" value="${res.data.LastName}">
                        <input name="EmailAddress" value="${res.data.EmailAddress}">
                        <input name="PhoneNum" value="${res.data.PhoneNum}">
                        <input name="Address" value="${res.data.Address}">
                        <input name="City" value="${res.data.City}">
                        <input name="State" value="${res.data.State}">
                        <input name="Country" value="${res.data.Country}">
                        <input name="Postcode" value="${res.data.Postcode}">
                        <input name="MerchantRemark" value="${res.data.MerchantRemark}">
                        <input name="Signature" value="${res.data.Signature}">
                      </form>`
            // #ifdef H5
            const div = document.createElement('div')
            div.innerHTML = formStr
            div.setAttribute('style', 'position: absolute; width: 0; height: 0; overflow: hidden;')
            const form = div.querySelector('form')
            document.body.appendChild(div)
            form.submit()
            document.body.removeChild(div)
            //  #endif
            // #ifdef APP-PLUS  
            uni.navigateTo({
              url: '/pages/mine/webview?url=' + formStr
            });
            //  #endif
          }
        })
      }
    },
    // 点击大的分类
    onInvClick (e) {
      this.type = 1
      this.Inv = e
      this.page = 1
      this.orderList = []
      this.onOrderOrderList()
    },
    // 点击小分类
    onNavClick (id) {
      this.type = id
      this.page = 1
      this.orderList = []
      this.onOrderOrderList()
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
    // 获取普通订单列表
    onOrderOrderList () {
      // 普通订单
      if (this.Inv == 0) {
        this.$http.post(this.$apiObj.OrderOrderList, { page: this.page, pagenum: this.pagenum, type: this.type }).then(res => {
          if (res.code == 1) {
            if (this.isShopCont) {
              res.data.data.map(item => {
                item.goods.map(items => {
                  items.goods_name = this.getCaption(items.goods_name, 1) ? this.getCaption(items.goods_name, 1) : items.goods_name
                  items.goods_attrs = this.getCaption(items.goods_attrs, 1) ? this.getCaption(items.goods_attrs, 1) : items.goods_attrs
                })
              })
            } else {
              res.data.data.map(item => {
                item.goods.map(items => {
                  items.goods_name = this.getCaption(items.goods_name, 0) ? this.getCaption(items.goods_name, 0) : items.goods_name
                  items.goods_attrs = this.getCaption(items.goods_attrs, 0) ? this.getCaption(items.goods_attrs, 0) : items.goods_attrs
                })
              })
            }
            this.totalPageNum = res.data.total
            this.orderList = this.page == 1 ? res.data.data : [...this.orderList, ...res.data.data]
          }
        })
      }
      // 拼团订单
      if (this.Inv == 1) {
        this.$http.post(this.$apiObj.OrderGroupOrderList, { page: this.page, pagenum: this.pagenum, type: this.type }).then(res => {
          if (res.code == 1) {
            if (this.isShopCont) {
              res.data.data.map(item => {
                item.goods.map(items => {
                  items.goods_name = this.getCaption(items.goods_name, 1) ? this.getCaption(items.goods_name, 1) : items.goods_name
                  items.goods_attrs = this.getCaption(items.goods_attrs, 1) ? this.getCaption(items.goods_attrs, 1) : items.goods_attrs
                })
              })
            } else {
              res.data.data.map(item => {
                item.goods.map(items => {
                  items.goods_name = this.getCaption(items.goods_name, 0) ? this.getCaption(items.goods_name, 0) : items.goods_name
                  items.goods_attrs = this.getCaption(items.goods_attrs, 0) ? this.getCaption(items.goods_attrs, 0) : items.goods_attrs
                })
              })
            }
            this.totalPageNum = res.data.total
            this.orderList = this.page == 1 ? res.data.data : [...this.orderList, ...res.data.data]
          }
        })
      }
      // 竞拍订单
      // if (this.Inv == 2) {
      //   this.$http.post(this.$apiObj.OrderAuctionOrderList, { page: this.page, pagenum: this.pagenum, type: this.type }).then(res => {
      //     if (res.code == 1) {
      //       if (this.isShopCont) {
      //         res.data.data.map(item => {
      //           item.goods.map(items => {
      //             items.goods_name = this.getCaption(items.goods_name, 1) ? this.getCaption(items.goods_name, 1) : items.goods_name
      //             items.goods_attrs = this.getCaption(items.goods_attrs, 1) ? this.getCaption(items.goods_attrs, 1) : items.goods_attrs
      //           })
      //         })
      //       } else {
      //         res.data.data.map(item => {
      //           item.goods.map(items => {
      //             items.goods_name = this.getCaption(items.goods_name, 0) ? this.getCaption(items.goods_name, 0) : items.goods_name
      //             items.goods_attrs = this.getCaption(items.goods_attrs, 0) ? this.getCaption(items.goods_attrs, 0) : items.goods_attrs
      //           })
      //         })
      //       }
      //       this.totalPageNum = res.data.total
      //       this.orderList = this.page == 1 ? res.data.data : [...this.orderList, ...res.data.data]
      //     }
      //   })
      // } 
      // 中拍订单列表
      if (this.Inv == 2) {
        this.onAuctionorderWinOrder()
      }
    },
    // 中拍订单列表
    onAuctionorderWinOrder () {
      this.$http.post(this.$apiObj.AuctionorderWinOrder, { page: this.page, pagenum: this.pagenum, type: this.type }).then(res => {
        if (res.code == 1) {
          res.data.data.map(item => {
            // 是否显示申诉按钮
            let isShow = false
            /**
             * status 2、待发货 3、待收货  4、待确认 5、已确认 6、已完成
             * shop_send_days     商家发货天数
             * auto_receipt_days  确认收货天数
             * user_end_days      结束前可申诉天数
             * shop_receive_days  商家填写签收信息天数
             */
            // 判断是否在3天内发货，是不显示，否则显示
            item.time = this.$filter.to_date_time(item.select_time)
            item.time1 = this.$filter.to_date_time(item.receive_time)
            console.log(this.timeCont.shop_send_days);
            if (item.status == 2) {
              let shop_send_days = item.select_time + this.timeCont.shop_send_days * 60
              console.log('11:', this.$filter.to_date_time(shop_send_days), this.$filter.to_date_time(item.select_time));
              if (shop_send_days * 1000 < new Date().getTime()) {
                isShow = true
              } else {
                isShow = false
              }
            }
            // 判断商家30天内填写图文签收信息
            if (item.status == 3) {
              let shop_send_days = item.send_time + this.timeCont.shop_receive_days * 60
              console.log(this.$filter.to_date_time(shop_send_days), this.$filter.to_date_time(item.send_time));
              if (shop_send_days * 1000 < new Date().getTime()) {
                isShow = true
              } else {
                isShow = false
              }
            }
            // 用户7天内确认不显示，超过显示
            // if (item.status == 4) {
            //   let shop_send_days = item.sign_time + this.timeCont.auto_receipt_days * 5
            //   if (shop_send_days * 1000 < new Date().getTime()) {
            //     isShow = true
            //   } else {
            //     isShow = false
            //   }
            // }
            // 用户显示申诉按钮14天内申诉，超过不显示
            if (item.status == 5) {
              let shop_send_days = item.receive_time + this.timeCont.user_end_days * 60
              if (shop_send_days * 1000 > new Date().getTime()) {
                isShow = true
              } else {
                isShow = false
              }
            }
            item.isShow = isShow
          })
          this.totalPageNum = res.data.total
          this.orderList = this.page == 1 ? res.data.data : [...this.orderList, ...res.data.data]
        }
      })
    },
    // 点击申诉
    onShenshuClick (item) {
      uni.navigateTo({
        url: './shenshu?id=' + item.id + '&conter=' + JSON.stringify(item)
      })
    },
    // 点击支付
    onorderPwdClick (item) {
      this.total = item.pay_price
      this.order_no = item.order_no
      this.$refs.popup1.open()
    },
    // 关闭支付密码
    onPwdQuery () {
      this.$refs.pwdPopup.close()
    },
    // 点击支付密码
    onPwdClick () {
      if (!this.pay_pwd) return uni.showToast({ title: this.$t('user.order.qsrmm'), icon: 'none' })
      const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))
      this.$http.post(this.$apiObj.OrderBalancePay, {
        major_no: this.major_no,// 购物车支付的主订单号
        order_no: this.order_no,// 小订单号
        money: this.total,// 支付总金额
        pay_pwd: pay_pwd,// rsa加密后的支付密码
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.zfcg'), icon: 'none' })
          this.page = 1
          this.orderList = []
          this.onOrderOrderList()
          this.onMineInfo()
          this.$refs.pwdPopup.close()
        }
      })
    },
    // 取消订单
    onQueryClick (item) {
      this.status = item.status
      this.order_no = item.order_no
      this.$refs.QueryPopup.open()
    },
    // 点击取消弹框
    onQuery () {
      this.$refs.QueryPopup.close()
    },
    // 取消订单接口
    onOrderNotpayCancelOrder () {
      if (this.status == 0) {
        // 未支付取消订单
        this.$http.post(this.$apiObj.OrderNotpayCancelOrder, { order_no: this.order_no }).then(res => {
          if (res.code == 1) {
            uni.showToast({ title: this.$t('user.order.qxddcg'), icon: 'none' })
            this.page = 1
            this.orderList = []
            this.onOrderOrderList()
            this.$refs.QueryPopup.close()
          }
        })
      } else if (this.status == 2) {
        // 待发货取消订单（涉及退款）
        this.$http.post(this.$apiObj.OrderPayCancelOrder, { order_no: this.order_no }).then(res => {
          if (res.code == 1) {
            uni.showToast({ title: this.$t('user.order.qxddcg'), icon: 'none' })
            this.page = 1
            this.orderList = []
            this.onOrderOrderList()
            this.$refs.QueryPopup.close()
          }
        })
      }
    },
    // 删除订单
    onDelClick (item) {
      this.status = item.status
      this.order_no = item.order_no
      this.$refs.DelPopup.open()
    },
    // 点击删除弹框
    onDel () {
      this.$refs.DelPopup.close()
    },
    // 删除订单接口
    onOrderDeleteOrder () {
      this.$http.post(this.$apiObj.OrderDeleteOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.scddcg'), icon: 'none' })
          this.page = 1
          this.orderList = []
          this.onOrderOrderList()
          this.$refs.DelPopup.close()
        }
      })
    },
    // 确认收货订单
    onshopClick (item, num) {
      console.log(num);
      this.num = num
      console.log((num == 2), item.id, item.order_no);
      console.log((num == 2) ? item.id : item.order_no);
      // this.status = (num == 2) ? item.id : item.order_no
      this.order_no = (num == 2) ? item.id : item.order_no
      this.$refs.shopPopup.open()
    },
    // 点击确认收货取消弹框
    onshopQuery () {
      this.$refs.shopPopup.close()
    },
    // 确认收货
    onOrderReceiptOrder () {
      this.$http.post(this.$apiObj.OrderReceiptOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.shcg'), icon: 'none' })
          this.page = 1
          this.orderList = []
          this.onOrderOrderList()
          this.$refs.shopPopup.close()
        }
      })
    },
    // 申请售后
    onSengqing (items, item) {
      if (this.Inv == 0) {
        uni.navigateTo({
          url: './sqsh?conter=' + JSON.stringify(items) + '&cent=' + JSON.stringify(item)
        })
      } else {
        uni.navigateTo({
          url: './ptzcpt?conter=' + JSON.stringify(items) + '&cent=' + JSON.stringify(item)
        })
      }
    },
    // 点击查看详情
    onShopClick (item) {
      uni.navigateTo({
        url: './detail?order_no=' + item.order_no
      })
    },
    // 竞拍详情
    onjingpai (item) {
      uni.navigateTo({
        url: './detail?order_no=' + item.order_no
      })
    },
    // 中拍详情
    onzhongpaiClick (item) {
      uni.navigateTo({
        url: './zhongpai?id=' + item.id
      })
    },
    // 查看申诉详情
    onShenshu (item) {
      uni.navigateTo({
        url: './shenshuCont?id=' + item.id + '&cont=' + JSON.stringify(item)
      })
    },
    // 中拍确认收货
    onAuctionorderConfirmOrder () {
      this.$http.post(this.$apiObj.AuctionorderConfirmOrder, { record_id: this.order_no }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.shcg'), icon: 'none' })
          this.page = 1
          this.orderList = []
          this.onAuctionorderWinOrder()
          this.$refs.shopPopup.close()
        }
      })
    },
    // 确认完成
    onquerenClick (item) {
      this.$http.post(this.$apiObj.AuctionorderAutoConfirm, { record_id: item.id }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('zhongpai.qrwc'), icon: 'none' })
          this.page = 1
          this.orderList = []
          this.onAuctionorderWinOrder()
        }
      })
    },
    // 待评价
    onPingClick (item) {
      uni.navigateTo({
        url: './evaluate?order_no=' + item.order_no
      })
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onOrderOrderList()
  }
}
</script>
<style >
page {
  background: #f9f9f9;
  /* #ifdef APP-PLUS */
  padding-top: 90rpx;
  /* #endif */
  /* #ifdef H5 */
  padding-top: 90rpx;
  /* #endif */
}
</style>
<style lang="less" scoped>
.order-page {
  //order-tab S
  .order-tab {
    //#ifdef APP-PLUS
    top: 0rpx;
    //#endif
    //#ifdef H5
    top: 88rpx;
    //#endif
    position: fixed;
    left: 0;
    z-index: 100;
    width: 100%;
    display: flex;
    background: #fff;
    padding: 0 30rpx;
    height: 90rpx;
    background: #ffffff;
    text-align: center;
    .li {
      width: 33.333%;
      font-size: 26rpx;
      position: relative;
      line-height: 90rpx;
    }
    .active {
      color: #fc0609;
    }
    .active::after {
      height: 2rpx;
      background: #fc0609;
      display: block;
      width: 100%;
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  //order-tab E
  //order-box S
  .order-box {
    margin: 0 30rpx;
    .order-nav {
      width: 100%;
      //#ifdef APP-PLUS
      // top: 90rpx;
      top: 0rpx;
      //#endif
      //#ifdef H5
      // top: 178rpx;
      top: 88rpx;
      //#endif
      position: fixed;
      left: 0;
      // width: 690rpx;
      background: #f9f9f9;
      z-index: 99;
      display: -webkit-box;
      // justify-content: space-between;
      padding: 30rpx 30rpx 40rpx 30rpx;
      overflow-x: scroll;
      .li {
        padding: 0 15rpx;
        font-size: 26rpx;
        position: relative;
        line-height: 1;
      }
      .active {
        font-weight: 550;
        color: #fc0609;
      }
      .active::after {
        width: 50rpx;
        height: 6rpx;
        background: #fc0609;
        border-radius: 3rpx;
        display: block;
        content: "";
        position: absolute;
        left: 50%;
        bottom: -28rpx;
        margin-left: -25rpx;
      }
    }
    //order-li S
    .order-li {
      background: #ffffff;
      border-radius: 20rpx;
      margin: 20rpx 0;
      .li-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        padding: 25rpx 30rpx;
        .hd-fl {
          display: inline-flex;
          align-items: center;
          font-size: 28rpx;
          flex: 1;
          width: calc(100% - 180rpx);
          margin-right: 20rpx;
          .icon {
            width: 26rpx;
            height: 26rpx;
            min-width: 26rpx;
            max-width: 26rpx;
            margin-right: 15rpx;
          }
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .status {
          color: #fc0609;
          white-space: nowrap;
        }
        .status.gray {
          color: #999;
          text-align: center;
        }
      }
      .order-mid {
        display: flex;
        padding: 30rpx;
        .mid-img {
          width: 130rpx;
          height: 130rpx;
          border-radius: 10rpx;
          overflow: hidden;
          margin-right: 20rpx;
          min-width: 130rpx;
          max-width: 130rpx;
        }
        .mid-txt {
          width: calc(100% - 150rpx);
          .h-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 36rpx;
            .ht {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .t {
              font-size: 26rpx;
              line-height: 36rpx;
            }
            .num {
              font-size: 24rpx;
              color: #999;
              white-space: nowrap;
              margin-left: 20rpx;
            }
          }

          .bd-last {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              font-size: 22rpx;
            }
          }

          .b-flex {
            margin-top: 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .s {
              font-size: 24rpx;
              color: #999;
            }
            .price {
              font-size: 22rpx;
              color: #fc0609;
            }
          }
        }
      }
      .order-price {
        color: #fc0609;
        font-size: 22rpx;
        padding: 0 30rpx 30rpx 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .shopCont {
          display: flex;
          align-items: center;
          .yhje {
            margin-left: 30rpx;
          }
        }
      }
      .order-bd {
        padding: 0 30rpx 30rpx 30rpx;
        display: flex;
        justify-content: flex-end;
        &.active {
          justify-content: space-between;
          align-items: center;
          .name {
            // width: 80rpx;
            padding: 0 20rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            background: #699dff;
            border-radius: 10rpx;
            font-size: 24rpx;
            color: #fff;
          }
        }
      }
      .order-btn {
        min-width: 140rpx;
        padding: 0 15rpx;
        height: 50rpx;
        border: 1px solid #fc0609;
        border-radius: 25rpx;
        margin: 0 0 0 20rpx;
        line-height: 50rpx;
        font-size: 22rpx;
        color: #fc0609;
      }
      .order-btn.gray {
        border-color: #999999;
        color: #999999;
        text-align: center;
      }
    }
    //order-li E
  }
  //order-box E
}
//支付密码弹出 S
.pay-close {
  width: 18rpx;
  height: 18rpx;
  position: absolute;
  right: 0;
  top: 10rpx;
}
.pay-input {
  height: 78rpx;
  background: #f5f5f5;
  border-radius: 10rpx;
  padding: 0 20rpx;
  .input {
    width: 100%;
    height: 78rpx;
    font-size: 28rpx;
    text-align: left;
  }
}
.pay-bot {
  .pay-btn {
    width: 260rpx;
    height: 80rpx;
    background: #fc0609;
    border-radius: 40rpx;
    display: block;
    margin: 0 auto;
    line-height: 80rpx;
    font-size: 32rpx;
    color: #fff;
  }
}
//支付密码弹出 E
//支付方式弹出 S
.mode-pop {
  background: #ffffff;
  border-radius: 20rpx 20rpx 0px 0px;
  .mode-tit {
    padding: 38rpx 30rpx;
    line-height: 1;
    font-size: 32rpx;
    font-weight: 550;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    text-align: center;
    .cancel {
      position: absolute;
      right: 30rpx;
      top: 38rpx;
      color: #999;
      font-size: 26rpx;
    }
  }
  .mode-li {
    padding: 36rpx 0;
    margin: 0 30rpx;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    .li-fr {
      display: flex;
      align-items: center;
      /deep/ uni-radio {
        margin-left: 20rpx;
      }
      /deep/ uni-radio .uni-radio-input.uni-radio-input-checked {
        background: #fc0609 !important;
        border-color: #fc0609 !important;
      }
    }
  }
  .mode-bot {
    padding: 50rpx 30rpx 50rpx 30rpx;
  }
}
//支付方式弹出 E
</style>
