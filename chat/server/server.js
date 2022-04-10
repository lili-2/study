const io = require('socket.io')(5000,{cors: true})

io.on('connection',socket => {
    const id = socket.handshake.query.id
    socket.join(id)
    socket.on('send-message',({recipients,text}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r!== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message',{
                recipients: newRecipients,sender:id,text
            })
        });
    })
})

/*
socket.on()方法：
    - socket.on()用于监听获取服务端（后端）发送过来的数据

    - socket.on('monitorName', callBack)有两个参数：

        + monitorName：是监听的标识，是自定义的，只要和后端约定好可行了！！)

        + callBack：是一个回调函数，里面的参数就是后端发送过来的数据
socket.emit()方法：
    - socket.emit()用于向服务端（后端）发送数据

    - socket.emit('monitorName', sendData)有两个参数：

        + monitorName：是监听的标识，是自定义的，只要和后端约定好可行了！！)

        + sendData：可以是字符串，也可以是{}JSON对象，这是向后端发送过去的数据
*/
/*
io.on('connect', onConnect);

function onConnect(socket){

  // 只发给sender。 sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // 发给所有人，除了sender。 sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // 发给game房间所有人，除了sender。 sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // 发给game1和/或game2所有人，除了sender。 sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // 发给game房间所有人，包含sender。 sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // 发给域名myNamespacs所有人，包含sender。 sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // 发给域名myNamespace里room房间的所有人，包含sender。 sending to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // 发给某一个人 sending to individual socketid (private message)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');

};

// http://www.storagelab.org.cn/liangli/2016/03/04/%E8%BD%AC%EF%BC%9Asocket-emit-%E5%92%8C-socket-broadcast-emit%E7%9A%84%E5%8C%BA%E5%88%AB/

*/