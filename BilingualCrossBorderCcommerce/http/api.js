let apiObj = {
	CommonUpload: 'Common/upload', // 图片上传
	Upload: '/Mine/upload', //新的图片上传
	// 登录注册
	LoginMobileRegister: 'Login/mobileRegister', // 手机号注册
	LoginMobileLogin: 'Login/mobileLogin', // 手机号登录
	LoginEmailRegister: 'Login/emailRegister', // 邮箱注册
	LoginSendEmailCode: 'Login/sendEmailCode', // 发送邮件验证码
	LoginSendMobileCode: 'Login/sendMobileCode', // 发送国际手机短信
	LoginEmailLogin: 'Login/emailLogin', // 邮箱登录
	LoginForgetPwdByEmail: 'Login/forgetPwdByEmail', // 忘记密码--邮箱重置密码
	LoginForgetPwdByMobile: 'Login/forgetPwdByMobile', // 忘记密码--手机号重置密码
	LoginEmailCodeCheck: 'Login/emailCodeCheck', // 邮箱注册时验证邮箱验证码
	LoginThirdPartyRegister: 'Login/thirdPartyRegister', // google、twitter、facebook注册
	LoginThirdPartyLogin: 'Login/thirdPartyLogin', // google、twitter、facebook登录  (code 为7时跳转绑定手机号页面)
	LoginClickNum: '/Login/clickNum', // 分析点击量接口
	LoginVerifyCode: '/Login/checkEmailCodeByApp', //邮箱验证码验证
	LoginVerifyPhone: '/Login/checkMobileCodeByApp', //手机验证码验证
	// 商城-首页
	IndexShopList: 'Index/shopList', // 首页搜索店铺
	bannerList: 'Index/bannerList', // 商城首页banner图
	IndexGoodsList: 'Index/goodsList', // 商品列表
	IndexFirstCate: 'Index/firstCate', // 一级分类
	IndexSecondCate: 'Index/secondCate', // 一级分类获取二级分类
	IndexGoodsDetail: 'Index/goodsDetail', // 商品详情
	OrderNotgetCouponList: 'Order/notgetCouponList', // 待领取的优惠券列表
	OrderGetCoupon: 'Order/getCoupon', // 领取优惠券
	OrderReferOrder: 'Order/referOrder', // 单个商品提交订单
	OrderBalancePay: 'Order/balancePay', // 余额支付
	OrderMalaysiaPay: 'Order/malaysiaPay', // 三方支付--返回支付参数
	OrderGoodsJudgeList: 'Order/goodsJudgeList', // 评价列表

	// 团购
	OrderFinishGroup: 'Order/finishGroup', // 拼团成功消息
	OrderWaitGroupList: 'Order/waitGroupList', // 拼团商品待拼团数据
	// 普通商品-购物车
	CartAdd: 'Cart/add', // 加入购物车
	CartList: 'Cart/list', // 购物车列表
	CartDelete: 'Cart/delete', // 删除购物车
	CartEdit: 'Cart/edit', // 编辑购物车
	OrderConfirmCartOrder: 'Order/confirmCartOrder', // 购物车确认订单页面数据
	OrderReferCartOrder: 'Order/referCartOrder', // 购物车提交订单
	// 竞拍
	AuctionBanner: 'Auction/banner', // 竞拍首页轮播图
	AuctionGoodsFromCate: 'Auction/goodsFromCate', // 根据一级分类获取竞拍商品列表
	AuctionNewGoods: 'Auction/newGoods', // 最新竞拍
	AuctionNotbeginGoods: 'Auction/notbeginGoods', // 即将开始
	AuctionHistoryGoods: 'Auction/historyGoods', // 历史竞拍
	AuctionDetail: 'Auction/detail', // 竞拍商品详情
	AuctionorderReferOrder: 'Auctionorder/referOrder', // 提交订单
	AuctionorderBalancePay: 'Auctionorder/balancePay', // 余额支付
	AuctionorderMalaysiaPay: 'Auctionorder/malaysiaPay', // 竞拍商品三方支付
	AuctionorderOrderList: 'Auctionorder/orderList', // 竞拍记录
	AuctionorderShare: 'Auctionorder/share', // 分享--加分享次数
	shareLucky: 'Auction/shareLucky', // 分享幸运之星记录
	AuctionLuckyList: 'Auction/luckyList', // 幸运之星
	AuctionFocusLucky: 'Auction/focusLucky', // 点赞|取消点赞幸运之星记录
	AuctionGoodLucky: 'Auction/goodLucky', // 某商品幸运之星
	
	// 个人中心
	// 修改个人信息
	MineInfo: 'Mine/info', // 个人信息
	MineChangeNickname: 'Mine/changeNickname', // 更改昵称
	MineChangeAvatar: 'Mine/changeAvatar', // 更改头像
	MineChangeMobile: 'Mine/changeMobile', // 更换手机号
	MineChangeEmail: 'Mine/changeEmail', // 更换邮箱
	MineBindEmail: 'Mine/bindEmail', // 绑定邮箱
	MineRealAuth: 'Mine/realAuth', // 实名认证申请
	MineAuthDetail: 'Mine/authDetail', // 实名认证信息
	MineLoginOut: 'Mine/loginOut', // 退出登录
	MineCancelAccount: 'Mine/cancelAccount', // 注销账号
	MineClearRead:"Mine/oneClickReadSysMsg",//系统消息一键已读
	GetMineNotRead:"Mine/existsReadSysMsg",//获取是否存在已读消息
	MineUpdateAuth:"Mine/merchantApplication",//用户申请成为商家
	MineBindClientId:"Mine/pushUserDataByClientId",//绑定用户clientid
	// 订单
	OrderOrderList: 'Order/orderList', // 普通订单列表
	OrderGroupOrderList: 'Order/groupOrderList', // 拼团订单列表
	OrderDetailOrder: 'Order/detailOrder', // 订单详情
	OrderNotpayCancelOrder: 'Order/notpayCancelOrder', // 未支付取消订单
	OrderPayCancelOrder: 'Order/payCancelOrder', // 待发货取消订单（涉及退款）
	OrderReceiptOrder: 'Order/receiptOrder', // 确认收货
	OrderReferAfter: 'Order/referAfter', // 申请售后
	OrderRefundMoney: 'Order/refundMoney', // 申请售后应退款金额
	OrderDeleteOrder: 'Order/deleteOrder', // 删除订单-取消、关闭和完成的订单可取消
	OrderWaitJudgeGoods: 'Order/waitJudgeGoods', // 待评价商品列表
	OrderJudgeOrder: 'Order/judgeOrder', // 提交评价
	OrderAuctionOrderList: 'Order/auctionOrderList', // 原价购买竞拍商品订单列表
	SelectPayType:"/Order/selectPayType",//普通商品通用支付
	
	// OrderDetailOrder: 'Order/detailOrder', // 原价购买竞拍商品订单详情
	// 售后订单
	AfterList: 'After/list', // 售后订单列表
	AfterDetail: 'After/detail', // 售后订单详情
	AfterCancel: 'After/cancel', // 撤销申请售后订单
	AfterDeleteOrder: 'After/deleteOrder', // 删除售后订单
	AfterTuiExpress: 'After/tuiExpress', // 填写退回的物流信息
	AfterReceipteGoods: 'After/receipteGoods', // 换货，确认已收到商家货品
	// 竞拍模块
	MineAttendAuction: 'Mine/attendAuction', // 我的竞拍
	MineWinAuction: 'Mine/winAuction', // 中拍记录
	MineRecordList: 'Mine/recordList', // 竞拍记录
	MineFocusAuction: 'Mine/focusAuction', // 我的关注竞拍
	MineFocusWinAuction: 'Mine/focusWinAuction', // 我的关注中拍记录
	AuctionorderMineOrder: 'Auctionorder/mineOrder', // 竞拍订单
	AuctionOrderDetail: 'Auctionorder/auctionOrderDetail', // 竞拍订单
	OrderAuctionRecordDetail:"Auctionorder/orderAuctionRecordDetail",//竞拍领奖信息
	StartSoonGetTimeList:"Auction/comingSoonByTime",//获取即将上线可选择时间
	// 优惠券列表
	MineCouponList: 'Mine/couponList', // 我的优惠券列表
	MineSetPwd: 'Mine/setPwd', // 设置支付密码
	MineSetPaypwdByMobile: 'Mine/setPaypwdByMobile', // 修改支付密码--通过手机号修改
	MineSetPaypwdByEmail: 'Mine/setPaypwdByEmail', // 修改支付密码----通过邮箱修改
	// 个人中心-地址管理
	AddressList: 'Address/list', // 地址列表
	AddressAdd: 'Address/add', // 新增收货地址
	AddressEdit: 'Address/edit', // 编辑收货地址
	AddressDelete: 'Address/delete', // 删除地址
	GetDeliveryArea: 'Common/getDeliveryArea', // 获取快递邮寄地区列表
	// 其他
	MineFocus: 'Mine/focus', // 关注或取消关注
	IndexSetting: 'Index/setting', // 隐私协议等
	MineUpgrade: 'Mine/upgrade', // 账号升级
	MineUpgradeDetail: 'Mine/upgradeDetail', // 账号升级详情
	ShopIndex: 'Shop/index', // 店铺首页
	MineFeedback: 'Mine/feedback', // 意见反馈
	IndexInviteMoney: 'Index/inviteMoney', // 邀请金额
	InvitationList: 'Mine/getRebateUserList', // 邀请列表
	// 银行卡
	MineAddBankCard: 'Mine/addBankCard', // 新增绑定
	MineDelBankCard: 'Mine/delBankCard', // 解除绑定
	MineBankCardList: 'Mine/bankCardList', // 银行卡列表
	RechargeTocash: 'Recharge/tocash', // 申请提现
	RechargeAddMoney: 'Recharge/addMoney', // 充值--等三方支付正式版申请下来再对接
	MineInviteList: 'Mine/inviteList', // 邀请记录
	MineMoneyList: 'Mine/moneyList', // 钱包明细
	MineSysmsgList: 'Mine/sysmsgList', // 系统消息列表
	readSysmsg: 'Mine/readSysmsg', // 阅读系统消息
	// 新增逻辑
	AuctionorderGoodTocash: 'Auctionorder/goodTocash', // 中拍折现
	AuctionorderWinOrder: 'Auctionorder/winOrder', // 中拍订单列表
	AuctionorderReferPick: 'Auctionorder/referPick', // 提交领货
	AuctionorderReferComplain: 'Auctionorder/referComplain', // 提交申诉
	AuctionorderComplainDetail: 'Auctionorder/complainDetail', // 申诉详情
	AuctionorderWinDetail: 'Auctionorder/winDetail', // 中拍订单详情
	AuctionorderConfirmOrder: 'Auctionorder/confirmOrder', // 确认收货
	AuctionorderAutoConfirm: 'Auctionorder/autoConfirm', // 确认完成
	RechargeTocashList: 'Recharge/tocashList', // 提现列表
	MineFocusProducts: 'Mine/focusProducts', // 我关注的商品
	MineFocusSubscribe: 'Mine/focusSubscribe', // 我关注的店铺
	//所有商品
	LitestoregoodsIndex: "/Litestoregoods/index", //所有商家商品数据列表
	ProductInfo: '/Litestoregoods/detail', //商品详情
	GoodsCommentList: '/Litestoregoods/getComment', //普通商品评论
	SendComment: '/Mine/comment', //发布评论
	getSelectCommentList: '/Litestoregoods/getSubComment', //获取子列表
	SendLike: '/Litestoregoods/like', //点赞或取消
	MineFocusList: '/Mine/focusList', //关注商品
	//公告
	NoticeIndex: "Notice/index", //获取所有公告信息
	//返佣
	MineRebateInfo: "/Mine/rebateInfo", //返佣信息
	GetCodeInfo: "/index/inviteCodeGetInfo", //根据用户邀请码获取信息
	GetInviationNum:"/Mine/getAllRebateUser",//获取返佣总人数

	//积分
	GetPoints: "/Points/getUserPoints", //获取所有积分
	GetPointsInfo: "/Points/getPointsDetailByH5UserId", //获取所有积分明细

	GetHotList: "/Auction/popularRecommendation", //热门推荐
	GetYouLikeList: "/Litestoregoods/youMayAlsoLike", //猜你喜欢

	//k砖
	addDiamond: "/Recharge/addDiamond", //充值k钻
	diamondDetail: "/Mine/kDiamondList", //k钻变化明细
	rmToKdiamond: "/Mine/rechargeConvertKDiamond", //余额充值k钻
	RechargeKdiamond:"/Recharge/kDiamondList",//k钻列表
	
	//paypal支付
	PaypalRecharge:"/recharge/payPalRecharge",
	GetOrderStatus:"/recharge/getOrderStatus",//获取订单状态
	GetPayType:"/Pay/getPayType",//获取支付方式
	
	//排行榜
	GoodLuckyLeaderboard:"/Leaderboard/goodLuckyLeaderboard",//幸运之星排行榜
	WishlistLeaderboard:"/Leaderboard/wishlistLeaderboard",//愿望清单排行榜
	InvitationListLeaderboard:"/Leaderboard/invitationListLeaderboard",//邀请清单排行榜
	RankingOnLuckStar:"/Leaderboard/goodLuckyLeaderboardRichNumberOne",//幸运之星第一名

	// 中拍
	createAuctionGoodsSharing:"/Auctiongoodssharing/createAuctionGoodsSharing", //中排商品分享的数据记录
	commentSharing:"/Auctiongoodssharing/commentSharing", //评论分享的中拍商品
	auctionGoodsSharingList:"/Auctiongoodssharing/auctionGoodsSharingList", //分享的中拍商品列表
	likes:"/Auctiongoodssharing/likes", //中拍商品的点赞次数
	auctionGoodsSharingCommentList:"/Auctiongoodssharing/auctionGoodsSharingCommentList", //分享的中拍商品评论列表
	LatestWinAuction: 'Mine/latestWinAuction', // 未领取奖品的最新竞拍记录
	
	BonusRecord:'/Mine/bonusRecord',//用户赠金记录
	
	ProductGetAddressFree:"/Litestoregoods/getDeliveryFee",//获取商品邮费
	EditOrderAddressByOne:"/order/editOrderAddress",//修改订单收货地址,适用于单个商品订单
}
export default apiObj