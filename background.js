console.log("background is running...");

// Data is encrypted inside this object
var encodedMessage;

// Listens for even from casdashboard website
chrome.runtime.onMessageExternal.addListener(
	(Message, sender, sendResponse) => {
		console.log("Message recieved");
		encodedMessage = Message;
		console.log(Message);
		// Open new tab with given url/
		var decodedMsg = atob(Message);
		var secretMsg = JSON.parse(decodedMsg);

		chrome.tabs.create({ url: secretMsg.url });
		console.log("new tab opened");

		sendResponse({ success: "success" });
	}
);

// Message passed with website url
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// If current tab url is the one which has to signin form to fill.
	var decodedMsg = atob(encodedMessage);
	var secretMsg = JSON.parse(decodedMsg);
	if (message.data === secretMsg.url) {
		// console.log("msg sent from background");
		chrome.runtime.sendMessage({ data: secretMsg }, (Response) => {
			console.log(Response);
		});
	} else {
		console.log("wrong tab");
	}
	sendResponse({ success: "Request received" });
});
