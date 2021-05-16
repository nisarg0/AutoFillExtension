// const username = "nisarg@gmail.com";
// const password = "12345678";

// const username_field_name = "username";
// const password_field_name = "user_pass";

chrome.runtime.sendMessage({ data: "Handshake" });
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	data = message.data;
	console.log(data);

	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.userNameFieldName}').value = '${data.username}'`,
	});
	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.passwordFieldName}').value = '${data.password}'`,
	});

	return true;
});

// document.addEventListener("DOMContentLoaded", function () {

// });
