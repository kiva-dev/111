<template>
	<view class="auct-page">

		<!--普通商品-->
		<view class="product-head">
			<view>{{$t('tab.all')}}</view>
			<image src="../../static/images/auction/zw.png" class="lange" v-show="!isShopCont"
				@click="onChangeLanuage(locales[0])"></image>
			<image src="/static/images/new-index/lange.png" class="lange" v-show="isShopCont"
				@click="onChangeLanuage(locales[1])"></image>

			<image src="/static/images/new-index/msg.png" class="auth" @click="navClick('/pages/mine/message')">
			</image>
		</view>

		<view class="switch-logo">
			<view class="switch-logo-info" @click="getAllProducts(0);switch_id=0">
				<image src="/static/images/new-index/all_product.png"></image>
				<view :style="switch_id==0?'color: rgb(51, 222, 114);':''">{{$t('tab.all')}}</view>
			</view>
			<view class="switch-line"></view>
			<scroll-view :scroll-x="true" style="width: calc(750rpx - 180rpx);white-space: nowrap;"
				@scrolltoupper="isBottoming = false" @scrolltolower="isBottoming = true">
				<view class="switch-logo-info" v-for="item in FirstList" :key="item.id" @click="switchSelect(item.id)">
					<image :src="item.image"></image>
					<view :style="switch_id==item.id?'color: rgb(51, 222, 114);':''">{{item.name}}</view>
				</view>
			</scroll-view>
			<view class="sl-line">
				<view class="sl-line-bg" :style="{ left: isBottoming ? '14rpx':'0'}"></view>
			</view>
		</view>

		<!--正在抢拍的数据-->
		<view class="new-list" style="margin-top: 20rpx;">
			<view class="new-list-head">
				<block>
					<view class="new-list-head-product">{{$t('newDetail.shangpin')}}</view>
				</block>

				<image src="/static/images/new-index/sx.png" class="new-list-head-sx" @click="selectId=1"
					v-if="selectId!=1"></image>
				<image src="/static/images/new-index/sx1.png" class="new-list-head-sx" v-else></image>

				<image src="/static/images/new-index/mf.png" class="new-list-head-mf" @click="selectId=2"
					v-if="selectId!=2"></image>
				<image src="/static/images/new-index/mf1.png" class="new-list-head-mf" v-else></image>

				<image src="/static/images/new-index/p.png" class="new-list-head-p" @click="selectId=3"
					v-if="selectId!=3"></image>
				<image src="/static/images/new-index/p1.png" class="new-list-head-p" v-else></image>
				<view class="new-list-head-line"></view>
			</view>

			<!--单行显示-->
			<block v-if="selectId==1">
				<view class="new-list-item" v-for="(item,i) in productList" :key="i"
					@click="toProductInfo(item.goods_id)" @longpress="item.isMask=true">
					<image :src="item.image" class="new-list-item-left"></image>
					<view class="new-list-item-right">
						<view class="product-right-txt">{{item.goods_name}}</view>

						<view class="new-list-item-right-tags" style="top: 112rpx;">
							<block v-for="(data,index) in item.litestore_tag" :key="data.tag_id">
								<image :src="data.image"></image>
							</block>
						</view>

						<view class="new-list-item-right-start" style="top: 158rpx;">
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/xx.png"></image>
								<view>{{item.litestore_goods_focus_total}}</view>
							</view>
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/xcz.png"></image>
								<view>{{item.auction_goods_total}}</view>
							</view>
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/pl.png"></image>
								<view>{{item.litestore_goods_comment_total}}</view>
							</view>
						</view>

						<view class="new-list-item-btm">
							<view class="new-list-item-btm-price">
								<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
							</view>

							<view class="add_gwc" @click.stop="addCart(item)"></view>
						</view>

						<view class="mask" v-show="item.isMask">
							<image src="/static/images/new-index/close.png" class="close"
								@click.stop="item.isMask=false"></image>
							<view style="height: 46rpx;"></view>
							<view class="mask-info" v-for="data in item.litestore_tag">
								<image :src="data.image"></image>
								<view><u-parse :content="isShopCont?data.en_desc:data.zh_desc"></u-parse></view>
							</view>
						</view>

					</view>
				</view>
			</block>

			<!--一行双列显示-->
			<block v-else-if="selectId==2">
				<view class="new-list-item-two">
					<view class="info" v-for="(item,i) in productList" :key="i" @click="toProductInfo(item.goods_id)">
						<image :src="item.image" class="info-img"></image>
						<view class="info-tit">{{item.goods_name}}</view>

						<view class="info-tags">
							<view class="info-tag">
								<image src="/static/images/new-index/xx.png"></image>
								<view>{{item.litestore_goods_focus_total}}</view>
							</view>

							<view class="info-tag">
								<image src="/static/images/new-index/xcz.png"></image>
								<view>{{item.auction_goods_total}}</view>
							</view>

							<view class="info-tag">
								<image src="/static/images/new-index/pl.png"></image>
								<view>{{item.litestore_goods_comment_total}}</view>
							</view>
						</view>


						<view class="info-btm" style="margin-top: 32rpx;">

							<view class="info-price">
								<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
							</view>

							<view class="add_gwc" @click.stop="addCart(item)"></view>
						</view>
					</view>
				</view>
			</block>

			<!--竖向单行显示-->
			<block v-else>
				<view class="new-list-line" v-for="(item,i) in productList" :key="i"
					@click="toProductInfo(item.goods_id)">
					<image :src="item.image" class="product_img"></image>
					<view class="product_txt">{{item.goods_name}}</view>

					<view class="info">
						<view class="info-left">
							<view class="info_price">
								<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
							</view>
						</view>

						<view class="add_gwc" style="width: 64rpx;height: 64rpx;background-size: 64rpx 64rpx;"
							@click.stop="addCart(item)">
						</view>
					</view>

				</view>
			</block>

		</view>

		<image src="/static/images/new-index/gwc.png" class="gwc" @click="navClick('/pages/cart/cart')"></image>


	</view>
</template>

<script>
	import address from '@/utils/malaysiaRegion.js';
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	import apiObj from '../../http/api';
	import Mywaterfall from '@/components/Mywaterfall.vue';
	import More from '@/pages/auction/more.vue'
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		components: {
			Mywaterfall,
			More
		},
		data() {
			return {
				kdiamondSelect: false,
				showRmToKdiamond: false,
				addressInfo: {},
				isBottoming: false,
				switch_id: 0,
				id: 2, //决定当前页面展示那个竞拍数据
				title: 'Ongoing', //标题显示
				selectId: 1, //不同的显示形式
				productId: 0,
				balanceOrOther: 0,
				selectProductsId: 0,
				isShowAegin: true,
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
				}, {
					id: 3,
					title: '组合支付(余额+赠送金额)',
					isShow: false
				}],
				pay_pwd: '', // 支付密码
				money: '', // 总金额
				balance: '', //k钻余额
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
				productInfoId: 0,
				addCartTimer: ''
			}
		},

		onShow() {
			// if (!uni.getStorageSync('productInfo')) {
			// 	uni.pageScrollTo({
			// 		scrollTop: 0,
			// 		duration: 0
			// 	})
			// }

			this.scrollToTop = 0
			this.switch_id = uni.getStorageSync('switch_id') || 0
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.cancelText = uni.getStorageSync('locale') == 'en' ? 'cancel' : '取消'
			this.confirmText = uni.getStorageSync('locale') == 'en' ? 'confirm' : '确认'
			this.page = 1

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
			this.id = 2
			this.title = this.$t('new.jjks')

			this.getProductOrJinpai()

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
		beforeDestroy() {

		},
		methods: {
			//添加购物车
			addCart(item) {
				console.log(item)
				clearTimeout(this.addCartTimer)
				this.addCartTimer = setTimeout(() => {
					//检查库存
					this.$http.post(this.$apiObj.CartList).then(res => {
						res.data.data.forEach(data=>{
							if(item.admin_id == data.admin_id){
								data.goods.forEach(data2=>{
									if(data2.goods_id == item.goods_id){
										// console.log(data2.goods_id == item.goods_id)
										if(data2.stock_num < (data2.num+1)){
											uni.showToast({
												title: '库存不足',
												icon: 'none',
												duration: 2000
											})
										}else{
											this.$http.post(this.$apiObj.CartAdd, {
												goods_spec_id: item.litestore_goods_spec[0].goods_spec_id,
												num: 1
											}).then(addRes => {
												if (addRes.code == 1) {
													uni.showToast({
														icon: 'none',
														title: this.isShopCont ? 'Successfully added to shopping cart' :
															'加入购物车成功'
													})
												}
											})
										}
									}
								})
							}
						})
					})
				}, 1000)
			},
			//获取当前展示普通商品还是竞拍商品
			getProductOrJinpai() {
				this.getAllProducts(this.switch_id)
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
			switchSelection() {
				this.$on.switchSelection()
			},
			toProductInfo(id) {
				uni.setStorageSync('productInfo', true)
				uni.navigateTo({
					url: '/pages/auction/product_info?goodsId=' + id+'&type=2'
				})
			},
			//切换选择分类
			switchSelect(id) {
				this.switch_id = id
				uni.setStorageSync('switch_id', id)
				this.page = 1
				this.getAllProducts(id)
			},
			//获取首页数据
			getAllProducts(id) {
				this.productInfoId = id
				this.$http.post(this.$apiObj.LitestoregoodsIndex, {
					page: this.page,
					pagenum: this.pagenum,
					category_id: id == 0 ? '' : id,
					goods_listing_type:1
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
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data
							.data
						];
					}
				})
			},
			toClassify(item) {
				uni.navigateTo({
					url: '/pages/auction/classify?id=' + item.id + '&name=' + item.name
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


			onopenClick() {
				this.$refs.dateTimePopup.open()
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
				uni.setStorageSync('productInfo', true)
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

		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			// 最新竞拍
			// this.$bus.$emit('onReachBottom', this.selectProductsId)
			if (this.page * this.pagenum >= this.totalPageNum) return


			this.page++
			this.getAllProducts(this.productInfoId)

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

		.more-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;

			.head-input {
				position: relative;
				width: 510rpx;
				height: 64rpx;
				display: flex;
				align-items: center;
				background: #fff;
				border-radius: 64rpx;
				margin-left: 32rpx;

				.auth {
					width: 52rpx;
					height: 52rpx;
					border-radius: 50%;
					margin: 0 8rpx 0 6rpx;
				}

				.logo {
					width: 28rpx;
					height: 28rpx;
				}

				.head-input-tit {
					max-width: 300rpx;
					font-size: 20rpx;
					color: rgb(102, 102, 102);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-left: 8rpx;
				}

				.head-input-time {
					position: absolute;
					right: 24rpx;
					font-size: 20rpx;
					color: rgb(102, 102, 102);
				}
			}

			.right-btn {
				position: absolute;
				right: 24rpx;
				width: 160rpx;
				height: 64rpx;
				font-size: 20rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgb(255, 255, 255);
				border-radius: 64rpx;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 6rpx;
				}

			}

		}

		.product-head {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: rgb(10, 198, 142);

			view {
				width: 100%;
				font-size: 32rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.lange {
				position: absolute;
				right: 108rpx;
				width: 44rpx;
				height: 44rpx;
				z-index: 5;
			}

			.auth {
				position: absolute;
				right: 32rpx;
				width: 44rpx;
				height: 44rpx;
				z-index: 5;
			}

		}

		//一级分类图标
		.switch-logo {
			position: relative;
			width: 100%;
			height: 216rpx;
			background: #fff;
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.switch-line {
				height: 52rpx;
				border-right: 4rpx solid rgb(10, 198, 142);
				margin-top: -50rpx;
			}

			.switch-logo-info {
				display: inline-block;
				width: 120rpx;
				text-align: center;
				margin: 0 32rpx;

				image {
					width: 88rpx;
					height: 88rpx;
				}

				view {
					width: 120rpx;
					height: 54rpx;
					font-size: 20rpx;
					color: rgb(51, 51, 51);
					text-align: center;
					// word-break: break-all;
					overflow: hidden;
					white-space: normal;
				}

			}

			.sl-line {
				width: 36rpx;
				height: 6rpx;
				background: #E8E8E8;
				position: absolute;
				left: 50%;
				bottom: 20rpx;
				transform: translate(-50%, 0);
				border-radius: 40rpx;

				.sl-line-bg {
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

		.switch-layout {
			width: 100%;
			margin-top: 70rpx;
			background: rgb(255, 255, 255);
			padding: 24rpx 0 20rpx;
			box-sizing: border-box;

			.sl-scroll {
				width: 100%;
				white-space: nowrap;

				.sl-scroll-box {
					width: 20%;
					display: inline-block;
					text-align: center;

					image {
						width: 88rpx;
					}

					p {
						width: 100%;
						margin-top: 12rpx;
						color: rgb(51, 51, 51);
						font-size: 20rpx;
						word-break: break-all;
						word-wrap: break-word;
					}
				}
			}


		}

		//抢拍商品展示
		.new-list {
			width: 100%;
			min-height: 800rpx;
			padding: 24rpx 0;
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;
			margin-top: -64rpx;

			//头部切换
			.new-list-head {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 36rpx;

				.new-list-head-logo {
					width: 48rpx;
					height: 48rpx;
					margin-left: 32rpx;
				}

				.new-list-head-txt {
					position: relative;
					font-size: 32rpx;
					color: rgb(51, 51, 51);
					margin-left: 8rpx;

					view {
						position: relative;
						z-index: 2;
					}

					span {
						position: relative;
						display: block;
						width: 92rpx;
						height: 8rpx;
						background: rgba(255, 64, 41, 0.4);
						border-radius: 100rpx;
						margin: -8rpx auto 0 auto;
						z-index: 1;
					}
				}

				.new-list-head-product {
					font-size: 32rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
					margin-left: 32rpx;
				}

				.new-list-head-sx {
					position: absolute;
					right: 150rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-mf {
					position: absolute;
					right: 100rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-p {
					position: absolute;
					right: 50rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-more {
					position: absolute;
					right: 32rpx;
					display: flex;
					align-items: center;

					image {
						width: 16rpx;
						height: 16rpx;
						margin: 4rpx 0 0 4rpx;
					}
				}

			}

			//单行显示
			.new-list-item {
				position: relative;
				width: 686rpx;
				height: 272rpx;
				display: flex;
				align-items: center;
				background: #fff;
				box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);
				border-radius: 20rpx;
				margin: 0 auto 16rpx auto;

				.new-list-item-left {
					width: 272rpx;
					height: 272rpx;
					border-radius: 20rpx 0 0 20rpx;
				}

				.item-historical {
					position: relative;
					width: 206rpx;
					height: 272rpx;
					margin: 0 16rpx;

					.item-historical-info {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 206rpx;
						height: 206rpx;
						border-radius: 16rpx;

						image {
							width: 206rpx;
							height: 206rpx;
							border-radius: 16rpx;
						}

						view {
							position: absolute;
							bottom: 0;
							width: 206rpx;
							height: 48rpx;
							line-height: 48rpx;
							font-size: 18rpx;
							color: rgb(255, 255, 255);
							text-align: center;
							background: rgba(0, 0, 0, 0.4);
							border-radius: 0 0 16rpx 16rpx;
						}
					}

				}

				.new-list-item-right {
					position: relative;
					width: 352rpx;
					height: 100%;
					margin-left: 24rpx;


					.new-list-item-right-txt {
						position: absolute;
						top: 20rpx;
						width: 352rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.product-right-txt {
						position: absolute;
						top: 20rpx;
						width: 352rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.new-list-item-right-tags {
						position: absolute;
						top: 64rpx;
						width: 100%;
						font-size: 16rpx;
						color: rgb(102, 102, 102);
						display: flex;
						align-items: center;

						view {
							padding: 4rpx 8rpx;
							box-sizing: border-box;
							border: 1rpx solid rgb(204, 204, 204);
							border-radius: 4rpx;
							margin-right: 12rpx;
						}

						image {
							width: 28rpx;
							height: 28rpx;
							border-radius: 50%;
							margin-right: 16rpx;
						}

					}

					.new-list-item-right-start {
						position: absolute;
						top: 110rpx;
						width: 100%;
						display: flex;
						align-items: center;

						.new-list-item-right-start-info {
							min-width: 86rpx;
							font-size: 16rpx;
							color: rgb(102, 102, 102);
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 16rpx;
								height: 16rpx;
								margin-right: 4rpx;
							}
						}

						.new-list-item-right-start-info:nth-child(2) {
							border: 1rpx solid rgb(204, 204, 204);
							border-top: none;
							border-bottom: none;
						}

					}

					.new-list-item-right-jd {
						position: absolute;
						top: 146rpx;
						width: 100%;
						display: flex;
						align-items: center;

						.new-list-item-right-jd-data {
							position: relative;
							width: 280rpx;
							height: 32rpx;
							background: url('/static/images/new-index/jd-bj.png') no-repeat;
							background-size: 280rpx 32rpx;

							view {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-size: 20rpx;
								color: rgb(255, 255, 255);
								z-index: 2;
							}

							image {
								position: absolute;
								top: 50%;
								left: 2rpx;
								transform: translate(0, -50%);
								width: 228rpx;
								height: 28rpx;
								border-radius: 28rpx;
								z-index: 1;
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

					}

					.new-list-item-btm {
						position: absolute;
						bottom: 24rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.new-list-item-btm-price {

							.new {
								font-size: 20rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);

								image {
									width: 24rpx;
									height: 24rpx;
								}

								span {
									font-size: 32rpx;
								}
							}

							.old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}
						}

						.new-list-item-btm-btn {
							width: 124rpx;
							height: 48rpx;
							font-size: 24rpx;
							color: rgb(10, 198, 142);
							box-sizing: border-box;
							border: 1rpx solid rgb(10, 198, 142);
							border-radius: 100rpx;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 24rpx;
								height: 24rpx;
								margin-right: 8rpx;
							}
						}

					}

					.mask {
						position: absolute;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.86);
						border-radius: 0 20rpx 20rpx 0;
						z-index: 15;

						.close {
							position: absolute;
							right: 16rpx;
							top: 16rpx;
							width: 24rpx;
							height: 24rpx;
						}

						.mask-info {
							width: 100%;
							font-size: 16rpx;
							color: rgb(255, 255, 255);
							display: flex;
							align-items: center;
							margin-bottom: 20rpx;

							image {
								width: 36rpx;
								height: 36rpx;
								margin: 0 8rpx 0 20rpx;
							}
						}

					}

				}

				//历史商品状态
				.item-status1 {
					position: absolute;
					top: 0;
					right: 0;
					width: 120rpx;
					height: 120rpx;
					background: url('/static/images/new-index/status2.png') no-repeat;
					background-size: 120rpx 120rpx;

					view {
						position: absolute;
						top: 28%;
						left: 33%;
						font-size: 24rpx;
						color: #fff;
						transform: rotate(45deg);
					}

				}

				.item-status2 {
					position: absolute;
					top: 0;
					right: 0;
					width: 120rpx;
					height: 120rpx;
					background: url('/static/images/new-index/status3.png') no-repeat;
					background-size: 120rpx 120rpx;

					view {
						position: absolute;
						top: 28%;
						left: 33%;
						font-size: 24rpx;
						color: #fff;
						transform: rotate(45deg);
					}
				}

				//历史商品展示
				.item-historical-des {
					position: relative;
					width: 412rpx;
					height: 100%;

					.des-tit {
						position: absolute;
						top: 24rpx;
						width: 366rpx;
						line-height: 36rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.des-center {
						position: absolute;
						top: 112rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.des-center-price {
							.new {
								font-size: 20rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);

								image {
									width: 24rpx;
									height: 24rpx;
								}

								span {
									font-size: 32rpx;
								}
							}

							.old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}
						}

						.des-center-num {
							font-size: 16rpx;
							color: rgb(153, 153, 153);
						}
					}

					.des-btm {
						position: absolute;
						bottom: 24rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.left {
							display: flex;
							align-items: center;

							image {
								width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
							}

							.left-name {
								font-size: 20rpx;
								color: rgb(51, 51, 51);
								margin-left: 8rpx;
							}
						}

						.right {
							font-size: 16rpx;
							color: rgb(153, 153, 153);
						}
					}

				}

			}

			//一行多列显示
			.new-list-item-two {
				width: 686rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				margin: 0 auto;

				.info {
					width: 336rpx;
					min-height: 524rpx;
					max-height: 578rpx;
					background: rgb(255, 255, 255);
					box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);
					border-radius: 20rpx;
					margin-bottom: 20rpx;

					.info-img {
						display: block;
						width: 336rpx;
						height: 336rpx;
						border-radius: 20rpx 20rpx 0 0;
					}

					.info-tit {
						width: 302rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 16rpx auto;
					}

					.info-tags {
						min-width: 302rpx;
						display: flex;
						align-items: center;

						.info-tag {
							display: flex;
							align-items: center;
							padding: 0 16rpx;

							image {
								width: 16rpx;
								height: 16rpx;
							}

							view {
								font-size: 16rpx;
								color: rgb(102, 102, 102);
								margin-left: 8rpx;
							}
						}

						.info-tag:nth-child(2) {
							border: 1rpx solid rgb(204, 204, 204);
							border-top: none;
							border-bottom: none;
						}

					}

					.info-jd {
						position: relative;
						width: 296rpx;
						height: 32rpx;
						background: url('/static/images/new-index/jd-bj.png') no-repeat;
						background-size: 296rpx 32rpx;
						margin: 24rpx auto 28rpx auto;

						image {
							position: absolute;
							top: 50%;
							left: 2rpx;
							transform: translate(0, -50%);
							width: 228rpx;
							height: 28rpx;
							border-radius: 28rpx;
						}

						view {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							font-size: 20rpx;
							color: rgb(255, 255, 255);
						}

					}

					.info-btm {
						width: 302rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin: 0 auto;

						.new-list-item-btm-btn {
							width: 124rpx;
							height: 48rpx;
							font-size: 24rpx;
							color: rgb(10, 198, 142);
							box-sizing: border-box;
							border: 1rpx solid rgb(10, 198, 142);
							border-radius: 100rpx;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 24rpx;
								height: 24rpx;
								margin-right: 8rpx;
							}
						}

						.info-price {
							.new {
								font-size: 20rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);

								image {
									width: 24rpx;
									height: 24rpx;
								}

								span {
									font-size: 32rpx;
								}
							}

							.old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}

						}

						.info-btn {
							width: 124rpx;
							height: 48rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							box-sizing: border-box;
							border: 2rpx solid rgb(10, 198, 142);
							border-radius: 100rpx;

							image {
								width: 24rpx;
								height: 24rpx;
							}

							view {
								font-size: 24rpx;
								color: rgb(10, 198, 142);
								margin-left: 8rpx;
							}
						}
					}

				}

			}

			//竖向单行显示
			.new-list-line {
				width: 686rpx;
				padding-bottom: 24rpx;
				background: rgb(255, 255, 255);
				border-radius: 20rpx;
				box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);
				margin: 0 auto 20rpx auto;

				.product_img {
					display: block;
					width: 686rpx;
					height: 686rpx;
					border-radius: 20rpx 20rpx 0 0;
				}

				.product_txt {
					width: 628rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					margin: 16rpx auto 24rpx auto;
				}

				.info {
					width: 628rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 auto;

					.info-left {

						.info_jd {
							position: relative;
							width: 386rpx;
							height: 32rpx;
							background: url('/static/images/new-index/jd-bj.png') no-repeat;
							background-size: 386rpx 32rpx;

							image {
								position: absolute;
								top: 50%;
								left: 2rpx;
								transform: translate(0, -50%);
								width: 308rpx;
								height: 28rpx;
								border-radius: 28rpx;
							}

							view {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-size: 20rpx;
								color: rgb(255, 255, 255);
							}
						}

						.info_price {
							display: flex;
							align-items: flex-end;
							margin-top: 14rpx;

							.new {
								font-size: 24rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);
								margin-right: 8rpx;

								image {
									width: 24rpx;
									height: 24rpx;
								}

								span {
									font-size: 40rpx;
								}
							}

							.old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}
						}

					}

					.info-right {
						width: 176rpx;
						height: 68rpx;
						box-sizing: border-box;
						border: 4rpx solid rgb(10, 198, 142);
						border-radius: 140rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 36rpx;
							height: 36rpx;
							margin-right: 8rpx;
						}

						view {
							font-size: 32rpx;
							color: rgb(10, 198, 142);
						}
					}

				}

			}

			//加入购物车
			.add_gwc {
				width: 48rpx;
				height: 48rpx;
				background: url('/static/images/new-index/add_gwc.png') no-repeat;
				background-size: 48rpx 48rpx;
			}

		}

		.head-img {
			width: 750rpx;
			height: 560rpx;
			background: url('/static/images/new-index/head-img1.png') no-repeat;
			background-size: 750rpx 560rpx;
		}

		.gwc {
			position: fixed;
			right: 32rpx;
			bottom: 200rpx;
			width: 92rpx;
			height: 92rpx;
			z-index: 100;
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
	}
</style>