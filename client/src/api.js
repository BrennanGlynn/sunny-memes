import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function subscribeToNews(cb) {
  socket.on('news', function (data) {
    console.log("news event received on client", data.hello);
    socket.emit('received news', { data: 'The message was ' + data.hello });
  });
}

export { subscribeToTimer, subscribeToNews };