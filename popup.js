// Send currentTab url to background script when user clicks on extension
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	var currentTab = tabs[0];
	chrome.runtime.sendMessage({ data: currentTab.url });
	console.log("Url for current tab : " + currentTab.url);
});

// Function to fill only if on correct website
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	var data = message.data;

	// Level2 decryption
	var decodedusername = decrypt(data.username, "1234");
	var decodedpass = decrypt(data.password, "1234");

	// Fill username field
	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.userNameFieldName}').value = '${decodedusername}'`,
	});

	// Fill password field
	chrome.tabs.executeScript(null, {
		code: `document.getElementById('${data.passwordFieldName}').value = '${decodedpass}'`,
	});

	sendResponse({ success: "success" });
});

// ------------------------Wheeler & Needham’s Tiny Decryptio Algorithm--------------------

// use (16 chars of) 'password' to decrypt 'ciphertext' with xTEA
function decrypt(ciphertext, password) {
	var v = new Array(2),
		k = new Array(4),
		s = "",
		i;

	for (var i = 0; i < 4; i++)
		k[i] = Str4ToLong(password.slice(i * 4, (i + 1) * 4));

	ciphertext = unescCtrlCh(ciphertext);
	for (i = 0; i < ciphertext.length; i += 8) {
		// decode ciphertext into s in 64-bit (8 char) blocks
		v[0] = Str4ToLong(ciphertext.slice(i, i + 4));
		v[1] = Str4ToLong(ciphertext.slice(i + 4, i + 8));
		decode(v, k);
		s += LongToStr4(v[0]) + LongToStr4(v[1]);
	}

	// strip trailing null chars resulting from filling 4-char blocks:
	s = s.replace(/\0+$/, "");

	return decodeURI(s);
}

function decode(v, k) {
	var y = v[0],
		z = v[1];
	var delta = 0x9e3779b9,
		sum = delta * 32;

	while (sum != 0) {
		z -= (((y << 4) ^ (y >>> 5)) + y) ^ (sum + k[(sum >>> 11) & 3]);
		sum -= delta;
		y -= (((z << 4) ^ (z >>> 5)) + z) ^ (sum + k[sum & 3]);
	}
	v[0] = y;
	v[1] = z;
}

// supporting functions

function Str4ToLong(s) {
	// convert 4 chars of s to a numeric long
	var v = 0;
	for (var i = 0; i < 4; i++) v |= s.charCodeAt(i) << (i * 8);
	return isNaN(v) ? 0 : v;
}

function LongToStr4(v) {
	// convert a numeric long to 4 char string
	var s = String.fromCharCode(
		v & 0xff,
		(v >> 8) & 0xff,
		(v >> 16) & 0xff,
		(v >> 24) & 0xff
	);
	return s;
}

function unescCtrlCh(str) {
	// unescape potentially problematic nulls and control characters
	return str.replace(/!\d\d?\d?!/g, function (c) {
		return String.fromCharCode(c.slice(1, -1));
	});
}
