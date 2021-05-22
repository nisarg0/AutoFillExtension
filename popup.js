// Send currentTab url to background script
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	var currentTab = tabs[0];
	chrome.runtime.sendMessage({ data: currentTab.url });
	console.log("Url for current tab : " + currentTab.url);
});

// If verification is successful then background will send the data to poopup
chrome.runtime.onMessage.addListener(async function (
	message,
	sender,
	sendResponse
) {
	data = message.data;

	// Fill username field
	await chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.userNameFieldName}').value = '${data.username}'`,
	});

	// Fill password field
	await chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.passwordFieldName}').value = '${data.password}'`,
	});

	sendResponse({ success: "success" });
});
