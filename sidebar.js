/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request, 
	
	sender, sendResponse
	) {
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
}
chrome.runtime.onMessage.addListener(handleRequest);

/*Function which create a sidebar*/
var sidebarOpen = false;
function toggleSidebar() {
	if(sidebarOpen) {
		var el = document.getElementById('aliasSidebar');
		el.parentNode.removeChild(el);
		sidebarOpen = false;

		removeStyleSheet("sidebarCss");
		removeStyleSheet("outlineCss");
		removeScript("mainScript");
		removeScript("jquery");
	}
	else {
		var sidebar = document.createElement('div');
		sidebar.id = "aliasSidebar";
		sidebar.innerHTML = '\
			<button id="outlineButton">Outline all the links</button>\
			<hr>\
			<textarea id="alias_input"></textarea>\
			<button id="upload_alias">Upload Alias List</button>\
			<div id="aliasList"></div>\
			<hr>\
			<div id="alias_show">\
			Please hover over the link and see alias below:\
			<div id="current_alias"></div>\
			</div>\
			<button id="output">Output to HTML</button>\
		';	

		appendStyleSheet(chrome.extension.getURL("sidebar.css"), "sidebarCss");
		appendStyleSheet(chrome.extension.getURL("outline.css"), "outlineCss");
		appendScript(chrome.extension.getURL("jquery.js"), "jquery");
		appendScript(chrome.extension.getURL("main.js"), "mainScript");
		document.body.appendChild(sidebar);
		sidebarOpen = true;
	}
}

/*Function append stylesheet*/
function appendStyleSheet(fileName, stylesheetId) {
  var fileref=document.createElement("link") 
  fileref.rel = "stylesheet"; 
  fileref.type = "text/css"; 
  fileref.href = fileName; 
  fileref.media="screen"; 
  fileref.id = stylesheetId;
  var headobj = document.getElementsByTagName('head')[0]; 
  headobj.appendChild(fileref); 
}

/*Remove stylesheet*/
function removeStyleSheet(stylesheetId) {
  var el = document.getElementById(stylesheetId);
  el.parentNode.removeChild(el);
}

/*Function append javascript*/
function appendScript(fileName, scriptId) {
  var headID = document.getElementsByTagName("head")[0];         
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = fileName;
  newScript.id = scriptId;
  headID.appendChild(newScript);
}

/*Remove javascript*/
function removeScript(scriptId) {
  var el = document.getElementById(scriptId);
  el.parentNode.removeChild(el);
}
