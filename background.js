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

chrome.runtime.onMessage.addListener(async function (
	message,
	sender,
	sendResponse
) {
	// If current tab url is the one which has to signin form to fill.
	if (message.data === secretMessage.site) {
		// console.log("msg sent from background");
		chrome.runtime.sendMessage({ data: secretMessage }, (Response) => {
			console.log(Response);
		});
	}
	sendResponse({ success: "Request received" });
});
