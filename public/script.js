var socket = io();
var form = document.getElementById('form');
var messageInput = document.getElementById('messageInput');
var news = document.getElementById('news');
var nicknameInput = document.getElementById('nicknameInput');
var typing = false;

// Connection event
socket.emit('connected');

// Once connected, set the news text content
socket.on('connected', function () {
  news.textContent = 'Remember to be kind!';
});

// Submit event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Send message information to the server
  if (messageInput.value) {
    socket.emit('chat message', {
      nickname: nicknameInput.value,
      msg: messageInput.value,
    });

    // Append the message to the DOM
    appendMessage(nicknameInput.value, messageInput.value);
    messageInput.value = '';

    typingTimeout();
  }
});

// Chat message event listener
socket.on('chat message', function (data) {
  appendMessage(data.nickname, data.msg);
});

// Typing event action
socket.on('typing', function (data) {
  var typingItem = document.createElement('li');
  typingItem.id = 'typingMessage'; // Add an ID to the typing message element
  typingItem.textContent = data.nickname + ' is typing...';
  messages.appendChild(typingItem);
});

// Not typing event action
socket.on('not typing', function () {
  var typingMessage = document.getElementById('typingMessage');
  if (typingMessage) {
    typingMessage.remove(); // Remove the typing message from the DOM
  }
});

// Append message function
function appendMessage(nickname, message) {
  var item = document.createElement('li');
  var nicknameItem = document.createElement('span');
  nicknameItem.textContent = nickname + ': ';
  nicknameItem.style.fontWeight = 'bold';
  item.appendChild(nicknameItem);
  item.appendChild(document.createTextNode(message));
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

// Adding a keypress event listener to the message input
messageInput.addEventListener('keypress', function () {
  if (!typing) {
    typing = true;
    socket.emit('typing', {
      nickname: nicknameInput.value,
    });

    setTimeout(typingTimeout, 3000);
  }
});

// Typing timeout function
function typingTimeout() {
  typing = false;
  socket.emit('not typing');
}
