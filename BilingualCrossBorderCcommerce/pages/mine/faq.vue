<template>
	<view class="faq">
		<view class="header">
			<image src="/static/images/kbrick/kleft.png" @click="toBack()"></image>
			<view>FAQ</view>
		</view>

		<view class="list">
			<u-collapse accordion :border="false">
				<view v-for="(item,i) in list" class="item" :style="(i+1==list.length)?'border-bottom: none;':''">
					<view class="logo">Q{{i+1}}</view>
					<view class="des">
						<u-collapse-item :title="isShopCont ? item.tit : item.tit_cn" name="Docs guide" :border="false">
							<text class="u-collapse-content">{{isShopCont ? item.des : item.des_cn}}</text>
						</u-collapse-item>
					</view>

				</view>
			</u-collapse>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShopCont: uni.getStorageSync('locale') == 'en' ? true : false,
				list: [{
						tit: 'How do I sign up?',
						tit_cn: '如何注册？',
						des: `You can sign up directly via the invitation link or you may click"Sign Up"/"Register now" using your email address or mobile number and wait for the verification code to be sent to either one.`,
						des_cn: `您可以通过邀请链接直接注册，输入您可以使用您的电子邮件地址或手机号码点击"登陆" / "注册"，并等待验证码发送到其中一个。`
					},
					// {
					// 	tit: 'Do I need to pay anything to register?',
					// 	tit_cn: '注册需要支付任何费用吗？',
					// 	des: `No, you don’t have to. All registration to our e-commerce platform is free!`,
					// 	des_cn: `不需要，我们的电子商务平台所有注册都是免费的！`
					// },
					// {
					// 	tit: 'Why did I not get verification code?',
					// 	tit_cn: '我为什么没有收到验证码？',
					// 	des: `You can try to resend the verification code to your number or try to use your email address to register.`,
					// 	des_cn: `您可以尝试重新发送验证码到您的号码，或尝试使用您的电子邮件地址进行注册。`
					// },
					{
						tit: `I'm under 18, can I participate?`,
						tit_cn: '我还未满18岁，我能参与吗？',
						des: `You cannot participate if you are under 18 years old unless you have your guardian approval following the Policy Agreement during your signing up procedure. `,
						des_cn: `如果您未满18岁，除非在注册过程中遵循政策协议获得监护人的批准，否则您不能参与。`
					},
					{
						tit: 'How to do verification? / How to do real name authentication?',
						tit_cn: '如何进行实名认证？',
						des: `You can click on the Profile Picture>Account & Security>Real Name Authentication>Upload front and back IC photos.`,
						des_cn: `您可以点击头像 > 个人认证 > 实名认证 > 上传身份证正反面照片。`
					},
					{
						tit: 'Why do you need my IC picture to do Real Name Authentication?',
						tit_cn: '为什么需要我的身份证照片进行实名认证？',
						des: `We must do the Real Name Authentication as we need to avoid frauds from happening and our platform are bind with rules and regulations.`,
						des_cn: `我们必须进行实名认证，以避免发生欺诈行为，我们的平台受到法规的约束。`
					},
					// {
					// 	tit: 'How to change my nickname?',
					// 	tit_cn: '如何更改我的昵称？',
					// 	des: `You may click on your Profile Picture and choose Nickname to do modification or set a new one.`,
					// 	des_cn: `您可以点击您的个人资料图片，选择"昵称"进行修改或设置一个新的昵称。`
					// },
					{
						tit: 'How to change my password?',
						tit_cn: '如何更改我的密码？',
						des: `Hi, you can go on the "Login page" and click on "forgot password" to reset your passwords.`,
						des_cn: `您可以在"登录页面"上点击"忘记密码"以重置密码。`
					},
					{
						tit: 'How to invite my friends?',
						tit_cn: '如何邀请我的朋友？',
						des: `Go to Invitation Rebate>Join Now> you may copy the link or share your invite code with your friends.`,
						des_cn: `前往"邀请返佣" > "我的邀请">> "立即邀请">您可以复制链接或与您的朋友分享邀请码。`
					},
					{
						tit: 'How to make a wish?',
						tit_cn: '如何许愿？',
						des: `Go to "Ongoing" tab and you can see the ongoing Wish items, just click on the Wish you want to participate and click on the "Wish" button and choose the amount of wish you desire and wait for the Lucky Star to be announced.`,
						des_cn: `前往"正在进行"选项，您可以看到正在进行中的许愿活动，只需点击您想要参与的许愿活动，并点击"许愿"按钮，选择您想要的许愿金额，然后等待幸运之星的揭晓。`
					},
					{
						tit: 'How to recharge?',
						tit_cn: '如何充值？',
						des: `You may recharge in My Asset>K-Diamonds>Select the desire amount(minimum of RM15)`,
						des_cn: `您可以在"我的资产"中进行充值，选择K-Diamonds，然后选择所需金额（最低RM15）。`
					},
					{
						tit: 'How to recharge if I don’t have a bank account?',
						tit_cn: '如果我没有马来西亚的银行账户如何充值？',
						des: `For now,we only provide two payment methods which is either using PayPal or Payessence and it both requires your bank account. Soon to come another payment gateway!`,
						des_cn: `目前，我们只提供两种付款方式，即PayPal和Payessence，这两种方式都需要银行账户。即将推出另一种付款网关！`
					},
					{
						tit: 'How to ensure fairness, justice, and transparency?',
						tit_cn: '如何保证公平公正？透明？',
						des: `Our vision-sharing wish mode has strict rules: only then who participate by placing subscription orders can be eligible for Lucky Stars. There will never be exceptions or surprises. Only when the full amount is reached will the wish pool camp closed and selected winner. If the full amount is not reached, the subscriptions will be invalidated and fully renewed. Each subscription order has a unique code, which is publicly recorded and permanently stored. At any time, anyone can verify and cross-reference. If you still have questions about the results of the system, you can specifically select products with relatively low prices, which are more likely to reach full and complete the campaign. Then, carefully check the subscription records and published results. Further more, you only need to invite a few friends and form a group to collect purchase these relatively low-printed products. Then, check whether one of you always gets the lucky star every time. Of course, if you can find more people, you can also test products with higher prices.`,
						des_cn: `我们的愿景共创许愿模式，规则限制：只有参与下单认购的人才可以获得 幸运之星，永远不可能有例外，也没有意外。 只有满额才会封盘开箱，不满额会作废原路全额退回。每个认购的订单都 有独一无二的编码，并且公开在记录中，永久保存，任何时候，所有人都 可以查询核对。 如果您对系统的结果仍然持怀疑态度，那么您可以专门挑选一些价格相对 较低容易满额封盘的商品，然后仔细核对认购记录和公布的结果。 再者，您只需要邀请几个朋友，专门组团拼单这些价格相对较低的产品， 然后核对是不是每次的结果，都必定是你们其中之一获得幸运之星。当然， 如果您能找到更多的人，也可以去测试高价的商品。`
					},
					{
						tit: 'How is it different from ordinary lottery tickets?',
						tit_cn: '与常见的抽奖模式有什 么区别？',
						des: `Common lottery procedures often have severe issues that seriously effect failure: 1unlimited participation: For instance, an unlimited number of people can participation to draw a fixed number of prizes. Over time, as more people join, the chance of winning becomes smaller. In contrast, our model has a limited total number of participants, with an increasing certainty of winning. Regardless of the value of the prize, the winning rate of each round will not exceed a fixed percentage. 2 No instant results: Most lottery programs determination a draw time after all users have placed orders. During the time between order placement and the draw, unfair operations can occur, making it unreliable. Our system instantly openings and revals the results when the orders reach the required total. This prevents any intervention because there is no time to react. Further more, nobody can predict when the total will be reached or when the wish pool camp completed. 3 Very low probability of winning: This is quite common, even after 100 or 1000 draws, there is no chance of winning. Or even if you win, this is not the prize you want. Essentially, what you desire is most imposs`,
						des_cn: `常见的抽奖程序通常都有以下几个严重影响公平性的问题： 1.不限定参与的人数，例如，可以无数人去抽一个或者几个固定数量 的奖品。随着时间推移，参与的人数越来越多，而奖品和中奖的机率 越来越小。而我们的模式是总人数限定，必中率越来越大，无论奖品 价值多大，每一期的项目永远不超过固定比率的中奖率。 2.不能做到秒开，例如：基本所有抽奖程序都是等用户全部下单完之 后，再确定一个开奖时间，而在下单完到开奖的这段时间内，可以有 很多时间去进行不公平的操作，十分不可靠。而我们的系统是用户下 单满额的那一秒开箱公布，任何人即便是想要去干预操作，也根本没 有时间反应。另外，任何人都无法预测，什么时候满额，什么时候结 束封盘。 3.设置了极低的中奖概率，这种最普遍，无论怎么抽，即便是抽1000 次，10000次都不会中1次，或者中不到你想要的那个奖品。或者说， 你想要的那个奖品，根本不可能有人中。`
					},
					{
						tit: `My luck is really bad. I don't think I can win!`,
						tit_cn: '我的运气很差，我感觉 我不会中！',
						des: `First of all, it is certain that you will win, and you will win many times! This is because of our collaborative vision model, which has been explained in detail earlier, and it follows a logical principle. The system selects one person from this who subscribe and place orders to be the lucky star. The system code has been repaired and cannot be operated or changed. For example, let's consider a RM10 mobile recharge card with a single subscription unit worth 2 diamonds and a maximum of 5 participants participating in the subscription. Once the target is reached and filled, regardless of how the system selects, the result will undoubtedly be one of those 5 participants. No one but these five participants can become a lucky star. Further more, using some small techniques with this model can further enhance your chances of winning.`,
						des_cn: `首先,可保证的是您一定会中,而且会中很多次! 因为我们的愿景共创模式,前面有详解的讲解过逻辑原理,它是系统从 认购下单的人里面,必选其中之一作为幸运之星,系统代码是写死的, 任何人无法篡改操控. 比如：一张RM10的充值卡,单个认购份额是2颗钻石,最多也就只有5 个人参与认购,一旦达标满额,无论系统怎么选,结果必定是这5个人中 的其中之一,不可能出现这5个人之外的人获得幸运之星. 另外,在这种模式下,再使用一些 小技巧,便可以进一步提高胜率.`
					},
					{
						tit: `How can I increase my chances of luck?`,
						tit_cn: '如何提高我的幸运机会？',
						des: `1.Priority on High Hit rate: Prioritize high hit rate, before placing an order or subscription, avoid looking at the product and its price. Focus on the High Hit rate and only select products with high hit rates to place orders. 2,Priority on Low Prices: Choose products with lower prices. Most of the time, products with lower prices have fewer competitors compared to higher-priced products. 3,Multiple Subscriptions: If you really want a particular product, and you have sufficient diamond balance in your account, increase the subscription quantity to enhance your chances of luck. 4,Segmented Subscriptions: Try to avoid placing orders intensively inthe same time period and at the same position. Place orders at different positions on the progress bar. In theory, this can increase the chances of being selected by the system.`,
						des_cn: `1. 必中优先，下单认购前，不要看商品，不要看价格，重点关注必中 率，只选必中率高的商品下单。 2. 低价优先，挑选价格低的商品，大部分时候，价格低的商品，竞争 者永远小于价高的商品。 3. 多倍认购，如果您特别想要某个商品，在账户钻石充足的情况下， 提升认购数量，可以提升幸运机会。 4. 分段认购，尽量避免在同一时间段， 同一位置去密集下单，在进度条 的不同位置下单，理论上能 够提升被系统选中的机会。`
					},
					{
						tit: `What should I do if I often win products that I don't need?`,
						tit_cn: '我经常中一些我并不需要的商品怎么办?',
						des: `When you win products that you don't need, you can consider gifting the items you receive as presents to your relatives and friends. Additionally, you can also choose not to receive the items directly from the platform's. Instead, you can option for an immediate cash equivalent. The items will be repurchased by the platform's official channels or the merchants, and their value will be converted into cash and credited to your account. You can then withdraw this cash to your bank account.`,
						des_cn: `当您中了商品不是您所需要的,您可以领取实物后作为礼物赠送给你的亲戚朋友. 同时,你也可以直接在后台选择不领取实物,而是选择立即折现,实物 折现是平台官方或者是商家回收,将商品折算成现金,并充值到您的账 户中,您可以再提现到您的银行账户中.`
					},
					{
						tit: `"If I don't win, what's the use of the points I receive?`,
						tit_cn: '没有中,给我积分有什么用?',
						des: `Our collaborative vision model is an innovative e-commerce approach designed to provide a platform for everyone to achieve their dreams. Only through this collaborative model can we offer everyone the opportunity to realize dreams and visions that might have seemed distant and unattainable, with minimal investment and cost. Many opportunities can be realized up close. For participants in collaboration who do not become the lucky star, we utilize the accumulated collaborative points of users to provide feedback. This includes: exchanging in the points store, free exchange of branded products, free exchange of platform profit dividends, high commission returns for life, free exchange of KMC cryptocurrency, as well as various festival and event-related welfare benefits. In the future, we will continue to launch more features and scenarios for feedback.`,
						des_cn: `我们的愿景共创模式,是一种创新的电商模式,旨在为每个人提 供一个实现梦想的平台.只有借助此共创模式,我们才能让每个 人都有机会,以最小的付出和成本,零距离接触原本遥不可及, 可能遗憾终身的梦想,愿景,更有很多机会得以实现. 对于参与共创,但是没有得到幸运之星的用户,我们采用用户累 积的共创积分,利用共创积分对用户进行回馈.其中包括：积分 商城换购,免费兑换品牌商品,免费 兑换平台收益分红,终身返高额返佣, 免费兑换KMC加密货币,以及节日, 活动 各类福利回馈.未来我们将陆 续推出更多功能,场景回馈.`
					}
				]
			}
		},
		methods: {
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.u-cell__title-text {
		font-size: 28rpx;
		font-weight: bold;
	}

	/deep/.u-collapse-item__content__text {
		padding: 24rpx 0;
	}

	/deep/.u-cell__body {
		padding: 0;
	}

	.faq {
		width: 750rpx;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.header {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			background: #fff;

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}
		}

		.list {
			width: 750rpx;
			padding: 40rpx 0;
			background: #fff;
			margin-top: 20rpx;

			.item {
				width: 100%;
				padding: 40rpx 0;
				display: flex;
				align-items: flex-start;
				border-bottom: 2rpx solid rgb(243, 243, 243);

				.logo {
					width: 56rpx;
					height: 56rpx;
					line-height: 48rpx;
					font-size: 20rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: url('/static/images/mine/faq_bj.png')no-repeat;
					background-size: 56rpx 56rpx;
					margin: 0 24rpx 0 32rpx;
				}

				.des {
					width: 600rpx;
				}

			}

		}

	}
</style>