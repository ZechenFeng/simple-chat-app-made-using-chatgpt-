// chat.js
const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const usernameForm = document.getElementById('username-form');
    const chat = document.getElementById('chat');
    const usernameInput = document.getElementById('username-input');
    const setUsernameButton = document.getElementById('set-username');
    const messagesList = document.getElementById('messages');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');

    setUsernameButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            socket.emit('set username', username);
            usernameForm.style.display = 'none';
            chat.style.display = 'block';
        }
    });

    socket.on('chat message', (msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messagesList.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            const username = socket.username || 'Anonymous';
            socket.emit('chat message', `${username}: ${message}`);
            messageInput.value = '';
        }
    });
});
