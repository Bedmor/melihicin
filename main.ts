function server(){
    var ws_uri = "ws://192.167.1.105:8080/";
    var websocket = new WebSocket(ws_uri);
    websocket.onopen = function(event) {
        MessageAdd('<div class="message green">You have entered the chat room.</div>');
    };
    websocket.onclose = function(event) {
        MessageAdd('<div class="message blue">You have been disconnected.</div>');
    };
    websocket.onerror = function(event) {
        MessageAdd('<div class="message red">Connection to chat failed.</div>');
    };
    websocket.onmessage = function(event) {
        var data = JSON.parse(event.data);
    
        if (data.type == "message") {
            MessageAdd('<div class="message">' + data.username + ': ' + data.message + '</div>');
         }
    };
    document.getElementById("chat-form")!.addEventListener("submit", function(event) {
        event.preventDefault();
    
        var message_element = document.getElementsByTagName("input")[0];
        var message = message_element.value;
    
        if (message.toString().length) {
            var username = localStorage.getItem("username");
    
            var data = {
                type: "message",
                username: username,
                message: message
            };
    
            websocket.send(JSON.stringify(data));
            message_element.value = "";
        }
    }, false);
}

server();

function Username() {
	var username = window.prompt("Enter your username:", "");

	if (username!.toString() == null){
        let rastgele = Math.floor(Math.random() * 1000)
        localStorage.setItem("username", ("User " + rastgele))
    
	}
	else if (username!.toString().length > 2) {
		localStorage.setItem("username", username!);
    }
    else {
		alert("Your username must be at least two characters.");
		Username();
	}
}

Username();

function MessageAdd(message) {
	var chat_messages = document.getElementById("chat-messages");

	chat_messages!.insertAdjacentHTML("beforeend", message);
	chat_messages!.scrollTop = chat_messages!.scrollHeight;
}

function debug(){
    var clienttext = document.getElementById("clienttext")!.innerHTML;
    console.log(clienttext);
    document.getElementById("clienttext")!.innerHTML = "";
}