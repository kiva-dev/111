const RongIMLib = require('./RongIMLib-3.0.7.1-dev.js')
import store from '@/store';
var im = RongIMLib.init({
  appkey: 'kj7swf8okxfe2'	//项目融云key
  // appkey: "c9kqb3rdc6elj"/
})

var ryStatus = {
  RongIMLib,
  im,
  status: 99,
  newMsg: {
    num: 0,
    msg: {}
  }, //融云新消息
};
// #ifdef APP-PLUS

im.watch({
  conversation: function (event) {
    console.log(event);
    var updatedConversationList = event.updatedConversationList; // 更新的会话列表
    console.log(updatedConversationList, 'updatedConversationList')
  },
  message: function (event) {
    console.log(event);
    var message = event.message;
    ryStatus.newMsg.msg = message
    ryStatus.newMsg.num += 1
    store.commit('setNewState', ryStatus.newMsg);    //新消息存入缓存
    // store.commit('setNewNum', ryStatus.newMsgNum);    //新消息存入缓存
    // console.log('接收消息成功，消息内容为:', message.content.content);
  },
  status: function (event) {
    var status = event.status;
    ryStatus.status = status
    // console.log('0,成功；1：正在连接；连接状态码:', status);
  }
});

im.Conversation.getList().then(function (conversationList) {
  console.log('获取会话列表成功', conversationList);
});
// #endif

export default {
  ryStatus
}