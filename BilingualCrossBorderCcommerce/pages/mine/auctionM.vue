<template>
	<view class="auct-page">
		<view class="ap-header">
			<view class="ap-header-container">
				<p>{{$t('mine.auction')}}</p>
				<image @click="tomine" src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="ap-switch">
			<view :class="type === 1 ? 'active':''" @click="onTypeClcik(1)">{{$t('user.auctionM.jpz')}}</view>
			<template v-if="navId==1">
				<view :class="type === 5 ? 'active':''" @click="onTypeClcik(5)">{{$t('user.auctionM.jpdd')}}</view>
			</template>
			<view :class="type === 3 ? 'active':''" @click="onTypeClcik(3)">{{$t('user.auctionM.zpjl')}}</view>
			<template v-if="navId==1">
				<view :class="type === 4 ? 'active':''" @click="onTypeClcik(4)">{{$t('user.auctionM.jpjl')}}</view>
			</template>
			<view class="ap-switch-line" :style="{left: shifting}"></view>
		</view>
		<!--我的竞拍-竞拍中 auct-box start-->
		<view class="auct-box" v-if="type==1">
			<template v-if="jingpaiList && jingpaiList.length > 0">
				<view class="jping" v-for="(item,i) in jingpaiList" :key="i" @click="toDetail(item.order_no)">
					<view class="jping-left">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="jping-right">
						<view class="jping-name">{{item.goods_name}}</view>
						<view class="jping-icon">
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
						<view class="jping-price">
							<view class="jping-price-left">
								<view class="jping-price-new"><span>RM</span>{{item.auction_price}}</view>
								<view class="jping-price-old">RM{{item.price}}</view>
							</view>
							<view class="jping-price-btn">
								<image src="@/static/images/mine/auctionm_icon_auction.png" mode="widthFix"></image>
								<p>{{$t('auction.qiangpai')}}</p>
							</view>
						</view>
						<view class="jping-jd">
							<view class="jping-jd-data">
								<progress class="progress" :percent="item.finish_rate*100" stroke-width="5"
									activeColor="rgb(10, 198, 142)" backgroundColor="#EBEBEB" />
							</view>
							<view class="jping-jd-bfb">{{(item.finish_rate*100).toFixed(0)}}%</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<uni-empty message="暂无内容"></uni-empty>
			</template>
		</view>
		<!--我的竞拍-竞拍中 auct-box end-->

		<!--我的竞拍-竞拍订单 auct-box start-->
		<view class="auct-box" v-if="type==5">
			<template v-if="jingpaiorderList && jingpaiorderList.length">
				<view class="order-item" v-for="item in jingpaiorderList" :key="item.id"
					@click="toDetail(item.order_no)">
					<view class="order-item-status">{{$t('user.auctionM.going')}}</view>
					<view class="order-item-cover">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="designated">{{item.stage_num}}{{$t('auction.qi')}}</view>
					</view>
					<view class="order-item-info">
						<view class="info-name">{{item.goods_name}}</view>
						<view class="info-bot">
							<view class="info-box">
								<view class="info-box-left">
									<p class="left-price"><span>RM</span>4566</p>
									<p class="left-original">RM{{item.pay_price}}</p>
								</view>
								<view class="info-box-right">x{{item.total_num}}</view>
							</view>
							<view class="info-detail">
								<view class="info-detail-left">{{item.shop_name}}</view>
								<view class="info-detail-right">2023-02-15 18:25:50</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<uni-empty message="暂无内容"></uni-empty>
			</template>
		</view>
		<!--我的竞拍-竞拍订单 auct-box end-->

		<!--我的竞拍-中拍记录 auct-box start-->
		<view class="auct-box" v-if="type==3">
			<block v-if="navId==1">
				<template v-if="LuckyList && LuckyList.length">
					<image class="luck-zpjl-banner" v-if="!isShopCont" src="../../static/images/auction/gxzj.png"></image>
					<image class="luck-zpjl-banner" v-else src="../../static/images/new/xyzx1.png"></image>
					<view class="luck-zpjl-item" v-for="(item,index) in LuckyList" :key="item.id">
						<view class="item-cover">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="item-info">
							<view class="item-info-top">
								<p class="top-name">{{item.goods_name}}</p>
								<p class="top-status"></p>
							</view>
							<view class="item-info-bot">
								<view class="bot-bidding">
									<p>{{$t('user.auctionM.bidding')}}: RM{{item.auction_price}}</p>
									<p v-if="false">x5</p>
								</view>
								<view class="bot-disbursements">
									<view class="bot-disbursements-l">
										<p class="l-title">{{$t('user.auctionM.shifukuang')}}:</p>
										<p class="l-price"><text>RM</text>{{item.auction_price}}</p>
									</view>
									<view class="bot-disbursements-r" @click.stop="onlingjiangClick(item)">{{$t('zhongpai.lingjiangjiang')}}</view>
								</view>
							</view>
						</view>
						<!-- <view class="luck-zpjl-item-btn" v-if="item.select_way==0" >
							{{$t('zhongpai.lingjiangjiang')}}
						</view>
						<view class="luck-zpjl-item-btn" v-else-if="item.status==6">
							{{$t('auction.detail.lijifenxiang')}}
						</view>
						<view class="luck-zpjl-item-btn" v-else-if="item.select_way==2 && item.status==2">待发货</view>
						<view class="luck-zpjl-item-btn" v-else-if="item.select_way==2 && item.status==3">待收货</view>
						<view class="luck-zpjl-item-btn" v-else-if="item.select_way==2 && item.status==4">待确认</view> -->
					</view>
				</template>
				<template v-else>
					<uni-empty message="暂无内容"></uni-empty>
				</template>
			</block>
			<block v-if="navId==2">
				<template v-if="LuckyList && LuckyList.length">
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
				</template>
				<template v-else>
					<uni-empty message="暂无内容"></uni-empty>
				</template>
			</block>
		</view>
		<!--我的竞拍-中拍记录 auct-box end-->

		<!--我的竞拍-历史竞拍 auct-box start-->
		<view class="auct-box" v-if="type==2">
			<template v-if="jingpaiList && jingpaiList.length">
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
			</template>
			<template v-else>
				<uni-empty message="暂无内容"></uni-empty>
			</template>
		</view>
		<!--我的竞拍-历史竞拍 end-->

		<!--我的竞拍记录 auct-box start-->
		<view class="auct-box" v-if="type==4">
			<template v-if="recordList && recordList.length">
				<view class="order-item" v-for="item in recordList" :key="item.id"
					@click="toDetail(item.order_no)">
					<view class="order-item-status">ongoing</view>
					<view class="order-item-cover">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="designated">{{item.stage_num}}{{$t('auction.qi')}}</view>
					</view>
					<view class="order-item-info">
						<view class="info-name">{{item.goods_name}}</view>
						<view class="info-bot">
							<view class="info-box">
								<view class="info-box-left">
									<p class="left-price"><span>RM</span>{{item.pay_price}}</p>
									<p class="left-original">RM{{item.price}}</p>
								</view>
							</view>
							<view class="info-detail">
								<view class="info-detail-left">{{item.shop_name}}</view>
								<view class="info-detail-right">{{$filter.to_date_time(item.pay_time)}}</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<uni-empty message="暂无内容"></uni-empty>
			</template>
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
		<u-popup :show="shareShow" mode="center" bgColor="transparent">
			<view class="shareShow">
				<image src="../../static/images/auth/tck-xr.png" class="shareShow-img"></image>
				<view class="shareShow-info">
					<view class="shareShow-info-des">恭喜您在由XX商家提供的竞拍活动中以RMXX的价格幸运拍中价值RMXX的XX</view>
					<view class="shareShow-info-btn">
						<view class="shareShow-info-btn-cancel" @click="shareShow=false">跳过</view>
						<view class="shareShow-info-btn-ok" @click="toMidShot(midshotId)">立即分享</view>
					</view>
				</view>
			</view>
		</u-popup>
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
				midshotId: 0,
				shareShow: false,
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
				qrUrl: "",
				shifting: '8%'
			}
		},
		onLoad(e) {
			if (e.num) this.type = parseInt(e.num);
			if (this.type === 1) {
				this.shifting = '8%'
			}
			if (this.type === 5) {
				this.shifting = '33%'
			}
			if (this.type === 3) {
				this.shifting = '58.5%'
			}
			if (this.type === 4) {
				this.shifting = '83.5%'
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			if (this.navId == 1) {
				// 我的竞拍
				this.onMineAttendAuction();
				// 中拍记录
				setTimeout(() => {
					this.onMineWinAuction();
				}, 500);
				// 竞拍记录
				this.onMineRecordList();
				this.AuctionorderMineOrder();
			} else {
				// 我的竞拍
				this.onMineFocusAuction();
				// 中拍记录
				this.onMineFocusWinAuction();
			}
		},
		methods: {
			toMidShot(id) {
				this.shareShow = false
				uni.navigateTo({
					url: '/pages/mine/mid-shot?id=' + id
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/mine/auctionDetail?orderNo=' + id
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
				if (this.type === 1) {
					this.shifting = '8%'
				}
				if (this.type === 5) {
					this.shifting = '33%'
				}
				if (this.type === 3) {
					this.shifting = '58.5%'
				}
				if (this.type === 4) {
					this.shifting = '83.5%'
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
						console.log(this.recordList);
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

		.shareShow {
			width: 686rpx;

			.shareShow-img {
				display: block;
				width: 600rpx;
				height: 372rpx;
				margin: 0 auto -50rpx auto;
			}

			.shareShow-info {
				width: 686rpx;
				padding: 80rpx 0 40rpx 0;
				background: rgb(255, 255, 255);
				border-radius: 16rpx;
				box-sizing: border-box;
				border: 2rpx solid rgb(255, 78, 47);

				.shareShow-info-des {
					width: 606rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: rgb(44, 44, 44);
					text-align: center;
					margin: 0 auto;
				}

				.shareShow-info-btn {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 40rpx;

					view {
						width: 240rpx;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 32rpx;
						text-align: center;
						border-radius: 30rpx;
						margin: 0 20rpx;
					}

					.shareShow-info-btn-cancel {
						color: rgb(44, 44, 44);
						box-sizing: border-box;
						border: 2rpx solid rgb(255, 78, 47);
					}

					.shareShow-info-btn-ok {
						color: #fff;
						background: rgb(255, 78, 47);
					}

				}

			}

		}

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

		.ap-header {
			width: 100%;
			background: rgb(255, 255, 255);
			padding-top: 88rpx;
			box-sizing: border-box;

			.ap-header-container {
				width: 100%;
				height: 88rpx;
				text-align: center;
				line-height: 88rpx;
				position: relative;

				p {
					color: rgb(51, 51, 51);
					font-size: 40rpx;
				}

				image {
					width: 40rpx;
					position: absolute;
					top: 50%;
					left: 32rpx;
					transform: translateY(-50%);
				}
			}
		}

		.ap-switch {
			width: 100%;
			height: 90rpx;
			background: rgb(255, 255, 255);
			display: flex;
			position: relative;
			color: rgb(51, 51, 51);
			font-size: 22rpx;
			text-align: center;
			line-height: 80rpx;

			view {
				flex: 1;
				transition: color .2s;

				&.active {
					position: relative;
					color: rgb(10, 198, 142);
				}
			}

			.ap-switch-line {
				position: absolute;
				background: rgba(10, 198, 142, 0.3);
				width: 64rpx;
				height: 8rpx;
				border-radius: 100rpx;
				bottom: 12rpx;
				left: 0;
				transition: left .5s;
			}
		}
		
		.auct-box {
			width: 100%;
			padding: 24rpx 32rpx;
			box-sizing: border-box;
			
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
			.luck-ul {
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


			.luck-zpjl-banner {
				display: block;
				width: 100%;
				height: 296rpx;
				margin-bottom: 24rpx;
			}

			.luck-zpjl-item {
				width: 100%;
				margin-bottom: 20rpx;
				padding: 16rpx;
				box-sizing: border-box;
				background: #FFF;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				
				.item-cover {
					width: 206rpx;
					height: 206rpx;
					position: relative;
					
					image {
						width: 100%;
						height: 100%;
						border-radius: 16rpx;
					}
				}
				
				.item-info {
					flex: 1;
					height: 206rpx;
					margin-left: 16rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					
					.item-info-top {
						display: flex;
						justify-content: space-between;
						
						.top-name {
							width: 340rpx;
							color: rgb(51, 51, 51);
							font-size: 24rpx;
						}
						
						.top-status {
							
						}
					}
					
					.item-info-bot {
						width: 100%;
						
						.bot-bidding {
							width: 100%;
							display: flex;
							justify-content: space-between;
							
							p {
								color: rgb(153, 153, 153);
								font-size: 16rpx;
							}
						}
						
						.bot-disbursements {
							width: 100%;
							margin-top: 16rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							
							.bot-disbursements-l {
								flex: 1;
								
								.l-title {
									color: rgb(153, 153, 153);
									font-size: 16rpx;
								}
								
								.l-price {
									color: rgb(255, 57, 57);
									font-size: 32rpx;
									font-weight: bold;
									
									text {
										font-size: 20rpx;
									}
								}
							}
							
							.bot-disbursements-r {
								padding: 12rpx 22rpx;
								box-sizing: border-box;
								background: rgb(10, 198, 142);
								border-radius: 100rpx;
								color: rgb(255, 255, 255);
								font-size: 20rpx;
							}
						}
					}
				}
			}
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
		width: 100%;
		background: rgb(255, 255, 255);
		border-radius: 20rpx;
		margin-bottom: 24rpx;
		overflow: hidden;
		display: flex;

		.jping-left {
			width: 272rpx;
			height: 272rpx;

			image {
				width: 100%;
				height: 100%;
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
			width: calc(100% - 272rpx);
			padding: 20rpx 24rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.jping-name {
				width: 100%;
				color: rgb(51, 51, 51);
				font-size: 28rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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
			
			.jping-icon {
				display: flex;
				
				.li-icon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 16rpx;
					
					image {
						width: 100%;
					}
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
						color: rgb(255, 57, 57);
						font-size: 32rpx;
						font-weight: bold;
						
						span {
							font-size: 20rpx;
						}
					}

					.jping-price-old {
						font-size: 16rpx;
						color: rgb(153, 153, 153);
						text-decoration: line-through;
					}
				}

				.jping-price-btn {
					width: 124rpx;
					height: 48rpx;
					box-sizing: border-box;
					border: 2rpx solid rgb(10, 198, 142);
					border-radius: 100rpx;
					text-align: center;
					line-height: 48rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					image {
						width: 28rpx;
						transform: translateY(2rpx);
					}
					
					p {
						margin-left: 8rpx;
						font-size: 24rpx;
						color: rgb(10, 198, 142);
					}
				}

			}

			.jping-jd {
				width: 100%;
				font-size: 24rpx;
				color: rgb(10, 198, 142);
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
		width: 100%;
		background: rgb(255, 255, 255);
		border-radius: 20rpx;
		margin-bottom: 24rpx;
		padding: 16rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		overflow: hidden;
		
		&:last-child {
			margin-bottom: 0;
		}
		
		.order-item-status {
			width: 240rpx;
			height: 50rpx;
			background: rgb(255, 57, 57);
			text-align: center;
			line-height: 50rpx;
			color: rgb(255, 255, 255);
			font-size: 24rpx;
			position: absolute;
			right: -79rpx;
			top: 20rpx;
			transform: rotate(45deg);
		}
		
		.order-item-cover {
			width: 206rpx;
			height: 206rpx;
			border-radius: 16rpx;
			overflow: hidden;
			position: relative;
			
			image {
				width: 100%;
				height: 100%;
			}
			
			.designated {
				width: 100%;
				background: rgba(0, 0, 0, 0.4);
				border-radius: 0 0 16rpx 16rpx;
				padding: 12rpx 16rpx;
				box-sizing: border-box;
				text-align: center;
				color: rgb(255, 255, 255);
				font-size: 12rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}
		
		.order-item-info {
			flex: 1;
			min-height: 206rpx;
			padding: 8rpx 16rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			
			.info-name {
				width: 100%;
				color: rgb(51, 51, 51);
				font-size: 24rpx;
				line-height: 36rpx;
			}
			
			.info-bot {
				width: 100%;
				
				.info-box {
					margin-top: 16rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.info-box-left {
						
						.left-price {
							color: rgb(255, 57, 57);
							font-size: 32rpx;
							font-weight: bold;
							
							span {
								font-size: 20rpx;
							}
						}
						
						.left-original {
							font-size: 16rpx;
							color: rgb(153, 153, 153);
							text-decoration: line-through;
						}
					}
					
					.info-box-right {
						color: rgb(153, 153, 153);
						font-size: 16rpx;
					}
				}
				
				.info-detail {
					margin-top: 16rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.info-detail-left {
						color: rgb(51, 51, 51);
						font-size: 20rpx;
						font-weight: bold;
					}
					
					.info-detail-right {
						color: rgb(153, 153, 153);
						font-size: 16rpx;
					}
				}
			}
		}

		.order-item-info1 {
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

		// .order-item-status {
		// 	position: absolute;
		// 	top: 0;
		// 	right: 0;
		// 	width: 120rpx;
		// 	height: 120rpx;
		// 	// transform: rotateX(180deg);
		// 	background: url('../../static/images/mine/chenkuan.png') no-repeat;
		// 	background-size: 120rpx 120rpx;

		// 	.order-item-status-name {
		// 		position: absolute;
		// 		top: 30rpx;
		// 		left: 40rpx;
		// 		font-size: 24rpx;
		// 		color: rgb(255, 255, 255);
		// 		transform: rotate(45deg);
		// 	}
		// }
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
				background: rgb(10, 198, 142);
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