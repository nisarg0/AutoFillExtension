console.log("background is running...");
// Data is encrypted inside this object
var encodedMessage;

// Listens for even from casdashboard website
chrome.runtime.onMessageExternal.addListener(
	async (Message, sender, sendResponse) => {
		console.log("0 Message recieved");
		console.log("1" + Message);

		encodedMessage = Message;
		decodedMsg = await decryptLevel1(Message);

		chrome.tabs.create({ url: decodedMsg.url });
		console.log("3 new tab opened");

		sendResponse({ success: "success" });
	}
);

async function decryptLevel1(Msg) {
	var decoded = atob(Msg);
	return await JSON.parse(decoded);
}

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
