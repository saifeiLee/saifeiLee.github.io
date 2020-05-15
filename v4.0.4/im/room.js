var room = {
  join: function() {
    IM.joinRoom({
      data: {
        roomid: 281474983311911
      },
      onSuccess: function(data, context) {
        console.log('joinRoom onSuccess', data, context)
      },
      onFail: function(data, context) {
        console.log('joinRoom onFail', data, context)
      },
      onTimeout: function(data, context) {
        console.log('joinRoom onTimeout', data, context)
      }
    })
  },
  create: function () {
    IM.createRoom({
      data: {
        name: '我是一个房间名'
      },
      onSuccess: function(data, context) {
        console.log('createRoom onSuccess', data, context)
      },
      onFail: function(data, context) {
        console.log('createRoom onFail', data, context)
      },
      onTimeout: function(data, context) {
        console.log('createRoom onTimeout', data, context)
      }
    })
  }
}
