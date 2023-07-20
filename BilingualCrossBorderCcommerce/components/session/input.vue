<template>
    <view>
        <view class="im-write" :style="{bottom: writeBottom + 'px'}">
			<view class="write-textarea" style="margin: 5px 0px 5px 40px;border-radius: 10px;">
				<textarea confirmType="done"  :adjust-position="false" :show-confirm-bar="false" :fixed="true" :focus="imMessageFocusBool"
				 :auto-height="true"  :cursor-spacing="14" maxlength="-1" @blur="imMessageBlur" @input="imMessageInput"
				 @focus="imMessageFocus" :confirm-type="sendButtonType" @confirm="sendButtonConfirm" v-model="imMessage" class="im-message" ></textarea>
			</view>
			<view class="write-right" >
				<button class="send-btn" @click="send" hover-class="send-btn-hover" v-if="showSendButton">Send</button>
				<image class="toolbar-icon more" src="/static/icon/more.png" @click="clickTool('more')" mode="widthFix" v-if="!showSendButton"></image>
			</view>
		</view>
    </view>
</template>

<script>
	export default {
		name: "session",
		data() {
			return {
				writeBottom: 0,
				sessionUserInputStatus: false,
                showSendButton:false,
                sendButtonType:'none',
                imMessage:'',
                blurTimeout: null,
			};
		},
        props:['imMessageFocusBool'],
		methods:{
            imMessageFocus: function () {
                console.log('焦点');
			},
            imMessageBlur: function () {
                 // 使用定时器，在失去焦点后延时300毫秒再执行隐藏操作
                this.blurTimeout = setTimeout(() => {
                    this.$emit('updateImMessageFocusBool', false); // 触发事件，将值传递给父组件
                }, 300);
            },
            imMessageChange: function() {
				let that = this
				that.showSendButton = (that.imMessage == '') ? false : true;
			},
            imMessageInput: function (e) {
				this.imMessageChange()
			},
            sendButtonConfirm: function () {
				if (this.sendButtonType == 'send') {
					this.sendMessage(this.imMessage, 'default')
				}
			},
			send(){
				this.$emit("submit",this.imMessage)
				this.imMessage = '';
			}
		},
        beforeDestroy() {
            clearTimeout(this.blurTimeout);
        }
	}
</script>

<style lang="less" scoped>
@import url('./input.less');
.input-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 108rpx;
    box-sizing: border-box;
    padding: 20rpx;
    border-top: 1px solid rgba(204,204,204,.4);
    background-color: #fff;
    input{
        // border-radius: 30rpx;
        border: 1px solid #EEEEEE;
        background: #EEEEEE;
        padding-left: 20rpx;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        flex: 1;
        margin-right:20rpx;
    }
    .view-btn{
        width: 80px;
    }
    button{
        background-color:#FFC000;
        font-size: 14px;
    }
}
</style>
