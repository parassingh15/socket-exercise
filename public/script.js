const socket = io();

var count = 1;

socket.on('joinmessage', (data) => {
    let container = document.getElementById('container');
    let div = document.createElement('div');
    div.innerHTML = `<div class="alert alert-primary" role="alert">${data}</div>`;
    container.appendChild(div);
    count += 1;

    document.getElementById(count).innerHTML = `Login ${count}`
});

socket.on('leavemessage', (data) => {
    let container = document.getElementById('container');
    let div = document.createElement('div');
    div.innerHTML = `<div class="alert alert-danger" role="alert">${data}</div>`;
    container.appendChild(div);
    
    count -= 1;

    document.getElementById("count").innerHTML = `Login ${count}`
});

socket.on('sendToAll', (data) => {
    let container = document.getElementById('container');
    let div = document.createElement('div');
    div.innerHTML = `<div class="alert alert-dark" role="alert"> <p>${data.socketid}</p> ${data.message}</div>`;
    container.appendChild(div);

    document.getElementById(count).innerHTML = `Login ${count}`
});

function SendMessage() {
    let msg = document.getElementById('msg').value;
    let container = document.getElementById('container');
    let div = document.createElement('div');
    div.innerHTML = `<div class="alert alert-success" role="alert">${msg}</div>`;
    container.appendChild(div);
    socket.emit('chatMessage', msg);
}


