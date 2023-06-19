var socket = io();
var form = document.getElementById('form');
var messageInput = document.getElementById('messageInput');
var news = document.getElementById('news');
var nicknameInput = document.getElementById('nicknameInput');

socket.emit('connected');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit('chat message', {
      nickname: nicknameInput.value,
      msg: messageInput.value,
    });
    messageInput.value = '';
  }
});

socket.on('connected', function () {
  news.textContent = 'There may be some news here';
});

socket.on('chat message', function (data) {
  var item = document.createElement('li');
  var nicknameItem = document.createElement('span');
  nicknameItem.textContent = data.nickname + ': ';
  nicknameItem.style.fontWeight = 'bold';
  item.appendChild(nicknameItem);
  item.appendChild(document.createTextNode(data.msg));
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
