const { React, ReactDOM } = window;
const { useState, useEffect } = React
const { Select, Row, Col } = antd
const { Option } = Select

function App () {
  // const [host, setHost] = useState('wss://mc-dev.test.seewo.com')
  const [host, setHost] = useState('wss://mc.test.seewo.com')
  // const [appid, setAppid] = useState('9298e0ebe9234a1b96e32dfd7b3d385e') // dev
  // const [appid, setAppid] = useState('57ae140a945b4e7596c55f967e0a5db4') // dev
  const [appid, setAppid] = useState('3e50c3a5a1c14aa49b17676b4ad7509e')  // test
  // const [appid, setAppid] = useState('9126decd01b447b3850798c95ea341df')  // maxhub
  const [uid, setUid] = useState('123')
  // const [token, setToken] = useState('20126f02028f45aa91b6869316e6f02f') // dev
  const [token, setToken] = useState('737bd677ed9248e3aaf39c698c1392b9') // test
  // const [roomid, setRoomid] = useState(281474988324926) // dev
  const [roomid, setRoomid] = useState(281474990411332)  // test
  const [postData, setPostData] = useState('')
  const [msgType, setMsgType] = useState()
  const [targetId, setTargetId] = useState()
  const [gid, setGid] = useState('')
  const [convSize, setConvSize] = useState()
  const [IM, setIM] = useState()
  const [message, setMessage] = useState()
  const [lastTime, setLastTime] = useState()
  const [seq, setSeq] = useState()
  const [targetType, setTargetType] = useState(1)

  const initIM = () => {
    IM.init({
      domain: host,
      appid: appid,
      uid: uid,
      token: '',
      platform: '4', // web
      data: {
        user: {
          timestamp: JSON.stringify(new Date().getTime()),
          signature: 'D97C2DDA3E46E5E6D482E9E8EE84AF93',
          token: token
        }
      }
    })
      .login({
        onSuccess: (a, b) => {
          console.log('login success a, b', a, b)
        }
      })
      .onMessageRecv((data, ctx) => {
        console.log('onMessageRecv --> data:');
        console.table(data)
        console.log('onMessageRecv --> context:');
        console.table(ctx)
      })
      .onMessageListRecv((data, ctx) => {
        console.log('onMessageListRecv -->data');
        console.table(data);
        console.log('onMessageListRecv --> context:');
        console.table(ctx);
      })
      .onNoticeRecv((data, ctx) => {
        console.log('onNoticeRecv --> data:');
        console.table(data)
        console.log('onNoticeRecv --> context:');
        console.table(ctx)
      })
      .onSingleCommandRecv((data, ctx) => {
        console.log('onSingleCommandRecv --> data:');
        console.table(data)
        console.log('onSingleCommandRecv --> context:');
        console.table(ctx)
      })
      .onRoomCommandRecv((data, ctx) => {
        console.log('onRoomCommandRecv --> data:');
        console.table(data)
        console.log('onRoomCommandRecv --> context:');
        console.table(ctx)
      })
      .onConnect(function (data, ctx) {
        console.log('onConnect --> data:');
        console.table(data)
        console.log('onConnect --> context:');
        console.table(ctx)
      })
      .onDisconnect(function (data, ctx) {
        console.log('onDisconnect --> data:');
        console.table(data)
        console.log('onDisconnect --> context:');
        console.table(ctx)
      })
      .onError((err) => {
        console.log('err:-----', err);
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
          setRoomid(+(data.roomid))
        }
        if (method === 'createGroup') {
          setGid(+(data.gid))
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
    IM.createRoom(fConfig('createRoom', {
      data: {
        name: 'wtf聊天室名称',
      },
    }))
  }

  function joinRoom () {
    IM.joinRoom(fConfig('joinRoom', {
      data: {
        roomid: roomid,
      },
    }))
  }

  function deleteRoom () {
    IM.deleteRoom(fConfig('deleteRoom', {
      data: {
        roomid,
      },
    }))
  }

  function quitRoom () {
    IM.quitRoom(fConfig('quitRoom', {
      data: {
        roomid,
      },
    }))
  }


  function getRoomMemberSize () {
    IM.getRoomMemberSize(fConfig('getRoomMemberSize', {
      data: {
        roomid,
      },
    }))
  }


  function getRoomMember () {
    IM.getRoomMember(fConfig('getRoomMember', {
      data: {
        roomid,
      },
    }))
  }

  function sendRoomMessage () {
    console.log('roomId', roomid);
    IM.sendRoomMessage(fConfig('sendRoomMessage', {
      data: {
        msg_body: {
          text: message || '我全世界最帅!',
        },
        msg_type: msgType,
        target_id: roomid,
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
    IM.sendIMRoomCommand(fConfig('sendIMRoomCommand', {
      data: {
        roomid: roomid,
        msg: ab,
        ttl: 1,
      },
    }))
  }

  function pullHisRoomCommand () {
    IM.pullHisRoomCommand(fConfig('pullHisRoomCommand', {
      data: {
        roomid: roomid,
      },
    }))
  }


  /**
   * 群组相关操作
   */
  function createGroup () {
    IM.createGroup(fConfig('createGroup', {
      data: {
        name: 'wtf群聊名称',
      },
    }))
  }

  function deleteGroup () {
    IM.deleteGroup(fConfig('deleteGroup', {
      data: {
        gid,
      },
    }))
  }

  function getGroupInfo () {
    IM.getGroupInfo(fConfig('getGroupInfo', {
      data: {
        gid,
      },
    }))
  }

  function setGroupMemberMaxSize () {
    IM.setGroupMemberMaxSize(fConfig('setGroupMemberMaxSize', {
      data: {
        gid,
        max_size: 10,
      },
    }))
  }

  function setGroupName () {
    IM.setGroupName(fConfig('setGroupName', {
      data: {
        gid,
        name: '新的群名称',
      },
    }))
  }


  function setGroupNotice () {
    IM.setGroupNotice(fConfig('setGroupNotice', {
      data: {
        gid,
        name: '新的群公告',
      },
    }))
  }

  function getGroupMember () {
    IM.getGroupMember(fConfig('getGroupMember', {
      data: {
        gid,
      },
    }))
  }

  function getGroupMemberSize () {
    IM.getGroupMemberSize(fConfig('getGroupMemberSize', {
      data: {
        gid,
      },
    }))
  }

  function addGroupMember () {
    IM.addGroupMember(fConfig('addGroupMember', {
      data: {
        gid,
        uids: ['', ''],
      },
    }))
  }

  function removeGroupMember () {
    IM.removeGroupMember(fConfig('removeGroupMember', {
      data: {
        gid,
        uids: ['', ''],
      },
    }))
  }

  function quitGroup () {
    IM.quitGroup(fConfig('quitGroup', {
      data: {
        gid,
      },
    }))
  }

  function setGroupOwner () {
    IM.setGroupOwner(fConfig('setGroupOwner', {
      data: {
        gid,
        owner: '18813296148',  // TODO:
      },
    }))
  }


  function setGroupNotDisturb () {
    IM.setGroupNotDisturb(fConfig('setGroupNotDisturb', {
      data: {
        gid,
        on: true,
      },
    }))
  }

  function getGroupNotDisturbList () {
    IM.getGroupNotDisturbList(fConfig('getGroupNotDisturbList', {}))
  }

  function sendGroupMessage () {
    IM.sendGroupMessage(fConfig('sendGroupMessage', {
      data: {
        msg_body: {
          text: message || '我全世界最帅!',
        },
        msg_type: msgType,
        target_id: targetId,
      },
    }))
  }

  function getGroupNotDisturbList () {
    IM.getGroupNotDisturbList(fConfig('getGroupNotDisturbList', {}))
  }

  function setUserNotDisturb () {
    IM.setUserNotDisturb(fConfig('setUserNotDisturb', {
      data: {
        uid,
        on: true,
      },
    }))
  }

  function getUserNotDisturbList () {
    IM.getUserNotDisturbList(fConfig('getUserNotDisturbList', {}))
  }

  function recallMessage () {
    let id;
    if (targetType === 1) {
      id = uid;
    } else if (targetType === 2) {
      id = gid;
    }
    IM.recallMessage(fConfig('recallMessage', {
      data: {
        msgid: 123, // TODO:
        type: targetType,
        id,
        seq,
      },
    }))
  }


  function sendSingleMessage () {
    console.log('targetId', targetId)
    IM.sendSingleMessage(fConfig('sendSingleMessage', {
      data: {
        msg_body: {
          text: message || '我全世界最帅!',
        },
        msg_type: msgType,
        target_id: targetId,
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
    IM.sendIMSingleCommand(fConfig('sendIMSingleCommand', {
      data: {
        toAppid: 'ef6f758e4c8b4c43ac784d9ad0276381',
        toUid: uid,
        toPlatform: '4',
        msg: ab,
        ttl: 1,
      },
    }))
  }

  function logout () {
    IM.logout()
  }

  function getRemoteConvList () {
    const timeValue = new Date(lastTime).valueOf()
    IM.getRemoteConvList(fConfig('getRemoteConvList', {
      data: {
        lastTime: timeValue || 0,
        size: convSize
      }
    }))
  }

  function handleLastTimeChange (e) {
    console.log('lastTime: ', e.target.value);
    const time = new Date(e.target.value)
    console.log('time', time.valueOf());
    setLastTime(e.target.value)
  }

  function updateRemoteConvReadSeq () {
    let id;
    if (targetType === 1) {
      id = uid
    } else if (targetType === 2) {
      id = gid
    }
    IM.updateRemoteConvReadSeq(fConfig('updateRemoteConvReadSeq', {
      data: {
        type: targetType,
        id: targetId,
        seq,
      }
    }))
  }
  function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  const updateSeq = (e) => {
    const value = e.target.value
    if (isNumeric(value)) {
      setSeq(+(value))
    }
  }

  const targetTypeChange = (value) => {
    console.log('targetTypeChange value', value);
    setTargetType(value)
  }

  const setRoomExpireTime = () => {
    IM.setRoomExpireTime(fConfig('setRoomExpireTime', {
      data: {
        roomid: roomid,
        expire_time: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
      }
    }))
  }

  const getRoomInfo = () => {
    IM.getRoomInfo(fConfig('getRoomInfo', {
      data: {
        roomid,
      }
    }))
  }

  const getLoginPlatform = () => {
    console.log('getLoginPlatform')
    IM.getLoginPlatform(fConfig('getLoginPlatform', {
      data: {
        uid,
      }
    }))
  }
  useEffect(() => {
    const IM = new MsSDK.IM()
    setIM(IM)

    console.log(IM)
  }, [])

  return (
    <div className="app-container">
      <Row>
        <Col flex="1 1 200px">
          <div>
            <legend>IM配置信息</legend>
            <div className="form-group">
              <label htmlFor="host">host: 服务器地址</label>
              <input
                type="text"
                value={host}
                className="form-control"
                id="host"
                placeholder="请输入服务器地址"
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appid">appid</label>
              <input
                type="text"
                value={appid}
                onChange={(e) => setAppid(e.target.value)}
                className="form-control" id="appid" placeholder="appid" />
            </div>
            <div className="form-group">
              <label htmlFor="uid">uid</label>
              <input
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                className="form-control" id="uid" placeholder="uid" />
            </div>
            <div className="form-group">
              <label htmlFor="token">token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="form-control" id="token" placeholder="token" />
            </div>
            <div className="d-flex justify-content-around row">
              <button className="btn btn-primary" onClick={initIM}>连接</button>
              <button className="btn btn-xs btn-danger" onClick={logout}>断开</button>
            </div>
            <hr />
            <div className="input-group">
              <label htmlFor="postData">自定义请求参数体（json格式）</label>
              <textarea
                id="postData"
                value={postData}
                className="form-control"
                onChange={(e) => setPostData(e.target.value)}></textarea>
            </div>
            <div className="input-group">
              <label htmlFor="message">聊天消息内容</label>
              <textarea
                id="message"
                value={message}
                className="form-control"
                onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div className="d-flex flex-row">
              <div className="form-group">
                <label htmlFor="roomid">房间id</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomid}
                  onChange={(e) => setRoomid(+(e.target.value))}
                  id="roomid" placeholder="roomid" />
              </div>
            </div>
            <div className="d-flex flex-row">

              <div className="form-group">
                <label htmlFor="msgType">msgType</label>
                <input
                  type="number"
                  className="form-control"
                  value={msgType}
                  onChange={(e) => setMsgType(+(e.target.value))}
                  id="msgType" placeholder="msgType" />
              </div>
              <div className="form-group">
                <label htmlFor="targetId">targetId</label>
                <input
                  type="text"
                  className="form-control"
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  id="targetId" placeholder="targetId" />
              </div>
              <div className="form-group">
                <label htmlFor="gid">gid</label>
                <input
                  type="text"
                  className="form-control"
                  value={gid}
                  onChange={(e) => setGid(e.target.value)}
                  id="gid" placeholder="gid" />
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="form-group">
                <label htmlFor="convSize">会话拉取数</label>
                <input
                  type="number"
                  className="form-control"
                  value={convSize}
                  onChange={(e) => setConvSize(+(e.target.value))}
                  id="convSize" placeholder="convSize" />
              </div>
              <div className="form-group">
                <label htmlFor="lastTime">会话拉取截止时间(lastTime)</label>
                <input
                  type="date"
                  className="form-control"
                  value={lastTime}
                  onChange={handleLastTimeChange}
                  id="lastTime" placeholder="lastTime" />
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="form-group">
                <label htmlFor="seq">确认的消息id</label>
                <input
                  type="number"
                  className="form-control"
                  value={seq}
                  onChange={updateSeq}
                  id="seq" placeholder="seq" />
              </div>
              <div className="form-group">
                <label htmlFor="targetType">消息类型</label>
                <Select name="targetType" id="targetType"
                  defaultValue={targetType}
                  style={{ width: 120 }}
                  onChange={targetTypeChange}>
                  <Option key="1" value={1}>单聊</Option>
                  <Option key="2" value={2}>群聊</Option>
                </Select>
              </div>
            </div>
          </div>
        </Col>
        <Col flex="0 1 50%">
          <div>
            <legend>聊天室操作</legend>
            <div className="btn-group d-flex justify-content-around row" role="group">
              <button type="button" className="btn btn-info" onClick={createRoom}>createRoom</button>
              <button type="button" className="btn btn-info" onClick={joinRoom}>joinRoom</button>
              <button type="button" className="btn btn-info" onClick={deleteRoom}>deleteRoom</button>
              <button type="button" className="btn btn-info" onClick={quitRoom}>quitRoom</button>
              <button type="button" className="btn btn-info" onClick={getRoomMemberSize}>getRoomMemberSize</button>
            </div>
            <div className="btn-group d-flex justify-content-around row" role="group">
              <button type="button" className="btn btn-info" onClick={getRoomMember}>getRoomMember</button>
              <button type="button" className="btn btn-info" onClick={sendRoomMessage}>sendRoomMessage</button>
              <button type="button" className="btn btn-info" onClick={sendIMRoomCommand}>sendIMRoomCommand</button>
              <button type="button" className="btn btn-info" onClick={pullHisRoomCommand}>pullHisRoomCommand</button>
              <button type="button" className="btn btn-info" onClick={setRoomExpireTime}>SetRoomExpireTime</button>
              <button type="button" className="btn btn-info" onClick={getRoomInfo}>getRoomInfo</button>
            </div>
          </div>
          <div>
            <legend>群聊操作</legend>
            <div className="btn-group d-flex justify-content-around row">
              <button type="button" className="btn  btn-secondary" onClick={createGroup}>createGroup</button>
              <button onClick={deleteGroup} className="btn  btn-secondary">deleteGroup</button>
              <button onClick={getGroupInfo} className="btn btn-secondary">getGroupInfo</button>
              <button onClick={setGroupMemberMaxSize} className="btn btn-xs btn-secondary">setGroupMemberMaxSize</button>
            </div>
            <div className="btn-group d-flex justify-content-around row">
              <button type="button" className="btn  btn-secondary" onClick={setGroupName}>setGroupName</button>
              <button onClick={setGroupNotice} className="btn  btn-secondary">setGroupNotice</button>
              <button onClick={getGroupMember} className="btn btn-secondary">getGroupMember</button>
              <button onClick={getGroupMemberSize} className="btn btn-xs btn-secondary">getGroupMemberSize</button>
            </div>
            <div className="btn-group d-flex justify-content-around row">
              <button type="button" className="btn  btn-secondary" onClick={addGroupMember}>addGroupMember</button>
              <button onClick={removeGroupMember} className="btn  btn-secondary">removeGroupMember</button>
              <button onClick={quitGroup} className="btn btn-secondary">quitGroup</button>
            </div>
            <div className="btn-group d-flex justify-content-around row">
              <button onClick={setGroupNotDisturb} className="btn btn-secondary">setGroupNotDisturb</button>
              <button onClick={setGroupOwner} className="btn btn-xs btn-secondary">setGroupOwner</button>
              <button onClick={sendGroupMessage} className="btn btn-xs btn-secondary">sendGroupMessage</button>
            </div>
          </div>
          <div>
            <legend>其他类型</legend>
            <div className="btn-group d-flex justify-content-around row">
              {/* <button className="btn btn-xs btn-secondary" onClick={getGroupNotDisturbList}>getGroupNotDisturbList</button> */}
              <button className="btn btn-xs btn-light" onClick={setUserNotDisturb}>setUserNotDisturb</button>
              {/* <button className="btn btn-xs btn-secondary" onClick={getUserNotDisturbList}>getUserNotDisturbList</button> */}
              <button className="btn btn-xs btn-light" onClick={recallMessage}>recallMessage</button>
            </div>
            <div className="btn-group d-flex justify-content-around row">
              <button className="btn btn-xs btn-light" onClick={sendSingleMessage}>sendSingleMessage</button>
              <button className="btn btn-xs btn-light" onClick={sendIMSingleCommand}>sendIMSingleCommand</button>
              <button className="btn btn-xs btn-light" onClick={getLoginPlatform}>getLoginPlatform</button>
            </div>
          </div>
          <div>
            <legend>会话相关</legend>
            <div className="btn-group d-flex justify-content-around row">
              <button className="btn btn-xs btn-light" onClick={getRemoteConvList}>获取会话列表</button>
              <button className="btn btn-xs btn-light" onClick={updateRemoteConvReadSeq}>updateRemoteConvReadSeq</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('container'))
