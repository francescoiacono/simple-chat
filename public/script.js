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

    appendMessage(nicknameInput.value, messageInput.value);
    messages.scrollTop = messages.scrollHeight;

    messageInput.value = '';
  }
});

socket.on('connected', function () {
  news.textContent = 'Remember: Be nice or your mum is a slug!';
});

socket.on('chat message', function (data) {
  appendMessage(data.nickname, data.msg);
});

function appendMessage(nickname, message) {
  var item = document.createElement('li');
  var nicknameItem = document.createElement('span');
  nicknameItem.textContent = nickname + ': ';
  nicknameItem.style.fontWeight = 'bold';
  item.appendChild(nicknameItem);
  item.appendChild(document.createTextNode(message));
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
