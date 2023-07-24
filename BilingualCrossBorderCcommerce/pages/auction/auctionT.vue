<template>
	<view class="auction-page">
		<view class="commission-head">
			<image src="@/static/xuyuan/svg.png" class="commission-head-left" @click="onReturn()">
			</image>
			<view class="title">{{title}}</view>
		</view>
		<view class="list-layout">
			<view class="ll-header">
				<view class="ll-header-left">
					<view class="left-icon">
						<image v-if="id == 1" src="@/static/images/new-index/ongoing.png" mode="widthFix"></image>
						<image v-else-if="id == 2" src="@/static/images/new-index/start-soon.png" mode="widthFix">
						</image>
						<image v-else src="@/static/images/new-index/historical.png" mode="widthFix"></image>
					</view>
					<view class="left-text">
						<p>{{title}}</p>
						<span v-if="id == 1" style="background: rgba(255, 64, 41, 0.4);"></span>
						<span v-else-if="id == 2" style="background: rgb(254, 204, 171);"></span>
						<span v-else style="background: rgba(99, 97, 250, 0.4);"></span>
					</view>
				</view>
				<view class="ll-header-right" v-if="id != 3">
					<view class="right-icon">
						<image v-if="selectId !== 1" src="/static/images/new-index/sx.png" mode="widthFix"
							@click="selectId = 1"></image>
						<image v-else src="/static/images/new-index/sx1.png" mode="widthFix"></image>
					</view>
					<view class="right-icon">
						<image v-if="selectId !== 2" src="/static/images/new-index/mf.png" mode="widthFix"
							@click="selectId = 2"></image>
						<image v-else src="/static/images/new-index/mf1.png" mode="widthFix"></image>
					</view>
					<view class="right-icon">
						<image v-if="selectId !== 3" src="/static/images/new-index/p.png" mode="widthFix"
							@click="selectId = 3"></image>
						<image v-else src="/static/images/new-index/p1.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<!--单行显示-->
			<template v-if="selectId == 1">
				<view class="new-list-item" v-for="(item,i) in productList" :key="i" @click="onJingPai(item)"
					@longpress="item.isMask=true">
					<image :src="item.image" class="new-list-item-left"
						v-if="item.check_status!=3 && item.check_status!=4"></image>
					<view class="item-historical" v-else>
						<view class="item-historical-info">
							<image :src="item.image"></image>
							<view>{{item.stage_num}}{{$t('shop.qi')}}</view>
						</view>
					</view>
					<view class="new-list-item-right" v-if="item.check_status!=3 && item.check_status!=4">
						<view class="new-list-item-right-txt">{{item.goods_name}}</view>
						<view class="new-list-item-right-tags">
							<view class="bonus" v-if="item.can_use_invite_money_rate * 1 > 0">
								<image src="/static/images/new-index/$.png" class="bonus-img"></image>
								<view class="bonus-info">{{item.can_use_invite_money_rate*1}}% bonus available</view>
							</view>
							<block v-for="(data,index) in item.tags" :key="data.tag_id">
								<image :src="data.image" class="tagimg"></image>
							</block>
						</view>

						<view class="new-list-item-right-start">
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/xx.png"></image>
								<view>{{item.wishing_pool_goods_focus_total}}</view>
							</view>
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/liulan.png"></image>
								<view>{{item.wishing_pool_goods_appear_watch_num_total}}</view>
							</view>
							<view class="new-list-item-right-start-info" v-if="item.wishing_pool_goods_lucky_total>0">
								<image src="/static/images/new-index/jianbei.png"></image>
								<view>{{item.wishing_pool_goods_lucky_total}}</view>
							</view>
						</view>

						<view class="new-list-item-right-jd" v-if="id==1">
							<view class="new-list-item-right-jd-data">
								<progress class="progress" :percent="(item.finish_rate*100).toFixed(0)" stroke-width="9"
									activeColor="#1DD181" backgroundColor="#EBEBEB" />
							</view>
							<view class="new-list-item-right-jd-auth">
								<block v-for="img in item.new_auction_avatar">
									<image :src="img"></image>
								</block>
							</view>
						</view>

						<view class="new-list-item-btm">
							<view class="new-list-item-btm-price">
								<view class="old">RM{{item.price}}</view>
								<view class="new">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
									<text
										style="color: #666666;font-weight: 400;font-size: 20rpx;margin-left: 8rpx;">(RM{{item.auction_price}})</text>
								</view>
							</view>


							<view class="new-list-item-btm-btn" v-if="id==1">
								<view @click.stop="onMineInfo(item)">{{$t('tab.xy')}}</view>
							</view>

							<view class="new-list-item-btm-btn" v-if="id==2"
								style="border: 1rpx solid rgb(248, 155, 0);">
								<image src="/static/images/new-index/time1.png" style="width: 20rpx;height: 20rpx;">
								</image>
								<u-count-down :time="item.datetime" format="HH:mm:ss"></u-count-down>
							</view>
						</view>

						<view class="mask" v-show="item.isMask">
							<image src="/static/images/new-index/close.png" class="close"
								@click.stop="item.isMask=false"></image>
							<view style="height: 46rpx;"></view>
							<view class="mask-info" v-for="data in item.tags">
								<image :src="data.image"></image>
								<view><u-parse :content="isShopCont?data.en_desc:data.zh_desc"></u-parse></view>
							</view>
						</view>

					</view>

					<view class="item-historical-des" v-else>
						<view class="des-tit">{{item.goods_name}}</view>
						<view class="des-center">
							<view class="des-center-price">
								<view class="new">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
								</view>
								<view class="old">RM{{item.price}}</view>
							</view>
							<!-- <view class="des-center-num">x{{item.join_count}}</view> -->
						</view>
						<view class="des-btm">
							<view class="left">
								<image :src="item.shop_logo"></image>
								<view class="left-name">{{item.shop_name}}</view>
							</view>
							<view class="right">{{$u.timeFormat(item.end_time, 'yyyy/mm/dd hh:MM')}}</view>
						</view>
					</view>

					<view class="item-status1" v-if="item.check_status==3">
						<view>Closure</view>
					</view>

					<view class="item-status2" v-if="item.check_status==4">
						<view>Unsold</view>
					</view>

				</view>
			</template>

			<!--一行双列显示-->
			<template v-else-if="selectId == 2">
				<view class="new-list-item-two">
					<view class="info" v-for="(item,i) in productList" :key="i" @click="onJingPai(item)"
						style="height: 600rpx;">
						<image :src="item.image" class="info-img"></image>
						<view class="info-tit">{{item.goods_name}}</view>

						<view class="bonus-two" style="bottom: 200rpx;" v-if="item.can_use_invite_money_rate * 1 > 0">
							<image src="/static/images/new-index/$.png" class="bonus-img"></image>
							<view class="bonus-info">{{item.can_use_invite_money_rate*1}}% bonus available</view>
						</view>

						<view class="info-tags">
							<view class="info-tag">
								<image src="/static/images/new-index/xx.png"></image>
								<view>{{item.wishing_pool_goods_focus_total}}</view>
							</view>

							<view class="info-tag">
								<image src="/static/images/new-index/liulan.png"></image>
								<view>{{item.wishing_pool_goods_appear_watch_num_total}}</view>
							</view>

							<view class="info-tag" v-if="item.wishing_pool_goods_lucky_total>0">
								<image src="/static/images/new-index/jianbei.png"></image>
								<view>{{item.wishing_pool_goods_lucky_total}}</view>
							</view>
						</view>

						<view class="info-jd" v-if="id==1">
							<progress class="progress" :percent="(item.finish_rate*100).toFixed(0)" stroke-width="9"
								activeColor="#1DD181" backgroundColor="#EBEBEB" />
						</view>

						<view class="info-btm">
							<view class="info-price">
								<view class="old">RM{{item.price}}</view>
								<view class="new">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
									<text
										style="color: rgb(153, 153, 153);font-weight: 400;font-size: 16rpx;margin-left: 8rpx;">(RM{{item.auction_price}})</text>
								</view>
							</view>

							<view class="info-btn" v-if="id==1">
								<view @click.stop="onMineInfo(item)">{{$t('tab.xy')}}</view>
							</view>
						</view>

						<view class="new-list-item-btm-btn1" v-if="id==2" style="border: 1rpx solid rgb(248, 155, 0);">
							<image src="/static/images/new-index/time1.png" style="width: 20rpx;height: 20rpx;">
							</image>
							<u-count-down :time="item.datetime" format="HH:mm:ss"
								style="color: rgb(248, 155, 0);"></u-count-down>
						</view>

					</view>
				</view>
			</template>

			<!--竖向单行显示-->
			<template v-else>
				<view class="new-list-line" v-for="(item,i) in productList" :key="i" @click="onJingPai(item)">
					<image :src="item.image" class="product_img"></image>
					<view class="product_txt">{{item.goods_name}}</view>

					<view class="bonus-two" v-if="item.can_use_invite_money_rate * 1 > 0">
						<image src="/static/images/new-index/$.png" class="bonus-img"></image>
						<view class="bonus-info">{{item.can_use_invite_money_rate*1}}% bonus available</view>
					</view>

					<view class="info">
						<view class="info-left">
							<view class="info_jd" v-if="id==1">
								<progress class="progress" :percent="(item.finish_rate*100).toFixed(0)" stroke-width="9"
									activeColor="#1DD181" backgroundColor="#EBEBEB" />
							</view>
							<view class="info_price">
								<view class="old">RM{{item.price}}</view>
								<view class="new">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
									<text
										style="color: rgb(153, 153, 153);font-weight: 400;font-size: 16rpx;margin-left: 8rpx;">(RM{{item.auction_price}})</text>
								</view>
							</view>
						</view>

						<view class="info-right" v-if="id==1">
							<view @click.stop="onMineInfo(item)">{{$t('tab.xy')}}</view>
						</view>
						<view class="new-list-item-btm-btn" style="border: 1rpx solid rgb(248, 155, 0);" v-if="id==2">
							<image src="/static/images/new-index/time1.png" style="width: 20rpx;height: 20rpx;">
							</image>
							<u-count-down :time="item.datetime" format="HH:mm:ss"
								style="color: rgb(248, 155, 0);"></u-count-down>
						</view>
					</view>

				</view>
			</template>
		</view>

		<!--抢拍次数 start-->
		<uni-popup ref="pwdPopup" type="center">
			<view class="qiangpaiShow">
				<!-- <image src="../../static/images/new/tck.png" class="kct"></image> -->
				<view class="query" @click="$refs.pwdPopup.close()">
					<image src="/static/images/kbrick/close.png"> </image>
				</view>
				<view class="qiangpaiCont">
					<view class="center">
						<view class="cent">
							<view class="cont">
								<view class="tit">{{$t('new.qpsl')}}</view>

								<view class="my-input">
									<view class="input-img" @click="isauctionNum>1?isauctionNum--:isauctionNum">
										<image src="/static/images/kbrick/jian.png"></image>
									</view>
									<view class="input-info">
										<input type="number" v-model="isauctionNum" @blur="numBlur()"></input>
									</view>
									<view class="input-img"
										@click="auction_num == '-1' ? isauctionNum++ : isauctionNum < auction_num ? isauctionNum++:isauctionNum">
										<image src="/static/images/kbrick/jia.png"></image>
									</view>
								</view>

								<view class="num">
									<view style="color:#2c2c2c">{{$t('user.auctionM.syqpcs')}}</view>：
									<block v-if="auction_num == '-1'">
										{{$t('Unlimited sho')}}
									</block>
									<block v-else>{{auction_num}}</block>
								</view>
								<view class="protocol">
									<image src="/static/images/new-index/wxz.png" class="protocol_img"
										v-show="!selectProtocol" @click="selectProtocol=true"></image>
									<image src="/static/images/new-index/xz.png" class="protocol_img"
										v-show="selectProtocol" @click="selectProtocol=false"></image>
									<view class="protocol_info">
										<view class="protocol_txt1">{{$t('auction.detail.brywqydbty')}}</view>
										<navigator url="../mine/jpxy" hover-class="none" class="protocol_txt2">
											{{$t('auction.detail.jphdgommzxy')}}
										</navigator>
									</view>

								</view>
							</view>
						</view>
						<view class="qiangpai-btn">
							<view class="btnsub" @click="onBtnSub">{{$t('auction.detail.btnsub')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--抢拍次数 end-->

		<!--竞拍次数为0 start-->
		<uni-popup ref="pwdPopup3" type="center">
			<view class="jingpai-pop">
				<view class="title">{{$t('auction.detail.nsydjpcsw')}}{{auction_num}}{{$t('auction.detail.ci')}}</view>
				<view class="txt">{{$t('auction.detail.cgfxhyqhykhdjpcs')}}</view>
				<view class="cont">
					<view></view>
					<view class="right">
						<view class="name" @click="$refs.pwdPopup3.close()">{{$t('auction.detail.query')}}</view>
						<!-- <view class="ljfx" @click="onFengxiang">{{$t('auction.detail.lijifenxiang')}}</view> -->
					</view>
				</view>
			</view>
		</uni-popup>
		<!--竞拍次数为0 end-->

		<!--竞拍次数大于0 start-->
		<uni-popup ref="pwdPopup2" type="center">
			<view class="jingpai-ok">
				<!-- <image src="../../static/images/new/tck.png" class="kct"></image> -->
				<view class="jingpai-pop">
					<view class="title">
						{{$t('auction.detail.sfqr')}} {{shopNum}} {{$t('new.kz')}} {{$t('auction.detail.gmygjpme')}}
						{{isauctionNum}} {{$t('auction.detail.gmygjpmenum')}}
					</view>
					<view class="txt" v-if="auction_num>='-1'">
						<block v-if="auction_num=='-1'">
							{{$t('Unlimited sho')}}
						</block>
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
							<view class="name" @click="$refs.pwdPopup2.close()">{{$t('auction.detail.query')}}</view>
							<view class="ljfx" @click="onOrderReferCartOrder">{{$t('auction.detail.btnsub')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--竞拍次数大于0 end-->

		<!--支付方式弹出 start-->
		<uni-popup ref="popup1" type="bottom">
			<view class="mode-pop">
				<image src="/static/images/close1.png" class="mode-close" @click="$refs.popup1.close()"></image>
				<view class="mode-tit">
					<image src="/static/images/kbrick/diamond.png"></image>
					<view v-if="!useInvite">{{shopNum}}</view>
					<view v-else>
						{{changShopNum.toFixed(2)}}
					</view>
				</view>
				<view class="mode-des">{{$t('new.xyzf')}}</view>
				<view class="mode-banlace" v-show="balance*1 < shopNum">{{$t('new.kzyebz')}}</view>
				<view class="mode-info">
					<image src="/static/images/kbrick/diamond.png" class="logo"></image>
					<view class="info-tit">
						<view class="info-name">{{$t('new.kzzf')}}</view>
						<view class="info-price">({{$t('new.kz')}}:<text>{{balance}}</text>)</view>
					</view>
					<view class="mode-info-right" @click="showRmToKdiamond=!showRmToKdiamond">
						<view>{{$t('new.dhfk')}}</view>
						<image src="/static/images/kbrick/btm.png" v-show="!showRmToKdiamond"></image>
						<image src="/static/images/kbrick/top.png" v-show="showRmToKdiamond"></image>
					</view>
				</view>
				<view class="mode-more" v-show="showRmToKdiamond">
					<view class="tit">{{$t('new.jh')}}:</view>
					<image src="/static/images/kbrick/diamond.png" class="logo"></image>
					<template v-if="!useInvite">
						<view class="num">{{(rmtoKdiamondNum*1).toFixed(2)}}</view>
						<view class="price">RM <text>{{(rmtoKdiamondNum*1).toFixed(2)}}</text></view>
					</template>
					<template v-else>
						<view class="num">{{(useInviteRmNum*1).toFixed(2)}}</view>
						<view class="price">RM <text>{{(useInviteRmNum*1).toFixed(2)}}</text></view>
					</template>
					<image src="/static/images/new-index/wxz.png" class="select"
						v-show="!kdiamondSelect && (((shopNum*1 - balance*1) > 0 && money*1 >= (shopNum*1 - balance*1)) && !useInvite || (can_use_invite_money_rate > 0 && money *1 >=useInviteRmNum && useInvite && balance*1 < shopNum*1 && useInviteRmNum>0)) "
						@click="kdiamondSelect=true"></image>
					<image src="/static/images/new-index/xz.png" class="select"
						v-show="kdiamondSelect && (((shopNum*1 - balance*1) > 0 && money*1 >= shopNum*1) && !useInvite || (can_use_invite_money_rate>0 && money *1 >=useInviteRmNum && useInvite && balance*1 < shopNum*1 && useInviteRmNum>0))"
						@click="kdiamondSelect=false"></image>
				</view>

				<view style="color: rgb(102, 102, 102);margin: 12rpx 0 0 100rpx;" v-if="useInvite">({{$t('new.zjkc')}}
					{{zenjinToRmNum.toFixed(2)}}
					{{$t('new.kz')}})
				</view>

				<view class="mode-cz" v-if="balance*1 < shopNum*1">
					<view @click="toRecharge()">{{$t('new.qcz')}}</view>
					<image src="/static/images/kbrick/right.png"></image>
				</view>

				<view class="mode-switch" v-if="can_use_invite_money_rate>0">
					<image src="/static/images/new-index/wxz.png" v-show="!useInvite" @click="useInvite=!useInvite">
					</image>
					<image src="/static/images/new-index/xz.png" v-show="useInvite" @click="useInvite=!useInvite">
					</image>
					<view>({{$t('new.zjkc')}} {{can_use_invite_money_rate}}% {{$t('new.kz')}})</view>
				</view>
				<view class="mode-switch" v-else></view>
				<view class="mode-btn" @click.stop="$noMultipleClicks(onPayClick)">{{$t('new.payment')}}</view>
			</view>
		</uni-popup>
		<!--支付方式弹出 end-->

		<!--支付密码弹出 start-->
		<uni-popup ref="pwdsPopup" type="center">
			<view class="pay-pwd">
				<image src="/static/images/kbrick/close.png" class="pay-pwd-close" @click="$refs.pwdsPopup.close()">
				</image>
				<view class="pay-pwd-info">
					<view class="pay-pwd-info-tit">{{$t('auction.detail.qsrzfmm')}}</view>
					<view class="pay-pwd-info-line"></view>
					<view class="pay-pwd-info-price">{{$t('new.kz')}} {{shopNum}}</view>
					<view class="pay-pwd-info-input">
						<input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd"
							:placeholder="$t('auction.detail.qsrzfmm')" />
					</view>
					<view class="pay-pwd-info-btn" @click="onPwdClick">{{$t('auction.detail.btnsub')}}</view>
				</view>
			</view>
		</uni-popup>
		<!--支付密码弹出 end-->

		<!--支付成功弹出 start-->
		<uni-popup ref="payPopup" type="center">
			<view class="pay-pwd">
				<view class="pay-pwd-info" style="height: 308rpx;">
					<view class="pay-pwd-info-tit" style="font-size: 32rpx;">{{$t('auction.detail.gxnzfcgznzp')}}</view>
					<view class="pay-pwd-info-price" style="font-size: 26rpx;margin-top: 30rpx;">
						{{$t('auction.detail.zpydzpjlgg')}}
					</view>
					<view class="pay-pwd-list">
						<view class="pay-pwd-list-cancel" @click="$refs.payPopup.close()">{{$t('auction.detail.query')}}
						</view>
						<view class="pay-pwd-list-ok" @click="onQiangpai" v-if="isShowAegin">
							{{$t('tab.xy')}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--支付成功弹出 end-->

		<!-- 右侧固定栏 -->
		<!-- <view class="leftSider" :class="[transformClass?'removeRightX':'removeLeftX','shopCart']">
			<view class="imgArr" v-if="imgShow">
				<view>
					<img src="/static/images/mine/aixin.png" class="minImg" alt="">
				</view>
				<view class="people">
					<img src="/static/images/mine/p.png" class="pImg" alt="">
				</view>
				<view>
					<img src="/static/images/mine/listener.png" class="minImg" alt="">
				</view>
			</view>
			<image src="/static/images/new-index/addImg.png" class="newListImgDeg" v-if="imgShow" @click="transformImg">
			</image>
			<image src="/static/images/new-index/addImg.png" class="newListImg" @click="transformImg" v-else></image>
		</view> -->

		<!-- 许愿 -->
		<view class="containerXy" v-if="list.length!=0 && id!=3">
			<view class="xy">
				<img src="/static/xuyuan/xy.png" class="xyImg" />
			</view>
			<text class="txt">{{$t('xylist')}}</text>
			<text class="btn">{{$t('xytitle')}}</text>
			<view class="itemBox">
				<view class="itemBox_a" v-for="item in list" :key="item.id" @click.stop="toProductInfo(item)">
					<image :src="item.image" class="itemImg" />
					<text class="title">{{item.goods_name}}</text>
					<view class="iconArr">
						<view class="iconArr_item">
							<image src="/static/xuyuan/xx.png"></image>
							<text class="iconArr_txt">{{item.wishing_pool_goods_focus_total || 0}}</text>
						</view>
						<view class="iconArr_item">
							<image src="/static/xuyuan/ax.png"></image>
							<text class="iconArr_txt">{{item.wishing_pool_goods_appear_watch_num_total || 0}}</text>
						</view>
						<view class="iconArr_item" v-if="item.wishing_pool_goods_lucky_total>0">
							<image src="/static/xuyuan/jiang.png"></image>
							<text class="iconArr_txt">{{item.wishing_pool_goods_lucky_total || 0}}</text>
						</view>
					</view>
					<view class="">
						<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
					</view>
					<view class="imgBottom">
						<view class="left">
							<image src="/static/images/kbrick/diamond.png" mode=""></image>
							<text class="zs">{{item.wish_price}}</text>
						</view>
						<view class="right">
							<text>(RM{{item.wish_price}})</text>
						</view>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	import apiObj from '@/http/api.js';
	import {
		h
	} from "vue";
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
				pagenum: 10, // 每页显示商品数目
				page: 1,
				transformClass: false, //购物车icon是否添加平移效果
				timer: '', //记录定时器状态
				imgShow: true, //三个图标入口
				useInvite: false, //是否使用赠金
				rmtoKdiamondNum: 0,
				useInviteRmNum: 0, //勾选使用赠金后rm可用数量
				invite_money_balance: 0,
				can_use_invite_money_rate: 0, //可使用的增金比例
				selectProtocol: false,
				kdiamondSelect: false,
				showRmToKdiamond: false,
				isBottoming: false,
				id: 2, //决定当前页面展示那个竞拍数据
				title: 'Ongoing', //标题显示
				selectId: 1, //不同的显示形式
				productId: 0,
				balanceOrOther: 0,
				isShowAegin: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				navId: 1, // 头部id
				page: 1, // 页码
				pagenum: 10, // 每页显示商品数目
				totalPageNum: 0, // 最新竞拍总条数
				newTotalPageNum: 0, // 即将开始竞拍总条数
				historyTotalPageNum: 0, // 最新竞拍总条数
				newsjpId: 1, // 最新竞拍头部id
				jijiangId: 1, // 即将开始头部id
				lishiId: '', // 历史竞拍头部id
				jingpaiList: [], // 竞拍列表
				newsjingpaiList: [], // 即将开始
				historyList: [], // 历史竞拍
				LuckyList: [], // 幸运之星
				timeData: {},
				date_start: '', // 选择日期
				show: false,
				value1: Number(new Date()),
				keyword: '', // 搜索关键字
				isShopCont: false, // 商品详情显示中文还是英文
				auction_num: '', // 剩余竞拍次数
				isauctionNum: '', // 输入的抢拍次数
				shopCont: {
					auction_goods_id: 0
				}, // 商品详情
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
				productList: [],
				productInfoId: 0,
				jinPaiTimer: '',
				list: [], //列表
				zenjinToRmNum: 0, //赠金可以用于扣除的数量
				changShopNum: 0, //使用赠金后的k钻
				set_paypwd: '',
				totalNum: 0
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
						}, {
							id: 2,
							title: this.$t('new.zfjezf'),
							isShow: false
						}]
					} else {
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
		},
		onLoad(e) {
			this.getAllProducts() //列表数据
			if (e.id == 1) {
				this.id = e.id
				this.title = this.$t('tab.zzxy')
				this.onAuctionNewGoods()
			} else if (e.id == 2) {
				this.id = e.id
				this.title = this.$t('new.jjks')
				this.onAuctionNotbeginGoods()
			} else {
				if (uni.getStorageSync('wish_info')) {
					this.id = 1
					this.title = this.$t('tab.zzxy')
					this.onAuctionNewGoods()
				} else {
					this.id = e.id
					this.title = this.$t('new.lsjl')
					this.onAuctionHistoryGoods()
				}
			}
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			});
			if (uni.getStorageSync('token')) {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						// 判断是否设置支付密码
						this.set_paypwd = res.data.set_paypwd
					}
				})
			}
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.page = 1
			this.newsjpId = 1
			this.jijiangId = 1
			this.lishiId = 1
			this.jingpaiList = []
			this.newsjingpaiList = []
			this.historyList = []
			this.LuckyList = []
			this.date_start = ''
			this.navId = 3

			if (uni.getStorageSync('recharge')) {
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.balance = res.data.k_diamond_wallet
						this.set_paypwd = res.data.set_paypwd
					}
				})
				uni.removeStorageSync('recharge')
			}

			if (uni.getStorageSync('wish_info')) {
				let info = uni.getStorageSync('wish_info')
				let mine = uni.getStorageSync('mine-info')
				this.onMineInfo(mine)
				this.isauctionNum = info.isauctionNum
				setTimeout(() => {
					this.onBtnSub()
					uni.removeStorageSync('wish_info')
					uni.removeStorageSync('mine-info')
				}, 1000)
			}
		},
		onReachBottom() {
			if (this.page * this.pagenum < this.historyTotalPageNum && this.id == 3) {
				this.page++;
				this.onAuctionHistoryGoods()
			}
			if (this.page * this.pagenum < this.totalNum && this.id != 3) {
				this.page++;
				this.getAllProducts();
			}
		},
		//监听页面滚动
		onPageScroll(e) {
			this.transformClass = true
			clearTimeout(this.timer) //每次滚动前 清除一次
			// 如果停留则表示滚动结束  一旦空了1s就判定为滚动结束
			this.timer = setTimeout(() => {
				this.transformClass = false //滚动结束清除class类名
			}, 1000)
		},
		methods: {
			toRecharge() {
				uni.setStorageSync('recharge', true)
				this.navClick('/pages/mine/K_brick_detail')
			},
			//获取许愿列表详情页
			toProductInfo(item) {
				uni.navigateTo({
					url: './autionDetail?goodsId=' + item.goods_id
				})
			},
			numBlur() {
				if (this.isauctionNum < 1) {
					this.isauctionNum = 1
				} else if (this.auction_num != '-1' && this.isauctionNum <= this.auction_num) {
					let arr = this.isauctionNum.split('.')
					if (arr.length > 1) this.isauctionNum = arr[0]
				} else if (this.auction_num != '-1' && this.isauctionNum > this.auction_num) {
					this.isauctionNum = this.auction_num
				}
			},
			//获取许愿列表
			getAllProducts() {
				this.$http.post(this.$apiObj.LitestoregoodsIndex, {
					page: this.page,
					pagenum: this.pagenum,
					category_id: '',
					goods_listing_type: 2
				}).then(res => {
					this.totalNum = res.data.total
					this.list = this.page == 1 ? res.data.data : [...this.list, ...res.data.data]
				})
			},
			//点击返回按钮、
			onReturn() {
				// #ifdef H5
				if (uni.getStorageSync('window_href')) {
					window.history.go(-1)
				} else {
					uni.navigateBack()
				}
				// #endif
				// #ifdef APP-PLUS
				uni.navigateBack()
				// #endif
			},
			//点击图片出现入口并且图片旋转
			transformImg() {
				this.imgShow = !this.imgShow
			},
			getProductOrJinpai() {
				// 最新竞拍

				// 最新竞拍

				// 历史竞拍

				//记住当前竞拍选择的品类
				let id = uni.getStorageSync('jinpaiId')
				if (id) {
					this.id = id
					this.switchJinpai(id)
				}
			},
			//数据切换
			switchJinpai(id) {
				this.id = id
				this.selectId = 1
				if (this.id == 1) {
					this.title = this.$t('new.zzjp')
					uni.setStorageSync('jinpaiId', 1) //更新当前选择的竞拍id
					this.onAuctionNewGoods()
				} else if (this.id == 2) {
					this.title = this.$t('new.jjks')
					uni.setStorageSync('jinpaiId', 2) //更新当前选择的竞拍id
					this.onAuctionNotbeginGoods()
				} else {
					this.title = this.$t('new.lsjl')
					uni.setStorageSync('jinpaiId', 3) //更新当前选择的竞拍id
					this.onAuctionHistoryGoods()
				}
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
			// 最新竞拍
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.AuctionNewGoods, {
					sort: this.newsjpId,
					page: this.page,
					pagenum: 100,
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
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data.data]

					}
				})
			},
			// 即将开始
			onAuctionNotbeginGoods() {
				this.$http.post(this.$apiObj.AuctionNotbeginGoods, {
					sort: this.jijiangId,
					page: this.page,
					pagenum: 100,
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
							let time = (item.start_time - Date.parse(new Date()) / 1000) *
								1000
							this.$set(item, 'datetime', time)
						})
						this.newTotalPageNum = res.data.total
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res
							.data.data
						]
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
						this.historyTotalPageNum = res.data.total
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data
							.data
						]

					}
				})
			},
			// 幸运之星
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
			// 点击竞拍列表
			onJingPai(item) {
				uni.setStorageSync('productInfo', true)
				uni.navigateTo({
					url: './detail?id=' + item.auction_goods_id
				})
			},
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 个人信息获取剩余竞拍次数
			onMineInfo(e) {
				let that = this
				uni.setStorageSync('mine-info', e)
				this.isauctionNum = 1
				this.shopCont = e
				that.pay_pwd = ''
				that.kdiamondSelect = false
				that.showRmToKdiamond = false
				this.selectProtocol = false
				this.useInvite = false

				that.orderPayList.forEach(item => {
					item.isShow = false
				})
				this.$http.post(this.$apiObj.MineInfo, {
					auction_goods_id: e.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						this.invite_money_balance = res.data.invite_money_balance
						this.can_use_invite_money_rate = res.data.can_use_invite_money_rate
						this.money = res.data.recharge_money_balance
						this.balance = res.data.k_diamond_wallet
						// this.auction_num = res.data.auction_num
						this.auction_num = (e.auction_type == 2 && e.total_least_num == 0) ? res.data
							.auction_num :
							(res.data.auction_num === -1) ? e.total_least_num : (res.data.auction_num < e
								.total_least_num) ? res.data.auction_num : e.total_least_num
						if (res.data.auction_num !== 0) {
							if (uni.getStorageSync('wish_info')) return
							this.$refs.pwdPopup.open()
						} else {
							this.$refs.pwdPopup3.open()
						}
					}
				})
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
				if (!this.selectProtocol && !uni.getStorageSync('wish_info')) return uni.showToast({
					icon: 'none',
					title: this.$t('login.qydxybty')
				})

				this.shopNum = this.shopCont.auction_price * Number(this.isauctionNum)
				if (!uni.getStorageSync('wish_info')) this.$refs.pwdPopup.close()


				//RM最多兑换多少k钻
				this.rmtoKdiamondNum = this.shopNum * 1 > this.balance * 1 ? this.shopNum * 1 - this.balance * 1 : 0
				//使用赠金后的k钻数量
				this.changShopNum = this.shopNum * 1 - (this.invite_money_balance * 1 > this.shopNum * 1 * (this
					.can_use_invite_money_rate * 1 / 100) ? this.shopNum * 1 * (this.can_use_invite_money_rate *
					1 / 100) : this.invite_money_balance * 1)
				//赠金可抵扣rm的数量
				this.zenjinToRmNum = (this.invite_money_balance * 1 > this.shopNum * 1 * (this.can_use_invite_money_rate *
						1 / 100) ? this.shopNum * 1 * (this.can_use_invite_money_rate * 1 / 100) : this
					.invite_money_balance * 1)

				//最多使用多少赠金
				let zjPrice = (this.shopNum * 1) * (this.can_use_invite_money_rate * 1 / 100)

				if (this.balance * 1 < this.shopNum * 1 && this.balance * 1 < (zjPrice > this.invite_money_balance * 1 ?
						this.shopNum * 1 - this.invite_money_balance * 1 : this.shopNum * 1 - zjPrice)) {
					//如果最大赠金小于自己的赠金
					if (zjPrice <= this.invite_money_balance * 1) {
						//计算使用赠金后的兑换金额
						this.useInviteRmNum = this.shopNum * 1 - zjPrice - this.balance * 1
					} else {
						//赠金不足
						this.useInviteRmNum = this.shopNum * 1 - this.invite_money_balance * 1 - this.balance * 1
					}
				}

				this.onOrderReferCartOrder()
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
				//如果单纯使用k钻支付
				if (this.balance * 1 < this.shopNum && !this.kdiamondSelect && !this.useInvite) {
					uni.showToast({
						icon: 'none',
						title: this.$t('new.kzyebz'),
						duration: 3000,
						success: () => {
							uni.setStorageSync('recharge', true)
							let data = {
								shopNum: this.shopNum,
								isauctionNum: this.isauctionNum,
								goods_id: this.shopCont.auction_goods_id
							}
							// #ifdef H5
							if (!uni.getStorageSync('mine-info')) { //第一次会存在，连续第二次点击时如果不存在则重新设置缓存
								uni.setStorageSync('mine-info', this.shopCont)
							}
							uni.setStorageSync('wish_info', data)
							// #endif
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/mine/K_brick_detail'
								})
							}, 2500)
						}
					})
					return
				}

				//k钻加赠金
				if (this.useInvite && this.balance * 1 < this.shopNum && !this.kdiamondSelect) {
					let zj = this.shopNum * 1 * this.can_use_invite_money_rate //最多赠金
					let flag = zj <= this.invite_money_balance * 1
					if (flag) { //赠金足够
						if ((this.shopNum * 1 - zj) > this.balance * 1) {
							uni.showToast({
								icon: 'none',
								title: this.$t('new.kzyebz'),
								duration: 3000,
								success: () => {
									uni.setStorageSync('recharge', true)
									let data = {
										shopNum: this.shopNum,
										isauctionNum: this.isauctionNum,
										goods_id: this.shopCont.auction_goods_id
									}
									// #ifdef H5
									if (!uni.getStorageSync('mine-info')) { //第一次会存在，连续第二次点击时如果不存在则重新设置缓存
										uni.setStorageSync('mine-info', this.shopCont)
									}
									uni.setStorageSync('wish_info', data)
									// #endif
									setTimeout(() => {
										uni.navigateTo({
											url: '/pages/mine/K_brick_detail'
										})
									}, 2500)
								}
							})
							return
						}
					} else {
						if ((this.shopNum * 1 - this.invite_money_balance * 1) > this.balance * 1) {
							uni.showToast({
								icon: 'none',
								title: this.$t('new.kzyebz'),
								duration: 3000,
								success: () => {
									uni.setStorageSync('recharge', true)
									let data = {
										shopNum: this.shopNum,
										isauctionNum: this.isauctionNum,
										goods_id: this.shopCont.auction_goods_id
									}
									// #ifdef H5
									if (!uni.getStorageSync('mine-info')) { //第一次会存在，连续第二次点击时如果不存在则重新设置缓存
										uni.setStorageSync('mine-info', this.shopCont)
									}
									uni.setStorageSync('wish_info', data)
									// #endif
									setTimeout(() => {
										uni.navigateTo({
											url: '/pages/mine/K_brick_detail'
										})
									}, 2500)
								}
							})
							return
						}
					}
				}

				//k钻加赠金加兑换
				if (this.useInvite && this.kdiamondSelect) {
					if (this.money * 1 < this.useInviteRmNum * 1) {
						return uni.showToast({
							icon: 'none',
							title: '充值余额不足' + this.useInviteRmNum
						})
						return
					}
				}

				if (this.kdiamondSelect) {
					if (this.set_paypwd != 1) {
						uni.showToast({
							title: this.$t('new.qszmm'),
							icon: 'none',
							success: () => {
								uni.setStorageSync('recharge', true)
								setTimeout(() => {
									this.navClick('/pages/mine/setPassword')
								}, 2000)
							}
						})
						return
					}
					this.$refs.popup1.close();
					// 余额支付弹框
					this.$refs.pwdsPopup.open();
				} else {
					this.$refs.popup1.close();
					this.onPwdClick()
				}
			},
			// 点击支付密码
			onPwdClick() {
				if (!this.pay_pwd && this.kdiamondSelect) return uni.showToast({
					title: this.$t('auction.detail.qingsshumm'),
					icon: 'none'
				})
				const pay_pwd = this.kdiamondSelect ? jsencrypt.setEncrypt(publiukey, String(this.pay_pwd)) : ''

				this.$http.post(this.$apiObj.AuctionorderBalancePay, {
					order_no: this.order_no, // 小订单号
					money: this.shopNum, // 支付总金额
					pay_pwd: pay_pwd, // rsa加密后的支付密码
					is_use_recharge: 2,
					is_use_invite: this.useInvite ? 1 : 2,
					is_use_k_diamond: 1,
					is_balance_convert_k_diamond: this.kdiamondSelect ? 1 : 2
				}).then(res => {
					if (res.code == 1) {
						this.isShowAegin = this.auction_num > this.isauctionNum
						uni.showToast({
							title: this.$t('top.zhifucg'),
							icon: 'none'
						})
						this.onAuctionNewGoods()
						setTimeout(() => {
							this.jingpaiList.forEach(item => {
								if (item.auction_goods_id == this.shopCont
									.auction_goods_id) {
									this.shopCont = item
								}
							})
							this.$refs.pwdsPopup.close()
							this.$refs.payPopup.open()
						}, 500);
					}
				})
			},
			// 点击抢拍
			onQiangpai() {
				this.$refs.payPopup.close()
				this.onMineInfo(this.shopCont)
			},
		}
	}
</script>

<style lang="less" scoped>
	/deep/.uni-progress-inner-bar {
		border-radius: 9rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 9rpx !important;
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

		image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 6rpx;
		}

		/deep/ .u-count-down__text {
			color: #F89B00;
		}
	}

	//右侧固定栏滚动
	.removeRightX {
		transform: translateX(80rpx);
		transition: all 0.5s ease;
	}

	.removeLeftX {
		transform: translateX(0);
		transition: all 0.5s ease;
	}

	.leftSider {
		position: fixed;
		right: 32rpx; //-50
		bottom: 200rpx;
		z-index: 100;

		.newListImg {
			width: 92rpx;
			height: 92rpx;
		}

		.newListImgDeg {
			width: 92rpx;
			height: 92rpx;
			margin-top: 30rpx;
			transform: rotate(-45deg);
		}

		//三个入口
		.imgArr {
			background: #fff;
			width: 92rpx;
			height: 280rpx;
			border-radius: 45rpx;
			box-shadow: 0 0 20rpx rgba(198, 198, 198, 0.3);
			text-align: center;

			.people {
				margin-top: 30rpx;

				.pImg {
					width: 45rpx;
					height: 40rpx;
				}
			}

			.minImg {
				width: 45rpx;
				height: 45rpx;
				text-align: center;
				margin-top: 40rpx;
			}
		}

	}

	// 许愿
	.containerXy {
		width: 100%;
		text-align: center;
		background-color: rgb(255, 85, 91);
		// padding-top: -50rpx;
		display: block;
		margin-top: 40rpx;

		.xy {
			// width: 100%;
			position: absolute;
			left: -8%;

			.xyImg {
				width: 100%;
				margin-top: -72rpx;
			}
		}

		.txt {
			position: relative;
			color: rgb(255, 255, 255);
			font-family: SF Pro Display;
			font-size: 50rpx;
			padding-top: 48rpx;
			display: block;
		}

		.btn {
			position: relative;
			width: 340rpx;
			height: 48rpx;
			box-sizing: border-box;
			background: rgb(255, 255, 255);
			border-radius: 50rpx;
			border: 1px solid rgb(255, 57, 57);
			display: block;
			margin: auto;
			margin-top: 30rpx;
			color: rgb(255, 57, 57);
			line-height: 40rpx;
			font-size: 24rpx;
		}

		.imgBottom {
			margin-top: 5rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.left {
				image {
					width: 30rpx;
					height: 30rpx;
				}

				.zs {
					font-size: 30rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);
					margin-left: 10rpx;
				}
			}

			.right {
				font-size: 16rpx;
				color: rgb(102, 102, 102);
				margin-left: 8rpx;

				image {
					width: 20rpx;
					height: 20rpx;
				}
			}

		}

		.itemBox {
			position: relative;
			width: 92%;
			margin: auto;
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.itemBox_a {
				width: 336rpx;
				height: 510rpx;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				background: #fff;

				.itemImg {
					width: 336rpx;
					height: 336rpx;
					border-radius: 20rpx 20rpx 0 0;
					margin-bottom: 5rpx;
				}

				.title {
					width: 296rpx;
					color: #333;
					font-size: 24rpx;
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					display: block;
					margin: auto;
				}

				.iconArr {
					width: 80%;
					display: flex;
					align-items: center;
					margin: auto;
					margin-top: 10rpx;

					image {
						width: 20rpx;
						height: 20rpx;
						margin-right: 8rpx;
					}

					.iconArr_item {
						width: 100rpx;
						border-right: 1px solid #e8e8e8;
					}

					.iconArr_item:nth-child(2) {
						border: none;
					}

					.iconArr_item:nth-child(3) {
						border: none;
					}
				}

				.new {
					color: #999;
					margin-top: 10rpx;
					text-decoration: line-through;

					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}
		}
	}

	.auction-page {
		width: 100%;
		background: #FFFFFF;

		.commission-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background-image: url("../../static/xuyuan/navBg.png");

			.commission-head-left {
				position: absolute;
				left: 20rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 10;
			}

			.commission-head-right {
				position: absolute;
				right: 30rpx;
				display: flex;
				align-items: center;
				z-index: 10;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				view {
					font-size: 24rpx;
					color: rgb(51, 51, 51);
					margin-left: 8rpx;
				}
			}

			.title {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
			}

		}

		.top-layout {
			width: 100%;
			background: url('/static/images/auction/auction_bg.png') no-repeat;
			background-size: 100% 100%;
			padding: 88rpx 0 40rpx;
			box-sizing: border-box;

			.tl-header {
				width: 100%;
				height: 88rpx;
				padding-right: 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.tl-header-btn {
					padding: 20rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					background: rgb(255, 255, 255);
					border-radius: 100rpx;

					image {
						width: 30rpx;
						margin-right: 6rpx;
					}

					p {
						font-size: 20rpx;
						font-weight: bold;
						color: #FF3939;
					}
				}
			}

			.bid-layout {
				width: 100%;
				margin-top: 40rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.bl-container {
					width: 332rpx;
					background: #fff;
					border-radius: 16rpx;

					.bl-container-head {
						width: 100%;
						height: 60rpx;
						padding: 12rpx 20rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
						background: linear-gradient(180.00deg, rgba(194.37, 193.57, 255, 1.00), rgba(255, 254.75, 254.75, 0.00) 98.871%);
						border-radius: 16rpx 16rpx 0 0;

						.head-left {
							display: flex;
							align-items: center;

							image {
								width: 36rpx;
							}

							view {
								font-size: 24rpx;
								color: rgb(51, 51, 51);
								margin-left: 8rpx;
								position: relative;

								&::after {
									content: "";
									width: 72rpx;
									height: 8rpx;
									background: rgb(254, 204, 171);
									border-radius: 100rpx;
									position: absolute;
									left: 50%;
									bottom: -10rpx;
									transform: translateX(-50%);
								}
							}
						}

						.head-right {
							display: flex;
							align-items: center;

							p {
								margin-right: 8rpx;
								font-size: 24rpx;
								color: rgb(51, 51, 51);
							}

							image {
								width: 16rpx;
								transform: translateY(4rpx);
							}
						}
					}

					.bl-container-center {
						width: 100%;
						margin-top: 6rpx;
						padding: 0 20rpx 12rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.center-item {
							display: flex;
							flex-direction: column;
							align-items: center;

							.center-item-cover {
								width: 132rpx;
								height: 132rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}

							.center-item-progress {
								width: 108rpx;
								margin: 8rpx auto;
							}

							.center-item-old {
								width: 100%;
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
								text-align: center;
							}

							.center-item-new {
								width: 100%;
								font-size: 16rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);
								text-align: center;

								image {
									width: 24rpx;
								}

								span {
									margin-left: 6rpx;
									font-size: 28rpx;
								}
							}

							.center-item-time {
								margin: 8rpx auto;
								padding: 6rpx 8rpx;
								box-sizing: border-box;
								border: 1px solid rgb(255, 57, 57);
								border-radius: 20rpx;
								display: flex;
								align-items: center;
								justify-content: center;

								image {
									width: 20rpx;
									margin-right: 6rpx;
								}

								/deep/ .u-count-down__text {
									font-size: 14rpx;
									color: rgb(255, 57, 57);
									line-height: 28rpx;
								}
							}

							.center-item-auth {
								width: 100%;
								display: flex;
								align-items: center;
								margin: 8rpx auto;

								image {
									width: 24rpx;
									height: 24rpx;
									border-radius: 50%;
								}

								p {
									margin-left: 8rpx;
									color: rgb(51, 51, 51);
									font-size: 16rpx;
								}
							}

							.center-item-price {
								width: 100%;
								font-size: 16rpx;
								color: rgb(255, 57, 57);
								text-align: center;

								image {
									width: 24rpx;
								}

								span {
									margin-left: 6rpx;
									font-size: 28rpx;
									font-weight: bold;
								}
							}
						}
					}
				}
			}

			.lucky-layout {
				margin: 24rpx 32rpx 0;
				background: rgb(255, 255, 255);
				border-radius: 8rpx;
				padding: 16rpx 24rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.ll-icon {
					width: 32rpx;
					height: 32rpx;

					image {
						width: 100%;
					}
				}

				.ll-text {
					display: flex;
					align-items: center;

					image {
						width: 38rpx;
						height: 38rpx;
						border-radius: 50%;
					}

					view {
						max-width: 440rpx;
						margin-left: 16rpx;
						color: rgb(51, 51, 51);
						font-size: 12rpx;
						font-weight: bold;
					}
				}

				.ll-right {
					width: 24rpx;
					height: 24rpx;

					image {
						width: 100%;
					}
				}
			}
		}

		.list-layout {
			width: 100%;
			// min-height: 800rpx;
			margin-top: -16rpx;
			background: #FFFFFF;
			border-radius: 16rpx 16rpx 0 0;

			.ll-header {
				width: 100%;
				padding: 24rpx 32rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.ll-header-left {
					display: flex;
					align-items: center;

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

				.ll-header-right {
					display: flex;
					align-items: center;

					.right-icon {
						width: 32rpx;
						margin-left: 28rpx;

						image {
							width: 100%;
						}
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
						font-size: 24rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
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
						top: 84rpx;
						width: 100%;
						font-size: 16rpx;
						color: rgb(102, 102, 102);
						display: flex;
						align-items: center;

						.bonus {
							width: 190rpx;
							height: 28rpx;
							display: flex;
							align-items: center;
							box-sizing: border-box;
							border: 1rpx solid rgb(255, 57, 57);
							border-radius: 28rpx;
							margin-right: 8rpx;

							.bonus-img {
								display: block;
								width: 28rpx;
								height: 28rpx;
								border-radius: 50%;
							}

							view {
								font-size: 16rpx;
								color: rgb(255, 57, 57);
								white-space: nowrap;
								margin-left: 4rpx;
							}
						}

						.tagimg {
							width: 28rpx;
							height: 28rpx;
							border-radius: 50%;
							margin-right: 16rpx;
						}
					}

					.new-list-item-right-start {
						position: absolute;
						top: 130rpx;
						width: 100%;
						display: flex;
						align-items: center;

						.new-list-item-right-start-info {
							margin-right: 16rpx;
							padding-right: 14rpx;
							box-sizing: border-box;
							border-right: 1rpx solid rgb(204, 204, 204);
							display: flex;
							align-items: center;

							&:last-child {
								border-right: none;
							}

							image {
								width: 24rpx;
								height: 24rpx;
								margin-right: 8rpx;
							}

							view {
								font-size: 16rpx;
								color: rgb(102, 102, 102);
							}
						}
					}

					.new-list-item-right-jd {
						position: absolute;
						top: 160rpx;
						width: 100%;
						display: flex;
						align-items: center;

						.new-list-item-right-jd-data {
							position: relative;
							width: 280rpx;
							height: 20rpx;

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
								height: 18rpx;
								border-radius: 18rpx;
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
						bottom: 14rpx;
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
									margin-left: 6rpx;
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
							padding: 6rpx 10rpx;
							box-sizing: border-box;
							font-size: 24rpx;
							color: rgb(10, 198, 142);
							box-sizing: border-box;
							border: 1rpx solid rgb(10, 198, 142);
							border-radius: 100rpx;
							display: flex;
							align-items: center;

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
					position: relative;
					width: 336rpx;
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
						word-break: break-all;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						margin: 16rpx auto 10rpx auto;
					}

					.bonus-two {
						width: 190rpx;
						height: 28rpx;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						border: 1rpx solid rgb(255, 57, 57);
						border-radius: 28rpx;
						margin: 0 0 10rpx 24rpx;

						image {
							display: block;
							width: 28rpx;
							height: 28rpx;
						}

						view {
							font-size: 16rpx;
							color: rgb(255, 57, 57);
							white-space: nowrap;
							margin-left: 4rpx;
						}

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
								width: 24rpx;
								height: 24rpx;
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
							border-right: none;
						}

					}

					.info-jd {
						position: relative;
						width: 296rpx;
						height: 20rpx;
						margin: 10rpx auto;

						image {
							position: absolute;
							top: 50%;
							left: 2rpx;
							transform: translate(0, -50%);
							width: 228rpx;
							height: 18rpx;
							border-radius: 18rpx;
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
							padding: 6rpx 10rpx;
							box-sizing: border-box;
							font-size: 24rpx;
							color: rgb(10, 198, 142);
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

							/deep/ .u-count-down__text {
								color: rgb(248, 155, 0);
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

					.new-list-item-btm-btn1 {
						position: absolute;
						left: 50%;
						bottom: 10rpx;
						transform: translate(-50%, 0);
						padding: 6rpx 10rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						color: rgb(10, 198, 142);
						border: 1rpx solid rgb(10, 198, 142);
						border-radius: 100rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 10rpx auto;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 8rpx;
						}

						/deep/ .u-count-down__text {
							color: rgb(248, 155, 0);
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
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					margin: 16rpx auto 24rpx auto;
				}

				.bonus-two {
					width: 190rpx;
					height: 28rpx;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					border: 1rpx solid rgb(255, 57, 57);
					border-radius: 28rpx;
					margin: 0 0 18rpx 24rpx;

					image {
						display: block;
						width: 28rpx;
						height: 28rpx;
					}

					view {
						font-size: 16rpx;
						color: rgb(255, 57, 57);
						white-space: nowrap;
						margin-left: 4rpx;
					}

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
							height: 20rpx;

							image {
								position: absolute;
								top: 50%;
								left: 2rpx;
								transform: translate(0, -50%);
								width: 308rpx;
								height: 18rpx;
								border-radius: 18rpx;
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
							margin-top: 14rpx;

							.new {
								font-size: 24rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);
								display: flex;
								align-items: center;
								margin-right: 8rpx;

								image {
									width: 40rpx;
									height: 40rpx;
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
		}

		// 抢拍次数
		.qiangpaiShow {
			position: relative;

			.query {
				position: absolute;
				top: 20rpx;
				right: 60rpx;
				z-index: 20;

				image {
					position: absolute;
					width: 36rpx;
					height: 36rpx;
				}
			}

			.qiangpaiCont {
				width: 686rpx;
				background: #fff;
				position: relative;
				padding: 60rpx 0 50rpx 0;
				// border: 4rpx solid rgb(10, 198, 142);
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
						margin: 0rpx auto 40rpx;
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
							margin: 10rpx auto 0;
							text-align: center;

							.tit {
								width: 100%;
								font-size: 28rpx;
								font-weight: bold;
								color: rgb(51, 51, 51);
								text-align: center;
								margin-bottom: 20rpx;
							}


							.my-input {
								width: 400rpx;
								display: flex;
								align-items: center;
								// background: rgb(241, 241, 241);
								border-radius: 16rpx;
								margin: 0 auto;

								.input-img {
									width: 124rpx;
									height: 72rpx;
									display: flex;
									align-items: center;
									justify-content: center;
									background: rgb(241, 241, 241);
								}

								.input-info {
									width: 152rpx;
									height: 72rpx;
									background: rgb(250, 251, 253);
								}

								image {
									display: block;
									width: 28rpx;
									height: 28rpx;
									margin: 0 16rpx 0 24rpx;
								}

							}

							uni-input {
								width: 100%;
								height: 100%;
								border: none;
								font-size: 28rpx;
								text-align: text;
							}

							.num {
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 24rpx;
								margin-top: 30rpx;
								color: rgb(10, 198, 142);
							}

							.protocol {
								width: 542rpx;
								display: flex;
								margin: 32rpx auto 0 auto;

								.protocol_img {
									display: block;
									width: 40rpx;
									height: 40rpx;
								}

								.protocol_info {
									width: 432rpx;
									font-size: 24rpx;
									margin-left: 16rpx;
									text-align: center;
									// word-break: break-all;

									.protocol_txt1 {
										display: inline;
										color: rgb(102, 102, 102);
									}

									.protocol_txt2 {
										display: inline;
										color: rgb(51, 51, 51);
									}
								}

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

		// 竞拍次数为0
		.jingpai-pop {
			width: 686rpx;
			background: #ffffff;
			border-radius: 20rpx;
			padding: 45rpx 0;
			// border: 4rpx solid rgb(10, 198, 142);

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
				// display: flex;
				// align-items: center;
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
					max-width: 288rpx;
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

		// 竞拍次数大于0
		.jingpai-ok {
			position: relative;

			.jingpai-pop {
				width: 686rpx;
				background: #ffffff;
				border-radius: 20rpx;
				padding: 45rpx 0;
				// border: 4rpx solid rgb(10, 198, 142);

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
					// display: flex;
					// align-items: center;
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
						max-width: 288rpx;
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
		}

		// 支付方式弹出
		.mode-pop {
			background: #ffffff;
			border-radius: 20rpx 20rpx 0px 0px;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			padding-top: 88rpx;
			padding-bottom: 24rpx;

			.mode-close {
				position: absolute;
				top: 40rpx;
				right: 32rpx;
				width: 32rpx;
				height: 32rpx;
			}

			.mode-tit {
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}

				view {
					font-size: 56rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
				}
			}

			.mode-des {
				width: 100%;
				font-size: 28rpx;
				color: rgb(153, 153, 153);
				text-align: center;
				margin-top: 24rpx;
			}

			.mode-banlace {
				width: 100%;
				font-size: 28rpx;
				color: rgb(255, 57, 57);
				text-align: center;
				margin-top: 12rpx;
			}

			.mode-info {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 136rpx;

				.logo {
					width: 48rpx;
					height: 48rpx;
					margin-left: 40rpx;
				}

				.info-tit {
					margin-left: 24rpx;

					.info-name {
						font-size: 28rpx;
						color: rgb(51, 51, 51);
					}

					.info-price {
						font-size: 24rpx;
						color: rgb(102, 102, 102);

						text {
							color: rgb(10, 198, 142);
							margin-left: 8rpx;
						}
					}
				}

				.mode-info-right {
					position: absolute;
					right: 40rpx;
					font-size: 20rpx;
					color: rgb(102, 102, 102);
					display: flex;
					align-items: center;

					image {
						width: 24rpx;
						height: 24rpx;
						margin-left: 8rpx;
					}
				}

				.select {
					position: absolute;
					right: 40rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}

			.mode-more {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 20rpx;

				.tit {
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					margin-left: 112rpx;
				}

				.logo {
					width: 32rpx;
					height: 32rpx;
					margin-left: 20rpx;
				}

				.num {
					font-size: 28rpx;
					color: rgb(102, 102, 102);
					margin-left: 8rpx;
				}

				.price {
					position: absolute;
					right: 100rpx;
					font-size: 24rpx;
					color: rgb(255, 57, 57);
				}

				.select {
					position: absolute;
					right: 40rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}

			.mode-cz {
				font-size: 24rpx;
				color: rgb(10, 198, 142);
				display: flex;
				align-items: center;
				margin-left: 112rpx;
				margin-top: 20rpx;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}

			.mode-switch {
				font-size: 24rpx;
				color: rgb(102, 102, 102);
				display: flex;
				align-items: center;
				margin-top: 240rpx;

				image {
					display: block;
					width: 32rpx;
					height: 32rpx;
					margin: 0 12rpx 0 32rpx;
				}
			}

			.mode-btn {
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 40rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 88rpx;
				margin: 24rpx auto;
			}
		}

		// 支付密码弹出 支付成功弹出
		.pay-pwd {
			position: relative;

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
				width: 36rpx;
				height: 36rpx;
				z-index: 10;
			}

			.pay-pwd-info {
				width: 686rpx;
				// height: 428rpx;
				padding-top: 40rpx;
				padding-bottom: 20rpx;
				background: #FFF;
				// border: 4rpx solid rgb(10, 198, 142);
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
	}
</style>