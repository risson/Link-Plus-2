chrome.tabs.onUpdated.addListener(function(tabId) {
		chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
	chrome.pageAction.show(tab.id);
});

/*Send request to current tab when page action is clicked*/
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(
			//Selected tab id
			tab.id,
			//Params inside a object data
			{callFunction: "toggleSidebar"}, 
			//Optional callback function
			function(response) {
				console.log(response);
			}
		);
	});
});
