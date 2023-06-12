<template>
	<view class="auct-page">
		<!--auct-head start-->
		<view class="auct-head">
			<image src="../../static/images/auction/logo.png" class="logo"></image>

			<image src="../../static/images/new/cn-tit.png" class="hedaer-langes" v-show="!isShopCont"></image>
			<image src="../../static/images/new/en-tit.png" class="hedaer-langes1" v-show="isShopCont"></image>

			<image src="../../static/images/products/msg.png" class="auth" @click="navClick('/pages/mine/message')">
			</image>
			<image src="../../static/images/auction/zw.png" class="lange" v-show="!isShopCont"
				@click="onChangeLanuage(locales[0])"></image>
			<image src="../../static/images/auction/en.png" class="lange" v-show="isShopCont"
				@click="onChangeLanuage(locales[1])"></image>
			<view class="header-login" v-if="!isLogin" @click="toLogin()">{{$t('auction.login')}}</view>
			<view class="header-login" :style="isShopCont?'margin-left: 14rpx;':''" v-else="isLogin"
				@click="$refs.logout.open()">{{$t('auction.logout')}}</view>
		</view>

		<!--头部导航栏-->
		<view class="head-list">
			<view class="head-left" :class="selectProductsId==0?'select-product':''" @click="switchSelect(0)">
				<image src="../../static/images/products/all.png"></image>
				<view>{{$t('tab.all')}}</view>
			</view>
			<view class="head-line"></view>
			<view class="head-right">
				<scroll-view :scroll-x="true" style="width: 100%;white-space: nowrap;">
					<view v-for="item in FirstList" :key="item.id" class="head-right-item"
						:class="selectProductsId==item.id?'select-product':''" @click="switchSelect(item.id)">
						<image :src="item.image" class="head-right-img"></image>
						<view class="t">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<!--商品展示区域-->
		<view class="products-list">
			<view class="products-item" v-for="item in productList" :key="item.goods_id"
				@click="toProductInfo(item.goods_id)">
				<image :src="item.image"></image>
				<view class="products-item-name">{{item.goods_name}}</view>
				<view class="products-item-tags">
					<block v-for="(data,index) in item.litestore_tag">
						<view v-if="(index+1)%3==1" class="lan" >{{data.name}}</view>
						<view v-else-if="(index+1)%3==2" class="chen" :style="(index+1)%3==2?'margin-right: 0rpx;':''">{{data.name}}</view>
						<view v-else="(index+1)%3==0" class="red">{{data.name}}</view>
					</block>
				</view>
				<view class="products-item-price">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
			</view>
		</view>

		<!-- 日期时间选择器弹框 -->
		<uni-popup ref="dateTimePopup" type="bottom" :is-mask-click="false">
			<view class="custom-popup date-time-popup">
				<view class="popup-header">
					<view class="popup-cancel" @click="handleDateTimePopupCancel">{{$t('user.order.query')}}</view>
					<view class="popup-title"> </view>
					<view class="popup-confirm" @click="handleDateTimePopupConfirm">{{$t('user.order.btnsub')}}
					</view>
				</view>
				<view class="popup-body">
					<picker-view class="date-time-picker-view f-32" indicator-class="date-time-picker-center"
						:value="dateTimePickerValue" @change="handleDateTimePickerChange">
						<picker-view-column class="date-time-picker-item picker-month">
							<view class="picker-item"
								:class="{ active: dateTimePickerTempValue[0] === index, 'f-bold': dateTimePickerTempValue[0] === index }"
								v-for="(item, index) in monthList" :key="item">{{ item }}</view>
						</picker-view-column>
						<picker-view-column class="date-time-picker-item picker-date">
							<view class="picker-item"
								:class="{ active: dateTimePickerTempValue[1] === index, 'f-bold': dateTimePickerTempValue[1] === index }"
								v-for="(item, index) in dateList" :key="item">{{ item }}</view>
						</picker-view-column>
						<picker-view-column class="date-time-picker-item picker-year">
							<view class="picker-item"
								:class="{ active: dateTimePickerTempValue[2] === index, 'f-bold': dateTimePickerTempValue[2] === index }"
								v-for="(item, index) in yearList" :key="item">{{ item }}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</uni-popup>
		<!--抢拍次数 start-->
		<uni-popup ref="pwdPopup" type="center">
			<view class="qiangpaiCont">
				<view class="query" @click="onQueryClick">
					<image class="" src="../../static/images/close1.png"> </image>
				</view>
				<view class="center">
					<view class="title">{{$t('user.auctionM.qtxqpcs')}}</view>
					<view class="cent">
						<view class="txt">{{$t('user.auctionM.qpcs')}}</view>
						<view class="cont">
							<input type="number" :placeholder="$t('user.auctionM.qsrqpcs')" v-model="isauctionNum">
							<view class="num">{{$t('user.auctionM.syqpcs')}}：<block v-if="auction_num=='-1'">
									{{$t('Unlimited sho')}}
								</block>
								<block v-else>{{auction_num}}</block>
							</view>
						</view>
					</view>
					<view class="btnsub" @click="onBtnSub">{{$t('user.auctionM.queding')}}</view>
				</view>
			</view>
		</uni-popup>
		<!--抢拍次数 end-->
		<!--竞拍次数为0 start-->
		<uni-popup ref="pwdPopup3" type="center">
			<view class="jingpai-pop">
				<view class="title">{{$t('auction.detail.nsydjpcsw')}}{{auction_num}}{{$t('auction.detail.ci')}}
				</view>
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
		<!--竞拍次数为0 end-->
		<!--竞拍次数大于0 start-->
		<uni-popup ref="pwdPopup2" type="center">
			<view class="jingpai-pop">
				<view class="title">
					{{$t('auction.detail.sfqr')}}RM{{shopNum}}{{$t('auction.detail.gmygjpme')}}{{isauctionNum}}{{$t('auction.detail.gmygjpmenum')}}
				</view>
				<view class="txt" v-if="auction_num>='-1'">
					<block v-if="auction_num=='-1'">
						{{$t('Unlimited sho')}}
					</block>
					<block v-else>{{$t('auction.detail.nishengyu')}}{{auction_num}}{{$t('auction.detail.cijpjh')}}
					</block>
				</view>
				<view class="cent">
					<image class="imgs" src="../../static/images/radio2.png" mode="aspectFit|aspectFill|widthFix">
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
		</uni-popup>
		<!--竞拍次数大于0 end-->
		<!--支付方式弹出 start-->
		<uni-popup ref="popup1" type="bottom">
			<view class="mode-pop">
				<view class="mode-tit">
					<text>{{$t('auction.detail.fyzf')}}</text>
					<view class="cancel" @click="toggle1Close">{{$t('auction.detail.query')}}</view>
				</view>
				<view class="cent">
					<view class="title">{{$t('auction.detail.xuzhufufy')}}</view>
					<view class="txt"><text>RM</text>{{shopNum}}</view>
				</view>
				<view v-for="item in orderPayList" :key="item.id" class="mode-li">
					<view class="label">
						{{item.title}}
						<block v-if="item.id==1">（{{$t('auction.detail.keyongyuer')}}<text
								class="color-red">RM{{money}}</text>）</block>
					</view>
					<view class="li-fr" @click="onQuanClick(item)">
						<radio :checked="item.isShow?true:false" value="r1" />
					</view>
				</view>
				<view class="mode-bot">
					<button class="public-btn"
						@click.stop="$noMultipleClicks(onPayClick)">{{$t('auction.detail.quzhifu')}}</button>
				</view>
			</view>
		</uni-popup>
		<!--支付方式弹出 end-->
		<!--支付密码弹出 start-->
		<uni-popup ref="pwdsPopup" type="center">
			<view class="public-pop">
				<view class="pop-con">
					<view class="pop-t">
						<text>{{$t('auction.detail.qsrzfmm')}}</text>
						<view class="pay-close" @click="onPwdQuery">
							<image class="img" src="../../static/images/close1.png"></image>
						</view>
					</view>
					<view class="pop-c">
						<view class="pay-input">
							<input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd"
								:placeholder="$t('auction.detail.qsrzfmm')" />
						</view>
					</view>
					<view class="pay-bot">
						<button class="pay-btn" @click="onPwdClick">{{$t('auction.detail.btnsub')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--支付密码弹出 end-->
		<!--支付成功弹出 start-->
		<uni-popup ref="payPopup" type="center">
			<view class="payConter">
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
			</view>
		</uni-popup>
		<!--支付成功弹出 end-->
		<!--分享弹出 start-->
		<uni-popup ref="popup2" type="bottom">
			<view class="share-pop">
				<view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
				<view class="share-ul">
					<view class="share-li" @click="ontweet">
						<view class="icon">
							<image class="img" src="../../static/images/share21.png"></image>
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
							<image class="img" src="../../static/images/share23.png"></image>
						</view>
						<view class="t">Facebook</view>
					</view>
					<!-- <view class="share-li">
            <view class="icon">
              <image class="img" src="../../static/images/share24.png"></image>
            </view>
            <view class="t">微信</view>
          </view> -->
					<view class="share-li">
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
		</uni-popup>
		<!--分享弹出 end-->
		<view style="height: 20rpx;"></view>
		
		<!--退出登录弹框-->
		<uni-popup ref="logout" type="center">
			<view class="loginout">
				<image src="../../static/images/new/tck-jy.png"></image>
				<view class="loginout-info">
					<view class="loginout-info-tit">{{$t('user.xitong.onQuery')}}</view>
					<view class="loginout-info-btn">
						<view class="loginout-info-btn-cancel" @click="$refs.logout.close()">{{$t('user.xitong.query')}}
						</view>
						<view class="loginout-info-btn-ok" @click="onLogout()">{{$t('user.xitong.btnsub')}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	import apiObj from '../../http/api';
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		data() {
			return {
				selectProductsId: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				navList: [{
					id: 1,
					title: this.$t('auction.pdsy')
				}, {
					id: 2,
					title: this.$t('auction.zxinjp')
				}, {
					id: 3,
					title: this.$t('auction.jjks')
				}, {
					id: 4,
					title: this.$t('auction.lsjz')
				}, {
					id: 5,
					title: this.$t('auction.xyzx')
				}, ], // 头部分类列表
				navId: 3, // 头部id
				banner: [], // 轮播图
				FirstList: [], // 1级分类
				page: 1, // 页码
				pagenum: 10, // 每页显示商品数目
				totalPageNum: 0, // 总条数
				newsjpList: [{
					id: 1,
					title: this.$t('auction.jindu')
				}, {
					id: 2,
					title: this.$t('auction.jssj')
				}, {
					id: 3,
					title: this.$t('auction.yuanjia')
				}, {
					id: 4,
					title: this.$t('auction.jingpaijia')
				}, {
					id: 5,
					title: this.$t('auction.zhikazng')
				}, ], // 最新竞拍头部
				newsjpId: 1, // 最新竞拍头部id
				jijiangList: [{
					id: 1,
					title: this.$t('auction.kssj')
				}, {
					id: 2,
					title: this.$t('auction.yuanjia')
				}, {
					id: 3,
					title: this.$t('auction.jingpaijia')
				}, {
					id: 4,
					title: this.$t('auction.zhikazng')
				}, ], // 即将开始头部
				jijiangId: 1, // 即将开始头部id
				lishiList: [{
					id: 1,
					title: this.$t('auction.jssj')
				}, {
					id: 2,
					title: this.$t('auction.yuanjia')
				}, {
					id: 3,
					title: this.$t('auction.jingpaijia')
				}, {
					id: 4,
					title: this.$t('auction.zhikazng')
				}], // 历史竞拍头部
				lishiId: '', // 历史竞拍头部id
				jingpaiList: [], // 竞拍列表
				newsjingpaiList: [], // 即将开始
				historyList: [], // 历史竞拍
				LuckyList: [], // 幸运之星
				timeData: {},
				date_start: '', // 选择日期
				show: false,
				value1: Number(new Date()),
				keyword: '', // 搜索子
				isShopCont: false, // 商品详情显示中文还是英文
				cancelText: '',
				confirmText: '',
				auction_num: '', // 剩余竞拍次数
				isauctionNum: '', // 输入的抢拍次数
				shopCont: '', // 商品详情
				shopNum: '', // 竞拍总价
				order_no: '', // 订单编号
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
				money: '', // 总金额
				noClick: true, // 防止重复点击 
				dateTimePickerShow: false,
				// 年列表
				yearList: [],
				// 月列表
				monthList: [],
				// 日列表
				dateList: [],
				dateTimePickerTempValue: [0, 0, 1],
				dateTimePickerValue: [0, 0, 1],
				locales: [{
						text: this.$t('locale.en'),
						code: 'en'
					},
					{
						text: this.$t('locale.zh-hans'),
						code: 'zh-Hans'
					}
				],
				isLogin: false, //是否登录
				productList: [],
			}
		},
		watch: {
			keyword: {
				handler(e, m) {
					if (this.navId == 1) {
						this.pagenum = 5
					} else [
						this.pagenum = 10
					]
					this.date_start = ''
					this.page = 1
					// this.navId = id
					this.newsjpId = 1
					this.jijiangId = 1
					this.lishiId = 1
					this.jingpaiList = []
					this.newsjingpaiList = []
					this.historyList = []
					this.LuckyList = []
					this.onAuctionNewGoods()
					this.onAuctionNotbeginGoods()
					this.onAuctionHistoryGoods()
					this.onAuctionLuckyList()
				}
			},
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
			},
			dateTimePickerTempValue: {
				// 侦听开始之后立即调用
				immediate: true,
				handler(newValue) {
					this.yearList = [
						new Date().getFullYear() - 1,
						new Date().getFullYear(),
						new Date().getFullYear() + 1,
						new Date().getFullYear() + 2,
						new Date().getFullYear() + 3,
						new Date().getFullYear() + 4,
					]
					// 当前年
					const currentYear = new Date().getFullYear()
					// 当前月
					const currentMonth = new Date().getMonth() + 1
					// 当前天
					const currentDate = new Date().getDate()
					const year = this.yearList[newValue[2]]
					if (year === currentYear) {
						// 当前年
						const arr = []
						for (let index = currentMonth; index <= 12; index++) {
							arr.push(String(index).padStart(2, '0'))
						}
						this.monthList = arr
					} else {
						this.monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
					}

					const month = this.monthList[newValue[0]]
					// 获取这个月的天数
					// new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
					const dayCount = new Date(year, month, 0).getDate()
					const arr = []
					for (let index = 1; index <= +dayCount; index++) {
						arr.push(String(index).padStart(2, '0'))
					}
					this.dateList = arr
				},
			},
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.cancelText = uni.getStorageSync('locale') == 'en' ? 'cancel' : '取消'
			this.confirmText = uni.getStorageSync('locale') == 'en' ? 'confirm' : '确认'
			this.page = 1
			this.newsjpId = 1
			this.jijiangId = 1
			this.lishiId = 1
			this.jingpaiList = []
			this.newsjingpaiList = []
			this.historyList = []
			this.LuckyList = []
			this.keyword = ''
			this.date_start = ''
			this.navId = 3
			// 轮播图
			this.$http.post(this.$apiObj.AuctionBanner).then(res => {
				if (res.code == 1) {
					this.banner = res.data
				}
			})
			// 一级分类
			this.$http.post(this.$apiObj.IndexFirstCate).then(res => {
				if (res.code == 1) {
					if (this.isShopCont) {
						res.data.map(item => {
							item.name = this.getCaption(item.name, 1) ? this.getCaption(item.name, 1) :
								item.name
						})
					} else {
						res.data.map(item => {
							item.name = this.getCaption(item.name, 0) ? this.getCaption(item.name, 0) :
								item.name
						})
					}
					this.FirstList = res.data
				}
			})

			if (uni.getStorageSync('token')) {
				this.isLogin = true
			}
			// 最新竞拍
			// this.onAuctionNewGoods()
			// 最新竞拍
			// this.onAuctionNotbeginGoods()
			// 历史竞拍
			// this.onAuctionHistoryGoods()
			// 幸运之星
			// this.onAuctionLuckyList()

			//获取首页数据
			this.getAllProducts(0)
		},
		onHide() {
			this.selectProductsId = 0
		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
		},
		methods: {
			toProductInfo(id) {
				uni.navigateTo({
					url: '/pages/auction/product_info?goodsId=' + id
				})
			},
			//切换选择分类
			switchSelect(id) {
				this.selectProductsId = id
				this.productList = []
				this.page = 1
				this.pagenum = 10
				this.getAllProducts(id)
			},
			//获取首页数据
			getAllProducts(id) {
				this.$http.post(this.$apiObj.LitestoregoodsIndex, {
					page: this.page,
					pagenum: this.pagenum,
					category_id: id == 0 ? '' : id
				}).then(res => {
					if (res.code == 1) {
						this.totalPageNum = res.data.total
						res.data.data.forEach(item => {
							item.litestore_tag.forEach(data => {
								let arr = data.name.split("|")
								if (!this.isShopCont) data.name = arr[0]
								else data.name = arr[1]
							})
						})
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data.data]
					}
				})
			},
			toClassify(item) {
				uni.navigateTo({
					url: '/pages/auction/classify?id=' + item.id + '&name=' + item.name
				})
			},
			//退出登录
			onLogout() {
				this.$http.post(this.$apiObj.MineLoginOut).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.isShopCont ? 'Exit succeeded' : '退出成功',
							icon: 'none'
						})
						uni.removeStorageSync('token');
						uni.navigateTo({
							url: '../public/login'
						})
						this.$refs.logout.close()
					}
				})
			},
			//前往登录
			toLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			//切换语言
			onChangeLanuage(e) {
				uni.setStorageSync('UNI_LOCALE', e.code)
				uni.setStorageSync('locale', e.code)
				this.$i18n.locale = e.code;
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t('index.language-change-confirm'),
						success: (res) => {
							if (res.confirm) {
								uni.setLocale(e.code);
							}
						}
					})
				} else {
					uni.setLocale(e.code);
					this.$i18n.locale = e.code;
				}
				location.reload()
			},
			// 选择日期时间
			handleSelectDateTime() {
				this.$refs.dateTimePopup.open()
			},
			// 日期时间选择器改变
			handleDateTimePickerChange(event) {
				// console.log(event.detail.value)
				const value = event.detail.value
				this.dateTimePickerTempValue = value
			},
			// 日期时间选择器取消
			handleDateTimePopupCancel() {
				this.dateTimePickerTempValue = this.dateTimePickerValue
				this.$refs.dateTimePopup.close()
			},
			// 日期时间选择器确定
			handleDateTimePopupConfirm() {

				this.dateTimePickerValue = this.dateTimePickerTempValue
				const year = this.yearList[this.dateTimePickerValue[0]]
				const month = this.monthList[this.dateTimePickerValue[1]]
				const date = this.dateList[this.dateTimePickerValue[2]]
				console.log({
					year,
					month,
					date
				})

				this.date_start = `${year}-${month}-${date}`
				this.show = false
				this.historyList = []
				this.page = 1
				this.onAuctionHistoryGoods()
				this.$refs.dateTimePopup.close()
			},
			onopenClick() {
				this.$refs.dateTimePopup.open()
			},
			onfacebook() {
				let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + this.shopCont.id // 生成二维码的链接
				let url = `https://www.facebook.com/sharer/sharer.php?u=${qrUrl}`
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
			},
			ontweet() {
				let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + this.shopCont.id // 生成二维码的链接
				let url = `https://twitter.com/intent/tweet?url=${qrUrl}`
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
			// 商品关注、取消关注
			onMineFocus(item) {
				this.$http.post(this.$apiObj.MineFocus, {
					type: 3,
					data_id: item.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						if (item.goods_focus == 1) {
							uni.showToast({
								icon: 'none',
								title: this.$t('auction.query')
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: this.$t('auction.btnsub')
							})
						}
						this.newsjingpaiList = []
						this.page = 1
						this.onAuctionNotbeginGoods()
					}
				})
			},
			formatter(type, value) {
				let year = uni.getStorageSync('locale') == 'en' ? 'year' : '年'
				let month = uni.getStorageSync('locale') == 'en' ? 'month' : '月'
				let day = uni.getStorageSync('locale') == 'en' ? 'day' : '日'
				if (type === 'year') {
					return `${value}${year}`
				}
				if (type === 'month') {
					return `${value}${month}`
				}
				if (type === 'day') {
					return `${value}${day}`
				}
				return value
			},
			onNavClick(id) {
				if (id == 1) {
					this.pagenum = 5
				} else {
					this.pagenum = 10
				}
				if (id == 2) {
					uni.switchTab({
						url: '/pages/auction/auction'
					});
				} else if (id == 5) {
					uni.switchTab({
						url: '/pages/auction/xyzx'
					});
				} else {
					this.navId = id
				}
				this.keyword = ''
				this.date_start = ''
				this.page = 1
				this.newsjpId = 1
				this.jijiangId = 1
				this.lishiId = 1
				this.jingpaiList = []
				this.newsjingpaiList = []
				this.historyList = []
				this.LuckyList = []
				if (id == 1) {
					this.onAuctionNewGoods()
					this.onAuctionNotbeginGoods()
					this.onAuctionHistoryGoods()
					this.onAuctionLuckyList()
				} else if (id == 2) {
					this.onAuctionNewGoods()
				} else if (id == 3) {
					this.onAuctionNotbeginGoods()
				} else if (id == 4) {
					this.onAuctionHistoryGoods()
				} else if (id == 5) {
					this.onAuctionLuckyList()
				}
			},
			// 点击最新竞拍筛选
			onZxjpClick(id) {
				this.newsjpId = id
				this.jingpaiList = []
				this.page = 1
				this.onAuctionNewGoods()
			},
			// 最新竞拍
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.AuctionNewGoods, {
					sort: this.newsjpId,
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword
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
					}
				})
			},
			// 点击即将开始筛选
			onjjksClick(id) {
				this.jijiangId = id
				this.newsjingpaiList = []
				this.page = 1
				this.onAuctionNotbeginGoods()
			},
			// 即将开始
			onAuctionNotbeginGoods() {
				this.$http.post(this.$apiObj.AuctionNotbeginGoods, {
					sort: this.jijiangId,
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword
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
							// item.remain_time = item.remain_time * 1000
							item.datetime = (item.start_time - +Date.parse(new Date()) / 1000) * 1000
						})
						this.totalPageNum = res.data.total
						this.newsjingpaiList = this.page == 1 ? res.data.data : [...this.newsjingpaiList, ...res
							.data.data
						]
					}
				})
			},
			onlishiClick(id) {
				this.lishiId = id
				this.historyList = []
				this.page = 1
				this.onAuctionHistoryGoods()
			},
			onconfirm(e) {
				const timeFormat = uni.$u.timeFormat
				this.date_start = timeFormat(e.value, 'yyyy-mm-dd')
				this.show = false
				this.historyList = []
				this.page = 1
				this.onAuctionHistoryGoods()
			},
			// 历史竞拍
			onAuctionHistoryGoods() {
				this.$http.post(this.$apiObj.AuctionHistoryGoods, {
					sort: this.lishiId,
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword,
					date_start: this.date_start
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
						this.totalPageNum = res.data.total
						this.historyList = this.page == 1 ? res.data.data : [...this.historyList, ...res.data.data]
					}
				})
			},
			// 幸运之星
			onAuctionLuckyList() {
				this.$http.post(this.$apiObj.AuctionLuckyList, {
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword
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
						// res.data.data.map(item => {
						// item.continue_time = this.daojishi(item.continue_time)
						this.totalPageNum = res.data.total
						this.LuckyList = this.page == 1 ? res.data.data : [...this.LuckyList, ...res.data.data]
						// })
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
						this.onAuctionLuckyList()
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
			onChange(e) {
				this.timeData = e
			},
			// 点击竞拍列表
			onJingPai(item) {
				uni.navigateTo({
					url: './detail?id=' + item.auction_goods_id
				})
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 个人信息获取剩余竞拍次数
			onMineInfo(e) {
				this.isauctionNum = ''
				this.shopCont = e
				this.$http.post(this.$apiObj.MineInfo, {
					auction_goods_id: e.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						this.money = res.data.money
						this.auction_num = res.data.auction_num
						if (res.data.auction_num !== 0) {
							this.$refs.pwdPopup.open()
						} else {
							this.$refs.pwdPopup3.open()
						}
					}
				})
			},
			onQueryClick() {
				this.$refs.pwdPopup.close()
			},
			// 点击提交抢拍次数数据
			onBtnSub() {
				if (this.shopCont.auction_type == 1) {
					if (Number(this.isauctionNum) > Number(this.shopCont.total_least_num)) return uni.showToast({
						icon: 'none',
						title: this.$t('auction.detail.title') + '：' + this.shopCont.total_least_num
					})
				}
				if (Number(this.isauctionNum) > Number(this.isauctionNum)) return uni.showToast({
					icon: 'none',
					title: this.$t('user.auctionM.qtxdcsbndysy')
				})
				this.shopNum = this.shopCont.auction_price * Number(this.isauctionNum)
				this.$refs.pwdPopup.close()
				this.$refs.pwdPopup2.open()
			},
			// 点击有剩余次数取消
			ongoPayQuery() {
				this.$refs.pwdPopup2.close()
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
					auction_goods_id: this.shopCont.auction_goods_id, // 竞拍商品id
				}).then(res => {
					if (res.code == 1) {
						// this.major_no = res.data.major_no
						this.order_no = res.data.order_no
						this.$refs.pwdPopup2.close()
						this.$refs.popup1.open()
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
				this.$refs.popup1.close()
				if (isNum == 1) {
					// 余额支付弹框
					this.$refs.pwdsPopup.open()
				} else if (isNum == 2) {
					// 3方支付
					this.$http.post(this.$apiObj.AuctionorderReferOrder, {
						auction_type: 2, // 1竞拍商品原价购买，2参与竞拍价购买
						num: 1, // 购买数量
						coupon_id: '', // 优惠券id
						address_id: '', // 地址id
						remark: '', // 备注
						money: this.shopCont.auction_price, // 总金额
						auction_goods_id: this.shopCont.id, // 竞拍商品id
					}).then(res => {
						if (res.code == 1) {
							this.$http.post(this.$apiObj.MineInfo, {
								auction_goods_id: this.shopCont.auction_goods_id
							}).then(res => {
								if (res.code == 1) {
									this.money = res.data.money
									this.auction_num = res.data.auction_num
								}
							})
							this.$http.post(this.$apiObj.AuctionorderMalaysiaPay, {
								order_no: res.data.order_no,
								money: this.shopCont.auction_price
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
									div.setAttribute('style',
										'position: absolute; width: 0; height: 0; overflow: hidden;')
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
					})
				}
			},
			// 关闭支付密码
			onPwdQuery() {
				this.$refs.pwdsPopup.close()
				// uni.navigateBack({ delta: 1 })
			},
			// 点击支付成功取消按钮
			onpayQuery() {
				this.$refs.payPopup.close()
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
						this.$http.post(this.$apiObj.MineInfo, {
							auction_goods_id: this.shopCont.auction_goods_id
						}).then(res => {
							if (res.code == 1) {
								this.money = res.data.money
								this.auction_num = res.data.auction_num
							}
						})
						// this.onMineInfo()
						// this.onAuctionDetail()
						this.$refs.pwdsPopup.close()
						this.$refs.payPopup.open()
					}
				})
			},

			onQuanClick(item) {
				for (let i in this.orderPayList) {
					this.orderPayList[i].isShow = false
				}
				item.isShow = true
			},
			toggle1Close() {
				this.$refs.popup1.close()
			},
			toggle2Close() {
				this.$refs.popup2.close()
			},
			// 点击抢拍
			onQiangpai() {
				this.$refs.payPopup.close()
				this.onMineInfo(this.shopCont)
			},
			onQuery() {
				this.$refs.pwdPopup3.close()
			},
			onFengxiang() {
				this.$refs.pwdPopup.close()
				this.$refs.popup2.open()
			}
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			// 最新竞拍
			if (this.totalPageNum <= this.page * this.pagenum) return
			this.page++
			this.getAllProducts(this.selectProductsId)
		}
	}
</script>
<style>
	page {
		background: #f9f9f9;
	}
</style>
<style lang="less" scoped>
	/deep/.uni-progress-inner-bar {
		border-radius: 6rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 6rpx !important;
	}

	.auct-page {
		
		//退出登录
		.loginout {
		
			image {
				display: block;
				width: 600rpx;
				height: 372rpx;
				margin: 0 auto -46rpx auto;
			}
		
			.loginout-info {
				width: 686rpx;
				// height: 228rpx;
				padding-top: 80rpx;
				padding-bottom: 20rpx;
				background: #fff;
				border: 4rpx solid rgb(255, 78, 47);
				border-radius: 16rpx;
		
				.loginout-info-tit {
					width: 100%;
					font-size: 40rpx;
					color: rgb(44, 44, 44);
					text-align: center;
				}
		
				.loginout-info-btn {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 60rpx;
		
					view {
						width: 240rpx;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 32rpx;
						text-align: center;
						border-radius: 16rpx;
					}
		
					.loginout-info-btn-cancel {
						color: rgb(44, 44, 44);
						border: 2rpx solid rgb(255, 78, 47);
					}
		
					.loginout-info-btn-ok {
						color: #fff;
						padding: 2rpx;
						background: rgb(255, 78, 47);
						margin-left: 40rpx;
					}
				}
			}
		}
		
		
		//新的头部
		.head-list {
			width: 100%;
			height: 130rpx;
			font-size: 16rpx;
			color: rgb(148, 148, 148);
			display: flex;
			align-items: center;
			margin-top: 30rpx;

			.head-left {
				width: 170rpx;
				text-align: center;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}

			.select-product {
				font-size: 20rpx;
				font-weight: 700;
				color: rgb(255, 78, 47);

				image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.head-line {
				height: 60rpx;
				border-left: 1rpx solid rgb(190, 190, 190);
			}

			.head-right-img {
				display: block;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin: 30rpx auto 0 auto;
			}

			.head-right {
				width: 568rpx;
				margin-left: 10rpx;

				.head-right-item {
					width: 156rpx;
					height: 130rpx;
					display: inline-block;
					text-align: center;

					.select-img {
						display: block;
						width: 80rpx;
						height: 80rpx;
					}

					.t {
						width: 100%;
						height: 70rpx;
						overflow: hidden;
						white-space: normal;

					}
				}
			}
		}

		//头部列表
		.banner-list {
			width: 750rpx;
			height: 170rpx;
			padding-top: 20rpx;
			background: #fff;


			.banner-item {
				display: inline-block;
				width: 164rpx;
				height: 170rpx;
				font-size: 24rpx;
				text-align: center;

				image {
					width: 86rpx;
					height: 94rpx;
				}

				.t {
					width: 130rpx;
					height: 66rpx;
					white-space: normal;
					overflow: hidden;
					// text-overflow: ellipsis;
					word-break: break-all;
					margin: 0 auto;
				}
			}

		}

		//商品列表
		.products-list {
			width: 670rpx;

			// column-count: 2;
			display: flex;
			flex-wrap: wrap;
			// align-items: flex-start;
			justify-content: space-between;
			margin-top: 40rpx;
			margin-left: 40rpx;

			.products-item {
				width: 320rpx;
				// flex-grow: 1;
				// display: flex;
				// flex-direction: column;
				// break-inside: avoid;
				// height: 100%;
				padding-bottom: 10rpx;
				background: #fff;
				border-radius: 16rpx;
				box-shadow: 0px 4rpx 14rpx rgba(190, 190, 190, 0.3);
				margin: 0 0 30rpx 0;

				image {
					// display: block;
					width: 320rpx;
					height: 320rpx;
					border-radius: 16rpx 16rpx 0 0;
				}

				.products-item-name {
					width: 300rpx;
					font-size: 20rpx;
					color: rgb(44, 44, 44);
					margin: 10rpx auto;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.products-item-tags {
					width: 300rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					margin: 10rpx auto;

					view {
						font-size: 16rpx;
						padding: 6rpx 10rpx;
						border-radius: 6rpx;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
					}

					.lan {
						color: rgb(0, 169, 255);
						background: rgba(93, 191, 254, 0.3);
					}

					.red {
						color: rgb(255, 0, 0);
						background: rgba(255, 198, 188, 0.5);
					}

					.chen {
						color: rgb(255, 78, 47);
						background: rgba(255, 221, 175, 0.5);
					}

				}

				.products-item-price {
					font-size: 24rpx;
					color: rgb(255, 78, 47);
					margin-left: 10rpx;

					span {
						font-size: 32rpx;
					}
				}

			}
		}

		//竞拍中
		.jping {
			width: 710rpx;
			height: 280rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 16rpx;
			margin: 20rpx auto 30rpx auto;

			.jping-left {
				position: relative;
				width: 280rpx;
				height: 280rpx;
				box-sizing: border-box;
				border: 4rpx solid rgb(255, 78, 47);
				border-radius: 16rpx;

				image {
					width: 272rpx;
					height: 272rpx;
					border-radius: 12rpx;
				}

				.jping-left-q {
					position: absolute;
					left: 0;
					bottom: -4rpx;
					width: 272rpx;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 28rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(255, 78, 47, 0.3);
					border-radius: 0 0 10rpx 10rpx;
					z-index: 10;

					image {
						width: 50rpx;
						height: 50rpx;
						margin-right: 10rpx;
					}

				}
			}

			.jping-right {
				position: relative;
				width: 388rpx;
				height: 100%;
				margin-left: 20rpx;

				.jping-header {
					position: absolute;
					top: 20rpx;
					width: 100%;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					display: flex;
					align-items: center;
					justify-content: space-between;

					.jping-name {
						width: 360rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.jping-tags {
					position: absolute;
					top: 60rpx;
					width: 100%;
					height: 70rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					// display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;


					view {
						// width: 120rpx;
						height: 34rpx;
						line-height: 34rpx;
						font-size: 16rpx;
						text-align: center;
						padding: 0 10rpx;
						border-radius: 10rpx;
						margin-bottom: 4rpx;
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
					position: absolute;
					top: 134rpx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

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
						margin-right: 10rpx;
					}

				}

				.jping-sjm {
					position: absolute;
					bottom: 54rpx;
					width: 300rpx;
					// text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.jping-jd {
					position: absolute;
					bottom: 14rpx;
					width: 100%;
					font-size: 24rpx;
					color: rgb(255, 78, 47);
					display: flex;
					align-items: center;
					margin-top: 10rpx;

					.jping-jd-name {
						// width: 150rpx;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: nowrap;
					}

					.jping-jd-data {
						width: 300rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
		
		.auct-head {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			background: #FF4E2F;
			// background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
			padding: 80rpx 0rpx 15rpx 0rpx;

			.logo {
				width: 60rpx;
				height: 60rpx;
				margin-left: 40rpx;
			}

			.auth {
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
			}

			.hedaer-langes {
				width: 360rpx;
				height: 40rpx;
				margin-left: 16rpx;
			}

			.hedaer-langes1 {
				width: 360rpx;
				height: 54rpx;
				margin-left: 16rpx;
			}

			.lange {
				width: 50rpx;
				height: 50rpx;
				margin-left: 30rpx;
			}

			.header-login {
				font-size: 24rpx;
				color: #fff;
				margin-left: 30rpx;
			}

			.head-search {
				height: 70rpx;
				background: #ffffff;
				border-radius: 35rpx;
				display: flex;
				align-items: center;
				padding: 0 26rpx;
				// margin-left: 40rpx;

				.icon {
					width: 33rpx;
					height: 34rpx;
					min-width: 23rpx;
					margin-right: 15rpx;
				}

				.c {
					font-size: 26rpx;
					color: #999;
				}
			}
		}

		.auct-nav {
			background: #fff;
			padding: 30rpx 30rpx;
			display: flex;
			justify-content: space-between;
			text-align: center;

			.li {
				font-size: 26rpx;
				position: relative;
			}

			.active {
				color: rgb(255, 78, 47);
				font-weight: 550;
			}

			.active::after {
				width: 32rpx;
				height: 5rpx;
				background: rgb(255, 78, 47);
				border-radius: 3rpx;
				position: absolute;
				bottom: -10rpx;
				left: 50%;
				margin-left: -16rpx;
				display: block;
				content: "";
			}
		}

		.auct-banner {
			.banner-img {
				height: 270rpx;
			}

			/deep/ uni-swiper {
				height: 270rpx;
			}

			/deep/ uni-swiper .uni-swiper-dot {
				width: 10rpx;
				height: 10rpx;
			}

			/deep/ uni-swiper .uni-swiper-dot.uni-swiper-dot-active {
				width: 30rpx;
				height: 10rpx;
				background: #ffffff;
				border-radius: 5rpx;
			}
		}

		.auct-class {
			background: #fff;
			padding: 30rpx;
			display: flex;
			flex-wrap: wrap;

			.li {
				width: 20%;
				margin-bottom: 40rpx;
			}

			.icon {
				width: 86rpx;
				height: 95rpx;
				margin: 0 auto;
			}

			.t {
				font-size: 24rpx;
				text-align: center;
			}
		}

		.auct-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 20rpx;

			.t {
				font-size: 28rpx;
				font-weight: 550;
			}

			.more {
				font-size: 26rpx;
				display: flex;
				align-items: center;

				.icon {
					width: 10rpx;
					height: 18rpx;
					margin-left: 15rpx;
				}
			}
		}

		.auct-new {
			background: #fff;

			// padding: 10rpx 0rpx 0rpx 0rpx;
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
				}
			}
		}

		.auct-start {
			margin: 30rpx 0;

			.auct-title {
				margin-bottom: 30rpx;
			}

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
					background: #9a3064;
					background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
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
					background: rgba(90, 86, 255, 0.5);
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
					}

					.li-b {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						color: rgb(255, 78, 47);

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
				}
			}
		}

		.auct-his {
			margin: 30rpx 0;

			.auct-title {
				margin-bottom: 30rpx;
			}

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
					background: #9a3064;
					background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
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
					background: rgba(0, 0, 0, 0.5);
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
					}

					.li-time {
						// height: 45rpx;
						background: #ffe2e2;
						padding: 0 15rpx;
						display: flex;
						font-size: 22rpx;
						color: rgb(255, 78, 47);
						line-height: 45rpx;
						margin: 15rpx 0;
					}

					.li-b {
						font-size: 22rpx;
						color: #999;
					}
				}
			}
		}

		.auct-luck {
			margin: 30rpx 0;

			.auct-title {
				margin-bottom: 30rpx;
			}

			.luck-ul {
				background: #fff;
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

							.li-date {
								font-size: 22rpx;
								color: #999;
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
		}
	}

	/deep/.u-count-down__text {
		color: #fff !important;
		font-size: 22rpx !important;
	}

	.zxjpCont {
		background: #fff;
		display: flex;
		padding: 40rpx 20rpx 10rpx;

		.li {
			width: auto;
			height: 45rpx;
			line-height: 45rpx;
			background: #f5f5f5;
			border-radius: 23rpx;
			font-size: 24rpx;
			color: #000;
			margin-right: 20rpx;
			padding: 0 18rpx;

			&:nth-child(5) {
				margin-right: 0;
			}

			&.active {
				background: rgb(255, 78, 47);
				color: #fff;
			}
		}
	}

	.qiangpaiCont {
		width: 560rpx;
		background: #fff;
		position: relative;
		padding: 50rpx 0;

		.query {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			border: 1rpx solid #000;
			padding: 10rpx;

			image {
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				top: 10rpx;
			}
		}

		.center {
			.title {
				text-align: center;
				font-size: 36rpx;
				color: #000;
				font-weight: bold;
			}

			.cent {
				margin: 30rpx auto 60rpx 30rpx;
				display: flex;

				.txt {
					margin-top: 5rpx;
					font-size: 30rpx;
					font-weight: bold;
					margin-right: 10rpx;
				}

				.cont {
					input {
						width: 300rpx;
						height: 40rpx;
						border: 1rpx solid #666;
						font-size: 28rpx;
					}

					.num {
						margin-top: 10rpx;
						color: rgb(255, 78, 47);
					}
				}
			}

			.btnsub {
				margin: 0 auto;
				width: 300rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				background: rgb(255, 78, 47);
				border-radius: 15rpx;
			}
		}
	}

	.jingpai-pop {
		width: 660rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 45rpx 40rpx;

		.title {
			font-size: 32rpx;
			color: #000;
			font-weight: bold;
		}

		.txt {
			margin-top: 25rpx;
			font-size: 28rpx;
			color: rgb(255, 78, 47);
		}

		.cent {
			margin-top: 42rpx;
			display: flex;
			align-items: center;

			.imgs {
				width: 26rpx;
				height: 26rpx;
			}

			.txt1 {
				font-size: 24rpx;
				color: #999;
				margin: 0 10rpx;
			}

			.txt2 {
				font-size: 24rpx;
				color: #000;
			}
		}

		.cont {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;

				.name {
					font-size: 32rpx;
					color: #999;
					margin-right: 97rpx;
				}

				.ljfx {
					font-size: 32rpx;
					color: rgb(255, 78, 47);
				}
			}
		}
	}

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
				color: rgb(255, 78, 47);
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
					background: rgb(255, 78, 47) !important;
					border-color: rgb(255, 78, 47) !important;
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
			background: rgb(255, 78, 47);
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
			color: rgb(255, 78, 47);
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
					color: rgb(255, 78, 47);
				}
			}
		}
	}

	// 支付成功弹框
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
				width: 20%;

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

	// 日期时间选择器弹框
	.date-time-popup {
		.popup-header {
			padding: 20rpx;

			.popup-title {
				font-weight: bold;
				font-size: 30rpx;
			}
		}

		.popup-body {
			.date-time-picker-view {
				height: 500rpx;

				.date-time-picker-center {
					height: 80rpx;
				}

				.date-time-picker-item {
					// flex-grow flex-shrink flex-basis
					// flex: 0 1 auto;
					flex: 0 1 auto;
					text-align: center;

					&.picker-year {
						width: 33.333%;
						// background: pink;
					}

					&.picker-month {
						width: 33.333%;
						// background: green;
					}

					&.picker-date {
						width: 33.333%;
						// background: hotpink;
					}

					&.picker-text {
						width: 130rpx;
						// background: yellowgreen;
					}

					&.picker-time {
						width: 220rpx;
						flex: 1;
						// background: peru;
					}
				}

				.picker-item {
					line-height: 80rpx;

					&.active {
						color: #af2521;
					}
				}
			}
		}
	}

	.custom-popup {
		background: #fff;

		.popup-header {
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #f5f5f5;
			box-sizing: border-box;

			.popup-cancel,
			.popup-confirm,
			.popup-title {
				height: 84rpx;
				display: flex;
				align-items: center;
				// background: pink;
			}

			.popup-cancel,
			.popup-confirm {
				padding: 0 20rpx;
			}

			.popup-cancel {
				color: #999;
			}

			.popup-title {
				flex: 1;
				font-weight: 600;
				// background: #f5f5f5;
				display: flex;
				justify-content: center;
			}

			.popup-confirm {
				color: #af2521;
			}
		}

		.popup-body {
			min-height: 440rpx;
		}
	}
</style>