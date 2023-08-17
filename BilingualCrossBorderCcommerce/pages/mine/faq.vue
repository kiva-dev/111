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
					{
						tit: 'Do I need to pay anything to register?',
						tit_cn: '注册需要支付任何费用吗？',
						des: `No, you don’t have to. All registration to our e-commerce platform is free!`,
						des_cn: `不需要，我们的电子商务平台所有注册都是免费的！`
					},
					{
						tit: 'Why did I not get verification code?',
						tit_cn: '我为什么没有收到验证码？',
						des: `You can try to resend the verification code to your number or try to use your email address to register.`,
						des_cn: `您可以尝试重新发送验证码到您的号码，或尝试使用您的电子邮件地址进行注册。`
					},
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
					{
						tit: 'How to change my nickname?',
						tit_cn: '如何更改我的昵称？',
						des: `You may click on your Profile Picture and choose Nickname to do modification or set a new one.`,
						des_cn: `您可以点击您的个人资料图片，选择"昵称"进行修改或设置一个新的昵称。`
					},
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