<template>
	<view class="detail-page">
		<view class="detail-header" :style="`background: rgba(255,255,255,${myOpacity});`">
			<view class="detail-head">
				<image src="@/static/images/new-index/detail_btn_back.png" class="return" @click="toIndex()"></image>
				<image src="@/static/images/new-index/detail_btn_home.png" class="gwc" @click="toHome()"></image>
				<image src="@/static/images/new-index/detail_btn_share.png" class="fx" @click="onfenxingShow=true">
				</image>
				<view :style="`opacity: ${myOpacity};`">{{$t('top.shop')}}</view>
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
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="shopCont.images" :current="current"
				:mode="mode" field="content">
				<swiper class="swiper-box" autoplay="true" :circular="true" @change="change">
					<swiper-item v-for="(item,k) in shopCont.images" :key="k" @click="previewImgList()">
						<view :class="item.colorClass" class="swiper-item">
							<view class="big-img">
								<image class="image img" :src="item" mode="aspectFill" :draggable="false" />
							</view>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<block v-if="status">
			<!-- 价格 k钻 -->
			<view class="detail-money">
				<view>
					<view class="imgBottom">
						<image src="/static/images/kbrick/diamond.png" mode=""></image>
						<text class="zs">{{shopCont.wish_price}}</text>
						<p>(RM{{shopCont.wish_price}})</p>
					</view>
					<text
						style="text-decoration: line-through;">RM{{shopCont.litestore_goods_spec[0].goods_price}}</text>
				</view>
				<view>{{$t('new.xylb')}}</view>
			</view>
			<view class="detail-top">
				<view class="detail-title">{{shopCont.goods_name}}</view>

				<view class="li-tags">
					<view class="li-icon" v-for="(item,tagNub) in shopCont.litestore_tag" :key="tagNub">
						<image :src="item.image" mode="widthFix"></image>
						<text> <u-parse :content="isShopCont ? item.en_desc : item.zh_desc"></u-parse></text>
					</view>
				</view>

				<view class="operate-layout">
					<view class="ol-container" @click="onFocusProduct">
						<image
							:src="shopCont.goods_focus == 0 ? require('@/static/images/new-index/detail_icon_collect.png') : require('@/static/images/new-index/detail_icon_iscollect.png')"
							mode="widthFix"></image>
						<p>{{shopCont.wishing_pool_goods_focus_total}}</p>
					</view>
					<view class="ol-container">
						<image src="@/static/xuyuan/ax.png" mode="widthFix"></image>
						<p>{{shopCont.wishing_pool_goods_appear_watch_num_total}}</p>
					</view>
					<view class="ol-container" v-if="shopCont.wishing_pool_goods_lucky_total>0">
						<image src="@/static/xuyuan/jiang.png" mode="widthFix"></image>
						<p>{{shopCont.wishing_pool_goods_lucky_total}}</p>
					</view>
				</view>
			</view>

			<!--指标分析-->
			<view class="index_analysis">
				<view class="tit">
					<view>{{$t('detail.index_analysis')}}</view>
					<image src="/static/images/auction/wh.png"></image>
				</view>
				<view class="list">
					<view class="list-info">
						<view class="item"><text class="round"></text>{{$t('detail.success_rate')}}: <text
								class="num">{{(shopCont.success_rate*1).toFixed(2)}}%</text></view>
						<view class="item"><text class="round"></text>{{$t('detail.all_luck_start')}}: <text
								class="num">{{shopCont.add_up_lucky}}</text></view>
					</view>
					<view class="list-info">
						<view class="item"><text class="round"></text>{{$t('detail.luck_start_by')}}:
							<text class="num">{{shopCont.average_join_count}}</text>
						</view>
					</view>
			
				</view>
			</view>
			
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
					<view class="detail-comment-item" v-for="(item,i) in JudgeList.slice(0,2)"
						:key="i">
						<view class="detail-comment-item-head">
							<image :src="item.user.avatar" mode="aspectFill"></image>
							<p>{{item.user.nickname}}</p>
							<view class="head-level">
								<view class="head-level-icon">
									<image src="@/static/images/mine/mine_icon_vip.webp" mode="widthFix"></image>
								</view>
								<view class="head-level-num">Lv.{{item.user.level}}</view>
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
			<view class="guess-layout">
				<view class="gl-title">
					<view class="gl-title-left">
						<image src="@/static/images/new-index/detail_icon_guess.png" mode="widthFix"></image>
						<p>{{$t('detail.guess')}}</p>
					</view>
				</view>
				<view class="gl-content">
					<u-grid :border="false" @click="click">
						<u-grid-item v-for="(item,youLikeNub) in youLikeList.slice(0,6)" :key="youLikeNub"
							@click="toYouLikeOrHot(item.goods_id)">
							<view class="gl-content-item">
								<view class="item-cover">
									<image :src="item.image" mode="aspectFill">
									</image>
								</view>
								<view class="item-text">{{item.goods_name}}</view>
								<view class="item-price">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.wish_price}}</span>
								</view>
							</view>
						</u-grid-item>

					</u-grid>
				</view>
			</view>
			<!--商品详情-->
			<view class="detail-six">
				<div id="div3"></div>
				<view class="six-tit">
					<view class="line"></view>
					<text>{{$t('home.shop.title')}}</text>
					<view class="line"></view>
				</view>

				<!-- 详情图片 -->
				<view class="six-article" v-if="isShopCont" v-html="shopCont.english_content"></view>
				<view class="six-article" v-else v-html="shopCont.content"></view>

				<!-- 许愿相关 -->
				<view class="six-tit" style="margin-top: 30rpx;" id="div4">
					<view class="line"></view>
					<text>{{$t('home.shop.txt')}}</text>
					<view class="line"></view>
				</view>

				<!-- 配货中 -->
				<view class="wish" v-if="jingpaiList.length==0&&newsjingpaiList.length==0">
					<view class="ll-header-left"></view>
					<view class="distributed">
						<view class="con">
							<image src="../../static/x.png" class="conImg"></image>
							<view class="conTxt">
								{{$t('new.xycsm')}}
							</view>
						</view>
						<view class="btn" :class="shopCont.goods_focus == 0 ?'btn':'btn2'" @click="onFocusProduct">
							<image src="../../static/xuyuan/iconx.png" mode="" class="img"></image>
							<text
								class="txt">{{shopCont.goods_focus == 0?$t('auction.shoucang'):$t('auction.cancle')}}</text>
						</view>
						<view class="text">{{$t('auction.text')}}</view>
					</view>
				</view>
				<!-- 许愿列表 许愿中 -->
				<view class="wish" v-if="jingpaiList.length!=0">
					<view class="ll-header-left">
						<view class="left-icon">
							<image src="@/static/images/new-index/ongoing.png" mode="widthFix"></image>
						</view>
						<view class="left-text">
							<p>{{$t('tab.zzxy')}}</p>
							<span style="background: rgba(255, 64, 41, 0.4);"></span>
						</view>
					</view>
					<!-- 列表 -->
					<view class="ongingList">
						<view v-for="(item,i) in jingpaiList" :key="i" class="ongingList-item"
							@click="toDrawInfo(item.auction_goods_id)">
							<img :src="item.image" alt="" class="ongingListItemImg">
							<view>
								<text class="title">{{item.stage_num}} &nbsp;&nbsp;{{item.goods_name}}</text>
								<view class="jping-jd">
									<view class="jping-jd-box">
										<image :style="`width: ${(item.finish_rate*100).toFixed(0)}%;`"
											src="@/static/images/new-index/select-jd.png" mode="aspectFill"></image>
										<view class="box-progress">{{(item.finish_rate*100).toFixed(0)}}%</view>
									</view>
									<view class="new-list-item-right-jd-auth">
										<block v-for="(img,avatarNub) in item.new_auction_avatar" :key="avatarNub">
											<image :src="img"></image>
										</block>
									</view>
								</view>

								<view class="rowIndex">
									<view class="left">
										<image src="/static/images/kbrick/diamond.png" mode="widthFix" class="zsImg">
										</image>
										<span class="span">{{item.auction_price}}</span>
									</view>

									<view class="new-list-item-btm-btn"
										style="border: 1px solid rgb(10, 198, 142);font-weight: bold;">
										{{$t('home.psuccess.ckxq')}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 许愿列表 即将许愿 -->
			<view class="wish" v-if="newsjingpaiList.length!=0">
				<view class="ll-header-left">
					<view class="left-icon">
						<image src="@/static/images/new-index/start-soon.png" mode="widthFix"></image>
					</view>
					<view class="left-text">
						<p>{{$t('new.jjks')}}</p>
						<span style="background: rgb(254, 204, 171);"></span>
					</view>
				</view>
				<!-- 列表 -->
				<view class="ongingList">
					<view v-for="(item,i) in newsjingpaiList" :key="i" class="ongingList-item"
						@click="toDrawInfo(item.auction_goods_id)">
						<img :src="item.image" alt="" class="ongingListItemImg">
						<view class="zsItem">
							<text class="title" style="margin-top: 0;">{{item.stage_num}}
								&nbsp;&nbsp;{{item.goods_name}}</text>
							<view class="row">
								<view class="left">
									<image src="/static/images/kbrick/diamond.png" mode="widthFix" class="zsImg">
									</image>
									<span class="span">{{item.auction_price}}</span>
								</view>

								<view class="new-list-item-btm-btn" style="border: 1rpx solid rgb(248, 155, 0);">
									<image src="/static/images/new-index/time1.png" style="width: 20rpx;height: 20rpx;">
									</image>
									<u-count-down :time="item.datetime" format="HH:mm:ss"
										style="color: rgb(248, 155, 0);"></u-count-down>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 许愿列表 历史记录 -->
			<view class="wish" v-if="historyList.length!=0">
				<view class="ll-header-left">
					<view class="left-icon">
						<image src="@/static/images/new-index/historical.png" mode="widthFix"></image>
					</view>
					<view class="left-text">
						<p>{{$t('new.lsjl')}}</p>
						<span style="background: rgba(99, 97, 250, 0.4);"></span>
					</view>
				</view>
				<view class="hisy" v-for="(item,i) in historyList" :key="i" @click="toDrawInfo(item.auction_goods_id)">
					<view class="hisy_tit">{{item.goods_name}}</view>
					<view class="hisy_info">
						<image :src="item.user_info.avatar" class="hisy_info_auth"></image>
						<view class="hisy_info_name">{{item.user_info.nickname}}</view>
						<image src="/static/images/new-index/lv-start.png" class="hisy_info_jb"></image>
					</view>
					<view class="hisy_right">
						<image src="/static/images/kbrick/diamond.png"></image>
						<text>{{item.auction_price}}</text>
					</view>
				</view>
				<view class="bottomAdd" @tap="more" v-if="isOpen && historyList.length >0">查看更多
					<img src="/static/xuyuan/top.png" alt="" class="image">
				</view>
			</view>

		</block>
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
		<!--分享弹出 end-->
		<!-- 选择规格 star-->
		<uni-popup ref="specsPopup" type="bottom">
			<view class="specs-layout">
				<view class="sl-info">
					<view class="sl-info-cover">
						<image src="@/static/images/new-index/detail_demo_cover.png" mode="aspectFill"></image>
					</view>
					<view class="sl-info-text">
						<p class="text-specs">White,256GB,5G</p>
						<p class="text-price"><span>RM</span> 7999.00</p>
					</view>
					<view class="sl-info-close" @click="$refs.specsPopup.close()">
						<image src="@/static/images/close1.png" mode="widthFix"></image>
					</view>
				</view>
				<scroll-view class="sl-scroll" scroll-y>
					<view class="sl-option">
						<view class="sl-option-title">Color</view>
						<view class="sl-option-content">
							<view class="c-item active">White</view>
							<view class="c-item">Red</view>
							<view class="c-item">black</view>
							<view class="c-item">Yellow</view>
							<view class="c-item">Blue</view>
						</view>
					</view>
					<view class="sl-option">
						<view class="sl-option-title">Memory</view>
						<view class="sl-option-content">
							<view class="c-item">128GB</view>
							<view class="c-item">256GB</view>
							<view class="c-item">512GB</view>
							<view class="c-item">1TB</view>
						</view>
					</view>
					<view class="sl-option">
						<view class="sl-option-title">Network</view>
						<view class="sl-option-content">
							<view class="c-item">4G</view>
							<view class="c-item">5G</view>
						</view>
					</view>
				</scroll-view>
				<view class="sl-button">Confirm</view>
			</view>
		</uni-popup>
		<!-- 选择规格 end -->
		<!-- 选择地址 star-->
		<uni-popup ref="popupAddress" type="bottom">
			<view class="showaddress">
				<view class="top">
					<view>Shipping Address</view>
					<image src="../../static/images/close1.png" @click="$refs.popupAddress.close()"></image>
				</view>
				<scroll-view scroll-y style="height: 900rpx;">
					<view class="addresslist">
						<view class="address-item" v-for="(item,i) in addressList" :key="item.id"
							@click="editAddress(item)">
							<view class="item-head">
								<image src="../../static/images/new-index/address.png"></image>
								<view class="item-name">{{item.name}}</view>
								<view class="item-phone">{{item.mobile}}</view>
							</view>
							<view class="item-info">{{item.detail}}</view>
							<view class="item-default" v-show="item.is_default*1 == 1">Default Address</view>
							<view class="item-line" v-show="addressList.length>(i+1)"></view>
						</view>
					</view>
				</scroll-view>
				<view class="address-btn" @click="navToUrl('/pages/address/address')">{{$t('user.address.addxdz')}}
				</view>
			</view>
		</uni-popup>
		<!-- 选择地址 end -->
		
		<!--图片预览-->
		<u-overlay :show="showImages" :duration="400" :z-index="999" :opacity="1">
			<view class="show_images">
				<image src="/static/images/new-index/close.png" class="close" @click="showImages=false"></image>
				<view class="carousel">
					<u-swiper :list="shopCont.images" :autoplay="false" :height="375"></u-swiper>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import JudgeList from '@/components/judgeList'
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	import Mprogress from '@/components/progress.vue'
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		components: {
			JudgeList,
			Mprogress
		},
		data() {
			return {
				showImages:false,
				jingpaiList: [], // 竞拍列表
				max: 3, //默认展示几条数据
				isOpen: false,
				total: 6, //总条数
				historyList: [], // 历史竞拍
				btnShow: true,
				aa: false,
				status: false,
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
					},
					{
						id: 4,
						title: this.$t('newDetail.xy')
					}
				],
				navId: 1,
				current: 0,
				mode: 'nav',
				shopCont: '', // 商品详情
				JudgeList: [], //评论列表
				isShowAll: false,
				page: 1,
				pagenum: 5,
				newGoodsList: [], //最新竞拍商品列表
				startGoodsList: [], //即将开始列表
				historyList: [], //历史竞拍列表
				orderPayList: [{
					id: 1,
					title: this.$t('auction.detail.yuerzhifu'),
					isShow: false
				}, {
					id: 2,
					title: this.$t('auction.detail.sfzfu'),
					isShow: false
				}],
				onfenxingShow: false,
				myOpacity: 0,
				heightList: [], //存储每个锚点对应顶部的高度
				isClick: false,
				timer: '',
				isBottoming: false,
				youLikeList: [],
				addressList: [],
				addressInfo: {},
				newsjingpaiList: [], // 即将开始
			}
		},
		watch: {
			money: {
				handler(e, m) {
					if (e < 10) {
						this.orderPayList = [{
							id: 1,
							title: this.$t('auction.detail.yuerzhifu'),
							isShow: false
						}]
					} else {
						this.orderPayList = [{
							id: 1,
							title: this.$t('auction.detail.yuerzhifu'),
							isShow: false
						}, {
							id: 2,
							title: this.$t('auction.detail.sfzfu'),
							isShow: false
						}]
					}
				}
			}
		},
		onLoad(e) {
			if (e.invite_code) {
				uni.setStorageSync('invite_code', e.invite_code)
			}
			if (uni.getStorageSync('token')) {
				this.getAllAddress()
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

			this.id = e.goodsId
			// 商品详情
			this.getProductInfo()

			//获取最新竞拍列表
			// this.getNewList()
			this.onAuctionNewGoods()

			//获取即将开始列表
			// this.getStartGoodsList()
			this.onAuctionNotbeginGoods()

			//获取历史竞拍列表
			this.getHistoryList()


		},
		onShow() {

		},
		onHide() {
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
				else if (res.scrollTop >= this.heightList[1] && res.scrollTop < (this.heightList[2])) this.navId = 2
				else if (res.scrollTop >= this.heightList[2] && res.scrollTop < (this.heightList[3])) this.navId = 3
				else this.navId = 4
			}

		},
		mounted() {

		},
		methods: {
			toHome() {
				uni.switchTab({
					url: '/pages/auction/auction'
				})
			},
			// 点击竞拍列表
			onJingPai(item) {
				uni.setStorageSync('productInfo', true)
				uni.navigateTo({
					url: './detail?id=' + item.auction_goods_id
				})
			},
			//跳转页面
			newCk() {
				uni.navigateTo({
					url: './auctionT'
				})
			},
			// 查看更多
			more() {
				this.isOpen = !this.isOpen
			},
			// 即将开始
			onAuctionNotbeginGoods() {
				this.$http.post(this.$apiObj.AuctionNotbeginGoods, {
					sort: this.jijiangId,
					page: this.page,
					pagenum: 3,
					keyword: this.keyword,
					goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 1) ? this.getCaption(
										items.name, 1) : items.name
								})
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 0) ? this.getCaption(
										items.name, 0) : items.name
								})
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							let time = (item.start_time - Date.parse(new Date()) / 1000) *
								1000
							this.$set(item, 'datetime', time)
						})
						this.newTotalPageNum = res.data.total
						this.newsjingpaiList = this.page == 1 ? res.data.data : [...this.newsjingpaiList, ...res
							.data.data
						]
						if (this.id == 2) this.productList = this.newsjingpaiList
					}
				})
			},
			// 历史竞拍
			onAuctionHistoryGoods() {
				this.$http.post(this.$apiObj.AuctionHistoryGoods, {
					sort: this.lishiId,
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword,
					date_start: this.date_start,
					goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.historyTotalPageNum = res.data.total
						this.historyList = this.page == 1 ? res.data.data : [...this.historyList, ...res.data
							.data
						]
						if (this.id == 3) this.productList = this.historyList

						if (this.isOpen == false) {
							this.historyList = this.historyList.splice(0, 3)
							this.isOpen == true
						}
						if (this.isOpen == true) {
							this.historyList = this.historyList
						}
					}
				})
			},
			// 最新竞拍
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.AuctionNewGoods, {
					sort: this.newsjpId,
					page: this.page,
					pagenum: 3,
					keyword: this.keyword,
					goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.remain_time = item.remain_time * 1000
						})
						this.totalPageNum = res.data.total
						this.jingpaiList = this.page == 1 ? res.data.data : [...this.jingpaiList, ...res.data.data]

						if (this.id == 1) this.productList = this.jingpaiList
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
				return d + this.$t('auction.day') + h + this.$t('auction.shi') + m + this.$t('auction.fen') + s + this.$t(
					'auction.miao')
			},
			//修改地址
			editAddress(item) {
				this.$http.post(this.$apiObj.AddressEdit, {
					mobile_area_code: item.mobile_area_code, // 手机号区域编码
					mobile: item.mobile, // 手机号码
					detail: item.detail, // 收货地址
					is_default: 1, // 1默认，0不默认
					name: item.name, // 收货人
					address_id: item.id
				}).then(res => {
					if (res.code == 1) {
						this.getAllAddress()
						this.$refs.popupAddress.close()
					}
				})
			},
			//页面跳转
			navToUrl(url) {
				uni.navigateTo({
					url
				})
			},
			//获取地址列表
			getAllAddress() {
				this.$http.post(this.$apiObj.AddressList).then(res => {
					this.addressList = res.data.data
					res.data.data.forEach(item => {
						if (item.is_default * 1 == 1) this.addressInfo = item
					})
				})
			},
			//猜你喜欢以及热门推荐跳转
			toYouLikeOrHot(id) {
				uni.navigateTo({
					url: '/pages/auction/autionDetail?goodsId=' + id
				})
			},
			getYouLikeList() {
				this.$http.post(this.$apiObj.GetYouLikeList, {
					goods_id: this.shopCont.goods_id,
					is_auction_goods: 2,
					page: 1,
					pagenum: 6
				}).then(res => {
					this.youLikeList = res.data.data
				})
			},
			toPay() {
				if (this.addressList.length < 0) {
					uni.showModal({
						title: '提示',
						content: '请先添加收货地址',
						cancelText: "取消",
						confirmText: "确认",
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/address/address'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}

				//提交订单
				this.$http.post(this.$apiObj.OrderReferOrder, {
					goods_spec_id: this.shopCont.litestore_goods_spec[0].goods_spec_id,
					num: 1,
					coupon_id: 0,
					buy_type: 1,
					address_id: this.addressInfo.id,
					group_type: 0,
					major_no: 0
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/cart/orderinfo?order_no=' + res.data.order_no
							})
						}, 1500)
					}


				})

			},
			addCart() {
				this.$http.post(this.$apiObj.CartAdd, {
					goods_spec_id: this.shopCont.litestore_goods_spec[0].goods_spec_id,
					num: 1
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: this.isShopCont ? 'Successfully added to shopping cart' : '加入购物车成功'
						})
					}
				})
			},
			toMyCart() {
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			},
			/* getTopNum() {
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
			}, */
			//计算距离
			getTopNum() {
				const queryList = [];
				for (var i = 0; i < this.navList.length; i++) {
					const query = uni.createSelectorQuery();
					query.select('#div' + (i + 1)).boundingClientRect(data => {
						uni.createSelectorQuery().select('.detail-page').boundingClientRect(res => {
							let num = data ? (data.top > 0 ? data.top - 100 : data.top) : 0;
							this.heightList.push(num);
						}).exec();
					});
					queryList.push(query);
				}
				queryList.forEach(query => query.exec());
			}, 
			//预览图片
			previewImgList() {
				this.showImages=true
			},
			//前往竞拍详情
			toDrawInfo(id) {
				uni.navigateTo({
					url: '/pages/auction/detail?id=' + id
				})
			},
			//获取评论
			getCommentList() {
				this.$http.post(this.$apiObj.GoodsCommentList, {
					goods_id: this.id
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
					url: '/pages/auction/comment?id=' + this.id
				})
			},
			//历史竞拍列表
			getHistoryList() {
				this.$http.post(this.$apiObj.AuctionHistoryGoods, {
					page: 1,
					pagenum: 5,
					goods_id: this.id
				}).then(res => {
					if (res.code == 1) {

						this.historyList = res.data.data
					}
				})
			},

			//即将开始列表
			getStartGoodsList() {
				this.$http.post(this.$apiObj.AuctionNotbeginGoods, {
					page: 1,
					pagenum: 2,
					goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						res.data.data.forEach(item => {
							this.$set(item, 'djs', (item.pre_end_time - Date.parse(new Date()) / 1000) *
								1000)
						})
						this.startGoodsList = res.data.data
					}
				})
			},
			//获取最新竞拍列表
			getNewList() {
				this.$http.post(this.$apiObj.AuctionNewGoods, {
					page: this.page,
					pagenum: this.pagenum,
					goods_id: this.id
				}).then(res => {
					if (res.code == 1) {
						res.data.data.forEach(item => {
							this.$set(item, 'djs', (item.pre_end_time - Date.parse(new Date()) / 1000) *
								1000)
						})
						this.newGoodsList = res.data.data
					}
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
				// this.onAuctionorderShare()
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
				// this.onAuctionorderShare()
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
						this.getProductInfo()
					}
				})
			},
			// 竞拍商品详情
			getProductInfo() {
				this.$http.post(this.$apiObj.ProductInfo, {
					goods_id: this.id,
					goods_listing_type: 2
				}).then(res => {
					if (res.code == 1) {
						res.data.litestore_tag.forEach(item => {
							let arr = item.name.split("|")
							if (!this.isShopCont) item.name = arr[0]
							else {
								if (arr.length < 2) item.name = arr[0]
								else item.name = arr[1]
							}
						})
						this.status = true
						this.shopCont = res.data
						// 评价列表
						this.getCommentList()
						//猜你喜欢
						this.getYouLikeList()

						setTimeout(() => {
							this.getTopNum()
						}, 1000)
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
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.isClick = false
				}, 2000)
				this.onScrollIntoView(e)
				this.getProductInfo()
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
			getGoodsJudgeList() {
				this.$http.post(this.$apiObj.GoodsCommentList, {
					goods_id: this.id,
				}).then(res => {
					if (res.code == 1) {
						this.JudgeList = res.data.data
					}
				})
			},
			// 个人信息获取剩余竞拍次数
			onMineInfos() {
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
						// this.auction_num = 10
						if (res.data.auction_num !== 0) {
							this.qiangpaiShow = true
							console.log(1)
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
				if (item.id == 1 && this.set_paypwd != '1') {
					this.zhifushow = false
					for (let i in this.orderPayList) {
						this.orderPayList[i].isShow = false
					}
					uni.navigateTo({
						url: "../mine/setPassword"
					})
					return
				}
				for (let i in this.orderPayList) {
					this.orderPayList[i].isShow = false
				}
				item.isShow = true
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
						this.getProductInfo()
					}
				})
			},

			//关注商品
			onFocusProduct() {
				this.$http.post(this.$apiObj.MineFocus, {
					type: 1,
					data_id: this.shopCont.goods_id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: this.shopCont.goods_focus ? this.$t('auction.detail.err') : this.$t(
								'auction.detail.success')
						})
						this.getProductInfo()
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
				let isNum
				for (let i in this.orderPayList) {
					if (this.orderPayList[i].isShow) {
						isNum = this.orderPayList[i].id
					}
				}
				if (!isNum) return uni.showToast({
					icon: 'none',
					title: this.$t('auction.detail.qxzzffs')
				})
				this.zhifushow = false
				if (isNum == 1) {
					// 余额支付弹框
					this.zhipassShow = true
					// this.$refs.zhipassShow.open()
				} else if (isNum == 2) {
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
					// 3方支付
					// this.$http.post(this.$apiObj.AuctionorderReferOrder, {
					//   auction_type: 2,// 1竞拍商品原价购买，2参与竞拍价购买
					//   num: this.isauctionNum,// 购买数量
					//   coupon_id: '',// 优惠券id
					//   address_id: '',// 地址id
					//   remark: '',// 备注
					//   money: this.shopNum,// 总金额
					//   auction_goods_id: this.shopCont.id,// 竞拍商品id
					// }).then(res => {
					//   if (res.code == 1) {
					// this.order_no = res.data.order_no
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
					})

					// }
					// })
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
				this.$http.post(this.$apiObj.AuctionorderBalancePay, {
					order_no: this.order_no, // 小订单号
					money: this.shopNum, // 支付总金额
					pay_pwd: pay_pwd, // rsa加密后的支付密码
				}).then(res => {
					if (res.code == 1) {
						this.getProductInfo()
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
				// this.onAuctionorderShare()
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

	/deep/ img {
		max-width: 100%;
	}

	// /deep/.u-count-down__text {
	// 	width: 100%;
	// 	color: #fff !important;
	// 	font-size: 32rpx !important;
	// }

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
	
	//指标分析
	.index_analysis {
		width: 750rpx;
		padding: 32rpx 0;
		background: #fff;
		margin: 24rpx 0;
	
		.tit {
			font-size: 28rpx;
			font-weight: bold;
			color: rgb(51, 51, 51);
			display: flex;
			align-items: center;
			margin-left: 44rpx;
	
			image {
				display: block;
				width: 24rpx;
				height: 24rpx;
				margin-left: 12rpx;
			}
		}
	
		.list {
			width: 662rpx;
			margin: 0 auto 0 auto;
			
			.list-info{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
			}
			
			.item {
				min-width: 50%;
				font-size: 24rpx;
				color: rgb(51, 51, 51);
				display: flex;
				align-items: center;
				margin-top: 40rpx;
	
				.round {
					display: block;
					width: 12rpx;
					height: 12rpx;
					background: rgb(10, 198, 142);
					border-radius: 50%;
					margin-right: 8rpx;
				}
	
				.num {
					font-weight: bold;
					margin-left: 6rpx;
				}
	
			}
	
		}
	
	}
	
	//图片预览
	.show_images {
		position: relative;
		width: 100%;
		min-height: 100vh;
	
		.close {
			position: absolute;
			top: 20rpx;
			right: 32rpx;
			width: 50rpx;
			height: 50rpx;
		}
	
		.carousel {
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			width: 100%;
			height: 750rpx;
			background: #fff;
		}
	}

	.new-list-item-right-jd-auth {
		display: flex;
		align-items: center;

		image {
			position: relative;
			width: 32rpx;
			height: 32rpx;
			border-radius: 50%;
			margin-left: 4rpx;
			z-index: 3;
		}

		image:nth-child(2) {
			position: relative;
			margin-left: -14rpx;
			z-index: 2;
		}

		image:nth-child(3) {
			position: relative;
			margin-left: -14rpx;
			z-index: 1;
		}
	}

	.rImg {
		width: 24rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	// 配货中
	.distributed {
		width: 85%;
		padding: 20rpx 0;
		background: #fff;
		margin: auto;
		margin-top: 32rpx;
		text-align: center;

		.text {
			width: 100%;
			margin-top: 20rpx;
			color: #666;
			font-size: 20rpx;
		}

		.con {
			width: 100%;
			display: flex;
			align-items: center;
			margin: auto;
			text-align: center;

			.conImg {
				width: 280rpx;
				height: 280rpx;
			}

			.conTxt {
				width: 60%;
				line-height: 40rpx;
				color: #666;
			}
		}

		.btn {
			width: 350rpx;
			height: 72rpx;
			line-height: 72rpx;
			border-radius: 50rpx;
			background: rgb(10, 198, 142);
			margin: auto;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}

			.txt {
				color: #fff;
				font-size: 28rpx;
				font-weight: bold;
			}
		}

		.btn2 {
			width: 230rpx;
			height: 72rpx;
			line-height: 72rpx;
			border-radius: 50rpx;
			background: #ccc;
			margin: auto;
			margin-top: 40rpx;
			display: flex;
			align-items: center;

			.img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}

			.txt {
				color: #fff;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}

	//商品详情之后的页面
	.detailImg {
		width: 625rpx;
		width: 625rpx;
		margin: auto;
		margin-top: 50rpx;

		image {
			width: 625rpx;
			height: 400rpx;
		}
	}

	//许愿中
	.wish {
		width: 100%;
		padding-bottom: 40rpx;
		margin-bottom: 50rpx;
		background: #fff;
		margin-top: 30rpx;

		.bottomAdd {
			text-align: center;
			padding-bottom: 20rpx;
			color: #666;
			font-size: 24rpx;
			display: block;
			margin-top: 20rpx;

			.image {
				width: 24rpx;
				height: 24rpx;
			}
		}

		.title {
			position: absolute;
			top: 10rpx;
			font-size: 24rpx;
			color: #333;
			font-weight: bold;
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}

		.ongingList {
			width: 100%;
			margin: 24rpx 0;

			.ongingList-item {
				position: relative;
				width: 686rpx;
				height: 180rpx;
				margin: auto;
				margin-bottom: 30rpx;
				display: flex;
				align-items: center;
				box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);

				.ongingListItemImg {
					width: 180rpx;
					height: 180rpx;
					background: gray;
					border-radius: 16rpx 0 0 16rpx;
					margin-right: 18rpx;
				}
			}
		}

		.zsItem {
			position: relative;
			width: 480rpx;
			height: 180rpx;

			.title {
				position: absolute;
				top: 10rpx;
				color: #333;
				font-size: 24rpx;
				display: block;
				font-weight: bold;
				margin-left: 5rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.row {
				position: absolute;
				right: 0rpx;
				bottom: 10rpx;
				width: 480rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.zsImg {
					width: 30rpx;
				}

				.left {


					.span {
						font-weight: bold;
						font-size: 32rpx;
						color: rgb(255, 57, 57);
						margin-left: 8rpx;
					}
				}

				.new-list-item-btm-btn {

					padding: 6rpx 10rpx;
					box-sizing: border-box;
					font-size: 24rpx;
					color: rgb(10, 198, 142);
					box-sizing: border-box;
					border: 1rpx solid rgb(10, 198, 142);
					border-radius: 100rpx;
					display: flex;
					align-items: center;
					margin-left: 60rpx;
					margin-top: -10rpx;

					image {
						width: 28rpx;
						height: 28rpx;
						margin-right: 6rpx;
					}

					/deep/ .u-count-down__text {
						color: #F89B00;
					}
				}
			}
		}
	}

	.rowIndex {
		position: absolute;
		bottom: 10rpx;
		width: 480rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.zsImg {
			width: 30rpx;
		}

		.left {


			.span {
				font-weight: bold;
				font-size: 32rpx;
				color: rgb(255, 57, 57);
				margin-left: 8rpx;
			}
		}

		.new-list-item-btm-btn {
			position: absolute;
			bottom: 0rpx;
			right: 12rpx;
			padding: 6rpx 20rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: rgb(10, 198, 142);
			box-sizing: border-box;
			border: 1rpx solid rgb(10, 198, 142);
			border-radius: 100rpx;
			display: flex;
			align-items: center;
			margin-left: 90rpx;
			margin-top: -10rpx;

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 6rpx;
			}

			/deep/ .u-count-down__text {
				color: #F89B00;
			}
		}
	}

	//许愿列表标题
	.ll-header-left {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 30rpx;

		.left-icon {
			width: 48rpx;
			display: flex;

			image {
				width: 100%;
			}
		}

		.left-text {
			position: relative;

			p {
				font-size: 32rpx;
				color: rgb(51, 51, 51);
				margin-left: 8rpx;
				font-weight: bold;
			}

			span {
				width: 92rpx;
				height: 8rpx;
				border-radius: 100rpx;
				display: block;
				position: absolute;
				left: 50%;
				bottom: -4rpx;
				transform: translateX(-50%);
			}
		}
	}

	//进度条
	.jping-jd {
		position: absolute;
		bottom: 70rpx;
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 20rpx;

		.jping-jd-box {
			width: 280rpx;
			height: 32rpx;
			box-sizing: border-box;
			background: rgba(255, 0, 0, 0.1);
			border: 1rpx solid rgb(255, 197, 182);
			border-radius: 100rpx;
			overflow: hidden;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			margin-right: 20rpx;

			image {
				height: 32rpx;
				border-radius: 100rpx;
			}

			.box-progress {
				color: rgb(255, 255, 255);
				font-size: 20rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 9;
			}
		}
	}

	.hisy {
		position: relative;
		width: 688rpx;
		height: 100rpx;
		border-bottom: 1px solid rgb(204, 204, 204);
		margin: 30rpx auto;

		.hisy_tit {
			position: absolute;
			top: 0;
			left: 0;
			max-width: 550rpx;
			font-size: 24rpx;
			color: rgb(51, 51, 51);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.hisy_info {
			position: absolute;
			left: 0;
			bottom: 20rpx;
			display: flex;
			align-items: center;

			.hisy_info_auth {
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
			}

			.hisy_info_name {
				max-width: 400rpx;
				font-size: 20rpx;
				color: rgb(51, 51, 51);
				margin: 0 8rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.hisy_info_jb {
				width: 24rpx;
				height: 24rpx;
			}

		}

		.hisy_right {
			position: absolute;
			right: 20rpx;
			bottom: 40rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: rgb(255, 57, 57);

			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 12rpx;
			}
		}

	}

	.right {
		.span {
			font-size: 28rpx;
			color: rgb(255, 57, 57);
			font-weight: bold;
		}
	}

	//最新竞拍
	.product-jilu-new {
		width: 710rpx;
		padding: 10rpx 0 30rpx 0;
		background: #fff;
		border-radius: 16rpx;
		margin: 0 auto;

		.product-jilu-new-tit {
			font-size: 24rpx;
			font-weight: 700;
			color: rgb(255, 78, 47);
			margin-left: 20rpx;
			margin-bottom: 20rpx;
		}

		.product-item {
			position: relative;
			width: 600rpx;
			display: flex;
			align-items: center;
			border: 2rpx solid rgb(255, 78, 47);
			border-radius: 16rpx;
			margin: 0 auto 20rpx auto;

			.product-item-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 16rpx 0 0 16rpx;
			}

			.product-item-info {
				margin-left: 20rpx;
				margin-right: 30rpx;

				.products-item-info-time {
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

				.product-item-qi {
					font-size: 20rpx;
					color: rgb(44, 44, 44);
					margin-top: 10rpx;
				}

			}

			.product-item-bfb {
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 24rpx;
				color: rgb(255, 78, 47);
				text-align: center;
				border-radius: 50%;
				// background: rgba(255, 78, 47, 0.3);
				margin-left: 30rpx;
			}

			.product-item-btn {
				position: absolute;
				right: 0;
				width: 120rpx;
				height: 124rpx;
				color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: rgb(255, 78, 47);
				border-radius: 0 16rpx 16rpx 0;

				.product-item-btn-name {
					font-size: 32rpx;
					font-weight: 700;
				}

				.product-item-btn-price {
					font-size: 16rpx;
					margin-top: 10rpx;
				}
			}

		}

	}

	//即将开始
	.product-start {
		width: 710rpx;
		padding: 10rpx 0 30rpx 0;
		background: #fff;
		border-radius: 16rpx;
		margin: 30rpx auto;

		.product-start-tit {
			font-size: 24rpx;
			font-weight: 700;
			color: rgb(255, 78, 47);
			margin: 0 0 20rpx 30rpx;
		}

		.product-start-list {
			width: 670rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			margin-left: 20rpx;

			.product-start-item {
				position: relative;
				width: 320rpx;
				height: 120rpx;
				border: 2rpx solid rgb(255, 179, 0);
				border-radius: 16rpx;

				.product-start-time {
					position: absolute;
					top: 14rpx;
					left: 10rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

				.product-start-qi {
					position: absolute;
					left: 10rpx;
					bottom: 20rpx;
					font-size: 20rpx;
					color: rgb(44, 44, 44);
				}

				.product-start-price {
					position: absolute;
					top: 20rpx;
					right: 10rpx;
					font-size: 24rpx;
					font-weight: 700;
					color: rgb(255, 0, 0);

					span {
						font-size: 32rpx;
					}
				}

			}
		}

	}

	//历史记录
	.historical {
		width: 710rpx;
		padding: 10rpx 0 30rpx 0;
		background: #fff;
		border-radius: 16rpx;
		margin: 0 auto;

		.historical-tit {
			font-size: 24rpx;
			font-weight: 700;
			color: rgb(255, 78, 47);
			margin: 0 0 12rpx 20rpx;
		}

		.historical-item {
			position: relative;
			width: 670rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx dashed rgb(190, 190, 190);
			margin: 0 auto;

			.historical-item-qi {
				font-size: 20rpx;
				color: rgb(44, 44, 44);
				margin-left: 10rpx;
			}

			.historical-item-price {
				position: absolute;
				left: 276rpx;
				font-size: 24rpx;
				font-weight: 700;
				color: rgb(255, 0, 0);
			}

			.historical-item-auth {
				position: absolute;
				left: 418rpx;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}

			.historical-item-star {
				position: absolute;
				bottom: 20rpx;
				left: 442rpx;
				width: 20rpx;
				height: 20rpx;
			}

			.historical-item-name {
				position: absolute;
				left: 508rpx;
				width: 160rpx;
				font-size: 20rpx;
				color: rgb(44, 44, 44);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

		}
	}

	.detail-header {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		.detail-head {
			position: relative;
			widows: 100%;
			height: 88rpx;
			padding-top: 60rpx;
			display: flex;
			align-items: center;

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

		.auct-nav {
			width: 100%;
			padding: 40rpx 0 30rpx 0;
			display: flex;
			justify-content: space-between;
			text-align: center;

			.li {
				width: 25%;
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
	}

	.progressBox {
		position: relative;
		width: 100rpx;
		height: 100rpx;

		.centerTxt {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 24rpx;
			color: rgb(255, 78, 47);
		}
	}

	//价格与时间
	.detail-price {
		position: relative;
		width: 750rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		background: rgba(255, 78, 47, 0.5);

		.detail-price-left {
			margin-left: 30rpx;

			.detail-price-new {
				font-size: 40rpx;
				font-weight: 700;
				color: rgb(255, 255, 255);
			}

			.detail-price-old {
				font-size: 24rpx;
				color: rgb(255, 78, 47);
				text-decoration: line-through;
			}
		}

		.detail-price-time {
			position: absolute;
			right: 30rpx;
			font-size: 32rpx;
			color: rgb(255, 255, 255);
			display: flex;
			align-items: center;
		}

	}

	.detail-money {
		width: 100%;
		height: 92rpx;
		background: rgb(255, 57, 57);
		border: 1px solid red;
		padding: 0 32rpx;
		box-sizing: border-box;
		display: flex;
		color: #fff;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;

		.imgBottom {
			display: flex;
			align-items: flex-end;
			margin-top: 5rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			.zs {
				font-size: 40rpx;
				font-weight: bold;
				margin-left: 10rpx;
			}
			
			p{
				font-size: 20rpx;
				color: rgb(255, 255, 255);
				margin-left: 8rpx;
			}
			
		}
	}

	.detail-top {
		padding-top: 24rpx;
		background: #fff;
	}

	.detail-title {
		width: 692rpx;
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
		margin: 0 auto 16rpx auto;
	}

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
			display: flex;
			align-items: center;
			margin: 0 20rpx 12rpx 0;

			image {
				width: 38rpx;
				height: 38rpx;
			}
			
			text{
				margin-left: 4rpx;
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

	.select-layout {
		width: 100%;
		margin: 24rpx 0;
		background-color: #ffffff;

		.sl-category {
			width: 100%;
			padding: 24rpx 32rpx 0;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.sl-category-left {
				display: flex;
				align-items: center;

				.left-name {
					width: 120rpx;
					color: rgb(102, 102, 102);
					font-size: 24rpx;
				}

				.left-option {
					width: 510rpx;
					color: rgb(51, 51, 51);
					font-size: 24rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
				}
			}

			.sl-category-right {
				width: 24rpx;
				height: 24rpx;

				image {
					width: 100%;
				}
			}
		}

		.sl-address {
			width: 100%;
			padding: 24rpx 32rpx;
			box-sizing: border-box;

			.sl-address-choose {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.choose-left {
					display: flex;
					align-items: center;

					.choose-left-name {
						width: 120rpx;
						color: rgb(102, 102, 102);
						font-size: 24rpx;
					}

					.choose-left-content {
						width: 510rpx;
						display: flex;
						align-items: center;

						image {
							width: 28rpx;
						}

						p {
							margin-left: 16rpx;
							color: rgb(51, 51, 51);
							font-size: 24rpx;

							&:first-child {
								font-weight: bold;
							}
						}
					}
				}

				.choose-right {
					width: 24rpx;
					height: 24rpx;

					image {
						width: 100%;
					}
				}
			}

			.sl-address-info {
				width: 100%;
				margin-top: 24rpx;
				padding: 0 88rpx 24rpx 120rpx;
				box-sizing: border-box;
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
				position: relative;
				width: 220rpx;
				height: 350rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-bottom: 28rpx;

				.item-cover {
					position: absolute;
					top: 0;
					width: 220rpx;
					height: 220rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 16rpx;
					}
				}

				.item-text {
					position: absolute;
					top: 232rpx;
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
					position: absolute;
					bottom: 2rpx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					
					image{
						width: 24rpx;
						height: 24rpx;
						margin-right: 4rpx;
					}

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
			top: 410rpx;
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
			border: 4rpx solid rgb(255, 78, 47);
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
				color: rgb(255, 78, 47);
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
				background: rgb(255, 78, 47);
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
					border: 2rpx solid rgb(255, 78, 47);
				}

				.pay-pwd-list-ok {
					color: #fff;
					background: rgb(255, 78, 47);
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

		.new-shop-info-des {
			width: 300rpx;
			height: 108rpx;

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
			top: 390rpx;
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
			border: 4rpx solid rgb(255, 78, 47);
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
							border: 2rpx solid rgb(255, 78, 47);
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
						background: rgb(255, 78, 47);
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
					background: rgb(255, 78, 47);
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
		border: 4rpx solid rgb(255, 78, 47);

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
			color: #FF4E2F;
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
					border: 1rpx solid rgb(255, 78, 47);
					margin-right: 97rpx;
				}

				.ljfx {
					color: #fff;
					background: rgb(255, 78, 47);

				}
			}
		}
	}


	.detail-page {
		padding-bottom: 130rpx;

		.detail-big {
			// margin-top: 100rpx;

			/deep/ uni-swiper {
				height: 750rpx;
			}

			.big-img {
				width: 100%;
				height: 750rpx;
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
			margin: 20rpx 0 60rpx 0;
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

		// 选择规格 star
		.specs-layout {
			width: 100%;
			background: #ffffff;
			padding: 32rpx;
			box-sizing: border-box;
			border-radius: 16rpx 16rpx 0 0;

			.sl-info {
				width: 100%;
				padding-bottom: 32rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				display: flex;
				align-items: flex-end;
				position: relative;

				.sl-info-cover {
					width: 240rpx;
					height: 240rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.sl-info-text {
					flex: 1;
					margin-left: 24rpx;

					.text-specs {
						color: rgb(153, 153, 153);
						font-size: 24rpx;
						margin-bottom: 24rpx;
					}

					.text-price {
						color: rgb(255, 57, 57);
						font-size: 32rpx;
						font-weight: bold;

						span {
							font-size: 20rpx;
						}
					}
				}

				.sl-info-close {
					width: 32rpx;
					height: 32rpx;
					position: absolute;
					right: 0;
					top: 0;

					image {
						width: 100%;
					}
				}
			}

			.sl-scroll {
				width: 100%;
				height: 900rpx;
				padding-bottom: 32rpx;
				box-sizing: border-box;

				.sl-option {
					width: 100%;

					.sl-option-title {
						width: 100%;
						padding: 32rpx 32rpx 0 32rpx;
						box-sizing: border-box;
						color: rgb(51, 51, 51);
						font-size: 28rpx;
						font-weight: bold;
					}

					.sl-option-content {
						width: 100%;
						margin-top: 22rpx;
						display: flex;
						flex-wrap: wrap;

						.c-item {
							margin: 0 24rpx 24rpx 0;
							padding: 20rpx 40rpx;
							box-sizing: border-box;
							background: rgb(245, 245, 245);
							border-radius: 50rpx;
							color: rgb(102, 102, 102);
							font-size: 26rpx;
						}

						.active {
							background: rgba(10, 198, 142, 0.1);
							border: 2rpx solid rgb(10, 198, 142);
							color: rgb(10, 198, 142);
						}
					}
				}
			}

			.sl-button {
				width: 100%;
				height: 88rpx;
				background: rgb(10, 198, 142);
				border-radius: 100rpx;
				text-align: center;
				line-height: 88rpx;
				color: rgb(255, 255, 255);
				font-size: 40rpx;
			}
		}

		// 选择规格end
		// 选择地址 star
		.showaddress {
			width: 750rpx;
			padding-bottom: 24rpx;
			background: #fff;
			border-radius: 24rpx 24rpx 0 0;

			.top {
				position: relative;
				width: 100%;
				height: 96rpx;
				display: flex;
				align-items: center;

				view {
					width: 100%;
					font-size: 40rpx;
					color: rgb(51, 51, 51);
					text-align: center;
				}

				image {
					position: absolute;
					right: 32rpx;
					width: 32rpx;
					height: 32rpx;
					z-index: 5;
				}
			}

			.addresslist {
				width: 100%;
				margin-top: 46rpx;

				.address-item {
					width: 100%;

					.item-head {
						width: 100%;
						display: flex;
						align-items: center;

						image {
							width: 48rpx;
							height: 48rpx;
							margin-left: 32rpx;
						}

						.item-name {
							font-size: 32rpx;
							font-weight: bold;
							color: rgb(51, 51, 51);
							margin: 0 20rpx 0 24rpx;
						}

						.item-phone {
							font-size: 28rpx;
							color: rgb(102, 102, 102);
						}

					}

					.item-info {
						width: 594rpx;
						line-height: 44rpx;
						font-size: 24rpx;
						color: rgb(102, 102, 102);
						word-break: break-all;
						margin-left: 104rpx;
					}

					.item-default {
						width: 150rpx;
						height: 36rpx;
						line-height: 36rpx;
						font-size: 20rpx;
						color: rgb(10, 198, 142);
						text-align: center;
						box-sizing: border-box;
						border: 1rpx solid rgb(10, 198, 142);
						border-radius: 8rpx;
						margin: 20rpx 0 0 104rpx;
					}
				}

				.item-line {
					width: 686rpx;
					border-bottom: 1rpx solid rgb(204, 204, 204);
					margin: 32rpx auto;
				}

			}

			.address-btn {
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 88rpx;
				margin: 20rpx auto 0 auto;
			}
		}

		// 选择地址 end

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
				color: #FF4E2F;
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
					background: #FF4E2F !important;
					border-color: #FF4E2F !important;
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
			color: #FF4E2F;
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
					color: #FF4E2F;
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