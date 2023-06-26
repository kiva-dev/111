<template>
	<view class="detail-page">
		<view class="detail-header" :style="`background: rgba(255,255,255,${myOpacity});`">
			<view class="detail-head">
				<image src="@/static/images/new-index/detail_btn_back.png" class="return" @click="toIndex()"></image>
				<image src="@/static/images/new-index/detail_btn_car.png" class="gwc"></image>
				<image src="@/static/images/new-index/detail_btn_share.png" class="fx"></image>
				<view :style="`opacity: ${myOpacity};`">{{$t('top.jpxq')}}</view>
			</view>
			<!--头部导航 start-->
			<view class="auct-nav" :style="`opacity: ${myOpacity};`">
				<view v-for="item in navList" :key="item.id" class="li" :class="item.id==navId?'active':''"
					@click="onNavClick(item.id)">{{item.title}}</view>
			</view>
		</view>
		<!--轮播图 start-->
		<view class="detail-big">
			<div id="div1"></div>
			<uni-swiper-dot class="uni-swiper-dot-box" :info="shopCont.images" :current="current" :mode="mode"
				field="content">
				<swiper class="swiper-box" autoplay="true" :circular="true" @change="change">
					<swiper-item v-for="(item,k) in shopCont.images" :key="k" @click="previewImgList()">
						<view class="swiper-item">
							<view class="big-img">
								<image class="image img" :src="item" mode="aspectFill" :draggable="false" />
							</view>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<block v-if="status">
			<!--商品价格时间-->
			<view class="detail-price">
				<view class="detail-price-left">
					<view class="detail-price-new">RM{{shopCont.auction_price}}</view>
					<view class="detail-price-old">RM{{shopCont.price}}</view>
				</view>
				<view class="detail-price-time" v-if="shopCont.check_status==3||shopCont.check_status==4">
					{{$u.timeFormat(shopCont.end_time, 'yyyy/mm/dd hh:MM:ss')}} {{$t('auction.detail.yijs')}}
				</view>
				<view class="detail-price-time" v-else>
					{{$t('new.jljs')}}：{{hour}}:{{minute}}:{{second}}
				</view>
			</view>
			<view class="detail-title">{{shopCont.goods_name}}</view>
			<!--标签-->
			<view class="li-tags">
				<!-- <block v-for="(item,index) in shopCont.tags" :key="item.tag_id">
					<view class="tag">{{item.name}}</view>
				</block> -->
				<view class="li-icon">
					<image src="@/static/images/new-index/kzx.png" mode="widthFix"></image>
				</view>
				<view class="li-icon">
					<image src="@/static/images/new-index/xpss.png" mode="widthFix"></image>
				</view>
				<view class="li-icon">
					<image src="@/static/images/new-index/tjsp.png" mode="widthFix"></image>
				</view>
				<view class="li-icon">
					<image src="@/static/images/new-index/rmsp.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="progress-layout">
				<view class="pl-box">
					<span :style="{'width': 50 + '%'}"></span>
				</view>
			</view> -->
			<view class="operate-layout">
				<view class="ol-container">
					<image src="@/static/images/new-index/detail_icon_collect.png" mode="widthFix"></image>
					<p>7.9k</p>
				</view>
				<view class="ol-container">
					<image src="@/static/images/new-index/detail_icon_clap.png" mode="widthFix"></image>
					<p>878</p>
				</view>
				<view class="ol-container">
					<image src="@/static/images/new-index/detail_icon_share.png" mode="widthFix"></image>
					<p>1.3k</p>
				</view>
			</view>
			<!--幸运之星-->
			<view class="detail-luck-star" v-if="shopCont.auction_type!=2">
				<view class="detail-luck-star-name">{{$t('xejp')}}</view>
				<view class="detail-luck-star-info">
					<image src="../../static/images/products/luck-jb.png"></image>
					{{$t('xyzx')}}：{{shopCont.lucky_num}}{{$t('ge')}}
				</view>
			</view>
			<!--参与竞拍人数-->
			<view class="detail-canyu">
				<view class="detail-canyu-name">{{$t('new.canyurenshu')}}：{{shopCont.order_user.length}}
					{{$t('auction.detail.ren')}}
				</view>
				<view class="detail-canyu-jdt" v-if="shopCont.check_status!=3 && shopCont.check_status!=4">
					<progress class="progress" :percent="shopCont.finish_rate*100" stroke-width="9"
						activeColor="#1DD181" backgroundColor="#EBEBEB" />
				</view>
				<view class="detail-canyu-list"
					:style="shopCont.check_status==3 || shopCont.check_status==4?'margin-top:30rpx;':''">
					<block v-if="shopCont.order_user.length > 12">
						<view class="detail-canyu-item" :style="(i+1)%6==0?'margin-right: 0rpx;':''"
							v-for="(item,i) in shopCont.order_user.slice(0,10)">
							<image :src="item.avatar"></image>
						</view>
						<view class="detail-canyu-more">
							<image src="/static/images//products/more.png"></image>
						</view>
						<view class="detail-canyu-item" style="margin-right: 0rpx;"
							v-for="(item,i) in shopCont.order_user.slice(10,11)">
							<image :src="item.avatar"></image>
						</view>
					</block>
					<block v-else>
						<view class="detail-canyu-item" :style="(i+1)%6==0?'margin-right: 0rpx;':''"
							v-for="(item,i) in shopCont.order_user">
							<image :src="item.avatar"></image>
						</view>
					</block>
				</view>
				<!-- 最后参与人的时间 -->
				<view class="detail-canyu-zuihou" :style="shopCont.order_user.length==0?'margin-top:20rpx;':''"
					v-show="shopCont.check_status==3 || shopCont.check_status==4">Last:
					{{shopCont.last_pay_time}}
				</view>
			</view>
			<div id="div2"></div>
			<!--评论-->
			<view class="detail-comment">
				<div id="div2"></div>
				<view class="detail-comment-head">
					<view class="detail-comment-tit">{{$t('newDetail.pinglun')}} <span>（{{JudgeList.length}}）</span>
					</view>
					<view class="detail-comment-more" @click="toComment()">
						<view>{{$t('user.myCont.ckqb')}}</view>
						<image src="../../static/images/products/right.png"></image>
					</view>
				</view>
				<block v-if="JudgeList.length > 0">
					<view class="detail-comment-item" v-for="(item,i) in JudgeList.slice(0,2)" :key="item.user_comment_id">
						<view class="detail-comment-item-head">
							<image :src="item.user.avatar" mode="aspectFill"></image>
							<p>{{item.user.nickname}}</p>
							<view class="head-level">
								<view class="head-level-icon">
									<image src="@/static/images/mine/mine_icon_vip.png" mode="widthFix"></image>
								</view>
								<view class="head-level-num">Lv.2</view>
							</view>
						</view>
						<view class="detail-comment-item-info">
							{{item.comment}}
						</view>
					</view>
				</block>
				<block v-else>
					<view class="detail-comment-not">{{$t('newDetail.not')}}</view>
				</block>
			</view>
			<!--店铺信息-->
			<view class="detail-five">
				<view class="five-hd">
					<view class="new-shop">
						<image :src="shopCont.shop.shop_logo" class="new-shop-logo"></image>
						<view class="new-shop-info">
							<view class="new-shop-info-des">
								<view class="new-shop-info-name">{{shopCont.shop.shop_name}}</view>
								<view class="new-shop-info-nums">
									<view>{{$t('auction.detail.guanhzuliang')}}:{{shopCont.shop.shop_focus_total}}
									</view>
								</view>
							</view>
						</view>
						<view @click="onMineFocus(2)">
							<view v-if="shopCont.shop.shop_focus == 1" class="new-shop-info-dy"
								style="background: 	rgb(153,153,153,0.6);">
								{{$t('auction.detail.querydy')}}
							</view>
							<view v-else class="new-shop-info-dy">{{$t('auction.detail.dy')}}</view>
						</view>
					</view>
					<view class="new-shop-line"></view>
					<view class="conter">
						<view class="five-head">
							<view class="hd-fl">
								<view class="txt">
									<view class="c" v-if="isShowAll">
										{{shopCont.shop.shop_info}}
										<image src="../../static/images/new/shouqi.png" @click="isShowAll=false">
										</image>
									</view>

									<view class="not-all" v-else>
										<view>{{shopCont.shop.shop_info}}</view>
										<image src="../../static/images/new/zhankai.png" @click="isShowAll=true"
											v-show="shopCont.shop.shop_info">
										</image>
									</view>
								</view>

							</view>
						</view>
					</view>
				</view>
			</view>
			<!--猜你喜欢-->
			<view class="guess-layout">
				<view class="gl-title">
					<view class="gl-title-left">
						<image src="@/static/images/new-index/detail_icon_guess.png" mode="widthFix"></image>
						<p>{{$t('detail.guess')}}</p>
					</view>
				</view>
				<view class="gl-content">
					<u-grid :border="false" @click="click">
						<u-grid-item v-for="item in youLikeList" :key="item.goods_id" @click="toYouLikeOrHot(item.auction_goods_id)">
							<view class="gl-content-item">
								<view class="item-cover">
									<image :src="item.image" mode="aspectFill">
									</image>
								</view>
								<view class="item-text">{{item.goods_name}}</view>
								<view class="item-price">
									<span>RM</span>
									<span>{{item.litestore_goods_spec[0].goods_price}}</span>
								</view>
							</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<!--热门推荐-->
			<view class="guess-layout">
				<view class="gl-title">
					<view class="gl-title-left">
						<image src="@/static/images/new-index/detail_icon_hot.png" mode="widthFix"></image>
						<p>{{$t('detail.hot')}}</p>
					</view>
				</view>
				<view class="gl-content">
					<u-grid :border="false" @click="click">
						<u-grid-item v-for="item in hotList" :key="item.auction_goods_id" @click="toYouLikeOrHot(item.auction_goods_id)">
							<view class="gl-content-item" >
								<view class="item-cover">
									<image :src="item.image" mode="aspectFill">
									</image>
								</view>
								<view class="item-text">{{item.goods_name}}</view>
								<view class="item-price">
									<span>RM</span>
									<span>{{item.price}}</span>
								</view>
							</view>
						</u-grid-item>
						
					</u-grid>
				</view>
			</view>
			<div id="div3"></div>
			<!--商品详情-->
			<view class="detail-six">
				<view class="six-tit">
					<view class="line"></view>
					<text>{{$t('home.shop.title')}}</text>
					<view class="line"></view>
				</view>
				<view class="six-article" v-if="isShopCont" v-html="shopCont.english_content"></view>
				<view class="six-article" v-else v-html="shopCont.content"></view>
			</view>
			<div id="div4"></div>
			<!--竞拍记录-->
			<view class="jingpaiCont">
				<view class="six-tit">
					<view class="line"></view>
					<text>{{$t('auction.detail.jingpaijilu')}}</text>
					<view class="line"></view>
				</view>
				<block v-if="goodlucky.length">
					<view class="jingpaiCont-jpjl">
						<view class="max-title" style="color: #FF4E2F;">获奖名单</view>

						<view class="conter" style="margin-bottom:50rpx;">
							<view v-for="item,k in goodlucky" :key="k" class="list">
								<view class="kuan">
									<view class="user">
										<image :src="item.avatar" mode="" />
									</view>
								</view>
								<view class="name">{{item.nickname}}</view>
								<view class="time">{{$filter.to_dateTimes(item.update_time)}}</view>
								<!-- <view class="pay">RM{{item.pay_price}}</view> -->
								<view class="order">{{item.num_id}}
									<image src="../../static/images/new/copy.png" mode="scaleToFill"
										@click="onnumidClick(item)" />
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-if="OrderList.length">
					<view class="jingpaiCont-jpjl" style="margin-top: 20rpx;">
						<view class="max-title">{{$t('auction.detail.jingpaijilu')}}</view>
						<view class="conter">
							<view v-for="item,k in OrderList" :key="item.num_id" class="list">
								<view class="user">
									<image :src="item.avatar" mode="" />
								</view>
								<view class="name">{{item.nickname}}</view>
								<view class="time">{{$filter.to_dateTimes(item.pay_time)}}</view>
								<view class="order">{{item.num_id}}
									<image src="../../static/images/new/copy.png" mode="scaleToFill"
										@click="onnumidClick(item)" />
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!--竞拍规则-->
			<view>
				<div id="div5"></div>
				<view class="six-tit">
					<view class="line"></view>
					<text>{{$t('auction.detail.jingpaijilu')}}</text>
					<view class="line"></view>
				</view>
				<view style="background: #fff;">
					<view class="agree-box" v-if="isShopCont" v-html="e_auction_rule"></view>
					<view class="agree-box" v-else v-html="auction_rule"></view>
				</view>
			</view>
			<!--底部 start-->
			<!-- <view class="fixed-fr">
				<view class="detail-btn" v-if="shopCont.check_status==3||shopCont.check_status==4"
					style="font-size: 40rpx;color:#FFF;background:rgb(190, 190, 190)">
					<view>{{$t('auction.detail.yijs')}}</view>
					<view style="font-size: 20rpx;">RM{{shopCont.auction_price}}</view>
				</view>
				<view class="detail-btn" v-else-if="shopCont.check_status==1"
					style="font-size: 40rpx;color:#fff;background:rgba(255, 78, 47, 0.3)">
					{{$t('auction.detail.jijks')}}
					<view style="font-size: 20rpx;">RM{{shopCont.auction_price}}</view>
				</view>
				<view class="detail-btn" v-else-if="auction_num>='-1'&&auction_num!=0||shopCont.check_status==2"
					@click="onMineInfos">
					<view style="font-size: 40rpx;">{{$t('auction.detail.qiangpai')}}</view>
					<view style="font-size: 20rpx;">RM{{shopCont.auction_price}}</view>
				</view>
				<view class="detail-btn" v-else style="color:#000;background:#ccc">
					{{$t('auction.detail.jingpaiwan')}}
				</view>
			</view> -->
			<view class="bottom-layout">
				<view class="bl-left">
					<view class="bl-left-box" @click="toMyCart()">
						<image src="@/static/images/new-index/detail_btn_car2.png" mode="widthFix"></image>
						<p>My Cart</p>
					</view>
				</view>
				<view class="bl-right">
					<!-- <view class="bl-right-buy" @click="toPay()">
						<p class="buy-name">Buy Now</p>
						<p class="buy-info"><span>RM</span> 4888.00</p>
					</view> -->
					<view class="bl-right-add" style="color: #FFF; background: rgb(190, 190, 190)"
						v-if="shopCont.check_status==3||shopCont.check_status==4">
						<p>{{$t('auction.detail.yijs')}}</p>
					</view>
					<view class="bl-right-add" v-else-if="shopCont.check_status==1">
						<p>{{$t('auction.detail.jijks')}}</p>
					</view>
					<view class="bl-right-add" v-else-if="auction_num>='-1'&&auction_num!=0||shopCont.check_status==2"
						@click="onMineInfos">
						<p>{{$t('auction.detail.qiangpai')}}</p>
					</view>
					<view class="bl-right-add" v-else>
						<p>{{$t('auction.detail.jingpaiwan')}}</p>
					</view>
				</view>
			</view>
			<!--底部 end-->
		</block>
		<!--抢拍次数 start-->
		<view v-if="qiangpaiShow" class="fenxiang">
			<view class="qiangpaiShow">
				<!-- <image src="../../static/images/new/tck.png" class="kct"></image> -->
				<view class="query" @click="onQueryClick">
					<image src="../../static/images/close1.png"> </image>
				</view>
				<view class="qiangpaiCont">
					<view class="center">
						<view class="cent">
							<view class="cont">
								<input type="number" :placeholder="$t('user.auctionM.qsrqpcs')" v-model="isauctionNum">
								<view class="num">
									<view style="color:#2c2c2c">{{$t('user.auctionM.syqpcs')}}</view>：<block
										v-if="auction_num=='-1'">
										{{$t('Unlimited sho')}}
									</block>
									<block v-else>{{auction_num}}</block>
								</view>
							</view>
						</view>
						<view class="qiangpai-btn">
							<view class="btnsub" @click="onBtnSub">{{$t('user.auctionM.queding')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--竞拍次数为0 start-->
		<uni-popup ref="pwdPopup" :mask-click="false" type="center">
			<view class="jingpai-pop">
				<view class="title">{{$t('auction.detail.yijieshu')}}{{auction_num}}{{$t('auction.detail.ci')}}</view>
				<view class="txt">{{$t('auction.detail.cgfxhyqhykhdjpcs')}}</view>
				<view class="cont">
					<view></view>
					<view class="right">
						<view class="name" @click="onQuery">{{$t('auction.detail.query')}}</view>
						<view class="ljfx" @click="onFengxiang">{{$t('auction.detail.lijifenxiang')}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="fenxiang" v-if="jingpaiShow">
			<view class="jingpai-ok">
				<!-- <image src="../../static/images/new/tck.png" class="kct"></image> -->
				<view class="jingpai-pop">
					<view class="title">
						{{$t('auction.detail.sfqr')}}RM{{shopNum}}{{$t('auction.detail.gmygjpme')}}{{isauctionNum}}{{$t('auction.detail.gmygjpmenum')}}
					</view>
					<view class="txt" v-if="auction_num>'-1'">
						<block v-if="auction_num=='-1'">{{$t('Unlimited sho')}}</block>
						<block v-else>{{$t('auction.detail.nishengyu')}}{{auction_num}}{{$t('auction.detail.cijpjh')}}
						</block>
					</view>
					<view class="cent">
						<image class="imgs" src="/static/images/new-index/xz.png" mode="aspectFit|aspectFill|widthFix">
						</image>
						<view class="txt1">{{$t('auction.detail.brywqydbty')}}</view>
						<navigator url="../mine/jpxy" hover-class="none" class="txt2">
							{{$t('auction.detail.jphdgommzxy')}}
						</navigator>
					</view>
					<view class="cont">
						<view></view>
						<view class="right">
							<view class="name" @click="ongoPayQuery">{{$t('auction.detail.query')}}</view>
							<view class="ljfx" @click="onOrderReferCartOrder">{{$t('auction.detail.btnsub')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
					<view @click="onfacebook" class="share-li">
						<view class="icon">
							<image class="img" src="../../static/images/share23.png"></image>
						</view>
						<view class="t" style="color:#000">Facebook</view>
					</view>
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
		<!--支付方式弹出 start-->
		<view class="zhifuCont" v-if="zhifushow">
			<view class="mode-pop">
				<view class="mode-tit">
					<text>{{$t('auction.detail.fyzf')}}</text>
					<view class="cancel" @click="toggle1Close">{{$t('auction.detail.query')}}</view>
				</view>
				<view class="cent">
					<view class="title">{{$t('auction.detail.xuzhufufy')}}</view>
					<view class="txt"><text>RM</text>{{shopNum}}</view>
				</view>
				<block>
					<view v-for="item in orderPayList" :key="item.id" class="mode-li">
						<view class="label">
							{{item.title}}
							<block v-if="item.id==1">（{{$t('auction.detail.keyongyuer')}}<text class="color-red"
									style="color: rgb(10, 198, 142);">RM{{balance}}</text>）</block>
							<block v-if="item.id==2">（{{$t('auction.detail.keyongyuer')}}<text class="color-red"
									style="color: rgb(10, 198, 142);">RM{{money}}</text>）</block>
						</view>
						<view class="li-fr" @click="onQuanClick(item)">
							<radio :checked="item.isShow?true:false" value="r1" />
						</view>
					</view>
				</block>
				<view class="mode-bot">
					<button class="public-btn" style="background: rgb(10, 198, 142);"
						@click.stop="$noMultipleClicks(onPayClick)">{{$t('auction.detail.quzhifu')}}</button>
				</view>
			</view>
		</view>
		<!--支付密码弹出 start-->
		<view class="fenxiang" v-if="zhipassShow">
			<view class="pay-pwd">
				<!-- <image src="../../static/images/new/tck-my.png" class="pay-pwd-img"></image> -->
				<image src="../../static/images/new/close.png" class="pay-pwd-close" @click="onPwdQuery"></image>
				<view class="pay-pwd-info">
					<view class="pay-pwd-info-tit">{{$t('auction.detail.qsrzfmm')}}</view>
					<view class="pay-pwd-info-line"></view>
					<view class="pay-pwd-info-price">RM{{shopNum}}</view>
					<view class="pay-pwd-info-input">
						<input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd"
							:placeholder="$t('auction.detail.qsrzfmm')" />
					</view>
					<view class="pay-pwd-info-btn" @click="onPwdClick">{{$t('auction.detail.btnsub')}}</view>
				</view>
			</view>
		</view>
		<!--支付成功弹出 start-->
		<view class="fenxiang" v-if='zhichenShow'>
			<view class="pay-pwd">
				<!-- <image src="../../static/images/new/tck-cg.png" class="pay-pwd-img"></image> -->
				<image src="../../static/images/new/close.png" class="pay-pwd-close" @click="onpayQuery"></image>
				<view class="pay-pwd-info">
					<view class="pay-pwd-info-tit" style="font-size: 32rpx;">{{$t('auction.detail.gxnzfcgznzp')}}</view>
					<view class="pay-pwd-info-price" style="font-size: 26rpx;margin-top: 30rpx;">
						{{$t('auction.detail.zpydzpjlgg')}}
					</view>
					<view class="pay-pwd-list">
						<view class="pay-pwd-list-cancel" @click="onpayQuery">{{$t('auction.detail.query')}}</view>
						<view class="pay-pwd-list-ok" @click="onQiangpai" v-if="auction_num > isauctionNum">
							{{$t('auction.detail.zaipaiyd')}}
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="payConter">
				<view class="title">{{$t('auction.detail.gxnzfcgznzp')}}</view>
				<view class="txt">{{$t('auction.detail.zpydzpjlgg')}}~</view>
				<view class="name" v-if="auction_num>'-1'">
					{{$t('auction.detail.nishengyu')}}{{auction_num}}{{$t('auction.detail.cijpjh')}}
				</view>
				<view class="cont">
					<view></view>
					<view class="right">
						<view class="query" @click="onpayQuery">{{$t('auction.detail.query')}}</view>
						<block v-if="shopCont.total_least_num&&shopCont.auction_type==1">
							<view class="cen" v-if="auction_num!=0" @click="onQiangpai">
								{{$t('auction.detail.zaipaiyd')}}
							</view>
						</block>
						<block v-if="shopCont.auction_type==2">
							<view class="cen" v-if="auction_num!=0" @click="onQiangpai">
								{{$t('auction.detail.zaipaiyd')}}
							</view>
						</block>
					</view>
				</view>
			</view> -->
		</view>
		<!--支付成功弹出 end-->
	</view>
</template>

<script>
	import JudgeList from '@/components/judgeList'
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		components: {
			JudgeList
		},
		data() {
			return {
				likeList: [{
					list: [1, 1, 1, 1, 1, 1]
				}, {
					list: [1, 1, 1, 1]
				}],
				status: false,
				myOpacity: 0,
				heightList: [], //存储每个锚点对应顶部的高度
				isClick: false,
				opacityTimer: '',
				noClick: true, // 防止重复点击 
				id: '',
				navList: [{
					id: 1,
					title: this.$t('newDetail.shangpin')
				}, {
					id: 2,
					title: this.$t('newDetail.pinglun')
				}, {
					id: 3,
					title: this.$t('newDetail.xianqin')
				}, {
					id: 4,
					title: this.$t('newDetail.jilu')
				}, {
					id: 5,
					title: this.$t('newDetail.guize')
				}],
				navId: 1,
				current: 0,
				mode: 'nav',
				shopCont: '', // 商品详情
				timeData: {},
				auction_num: '', // 竞拍次数
				orderPayList: [{
					id: 1,
					title: this.$t('auction.detail.yuerzhifu'),
					isShow: false
				}, {
					id: 2,
					title: this.$t('auction.detail.sfzfu'),
					isShow: false
				}],
				pay_pwd: '', // 支付密码
				OrderList: [], // 竞拍记录
				search: '', // 搜索
				page: 1,
				pagenum: 20,
				totalPageNum: 0,
				isShopCont: false, // 商品详情显示中文还是英文
				auction_rule: '',
				e_auction_rule: '',
				goodlucky: [], // 幸运之星
				JudgeList: [], // 评价列表
				money: 0, // 余额
				balance: 0,
				isauctionNum: '', // 填写金额
				shopNum: '',
				totalPageNums: 0,
				qrUrl: '', // 页面地址
				qiangpaiShow: false,
				onfenxingShow: false,
				jingpaiShow: false,
				order_no: "",
				zhifushow: false,
				zhipassShow: false,
				zhichenShow: false,
				set_paypwd: '',
				MineCont: {}, // 实名认证
				isShowAll: false, //是否显示全部
				timers: '', //倒计时
				hour: 0,
				minute: 0,
				second: 0,
				timer: "", //定时器
				hotList:[],//热门推荐
				youLikeList:[],//猜你喜欢
			}
		},
		watch: {
			money: {
				handler(e, m) {
					this.orderPayList = [{
						id: 1,
						title: this.$t('auction.detail.yuerzhifu'),
						isShow: false
					}, {
						id: 2,
						title: this.$t('new.zfjezf'),
						isShow: false
					}]
				}
			}
		},
		onLoad(e) {
			if (e.invite_code) {
				uni.setStorageSync('invite_code', e.invite_code)
			}
			if (uni.getStorageSync('token')) {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + e.id +
							'&invite_code=' + res.data.invite_code // 生成二维码的链接
					}
				})
			} else {
				this.qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + e.id // 生成二维码的链接
			}
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			// 竞拍规则
			this.$http.post(this.$apiObj.IndexSetting, {
				fields: 'auction_rule,e_auction_rule'
			}).then(res => {
				if (res.code == 1) {
					this.auction_rule = this.onHtmlcont(res.data.auction_rule)
					this.e_auction_rule = this.onHtmlcont(res.data.e_auction_rule)
				}
			})
			this.id = e.id
			// 竞拍商品详情
			this.onAuctionDetail()
			// 某商品幸运之星
			this.onAuctionGoodLucky()
			setTimeout(() => {
				// 竞拍记录
				this.onAuctionorderOrderList()
			}, 1000);
			if (e.type) {
				this.navId = e.type
			}
		},
		onShow() {
			// 判断是否设置支付密码
			if (uni.getStorageSync('token')) {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.set_paypwd = res.data.set_paypwd
					}
				})

				// 实名认证
				this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
					if (res.code == 1) {
						this.MineCont = res.data
					}
				})
			}
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		onPageScroll(res) {
			if (res.scrollTop <= 650) {
				let num = res.scrollTop / 2 / 100
				this.myOpacity = num
			} else {
				this.myOpacity = 1
			}
			if (!this.isClick) {
				if (res.scrollTop >= this.heightList[0] && res.scrollTop < this.heightList[1]) this.navId = 1
				else if (res.scrollTop >= this.heightList[1] && res.scrollTop < this.heightList[2]) this.navId = 2
				else if (res.scrollTop >= this.heightList[2] && res.scrollTop < (this.heightList[3])) this.navId = 3
				else if (res.scrollTop >= this.heightList[3] && res.scrollTop < (this.heightList[4])) this.navId = 4
				else this.navId = 5
			}

		},
		mounted() {

		},
		methods: {
			//猜你喜欢以及热门推荐跳转
			toYouLikeOrHot(id){
				uni.navigateTo({
					url:'/pages/auction/detail?id='+id
				})
			},
			getYouLikeList(){
				this.$http.post(this.$apiObj.GetYouLikeList,{
					goods_id:this.shopCont.goods_id,
					page:1,
					pagenum:6
				}).then(res=>{
					this.youLikeList=res.data.data
				})
			},
			getHotList(){
				this.$http.post(this.$apiObj.GetHotList,{
					goods_id:this.shopCont.goods_id,
					page:1,
					pagenum:6
				}).then(res=>{
					this.hotList=res.data.data
				})
			},
			toPay() {
				this.$http.post(this.$apiObj.CartAdd, {
					goods_spec_id: this.shopCont.litestore_goods_spec[0].goods_spec_id,
					num: 1
				}).then(res => {
					if (res.code == 1) {
						this.$http.post(this.$apiObj.CartList).then(data => {
							uni.navigateTo({
								url: "/pages/cart/submit?cart_ids=" + data.data.data[0].goods[0].id
							})
						})
					}
				})
			},
			toMyCart(){
				uni.navigateTo({
					url:'/pages/cart/cart'
				})
			},
			//计算距离
			getTopNum() {
				for (var i = 0; i < this.navList.length; i++) {
					uni.createSelectorQuery()
						.select('#div' + (i + 1))
						.boundingClientRect(data => {
							//目标位置节点 类或者 id
							uni.createSelectorQuery()
								.select('.detail-page')
								.boundingClientRect(res => {
									let num = data.top > 0 ? data.top - 100 : data.top
									this.heightList.push(num)
								}).exec();
						}).exec();
				}
			},
			//预览图片
			previewImgList() {
				console.log(1)
				uni.previewImage({
					urls: this.shopCont.images
				})
			},
			//获取评论
			getCommentList() {
				this.$http.post(this.$apiObj.GoodsCommentList, {
					goods_id: this.shopCont.goods_id
				}).then(res => {
					if (res.code) {
						// res.data.data.forEach(item => {
						// 	let arr = item.createtime.split(' ')
						// 	let day = arr[0].split('-')
						// 	let time = arr[1].split(':')
						// 	item.createtime = day[1] + '/' + day[2] + ' ' + time[0] + ':' + time[1]
						// })
						this.JudgeList = res.data.data
					}
				})
			},
			//前往评论
			toComment() {
				uni.navigateTo({
					url: '/pages/auction/comment?id=' + this.shopCont.goods_id
				})
			},
			onNextUrl(url) {
				uni.navigateTo({
					url: '/pages/auction/' + url
				})
			},
			//锚点跳转方法
			onScrollIntoView(id) {
				uni.createSelectorQuery()
					.select('#div' + id)
					.boundingClientRect(data => {
						//目标位置节点 类或者 id
						uni.createSelectorQuery()
							.select('.detail-page')
							.boundingClientRect(res => {
								//最外层盒子节点类或者 id
								uni.pageScrollTo({
									duration: 200, //过渡时间
									scrollTop: data.top - res.top - 100 //到达距离顶部的top值
								});
							})
							.exec();
					})
					.exec();
			},
			toIndex() {
				uni.navigateBack()
				// uni.switchTab({
				// 	url: '/pages/auction/auction'
				// })
			},
			// 某商品幸运之星
			onAuctionGoodLucky() {
				this.$http.post(this.$apiObj.AuctionGoodLucky, {
					auction_goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						this.goodlucky = res.data
					}
				})
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
			// 轮播图数字变
			change(e) {
				console.log(e.detail.current);
				this.current = e.detail.current
			},
			onHtmlcont(html) {
				let richtext = html
				const regex = new RegExp('<img', 'gi');
				richtext = richtext.replace(regex, '<img style="max-width: 100%;"');
				const regex1 = new RegExp('data-fail="0" style="', 'gi');
				richtext = richtext.replace(regex1, 'data-fail="0" style="max-width: 100%;');
				return richtext
			},
			// 跳转店铺
			onshopCont() {
				uni.setStorageSync('shop_id', this.shopCont.admin_id)
				uni.navigateTo({
					url: '/pages/class/shop/shop'
				});
			},
			// 分享--加分享次数
			onAuctionorderShare() {
				this.$http.post(this.$apiObj.AuctionorderShare, {
					auction_goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						this.onAuctionDetail()
					}
				})
			},
			// 竞拍商品详情
			onAuctionDetail() {
				this.$http.post(this.$apiObj.AuctionDetail, {
					auction_goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						let timeArr = this.timerDjs(res.data.pre_end_time)
						this.startDjs(timeArr)
						if (res.data.check_status == 2) {
							res.data.xeendtime = res.data.pre_end_time
							let time = this.$filter.to_date_time(res.data.start_time)
							setInterval(() => {
								// this.computTime('2021-12-12 12:12:12')
								res.data.past_time = this.computTime(time)
							}, 100);
							res.data.pre_end_time = res.data.pre_end_time - Math.round(new Date().getTime() / 1000)
						}
						if (this.isShopCont) {
							res.data.tags.map(item => {
								item.name = this.getCaption(item.name, 1) ? this.getCaption(item.name, 1) :
									item.name
							})
							res.data.goods_mark = this.getCaption(res.data.goods_mark, 1) ? this.getCaption(res
								.data.goods_mark, 1) : res.data.goods_mark
							res.data.goods_name = this.getCaption(res.data.goods_name, 1) ? this.getCaption(res
								.data.goods_name, 1) : res.data.goods_name
						} else {
							res.data.tags.map(item => {
								item.name = this.getCaption(item.name, 0) ? this.getCaption(item.name, 0) :
									item.name
							})
							res.data.goods_mark = this.getCaption(res.data.goods_mark, 0) ? this.getCaption(res
								.data.goods_mark, 0) : res.data.goods_mark
							res.data.goods_name = this.getCaption(res.data.goods_name, 0) ? this.getCaption(res
								.data.goods_name, 0) : res.data.goods_name
						}

						var oldsecond = res.data.end_time - res.data.start_time
						var day = Math.floor(oldsecond / 86400);
						var hours = Math.floor((oldsecond % 86400) / 3600);
						var minutes = Math.floor(((oldsecond % 86400) % 3600) / 60);
						var newsecond = Math.floor(((oldsecond % 86400) % 3600) % 60);
						res.data.daytime = day + this.$t('user.auctionM.day') + hours + this.$t(
								'user.auctionM.xiaoshi') + minutes + this.$t('user.auctionM.fen') + newsecond +
							this.$t('user.auctionM.miao')
						res.data.start_time = res.data.start_time - Math.round(new Date().getTime() / 1000)
						let richtext = res.data.content;
						const regex = new RegExp('<img', 'gi');
						richtext = richtext.replace(regex, '<img style="max-width: 100%;"');
						const regex1 = new RegExp('data-fail="0" style="', 'gi');
						richtext = richtext.replace(regex1, 'data-fail="0" style="max-width: 100%;');
						res.data.content = richtext
						let richtext2 = res.data.english_content;
						const regex2 = new RegExp('<img', 'gi');
						richtext2 = richtext2.replace(regex2, '<img style="max-width: 100%;"');
						const regex3 = new RegExp('data-fail="0" style="', 'gi');
						richtext2 = richtext2.replace(regex3, 'data-fail="0" style="max-width: 100%;');
						res.data.english_content = richtext2

						this.shopCont = res.data
						this.status = true

						// 评价列表
						this.getCommentList()
						//热门推荐
						this.getHotList()
						//猜你喜欢
						this.getYouLikeList()
						setTimeout(() => {
							this.getTopNum()
						}, 2000)

					}
				})
			},
			//开始倒计时
			startDjs(timeArr) {
				let t = timeArr[0]
				if (t * 1 > 0) this.hour = (t * 1) * 24 + timeArr[1] * 1
				else this.hour = timeArr[1] * 1

				this.minute = timeArr[2]
				this.second = timeArr[3]
				this.timer = setInterval(() => {
					//如果剩余秒数大于0 减少秒数
					if (this.second > 0) {
						this.second--
						if (this.second < 10) {
							this.second = '0' + this.second
						}
					} else {
						//如果剩余分钟数等于0，说明已经是改小时的最后一分了 减少小时数 分钟和秒数都归为59
						if (this.minute == 0) {
							//如果剩余小时是大于0，说明最少还要一小时了 小时数减一 分钟和秒数为59
							if (this.hour > 0) {
								this.hour--
								this.minute = 59
								this.second = 59
								if (this.hour < 10) this.hour = '0' + this.hour
							} else {
								clearInterval(this.timer)
							}
						} else {
							this.minute--
							this.second = 59
							if (this.minute < 10) this.minute = '0' + this.minute
						}
					}
				}, 1000)

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
			// time格式为yyyy-mm-dd hh:mm:ss 指定时间
			computTime(time) {
				// 当前时间的时间戳
				var nowTime = Date.parse(new Date(time));
				// 指定时间的时间戳
				var endTime = Date.parse(new Date());
				// 计算相差天数
				var timeResult = endTime - nowTime;
				var days = Math.floor(timeResult / (24 * 3600 * 1000));
				// 计算出小时数
				var dayMS = timeResult % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
				var hours = days * 24 + Math.floor(dayMS / (3600 * 1000));
				// 计算相差分钟数
				var hoursMS = dayMS % (3600 * 1000); // 计算小时数后剩余的毫秒数
				var minutes = hours * 60 + Math.floor(hoursMS / (60 * 1000));
				// 计算相差秒数
				// var minutesMS = hoursMS % (60 * 1000); // 计算分钟数后剩余的毫秒数
				// var second = minutesMS / 1000;
				// console.log(minutes + "分");
				return minutes
			},
			onSearch() {
				this.page = 1
				this.OrderList = []
				this.onAuctionorderOrderList()
			},
			onNavClick(e) {
				this.navId = e
				this.isClick = true
				clearTimeout(this.opacityTimer)
				this.opacityTimer = setTimeout(() => {
					this.isClick = false
				}, 2000)
				this.onScrollIntoView(e)
			},
			onorderclick() {
				this.navId = 4
				this.page = 1
				this.OrderList = []
				this.onAuctionorderOrderList()
			},
			// 竞拍记录
			onAuctionorderOrderList() {
				this.$http.post(this.$apiObj.AuctionorderOrderList, {
					auction_goods_id: this.id,
					page: this.page,
					pagenum: this.pagenum,
					search: this.search
				}).then(res => {
					if (res.code == 1) {
						this.totalPageNums = res.data.total
						this.OrderList = this.page == 1 ? res.data.data : [...this.OrderList, ...res.data.data]
					}
				})
			},
			// 评价列表
			onOrderGoodsJudgeList() {
				this.$http.post(this.$apiObj.OrderGoodsJudgeList, {
					goods_id: this.shopCont.goods_id,
					type: 1,
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						this.goods_judge = res.data.goods_judge
						this.normal_judge = res.data.normal_judge
						this.bad_judge = res.data.bad_judge
						this.totalPageNum = res.data.list.total
						this.JudgeList = this.page == 1 ? res.data.list.data : [...this.JudgeList, ...res.data.list
							.data
						]
					}
				})
			},
			// 个人信息获取剩余竞拍次数
			onMineInfos() {
				this.isauctionNum = ''
				this.pay_pwd=''
				this.orderPayList.forEach(item=>{
					item.isShow=false
				})
				this.$http.post(this.$apiObj.MineInfo, {
					auction_goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						this.money = res.data.invite_money_balance
						this.balance = res.data.recharge_money_balance
						this.auction_num = (this.shopCont.auction_type == 2 && this.shopCont.total_least_num ==
								0) ? res.data.auction_num : (res.data.auction_num === -1) ? this.shopCont
							.total_least_num : (res.data.auction_num < this.shopCont.total_least_num) ? res.data
							.auction_num : this.shopCont.total_least_num
						// this.auction_num = 10
						if (res.data.auction_num !== 0) {
							this.qiangpaiShow = true
							// this.$refs.qiangpaiShow.open()
						} else {
							this.$refs.pwdPopup.open()
						}
					}
				})
			},
			onQueryClick() {
				this.qiangpaiShow = false
				// this.$refs.qiangpaiShow.close()
			},
			// 点击提交抢拍次数数据
			onBtnSub() {
				if (this.isauctionNum > 10000) return uni.showToast({
					icon: 'none',
					title: this.$t('zdcsbn')
				})
				// 请输入抢拍次数
				if (!this.isauctionNum) return uni.showToast({
					icon: 'none',
					title: this.$t('user.auctionM.qtxqpcs')
				})
				if (this.shopCont.auction_type == 1) {
					// 限额竞拍
					// 判断抢拍次数 > 剩余次数 return
					if (this.isauctionNum > this.auction_num) return uni.showToast({
						icon: 'none',
						title: this.$t('auction.detail.title') + '：' + this.auction_num
					})
				} else {
					// 限时     限拍
					if (this.auction_num != -1) {
						if (this.isauctionNum > this.auction_num) return uni.showToast({
							icon: 'none',
							title: this.$t('auction.detail.title') + '：' + this.auction_num
						})
					}
				}
				if (!this.isauctionNum) return uni.showToast({
					icon: 'none',
					title: this.$t('user.auctionM.qtxqpcs')
				})
				this.shopNum = (this.shopCont.auction_price * Number(this.isauctionNum)).toFixed(2)
				// this.$refs.qiangpaiShow.close()
				this.qiangpaiShow = false
				this.jingpaiShow = true
				// this.$refs.jingpaiShow.open()
			},
			onQuanClick(item) {
				item.isShow = !item.isShow
			},
			clickItem() {},
			onChange(e) {
				this.timeData = e
			},
			change(e) {
				this.current = e.detail.current
			},
			// 商品关注、取消关注
			onMineFocus(e) {
				this.$http.post(this.$apiObj.MineFocus, {
					type: e,
					data_id: e == 3 ? this.shopCont.id : this.shopCont.admin_id
				}).then(res => {
					if (res.code == 1) {
						if (e == 3) {
							if (this.shopCont.goods_focus == 1) {
								uni.showToast({
									icon: 'none',
									title: this.$t('auction.detail.querygz')
								})
								this.shopCont.goods_focus_total--
								this.shopCont.goods_focus = 0
							} else {
								uni.showToast({
									icon: 'none',
									title: this.$t('auction.detail.guanzhuchenggong')
								})
								this.shopCont.goods_focus_total++
								this.shopCont.goods_focus = 1
							}
						}
						if (e == 2) {
							if (this.shopCont.shop.shop_focus == 1) {
								uni.showToast({
									icon: 'none',
									title: this.$t('home.shop.yiquery')
								})
								this.shopCont.shop.shop_focus = 0
							} else {
								uni.showToast({
									icon: 'none',
									title: this.$t('home.shop.guanzhuchenggong')
								})
								this.shopCont.shop.shop_focus = 1
							}
						}
						this.onAuctionDetail()
					}
				})
			},
			// 点击原价购买
			onGoShop() {
				let shopCont = {
					total: this.shopCont.price, //总价
					cartdata: [{
						admin_id: this.shopCont.shop.id, //店铺id
						shop_name: this.shopCont.shop.shop_name, //店铺名称
						list: [{
							goods_id: this.shopCont.id, //商品id
							price: this.shopCont.price, // 价格
							num: 1, //购买数量
							good_name: this.shopCont.goods_name, //商品名称
							image: this.shopCont.images[0], //图片
							admin_id: this.shopCont.image, //店铺id
							// attrs: this.attrs,// 规格
							// goods_spec_id: this.goods_spec_id,// sku id
							// spec_sku_id: this.spec_sku_id, //sku属性id的组合
							// stock_num: this.stock_num,//库存
						}]
					}]
				}
				uni.navigateTo({
					url: './submit?shopCont=' + JSON.stringify(shopCont)
				})
			},
			// 点击有剩余次数取消
			ongoPayQuery() {
				this.jingpaiShow = false
				// this.$refs.jingpaiShow.close()
			},
			// 提交订单
			onOrderReferCartOrder() {
				this.$http.post(this.$apiObj.AuctionorderReferOrder, {
					auction_type: 2, // 1竞拍商品原价购买，2参与竞拍价购买
					num: this.isauctionNum, // 购买数量
					coupon_id: '', // 优惠券id
					address_id: '', // 地址id
					remark: '', // 备注
					money: this.shopNum, // 总金额
					auction_goods_id: this.shopCont.id, // 竞拍商品id
				}).then(res => {
					if (res.code == 1) {
						// this.major_no = res.data.major_no
						this.order_no = res.data.order_no
						// this.$refs.jingpaiShow.close()
						this.jingpaiShow = false
						this.zhifushow = true
					}
				})
			},
			// 点击竞拍去支付
			onPayClick() {
				let isNum = []
				for (let i in this.orderPayList) {
					if (this.orderPayList[i].isShow) {
						isNum.push(this.orderPayList[i].id)
					}
				}
				if (isNum.length < 1) return uni.showToast({
					icon: 'none',
					title: this.$t('auction.detail.qxzzffs')
				})
				this.zhifushow = false
				if (isNum.length >= 1) {
					// 余额支付弹框
					this.zhipassShow = true
				} else if (isNum.length > 5) {
					/**
					if (this.MineCont === null) return uni.showToast({
						icon: 'none',
						title: this.$t('smrz')
					})
					if (this.MineCont.status == 0) return uni.showToast({
						icon: 'none',
						title: this.$t('smrzshh')
					})
					if (this.MineCont.status == '-1') return uni.showToast({
						icon: 'none',
						title: this.$t('smrzwtg')
					})
					this.$http.post(this.$apiObj.AuctionorderMalaysiaPay, {
						order_no: this.order_no,
						money: this.shopNum
					}).then(res => {
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
					})**/
				}
			},
			// 关闭支付密码
			onPwdQuery() {
				this.zhipassShow = false
				// this.$refs.zhipassShow.close()
				// uni.navigateBack({ delta: 1 })
			},
			// 点击支付成功取消按钮
			onpayQuery() {
				this.zhichenShow = false
				// this.$refs.zhichenShow.close()
			},
			// 点击支付密码
			onPwdClick() {
				if (!this.pay_pwd) return uni.showToast({
					title: this.$t('auction.detail.qingsshumm'),
					icon: 'none'
				})
				const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))
				let arr = []
				this.orderPayList.forEach(item => {
					if (item.isShow) arr.push(item.id)
					else arr.push(10)
				})
				this.$http.post(this.$apiObj.AuctionorderBalancePay, {
					order_no: this.order_no, // 小订单号
					money: this.shopNum, // 支付总金额
					pay_pwd: pay_pwd, // rsa加密后的支付密码
					is_use_recharge: arr[0] == 1 ? 1 : 2,
					is_use_invite: arr[1] == 2 ? 1 : 2
				}).then(res => {
					if (res.code == 1) {
						this.onAuctionDetail()
						setTimeout(() => {
							this.onMineInfo()
							this.pay_pwd = ''
							this.zhipassShow = false
							this.zhichenShow = true
						}, 500);
					}
				})
			},
			// 个人信息获取剩余竞拍次数
			onMineInfo() {
				this.isauctionNum = ''
				this.$http.post(this.$apiObj.MineInfo, {
					auction_goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						this.money = res.data.money
						// this.auction_num = res.data.auction_num
						this.auction_num = (this.shopCont.auction_type == 2 && this.shopCont.total_least_num ==
								0) ? res.data.auction_num : (res.data.auction_num === -1) ? this.shopCont
							.total_least_num : (res.data.auction_num < this.shopCont.total_least_num) ? res.data
							.auction_num : this.shopCont.total_least_num

					}
				})
			},
			// 点击抢拍
			onQiangpai() {
				this.isauctionNum = ''
				// if (this.shopCont.auction_type == 2) {
				//   this.onOrderReferCartOrder()
				// } else {
				this.zhichenShow = false
				this.qiangpaiShow = true
				// this.$refs.qiangpaiShow.open()
				//   if (this.auction_num) {
				//     this.onOrderReferCartOrder()
				//   } else {
				if (this.auction_num || this.shopCont.remain_auction_num) {
					this.qiangpaiShow = true
					// this.$refs.qiangpaiShow.open()
				} else {
					this.$refs.pwdPopup.open()
				}
				//   }
				// }
			},
			toggle1Close() {
				this.zhifushow = false
			},
			onQuery() {
				this.$refs.pwdPopup.close()
			},
			onFengxiang() {
				this.$refs.pwdPopup.close()
				this.onfenxingShow = true
			},
			onFengxiangClick() {
				this.onMineInfo()
				this.onfenxingShow = true
			},
			// 取消分享
			toggle2Close() {
				this.onfenxingShow = false
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
			// 复制订单号
			onnumidClick(item) {
				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = item.num_id; //要复制的订单编号
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
					data: item.num_id,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			},
			//倒计时
			timerDjs(event) {
				let time = Date.parse(new Date()) / 1000
				let diff = event - time
				let _diffData;
				if (diff > 0) {
					let d = Math.floor(diff / (3600 * 24)) //获取天数
					let h = Math.floor((diff % (3600 * 24)) / (60 * 60)) //获取时
					let m = Math.floor(((diff % (3600 * 24)) % (60 * 60)) / 60) //获取分
					let s = Math.floor(diff % 60) //获取秒
					d = d < 10 ? "0" + d : d;
					h = h < 10 ? "0" + h : h;
					m = m < 10 ? "0" + m : m;
					s = s < 10 ? "0" + s : s;
					_diffData = [d, h, m, s]
				} else {
					_diffData = ["00", "00", "00", "00"];
				}
				return _diffData;
			},
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			if (this.navId == 3) {
				// 评价列表
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				this.onOrderGoodsJudgeList()
			} else if (this.navId == 4) {
				console.log(this.totalPageNum, this.page * this.pagenum);
				// 历史竞拍
				if (this.totalPageNums <= this.page * this.pagenum) return
				this.page++
				this.onAuctionorderOrderList()
			}
		},
	}
</script>
<style>
	page {
		background: #f9f9f9;
	}
</style>
<style lang="less" scoped>
	* {
		box-sizing: border-box;
	}

	/deep/.u-count-down__text {
		width: 100%;
		color: #fff !important;
		font-size: 32rpx !important;
	}

	/deep/.uni-progress-inner-bar {
		border-radius: 9rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 9rpx !important;
	}

	a {
		color: rgb(44, 44, 44);
		text-decoration: none;
	}

	//猜你喜欢
	.guess-layout {
		width: 100%;
		margin: 24rpx 0;
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		background: #ffffff;

		.gl-title {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.gl-title-left {
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
				}

				p {
					margin-left: 12rpx;
					color: rgb(51, 51, 51);
					font-size: 32rpx;
				}
			}
		}

		.gl-content {
			width: 100%;
			margin-top: 26rpx;

			.gl-content-item {
				width: 220rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-bottom: 28rpx;

				.item-cover {
					width: 220rpx;
					height: 220rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 16rpx;
					}
				}

				.item-text {
					width: 100%;
					margin: 12rpx 0;
					box-sizing: border-box;
					color: rgb(51, 51, 51);
					font-size: 20rpx;
					line-height: 32rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					overflow: hidden;
					-webkit-box-orient: vertical;
				}

				.item-price {

					span {
						color: rgb(255, 57, 57);
						font-size: 32rpx;

						&:first-child {
							font-size: 20rpx;
						}
					}
				}
			}
		}

		.gl-line {
			margin: 20rpx auto 0;
			width: 36rpx;
			height: 6rpx;
			background: #E8E8E8;
			position: relative;
			border-radius: 40rpx;

			.gl-line-bg {
				width: 22rpx;
				height: 6rpx;
				background: rgb(10, 198, 142);
				border-radius: 40rpx;
				position: absolute;
				left: 0;
				top: 0;
				transition: left .5s;
			}
		}
	}

	.detail-header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		background: #FFF;
		// box-shadow: 0px 4rpx 14rpx rgba(190, 190, 190, 0.3);
	}


	/*新的头部*/
	.detail-head {
		position: relative;
		widows: 100%;
		height: 88rpx;
		padding-top: 88rpx;
		display: flex;
		align-items: center;
		// background: #fff;

		image {
			position: absolute;
			width: 56rpx;
			height: 56rpx;
			z-index: 10;
		}

		.return {
			left: 20rpx;
		}

		.gwc {
			right: 112rpx;
		}

		.fx {
			right: 32rpx;
		}

		view {
			width: 100%;
			font-size: 40rpx;
			font-weight: 700;
			color: rgb(10, 198, 142);
			text-align: center;
		}
	}

	//价格与时间
	.detail-price {
		width: 100%;
		height: 90rpx;
		background: rgb(255, 57, 57);
		padding: 0 32rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.detail-price-left {

			.detail-price-new {
				font-size: 40rpx;
				font-weight: 700;
				color: rgb(255, 255, 255);
			}

			.detail-price-old {
				font-size: 24rpx;
				color: rgb(248, 248, 248);
				text-decoration: line-through;
			}
		}

		.detail-price-time {
			font-size: 32rpx;
			color: rgb(255, 255, 255);
		}
	}

	.detail-title {
		width: 100%;
		background: rgb(255, 255, 255);
		padding: 24rpx 32rpx 20rpx;
		box-sizing: border-box;
		line-height: 48rpx;
		font-size: 32rpx;
		color: rgb(44, 44, 44);
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	//标签
	.li-tags {
		width: 100%;
		background: rgb(255, 255, 255);
		padding: 0 32rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;

		.tag {
			margin: 0 12rpx 12rpx 0;
			padding: 4rpx 10rpx;
			box-sizing: border-box;
			border: 1rpx solid rgb(204, 204, 204);
			border-radius: 10rpx;
			color: rgb(102, 102, 102);
			font-size: 16rpx;
		}

		.li-icon {
			width: 38rpx;
			height: 38rpx;
			margin: 0 20rpx 12rpx 0;

			image {
				width: 100%;
			}
		}
	}

	.progress-layout {
		width: 100%;
		background: rgb(255, 255, 255);
		padding: 12rpx 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.pl-box {
			width: 400rpx;
			height: 32rpx;
			box-sizing: border-box;
			background: rgba(255, 0, 0, 0.1);
			border: 2rpx solid rgb(255, 197, 182);
			border-radius: 100rpx;
			overflow: hidden;
			display: flex;
			align-items: center;

			span {
				height: 32rpx;
				background: linear-gradient(270.00deg, rgba(234, 155, 68, 1.00), rgba(255, 86.53, 48.68, 1.00) 100%);
				border-radius: 50px;
			}
		}
	}

	.operate-layout {
		width: 100%;
		background: rgb(255, 255, 255);
		padding: 20rpx 0 32rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;

		.ol-container {
			margin: 0 64rpx;
			display: flex;
			align-items: center;

			image {
				width: 32rpx;
			}

			p {
				margin-left: 12rpx;
				color: rgb(102, 102, 102);
				font-size: 24rpx;
			}
		}
	}

	//幸运之星
	.detail-luck-star {
		position: relative;
		width: 710rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		background: #fff;
		border-radius: 16rpx;
		margin: 40rpx auto 20rpx auto;

		.detail-luck-star-name {
			font-size: 24rpx;
			color: rgb(255, 78, 47);
			margin-left: 30rpx;
		}

		.detail-luck-star-info {
			position: absolute;
			right: 30rpx;
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
	}

	//参拍人数
	.detail-canyu {
		width: 710rpx;
		padding: 20rpx 0;
		background: #fff;
		border-radius: 16rpx;
		margin: 40rpx auto;

		.detail-canyu-name {
			font-size: 24rpx;
			color: rgb(44, 44, 44);
			margin-left: 30rpx;
		}

		.detail-canyu-jdt {
			width: 650rpx;
			height: 18rpx;
			margin: 30rpx auto;

			.jdt {
				font-size: 24rpx;
			}
		}

		.detail-canyu-list {
			width: 630rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			margin: 0 auto;

			.detail-canyu-item {
				margin-right: 30rpx;
				margin-bottom: 10rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}

			.detail-canyu-more {
				margin-top: -12rpx;
				margin-right: 30rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}
		}

		.detail-canyu-zuihou {
			font-size: 24rpx;
			color: rgb(190, 190, 190);
			margin-left: 30rpx;
		}

	}

	//评论
	.detail-comment {
		width: 710rpx;
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 16rpx;
		margin: 24rpx auto;

		.detail-comment-head {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 24rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgb(204, 204, 204);

			.detail-comment-tit {
				font-size: 28rpx;
				font-weight: 700;
				color: rgb(51, 51, 51);

				span {
					font-size: 24rpx;
					color: rgb(102, 102, 102);
				}
			}

			.detail-comment-more {
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				display: flex;
				align-items: center;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 8rpx;
				}
			}

		}

		.detail-comment-item {
			width: 100%;
			margin-top: 32rpx;

			.detail-comment-item-head {
				width: 100%;
				display: flex;
				align-items: center;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}

				p {
					margin-left: 16rpx;
					font-size: 24rpx;
					color: rgb(51, 51, 51);
				}

				.head-level {
					width: 100rpx;
					height: 35rpx;
					margin-left: 20rpx;
					background: rgb(253, 240, 226);
					border-radius: 100rpx;
					display: flex;

					.head-level-icon {
						width: 35rpx;
						height: 35rpx;

						image {
							width: 100%;
						}
					}

					.head-level-num {
						margin-left: 8rpx;
						color: rgb(219, 132, 37);
						font-size: 20rpx;
						line-height: 35rpx;
					}
				}
			}

			.detail-comment-item-info {
				width: 100%;
				margin-top: 24rpx;
				line-height: 36rpx;
				color: rgb(44, 44, 44);
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}

		.detail-comment-not {
			width: 100%;
			margin-top: 24rpx;
			font-size: 24rpx;
			color: #999;
			text-align: center;
		}
	}

	//输入密码
	.pay-pwd {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-60%) translateX(-50%);

		.pay-pwd-img {
			display: block;
			width: 600rpx;
			height: 600rpx;
			margin: 0 auto -210rpx auto;
		}

		.pay-pwd-close {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			display: block;
			width: 60rpx;
			height: 60rpx;
			z-index: 10;
		}

		.pay-pwd-info {
			width: 686rpx;
			// height: 428rpx;
			padding: 40rpx 0;
			background: #FFF;
			border: 4rpx solid rgb(10, 198, 142);
			border-radius: 16rpx;

			.pay-pwd-info-tit {
				width: 80%;
				font-size: 40rpx;
				font-weight: bold;
				text-align: center;
				margin: 0 auto;
			}

			.pay-pwd-info-line {
				width: 600rpx;
				border-bottom: 2rpx solid rgb(189, 189, 189);
				margin: 20rpx auto;
			}

			.pay-pwd-info-price {
				width: 100%;
				font-size: 38rpx;
				color: rgb(10, 198, 142);
				text-align: center;
			}

			.pay-pwd-info-input {
				width: 520rpx;
				height: 80rpx;
				background: #f5f5f5;
				border-radius: 10rpx;
				padding: 0 20rpx;
				margin: 20rpx auto;

				.input {
					width: 100%;
					height: 80rpx;
					font-size: 28rpx;
					text-align: left;
				}
			}

			.pay-pwd-info-btn {
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #fff;
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 16rpx;
				margin: 40rpx auto;
			}

			.pay-pwd-list {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 60rpx;

				view {
					width: 220rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 28rpx;
					text-align: center;
					border-radius: 16rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.pay-pwd-list-cancel {
					border: 2rpx solid rgb(10, 198, 142);
				}

				.pay-pwd-list-ok {
					color: #fff;
					background: rgb(10, 198, 142);
					margin-left: 40rpx;
				}
			}

		}

	}


	//商家信息
	.new-shop {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;

		.new-shop-logo {
			width: 108rpx;
			height: 108rpx;
			border-radius: 50%;
			margin-right: 30rpx;
		}

		// .new-shop-info{
		// 	display: flex;
		// }

		.new-shop-info-des {
			width: 300rpx;
			height: 108rpx;
			// margin-top: 10rpx;
			// margin-bottom: 20rpx;

			.new-shop-info-name {
				width: 100%;
				color: rgb(51, 51, 51);
				font-size: 32rpx;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.new-shop-info-dy {
			position: absolute;
			top: 50%;
			right: 0rpx;
			transform: translateY(-50%);
			min-width: 140rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			padding: 0 32rpx;
			background: rgb(10, 198, 142);
			border-radius: 30rpx;
		}

		.new-shop-info-nums {
			max-width: 300rpx;
			font-size: 24rpx;
			color: rgb(44, 44, 44);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-top: 20rpx;

			.new-shop-info-hp {

				span {
					color: rgb(255, 78, 47);
				}
			}
		}
	}

	.new-shop-line {
		width: 690rpx;
		border-bottom: 2rpx solid rgb(190, 190, 190);
		margin-top: 20rpx;
	}

	.agree-box {
		padding: 30rpx;
	}

	.qiangpaiShow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-60%) translateX(-50%);

		.kct {
			position: relative;
			width: 640rpx;
			height: 420rpx;
			display: block;
			margin: 0 auto -60rpx auto;
			z-index: 10;
		}

		.query {
			position: absolute;
			top: 20rpx;
			right: 30rpx;
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			border: 1rpx solid #000;
			padding: 10rpx;
			z-index: 20;

			image {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				width: 20rpx;
				height: 20rpx;
			}
		}

		.qiangpaiCont {
			width: 686rpx;
			background: #fff;
			position: relative;
			padding: 60rpx 0 50rpx 0;
			border: 4rpx solid rgb(10, 198, 142);
			border-radius: 16rpx;
			z-index: 9;

			.center {
				.maxtitle {
					position: relative;
					display: flex;
					align-items: center;

					image {
						position: absolute;
						left: 62rpx;
						width: 72rpx;
						height: 72rpx;
					}

					.title {
						width: 100%;
						text-align: center;
						font-size: 36rpx;
						color: #000;
						font-weight: bold;
						margin-left: 20rpx;
					}
				}

				.cent {
					margin: 30rpx auto 40rpx;
					display: flex;

					.txt {
						margin-top: 5rpx;
						font-size: 30rpx;
						font-weight: bold;
						margin-right: 10rpx;
						max-width: 180rpx;
					}

					.cont {
						width: 566rpx;
						margin: 26rpx auto 0;
						text-align: center;

						uni-input {
							width: 566rpx;
							height: 80rpx;
							border-radius: 16rpx;
							border: 2rpx solid rgb(10, 198, 142);
							font-size: 28rpx;
						}

						.num {
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 24rpx;
							margin-top: 30rpx;
							color: rgb(10, 198, 142);
						}
					}
				}

				.qiangpai-btn {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.qiangpai-cancel {
						width: 206rpx;
						height: 70rpx;
						border-radius: 16rpx;
						line-height: 70rpx;
						text-align: center;
						font-size: 32rpx;
						color: #fff;
						background: rgb(10, 198, 142);
						margin-right: 30rpx;
					}

				}

				.btnsub {
					width: 406rpx;
					height: 70rpx;
					border-radius: 16rpx;
					line-height: 70rpx;
					text-align: center;
					font-size: 32rpx;
					color: #fff;
					background: rgb(10, 198, 142);
				}
			}
		}

	}

	.jingpai-ok {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-60%) translateX(-50%);

		.kct {
			// position: absolute;
			// top: 0;
			width: 640rpx;
			height: 420rpx;
			display: block;
			margin: 0 auto -60rpx auto;
		}
	}

	.jingpai-pop {
		width: 686rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 45rpx 0;
		border: 4rpx solid rgb(10, 198, 142);

		.title {
			width: 100%;
			font-size: 32rpx;
			color: #000;
			font-weight: bold;
			text-align: center;
		}

		.txt {
			width: 100%;
			margin-top: 24rpx;
			font-size: 24rpx;
			color: rgb(10, 198, 142);
			text-align: center;
		}

		.cent {
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 42rpx;
			justify-content: center;

			.imgs {
				width: 26rpx;
				height: 26rpx;
				margin-right: 10rpx;
			}

			.txt1 {
				max-width: 240rpx;
				font-size: 24rpx;
				color: #999;
				text-align: center;
				margin: 0 10rpx;
			}

			.txt2 {
				max-width: 240rpx;
				font-size: 24rpx;
				color: #000;
				text-align: center;
			}
		}

		.cont {
			margin-top: 50rpx;
			display: flex;
			justify-content: center;

			.right {
				display: flex;

				view {
					width: 240rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 32rpx;
					text-align: center;
					border-radius: 16rpx;
				}

				.name {
					font-size: 32rpx;
					color: #999;
					border: 1rpx solid rgb(10, 198, 142);
					margin-right: 97rpx;
				}

				.ljfx {
					color: #fff;
					background: rgb(10, 198, 142);

				}
			}
		}
	}


	.detail-page {
		padding-bottom: 130rpx;

		.detail-big {
			// margin-top: 176rpx;

			/deep/ uni-swiper {
				position: relative;
				height: 600rpx;
			}

			.big-img {
				width: 100%;
				height: 600rpx;
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

		//auct-nav S
		.auct-nav {
			width: 100%;
			padding: 40rpx 0 30rpx 0;
			display: flex;
			justify-content: space-between;
			text-align: center;


			.li {
				width: 20%;
				font-size: 26rpx;
				text-align: center;
				position: relative;
				text-align: center;
			}

			.active {
				color: #1DD181;
				font-weight: 550;
			}

			.active::after {
				width: 32rpx;
				height: 5rpx;
				background: #1DD181;
				border-radius: 3rpx;
				position: absolute;
				bottom: -10rpx;
				left: 50%;
				margin-left: -16rpx;
				display: block;
				content: "";
			}
		}

		.detailCont {
			width: 750rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			padding: 30rpx;
			// margin-top: -30rpx;
			position: relative;
			z-index: 11;

			.title {
				// width: 680rpx;
				font-size: 28rpx;
				color: #000;
				line-height: 48rpx;
				font-weight: bold;
				word-break: break-all;
			}

			.mouch {
				margin-top: 44rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.qiangpaijia {
						font-size: 24rpx;
						color: #FF4E2F;
					}

					.shichangjia {
						font-size: 24rpx;
						text-decoration: line-through;
						color: #999999;
						margin-left: 20rpx;
					}
				}

				.time {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #FF4E2F;
				}
			}


		}

		.canpaiCont {
			width: 750rpx;
			background: #ffffff;
			margin-top: 20rpx;
			padding: 30rpx;

			.jingpai {
				font-size: 24rpx;
				color: #000;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.li-b {
				margin-top: 46rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.li-pro {
					width: 481rpx;
					height: 12rpx;
					background: #f5f5f5;
					border-radius: 6rpx;
					position: relative;

					.pro {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 1;
						height: 12rpx;
						background: #FF4E2F;
						border-radius: 6rpx;
					}
				}

				text {
					font-size: 24rpx;
					color: #FF4E2F;
					margin-left: 16rpx;
				}
			}

			.userCont {
				margin-top: 12rpx;
				display: flex;
				flex-wrap: wrap;
				padding-left: 15rpx;

				.list {
					margin-top: 25rpx;
					width: 65rpx;
					height: 65rpx;
					line-height: 65rpx;
					text-align: center;
					background: #f5f5f5;
					border-radius: 50%;
					font-size: 24rpx;
					color: #000;
					margin-right: 10rpx;

					&:nth-child(9n) {
						margin-right: 0;
					}

					image {
						width: 65rpx;
						height: 65rpx;
						border-radius: 65rpx;
						display: block;
					}
				}
			}

			.shuliang {
				margin-top: 36rpx;
				display: flex;
				justify-content: space-between;

				.right {
					display: flex;
					align-items: center;

					.list {
						display: flex;
						align-items: center;
						margin-left: 44rpx;

						image {
							width: 30rpx;
							height: 28rpx;
							margin-right: 13rpx;
						}
					}
				}
			}
		}

		//detail-five S
		.detail-five {
			margin: 20rpx 0 24rpx 0;
			padding: 30rpx;
			background: #fff;

			.five-hd {
				// display: flex;
				// // align-items: center;
				// justify-content: space-between;

				.logo {
					width: 80rpx;
					height: 80rpx;
					border-radius: 100%;
					overflow: hidden;
					min-width: 80rpx;
					max-width: 80rpx;
					margin-right: 20rpx;
				}

				.conter {
					width: 690rpx;
					margin: 10rpx auto 0 auto;

					.five-head {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.hd-fl {
							display: flex;
							align-items: center;
							flex: 1;

							.txt {
								.t {
									font-size: 28rpx;
								}

								.c {
									width: 100%;
									font-size: 24rpx;
									word-break: break-all;
									margin-top: 10rpx;

									image {
										display: block;
										width: 40rpx;
										height: 40rpx;
										margin: 0 auto;
									}
								}
							}

							.not-all {
								word-break: break-all;
								margin-top: 10rpx;

								view {
									font-size: 24rpx;
									max-height: 100rpx;
									overflow: hidden;
								}

								image {
									display: block;
									width: 40rpx;
									height: 40rpx;
									margin: 10rpx auto 0 auto;
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

					.cent {
						margin-top: 20rpx;
						display: flex;
						align-items: center;
						font-size: 24rpx;
						color: #FF4E2F;

						.list {
							margin-right: 20rpx;
						}
					}
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
		.guanzhuCont {
			width: 710rpx;
			margin-top: 46rpx;
			display: flex;
			margin: 46rpx auto 0 auto;

			.list {
				width: 33.33%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 22rpx;
				color: #FF4E2F;
				font-weight: bold;
				text-align: center;

				image {
					width: 80rpx;
					height: 80rpx;
					display: block;
					margin-right: 10rpx;
				}

				.num {
					margin-top: 10rpx;
					max-width: 120rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.txt {
					// width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		//detail-fixed S

		.bottom-layout {
			width: 100%;
			padding: 6rpx 32rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #fff;
			z-index: 99;

			.bl-left {
				display: flex;
				align-items: center;

				.bl-left-box {
					text-align: center;

					image {
						width: 40rpx;
					}

					p {
						color: rgb(51, 51, 51);
						font-size: 20rpx;
					}
				}
			}

			.bl-right {
				display: flex;
				align-items: center;

				.bl-right-buy {
					width: 212rpx;
					height: 88rpx;
					margin: 0 12rpx;
					background: rgb(10, 198, 142);
					border-radius: 200rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.buy-name {
						color: rgb(255, 255, 255);
						font-size: 24rpx;
					}

					.buy-info {
						color: rgb(255, 255, 255);
						font-size: 28rpx;

						span {
							color: rgb(255, 255, 255);
							font-size: 16rpx;
						}
					}
				}

				.bl-right-add {
					width: 212rpx;
					height: 88rpx;
					margin: 0 12rpx;
					background: rgb(10, 185, 198);
					border-radius: 200rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					p {
						color: rgb(255, 255, 255);
						font-size: 24rpx;
					}
				}
			}

			.fixed-con {
				padding: 15rpx 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.fixed-fl {
					display: flex;
					align-items: center;
					flex: 1;

					// justify-content: space-between;
					.li {
						margin-right: 50rpx;
						text-align: center;

						.icon {
							display: flex;
							align-items: flex-end;
							margin-right: 22rpx;

							image {
								width: 60rpx;
								height: 60rpx;
							}

							span {
								font-size: 20rpx;
								color: rgb(44, 44, 44);
							}
						}

						.t {
							font-size: 22rpx;
							margin-top: 10rpx;
						}
					}

					.wenzi {
						margin-left: 8rpx;
						width: 74rpx;
						font-size: 22rpx;
						color: rgb(255, 78, 47);
					}
				}

				.fixed-fr {
					display: flex;
					align-items: center;

					.detail-btn {
						width: 240rpx;
						height: 88rpx;
						background: rgb(255, 78, 47);
						border-radius: 44rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
						color: #fff;
						// font-size: 28rpx;
						line-height: 36rpx;
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
	}

	// .jingpai-pop {
	// 	width: 660rpx;
	// 	background: #ffffff;
	// 	border-radius: 20rpx;
	// 	padding: 45rpx 40rpx;

	// 	.title {
	// 		font-size: 32rpx;
	// 		color: #000;
	// 		font-weight: bold;
	// 	}

	// 	.txt {
	// 		margin-top: 25rpx;
	// 		font-size: 28rpx;
	// 		color: #FF4E2F;
	// 	}

	// 	.cent {
	// 		margin-top: 42rpx;
	// 		display: flex;
	// 		align-items: center;

	// 		.imgs {
	// 			width: 26rpx;
	// 			height: 26rpx;
	// 		}

	// 		.txt1 {
	// 			font-size: 24rpx;
	// 			color: #999;
	// 			margin: 0 10rpx;
	// 		}

	// 		.txt2 {
	// 			font-size: 24rpx;
	// 			color: #000;
	// 		}
	// 	}

	// 	.cont {
	// 		margin-top: 50rpx;
	// 		display: flex;
	// 		justify-content: space-between;

	// 		.right {
	// 			display: flex;

	// 			.name {
	// 				font-size: 32rpx;
	// 				color: #999;
	// 				margin-right: 97rpx;
	// 			}

	// 			.ljfx {
	// 				font-size: 32rpx;
	// 				color: #FF4E2F;
	// 			}
	// 		}
	// 	}
	// }

	//share-pop S
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

	//share-pop E
	//支付方式弹出 S
	.mode-pop {
		background: #ffffff;
		border-radius: 20rpx 20rpx 0px 0px;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;

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

		.cent {
			padding-top: 43rpx;
			text-align: center;

			.title {
				font-size: 26rpx;
				color: #222;
			}

			.txt {
				padding-top: 34rpx;
				padding-bottom: 38rpx;
				color: rgb(10, 198, 142);
				font-size: 46rpx;

				text {
					font-size: 24rpx;
				}
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
					background: rgb(10, 198, 142) !important;
					border-color: rgb(10, 198, 142) !important;
				}
			}
		}

		.mode-bot {
			padding: 50rpx 30rpx 50rpx 30rpx;
		}
	}

	//支付方式弹出 E

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
			background: #FF4E2F;
			border-radius: 40rpx;
			display: block;
			margin: 0 auto;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #fff;
		}
	}

	//支付密码弹出 E
	// 支付成功弹框
	.payConter {
		width: 660rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 48rpx 41rpx;

		.title {
			font-size: 30rpx;
			color: #000;
			font-weight: 600;
		}

		.txt {
			font-size: 28rpx;
			color: #5a56ff;
			padding: 26rpx 0;
		}

		.name {
			font-size: 28rpx;
			color: rgb(10, 198, 142);
		}

		.cont {
			margin-top: 45rpx;
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;
				align-items: center;

				.query {
					font-size: 32rpx;
					color: #999;
					margin-right: 96rpx;
				}

				.cen {
					font-size: 32rpx;
					color: rgb(10, 198, 142);
				}
			}
		}
	}

	// 支付成功弹框
	// 竞拍记录
	.jingpaiCont {
		// background: #fff;
		padding: 30rpx 0;

		.header {
			width: 686rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-radius: 30rpx;
			margin: 0 auto 30rpx auto;

			.left {
				width: 686rpx;
				height: 60rpx;
				background: #fff;
				border-radius: 35rpx;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
					margin: 0 9rpx 0 25rpx;
				}

				input {
					font-size: 24rpx;
					color: rgb(190, 190, 190);
				}
			}

			.name {
				font-size: 28rpx;
				color: #000;
			}
		}

		.jingpaiCont-jpjl {
			width: 100%;
			padding-top: 10rpx;
			padding-bottom: 30rpx;
			background: #fff;
		}

		.navCont {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;
			color: #FF4E2F;
			padding: 30rpx 0;
			text-align: center;
		}

		.conter {
			.list {
				padding-top: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;

				.kuan {
					position: relative;
					width: 80rpx;
					height: 80rpx;
					background: url('../../static/images/new/kuan.png') no-repeat;
					background-size: 80rpx 80rpx;
					margin-left: 30rpx;

					.user {
						position: absolute;
						top: 2rpx;
						left: 8rpx;

						image {
							width: 64rpx;
							height: 64rpx;
							border-radius: 50%;
							display: block;
							margin-left: 0;
						}
					}
				}

				.user {
					display: flex;
					align-items: center;

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						display: block;
						margin-left: 40rpx;
					}
				}

				.time {
					color: #999;
				}

				.name {
					max-width: 120rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.pay {}

				.order {
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-left: 5rpx;
						margin-right: 30rpx;
					}
				}

				.win {
					image {
						width: 45rpx;
						height: 28rpx;
					}
				}
			}
		}
	}

	//detail-four S
	.detail-four {
		background: #fff;
		padding: 0 30rpx;

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
	//detail-six S
	.detail-six {
		margin: 0rpx 0;

		.six-article {
			padding: 30rpx;
			word-break: break-all;
		}
	}

	.six-tit {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: 700;
		color: rgb(51, 51, 51);

		.line {
			width: 200rpx;
			height: 1rpx;
			background: rgb(204, 204, 204);
		}

		text {
			margin: 0 32rpx;
		}
	}

	//detail-six E
	.qiangpaicshu {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
	}

	.qiangpaiCont {
		position: absolute;
		left: calc(50% - 343rpx);
		top: calc(50% - 200rpx);
		position: relative;
		width: 686rpx;
		background: #fff;
		position: relative;
		padding: 50rpx 0;
		border-radius: 16rpx;

		.query {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			border: 1rpx solid #000;
			padding: 10rpx;
			box-sizing: content-box;

			image {
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				top: 10rpx;
			}
		}

		.center {
			.maxtitle {
				display: flex;
				align-items: center;

				image {
					width: 72rpx;
					height: 72rpx;
					margin-left: 62rpx;
				}

				.title {
					text-align: center;
					font-size: 36rpx;
					color: #000;
					font-weight: bold;
					margin-left: 20rpx;
				}
			}

			.cent {
				margin: 30rpx auto 60rpx;
				display: flex;

				.txt {
					margin-top: 5rpx;
					font-size: 30rpx;
					font-weight: bold;
					margin-right: 10rpx;
					max-width: 180rpx;
				}

				.cont {
					width: 566rpx;
					margin: 56rpx auto 0;
					text-align: center;

					input {
						width: 566rpx;
						height: 80rpx;
						border-radius: 16rpx;
						border: 2rpx solid #ff4e2f;
						font-size: 28rpx;
					}

					.num {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						margin-top: 30rpx;
						color: #FF4E2F;
					}
				}
			}

			.btnsub {
				width: 406rpx;
				height: 70rpx;
				background: #FF4E2F;
				border-radius: 16rpx;
				margin: 0 auto;
				line-height: 70rpx;
				text-align: center;
				font-size: 32rpx;
				color: #fff;
				background: #FF4E2F;
			}
		}
	}

	.jingpaiConent {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		z-index: 100000;
		left: 0;

		.jingpai-pop {
			position: absolute;
			top: calc(50% - 122rpx);
			left: calc(50% - 326rpx);
		}
	}

	.zhifuCont,
	.zhifummCont {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 100;
	}

	.public-pop {
		position: absolute;
		top: calc(50% - 192rpx);
		left: calc(50% - 275rpx);
	}

	.payConter {
		position: absolute;
		top: calc(50% - 148rpx);
		left: calc(50% - 325rpx);
	}

	.xinerCont {
		background: #fff;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;

		.title {
			border: 1rpx solid #FF4E2F;
			color: #FF4E2F;
			padding: 5rpx 10rpx;
			font-size: 30rpx;
			border-radius: 10rpx;
		}

		.name {}
	}

	.max-title {
		font-size: 32rpx;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}
</style>