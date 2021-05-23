console.log("background is running...");

// Data is encrypted inside this object
var secretMessage;

// Listens for even from casdashboard website
chrome.runtime.onMessageExternal.addListener(
	(Message, sender, sendResponse) => {
		console.log("Message recieved");
		secretMessage = Message;
		console.log(Message);
		// Open new tab with given url/
		chrome.tabs.create({ url: Message.url });
		console.log("new tab opened");

		sendResponse({ success: "success" });
	}
);

// Message passed with website url
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// If current tab url is the one which has to signin form to fill.
	if (message.data === secretMessage.url) {
		// console.log("msg sent from background");
		chrome.runtime.sendMessage({ data: secretMessage }, (Response) => {
			console.log(Response);
		});
	} else {
		console.log("wrong tab");
	}
	sendResponse({ success: "Request received" });
});
