console.log("background is running...");

var secretMessage;
chrome.runtime.onMessageExternal.addListener(function (
	Message,
	sender,
	sendResponse
) {
	console.log("Message recieved");
	var action_url = Message.site;
	console.log(Message);
	secretMessage = Message;
	chrome.tabs.create({ url: action_url });
	console.log("new tab opened");

	console.log("msg sent from background");
	sendResponse({ success: "success" });
	return true;
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	//alert(message.data);
	if (message.data === "Handshake") {
		chrome.runtime.sendMessage({ data: secretMessage });
	}

	return true;
});
