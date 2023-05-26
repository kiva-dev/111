<template>
	<view class="auct-page">
		<!-- <Headers>
      <template v-slot:header>
        <view class="header-tab">
          <view class="li" :class="navId==1?'active':''" @click="onNavClick(1)">
            <text>{{$t('user.auctionM.wdjp')}}</text>
            <view class="icon">
              <image class="img" src="../../static/images/heade-act.png"></image>
            </view>
          </view>
          <view class="li" :class="navId==2?'active':''" @click="onNavClick(2)">
            <text>{{$t('user.auctionM.wdgz')}}</text>
            <view class="icon">
              <image class="img" src="../../static/images/heade-act.png"></image>
            </view>
          </view>
        </view>
      </template>
    </Headers> -->
		<!--auct-tab start-->
		<view class="auct-tab">

			<image class="return" src="../../static/images/mine/left.png" @click="tomine"></image>

			<view style="width: 8%;"></view>
			<view class="li" :class="type==1?'active':''" @click="onTypeClcik(1)">
				<text>{{$t('user.auctionM.jpz')}}</text>
				<view :class="type==1?'auct-tab-active':''"></view>
			</view>

			<block v-if="navId==1">
				<view class="li" :class="type==5?'active':''" @click="onTypeClcik(5)">
					<text>{{$t('user.auctionM.jpdd')}}</text>
					<view :class="type==5?'auct-tab-active':''"></view>
				</view>
			</block>

			<view class="li" :class="type==3?'active':''" @click="onTypeClcik(3)">
				<text>{{$t('user.auctionM.zpjl')}}</text>
				<view :class="type==3?'auct-tab-active':''"></view>
				<!-- <view class="dian" v-if="no_select=='1'&&navId==1"></view> -->
			</view>

			<block v-if="navId==1">
				<view class="li" :class="type==4?'active':''" @click="onTypeClcik(4)">
					<text>{{$t('user.auctionM.jpjl')}}</text>
					<view :class="type==4?'auct-tab-active':''"></view>
				</view>
			</block>

		</view>
		<!--auct-tab end-->
		<!--我的竞拍-竞拍中 auct-box start-->
		<view class="auct-box" v-if="type==1">
			<!--new-li start-->
			<block v-if="jingpaiList.length">
				<!-- <navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}`" open-type="navigate"
					hover-class="none" class="new-li" v-for="item,k in jingpaiList" :key="k">
					<view class="li-img">
						<image class="img" :src="item.image"></image>
						<view class="li-date" v-if="item.auction_type==2">
							<u-count-down :time="item.remain_time" format="HH:mm:ss"></u-count-down>
						</view>
						<view class="li-t">{{item.stage_num}}{{$t('user.auctionM.qi')}}</view>
					</view>
					<view class="li-txt">
						<view class="li-h">
							<view class="name">{{item.goods_name}}</view>
							<view class="s">{{item.shop_name}}{{$t('user.auctionM.tigong')}}</view>
						</view>
						<view class="t">{{item.goods_mark}}</view>
						<view class="li-tags">
							<block v-for="(items,index) in item.tags" :key="{index}">
								<view v-if="index%2==0" class="tag">{{items.name}}</view>
								<view v-else class="tag red">{{items.name}}</view>
							</block>
						</view>
						<view class="li-price">
							<view class="price-fl">
								<text class="red">{{$t('user.auctionM.qpj')}} RM{{item.auction_price}}</text>
								<text class="gray">{{$t('user.auctionM.scj')}} RM{{item.price}}</text>
							</view>
							<button class="price-btn">{{$t('user.auctionM.qiangpai')}}</button>
						</view>
						<view class="li-b">
							<text v-if="item.finish_rate==100">{{$t('auction.yiwancheng')}}</text>
							<text v-else>{{$t('auction.jinxingzhong')}}</text>
							<view class="li-pro">
								<view class="pro" :style="'width:'+item.finish_rate*100+'%;'"></view>
							</view>
							<text>{{(item.finish_rate*100).toFixed(0)}}%</text>
						</view>
					</view>
				</navigator> -->
				<view class="jping" v-for="(item,i) in jingpaiList" :key="i" @click="toDetail(item.auction_goods_id)">
					<view class="jping-left">
						<image :src="item.image"></image>
						<view class="jping-left-q">{{item.stage_num}}{{$t('auction.qi')}}</view>
					</view>

					<view class="jping-right">
						<view style="height: 20rpx;"></view>
						<view class="jping-header">
							<view class="jping-name">{{item.goods_name}}</view>
							<view class="jping-prouct-name">{{item.shop_name}}</view>
						</view>

						<view class="jping-tags">
							<block v-for="(data,index) in item.tags" :key="data.tag_id">
								<view v-if="(index+1)%3==1" class="lan">{{data.name}}</view>
								<view v-else-if="(index+1)%3==2" class="chen">{{data.name}}</view>
								<view v-else="(index+1)%3==0" class="red">{{data.name}}</view>
							</block>
						</view>
						<view class="jping-price">
							<view class="jping-price-left">
								<view class="jping-price-new">RM{{item.auction_price}}</view>
								<view class="jping-price-old">RM{{item.price}}</view>
							</view>
							<view class="jping-price-btn">{{$t('auction.qiangpai')}}</view>
						</view>

						<view class="jping-jd">
							<!-- <view class="jping-jd-name">{{$t('auction.jpjd')}}</view> -->
							<view class="jping-jd-data">
								<progress class="progress" :percent="item.finish_rate*100" stroke-width="5"
									activeColor="#FF4E2F" backgroundColor="#EBEBEB" />
							</view>
							<view class="jping-jd-bfb">{{item.finish_rate*100}}%</view>
						</view>
					</view>

				</view>

			</block>
			<view v-else class="zanwusju">
				<image src="/static/images/zanwusju.png" />
				<view class="title">~{{$t('home.zanwushuju')}}~</view>
			</view>
			<!--new-li end-->
		</view>
		<!--我的竞拍-竞拍中 auct-box end-->

		<!--我的竞拍-竞拍订单 auct-box start-->
		<view class="auct-box" v-if="type==5">
			<!--luck-ul start-->
			<view class="order-ul" v-if="jingpaiorderList.length">
				<!-- <navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}`" open-type="navigate"
					hover-class="none" v-for="item in jingpaiorderList" :key="item.id" class="order-li">
					<view class="li-hd">
						<view class="hd-fl">
							<view class="icon">
								<image class="img" src="../../static/images/index/dianpu.png"></image>
							</view>
							<view class="name">{{item.shop_name}}</view>
						</view>
					</view>
					
					<view class="order-mid">
						<view class="mid-img">
							<image class="img" :src="item.image"></image>
						</view>
						<view class="mid-txt">
							<view class="h-flex">
								<view class="t">{{item.goods_name}}</view>
								<view class="num">*{{item.total_num}}</view>
							</view>
							<view class="b-flex">
								<view class="s"> </view>
								<view class="price">
									RM
									<text>{{item.pay_price}}</text>
								</view>
							</view>
						</view>
					</view>
				</navigator> -->

				<view class="order-item" v-for="item in jingpaiorderList" :key="item.id" @click="toDetail(item.auction_goods_id)">
					<view class="order-item-name">{{item.shop_name}}</view>
					<view class="order-item-info">
						<view class="order-item-info-left">
							<image :src="item.image"></image>
							<view class="order-item-info-q">{{item.stage_num}}{{$t('auction.qi')}}</view>
						</view>
						<view class="order-item-info-right">
							<view class="order-item-info-tit">{{item.goods_name}}</view>
							<view class="order-item-info-price">
								<view class="order-item-info-old">RM4566.00</view>
								<view class="order-item-info-new">RM{{item.pay_price}}</view>
							</view>
							<view class="order-item-info-timeandnum">
								<view class="order-item-info-time">2023-02-15 18:25:50</view>
								<view class="order-item-info-num">*{{item.total_num}}</view>
							</view>
						</view>
					</view>

					<!-- <view class="order-item-status">
						<view class="order-item-status-name">竞拍中</view>
					</view> -->
				</view>

			</view>
			<view v-else class="zanwusju">
				<image src="/static/images/zanwusju.png" />
				<view class="title">~{{$t('home.zanwushuju')}}~</view>
			</view>
			<!--luck-ul end-->
		</view>
		<!--我的竞拍-竞拍订单 auct-box end-->



		<!--我的竞拍-中拍记录 auct-box start-->
		<view class="auct-box" v-if="type==3">
			<!--luck-ul start-->
			<block v-if="navId==1">
				<view class="luck-zpjl" v-if="LuckyList.length">
					<!-- <navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}`" open-type="navigate"
						hover-class="none" class="luck-li" v-for="item,k in LuckyList" :key="k">
						<view class="cent">
							<view class="li-img">
								<image class="img" :src="item.avatar"></image>
							</view>
							<view class="li-txt">
								<view class="li-h">
									<view class="h-fl">
										<text class="name">{{item.nickname}}</text>
										<view class="vip">LV{{item.level}}</view>
									</view>
									<view class="h-c">{{item.stage_num}}{{$t('user.auctionM.qi')}}</view>
								</view>
								<view class="li-c">
									{{$t('user.auctionM.zaiyu')}}<text class="color-purse">{{item.shop_name}}</text>
									{{$t('user.auctionM.tgdjphd')}}<text
										class="color-red">RM{{item.pay_price}}</text>{{$t('user.auctionM.djzxypzjz')}}<text
										class="color-red">RM{{item.price}}</text>{{$t('user.auctionM.de')}}{{item.goods_name}}
								</view>
								<view class="lis">
									<view class="li-date">{{$filter.to_date_time(item.update_time)}}</view>

									select_way 0未选择 1、折现 2、实物
									status 2、待发货 3、待收货 4、待确认 5、已确认 6、已完成

									<view class="name active" v-if="item.select_way==0"
										@click.stop="onlingjiangClick(item)">{{$t('zhongpai.lingjiangjiang')}}</view>
									<view class="name" style="color:#999" v-else-if="item.status==6">
										{{$t('zhongpai.ylj')}}
									</view>
									<view class="name" v-else>{{$t('zhongpai.lingjiangjiang')}}</view>
								</view>
							</view>
						</view>
						<view class="bottom">
							<view></view>
							<view class="right">
								<view class="lis" @click.stop="onAuctionFocusLucky(item.id)">
									<image v-if="item.is_zan==1" src="/static/images/zan-act.png" mode="" />
									<image v-else src="/static/images/zan.png" mode="" />{{item.zan_num}}
								</view>
								<view class="lis" @click.stop="onFengxiangClick(item)">
									<image src="/static/images/auc3.png" mode="" />{{item.share_num}}
								</view>
							</view>
						</view>
					</navigator> -->

					<image src="../../static/images/auction/gxzj.png" class="luck-zjtp"></image>

					<view class="luck-zpjl-item" v-for="(item,index) in LuckyList" :key="item.id">
						<image :src="item.image" class="luck-zpjl-item-img"></image>
						<view class="luck-zpjl-item-name">{{item.goods_name}}</view>

						<!-- 						<view class="luck-zpjl-item-state" v-show="item.select_way==0">{{$t('user.auctionM.dailingjian')}}</view> -->

						<view class="luck-zpjl-item-qiangpaijia">{{$t('auctionM.qpj')}}：RM{{item.auction_price}}</view>

						<!-- <view class="luck-zpjl-item-num">*5</view> -->

						<view class="luck-zpjl-item-price">{{$t('user.auctionM.shifukuang')}}：RM{{item.auction_price}}
						</view>

						<view class="luck-zpjl-item-btn" v-if="item.select_way==0" @click.stop="onlingjiangClick(item)">
							{{$t('zhongpai.lingjiangjiang')}}</view>
						<view class="luck-zpjl-item-btn" style="background: #999;" v-else-if="item.status==6">
							{{$t('zhongpai.ylj')}}
						</view>
						<view class="luck-zpjl-item-btn" v-else>{{$t('zhongpai.lingjiangjiang')}}</view>
					</view>

				</view>

				<view v-else class="zanwusju">
					<image src="/static/images/zanwusju.png" />
					<view class="title">~{{$t('home.zanwushuju')}}~</view>
				</view>
			</block>
			<block v-if="navId==2">
				<view class="luck-ul" v-if="LuckyList.length">
					<navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}`" open-type="navigate"
						hover-class="none" class="luck-li" v-for="item,k in LuckyList" :key="k">
						<view class="cent">
							<view class="li-img">
								<image class="img" :src="item.avatar"></image>
							</view>
							<view class="li-txt">
								<view class="li-h">
									<view class="h-fl">
										<text class="name">{{item.nickname}}</text>
										<view class="vip">LV{{item.level}}</view>
									</view>
									<view class="h-c">{{item.stage_num}}{{$t('user.auctionM.qi')}}</view>
								</view>
								<view class="li-c">
									{{$t('user.auctionM.zaiyu')}}<text class="color-purse">{{item.shop_name}}</text>
									{{$t('user.auctionM.tgdjphd')}}<text
										class="color-red">RM{{item.pay_price}}</text>{{$t('user.auctionM.djzxypzjz')}}<text
										class="color-red">RM{{item.price}}</text>{{$t('user.auctionM.de')}}{{item.goods_name}}
								</view>
								<view class="lis">
									<view class="li-date">{{$filter.to_date_time(item.update_time)}}</view>
									<!-- 
                  select_way 0未选择 1、折现 2、实物
                  status 2、待发货 3、待收货  4、待确认 5、已确认 6、已完成
                 -->
									<!-- <view class="name active" v-if="item.select_way==0" @click.stop="onlingjiangClick(item)">{{$t('zhongpai.lingjiangjiang')}}</view>
                  <view class="name" style="color:#999" v-else-if="item.status==6">{{$t('zhongpai.ylj')}}</view>
                  <view class="name" v-else>{{$t('zhongpai.lingjiangjiang')}}</view> -->
								</view>
							</view>
						</view>
						<view class="bottom">
							<view></view>
							<view class="right">
								<view class="lis" @click.stop="onAuctionFocusLucky(item.id)">
									<image v-if="item.is_zan==1" src="/static/images/zan-act.png" mode="" />
									<image v-else src="/static/images/zan.png" mode="" />{{item.zan_num}}
								</view>
								<view class="lis" @click.stop="onFengxiangClick(item)">
									<image src="/static/images/auc3.png" mode="" />{{item.share_num}}
								</view>
							</view>
						</view>
					</navigator>
				</view>
				<view v-else class="zanwusju">
					<image src="/static/images/zanwusju.png" />
					<view class="title">~{{$t('home.zanwushuju')}}~</view>
				</view>
			</block>
			<!--luck-ul end-->
		</view>
		<!--我的竞拍-中拍记录 auct-box end-->


		<!--我的竞拍-历史竞拍 auct-box start-->
		<view class="auct-box" v-if="type==2">
			<!--new-li start-->
			<block v-if="jingpaiList.length">
				<navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}`" open-type="navigate"
					hover-class="none" class="new-li" v-for="item,k in jingpaiList" :key="k">
					<view class="li-img">
						<image class="img" :src="item.image"></image>
						<view class="li-t">{{item.stage_num}}{{$t('user.auctionM.qi')}}</view>
					</view>
					<view class="li-txt">
						<view class="li-h">
							<view class="name">{{item.goods_name}}</view>
							<view class="s">{{item.shop_name}}{{$t('user.auctionM.tigong')}}</view>
						</view>
						<view class="li-price">
							<view class="price-fl">
								<text class="red">{{$t('user.auctionM.qpj')}} RM{{item.auction_price}}</text>
								<text class="gray">{{$t('user.auctionM.scj')}} RM{{item.price}}</text>
							</view>
						</view>
						<view class="li-time">{{$t('user.auctionM.lishi')}}：{{item.continue_time}}</view>
						<view class="li-b">{{$filter.to_date_time(item.end_time)}}
							<block v-if="item.check_status==1">{{$t('user.auctionM.shtg')}}</block>
							<block v-if="item.check_status==2">{{$t('user.auctionM.jpzhong')}}</block>
							<block v-if="item.check_status==3">{{$t('user.auctionM.fp')}}</block>
							<block v-if="item.check_status==4">{{$t('user.auctionM.yiliupai')}}</block>
							<block v-if="item.check_status==-1">{{$t('user.auctionM.shhwtg')}}</block>
						</view>
					</view>
				</navigator>

			</block>
			<view v-else class="zanwusju">
				<image src="/static/images/zanwusju.png" />
				<view class="title">~{{$t('home.zanwushuju')}}~</view>
			</view>
			<!--new-li end-->
		</view>
		<!--我的竞拍-历史竞拍 end-->

		<!--我的竞拍记录 auct-box start-->
		<view class="auct-box" v-if="type==4">
			<!--luck-ul start-->
			<block v-if="recordList.length">
				<!-- <navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}`" open-type="navigate"
					hover-class="none" class="new-li" v-for="item,k in recordList" :key="k">
					<view class="li-img">
						<image class="img" :src="item.image"></image>
						<view class="li-t">{{item.stage_num}}{{$t('user.auctionM.qi')}}</view>
					</view>
					<view class="li-txt">
						<view class="li-h">
							<view class="name">{{item.goods_name}}</view>
							<view class="s">{{item.shop_name}}{{$t('user.auctionM.tigong')}}</view>
						</view>
						<view class="li-price" style="margin-top:25rpx;">
							<view class="price-fl"
								style="width:460rpx;display: flex;justify-content: space-between;align-items: center;">
								<text class="gray">{{$t('user.auctionM.scj')}} RM{{item.price}}</text>
								<text class="red" style="margin-right:0;">{{$t('user.auctionM.qpj')}}
									RM{{item.auction_price}}</text>
							</view>
						</view>
						<view class="li-times">{{$t('user.auctionM.xdsj')}}：{{$filter.to_date_time(item.pay_time)}}
						</view>
						<view class="li-more">
							"win": "2", //0待抽奖，1中奖，2未中奖，3流拍待退款，4未达到封盘条件，部分封盘后多出的记录，待退款，5已退回
							<view class="zt" style="color:#ff9c00;" v-if="item.win==0">
								{{$t('user.auctionM.zt')}}：{{$t('user.auctionM.dcj')}}
							</view>
							<view class="zt" style="color:#f20505;" v-if="item.win==1">
								{{$t('user.auctionM.zt')}}：{{$t('user.auctionM.zhongjiang')}}
							</view>
							<view class="zt" style="color:#6d6d6d;" v-if="item.win==2">
								{{$t('user.auctionM.zt')}}：{{$t('user.auctionM.wzj')}}
							</view>
							<view class="zt" style="color:#cf0ecf;" v-if="item.win==3">
								{{$t('user.auctionM.zt')}}：{{$t('user.auctionM.lpdtk')}}
							</view>
							<view class="zt" style="color:#acb000;" v-if="item.win==4">
								{{$t('user.auctionM.zt')}}：{{$t('user.auctionM.wddfpdtk')}}
							</view>
							<view class="zt" style="color:#0000ff;" v-if="item.win==5">
								{{$t('user.auctionM.zt')}}：{{$t('user.auctionM.yitueihuei')}}
							</view>
							<view class="ckxq" @click.stop="onMore(item.auction_goods_id)">{{$t('user.auctionM.ckxq')}}
							</view>
						</view>
					</view>
				</navigator> -->

				<view class="order-item" v-for="item in recordList" :key="item.id" @click="toDetail(item.auction_goods_id)">
					<view class="order-item-name">{{item.shop_name}}</view>
					<view class="order-item-info">
						<view class="order-item-info-left">
							<image :src="item.image"></image>
							<view class="order-item-info-q">{{item.stage_num}}{{$t('auction.qi')}}</view>
						</view>
						<view class="order-item-info-right">
							<view class="order-item-info-tit">{{item.goods_name}}</view>
							<view class="order-item-info-price">
								<view class="order-item-info-old">RM{{item.price}}</view>
								<view class="order-item-info-new">RM{{item.pay_price}}</view>
							</view>
							<view class="order-item-info-timeandnum">
								<view class="order-item-info-time">{{$filter.to_date_time(item.pay_time)}}</view>
								<!-- <view class="order-item-info-num">*{{item.total_num}}</view> -->
							</view>
						</view>
					</view>

					<!-- <view class="order-item-status">
						<view class="order-item-status-name">竞拍中</view>
					</view> -->

				</view>

			</block>
			<view v-else class="zanwusju">
				<image src="/static/images/zanwusju.png" />
				<view class="title">~{{$t('home.zanwushuju')}}~</view>
			</view>
			<!--luck-ul end-->
		</view>
		<!--我的竞拍-中拍记录 auct-box end-->



		<!--点击领奖弹框显示 start-->
		<uni-popup ref="lingjiangPopup" type="center">
			<view class="lingjiangCont">
				<view class="list" @click="onZhexianClick">
					<image src="../../static/images/new/zhexian.png" mode="scaleToFill" />{{$t('zhongpai.zhexia')}}
				</view>
				<view class="list" @click="onLingjiang">
					<image src="../../static/images/new/jp.png" mode="scaleToFill" />{{$t('zhongpai.lnighuo')}}
				</view>
			</view>
		</uni-popup>
		<!--点击领奖弹框显示 end-->
		<!--提示显示 start-->
		<uni-popup ref="tishiPopup" type="center">
			<view class="tishingCont">
				<view class="title">{{$t('zhongpai.tis')}}</view>
				<view class="name">{{$t('zhongpai.dqspkzx')}}<text>RM{{user_money}},</text>{{$t('zhongpai.nqdzxm')}}
				</view>
				<view class="cont">
					<view class="query" @click="onQuery">{{$t('zhongpai.query')}}</view>
					<view class="btnsub" @click="onAuctionorderGoodTocash">{{$t('zhongpai.qr')}}</view>
				</view>
			</view>
		</uni-popup>
		<!--提示显示 end-->
		<uni-popup ref="weikaisPopup" type="center">
			<view class="tishingCont">
				<view class="title">{{$t('zhongpai.tis')}}</view>
				<view class="name">{{$t('jphdwjs')}}</view>
				<view class="cont">
					<view class="query" @click="onQuerys">{{$t('zhongpai.query')}}</view>
					<view class="btnsub" @click="onQuerys">{{$t('zhongpai.qr')}}</view>
				</view>
			</view>
		</uni-popup>
		<!--分享弹出 start-->
		<view class="fenxiang" v-if="onfenxingShow">
			<view class="share-pop">
				<view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
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
            <view class="t">Google</view>
          </view> -->
					<view @click="onfacebook" class="share-li">
						<view class="icon">
							<image class="img" src="../../static/images/share23.png"></image>
						</view>
						<view class="t" style="color:#000">Facebook</view>
					</view>
					<!-- <view class="share-li">
            <view class="icon">
              <image class="img" src="../../static/images/share24.png"></image>
            </view>
            <view class="t">微信</view>
          </view> -->
					<view class="share-li" @click="onUrlClick">
						<view class="icon">
							<image class="img" src="../../static/images/share25.png"></image>
						</view>
						<view class="t">{{$t('auction.detail.fuzhilianjie')}}</view>
					</view>
				</view>
				<view class="share-bot">
					<button class="share-btn" @click="toggle2Close">{{$t('auction.detail.query')}}</button>
				</view>
			</view>
		</view>
		<!--分享弹出 end-->

		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import Headers from '@/components/navHeaders'
	export default {
		components: {
			Headers
		},
		data() {
			return {
				onfenxingShow: false,
				no_select: 0, // 是否有
				navId: 1, // 大分类
				type: 3, // 小类别 1:竞拍中 3：中拍记录 4：竞拍记录 5：竞拍订单
				page: 1,
				pagenum: 10,
				totalPageNum: 0,
				jingpaiList: [], // 竞拍中
				LuckyList: [], // 中拍记录
				recordList: [], // 竞拍记录
				isShopCont: false, // 中文还是英文
				orderList: [],
				jingpaiorderList: [],
				id: '', // 领奖id
				user_money: '', // 折现金额
				shopCont: '', // 商品详情
				qrUrl: ""
			}
		},
		onLoad(e) {
			if (e.num) this.type = e.num
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			if (this.navId == 1) {
				// 我的竞拍
				this.onMineAttendAuction()
				// 中拍记录
				setTimeout(() => {
					this.onMineWinAuction()
				}, 500);
				// 竞拍记录
				this.onMineRecordList()

				this.AuctionorderMineOrder()
			} else {
				// 我的竞拍
				this.onMineFocusAuction()
				// 中拍记录
				this.onMineFocusWinAuction()
			}
		},
		methods: {
			toDetail(id){
				uni.navigateTo({
					url:'/pages/auction/detail?id='+id
				})
			},
			tomine() {
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			},
			onFengxiangClick(item) {
				// this.qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + item.auction_goods_id// 生成二维码的链接
				this.qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/auction?tab=2' // 生成二维码的链接
				this.auction_goods_id = item.id
				this.onfenxingShow = true
			},
			onfacebook() {
				let url = `https://www.facebook.com/sharer/sharer.php?u=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
			ontweet() {
				let url = `https://twitter.com/intent/tweet?url=${this.qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
				this.onAuctionorderShare()
			},
			// 点击复制链接
			onUrlClick() {
				this.onAuctionorderShare()
				// this.$emit('copy', this.shopCont.tui_express_no);
				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = this.qrUrl; //要复制的订单编号
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				uni.showToast({
					icon: 'none',
					title: this.$t('user.order.detail.fzcg')
				})
				oInput.remove()
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: this.qrUrl,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			},
			// 取消分享
			toggle2Close() {
				this.onfenxingShow = false
			},
			// 分享--加分享次数
			onAuctionorderShare() {
				this.$http.post(this.$apiObj.shareLucky, {
					lucky_id: this.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						this.page = 1
						this.LuckyList = []
						this.onMineWinAuction()
					}
				})
			},
			onMore(id) {
				uni.navigateTo({
					url: '../auction/detail?id=' + id
				})
			},
			// 点击大分类
			onNavClick(e) {
				this.navId = e
				this.type = 1
				this.page = 1
				this.jingpaiList = [] // 竞拍中
				this.LuckyList = [] // 中拍记录
				if (this.navId == 1) {
					// 我的竞拍
					this.onMineAttendAuction()
					// 中拍记录
					this.onMineWinAuction()
					// 竞拍记录
					this.onMineRecordList()
					this.AuctionorderMineOrder()
				} else {
					// 我的竞拍
					this.onMineFocusAuction()
					// 中拍记录
					this.onMineFocusWinAuction()
				}
			},
			// 点击小分类
			onTypeClcik(e) {
				this.type = e
				this.page = 1
				this.jingpaiList = [] // 竞拍中
				this.LuckyList = [] // 中拍记录
				if (this.navId == 1) {
					// 我的竞拍
					this.onMineAttendAuction()
					// 中拍记录
					this.onMineWinAuction()
					// 竞拍记录
					this.onMineRecordList()
					this.AuctionorderMineOrder()
				} else {
					// 我的竞拍
					this.onMineFocusAuction()
					// 中拍记录
					this.onMineFocusWinAuction()
				}
			},
			// 点击最新竞拍筛选
			onZxjpClick() {
				this.page = 1
				this.jingpaiList = []
				this.onMineAttendAuction()
			},
			getCaption(str, state) {
				if (state == 1) {
					var indexs = str.indexOf("|")
					str = str.substring(indexs + 1, str.length);
				} else {
					var index = str.indexOf("|")
					str = str.substring(0, index);
				}
				return str;
			},
			// 我的竞拍
			onMineAttendAuction() {
				this.$http.post(this.$apiObj.MineAttendAuction, {
					page: this.page,
					pagenum: this.pagenum,
					type: this.type
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.remain_time = item.remain_time * 1000
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.totalPageNum = res.data.total
						this.jingpaiList = this.page == 1 ? res.data.data : [...this.jingpaiList, ...res.data.data]
						this.jingpaiList.forEach(item => {
							item.tags.forEach(data => {
								let arr = data.name.split('|')
								if (!this.isShopCont) data.name = arr[0]
								else data.name = arr[1]
							})
						})
					}
				})
			},
			// 竞拍订单
			AuctionorderMineOrder() {
				this.$http.post(this.$apiObj.AuctionorderMineOrder, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						this.totalPageNum = res.data.total
						this.jingpaiorderList = this.page == 1 ? res.data.data : [...this.jingpaiorderList, ...res
							.data.data
						]
					}
				})
			},
			// 竞拍记录
			onMineRecordList() {
				this.$http.post(this.$apiObj.MineRecordList, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.remain_time = item.remain_time * 1000
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.totalPageNum = res.data.total
						this.recordList = this.page == 1 ? res.data.data : [...this.recordList, ...res.data.data]
					}
				})
			},
			// 中拍记录
			onMineWinAuction() {
				this.$http.post(this.$apiObj.MineWinAuction, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						this.no_select = res.data.no_select
						res.data.list.data.map(item => {
							console.log(item.end_time);
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.totalPageNum = res.data.total
						this.LuckyList = this.page == 1 ? res.data.list.data : [...this.LuckyList, ...res.data.list
							.data
						]
					}
				})
			},
			// 我的关注竞拍
			onMineFocusAuction() {
				this.$http.post(this.$apiObj.MineFocusAuction, {
					page: this.page,
					pagenum: this.pagenum,
					type: this.type
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 1) ? this.getCaption(
										items.name, 1) : items.name
								})
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 0) ? this.getCaption(
										items.name, 0) : items.name
								})
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.remain_time = item.remain_time * 1000
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.totalPageNum = res.data.total
						this.jingpaiList = this.page == 1 ? res.data.data : [...this.jingpaiList, ...res.data.data]
					}
				})
			},
			// 我的关注中拍记录
			onMineFocusWinAuction() {
				this.$http.post(this.$apiObj.MineFocusWinAuction, {
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						res.data.data.map(item => {
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.totalPageNum = res.data.total
						this.LuckyList = this.page == 1 ? res.data.data : [...this.LuckyList, ...res.data.data]
					}
				})
			},
			// 点赞|取消点赞幸运之星记录
			onAuctionFocusLucky(id) {
				this.$http.post(this.$apiObj.AuctionFocusLucky, {
					lucky_id: id
				}).then(res => {
					if (res.code == 1) {
						this.page = 1
						this.LuckyList = []
						this.onMineWinAuction()
					}
				})
			},
			// 倒计时
			daojishi(mss) {
				let s = mss % 60;
				mss = parseInt(mss / 60);
				let m = mss % 60;
				mss = parseInt(mss / 60);
				let h = mss % 24;
				mss = parseInt(mss / 24);
				let d = mss;
				return d + this.$t('user.auctionM.day') + h + this.$t('user.auctionM.xiaoshi') + m + this.$t(
					'user.auctionM.fen') + s + this.$t('user.auctionM.miao')
			},
			onQuerys() {
				this.$refs.weikaisPopup.close()
			},
			// 点击领奖
			onlingjiangClick(item) {
				if (item.can_select == 0) return this.$refs.weikaisPopup.open()
				this.id = item.id
				this.user_money = item.user_money
				this.shopCont = item
				this.$refs.lingjiangPopup.open()
			},
			// 点击折现
			onZhexianClick() {
				this.$refs.lingjiangPopup.close()
				this.$refs.tishiPopup.open()
			},
			// 点击折现取消按钮
			onQuery() {
				this.$refs.tishiPopup.close()
			},
			// 折现提交
			onAuctionorderGoodTocash() {
				this.$http.post(this.$apiObj.AuctionorderGoodTocash, {
					record_id: this.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('zhongpai.zxcg'),
							icon: 'none'
						})
						this.$refs.tishiPopup.close()
						this.page = 1
						this.LuckyList = []
						this.onMineWinAuction()
					}
				})
			},
			// 点击弹框领货
			onLingjiang() {
				this.$refs.lingjiangPopup.close()
				uni.navigateTo({
					url: './orderpay?id=' + this.id + '&conter=' + JSON.stringify(this.shopCont)
				})
			}
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			if (this.navId == 1) {
				// console.log('this.type:', this.type == 4, this.totalPageNum <= this.page * this.pagenum);
				// console.log('this.page:', this.page);
				// console.log('totalPageNum:', this.totalPageNum, this.page * this.pagenum);
				// 竞拍
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				// 我的竞拍
				if (this.type == 1 || this.type == 2) {
					this.onMineAttendAuction()
				}
				// 中拍记录
				if (this.type == 3) {
					this.onMineWinAuction()
				}
				// 竞拍记录
				if (this.type == 4) {
					this.onMineRecordList()
				}
				// 竞拍记录
				if (this.type == 5) {
					this.AuctionorderMineOrder()
				}
			} else if (this.navId == 2) {
				// 关注
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				// 我的竞拍
				if (this.type == 1 || this.type == 2) {
					this.onMineFocusAuction()
				}
				// 中拍记录
				if (this.type == 3) {
					this.onMineFocusWinAuction()
				}
			}
		}
	}
</script>

<style>
	page {
		background: rgb(235, 235, 235);
	}
</style>
<style lang="less" scoped>
	.auct-page {
		.header-tab {
			// padding: 30rpx;
			display: flex;
			justify-content: center;

			.li {
				font-size: 32rpx;
				position: relative;
				color: #fff;

				&:nth-child(2) {
					margin-left: 85rpx;
				}

				.icon {
					width: 41rpx;
					height: 8rpx;
					position: absolute;
					left: 50%;
					bottom: -20rpx;
					margin-left: -20rpx;
					display: none;
				}
			}

			.active {

				// color: #f52c1f;
				// font-weight: 550;
				.icon {
					display: block;
				}
			}
		}

		.auct-tab {
			position: relative;
			width: 750rpx;
			padding-top: 80rpx;
			height: 92rpx;
			background: #fff;
			// padding: 30rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 50rpx;

			.return {
				position: absolute;
				left: 10rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			.li {
				width: 23%;
				font-size: 28rpx;
				position: relative;
				text-align: center;
				font-weight: 550;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.icon {
					width: 41rpx;
					height: 8rpx;
					position: absolute;
					left: 50%;
					bottom: -20rpx;
					margin-left: -20rpx;
					display: none;
				}

				.dian {
					position: absolute;
					width: 20rpx;
					height: 20rpx;
					background: red;
					border-radius: 50%;
					top: -4px;
					right: -4px;
				}
			}

			.auct-tab-active {
				width: 120rpx;
				height: 6rpx;
				background: rgb(255, 78, 47);
				margin: 26rpx auto 0 auto;
			}

			.active {
				color: #f52c1f;
				font-weight: 550;

				// .icon {
				// 	display: block;
				// 	width: 120rpx;
				// 	border: 1rpx solid rgb(255, 78, 47);
				// }
			}
		}

		.auct-box {

			// new-li S
			.new-li {
				background: #fff;
				padding: 30rpx;
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
					background: rgb(255, 78, 47);
					background: linear-gradient(-45deg, rgb(255, 78, 47) 0%, #ff4e50 100%);
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

						// display: flex;
						// align-items: center;
						// justify-content: space-between;
						.name {
							font-size: 28rpx;
							font-weight: 550;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// width: 93%;
						}

						.s {
							color: #999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// max-width: 70%;
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
							// width: 110rpx;
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
								color: rgb(255, 78, 47);
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
							background: rgb(255, 78, 47);
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

					.li-time {
						// height: 45rpx;
						background: #ffe2e2;
						padding: 0 15rpx;
						display: inline-flex;
						font-size: 22rpx;
						color: rgb(255, 78, 47);
						line-height: 45rpx;
						margin: 15rpx 0;
					}

					.li-b {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: rgb(255, 78, 47);

						.w {}

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
								background: rgb(255, 78, 47);
							}
						}
					}

					.li-times {
						margin-top: 25rpx;
						font-size: 20rpx;
						color: #666;
					}

					.li-more {
						margin-top: 25rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.zt {
							font-size: 26rpx;
							color: #666;
						}

						.ckxq {
							width: 100rpx;
							height: 50rpx;
							line-height: 50rpx;
							background: rgb(255, 78, 47);
							color: #fff;
							font-size: 16rpx;
							text-align: center;
						}
					}
				}
			}

			// new-li E
			//
			.luck-ul {
				// background: #fff;
				padding: 0 30rpx;

				.luck-li {
					padding: 30rpx 0;
					border-bottom: 1px solid #f5f5f5;

					.cent {
						display: flex;

						.li-img {
							width: 80rpx;
							height: 80rpx;
							overflow: hidden;
							border-radius: 100%;
							min-width: 80rpx;
							margin-right: 20rpx;
						}

						.li-txt {
							flex: 1;

							.li-h {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.h-fl {
									display: flex;
									align-items: center;

									.name {
										font-size: 28rpx;
										font-weight: 550;
									}

									.vip {
										height: 25rpx;
										background: #000000;
										padding: 0 10rpx;
										font-size: 22rpx;
										color: #ffc263;
										margin-left: 10rpx;
										line-height: 25rpx;
									}
								}

								.h-c {
									font-size: 24rpx;
									color: #999;
								}
							}

							.li-c {
								margin: 15rpx 0;
								font-size: 24rpx;
								line-height: 36rpx;
							}

							.lis {
								display: flex;
								justify-content: space-between;

								.li-date {
									font-size: 22rpx;
									color: #999;
									margin-top: 8rpx;
								}

								.name {
									width: 100rpx;
									height: 50rpx;
									line-height: 50rpx;
									color: #000;
									text-align: center;
									font-size: 24rpx;
									background: #dcdcdc;
									border-radius: 10rpx;

									&.active {
										color: #fff;
										background: rgb(255, 78, 47);
									}
								}
							}
						}
					}

					.bottom {
						margin-top: 25rpx;
						display: flex;
						justify-content: space-between;

						.right {
							display: flex;
							align-items: center;

							.lis {
								display: flex;
								align-items: center;
								margin-left: 45rpx;

								image {
									width: 30rpx;
									height: 30rpx;
									margin-right: 13rpx;
								}
							}
						}
					}
				}

				.luck-li:nth-last-child(1) {
					border: none;
				}
			}


			.luck-zjtp {
				display: block;
				width: 710rpx;
				height: 296rpx;
				margin: 0 auto 40rpx auto;
			}

			.luck-zpjl-item {
				position: relative;
				width: 710rpx;
				height: 200rpx;
				background: #FFF;
				border-radius: 16rpx;
				margin: 0 auto 20rpx auto;

				.luck-zpjl-item-img {
					width: 200rpx;
					height: 200rpx;
					border-radius: 16rpx;
				}

				.luck-zpjl-item-name {
					position: absolute;
					top: 16rpx;
					left: 230rpx;
					width: 340rpx;
					font-size: 26rpx;
					color: rgb(44, 44, 44);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.luck-zpjl-item-state {
					position: absolute;
					top: 12rpx;
					right: 40rpx;
					font-size: 24rpx;
					color: rgb(255, 78, 47);
				}

				.luck-zpjl-item-qiangpaijia {
					position: absolute;
					top: 80rpx;
					left: 230rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
				}

				.luck-zpjl-item-num {
					position: absolute;
					top: 110rpx;
					left: 230rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
				}

				.luck-zpjl-item-price {
					position: absolute;
					top: 140rpx;
					left: 230rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
				}

				.luck-zpjl-item-btn {
					position: absolute;
					top: 110rpx;
					right: 30rpx;
					width: 140rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: rgb(255, 78, 47);
					border-radius: 16rpx;
				}

			}

			//
		}
	}

	/deep/.uni-progress-inner-bar {
		border-radius: 6rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 6rpx !important;
	}

	//竞拍中
	.jping {
		width: 710rpx;
		height: 280rpx;
		display: flex;
		// align-items: center;
		background: #fff;
		border-radius: 16rpx;
		margin: 0 auto 30rpx auto;

		.jping-left {
			position: relative;
			width: 276rpx;
			height: 276rpx;
			border: 4rpx solid rgb(255, 78, 47);
			border-radius: 16rpx;

			image {
				width: 276rpx;
				height: 276rpx;
				border-radius: 16rpx;
			}

			.jping-left-q {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 280rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgba(255, 78, 47, 0.3);
				border-radius: 0 0 16rpx 16rpx;
				z-index: 10;
			}
		}

		.jping-right {
			width: 388rpx;
			margin-left: 20rpx;

			.jping-header {
				width: 100%;
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				display: flex;
				align-items: center;
				justify-content: space-between;

				.jping-name {
					width: 220rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.jping-prouct-name {
					width: 150rpx;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

			}

			.jping-tags {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin-top: 16rpx;

				view {
					height: 34rpx;
					line-height: 34rpx;
					font-size: 16rpx;
					text-align: center;
					border-radius: 10rpx;
					margin-bottom: 6rpx;
					margin-right: 10rpx;
				}

				.lan {
					background: rgba(138, 212, 251, 0.5);
					color: rgb(0, 169, 255);
				}

				.chen {
					background: rgba(255, 221, 175, 0.5);
					color: rgb(255, 78, 47);
				}

				.red {
					background: rgba(255, 175, 175, 0.5);
					color: rgb(255, 0, 0);
				}
			}

			.jping-price {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;

				.jping-price-left {

					.jping-price-new {
						font-size: 26rpx;
						color: rgb(255, 0, 0);
					}

					.jping-price-old {
						font-size: 16rpx;
						color: rgb(190, 190, 190);
						text-decoration: line-through;
					}

				}

				.jping-price-btn {
					width: 100rpx;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 24rpx;
					color: #fff;
					text-align: center;
					background: rgb(255, 78, 47);
					border-radius: 16rpx;
				}

			}

			.jping-jd {
				width: 100%;
				font-size: 24rpx;
				color: rgb(255, 78, 47);
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;

				.jping-jd-data {
					width: 300rpx;
				}
			}
		}
	}

	//竞拍订单
	.order-item {
		position: relative;
		width: 710rpx;
		height: 250rpx;
		padding-top: 10rpx;
		background: #fff;
		border-radius: 16rpx;
		margin: 0 auto 20rpx auto;

		.order-item-name {
			width: 100%;
			font-size: 24rpx;
			color: rgb(44, 44, 44);
			text-indent: 30rpx;
		}

		.order-item-info {
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 10rpx;

			.order-item-info-left {
				position: relative;
				width: 200rpx;
				height: 200rpx;
				margin: 0 20rpx 0 10rpx;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 200rpx;
					height: 200rpx;
					border-radius: 16rpx;
					z-index: 5;
				}

				.order-item-info-q {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 200rpx;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 16rpx;
					color: #fff;
					text-align: center;
					background: rgba(255, 78, 47, 0.3);
					border-radius: 0 0 16rpx 16rpx;
					z-index: 10;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

			}

			.order-item-info-right {
				width: 450rpx;

				.order-item-info-tit {
					width: 400rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.order-item-info-price {
					width: 100%;
					display: flex;
					align-items: center;
					margin-top: 30rpx;

					.order-item-info-old {
						font-size: 16rpx;
						color: rgb(190, 190, 190);
						text-decoration: line-through;
					}

					.order-item-info-new {
						font-size: 24rpx;
						color: rgb(44, 44, 44);
						margin-left: 30rpx;
					}

				}

				.order-item-info-timeandnum {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;

					.order-item-info-time {
						font-size: 16rpx;
						color: rgb(190, 190, 190);
					}

					.order-item-info-num {
						font-size: 24rpx;
						color: rgb(44, 44, 44);
					}

				}

			}

		}

		.order-item-status {
			position: absolute;
			top: 0;
			right: 0;
			width: 120rpx;
			height: 120rpx;
			// transform: rotateX(180deg);
			background: url('../../static/images/mine/chenkuan.png') no-repeat;
			background-size: 120rpx 120rpx;

			.order-item-status-name {
				position: absolute;
				top: 30rpx;
				left: 40rpx;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
				transform: rotate(45deg);
			}
		}

	}

	//order-li S
	.order-li {
		background: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx;

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
				color: rgb(255, 78, 47);
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
						color: rgb(255, 78, 47);
					}
				}
			}
		}

		.order-price {
			color: rgb(255, 78, 47);
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
		}

		.order-btn {
			width: 140rpx;
			height: 50rpx;
			border: 1px solid rgb(255, 78, 47);
			border-radius: 25rpx;
			margin: 0 0 0 20rpx;
			line-height: 50rpx;
			font-size: 22rpx;
			color: rgb(255, 78, 47);
			padding: 0;
		}

		.order-btn.gray {
			border-color: #999999;
			color: #999999;
			text-align: center;
		}
	}

	//order-li E
	.lingjiangCont {
		width: 556rpx;
		height: 280rpx;
		background: #ffffff;
		border-radius: 30rpx;
		padding-top: 60rpx;

		.list {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 460rpx;
			height: 80rpx;
			border-radius: 40rpx;
			margin: 0 auto;

			&:nth-child(1) {
				background: #dddddd;
			}

			&:nth-child(2) {
				background: rgb(255, 78, 47);
				color: #fff;
				margin-top: 60rpx;
			}

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
		}
	}

	// 提示
	.tishingCont {
		width: 556rpx;
		height: 370rpx;
		background: #ffffff;
		border-radius: 30rpx;
		padding-top: 50rpx;

		.title {
			font-size: 30rpx;
			color: #222;
			text-align: center;
		}

		.name {
			margin-top: 80rpx;
			font-size: 26rpx;
			color: #000;
			text-align: center;

			text {
				color: rgb(255, 78, 47);
			}
		}

		.cont {
			margin-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			padding: 0 50rpx;

			.query {
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #dddddd;
				border-radius: 40rpx;
				color: #000;
			}

			.btnsub {
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: rgb(255, 78, 47);
				border-radius: 40rpx;
				color: #fff;
			}
		}
	}

	.fenxiang {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.share-pop {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
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
				width: 33.3333%;
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