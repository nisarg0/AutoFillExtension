console.log("background is running...");

var secretMessage;

chrome.runtime.onMessageExternal.addListener(function (
	Message,
	sender,
	sendResponse
) {
	console.log("Message recieved");
	var action_url = Message.site;

	secretMessage = Message;

	// Open new tab with given url/
	chrome.tabs.create({ url: action_url });
	console.log("new tab opened");

	sendResponse({ success: "success" });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	//  If the request we recieved from popup is with correct identifier only then we send mssg
	if (message.data === "Handshake") {
		console.log("msg sent from background");
		chrome.runtime.sendMessage({ data: secretMessage });
	}

	return true;
});
