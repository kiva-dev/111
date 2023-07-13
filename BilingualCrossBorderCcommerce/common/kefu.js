export default {
  name: 'index',
  data () {
    return {
      chat: [],
      sentText: '',
      doctorInfo: '',
      height: '0rpx',
      scrollTop: 0,
      count: 7,
      uuid: '',
      avatar: '',
      list: [],
      style: {
        pageHeight: 0,
        contentViewHeight: 0,
        footViewHeight: 90,
        mitemHeight: 0
      },
    };
  },
  onLoad (options) {
    this.uuid = options.uuid
    this.avatar = options.avatar
    this.rongyunInit();
    this.getlist(new Date())
    const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
    this.style.pageHeight = res.windowHeight;
    this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
  },
  onShow () {
    this.chat = []
    // this.clear()
  },
  methods: {
    read (uuid, time) {
      let conversation = this.$Im.Conversation.get({
        targetId: this.uuid,
        type: this.$RongIMib.CONVERSATION_TYPE.PRIVATE
      });
      let messageUId = uuid; // 消息唯一 Id, message 中的 messageUid
      let lastMessageSendTime = time; // 最后一条消息的发送时间
      let type = '1'; // 备用，默认赋值 1 即可
      // 以上 3 个属性在会话的最后一条消息中可以获得
      conversation.send({
        messageType: 'RC:ReadNtf',
        content: {
          messageUId: messageUId,
          lastMessageSendTime: lastMessageSendTime,
          type: type
        }
      }).then((message) => {
        console.log('发送已读通知消息成功', message);
      });
    },
    scrolltoupper () {
      this.$u.throttle(this.getlist(this.chat[0].time, 1), 500)
    },
    // 清空未读数
    // clear () {
    //   this.$Im.Conversation.getTotalUnreadCount().then(function (totalUnreadCount) {
    //     console.log('获取未读总数成功', totalUnreadCount);
    //   });
    //   let conversation = this.$Im.Conversation.get({
    //     targetId: this.uuid,
    //     type: this.$RongIMib.CONVERSATION_TYPE.PRIVATE
    //   });
    //   conversation.read().then(() => {
    //     console.log('清除未读数成功'); // im.watch conversation 将被触发
    //   });

    // },
    scrollToBottom () {
      let that = this;
      let query = uni.createSelectorQuery();
      query.selectAll('.m-item').boundingClientRect();
      query.select('#scrollview').boundingClientRect();
      query.exec((res) => {
        console.log(res)
        that.style.mitemHeight = 0;
        res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40) //获取所有内部子元素的高度
        // 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这定时器
        setTimeout(() => {
          if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) { //判断子元素高度是否大于显示高度
            console.log(3333)
            that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
          }
        }, 100)
      })
    },
    // #ifdef APP-PLUS
    hgit () {
      this.height = '50rpx'
    },
    // #endif
    // #ifdef H5
    hgit () {
      this.height = '500rpx'
    },
    // #endif
    blur () {
      this.height = '0rpx'
    },
    rongyunInit () {
      var im = this.ryGlobalData.ryStatus.im
      let _t = this
      //token，去找后台要
      let ry_token = this.$store.state.vuex_user.ry_token || uni.getStorageSync('userCont').rong_token
      im.connect({
        token: ry_token
      }).then((user) => {
        _t.userRyId = user.id
        setTimeout(() => {
          _t.title = '融云连接成功'
        }, 2000)
        console.log('链接成功, 链接用户 id 为: ', user.id);
        im.Conversation.getList().then(function (conversationList) {
          console.log('获取会话列表成功', conversationList);
          _t.$store.commit('setConversationList', conversationList)	//会话列表存入store
        });
        _t.getMsgList()
      }).catch(function (error) {
        console.log(error, '链接失败')
      });
      // return
      //初始化融云
      let _that = this;
      //设置监听
      let conversationList = []; //当前存在的会话列表
      _that.$Im.watch({
        //对会话列表进行监听
        conversation: (event) => {
          console.log(event);
          let updatedConversationList = event.updatedConversationList; //更新的会话列表
          console.log('upload用户端:', updatedConversationList);
          let sendOut = {
            content: event.updatedConversationList[0].latestMessage.content.content,
            sentTime: event.updatedConversationList[0].latestMessage.sentTime
          }
          uni.setStorageSync('sendOut', sendOut)
          if (event.updatedConversationList[0].latestMessage.messageDirection == 2) {
            console.log('执行了')
            this.chat.push({
              type: event.updatedConversationList[0].latestMessage.messageDirection,
              time: event.updatedConversationList[0].latestMessage.sentTime,
              msg: event.updatedConversationList[0].latestMessage.content.content,
              avatar: uni.getStorageSync('user_info').avatar
            })
          }
        },
        status: function (event) {
          let status = event.status;
          console.log('status num:', status);
        }
      });
      /**
       * 3.连接融云
       *   1) 需要先调用服务端接口，获取Token 然后进行连接
       */
      //进行连接
      this.$Im
        .connect({
          token: uni.getStorageSync('userCont').rong_token
        })
        .then(user => {
          console.log('success id: ', user.id);
        })
        .catch(error => {
          console.log('error: ', error.code, error.msg);
        });
    },
    // 获取历史信息
    getlist (time, status) {
      console.log(time, status)
      let conversation = this.$Im.Conversation.get({
        targetId: this.uuid,
        type: this.$RongIMib.CONVERSATION_TYPE.PRIVATE
      });
      console.log(conversation);
      let option = {
        timestrap: +time,
        count: this.count
      };
      console.log(option);
      conversation.getMessages(option).then((result) => {
        console.log(result);
        this.list = result.list; // 历史消息列表
        let hasMore = result.hasMore; // 是否还有历史消息可以获取
        console.log('获取历史消息成功', this.list, hasMore);
        // this.read(this.list.length.messageUId, this.list.length.sentTime)
        this.read(this.list[this.list.length - 1].messageUId, this.list[this.list.length - 1].sentTime)
        // data == 1下拉加载
        if (status == 1) {
          let a = []
          this.list.forEach(item => {
            if (item.messageDirection == 1) {
              a.push({
                type: item.messageDirection,
                time: item.sentTime,
                msg: item.content.content,
                avatar: uni.getStorageSync('user_info').avatar
              })
            } else {
              a.push({
                type: item.messageDirection,
                time: item.sentTime,
                msg: item.content.content,
                avatar: this.avatar
              })
            }
          })
          console.log(2342342, a)
          this.chat.unshift(...a)
          console.log(this.chat)
        } else {
          this.list.forEach(item => {
            if (item.messageDirection == 1) {
              this.chat.push({
                type: item.messageDirection,
                time: item.sentTime,
                msg: item.content.content,
                avatar: uni.getStorageSync('user_info').avatar
              })
            } else {
              this.chat.push({
                type: item.messageDirection,
                time: item.sentTime,
                msg: item.content.content,
                avatar: this.avatar
              })
            }
          })
        }
        console.log(this.chat)
      }).catch(err => {
        console.log('消息发送失败', err)
      })
    },
    //融云发送消息方法
    sendMessage (type, content) {
      //4.连接融云成功后进行发送消息
      this.conversation = this.$Im.Conversation.get({
        targetId: this.uuid,
        type: this.$RongIMib.CONVERSATION_TYPE.PRIVATE
      });
      this.conversation.send({
        messageType: this.$RongIMib.MESSAGE_TYPE[type],
        content
      }).then((msg) => {
        this.scrollToBottom(); //创建后调用回到底部方法
        console.log('发送消息成功', msg);
        this.chat.push({
          type: msg.messageDirection,
          time: msg.sentTime,
          msg: msg.content.content,
          avatar: uni.getStorageSync('userCont').avatar
        })
        this.sentText = []
      }).catch(err => {
        console.log('消息发送失败', err)
      })
    },
  }
};
