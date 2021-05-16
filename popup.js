// Sending a messege from popup file to background with verification code(Handshake).
chrome.runtime.sendMessage({ data: "Handshake" });

// If verification is successful then background will send the data to poopup
chrome.runtime.onMessage.addListener(async function (
	message,
	sender,
	sendResponse
) {
	data = message.data;

	// To check if we are populating the fields on proper site.
	// var query = { active: true, currentWindow: true };
	// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 	var currentTab = tabs[0];

	// 	// User is on current tab.
	// 	if (data.site !== currentTab.url) {
	// 		console.log("Invalid operation");
	// 		return false;
	// 	}
	// });

	// Fill username field
	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.userNameFieldName}').value = '${data.username}'`,
	});

	// Fill password field
	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.passwordFieldName}').value = '${data.password}'`,
	});
	console.log("Successfully filled the fields");

	sendResponse({ success: "success" });
});
