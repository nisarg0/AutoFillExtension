// Send currentTab url to background script when user clicks on extension
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	var currentTab = tabs[0];
	chrome.runtime.sendMessage({ data: currentTab.url });
	console.log("Url for current tab : " + currentTab.url);
});

// Function to fill only if on correct website
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	data = message.data;

	// Fill username field
	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${
			data.userNameFieldName
		}').value = '${atob(data.username)}'`,
	});

	// Fill password field
	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${
			data.passwordFieldName
		}').value = '${atob(data.password)}'`,
	});

	sendResponse({ success: "success" });
});
