<template>
	<view class="auct-page">
		<!--头部-->
		<image src="/static/images/new-index/luckstar-cn.png" class="xyzx-header" v-if="!isShopCont"></image>
		<image src="/static/images/new-index/luckstar-en.png" class="xyzx-header" v-if="isShopCont"></image>
		<!--auct-head end-->
		<view class="luck_list">
			<view class="head">
				<image src="/static/images/new-index/lv-start.png" class="head_img"></image>
				<view class="head_txt">
					<view>Lucky Star</view>
					<span></span>
				</view>
			</view>

			<view class="auct-luck">
				<view class="luck-ul">
					<navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}&type=4`" open-type="navigate"
						hover-class="none" class="luck-li" v-for="item,k in LuckyList" :key="k">
						<view class="cent">
							<view class="li-img">
								<image class="img" :src="item.avatar"></image>
								<view class="vip">LV{{item.level}}</view>
							</view>
							<view class="li-txt">
								<view class="li-h">
									<view class="h-fl">
										<text class="name">{{item.nickname}}</text>
									</view>
									<view class="right">
										<view class="lis" @click.stop="onAuctionFocusLucky(item)">
											<image v-if="item.is_zan==1" src="/static/images/new/dz1.png" mode="" />
											<image v-else src="/static/images/new/dz.png" mode="" />{{item.zan_num}}
										</view>
									</view>
								</view>
								<view class="li-c">
										{{$t('auction.zaiyiu')}}<text class="color-purse"
											style="color: rgb(93, 191, 254);">{{item.shop_name}}</text>
										{{$t('auction.tigdjphd')}}<text class="color-red"
											style="color: rgb(255, 78, 47);">RM{{item.pay_price}}</text>
										{{$t('auction.jzxypzjz')}}<text class="color-red"
											style="color: rgb(255, 78, 47);">RM{{item.price}}</text>
										<block v-if="isShopCont">of </block>
										<block v-else>的</block>{{item.goods_name}}
									</view>
								<view class="li-date-f">
									<view class="bottom">
										<view class="li-date">{{$filter.to_date_time(item.update_time)}}</view>
										<view class="h-c" style="color: rgb(190,190,190);">
											{{item.stage_num}}{{$t('auction.qi')}}
										</view>
									</view>
								</view>

							</view>
						</view>
						<view class="luck-li-line" v-if="(k+1) < LuckyList.length"></view>
					</navigator>
				</view>
			</view>
		</view>

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
		data() {
			return {
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
				navId: 5, // 头部id
				banner: [], // 轮播图
				FirstList: [], // 1级分类
				page: 1, // 页码
				pagenum: 5, // 每页显示商品数目
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
				qrUrl: "",
				dateTimePickerShow: false,
				// 年列表
				yearList: [],
				// 月列表
				monthList: [],
				// 日列表
				dateList: [],
				dateTimePickerTempValue: [0, 0, 1],
				dateTimePickerValue: [0, 0, 1],
			}
		},
		watch: {
			'shopCont.auction_price': {
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
			//删除缓存临时数据
			uni.removeStorageSync('productInfo')
			uni.removeStorageSync('productId')
			uni.removeStorageSync('switch_id')
			uni.removeStorageSync('jinpaiId')

			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.cancelText = uni.getStorageSync('locale') == 'en' ? 'cancel' : '取消'
			this.confirmText = uni.getStorageSync('locale') == 'en' ? 'confirm' : '确认'
			this.qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/xyzx' // 生成二维码的链接
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
			// 最新竞拍
			this.onAuctionNewGoods()
			// 最新竞拍
			this.onAuctionNotbeginGoods()
			// 历史竞拍
			this.onAuctionHistoryGoods()
			// 幸运之星
			this.onAuctionLuckyList()
			this.navId = 5
		},
		methods: {
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

			// 选择日期时间 
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
			onFengxiangClick(id) {
				this.auction_goods_id = id
				this.qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + id // 生成二维码的链接
				this.$refs.popup2.open()
			},
			// 取消分享
			toggle2Close() {
				this.$refs.popup2.close()
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
					data: e,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			},
			// 分享--加分享次数
			onAuctionorderShare() {
				this.$http.post(this.$apiObj.shareLucky, {
					lucky_id: this.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						this.page = 1
						this.LuckyList = []
						this.onAuctionLuckyList()
					}
				})
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
				} else if (id == 3) {
					uni.switchTab({
						url: '/pages/auction/jjks'
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
			onAuctionFocusLucky(item) {
				this.$http.post(this.$apiObj.AuctionFocusLucky, {
					lucky_id: item.id
				}).then(res => {
					if (res.code == 1) {
						if (item.is_zan == 0) {
							item.is_zan = 1
							item.zan_num += 1
						} else {
							item.is_zan = 0
							item.zan_num -= 1
						}
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
				this.auction_goods_id = e.auction_goods_id
				this.qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + e.auction_goods_id // 生成二维码的链接
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
		},
		// 页面滑动到底部
		onReachBottom() {
			console.log(this.navId);
			// 判断是否还有数据
			if (this.navId == 2) {
				// 最新竞拍
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				this.onAuctionNewGoods()
			} else if (this.navId == 3) {
				// 即将开始
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				this.onAuctionNotbeginGoods()
			} else if (this.navId == 4) {
				// 历史竞拍
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				this.onAuctionHistoryGoods()
			} else if (this.navId == 5) {
				// 幸运之星
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				this.onAuctionLuckyList()
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
	.auct-page {

		.xyzx-header {
			display: block;
			width: 100%;
			height: 950rpx;
		}

		.auct-head {
			background: #FF4E2F;
			// background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
			padding: 80rpx 30rpx 15rpx 30rpx;

			.head-search {
				height: 70rpx;
				background: #ffffff;
				border-radius: 35rpx;
				display: flex;
				align-items: center;
				padding: 0 26rpx;

				.icon {
					width: 23rpx;
					height: 24rpx;
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
			width: 686rpx;
			min-height: 800rpx;
			margin: 0 auto;

			.auct-title {
				margin-bottom: 30rpx;
			}

			.luck-ul {
				background: #fff;
				padding: 0 30rpx;

				.luck-li-line {
					width: 638rpx;
					border-bottom: 1px solid rgb(204, 204, 204);
					margin: 32rpx auto 0 auto;
				}

				.luck-li {
					position: relative;
					padding: 30rpx 0;
					// border-bottom: 1px solid #f5f5f5;

					.cent {
						width: 686rpx;
						display: flex;
						margin: 0 auto;

						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 20rpx;
						}

						.vip {
							width: 72rpx;
							height: 28rpx;
							text-indent: 32rpx;
							font-size: 16rpx;
							color: rgb(219, 132, 37);
							margin-left: -4rpx;
							line-height: 25rpx;
							background: url('/static/images/new-index/vips.png') no-repeat;
							background-size: 72rpx 28rpx;
							border-radius: 12rpx;
							margin-top: 8rpx;
						}

						.li-txt {
							width: 540rpx;
							word-break: break-all;

							.li-h {
								max-width: 540rpx;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.h-fl {
									display: flex;
									align-items: center;

									.name {
										max-width: 540rpx;
										font-size: 28rpx;
										font-weight: 550;
										word-break: break-all;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}


								}

								.h-c {
									font-size: 24rpx;
									color: rgb(190, 190, 190);
								}
							}

							.li-c {
								margin: 15rpx 0;
								font-size: 24rpx;
								line-height: 40rpx;
								word-break: break-all;
							}

							.li-date {
								font-size: 22rpx;
								color: #999;
							}
						}
					}

					.right {
						display: flex;
						align-items: center;

						.lis {
							display: flex;
							align-items: center;
							margin-left: 45rpx;

							image {
								width: 40rpx;
								height: 40rpx;
								margin-right: 13rpx;
							}
						}
					}

					.bottom {
						margin-top: 25rpx;
						display: flex;
						justify-content: space-between;


					}
				}

				.luck-li:nth-last-child(1) {
					border: none;
				}
			}
		}

		.luck_list {
			position: relative;
			width: 100%;
			padding-top: 12rpx;
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;
			margin-top: -380rpx;
			z-index: 10;

			.head {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.head_img {
					width: 44rpx;
					height: 44rpx;
					// margin-left: 24rpx;
				}

				.head_txt {
					position: relative;
					font-size: 32rpx;
					color: rgb(51, 51, 51);
					margin-left: 8rpx;

					view {
						position: relative;
						z-index: 2;
					}

					span {
						position: absolute;
						bottom: 0%;
						left: 50%;
						transform: translate(-50%, 0);
						width: 92rpx;
						height: 8rpx;
						background: rgba(10, 198, 142, 0.4);
						z-index: 1;
					}
				}

				.head_more {
					position: absolute;
					right: 0;
					font-size: 20rpx;
					color: rgb(51, 51, 51);
					display: flex;
					align-items: center;

					image {
						width: 16rpx;
						height: 16rpx;
						margin-top: 4rpx;
						margin-left: 4rpx;
					}
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
		padding: 0 20rpx;

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