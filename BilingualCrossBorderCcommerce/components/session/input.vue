<template>
    <view>
        <view class="input-box u-f-ac u-f-jsa">
        <input type="text" confirm-type="发送" v-model="val" placeholder="说点什么吧" @confirm="send" :focus="commit"/>
        <view class="view-btn">
                <button type="primary" @tap="send">发送</button>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		name: "session",
		data() {
			return {

			};
		},
        props:['commit'],
		methods:{
			send(){
				this.$emit("submit",this.val)
				this.val = '';
			}
		}
	}
</script>

<style lang="less" scoped>
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
