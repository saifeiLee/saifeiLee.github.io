const im = new MsSDK.IM()
function init () {

  const urlObj = new URL(location.href)

  im.init({
    host: urlObj.searchParams.get('host') || host.value.trim(),
    appid: urlObj.searchParams.get('appid') || appid.value.trim(),
    uid: urlObj.searchParams.get('uid') || uid.value.trim(),
    pwd: '',
    platform: '4', // web
    auth: {
      user: {
        timestamp: JSON.stringify(new Date().getTime()),
        signature: 'D97C2DDA3E46E5E6D482E9E8EE84AF93',
        token: urlObj.searchParams.get('token') || token.value.trim(),
      },
    },
  })
    .login()
    .onMessageRecv(function (data, context) {
      console.log('[example]onMessageRecv', data, context)
    })
    .onMessageRecv(function (data, context) {
      console.log('[example]onMessageRecv', data, context)
    })
    .onMessageRecv(function (data, context) {
      console.log('[example]onMessageRecv', data, context)
    })
    .onNoticeRecv(function (data, context) {
      console.log('[example]onNoticeRecv', data, context)
    })
    .onNoticeRecv(function (data, context) {
      console.log('[example]onNoticeRecv', data, context)
    })
    .onSingleCommandRecv(function (data, context) {
      console.log('[example]onSingleCommandRecv', data, context)
    })
    .onRoomCommandRecv(function (data, context) {
      console.log('[example]onRoomCommandRecv', data, context)
    })
    .onConnect(function (data, context) {
      console.log('[example]onConnect', data, context)
    })
    .onDisconnect(function (data, context) {
      console.log('[example]onDisconnect', data, context)
    })
}

function fConfig (method, data) {
  return {
    data: postData.value ? JSON.parse(postData.value) : data.data,
    onSuccess: function (data, context) {
      console.log('[example]' + method + ' onSuccess')
      console.log(data)
      console.log(context)
      if (method === 'createRoom') {
        $('#roomId').val(data.roomid)
      }
    },
    onFail: function (data, context) {
      console.log('[example]' + method + ' onFail')
      console.log(data)
      console.log(context)
    },
    onTimeout: function (data, context) {
      console.log('[example]' + method + ' onTimeout')
      console.log('data:', data)
      console.log('context:', context)
    },
  }
}

function createRoom () {
  im.createRoom(fConfig('createRoom', {
    data: {
      name: 'wtf聊天室名称',
    },
  }))
}

function joinRoom () {
  im.joinRoom(fConfig('joinRoom', {
    data: {
      roomid: +($('#roomId').val()),
    },
  }))
}

function deleteRoom () {
  im.deleteRoom(fConfig('deleteRoom', {
    data: {
      roomid: +($('#roomId').val()),
    },
  }))
}

function quitRoom () {
  im.quitRoom(fConfig('quitRoom', {
    data: {
      roomid: +($('#roomId').val()),
    },
  }))
}


function getRoomMemberSize () {
  im.getRoomMemberSize(fConfig('getRoomMemberSize', {
    data: {
      roomid: +($('#roomId').val()),
    },
  }))
}


function getRoomMember () {
  im.getRoomMember(fConfig('getRoomMember', {
    data: {
      roomid: +($('#roomId').val()),
    },
  }))
}

function createGroup () {
  im.createGroup(fConfig('createGroup', {
    data: {
      name: 'wtf群聊名称',
    },
  }))
}

function deleteGroup () {
  im.deleteGroup(fConfig('deleteGroup', {
    data: {
      gid: 1125899910471267,  // TODO:
    },
  }))
}

function getGroupInfo () {
  im.getGroupInfo(fConfig('getGroupInfo', {
    data: {
      gid: 1125899910471267,  // TODO:
    },
  }))
}

function setGroupMemberMaxSize () {
  im.setGroupMemberMaxSize(fConfig('setGroupMemberMaxSize', {
    data: {
      gid: 1125899910471267,  // TODO:
      max_size: 10,
    },
  }))
}

function setGroupName () {
  im.setGroupName(fConfig('setGroupName', {
    data: {
      gid: 1125899910471267,  // TODO:
      name: '新的群名称',
    },
  }))
}


function setGroupNotice () {
  im.setGroupNotice(fConfig('setGroupNotice', {
    data: {
      gid: 1125899910471267,  // TODO:
      name: '新的群公告',
    },
  }))
}

function getGroupMember () {
  im.getGroupMember(fConfig('getGroupMember', {
    data: {
      gid: 1125899910471267,  // TODO:
    },
  }))
}

function getGroupMemberSize () {
  im.getGroupMemberSize(fConfig('getGroupMemberSize', {
    data: {
      gid: 1125899910471267,  // TODO:
    },
  }))
}

function addGroupMember () {
  im.addGroupMember(fConfig('addGroupMember', {
    data: {
      gid: 1125899910471267,  // TODO:
      uids: ['', ''], // TODO:
    },
  }))
}

function removeGroupMember () {
  im.removeGroupMember(fConfig('removeGroupMember', {
    data: {
      gid: 1125899910471267,  // TODO:
      uids: ['', ''], // TODO:
    },
  }))
}

function quitGroup () {
  im.quitGroup(fConfig('quitGroup', {
    data: {
      gid: 1125899910471267,  // TODO:
    },
  }))
}

function setGroupNotDisturb () {
  im.setGroupNotDisturb(fConfig('setGroupNotDisturb', {
    data: {
      gid: 1125899910471267,  // TODO:
      on: true,
    },
  }))
}

function getGroupNotDisturbList () {
  im.getGroupNotDisturbList(fConfig('getGroupNotDisturbList', {}))
}

function setUserNotDisturb () {
  im.setUserNotDisturb(fConfig('setUserNotDisturb', {
    data: {
      uid: 123,  // TODO:
      on: true,
    },
  }))
}

function getUserNotDisturbList () {
  im.getUserNotDisturbList(fConfig('getUserNotDisturbList', {}))
}

function setGroupOwner () {
  im.setGroupOwner(fConfig('setGroupOwner', {
    data: {
      gid: 1125899910471267,  // TODO:
      owner: '18813296148',  // TODO:
    },
  }))
}

function recallMessage () {
  im.recallMessage(fConfig('recallMessage', {
    data: {
      msgid: 123, // TODO:
    },
  }))
}


function sendSingleMessage () {
  const targetId = $('#targetId').val()
  console.log('targetId', targetId)
  im.sendSingleMessage(fConfig('sendSingleMessage', {
    data: {
      msg_body: {
        text: '我全世界最帅!',
      },
      msg_type: $('#msgType').val(),
      target_id: targetId,
    },
  }))
}

function sendGroupMessage () {
  im.sendGroupMessage(fConfig('sendGroupMessage', {
    data: {
      msg_body: {
        text: '我全世界最帅!',
      },
      msg_type: $('#msgType').val(),
      target_id: 1125899910471267,
    },
  }))
}

function sendRoomMessage () {
  const roomId = $('#roomId').val()
  console.log(roomId);
  im.sendRoomMessage(fConfig('sendRoomMessage', {
    data: {
      msg_body: {
        text: '我全世界最帅!',
      },
      msg_type: +($('#msgType').val()),
      target_id: +($('#roomId').val()),
    },
  }))
}


function sendIMSingleCommand () {
  const ab = new ArrayBuffer(6)
  const ui8 = new Uint8Array(ab)
  ui8[0] = 1
  ui8[1] = 255
  ui8[2] = 256
  console.log('发送的ab', ab)
  im.sendIMSingleCommand(fConfig('sendIMSingleCommand', {
    data: {
      toAppid: 'ef6f758e4c8b4c43ac784d9ad0276381',
      toUid: ['17620825565'],
      toPlatform: '4',
      msg: ab,
      ttl: 1,
    },
  }))
}

function sendIMRoomCommand () {
  const ab = new ArrayBuffer(6)
  const ui8 = new Uint8Array(ab)
  ui8[0] = 1
  ui8[1] = 255
  ui8[2] = 256
  console.log('发送的ab', ab)
  im.sendIMRoomCommand(fConfig('sendIMRoomCommand', {
    data: {
      roomid: +($('#roomId').val()),
      msg: ab,
      ttl: 1,
    },
  }))
}

function pullHisRoomCommand () {
  im.pullHisRoomCommand(fConfig('pullHisRoomCommand', {
    data: {
      roomid: +($('#roomId').val()),
    },
  }))
}

/**
 * 发送msg_type:4, 信令消息
 */
function sendMsgType4 () {
  const targetId = $('#targetId').val()
  console.log('targetId', targetId)
  im.sendSingleMessage(fConfig('sendSingleMessage', {
    data: {
      msg_body: {
        text: '信令消息!',
      },
      msg_type: 4,
      target_id: targetId,
    },
  }))
}

function sendMsgType13 () {
  const targetId = $('#targetId').val()
  console.log('targetId', targetId)
  const msg_type = $('#msgType').val()
  console.log('msg_type: ', msg_type);
  im.sendSingleMessage(fConfig('sendSingleMessage', {
    data: {
      msg_body: {
        text: '状态消息!',
      },
      msg_type: $('#msgType').val(),
      target_id: targetId,
    },
  }))
}
function getRemoteConvList () {
  let time = new Date(2020, 4, 9).valueOf();
  console.log('time: ', time);
  im.getRemoteConvList(fConfig('getRemoteConvList', {
    data: {
      lastTime: time,
      size: 100
    }
  }))
}

// function sendSingleMessageInMsgType7 () {
//   var targetId = $('#targetId').val()
//   console.log('targetId', targetId);
//   im.sendSingleMessage(fConfig('sendSingleMessage', {
//     data:{
//       msg_body: {
//         text: '我全世界最帅!',
//       },
//       msg_type: 7,
//       target_id: targetId,
//     },
//   }))
// }


function logout () {
  im.logout()
}
